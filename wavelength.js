/* ════════════════════════════════════════════════════════════════
   Wavelength referee · the rules of the game, run on the server.

   Each round one player is the psychic. Only they see where the
   target sits on a movie scale (Flop ↔ Blockbuster…). They type a
   clue; everyone else drags their own dial and locks in. Nobody sees
   anyone else's dial until the reveal. Closer = more points.

     rooms/CODE/state      what everyone sees (scale, clue, who locked, results)
     private/CODE/UID/DEAL only the psychic reads it (the target)
     secret/CODE/DEAL      nobody reads it (the target, everyone's dials)

   Phones ask: start, clue, lock, unlock, tick (a timer ran out),
   next, again, lobby, end. Time is always checked on the server.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';

  const GAME = 'wavelength';
  const MIN = 2, LEAST = 2;
  const ANIM_MS = 3400, CLUE_MS = 60000, GUESS_MS = 30000, GRACE_MS = 2500, EARLY = 400;
  const ROUNDS = [4, 6, 8];
  const CODE_RE = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
  const KEY_RE = /^[A-Za-z0-9_-]{1,128}$/;
  const ACTIONS = ['start', 'again', 'lobby', 'end', 'next', 'clue', 'lock', 'unlock', 'tick'];
  const LEADER_ONLY = ['start', 'again', 'lobby', 'end', 'next'];
  const PLAYING = ['clue', 'guess', 'reveal'];
  const TRIES = 6;

  const keys = o => Object.keys(o || {});
  const clone = v => JSON.parse(JSON.stringify(v));
  // 4 = within 4, 3 = within 10, 2 = within 18 (the dial runs 0..100)
  const ptsFor = d => (d <= 4 ? 4 : d <= 10 ? 3 : d <= 18 ? 2 : 0);
  // the clue may not use the words printed on the scale
  const scaleWords = sc => new Set((sc.l + ' ' + sc.r).toLowerCase().split(/[^a-z]+/).filter(w => w.length >= 4));
  const usesScale = (clue, sc) => { const bad = scaleWords(sc); return clue.toLowerCase().split(/[^a-z]+/).some(w => bad.has(w)); };

  function makeWavelength(env) {
    const db = env.db, SCALES = env.scales;

    async function roomTxn(code, fn) {
      let out = null;
      const res = await db.txn('rooms/' + code, cur => {
        if (cur === null || cur === undefined) { out = { why: 'not_found' }; return null; }
        out = fn(clone(cur)) || { why: 'noop' };
        return out.room ? out.room : undefined;
      });
      if (res && res.committed && out && out.room) return { ok: true, room: out.room };
      return { ok: false, why: (out && out.why) || 'abort' };
    }
    const wipeDeal = (code, deal, psychic) => (deal ? db.update({ [`secret/${code}/${deal}`]: null, [`private/${code}/${psychic}/${deal}`]: null }).catch(() => {}) : Promise.resolve());

    const order = st => (st.order ? String(st.order).split(',').filter(Boolean) : []);
    const online = room => keys(room.players).filter(u => room.players[u].online !== false);
    // Who guesses this round: everyone in the room except the psychic who is online or has locked in.
    const guessers = room => keys(room.players).filter(u => u !== room.state.psychic && (room.players[u].online !== false || (room.state.locked || {})[u]));

    // Next psychic: the next person in the order who is still here and online. New players join the end.
    function nextPsychic(room) {
      const st = room.state, ps = room.players || {};
      const ord = order(st).filter(u => ps[u]);
      keys(ps).sort((a, b) => (ps[a].joinedAt || 0) - (ps[b].joinedAt || 0)).forEach(u => { if (!ord.includes(u)) ord.push(u); });
      let idx = ord.indexOf(st.psychic);
      if (idx < 0) idx = (st.pi || 0) - 1;
      for (let step = 0; step < ord.length; step++) {
        idx = (idx + 1) % ord.length;
        if (ps[ord[idx]] && ps[ord[idx]].online !== false) return { psychic: ord[idx], pi: idx, ord };
      }
      return null;
    }
    function toFinal(room, why) {
      room.phase = 'final'; room.open = true;
      const st = room.state;
      ['deadline', 'clue', 'locked', 'result', 't0', 'deal'].forEach(k => delete st[k]);
      if (why) st.short = why; else delete st.short;
      return room;
    }

    // Deal a round: pick a scale and a target, tell only the psychic.
    async function deal(code, guard, first) {
      for (let i = 0; i < TRIES; i++) {
        const room = await db.get('rooms/' + code);
        if (!room || !guard(room)) return { ok: false, error: 'phase' };
        if (online(room).length < LEAST) {
          if (first) return { ok: false, error: 'few' };
          const r = await roomTxn(code, c => (guard(c) ? { room: toFinal(c, 'few') } : { why: 'phase' }));
          if (room.state) await wipeDeal(code, room.state.deal, room.state.psychic);
          return r.ok ? { ok: true } : { ok: false, error: r.why };
        }
        const now = env.now();
        let st;
        if (first) {
          const ps = online(room).sort((a, b) => (room.players[a].joinedAt || 0) - (room.players[b].joinedAt || 0));
          const s = room.settings || {};
          st = { round: 1, total: ROUNDS.includes(Number(s.rounds)) ? Number(s.rounds) : 6, order: ps.join(','), pi: 0, psychic: ps[env.rng(ps.length)], scores: {}, used: {} };
          st.pi = ps.indexOf(st.psychic);
        } else {
          if (room.state.round >= room.state.total) {
            const r = await roomTxn(code, c => (guard(c) ? { room: toFinal(c, null) } : { why: 'phase' }));
            await wipeDeal(code, room.state.deal, room.state.psychic);
            return r.ok ? { ok: true } : { ok: false, error: r.why };
          }
          const nx = nextPsychic(room);
          st = Object.assign(clone(room.state), { round: room.state.round + 1, order: nx.ord.join(','), pi: nx.pi, psychic: nx.psychic });
        }
        // a scale nobody has had yet this game
        const used = st.used || {};
        let pool = SCALES.map((_, n) => n).filter(n => !used[n]);
        if (!pool.length) pool = SCALES.map((_, n) => n);
        const si = pool[env.rng(pool.length)];
        const target = 6 + env.rng(89);            // 6..94, so the whole target fits on the dial
        const dealId = env.id();
        await db.update({
          [`secret/${code}/${dealId}`]: { target, guesses: {} },
          [`private/${code}/${st.psychic}/${dealId}`]: { target },
        });
        const old = room.state || {};
        const r = await roomTxn(code, cur => {
          if (!guard(cur)) return { why: 'phase' };
          if (!cur.players || !cur.players[st.psychic]) return { why: 'stale' };
          const ns = Object.assign({}, st, { deal: dealId, scale: { l: SCALES[si].l, r: SCALES[si].r }, t0: now, deadline: now + ANIM_MS + CLUE_MS });
          ns.used = Object.assign({}, st.used, { [si]: true });
          ns.names = {}; keys(cur.players).forEach(u => { ns.names[u] = cur.players[u].name; });
          ['clue', 'locked', 'result', 'short'].forEach(k => delete ns[k]);
          if (first) ns.scores = {};
          cur.phase = 'clue'; cur.open = false; cur.state = ns;
          return { room: cur };
        });
        if (r.ok) { await wipeDeal(code, old.deal, old.psychic); return { ok: true }; }
        await wipeDeal(code, dealId, st.psychic);
        if (r.why !== 'stale') return { ok: false, error: r.why };
      }
      return { ok: false, error: 'busy' };
    }

    // Show the answer and score the round. `why`: null (normal), 'time' (no clue in time), 'left' (the psychic left).
    async function reveal(code, deal, why) {
      for (let i = 0; i < TRIES; i++) {
        const sec = await db.get(`secret/${code}/${deal}`);
        if (!sec) return { ok: false, error: 'phase' };
        const guesses = sec.guesses || {};
        const r = await roomTxn(code, c => {
          if (!c.state || c.state.deal !== deal || (c.phase !== 'clue' && c.phase !== 'guess')) return { why: 'phase' };
          const st = c.state, locked = st.locked || {};
          if (keys(locked).some(u => guesses[u] === undefined)) return { why: 'retry' };   // a lock is still on its way
          const res = { target: sec.target, guesses: {}, pts: {} };
          if (why) res.skipped = why;
          else {
            const gs = guessers(c);
            gs.forEach(u => {
              const v = locked[u] ? guesses[u] : undefined;
              if (v !== undefined) res.guesses[u] = v;
              res.pts[u] = v === undefined ? 0 : ptsFor(Math.abs(v - sec.target));
            });
            const avg = gs.length ? gs.reduce((a, u) => a + res.pts[u], 0) / gs.length : 0;
            res.pts[st.psychic] = Math.max(0, Math.round(avg) - 1);
            st.scores = Object.assign({}, st.scores);
            keys(res.pts).forEach(u => { st.scores[u] = (st.scores[u] || 0) + res.pts[u]; });
          }
          c.phase = 'reveal'; c.open = true;
          st.result = res;
          delete st.deadline; delete st.locked;
          return { room: c };
        });
        if (r.ok) return { ok: true };
        if (r.why !== 'retry') return { ok: false, error: r.why };
      }
      return { ok: false, error: 'busy' };
    }

    async function giveClue(code, uid, text) {
      const t = String(text || '').replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
      if (!t) return { ok: false, error: 'bad_clue' };
      const room = await db.get('rooms/' + code);
      if (!room || room.phase !== 'clue' || !room.state || room.state.psychic !== uid) return { ok: false, error: 'phase' };
      if (usesScale(t, room.state.scale)) return { ok: false, error: 'scale_word' };
      const now = env.now();
      if (now < room.state.t0 + ANIM_MS - 1500) return { ok: false, error: 'phase' };   // still rolling
      const r = await roomTxn(code, c => {
        if (c.phase !== 'clue' || !c.state || c.state.deal !== room.state.deal) return { why: 'phase' };
        c.phase = 'guess'; c.state.clue = t; c.state.deadline = now + GUESS_MS; c.state.locked = {};
        return { room: c };
      });
      return r.ok ? { ok: true } : { ok: false, error: r.why };
    }

    async function lock(code, uid, v) {
      const val = Math.round(Number(v) * 10) / 10;
      if (!Number.isFinite(val) || val < 0 || val > 100) return { ok: false, error: 'bad_request' };
      const room = await db.get('rooms/' + code);
      if (!room || room.phase !== 'guess' || !room.state) return { ok: false, error: 'phase' };
      const st0 = room.state;
      if (st0.psychic === uid) return { ok: false, error: 'phase' };
      if (env.now() > st0.deadline + GRACE_MS) return { ok: false, error: 'late' };
      await db.update({ [`secret/${code}/${st0.deal}/guesses/${uid}`]: val });
      let all = false;
      const r = await roomTxn(code, c => {
        if (c.phase !== 'guess' || !c.state || c.state.deal !== st0.deal) return { why: 'phase' };
        c.state.locked = Object.assign({}, c.state.locked, { [uid]: true });
        all = guessers(c).filter(u => c.players[u].online !== false).every(u => c.state.locked[u]);
        return { room: c };
      });
      if (!r.ok) return { ok: false, error: r.why };
      if (all) await reveal(code, st0.deal, null);
      return { ok: true };
    }

    async function unlock(code, uid) {
      const room = await db.get('rooms/' + code);
      if (!room || room.phase !== 'guess' || !room.state) return { ok: false, error: 'phase' };
      const deal0 = room.state.deal;
      const r = await roomTxn(code, c => {
        if (c.phase !== 'guess' || !c.state || c.state.deal !== deal0 || !(c.state.locked || {})[uid]) return { why: 'noop' };
        c.state.locked = Object.assign({}, c.state.locked); delete c.state.locked[uid];
        return { room: c };
      });
      return r.ok ? { ok: true } : { ok: false, error: r.why };
    }

    // A timer ran out on someone's phone: check the server's clock and move on if it really did.
    async function tick(code) {
      const room = await db.get('rooms/' + code);
      if (!room || !room.state) return { ok: true };
      const st = room.state, now = env.now();
      if (room.phase === 'clue' && now >= st.deadline - EARLY) return reveal(code, st.deal, 'time');
      if (room.phase === 'guess' && now >= st.deadline + GRACE_MS - EARLY) return reveal(code, st.deal, null);
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
      if (action === 'clue') return giveClue(code, uid, d.text);
      if (action === 'lock') return lock(code, uid, d.v);
      if (action === 'unlock') return unlock(code, uid);
      if (action === 'tick') return tick(code);
      if (action === 'end') {
        const r = await roomTxn(code, c => (PLAYING.includes(c.phase) && c.state ? { room: toFinal(c, 'ended') } : { why: 'phase' }));
        if (r.ok) await wipeRoom(code);
        return r.ok ? { ok: true } : { ok: false, error: r.why };
      }
      // lobby
      const r = await roomTxn(code, c => {
        if (c.phase === 'waiting') return { why: 'noop' };
        c.phase = 'waiting'; delete c.state; delete c.open;
        return { room: c };
      });
      if (r.ok) await wipeRoom(code);
      return r.ok ? { ok: true } : { ok: false, error: r.why };
    }

    function wipeRoom(code) {
      if (!CODE_RE.test(String(code))) return Promise.resolve();
      return db.update({ [`private/${code}`]: null, [`secret/${code}`]: null }).catch(() => {});
    }
    // A player left or was removed.
    async function playerGone(code) {
      if (!CODE_RE.test(String(code))) return;
      const room = await db.get('rooms/' + code);
      if (!room || !room.state || !PLAYING.includes(room.phase)) return;
      const st = room.state;
      if (keys(room.players).length < LEAST) {
        await roomTxn(code, c => (PLAYING.includes(c.phase) && c.state ? { room: toFinal(c, 'few') } : { why: 'phase' }));
        return wipeRoom(code);
      }
      if ((room.phase === 'clue' || room.phase === 'guess') && !room.players[st.psychic]) return reveal(code, st.deal, 'left');
      if (room.phase === 'guess') {   // the ones who were left to lock in are gone
        const g = guessers(room).filter(u => room.players[u].online !== false);
        if (g.length && g.every(u => (st.locked || {})[u])) return reveal(code, st.deal, null);
        if (!g.length) return reveal(code, st.deal, null);
      }
    }

    return { handle, playerGone, wipeRoom };
  }

  const api = { makeWavelength, GAME, ptsFor, usesScale, ANIM_MS, CLUE_MS, GUESS_MS, GRACE_MS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Wavelength = api;
})(typeof self !== 'undefined' ? self : this);
