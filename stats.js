/* ════════════════════════════════════════════════════════════════
   Cinefied stats line · v0.4.0
   One line on each one-phone game, solo game and the Daily page:

     <script src="core/stats.js"></script>

   • a game page: every START (or PLAY AGAIN) counts +1 "games played"
     for this game, saved on the phone first and sent when online
   • the Daily page: today's results go to your account, and on a
     new phone your Daily history comes back from your account
   The game's own code isn't touched. Room games count through the
   core instead, so they don't need this line.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const V = '0.4.0';
  const GAME = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '').toLowerCase().replace(/[^a-z]/g, '');
  const DAILY = GAME === 'daily';
  const STARTS = '#startBtn, #againBtn, [data-solo]';
  const QUEUE_KEY = 'cf_stats_q';
  const SDK = ['app', 'auth', 'database', 'functions'].map(n => `https://www.gstatic.com/firebasejs/10.12.0/firebase-${n}-compat.js`);

  // the core (sign-in, account) is loaded only when there is something to send
  let loading = null;
  const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  function core() {
    if (window.Cinefied && window.Cinefied.syncDaily) return Promise.resolve(window.Cinefied);
    if (!loading) loading = (async () => {
      const have = n => window.firebase && (n === 'app' || typeof window.firebase[n] === 'function');
      for (const [i, u] of SDK.entries()) if (!have(['app', 'auth', 'database', 'functions'][i])) await load(u);
      await load('core/core.js?v=' + V);
      await window.Cinefied.init();
      return window.Cinefied;
    })();
    loading.catch(() => { loading = null; });
    return loading;
  }
  const later = fn => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 2500 }) : setTimeout(fn, 1200));

  // ── games played ──
  function count() {
    if (!GAME || DAILY) return;
    let q = []; try { q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch (e) {}
    const last = q.filter(x => x.g === GAME).pop();
    if (last && Date.now() - last.t < 30000) return;   // tapping START twice is still one game
    q.push({ g: GAME, t: Date.now() });
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-50))); } catch (e) {}
    later(() => core().then(C => C.flushPlayed()).catch(() => {}));
  }
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest(STARTS)) count(); }, true);

  // ── Daily ──
  if (DAILY) {
    let t = null;
    const send = () => core().then(C => C.syncDaily()).catch(() => {});
    // after any tap, send what changed (a finished puzzle); also when the page is left
    document.addEventListener('click', () => { clearTimeout(t); t = setTimeout(send, 1500); }, true);
    document.addEventListener('visibilitychange', () => { if (document.hidden) send(); });
    // a new phone: bring the account's Daily history here, then redraw the page once
    later(() => core().then(async C => {
      const added = await C.pullDaily();
      let again = false; try { again = sessionStorage.getItem('cf_dpull') === '1'; } catch (e) {}
      if (added && !again) { try { sessionStorage.setItem('cf_dpull', '1'); } catch (e) {} location.reload(); return; }
      C.syncDaily();
    }).catch(() => {}));
  }
})();
