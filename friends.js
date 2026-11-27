/* Cinefied friends · v0.1.0
   Friend requests, the friends list, blocking, game invites and "ask to join".
   Only players signed in with Google can have friends. Only the server writes these:

     friends/{uid}/{friendUid}   = when you became friends
     requests/{uid}/{fromUid}    = a request waiting for you
     sent/{uid}/{toUid}          = a request you sent
     blocks/{uid}/{blockedUid}   = someone you blocked
     inbox/{uid}/{id}            = an alert for you: { t, from, name, av, game, code, at }
                                   t = 'invite' (join my room), 'ask' (someone wants into your room),
                                       'in' (the leader let you in), 'req' (a friend request), 'friend' (accepted)
     asks/{code}/{fromUid}       = a waiting "ask to join" for that room

   Players write their own presence/{uid} and roomOf/{uid}; friends can read presence (not the room code).
   Actions (called from core.js through the "friends" function):
     sync                     note whether this player is signed in with Google
     request { to }           send a friend request (to = uid)
     cancel  { to }           take back a request you sent
     accept  { from }         accept a request
     decline { from }         turn a request down
     remove  { uid }          stop being friends
     block   { uid }          block (also removes them and any requests)
     invite  { to, code }     invite a friend into your room
     ask     { to }           ask to join the room a friend is in (the leader decides)
     admit   { from }         the leader lets someone in
     refuse  { from }         the leader says no */
'use strict';

const MAX_FRIENDS = 100;
const GAP_MS = 20 * 1000;   // the same alert to the same person at most every 20 s

