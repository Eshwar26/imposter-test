/* Cinefied cloud referee · Cloud Functions (2nd gen), Singapore.
   The game rules are in referee.js (Imposter), pictionary.js, wavelength.js and cluepool.js.
   Usernames are in account.js. This file only connects them to Firebase. */
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onValueDeleted } = require('firebase-functions/v2/database');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');
const crypto = require('crypto');
const { makeGames } = require('./games.js');
const { makeAccount } = require('./account.js');
const PARTS = {
  Referee: require('./referee.js'), ImposterWords: require('./words.js'),
  Pictionary: require('./pictionary.js'), PictionaryMovies: require('./pictionary-words.js'),
  Wavelength: require('./wavelength.js'), WavelengthScales: require('./wavelength-scales.js'),
  CluePool: require('./cluepool.js'), CluePoolMovies: require('./cluepool-movies.js'), CluePoolNames: require('./cluepool-names.js'),
};

const REGION = 'asia-southeast1';
const INSTANCE = 'cinefied-9f6a3-default-rtdb';
const ROOM_MAX_AGE_MS = 24 * 60 * 60 * 1000;   // rooms older than a day are swept away

admin.initializeApp({ databaseURL: `https://${INSTANCE}.${REGION}.firebasedatabase.app` });
setGlobalOptions({ region: REGION, maxInstances: 10, memory: '256MiB', timeoutSeconds: 30 });

const db = admin.database();
const dbTools = {
  get: async path => (await db.ref(path).once('value')).val(),
  update: map => db.ref().update(map),
  txn: async (path, fn) => { const r = await db.ref(path).transaction(fn, undefined, false); return { committed: r.committed }; },
};

const referee = makeGames({
  rng: n => crypto.randomInt(n),
  now: () => Date.now(),
  id: () => crypto.randomBytes(9).toString('hex'),
  db: dbTools,
}, PARTS);

const account = makeAccount({
  now: () => Date.now(),
  // a guest = signed in without Google (Firebase anonymous sign-in)
  isGuest: async uid => (await admin.auth().getUser(uid)).providerData.length === 0,
  db: dbTools,
});

// Every phone talks to the referee through this one door.
exports.referee = onCall({ cors: true }, async request => {
  if (!request.auth || !request.auth.uid) throw new HttpsError('unauthenticated', 'signin');
  return referee.handle(request.auth.uid, request.data);
});

// Usernames: pick one, change it (once every 30 days), or drop a guest profile before switching to Google.
exports.account = onCall({ cors: true }, async request => {
  if (!request.auth || !request.auth.uid) throw new HttpsError('unauthenticated', 'signin');
  return account.handle(request.auth.uid, request.data || {});
});

// A player left or was removed: let the round move on (or stop it if it cannot continue).
exports.playerGone = onValueDeleted({ ref: '/rooms/{code}/players/{uid}', instance: INSTANCE }, event => referee.playerGone(event.params.code));

// A room was deleted: throw away its hidden words, votes and drawings.
exports.roomGone = onValueDeleted({ ref: '/rooms/{code}', instance: INSTANCE }, event => referee.wipeRoom(event.params.code));

// Once an hour: delete rooms nobody closed.
exports.sweep = onSchedule({ schedule: 'every 60 minutes', timeZone: 'Asia/Kolkata' }, async () => {
  const snap = await db.ref('rooms').orderByChild('createdAt').endAt(Date.now() - ROOM_MAX_AGE_MS).limitToFirst(200).once('value');
  const up = {};
  snap.forEach(child => { up[`rooms/${child.key}`] = null; up[`private/${child.key}`] = null; up[`secret/${child.key}`] = null; up[`draw/${child.key}`] = null; });
  if (Object.keys(up).length) await db.ref().update(up);
});
