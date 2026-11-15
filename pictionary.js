/* ════════════════════════════════════════════════════════════════
   Pictionary referee · the rules of the game, run on the server.

   One player draws, everyone else guesses. The drawer picks one of
   three movies (easy, medium, hard). The referee keeps the movie
   secret, checks every guess, reveals letters as time runs out,
   scores, and moves the game from turn to turn.

     rooms/CODE/state      what everyone sees (blanks, guesses, scores)
     private/CODE/UID/DEAL only the drawer reads it (the three choices, the movie)
     secret/CODE/DEAL      nobody reads it (the movie)
     draw/CODE             the drawing itself: written by the drawer, read by all

   Phones ask: start, choose, guess, tick (a timer ran out), again,
   lobby, end. Time is always checked against the server's clock.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';

  const GAME = 'pictionary';
  const MIN = 3, LEAST = 2;               // 3 to start, the game stops below 2
  const PICK_MS = 15000, OVER_MS = 6000;  // time to pick a movie, pause after a turn
  const TIMES = [60, 80, 100], ROUNDS = [1, 2, 3];
  const MULT = { easy: 1, medium: 1.5, hard: 2 };
  const CODE_RE = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
  const KEY_RE = /^[A-Za-z0-9_-]{1,128}$/;
  const ACTIONS = ['start', 'again', 'lobby', 'end', 'choose', 'guess', 'tick'];
  const LEADER_ONLY = ['start', 'again', 'lobby', 'end'];
  const FEED_MAX = 12, EARLY = 400, TRIES = 6;

  const keys = o => Object.keys(o || {});
  const clone = v => JSON.parse(JSON.stringify(v));
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  function dist(a, b) {
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  // exact (ignoring case, spaces and punctuation) = ok; 1 letter off (2 for long titles) = close
  function verdict(guess, word) {
    const a = norm(guess), b = norm(word);
    if (!a) return 'no';
    if (a === b) return 'ok';
    return Math.abs(a.length - b.length) <= 2 && dist(a, b) <= (b.length >= 8 ? 2 : 1) ? 'close' : 'no';
  }
  const maskOf = (word, shown) => [...word].map((ch, i) => (/[a-z0-9]/i.test(ch) ? (shown && shown[i] ? ch.toUpperCase() : '_') : ch)).join('');
  const letters = word => [...word].filter(ch => /[a-z0-9]/i.test(ch)).length;
  const maxReveal = n => (n <= 3 ? 1 : n < 10 ? 2 : 3);

  function makePictionary(env) {
    const db = env.db, MOVIES = env.movies;
    const pick = list => list[env.rng(list.length)];

    // ── small readers ──
    const order = st => (st.order ? String(st.order).split(',').filter(Boolean) : []);
    const guessers = room => keys(room.players).filter(u => u !== room.state.drawer && room.players[u].online !== false);
    function feedAdd(st, item, now) {
      st.feed = st.feed || {};
      st.feed[String(now).padStart(14, '0') + env.id().slice(0, 4)] = item;
      const ks = keys(st.feed).sort();
      ks.slice(0, Math.max(0, ks.length - FEED_MAX)).forEach(k => delete st.feed[k]);
    }

    // ── database helpers ──
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
    const wipeDeal = (code, deal, drawer) => (deal ? db.update({ [`secret/${code}/${deal}`]: null, [`private/${code}/${drawer}/${deal}`]: null }).catch(() => {}) : Promise.resolve());
    const clearDrawing = code => db.update({ [`draw/${code}`]: null }).catch(() => {});

    // ── turns ──
    // Who draws next: the next person in the order who is still here and online. New players join the end of the order.
    function nextDrawer(room) {
      const st = room.state, ps = room.players || {};
      let ord = order(st).filter(u => ps[u]);
      keys(ps).sort((a, b) => (ps[a].joinedAt || 0) - (ps[b].joinedAt || 0)).forEach(u => { if (!ord.includes(u)) ord.push(u); });
      let idx = ord.indexOf(st.drawer);
      let round = st.round;
      if (idx < 0) idx = (st.turn || 0) - 1;
      for (let step = 0; step < ord.length * 2 + 1; step++) {
        idx++;
        if (idx >= ord.length) { idx = 0; round++; }
        if (round > st.total) return { done: true, ord };
        const u = ord[idx];
        if (ps[u] && ps[u].online !== false) return { drawer: u, idx, round, ord };
      }
      return { done: true, ord };
    }
    function toFinal(room, why) {
      room.phase = 'final'; room.open = true;
      const st = room.state;
      delete st.deadline; delete st.mask; delete st.got; delete st.feed; delete st.choosing;
      if (why) st.short = why; else delete st.short;
      return room;
    }
    function toTurnover(room, word, why, now) {
      const st = room.state;
      room.phase = 'turnover'; room.open = true;
      st.last = { drawer: st.drawer, word: word || '', n: keys(st.got).length, why: why || 'time' };
      st.deadline = now + OVER_MS;
      delete st.choosing;
      return room;
    }

    // Deal the next turn: three movie choices for the drawer. `first` = a new game.
    async function deal(code, guard, first) {
      for (let i = 0; i < TRIES; i++) {
        const room = await db.get('rooms/' + code);
        if (!room || !guard(room)) return { ok: false, error: 'phase' };
        const now = env.now();
        let st;
        if (first) {
          const ps = keys(room.players).filter(u => room.players[u].online !== false);
          if (ps.length < MIN) return { ok: false, error: 'few' };
          for (let k = ps.length - 1; k > 0; k--) { const j = env.rng(k + 1); [ps[k], ps[j]] = [ps[j], ps[k]]; }
          const s = room.settings || {};
          st = { round: 1, total: ROUNDS.includes(Number(s.rounds)) ? Number(s.rounds) : 2, time: TIMES.includes(Number(s.time)) ? Number(s.time) : 80,
                 order: ps.join(','), turn: 0, drawer: ps[0], scores: {}, drawPts: {}, used: {} };
        } else {
          const nx = nextDrawer(room);
          if (nx.done || keys(room.players).length < LEAST) {
            const r = await roomTxn(code, cur => (guard(cur) ? { room: toFinal(cur, nx.done ? null : 'few') } : { why: 'phase' }));
            await wipeDeal(code, room.state.deal, room.state.drawer); await clearDrawing(code);
            return r.ok ? { ok: true } : { ok: false, error: r.why };
          }
          st = Object.assign(clone(room.state), { round: nx.round, order: nx.ord.join(','), turn: (room.state.turn || 0) + 1, drawer: nx.drawer });
        }
        const used = st.used || {};
        const choices = ['easy', 'medium', 'hard'].map(d => {
          const list = MOVIES[d] || [];
          let pool = list.map((_, n) => n).filter(n => !used[d[0] + n]);
          if (!pool.length) pool = list.map((_, n) => n);
          const n = pick(pool);
          return { w: list[n], d, k: d[0] + n };
        });
        const dealId = env.id();
        await db.update({
          [`secret/${code}/${dealId}`]: { choices, at: now },
          [`private/${code}/${st.drawer}/${dealId}`]: { choices: choices.map(c => ({ w: c.w, d: c.d })) },
        });
        const old = room.state || {};
        const r = await roomTxn(code, cur => {
          if (!guard(cur)) return { why: 'phase' };
          if (!cur.players || !cur.players[st.drawer]) return { why: 'stale' };
          const ns = Object.assign({}, st, { deal: dealId, deadline: now + PICK_MS, choosing: true, turnPts: {}, got: {} });
          ns.names = {}; keys(cur.players).forEach(u => { ns.names[u] = cur.players[u].name; });
          delete ns.mask; delete ns.feed; delete ns.last; delete ns.short; delete ns.diff; delete ns.mult; delete ns.rev; delete ns.started; delete ns.len;
          if (first) { ns.scores = {}; ns.drawPts = {}; ns.used = {}; delete ns.quick; }
          cur.phase = 'pick'; cur.open = false; cur.state = ns;
          return { room: cur };
        });
        if (r.ok) { await wipeDeal(code, old.deal, old.drawer); await clearDrawing(code); return { ok: true }; }
        await wipeDeal(code, dealId, st.drawer);
        if (r.why !== 'stale') return { ok: false, error: r.why };
      }
      return { ok: false, error: 'busy' };
    }

    // The drawer picked (or the clock picked for them).
    async function choose(code, deal, idx) {
      const sec = await db.get(`secret/${code}/${deal}`);
      if (!sec || !sec.choices) return { ok: false, error: 'phase' };
      const want = sec.choices[idx] || sec.choices[0];
      // the first choice to arrive wins (a double tap, or the timer picking at the same moment)
      await db.txn(`secret/${code}/${deal}`, cur => (cur === null || cur === undefined ? null : cur.pick ? undefined : Object.assign({}, cur, { word: want.w, pick: want })));
      const fin = await db.get(`secret/${code}/${deal}`);
      if (!fin || !fin.pick) return { ok: false, error: 'phase' };
      const c = fin.pick;
      const now = env.now();
      const r = await roomTxn(code, cur => {
        if (cur.phase !== 'pick' || !cur.state || cur.state.deal !== deal) return { why: 'phase' };
        const st = cur.state;
        cur.phase = 'draw';
        Object.assign(st, { mask: maskOf(c.w), len: letters(c.w), diff: c.d, mult: MULT[c.d] || 1, rev: 0, started: now, deadline: now + st.time * 1000, got: {}, turnPts: {} });
        st.used = Object.assign({}, st.used, { [c.k]: true });
        delete st.choosing;
        st.feed = {}; feedAdd(st, { k: 'sys' }, now);
        return { room: cur };
      });
      if (r.ok) await db.update({ [`private/${code}/${r.room.state.drawer}/${deal}/word`]: c.w });
      return r.ok ? { ok: true } : { ok: false, error: r.why };
    }

    // End the drawing turn: show the movie to everyone.
    async function endTurn(code, deal, why) {
      const sec = await db.get(`secret/${code}/${deal}`);
      const now = env.now();
      return roomTxn(code, c => {
        if (!c.state || c.state.deal !== deal || (c.phase !== 'draw' && c.phase !== 'pick')) return { why: 'phase' };
        return { room: toTurnover(c, sec && sec.word, why, now) };
      });
    }

    // Reveal one more letter of the movie (hints come by themselves as time runs out).
    async function reveal(code, room) {
      const st = room.state, sec = await db.get(`secret/${code}/${st.deal}`);
      if (!sec || !sec.word) return;
      const hidden = [...sec.word].map((ch, i) => (/[a-z0-9]/i.test(ch) && st.mask[i] === '_' ? i : -1)).filter(i => i >= 0);
      if (hidden.length <= 1) return;
      const i = pick(hidden);
      await roomTxn(code, c => {
        if (c.phase !== 'draw' || !c.state || c.state.deal !== st.deal || c.state.rev !== st.rev) return { why: 'phase' };
        const m = c.state.mask.split(''); m[i] = sec.word[i].toUpperCase();
        c.state.mask = m.join(''); c.state.rev = (c.state.rev || 0) + 1;
        return { room: c };
      });
    }

    // A timer ran out on someone's phone: check against the server clock and move on if it really did.
    async function tick(code) {
      const room = await db.get('rooms/' + code);
      if (!room || !room.state) return { ok: true };
      const st = room.state, now = env.now();
      if (room.phase === 'pick' && now >= st.deadline - EARLY) return choose(code, st.deal, env.rng(3));
      if (room.phase === 'draw') {
        if (now >= st.deadline - EARLY) { await endTurn(code, st.deal, 'time'); return { ok: true }; }
        const f = (now - st.started) / (st.time * 1000);
        const want = Math.min(maxReveal(st.len || 0), f >= 0.75 ? 2 : f >= 0.5 ? 1 : 0) + (f >= 0.9 && maxReveal(st.len) > 2 ? 1 : 0);
        if ((st.rev || 0) < want) await reveal(code, room);
        return { ok: true };
      }
      if (room.phase === 'turnover' && now >= st.deadline - EARLY) {
        const deal0 = st.deal;
        return deal(code, c => c.phase === 'turnover' && c.state && c.state.deal === deal0, false);
      }
      return { ok: true };
    }

    async function guess(code, uid, text) {
      const t = String(text || '').replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
      if (!t) return { ok: false, error: 'bad_guess' };
      const room = await db.get('rooms/' + code);
      if (!room || room.phase !== 'draw' || !room.state) return { ok: false, error: 'phase' };
      const st0 = room.state;
      if (st0.drawer === uid) return { ok: false, error: 'drawer' };
      if (st0.got && st0.got[uid]) return { ok: true, already: true };
      const sec = await db.get(`secret/${code}/${st0.deal}`);
      if (!sec || !sec.word) return { ok: false, error: 'phase' };
      const v = verdict(t, sec.word);
      const now = env.now();
      let allIn = false, pts = 0;
      const r = await roomTxn(code, c => {
        if (c.phase !== 'draw' || !c.state || c.state.deal !== st0.deal) return { why: 'phase' };
        const st = c.state;
        if (st.got && st.got[uid]) return { why: 'noop' };
        if (v === 'ok') {
          const left = Math.max(0, Math.min(1, (st.deadline - now) / (st.time * 1000)));
          pts = Math.round((4 + 8 * left) * (st.mult || 1));
          const dp = Math.round(3 * (st.mult || 1));
          st.got = Object.assign({}, st.got, { [uid]: pts });
          st.scores = Object.assign({}, st.scores);
          st.scores[uid] = (st.scores[uid] || 0) + pts; st.scores[st.drawer] = (st.scores[st.drawer] || 0) + dp;
          st.turnPts = Object.assign({}, st.turnPts);
          st.turnPts[uid] = pts; st.turnPts[st.drawer] = (st.turnPts[st.drawer] || 0) + dp;
          st.drawPts = Object.assign({}, st.drawPts, { [st.drawer]: ((st.drawPts || {})[st.drawer] || 0) + dp });
          const secs = Math.max(1, Math.round((now - st.started) / 1000));
          if (!st.quick || secs < st.quick.s) st.quick = { u: uid, s: secs, w: sec.word };
          feedAdd(st, { u: uid, k: 'ok' }, now);
          allIn = guessers(c).every(u => st.got[u]);
          if (allIn) toTurnover(c, sec.word, 'all', now);
        } else if (v === 'close') feedAdd(st, { u: uid, k: 'close' }, now);
        else feedAdd(st, { u: uid, t }, now);
        return { room: c };
      });
      if (!r.ok) return { ok: false, error: r.why === 'noop' ? 'phase' : r.why };
      return v === 'ok' ? { ok: true, got: true, pts } : { ok: true, close: v === 'close' };
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
      if (action === 'tick') return tick(code);
      if (action === 'guess') return guess(code, uid, d.text);
      if (action === 'choose') {
        if (room.phase !== 'pick' || !room.state || room.state.drawer !== uid) return { ok: false, error: 'phase' };
        const i = Number(d.i);
        if (!(i === 0 || i === 1 || i === 2)) return { ok: false, error: 'bad_request' };
        return choose(code, room.state.deal, i);
      }
      if (action === 'end') {
        const r = await roomTxn(code, c => (['pick', 'draw', 'turnover'].includes(c.phase) && c.state ? { room: toFinal(c, 'ended') } : { why: 'phase' }));
        if (r.ok) await clearDrawing(code);
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
      return db.update({ [`private/${code}`]: null, [`secret/${code}`]: null, [`draw/${code}`]: null }).catch(() => {});
    }
    // A player left or was removed.
    async function playerGone(code) {
      if (!CODE_RE.test(String(code))) return;
      const room = await db.get('rooms/' + code);
      if (!room || !room.state || !['pick', 'draw', 'turnover'].includes(room.phase)) return;
      const st = room.state;
      if (keys(room.players).length < LEAST) { await roomTxn(code, c => (['pick', 'draw', 'turnover'].includes(c.phase) ? { room: toFinal(c, 'few') } : { why: 'phase' })); return clearDrawing(code); }
      if ((room.phase === 'pick' || room.phase === 'draw') && !room.players[st.drawer]) return endTurn(code, st.deal, 'left');
      if (room.phase === 'draw') {   // everyone left who hadn't guessed yet
        const sec = await db.get(`secret/${code}/${st.deal}`);
        await roomTxn(code, c => {
          if (c.phase !== 'draw' || !c.state || c.state.deal !== st.deal) return { why: 'phase' };
          const g = guessers(c);
          return g.length && g.every(u => (c.state.got || {})[u]) ? { room: toTurnover(c, sec && sec.word, 'all', env.now()) } : { why: 'noop' };
        });
      }
    }

    return { handle, playerGone, wipeRoom, verdict };
  }

  const api = { makePictionary, GAME, verdict, maskOf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Pictionary = api;
})(typeof self !== 'undefined' ? self : this);
