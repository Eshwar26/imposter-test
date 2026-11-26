/* Cinefied stats · v0.1.0
   Games played and Daily streaks, kept in the player's account.
   Only the server writes stats/, so counts and streaks can't be edited by hand.

     stats/{uid}/games/{game}      = how many times this player started that game
     stats/{uid}/gameAt/{game}     = when it was last counted (one count per 30 s per game)
     stats/{uid}/daily/{day}/{puz} = that day's result for one Daily puzzle (what daily.html saved)
     stats/{uid}/streak            = { cur, best, last }   days in a row with any Daily puzzle played
     stats/{uid}/pz/{puz}          = { cur, best, last }   days in a row for each puzzle
     stats/{uid}/imported          = true once this player's old phone history was copied in

   Actions (called from core.js through the "stats" function):
     played { game }   +1 game played
     daily  { days }   Daily results; only today and yesterday (India time, server clock) count,
                       except the first time, when the history saved on the phone is copied in */
'use strict';

const PUZ = ['hol', 'dlg', 'sto', 'cast', 'hang'];
const GAME_RE = /^[a-z]{3,24}$/;
const IST = 330 * 60000, DAY = 864e5;
const COUNT_GAP_MS = 30 * 1000;
const IMPORT_DAYS = 400;

const dayKey = ms => new Date(ms + IST).toISOString().slice(0, 10);
const dayNo = k => Math.round(Date.parse(k) / DAY);

// keep only what daily.html needs to show a finished puzzle again
function cleanResult(r) {
  if (!r || typeof r !== 'object' || !r.done) return null;
  const out = { done: 1 };
  if (r.win === 1 || r.win === 0) out.win = r.win;
  if (Number.isInteger(r.s) && r.s >= 0 && r.s <= 50) out.s = r.s;
  if (Number.isInteger(r.r) && r.r >= 0 && r.r <= 50) out.r = r.r;
  if (Number.isInteger(r.m) && r.m >= 0 && r.m <= 26) out.m = r.m;
  if (Array.isArray(r.g)) out.g = r.g.slice(0, 30).map(x => String(x).slice(0, 80));
  return out;
}

// days in a row up to the most recent day in the list
function run(days) {
  const nums = [...new Set(days.map(dayNo))].sort((a, b) => a - b);
  let best = 0, cur = 0, prev = null;
  for (const n of nums) { cur = prev !== null && n === prev + 1 ? cur + 1 : 1; best = Math.max(best, cur); prev = n; }
  return { cur, best, last: nums.length ? new Date(nums[nums.length - 1] * DAY).toISOString().slice(0, 10) : '' };
}

function makeStats({ db, now }) {
  async function played(uid, data) {
    const game = String(data.game || '');
    if (!GAME_RE.test(game)) return { ok: false, error: 'bad_game' };
    let counted = false;
    await db.txn(`stats/${uid}/gameAt/${game}`, at => {
      if (at && now() - at < COUNT_GAP_MS) { counted = false; return undefined; }
      counted = true; return now();
    });
    if (!counted) return { ok: true, counted: false };
    await db.txn(`stats/${uid}/games/${game}`, n => (n || 0) + 1);
    return { ok: true, counted: true };
  }

  async function daily(uid, data) {
    const days = data.days && typeof data.days === 'object' ? data.days : {};
    const today = dayKey(now()), yest = dayKey(now() - DAY);
    const imported = await db.get(`stats/${uid}/imported`);
    const oldest = dayNo(today) - IMPORT_DAYS;
    const up = {};
    let n = 0;
    for (const k of Object.keys(days)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) continue;
      const allowed = k === today || k === yest || (!imported && dayNo(k) >= oldest && dayNo(k) <= dayNo(today));
      if (!allowed) continue;
      for (const p of PUZ) {
        const r = cleanResult(days[k] && days[k][p]);
        if (r && n < 2500) { up[`stats/${uid}/daily/${k}/${p}`] = r; n++; }
      }
    }
    if (!imported) up[`stats/${uid}/imported`] = true;
    if (n) await db.update(up); else if (!imported) await db.update({ [`stats/${uid}/imported`]: true });

    // work the streaks out again from every day played
    const all = (await db.get(`stats/${uid}/daily`)) || {};
    const keys = Object.keys(all);
    const streak = run(keys);
    const pz = {};
    for (const p of PUZ) pz[p] = run(keys.filter(k => all[k] && all[k][p]));
    await db.update({ [`stats/${uid}/streak`]: streak, [`stats/${uid}/pz`]: pz });
    return { ok: true, streak, saved: n };
  }

  async function handle(uid, data) {
    const a = data && data.action;
    if (a === 'played') return played(uid, data);
    if (a === 'daily') return daily(uid, data);
    return { ok: false, error: 'bad_action' };
  }

  return { handle, run, dayKey };
}

module.exports = { makeStats };