function makeFriends({ db, now, id, isGoogle }) {
  const count = async uid => Object.keys((await db.get(`friends/${uid}`)) || {}).length;
  const profile = async uid => (await db.get(`users/${uid}`)) || null;
  const uidOk = u => typeof u === 'string' && /^[\w-]{6,128}$/.test(u);
  const blocked = async (a, b) => !!(await db.get(`blocks/${a}/${b}`)) || !!(await db.get(`blocks/${b}/${a}`));

  async function needGoogle(uid) {
    const g = await isGoogle(uid);
    await db.update({ [`users/${uid}/google`]: g || null });
    return g;
  }
  async function alert(to, from, t, extra) {
    const me = await profile(from);
    const up = { [`inbox/${to}/${id()}`]: Object.assign({ t, from, name: (me && me.username) || '', av: (me && me.av) || '', at: now() }, extra || {}) };
    // alerts nobody saw within a day are cleared out here
    const box = (await db.get(`inbox/${to}`)) || {};
    Object.keys(box).forEach(k => { if (!box[k] || now() - (box[k].at || 0) > 864e5) up[`inbox/${to}/${k}`] = null; });
    await db.update(up);
  }
  // stops one player sending the same alert again and again
  async function throttle(path) {
    const r = await db.txn(path, at => (at && now() - at < GAP_MS ? undefined : now()));
    return r.committed;
  }
  async function befriend(a, b) {
    const t = now();
    await db.update({
      [`friends/${a}/${b}`]: t, [`friends/${b}/${a}`]: t,
      [`requests/${a}/${b}`]: null, [`requests/${b}/${a}`]: null, [`sent/${a}/${b}`]: null, [`sent/${b}/${a}`]: null,
    });
  }

  async function request(uid, d) {
    const to = d.to;
    if (!uidOk(to) || to === uid) return { ok: false, error: 'bad_player' };
    if (!(await needGoogle(uid))) return { ok: false, error: 'need_google' };
    const them = await profile(to);
    if (!them || !them.username || !them.google) return { ok: false, error: 'not_found' };
    if (await blocked(uid, to)) return { ok: false, error: 'not_found' };
    if (await db.get(`friends/${uid}/${to}`)) return { ok: false, error: 'already' };
    if (await db.get(`requests/${uid}/${to}`)) { await befriend(uid, to); await alert(to, uid, 'friend'); return { ok: true, friends: true }; }   // they asked you first
    if ((await count(uid)) >= MAX_FRIENDS) return { ok: false, error: 'full' };
    if ((await count(to)) >= MAX_FRIENDS) return { ok: false, error: 'their_full' };
    const t = now();
    await db.update({ [`requests/${to}/${uid}`]: t, [`sent/${uid}/${to}`]: t });
    await alert(to, uid, 'req');
    return { ok: true };
  }
  async function cancel(uid, d) {
    if (!uidOk(d.to)) return { ok: false, error: 'bad_player' };
    await db.update({ [`requests/${d.to}/${uid}`]: null, [`sent/${uid}/${d.to}`]: null });
    return { ok: true };
  }
  async function accept(uid, d) {
    const from = d.from;
    if (!uidOk(from) || !(await db.get(`requests/${uid}/${from}`))) return { ok: false, error: 'no_request' };
    if (!(await needGoogle(uid))) return { ok: false, error: 'need_google' };
    if ((await count(uid)) >= MAX_FRIENDS) return { ok: false, error: 'full' };
    if ((await count(from)) >= MAX_FRIENDS) return { ok: false, error: 'their_full' };
    await befriend(uid, from);
    await alert(from, uid, 'friend');
    return { ok: true };
  }
  async function decline(uid, d) {
    if (!uidOk(d.from)) return { ok: false, error: 'bad_player' };
    await db.update({ [`requests/${uid}/${d.from}`]: null, [`sent/${d.from}/${uid}`]: null });
    return { ok: true };
  }
  async function remove(uid, d) {
    if (!uidOk(d.uid)) return { ok: false, error: 'bad_player' };
    await db.update({ [`friends/${uid}/${d.uid}`]: null, [`friends/${d.uid}/${uid}`]: null });
    return { ok: true };
  }
  async function block(uid, d) {
    const b = d.uid;
    if (!uidOk(b) || b === uid) return { ok: false, error: 'bad_player' };
    await db.update({
      [`blocks/${uid}/${b}`]: now(),
      [`friends/${uid}/${b}`]: null, [`friends/${b}/${uid}`]: null,
      [`requests/${uid}/${b}`]: null, [`requests/${b}/${uid}`]: null, [`sent/${uid}/${b}`]: null, [`sent/${b}/${uid}`]: null,
    });
    return { ok: true };
  }

  // a room you can still walk into: the waiting room, or between rounds in games that allow it
  const joinable = r => r && (r.phase === 'waiting' || r.open === true);

  async function invite(uid, d) {
    const to = d.to, code = String(d.code || '');
    if (!uidOk(to) || !/^[23456789A-Z]{6}$/.test(code)) return { ok: false, error: 'bad_player' };
    if (!(await db.get(`friends/${uid}/${to}`))) return { ok: false, error: 'not_friends' };
    const room = await db.get(`rooms/${code}`);
    if (!room || !room.players || !room.players[uid]) return { ok: false, error: 'not_in_room' };
    if (!joinable(room)) return { ok: false, error: 'started' };
    if (room.players[to]) return { ok: false, error: 'already_in' };
    if (!(await throttle(`gap/${uid}/inv_${to}`))) return { ok: true, again: true };
    await alert(to, uid, 'invite', { game: room.game, code, n: Object.keys(room.players).length });
    return { ok: true };
  }

  async function ask(uid, d) {
    const to = d.to;
    if (!uidOk(to)) return { ok: false, error: 'bad_player' };
    if (!(await db.get(`friends/${uid}/${to}`))) return { ok: false, error: 'not_friends' };
    const code = await db.get(`roomOf/${to}`);
    const room = code && (await db.get(`rooms/${code}`));
    if (!room || !room.players || !room.players[to]) return { ok: false, error: 'not_in_room' };
    if (room.players[uid]) return { ok: true, code, game: room.game };   // already in: just go there
    if (!joinable(room)) return { ok: false, error: 'started' };
    if (room.limits && Object.keys(room.players).length >= room.limits.max) return { ok: false, error: 'full_room' };
    if (!(await throttle(`gap/${uid}/ask_${code}`))) return { ok: true, again: true };
    await db.update({ [`asks/${code}/${uid}`]: now() });
    await alert(room.leader, uid, 'ask', { game: room.game });
    return { ok: true };
  }
  async function leaderRoom(uid) {
    const code = await db.get(`roomOf/${uid}`);
    const room = code && (await db.get(`rooms/${code}`));
    return room && room.leader === uid ? { code, room } : null;
  }
  async function admit(uid, d) {
    const from = d.from;
    if (!uidOk(from)) return { ok: false, error: 'bad_player' };
    const L = await leaderRoom(uid);
    if (!L) return { ok: false, error: 'not_leader' };
    if (!(await db.get(`asks/${L.code}/${from}`))) return { ok: false, error: 'no_request' };
    await db.update({ [`asks/${L.code}/${from}`]: null });
    await alert(from, uid, 'in', { game: L.room.game, code: L.code });
    return { ok: true };
  }
  async function refuse(uid, d) {
    if (!uidOk(d.from)) return { ok: false, error: 'bad_player' };
    const L = await leaderRoom(uid);
    if (L) await db.update({ [`asks/${L.code}/${d.from}`]: null });
    return { ok: true };
  }

  async function handle(uid, data) {
    const d = data || {}, a = d.action;
    if (a === 'sync') return { ok: true, google: await needGoogle(uid) };
    const fn = { request, cancel, accept, decline, remove, block, invite, ask, admit, refuse }[a];
    if (!fn) return { ok: false, error: 'bad_action' };
    return fn(uid, d);
  }
  return { handle, MAX_FRIENDS };
}

module.exports = { makeFriends };
