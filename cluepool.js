/* ════════════════════════════════════════════════════════════════
   Clue Pool referee · the rules of the game, run on the server.

   Two teams race to guess the same hidden movie. The actor clue is
   free; three more hints (genre, year, story) cost a token each and
   open only when every online teammate asks. The captain proposes a
   movie, teammates vote, and more than half locks it in.

     rooms/CODE/state       what everyone sees (tokens, who asked for a hint, results)
     private/CODE/UID/DEAL  only that player reads it (their team's hints, proposal, wrong guesses)
     secret/CODE/DEAL       nobody reads it (the movie and the whole round)

   The whole round lives in the secret; every action changes it in
   one safe step, then the visible parts are published from it.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';

  const GAME = 'cluepool';
  const TOKENS = 7, HINTS = 3, ROUND_MS = 120000, EARLY = 400;
  const ROUNDS = [3, 5, 7];
  const CODE_RE = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
  const KEY_RE = /^[A-Za-z0-9_-]{1,128}$/;
  const ACTIONS = ['start', 'again', 'lobby', 'end', 'next', 'hint', 'propose', 'withdraw', 'vote', 'tick', 'move', 'balance'];
  const LEADER_ONLY = ['start', 'again', 'lobby', 'end', 'next', 'move', 'balance'];
  const PLAYING = ['round', 'reveal'];
  const TRIES = 8;
  const TEAMS = ['A', 'B'];

  const keys = o => Object.keys(o || {});
  const clone = v => JSON.parse(JSON.stringify(v));
  const other = t => (t === 'A' ? 'B' : 'A');

  function makeCluePool(env) {
    const db = env.db, MOVIES = env.movies, NAMES = new Set(env.names);

    async function txn(path, fn) {
      let out = null;
      const res = await db.txn(path, cur => {
        if (cur === null || cur === undefined) { out = { why: 'not_found' }; return null; }
        out = fn(clone(cur)) || { why: 'noop' };
        return out.val ? out.val : undefined;
      });
      if (res && res.committed && out && out.val) return Object.assign({ ok: true }, out);
      return { ok: false, why: (out && out.why) || 'abort' };
    }
    const roomTxn = (code, fn) => txn('rooms/' + code, c => { const r = fn(c); return r && r.room ? { val: r.room } : r; });

    // ── who is where ──
    const teamOf = (st, u) => (st.team || {})[u];
    const members = (st, t) => keys(st.team).filter(u => st.team[u] === t);
    const onlineOf = (room, t) => members(room.state, t).filter(u => room.players && room.players[u] && room.players[u].online !== false);
    // the captain: the first of the team (in joining order) who is online
    const captainOf = (room, t) => String(room.state.ord || '').split(',').find(u => teamOf(room.state, u) === t && room.players && room.players[u] && room.players[u].online !== false) || null;

    // ── the rules, applied to the secret round (pure) ──
    // Returns true when anything changed.
    function settle(sec, room, now) {
      if (sec.ended) return false;
      let changed = false;
      const movie = MOVIES[sec.mi].n;
      for (const t of TEAMS) {
        const tm = sec.teams[t];
        if (sec.winner || tm.status === 'correct' || tm.status === 'done') continue;
        const on = onlineOf(room, t);
        if (!on.length) continue;                                            // nobody here right now: wait (the timer still ends the round)
        if (tm.prop && tm.prop.by !== captainOf(room, t)) { delete tm.prop; changed = true; }   // the captain changed: cancel
        const hv = tm.hv || {};
        if (tm.status === 'playing' && tm.hs < HINTS && tm.tokens >= 2 && on.every(u => hv[u])) {
          tm.hs++; tm.tokens--; delete tm.hv; changed = true; continue;
        }
        const pr = tm.prop;
        if (pr) {
          const v = pr.votes || {};
          const yes = on.filter(u => v[u] === 'yes').length, no = on.filter(u => v[u] === 'no').length;
          if (yes * 2 > on.length) {                                         // more than half: locked in
            delete tm.prop; changed = true;
            const right = pr.movie === movie;
            tm.log = (tm.log || []).concat([{ m: pr.movie, ok: right }]);
            if (right) { tm.score = tm.status === 'final' ? 1 : tm.tokens; tm.status = 'correct'; sec.winner = t; sec.wonAt = now; }
            else if (tm.status === 'final') { tm.score = -1; tm.status = 'done'; }
            else { tm.tokens--; if (tm.tokens <= 0) { tm.tokens = 0; tm.status = 'final'; delete tm.hv; } }
          } else if (no * 2 >= on.length) { delete tm.prop; changed = true; }   // half or more said no
        }
      }
      const fin = t => sec.teams[t].status === 'correct' || sec.teams[t].status === 'done';
      if (sec.winner || now >= sec.deadline - EARLY || (fin('A') && fin('B'))) {
        for (const t of TEAMS) if (!fin(t)) sec.teams[t].status = 'done';
        sec.ended = true; changed = true;
      }
      return changed;
    }

    // ── publish: copy the visible parts of the secret to the room and to each player's private card ──
    function privateCard(sec, t) {
      const mv = MOVIES[sec.mi], tm = sec.teams[t];
      const hints = [mv.g, String(mv.y), mv.s].slice(0, tm.hs);
      const card = { team: t, actor: mv.a, v: sec.v };
      if (hints.length) card.hints = hints;
      if (tm.log && tm.log.length) card.log = tm.log;
      if (tm.prop) card.prop = tm.prop;
      return card;
    }
    async function publish(code, deal) {
      for (let i = 0; i < TRIES; i++) {
        const sec = await db.get(`secret/${code}/${deal}`);
        if (!sec) return;
        const room = await db.get('rooms/' + code);
        if (!room || !room.state || room.state.deal !== deal) return;
        const up = {};
        if (!sec.ended) keys(room.state.team).forEach(u => { up[`private/${code}/${u}/${deal}`] = privateCard(sec, room.state.team[u]); });
        if (keys(up).length) await db.update(up);
        const pub = {};
        TEAMS.forEach(t => { const tm = sec.teams[t]; pub[t] = { tokens: tm.tokens, hs: tm.hs, status: tm.status }; if (tm.hv) pub[t].hv = tm.hv; if (tm.prop) pub[t].prop = true; });
        const r = await roomTxn(code, c => {
          if (c.phase !== 'round' || !c.state || c.state.deal !== deal) return { why: 'phase' };
          if ((c.state.v || 0) > sec.v) return { why: 'stale' };
          const st = c.state;
          st.v = sec.v; st.teams = pub;
          if (sec.ended) {
            const mv = MOVIES[sec.mi];
            const A = sec.teams.A.score || 0, B = sec.teams.B.score || 0;
            st.result = { movie: mv.n, actor: mv.a, year: mv.y, A, B, winner: sec.winner || null };
            if (sec.winner) st.result.left = Math.max(0, Math.round((sec.deadline - sec.wonAt) / 1000));
            TEAMS.forEach(t => { if (sec.teams[t].log) st.result['log' + t] = sec.teams[t].log; });
            st.totals = { A: ((st.totals || {}).A || 0) + A, B: ((st.totals || {}).B || 0) + B };
            st.history = (st.history || []).concat([{ m: mv.n, A, B }]);
            delete st.deadline;
            c.phase = 'reveal'; c.open = true;
          }
          return { room: c };
        });
        // someone changed the round while we were publishing? go again with the newest
        const again = await db.get(`secret/${code}/${deal}`);
        if (again && again.v === sec.v) {
          if (sec.ended) await wipePrivate(code, room.state, deal);   // also after a slower, older publish wrote cards late
          return;
        }
      }
    }
    const wipePrivate = (code, st, deal) => { const up = {}; keys(st.team).forEach(u => { up[`private/${code}/${u}/${deal}`] = null; }); return keys(up).length ? db.update(up).catch(() => {}) : Promise.resolve(); };

    // One action on the round: change the secret in one safe step, settle the rules, publish.
    async function act(code, room, fn) {
      const deal = room.state.deal, now = env.now();
      const r = await txn(`secret/${code}/${deal}`, sec => {
        if (sec.ended) return { why: 'phase' };
        const why = fn ? fn(sec) : null;
        if (why) return { why };
        const moved = settle(sec, room, now);
        if (fn === null && !moved) return { why: 'noop' };
        sec.v = (sec.v || 0) + 1;
        return { val: sec };
      });
      if (!r.ok) return { ok: r.why === 'noop', error: r.why };
      await publish(code, deal);
      return { ok: true };
    }

    // ── dealing a round ──
    function assignTeams(room) {
      const ps = room.players || {}, team = {};
      const ids = keys(ps).sort((a, b) => ((ps[a].tj || ps[a].joinedAt || 0) - (ps[b].tj || ps[b].joinedAt || 0)));
      const prev = (room.state && room.state.team) || {};
      ids.forEach(u => { const t = prev[u] || ps[u].team; if (t === 'A' || t === 'B') team[u] = t; });
      ids.forEach(u => { if (!team[u]) { const a = ids.filter(x => team[x] === 'A').length, b = ids.filter(x => team[x] === 'B').length; team[u] = a <= b ? 'A' : 'B'; } });
      return { team, ord: ids.join(',') };
    }
    function toFinal(room, why) {
      room.phase = 'final'; room.open = true;
      const st = room.state;
      ['deadline', 'teams', 'result', 't0', 'deal', 'v'].forEach(k => delete st[k]);
      if (why) st.short = why; else delete st.short;
      return room;
    }
    async function deal(code, guard, first) {
      for (let i = 0; i < TRIES; i++) {
        const room = await db.get('rooms/' + code);
        if (!room || !guard(room)) return { ok: false, error: 'phase' };
        const { team, ord } = assignTeams(first ? Object.assign({}, room, { state: null }) : room);
        const ps = room.players || {};
        const on = t => keys(team).filter(u => team[u] === t && ps[u].online !== false).length;
        if (!on('A') || !on('B')) {
          if (first) return { ok: false, error: 'teams' };
          const r = await roomTxn(code, c => (guard(c) ? { room: toFinal(c, 'few') } : { why: 'phase' }));
          return r.ok ? { ok: true } : { ok: false, error: r.why };
        }
        const now = env.now();
        const old = room.state || {};
        let st;
        if (first) {
          const s = room.settings || {};
          st = { round: 1, total: ROUNDS.includes(Number(s.rounds)) ? Number(s.rounds) : 3, totals: { A: 0, B: 0 }, used: {} };
        } else {
          st = clone(old);
          const tied = (st.totals || {}).A === (st.totals || {}).B;
          if (st.round >= st.total && !(tied && !st.tb)) {
            const r = await roomTxn(code, c => (guard(c) ? { room: toFinal(c, null) } : { why: 'phase' }));
            return r.ok ? { ok: true } : { ok: false, error: r.why };
          }
          if (st.round >= st.total) st.tb = true;            // one extra round to break the tie
          st.round++;
        }
        const used = st.used || {};
        let pool = MOVIES.map((_, n) => n).filter(n => !used[n]);
        if (!pool.length) pool = MOVIES.map((_, n) => n);
        const mi = pool[env.rng(pool.length)];
        const dealId = env.id();
        const T = () => ({ tokens: TOKENS, hs: 0, status: 'playing', score: 0 });
        const sec = { mi, v: 1, deadline: now + ROUND_MS, teams: { A: T(), B: T() } };
        const up = { [`secret/${code}/${dealId}`]: sec };
        keys(team).forEach(u => { up[`private/${code}/${u}/${dealId}`] = privateCard(sec, team[u]); });
        await db.update(up);
        const r = await roomTxn(code, cur => {
          if (!guard(cur)) return { why: 'phase' };
          if (keys(team).some(u => !cur.players || !cur.players[u]) || keys(cur.players).some(u => !team[u])) return { why: 'stale' };
          const ns = Object.assign({}, st, { deal: dealId, t0: now, deadline: now + ROUND_MS, team, ord, v: 1,
            teams: { A: { tokens: TOKENS, hs: 0, status: 'playing' }, B: { tokens: TOKENS, hs: 0, status: 'playing' } } });
          ns.used = Object.assign({}, st.used, { [mi]: true });
          ns.names = {}; keys(cur.players).forEach(u => { ns.names[u] = cur.players[u].name; });
          ['result', 'short'].forEach(k => delete ns[k]);
          if (first) { ns.totals = { A: 0, B: 0 }; delete ns.history; delete ns.tb; }
          cur.phase = 'round'; cur.open = false; cur.state = ns;
          return { room: cur };
        });
        if (r.ok) { if (old.deal) await db.update({ [`secret/${code}/${old.deal}`]: null }).catch(() => {}); return { ok: true }; }
        const undo = { [`secret/${code}/${dealId}`]: null }; keys(team).forEach(u => { undo[`private/${code}/${u}/${dealId}`] = null; });
        await db.update(undo).catch(() => {});
        if (r.why !== 'stale') return { ok: false, error: r.why };
      }
      return { ok: false, error: 'busy' };
    }

    // ── waiting room: the leader moves players between teams ──
    async function move(code, room, uid, t) {
      if (room.phase !== 'waiting' || !room.players[uid] || !TEAMS.includes(t)) return { ok: false, error: 'bad_request' };
      await db.update({ [`rooms/${code}/players/${uid}/team`]: t, [`rooms/${code}/players/${uid}/tj`]: env.now() });
      return { ok: true };
    }
    async function balance(code, room) {
      if (room.phase !== 'waiting') return { ok: false, error: 'phase' };
      const ps = room.players, ids = keys(ps).sort((a, b) => (ps[a].joinedAt || 0) - (ps[b].joinedAt || 0));
      const up = {};
      ids.forEach((u, i) => { up[`rooms/${code}/players/${u}/team`] = i % 2 ? 'B' : 'A'; up[`rooms/${code}/players/${u}/tj`] = ps[u].joinedAt || i; });
      await db.update(up);
      return { ok: true };
    }

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

      if (action === 'start') return deal(code, c => c.leader === uid && c.phase === 'waiting', true);
      if (action === 'again') return deal(code, c => c.leader === uid && c.phase === 'final', true);
      if (action === 'next') { const deal0 = room.state && room.state.deal; return deal(code, c => c.phase === 'reveal' && c.state && c.state.deal === deal0, false); }
      if (action === 'move') return move(code, room, String(d.uid || ''), String(d.team || ''));
      if (action === 'balance') return balance(code, room);
      if (action === 'end') {
        const r = await roomTxn(code, c => (PLAYING.includes(c.phase) && c.state ? { room: toFinal(c, 'ended') } : { why: 'phase' }));
        if (r.ok) await wipeRoom(code);
        return r.ok ? { ok: true } : { ok: false, error: r.why };
      }
      if (action === 'lobby') {
        const r = await roomTxn(code, c => {
          if (c.phase === 'waiting') return { why: 'noop' };
          c.phase = 'waiting'; delete c.state; delete c.open;
          return { room: c };
        });
        if (r.ok) await wipeRoom(code);
        return r.ok ? { ok: true } : { ok: false, error: r.why };
      }

      // ── during a round ──
      if (room.phase !== 'round' || !room.state) return { ok: false, error: 'phase' };
      if (action === 'tick') return act(code, room, null);
      const t = teamOf(room.state, uid);
      if (!t) return { ok: false, error: 'phase' };
      const live = tm => tm.status === 'playing' || tm.status === 'final';
      if (action === 'hint') return act(code, room, sec => {
        const tm = sec.teams[t];
        if (tm.status !== 'playing' || tm.hs >= HINTS || tm.tokens < 2) return 'no_hint';
        tm.hv = Object.assign({}, tm.hv);
        if (tm.hv[uid]) delete tm.hv[uid]; else tm.hv[uid] = true;
        if (!keys(tm.hv).length) delete tm.hv;
      });
      if (action === 'propose') {
        const movie = String(d.movie || '');
        if (!NAMES.has(movie)) return { ok: false, error: 'bad_movie' };
        if (captainOf(room, t) !== uid) return { ok: false, error: 'not_captain' };
        return act(code, room, sec => {
          const tm = sec.teams[t];
          if (!live(tm) || sec.winner) return 'phase';
          if ((tm.log || []).some(l => l.m === movie)) return 'tried';
          tm.prop = { movie, by: uid, votes: { [uid]: 'yes' } };
        });
      }
      if (action === 'withdraw') return act(code, room, sec => {
        const tm = sec.teams[t];
        if (!tm.prop || tm.prop.by !== uid) return 'noop';
        delete tm.prop;
      });
      if (action === 'vote') {
        const v = d.v === 'yes' ? 'yes' : d.v === 'no' ? 'no' : null;
        if (!v) return { ok: false, error: 'bad_request' };
        return act(code, room, sec => {
          const tm = sec.teams[t];
          if (!tm.prop || !live(tm)) return 'noop';
          if (tm.prop.by === uid) return 'noop';                // the captain's proposal is already their yes
          tm.prop.votes = Object.assign({}, tm.prop.votes, { [uid]: v });
        });
      }
      return { ok: false, error: 'bad_request' };
    }

    function wipeRoom(code) {
      if (!CODE_RE.test(String(code))) return Promise.resolve();
      return db.update({ [`private/${code}`]: null, [`secret/${code}`]: null }).catch(() => {});
    }
    // A player left or was removed: their votes no longer count, the captain may change.
    async function playerGone(code) {
      if (!CODE_RE.test(String(code))) return;
      const room = await db.get('rooms/' + code);
      if (!room || !room.state || !PLAYING.includes(room.phase)) return;
      if (keys(room.players).length < 2) {
        await roomTxn(code, c => (PLAYING.includes(c.phase) && c.state ? { room: toFinal(c, 'few') } : { why: 'phase' }));
        return wipeRoom(code);
      }
      if (room.phase === 'round') return act(code, room, null);
    }

    return { handle, playerGone, wipeRoom };
  }

  const api = { makeCluePool, GAME, TOKENS, HINTS, ROUND_MS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CluePool = api;
})(typeof self !== 'undefined' ? self : this);
