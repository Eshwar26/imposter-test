/* ════════════════════════════════════════════════════════════════
   Cinefied core · v0.3.0
   Everything every multiplayer game needs, written once:
   sign-in and your account (guest or Google, your username),
   rooms, joining, online/offline, rejoining after a refresh,
   one leader at a time, removing players, leaving, settings and
   phase changes, and (for games with a cloud referee) asking the
   referee and reading your own private card.

   Needs the Firebase compat SDK (app, auth, database, functions)
   loaded first. Pages talk to Firebase only through window.Cinefied.
   ════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const VERSION = '0.3.0';
  const REGION = 'asia-southeast1';   // where the cloud functions run

  const CONFIG = {
    apiKey: 'AIzaSyB22Rmbfleq7Zo4sfcgsRUwzCoCNbKs9dA',
    authDomain: 'cinefied-9f6a3.firebaseapp.com',
    databaseURL: 'https://cinefied-9f6a3-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'cinefied-9f6a3',
    storageBucket: 'cinefied-9f6a3.firebasestorage.app',
    messagingSenderId: '258550379638',
    appId: '1:258550379638:web:337bc3c7971fc261f65b57',
    measurementId: 'G-5610YX97R6',
  };

  // Room codes skip lookalikes (0/O, 1/I/L).
  const CODE_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  const CODE_LEN = 6;
  // How long a leader may be offline (a refresh, a dip in signal) before someone takes over.
  const LEADER_GRACE_MS = 6000;
  // If the first in line doesn't take over, the next one tries after this much more.
  const LEADER_STEP_MS = 3000;
  const NAME_MAX = 20;
  // Usernames: 3 to 15 lowercase letters, numbers or _. Changed at most once every 30 days.
  const USER_RE = /^[a-z0-9_]{3,15}$/;
  const RENAME_DAYS = 30;

  const SESSION_KEY = 'cf_session';  // per tab: the room this tab is in (survives a refresh)
  const USER_KEY = 'cf_user';        // this phone's last known account, so pages can draw the name at once

  // ── small helpers ─────────────────────────────────────────────
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sid = s => String(s).replace(/[^\w-]/g, '');

  const store = {
    get(key, tab) { try { const v = (tab ? sessionStorage : localStorage).getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
    set(key, val, tab) { try { (tab ? sessionStorage : localStorage).setItem(key, JSON.stringify(val)); } catch (e) {} },
    del(key, tab) { try { (tab ? sessionStorage : localStorage).removeItem(key); } catch (e) {} },
  };

  function fail(code, extra) { const e = new Error(code); e.code = code; Object.assign(e, extra || {}); return e; }

  const MESSAGES = {
    bad_code: 'Room codes are 6 letters and numbers.',
    not_found: 'No room with that code. Check it and try again.',
    other_game: 'That code is for a different game.',
    started: 'That game has already started.',
    full: 'That room is full.',
    no_code: 'Could not make a room right now. Try again.',
    offline: 'You seem to be offline. Check your connection.',
    not_leader: 'Only the room leader can do that.',
    few: 'Need at least 3 players online.',
    not_in_room: 'You are not in this room any more.',
    sitting_out: 'You are sitting out this round.',
    bad_vote: 'Pick a player who is still in the round.',
    busy: 'That did not go through. Try again.',
    referee_down: 'Could not reach the game server. Try again.',
    // accounts
    no_username: 'Pick a username first.',
    bad_name: 'Only lowercase letters, numbers and _, 3 to 15 of them.',
    taken: 'That username is taken.',
    has_name: 'You already have a username.',
    too_soon: 'You changed your username recently.',
    popup_closed: 'Sign-in was closed before it finished.',
    signin_failed: 'Could not sign in with Google. Try again.',
    server_down: 'Could not reach the server. Try again.',
  };
  function message(err) { return (err && MESSAGES[err.code]) || 'Something went wrong. Try again.'; }

  // ── sign-in and your account ─────────────────────────────────
  // Every phone is signed in: as a guest (Firebase anonymous sign-in) until the player links Google.
  // The sign-in now lasts on this phone (not just one tab), so you are the same player tomorrow.
  let db = null, auth = null, ready = null, fns = null, pendingCred = null;
  const TS = () => firebase.database.ServerValue.TIMESTAMP;
  const cached = store.get(USER_KEY) || {};
  // me.username is null until the player picks one. me.guest is true until Google is linked.
  const me = { uid: cached.uid || null, username: cached.username || null, guest: cached.guest !== false, email: cached.email || '', renamedAt: cached.renamedAt || 0 };
  const meListeners = new Set();
  function onMe(cb) { meListeners.add(cb); return () => meListeners.delete(cb); }
  function meChanged() {
    store.set(USER_KEY, { uid: me.uid, username: me.username, guest: me.guest, email: me.email, renamedAt: me.renamedAt });
    meListeners.forEach(cb => { try { cb(me); } catch (e) { console.error(e); } });
  }

  const googleOf = u => u && (u.providerData || []).find(p => p && p.providerId === 'google.com');
  async function loadProfile(user) {
    me.uid = user.uid;
    me.guest = !googleOf(user);
    me.email = me.guest ? '' : (googleOf(user).email || user.email || '');
    let p = null;
    try { p = (await db.ref('users/' + user.uid).get()).val(); } catch (e) { p = undefined; }
    if (p !== undefined) {   // offline: keep what this phone remembers
      me.username = p && p.username ? p.username : null;
      me.renamedAt = p && p.renamedAt ? p.renamedAt : 0;
    } else if (cached.uid !== user.uid) { me.username = null; me.renamedAt = 0; }
    meChanged();
  }

  function init() {
    if (ready) return ready;
    ready = (async () => {
      if (!firebase.apps.length) firebase.initializeApp(CONFIG);
      db = firebase.database();
      auth = firebase.auth();
      try { await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (e) {}
      // coming back from a Google sign-in page (only used when the popup is blocked)
      try { await auth.getRedirectResult(); }
      catch (e) { const c = credOf(e); if (c && e.code === 'auth/credential-already-in-use') pendingCred = c; }
      let user = await new Promise(res => { const off = auth.onAuthStateChanged(u => { off(); res(u); }); });
      if (!user) user = (await auth.signInAnonymously()).user;
      await loadProfile(user);
      return me;
    })();
    ready.catch(() => { ready = null; });
    return ready;
  }

  function call(name, data) {
    fns = fns || firebase.app().functions(REGION);
    return fns.httpsCallable(name)(data).then(r => (r && r.data) || {});
  }
  async function account(data) {
    await init();
    let r;
    try { r = await call('account', data); } catch (e) { console.error(e); throw fail('server_down'); }
    if (!r.ok) throw fail(r.error || 'busy', r);
    return r;
  }

  const cleanUser = n => String(n || '').trim().toLowerCase();
  // Is this username free? Resolves to 'free', 'mine', 'taken' or 'bad'.
  async function usernameStatus(raw) {
    const n = cleanUser(raw);
    if (!USER_RE.test(n)) return 'bad';
    await init();
    const owner = (await db.ref('usernames/' + n).get()).val();
    return !owner ? 'free' : owner === me.uid ? 'mine' : 'taken';
  }
  // Turn an old free-text name ("Eshwar K") into a username suggestion ("eshwark").
  function suggestUsername(n) {
    const s = String(n || '').toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9_]/g, '').slice(0, 15);
    return USER_RE.test(s) && !/^guest\d*$/.test(s) ? s : '';
  }
  async function claimUsername(raw) {
    const r = await account({ action: 'claim', name: cleanUser(raw) });
    me.username = r.username; me.renamedAt = 0; meChanged();
    return r.username;
  }
  async function renameUsername(raw) {
    const r = await account({ action: 'rename', name: cleanUser(raw) });
    me.username = r.username; if (r.renamedAt) me.renamedAt = r.renamedAt; meChanged();
    return r.username;
  }
  // When the player may change their username next (0 = now).
  function nextRename() { return me.renamedAt ? me.renamedAt + RENAME_DAYS * 864e5 : 0; }

  // ── Google ──
  const provider = () => { const p = new firebase.auth.GoogleAuthProvider(); p.setCustomParameters({ prompt: 'select_account' }); return p; };
  function credOf(e) {
    if (!e) return null;
    if (e.credential) return e.credential;
    const G = firebase.auth.GoogleAuthProvider;
    try { return G.credentialFromError ? G.credentialFromError(e) : null; } catch (x) { return null; }
  }
  const popupGone = e => e && ['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/web-storage-unsupported'].includes(e.code);
  const closed = e => e && ['auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/user-cancelled'].includes(e.code);

  // Save this guest to Google. Resolves to:
  //   { ok: true }          linked: same player, now kept safe by Google
  //   { found: true }       that Google account already has a Cinefied profile: ask Switch or Stay
  // A player with no username yet (the "Played before?" button) goes straight to that account instead.
  async function linkGoogle() {
    await init();
    const user = auth.currentUser;
    try {
      await user.linkWithPopup(provider());
      await user.reload(); await loadProfile(auth.currentUser);
      return { ok: true };
    } catch (e) {
      if (e.code === 'auth/credential-already-in-use' || e.code === 'auth/email-already-in-use') {
        pendingCred = credOf(e);
        if (!pendingCred) throw fail('signin_failed');
        if (!me.username) { await switchAccount(); return { ok: true, switched: true }; }
        return { found: true };
      }
      if (e.code === 'auth/provider-already-linked') { await loadProfile(auth.currentUser); return { ok: true }; }
      if (popupGone(e)) { await user.linkWithRedirect(provider()); return { redirecting: true }; }
      if (closed(e)) throw fail('popup_closed');
      console.error(e); throw fail('signin_failed');
    }
  }
  // After coming back from a Google sign-in page: finish what the popup would have done.
  // Resolves to { found: true } (ask Switch or Stay), { switched: true }, or null (nothing waiting).
  async function afterRedirect() {
    await init();
    if (!pendingCred) return null;
    if (!me.username) { await switchAccount(); return { switched: true }; }
    return { found: true };
  }
  // Switch to the Google account that already has a profile. This guest's username is freed.
  async function switchAccount() {
    if (!pendingCred) throw fail('signin_failed');
    await init();
    if (code) await leave();
    if (me.username && me.guest) { try { await call('account', { action: 'drop' }); } catch (e) {} }
    const cred = pendingCred; pendingCred = null;
    const r = await auth.signInWithCredential(cred);
    await loadProfile(r.user);
    return me;
  }
  function stayGuest() { pendingCred = null; }
  // Sign out: the account stays safe with Google; this phone starts again as a new guest.
  async function signOut() {
    await init();
    if (code) await leave();
    await auth.signOut();
    store.del(USER_KEY);
    me.username = null; me.renamedAt = 0; me.guest = true; me.email = '';
    const u = (await auth.signInAnonymously()).user;
    await loadProfile(u);
    return me;
  }

  // ── your name in games: your username ─────────────────────────
  function getName() { return me.username || 'player'; }
  function setName() { return getName(); }   // names are changed only from Profile now
  function needName() { if (!me.username) throw fail('no_username'); return me.username; }

  // ── the room this tab is in ──────────────────────────────────
  let code = null, room = null, roomRef = null, connRef = null, privRef = null, priv = null;
  let leaderTimer = null, watchedLeader = null;
  const listeners = new Set();

  function players() {
    if (!room || !room.players) return [];
    return Object.keys(room.players).map(uid => Object.assign({ uid }, room.players[uid]))
      .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0) || (a.uid < b.uid ? -1 : 1));
  }
  function view(extra) {
    return Object.assign({
      code, room, me: me.uid, private: priv,
      isLeader: !!room && room.leader === me.uid,
      players: players(),
      online: players().filter(p => p.online !== false),
    }, extra || {});
  }
  function emit(type, extra) { const v = view(Object.assign({ type }, extra)); listeners.forEach(cb => { try { cb(v); } catch (e) { console.error(e); } }); }
  function onChange(cb) { listeners.add(cb); return () => listeners.delete(cb); }

  function genCode() {
    const out = []; const buf = new Uint32Array(CODE_LEN);
    (global.crypto || global.msCrypto).getRandomValues(buf);
    for (let i = 0; i < CODE_LEN; i++) out.push(CODE_CHARS[buf[i] % CODE_CHARS.length]);
    return out.join('');
  }
  function normCode(raw) { return String(raw || '').toUpperCase().split('').filter(c => CODE_CHARS.includes(c)).join(''); }

  async function createRoom(opts) {
    const o = opts || {};
    await init();
    const name = needName();
    if (code) await leave();
    for (let i = 0; i < 8; i++) {
      const c = genCode();
      const data = {
        game: o.game, leader: me.uid, phase: 'waiting', createdAt: TS(),
        limits: { min: o.min || 2, max: o.max || 8 },
        settings: o.settings || {},
        players: { [me.uid]: { name, online: true, joinedAt: TS() } },
      };
      if (o.ref) data.ref = true;   // a refereed room: only the cloud referee may move the game along
      let res;
      try { res = await db.ref('rooms/' + c).transaction(cur => (cur === null ? data : undefined), undefined, false); }
      catch (e) { continue; }   // e.g. someone else's room with this code: try another
      if (res && res.committed) { await enter(c); return c; }
    }
    throw fail('no_code');
  }

  async function joinRoom(raw, opts) {
    const o = opts || {};
    const c = normCode(raw);
    if (c.length !== CODE_LEN) throw fail('bad_code');
    await init();
    const name = needName();
    const snap = await db.ref('rooms/' + c).get();
    const r = snap.val();
    if (!r) throw fail('not_found');
    if (o.game && r.game !== o.game) throw fail('other_game', { game: r.game });
    if (code && code !== c) await leave();
    const mine = r.players && r.players[me.uid];
    if (!mine) {
      if (r.phase !== 'waiting' && r.open !== true) throw fail('started');   // open = between rounds
      const n = Object.keys(r.players || {}).length;
      if (r.limits && n >= r.limits.max) throw fail('full');
      await db.ref(`rooms/${c}/players/${me.uid}`).set({ name, online: true, joinedAt: TS() });
    }
    await enter(c);
    return c;
  }

  // Rejoin the room this tab was in before a refresh. Returns the code, or null.
  async function resume(game) {
    const s = store.get(SESSION_KEY, true);
    if (!s || (game && s.game !== game)) return null;
    await init();
    let r = null;
    try { r = (await db.ref('rooms/' + s.code).get()).val(); } catch (e) { r = null; }
    if (!r || !r.players || !r.players[me.uid]) { store.del(SESSION_KEY, true); return null; }
    await enter(s.code);
    return s.code;
  }

  function enter(c) {
    return new Promise(resolve => {
      code = c; room = null; priv = null;
      const meRef = db.ref(`rooms/${c}/players/${me.uid}`);
      connRef = db.ref('.info/connected');
      connRef.on('value', s => {
        if (s.val() !== true || code !== c) return;
        meRef.child('online').onDisconnect().set(false);
        meRef.child('online').set(true).catch(() => {});
      });
      // this player's private card (their word). Only refereed games ever put anything here.
      privRef = db.ref(`private/${c}/${me.uid}`);
      privRef.on('value', s => { priv = s.val(); if (room) emit('update', { privateChanged: true }); }, () => {});
      let first = true;
      roomRef = db.ref('rooms/' + c);
      roomRef.on('value', s => {
        handle(s.val());
        if (first) { first = false; resolve(c); }
      }, () => { if (first) { first = false; resolve(c); } });
    });
  }

  function handle(r) {
    if (code === null) return;
    if (!r) { cleanup(); emit('closed'); return; }
    if (!r.players || !r.players[me.uid]) { cleanup(); emit('removed'); return; }
    const before = room;
    room = r;
    const g = r.game;
    store.set(SESSION_KEY, { code, game: g }, true);
    watchLeader();
    emit('update', {
      becameLeader: !!before && before.leader !== me.uid && r.leader === me.uid,
      phaseChanged: !!before && before.phase !== r.phase,
    });
  }

  // ── one leader at a time ─────────────────────────────────────
  function leaderGone(r) { const lp = r.players && r.players[r.leader]; return !lp || lp.online === false; }
  function watchLeader() {
    const L = room.leader;
    if (!leaderGone(room) || L === me.uid) { clearTimeout(leaderTimer); leaderTimer = null; watchedLeader = null; return; }
    if (leaderTimer && watchedLeader === L) return;
    clearTimeout(leaderTimer); watchedLeader = L;
    const line = players().filter(p => p.online !== false && p.uid !== L).map(p => p.uid);
    const rank = line.indexOf(me.uid);
    if (rank < 0) return;
    const wait = (room.players[L] ? LEADER_GRACE_MS : 0) + rank * LEADER_STEP_MS;
    leaderTimer = setTimeout(takeOver, wait);
  }
  async function takeOver() {
    leaderTimer = null;
    if (!room || !code) return;
    const L = room.leader;
    if (!leaderGone(room)) return;
    try { await db.ref(`rooms/${code}/leader`).transaction(cur => (cur === L ? me.uid : undefined)); }
    catch (e) { /* someone else took over first */ }
  }

  // ── leaving, removing, settings ──────────────────────────────
  function cleanup() {
    if (roomRef) roomRef.off();
    if (connRef) connRef.off();
    if (privRef) privRef.off();
    clearTimeout(leaderTimer);
    roomRef = connRef = privRef = leaderTimer = watchedLeader = null;
    code = null; room = null; priv = null;
    store.del(SESSION_KEY, true);
  }

  async function leave() {
    if (!code) return;
    const c = code, r = room;
    const others = players().filter(p => p.uid !== me.uid);
    const meRef = db.ref(`rooms/${c}/players/${me.uid}`);
    cleanup();
    try {
      await meRef.child('online').onDisconnect().cancel();
      if (r && r.leader === me.uid) {
        const next = others.find(p => p.online !== false) || others[0];
        if (!next) { await db.ref('rooms/' + c).remove(); emit('left'); return; }
        await db.ref(`rooms/${c}/leader`).set(next.uid);
      }
      await meRef.remove();
    } catch (e) { /* the room may already be gone */ }
    emit('left');
  }

  function needLeader() { if (!room || room.leader !== me.uid) throw fail('not_leader'); }
  async function kick(uid) { needLeader(); if (uid === me.uid) return; await db.ref(`rooms/${code}/players/${uid}`).remove(); }
  async function updateSettings(patch) { needLeader(); await db.ref(`rooms/${code}/settings`).update(patch); }
  async function setPhase(phase, state) {
    needLeader();
    const up = { phase };
    if (state !== undefined) up.state = state;
    await db.ref('rooms/' + code).update(up);
  }
  async function updateMe(patch) { if (!code) return; await db.ref(`rooms/${code}/players/${me.uid}`).update(patch); }

  // Change the game state in one safe step (both players may move, but never at the same moment).
  // fn gets the current state and returns the new one, or undefined to give up. Resolves to { committed }.
  async function txnState(fn) {
    if (!code) return { committed: false };
    try {
      const r = await db.ref(`rooms/${code}/state`).transaction(cur => (cur === null || cur === undefined ? undefined : fn(cur)), undefined, false);
      return { committed: !!(r && r.committed) };
    } catch (e) { return { committed: false, error: e }; }
  }

  // ── cloud referee ────────────────────────────────────────────
  // Ask the referee to do something in this room. Resolves to { ok: true } or { ok: false, error: 'reason' }.
  async function referee(action, extra) {
    if (!code) return { ok: false, error: 'not_in_room' };
    try {
      const res = await call('referee', Object.assign({ code, action }, extra || {}));
      return res && Object.keys(res).length ? res : { ok: false, error: 'referee_down' };
    } catch (e) { console.error(e); return { ok: false, error: 'referee_down' }; }
  }

  global.Cinefied = {
    version: VERSION, CODE_CHARS, CODE_LEN, NAME_MAX, USER_RE, RENAME_DAYS,
    init, me, getName, setName, onMe,
    // account
    usernameStatus, suggestUsername, claimUsername, renameUsername, nextRename,
    linkGoogle, afterRedirect, switchAccount, stayGuest, signOut,
    // rooms
    createRoom, joinRoom, resume, leave, kick, updateSettings, setPhase, updateMe, referee, txnState,
    onChange, message, esc, sid,
    get state() { return view(); },
  };
})(window);
