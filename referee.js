/* ════════════════════════════════════════════════════════════════
   Imposter referee · the rules of the game, run on the server.

   Phones never pick the word, never pick the imposter and never
   count the votes. They ask the referee ("start", "I'm ready",
   "my vote is X") and the referee writes the result to the room.

   Where things live in the database:
     rooms/CODE            everyone in the room can read. The referee
                           writes phase, open and state.
     private/CODE/UID/DEAL only that one player can read (their word,
                           or "you are the imposter").
     secret/CODE/DEAL      nobody can read (who the imposter is, the
                           word, every player's vote).

   This file has no Firebase in it. It talks to the database through
   a tiny adapter (get / update / txn) so the same code runs in
   Cloud Functions and in the tests.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';

  const GAME = 'imposter';
  const MIN = 3;
  const ROUNDS = [3, 5, 7, 10];
  const CODE_RE = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
  const KEY_RE = /^[A-Za-z0-9_-]{1,128}$/;
  const ACTIONS = ['start', 'next', 'again', 'lobby', 'end', 'skip', 'ready', 'vote'];
  const LEADER_ONLY = ['start', 'next', 'again', 'lobby', 'end', 'skip'];
  const TRIES = 6;

  const clone = v => JSON.parse(JSON.stringify(v));
  const keys = o => Object.keys(o || {});
  const same = (a, b) => JSON.stringify(a || null) === JSON.stringify(b || null);

  function makeReferee(env) {
    const db = env.db, WORDS = env.words;
    const pick = list => list[env.rng(list.length)];

    // ── small readers ────────────────────────────────────────────
    const online = room => keys(room.players).filter(u => room.players[u].online !== false).sort();
    // Players the round is waiting on: dealt in, still in the room, not skipped.
    const active = room => keys(room.state && room.state.roster)
      .filter(u => room.players && room.players[u] && !((room.state.skip || {})[u]));

    function clearRound(st) { delete st.ready; delete st.voted; delete st.tally; delete st.votes; delete st.skip; }
    function toFinal(room, why) {
      room.phase = 'final'; room.open = true;
      clearRound(room.state); delete room.state.result;
      if (why) room.state.short = why; else delete room.state.short;
      return room;
    }
    // The round cannot be finished (the imposter left, or too few are still playing): show who it was, replay the round.
    function toVoid(room, secret, why) {
      const st = room.state;
      room.phase = 'result'; room.open = true;
      clearRound(st);
      st.result = { round: st.round, void: why, imposter: secret.imposter, word: secret.word };
      return room;
    }
    function resolve(room, secret) {
      const st = room.state, imp = secret.imposter, ballots = secret.ballots || {};
      const catchers = keys(ballots).filter(u => u !== imp && ballots[u] === imp);
      const caught = catchers.length > 0;
      const gained = {};
      st.scores = st.scores || {};
      catchers.forEach(u => { gained[u] = 3; st.hits = st.hits || {}; st.hits[u] = (st.hits[u] || 0) + 1; });
      if (!caught) { gained[imp] = 5; st.escapes = st.escapes || {}; st.escapes[imp] = (st.escapes[imp] || 0) + 1; }
      keys(gained).forEach(u => { st.scores[u] = (st.scores[u] || 0) + gained[u]; });
      st.result = { round: st.round, imposter: imp, word: secret.word, caught, n: catchers.length, gained };
      if (!st.anon && caught) { st.result.by = {}; catchers.forEach(u => { st.result.by[u] = true; }); }
      room.phase = 'result'; room.open = true;
      delete st.ready; delete st.skip;
      if (st.anon) delete st.votes;
      return room;
    }

    // One step forward, if the room is ready for it. Pure: (room, secret) -> new room.
    function step(room, secret) {
      const ph = room.phase, st = room.state;
      if (room.ref !== true || room.game !== GAME || !st) return { why: 'noop' };
      if (ph !== 'reveal' && ph !== 'vote' && ph !== 'result') return { why: 'noop' };
      if (keys(room.players).length < MIN) return { room: toFinal(room, 'few') };
      if (ph === 'result') return { why: 'noop' };
      if (!secret || secret.deal !== st.deal || !secret.imposter) return { why: 'stale' };
      const act = active(room);
      if (!act.includes(secret.imposter)) return { room: toVoid(room, secret, 'imposter') };
      if (act.length < MIN) return { room: toVoid(room, secret, 'few') };
      if (ph === 'reveal') {
        if (!act.every(u => (st.ready || {})[u])) return { why: 'noop' };
        room.phase = 'vote';
        return { room };
      }
      const ballots = secret.ballots || {};
      if (keys(st.voted).some(u => !(u in ballots))) return { why: 'stale' };   // we read the votes too early: read again
      const voted = {}, tally = {};
      keys(ballots).forEach(u => { voted[u] = true; tally[ballots[u]] = (tally[ballots[u]] || 0) + 1; });
      const changed = !same(voted, st.voted) || !same(tally, st.tally);
      st.voted = voted; st.tally = tally;
      if (!st.anon) st.votes = clone(ballots);
      if (act.every(u => voted[u])) return { room: resolve(room, secret) };
      return changed ? { room } : { why: 'noop' };
    }

    // ── database helpers ─────────────────────────────────────────
    async function roomTxn(code, fn) {
      let out = null;
      const res = await db.txn('rooms/' + code, cur => {
        // The server SDK may run this once with null before it has the real data. Returning null there is safe:
        // if the room exists the write is rejected and this runs again with the real room.
        if (cur === null || cur === undefined) { out = { why: 'not_found' }; return null; }
        out = fn(clone(cur)) || { why: 'noop' };
        return out.room ? out.room : undefined;
      });
      if (res && res.committed && out && out.room) return { ok: true, room: out.room };
      return { ok: false, why: (out && out.why) || 'abort' };
    }
    async function readSecret(code, deal) {
      if (!deal) return null;
      const s = await db.get(`secret/${code}/${deal}`);
      return s ? Object.assign({}, s, { deal }) : null;
    }
    function wipeDeal(code, deal, roster) {
      if (!deal) return Promise.resolve();
      const up = { [`secret/${code}/${deal}`]: null };
      keys(roster).forEach(u => { up[`private/${code}/${u}/${deal}`] = null; });
      return db.update(up).catch(() => {});
    }

    // Keep stepping until the room has nothing more to do.
    async function settle(code) {
      for (let i = 0; i < TRIES; i++) {
        const room = await db.get('rooms/' + code);
        if (!room || !room.state) return;
        if (room.phase !== 'reveal' && room.phase !== 'vote' && room.phase !== 'result') return;
        const secret = room.phase === 'result' ? null : await readSecret(code, room.state.deal);
        const r = await roomTxn(code, cur => step(cur, secret));
        if (r.why !== 'stale') return;
      }
    }

    // ── dealing a round ──────────────────────────────────────────
    function config(room) {
      const s = room.settings || {};
      return {
        category: WORDS[s.category] ? s.category : 'movies',
        total: ROUNDS.includes(Number(s.rounds)) ? Number(s.rounds) : 5,
        anon: s.votes === 'Secret',
      };
    }
    const FROM = { start: 'waiting', again: 'final', next: 'result' };

    async function deal(code, uid, mode) {
      for (let i = 0; i < TRIES; i++) {
        const room = await db.get('rooms/' + code);
        if (!room) return { ok: false, error: 'not_found' };
        if (room.leader !== uid) return { ok: false, error: 'not_leader' };
        if (room.phase !== FROM[mode]) return { ok: false, error: 'phase' };
        const old = room.state || {};
        const fresh = mode !== 'next';
        if (!fresh && !old.result) return { ok: false, error: 'phase' };
        const guard = cur => cur.leader === uid && cur.phase === FROM[mode] && (fresh || (cur.state && cur.state.deal === old.deal));

        // last round done: go to the final screen
        if (!fresh && !old.result.void && old.round >= old.total) {
          const r = await roomTxn(code, cur => (guard(cur) ? { room: toFinal(cur) } : { why: 'phase' }));
          return r.ok ? { ok: true } : { ok: false, error: r.why };
        }

        const roster = online(room);
        if (roster.length < MIN) return { ok: false, error: 'few' };
        const cfg = fresh ? config(room) : { category: old.category, total: old.total, anon: !!old.anon };
        const list = WORDS[cfg.category] || WORDS.movies;
        const used = fresh ? {} : (old.used || {});
        let pool = list.map((_, n) => n).filter(n => !used['w' + n]);
        if (!pool.length) pool = list.map((_, n) => n);
        const wi = pick(pool), word = list[wi];
        const last = fresh ? null : old.result.imposter;         // never the same imposter twice in a row
        const imposter = pick(roster.filter(u => u !== last));
        const starter = pick(roster);
        const dealId = env.id();
        const round = fresh ? 1 : (old.result.void ? old.round : old.round + 1);

        const up = { [`secret/${code}/${dealId}`]: { imposter, word, round, at: env.now() } };
        roster.forEach(u => { up[`private/${code}/${u}/${dealId}`] = u === imposter ? { round, imposter: true } : { round, word }; });
        await db.update(up);

        const rmap = {}; roster.forEach(u => { rmap[u] = true; });
        const r = await roomTxn(code, cur => {
          if (!guard(cur)) return { why: 'phase' };
          if (roster.some(u => !cur.players || !cur.players[u])) return { why: 'stale' };   // someone left while we dealt
          const prev = cur.state || {};
          const names = {}; roster.forEach(u => { names[u] = cur.players[u].name; });
          cur.phase = 'reveal'; cur.open = false;
          cur.state = {
            round, total: cfg.total, category: cfg.category, anon: cfg.anon, deal: dealId, starter, roster: rmap, names,
            used: Object.assign({}, fresh ? {} : prev.used, { ['w' + wi]: true }),
          };
          if (!fresh) ['scores', 'escapes', 'hits'].forEach(k => { if (prev[k]) cur.state[k] = prev[k]; });
          return { room: cur };
        });
        if (r.ok) { await wipeDeal(code, old.deal, Object.assign({}, old.roster, room.players)); return { ok: true }; }
        await wipeDeal(code, dealId, rmap);
        if (r.why !== 'stale') return { ok: false, error: r.why };
      }
      return { ok: false, error: 'busy' };
    }

    // ── what a phone can ask for ─────────────────────────────────
    async function handle(uid, data) {
      const d = data || {};
      const code = String(d.code || ''), action = String(d.action || '');
      if (!uid || !KEY_RE.test(String(uid))) return { ok: false, error: 'signin' };
      if (!CODE_RE.test(code) || !ACTIONS.includes(action)) return { ok: false, error: 'bad_request' };
      const room = await db.get('rooms/' + code);
      if (!room) return { ok: false, error: 'not_found' };
      if (room.ref !== true || room.game !== GAME) return { ok: false, error: 'bad_request' };
      if (!room.players || !room.players[uid]) return { ok: false, error: 'not_in_room' };
      if (LEADER_ONLY.includes(action) && room.leader !== uid) return { ok: false, error: 'not_leader' };
      const done = r => (r.ok ? { ok: true } : { ok: false, error: r.why });

      if (action === 'start' || action === 'next' || action === 'again') return deal(code, uid, action);

      if (action === 'ready') {
        return done(await roomTxn(code, cur => {
          if (cur.phase !== 'reveal' || !cur.state) return { why: 'phase' };
          const act = active(cur);
          if (!act.includes(uid)) return { why: 'sitting_out' };
          cur.state.ready = cur.state.ready || {};
          if (cur.state.ready[uid]) return { why: 'noop' };
          cur.state.ready[uid] = true;
          if (act.every(u => cur.state.ready[u])) cur.phase = 'vote';
          return { room: cur };
        }));
      }

      if (action === 'vote') {
        const target = String(d.target || '');
        if (room.phase !== 'vote' || !room.state) return { ok: false, error: 'phase' };
        const act = active(room);
        if (!act.includes(uid)) return { ok: false, error: 'sitting_out' };
        if (!KEY_RE.test(target) || target === uid || !act.includes(target)) return { ok: false, error: 'bad_vote' };
        // a vote is locked: the first one stands
        await db.txn(`secret/${code}/${room.state.deal}`, cur => {
          if (cur === null || cur === undefined) return null;              // round already over and cleaned up
          if (!cur.imposter || (cur.ballots && cur.ballots[uid])) return undefined;
          cur.ballots = cur.ballots || {}; cur.ballots[uid] = target;
          return cur;
        });
        await settle(code);
        return { ok: true };
      }

      if (action === 'skip') {
        const r = await roomTxn(code, cur => {
          if (cur.leader !== uid) return { why: 'not_leader' };
          if ((cur.phase !== 'reveal' && cur.phase !== 'vote') || !cur.state) return { why: 'phase' };
          const st = cur.state, did = (cur.phase === 'reveal' ? st.ready : st.voted) || {};
          const gone = active(cur).filter(u => cur.players[u].online === false && !did[u]);
          if (!gone.length) return { why: 'noop' };
          st.skip = st.skip || {}; gone.forEach(u => { st.skip[u] = true; });
          return { room: cur };
        });
        if (r.ok) await settle(code);
        return done(r);
      }

      if (action === 'end') {
        return done(await roomTxn(code, cur => {
          if (cur.leader !== uid) return { why: 'not_leader' };
          if (!['reveal', 'vote', 'result'].includes(cur.phase) || !cur.state) return { why: 'phase' };
          return { room: toFinal(cur, 'ended') };
        }));
      }

      // lobby: back to the waiting room
      const r = await roomTxn(code, cur => {
        if (cur.leader !== uid) return { why: 'not_leader' };
        if (cur.phase === 'waiting') return { why: 'noop' };
        cur.phase = 'waiting'; delete cur.state; delete cur.open;
        return { room: cur };
      });
      if (r.ok) await wipeRoom(code);
      return done(r);
    }

    function wipeRoom(code) {
      if (!CODE_RE.test(String(code))) return Promise.resolve();
      return db.update({ [`private/${code}`]: null, [`secret/${code}`]: null }).catch(() => {});
    }
    // A player left or was removed: the round may be able to move on, or may have to stop.
    function playerGone(code) { return CODE_RE.test(String(code)) ? settle(code) : Promise.resolve(); }

    return { handle, playerGone, wipeRoom, step, active };
  }

  const api = { makeReferee, GAME, MIN, ROUNDS, ACTIONS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Referee = api;
})(typeof self !== 'undefined' ? self : this);
