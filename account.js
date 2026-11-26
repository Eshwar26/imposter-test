/* Cinefied accounts · usernames (v0.1.0)
   Only the server writes users/ and usernames/, so two players can never
   get the same name and the 30-day rename rule can't be skipped.

     users/{uid}       = { username, createdAt, renamedAt }
     usernames/{name}  = uid        (who owns each name; names are lowercase)

   Actions (called from core.js through the "account" function):
     claim  { name }   first username for this player
     rename { name }   change it, once every 30 days
     drop              a guest gives up its profile before switching to a Google account */
'use strict';

const NAME_RE = /^[a-z0-9_]{3,15}$/;
const RENAME_MS = 30 * 24 * 60 * 60 * 1000;
const RESERVED = new Set(['admin', 'cinefied', 'midnightlabs', 'midnight_labs', 'support', 'moderator', 'mod', 'official',
  'guest', 'player', 'null', 'undefined', 'system', 'help', 'staff', 'team']);

function makeAccount({ db, now, isGuest }) {
  const clean = n => String(n || '').trim().toLowerCase();
  const check = name => {
    if (!NAME_RE.test(name)) return 'bad_name';
    if (RESERVED.has(name)) return 'taken';
    return null;
  };

  // take a free name for uid (or keep it if uid already owns it)
  async function grab(name, uid) {
    const r = await db.txn(`usernames/${name}`, cur => (cur === null || cur === uid ? uid : undefined));
    return r.committed;
  }

  async function claim(uid, data) {
    const name = clean(data.name), bad = check(name);
    if (bad) return { ok: false, error: bad };
    const me = await db.get(`users/${uid}`);
    if (me && me.username) return { ok: false, error: 'has_name', username: me.username };
    if (!(await grab(name, uid))) return { ok: false, error: 'taken' };
    await db.update({ [`users/${uid}`]: { username: name, createdAt: now() } });
    return { ok: true, username: name };
  }

  async function rename(uid, data) {
    const name = clean(data.name), bad = check(name);
    if (bad) return { ok: false, error: bad };
    const me = await db.get(`users/${uid}`);
    if (!me || !me.username) return { ok: false, error: 'no_name' };
    if (me.username === name) return { ok: true, username: name };
    if (me.renamedAt && now() - me.renamedAt < RENAME_MS) return { ok: false, error: 'too_soon', next: me.renamedAt + RENAME_MS };
    if (!(await grab(name, uid))) return { ok: false, error: 'taken' };
    const up = { [`users/${uid}/username`]: name, [`users/${uid}/renamedAt`]: now() };
    if ((await db.get(`usernames/${me.username}`)) === uid) up[`usernames/${me.username}`] = null;   // free the old name
    await db.update(up);
    return { ok: true, username: name, renamedAt: up[`users/${uid}/renamedAt`] };
  }

  // A guest is switching to a Google account that already has a profile:
  // free the guest's username so it doesn't stay taken forever.
  async function drop(uid) {
    if (!(await isGuest(uid))) return { ok: false, error: 'not_guest' };
    const me = await db.get(`users/${uid}`);
    const up = { [`users/${uid}`]: null };
    if (me && me.username && (await db.get(`usernames/${me.username}`)) === uid) up[`usernames/${me.username}`] = null;
    await db.update(up);
    return { ok: true };
  }

  async function handle(uid, data) {
    const a = data && data.action;
    if (a === 'claim') return claim(uid, data);
    if (a === 'rename') return rename(uid, data);
    if (a === 'drop') return drop(uid);
    return { ok: false, error: 'bad_action' };
  }

  return { handle, NAME_RE, RENAME_MS };
}

module.exports = { makeAccount };
