/* ════════════════════════════════════════════════════════════════
   CINEFIED · DATA CHECKER
   Run before every upload:     node tools/check.js public/data/movies.js
   It also checks directors.js and people.js when they sit next to movies.js.

   ERRORS   must be fixed: the upload should not go out with these.
   WARNINGS are worth a look: often a typo in a name.
   At the end it shows how many movies each game can use.
   ════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = path.resolve(process.argv[2] || path.join(__dirname, '..', 'data', 'movies.js'));
const LEVELS = ['easy', 'medium', 'hard'];
const FIELDS = ['id', 'title', 'aka', 'year', 'level', 'hero', 'heroine', 'director', 'music', 'villain',
  'banner', 'genre', 'roles', 'stats', 'spoiler', 'dialogues', 'clues'];
const TEXT = ['title', 'director', 'music', 'villain', 'banner', 'genre'];
const LISTS = ['hero', 'heroine'];               // one name, or a list of names
const PEOPLE = ['hero', 'heroine', 'director', 'music', 'villain'];
const DIR_FILE = path.join(path.dirname(FILE), 'directors.js');
const PEOPLE_FILE = path.join(path.dirname(FILE), 'people.js');
const KINDS = ['actor', 'actress'];
const FROM = ['telugu', 'tamil', 'malayalam', 'kannada', 'hindi'];
const GAME_DIRS = 2;                             // a director needs this many movies to be in Heads Up, Blindspot and Imposter
const STATS = { imdb: [1, 10], songs: [1, 20], runtime: [60, 240] };
const CLUES = ['job', 'location', 'song', 'scene'];
// locations too common to be a clue (lowercase, no spaces). Add more here if needed.
const WEAK_PLACES = ['hyderabad'];
const THIS_YEAR = new Date().getFullYear();

const errors = [], warnings = [];
const C = process.stdout.isTTY ? { r: '\x1b[31m', y: '\x1b[33m', g: '\x1b[32m', d: '\x1b[2m', b: '\x1b[1m', x: '\x1b[0m' }
                               : { r: '', y: '', g: '', d: '', b: '', x: '' };

// ── load the file the same way the games do ──
let src, MOVIES;
try { src = fs.readFileSync(FILE, 'utf8'); }
catch (e) { console.log(`${C.r}Can't open ${FILE}${C.x}`); process.exit(1); }
try {
  const box = { self: {}, module: { exports: {} } };
  vm.runInNewContext(src, box, { filename: path.basename(FILE) });
  MOVIES = Array.isArray(box.module.exports) ? box.module.exports : box.self.CinefiedMovies;
} catch (e) {
  // a syntax slip: show where
  const m = /:(\d+)/.exec(String(e.stack || ''));
  console.log(`${C.r}${C.b}The file has a typing mistake and can't be read.${C.x}`);
  console.log(`${C.r}${e.message}${m ? `  (around line ${m[1]})` : ''}${C.x}`);
  console.log(`${C.d}Usually a missing comma, quote or bracket on that line or the one just before it.${C.x}`);
  process.exit(1);
}
if (!Array.isArray(MOVIES)) { console.log(`${C.r}The file loaded but has no movie list.${C.x}`); process.exit(1); }

// ── helpers ──
// line where each movie's { starts, found by walking the file (skipping text in quotes and comments)
const starts = (() => {
  const out = [], a = src.indexOf('[', Math.max(0, src.search(/MOVIES\s*=\s*\[/)));
  let depth = 0, line = 1 + (src.slice(0, a).match(/\n/g) || []).length;
  for (let p = a; p < src.length; p++) {
    const ch = src[p];
    if (ch === '\n') { line++; continue; }
    if (ch === '/' && src[p + 1] === '/') { while (p < src.length && src[p] !== '\n') p++; p--; continue; }
    if (ch === '/' && src[p + 1] === '*') { const e = src.indexOf('*/', p + 2); const end = e < 0 ? src.length : e + 2; line += (src.slice(p, end).match(/\n/g) || []).length; p = end - 1; continue; }
    if (ch === "'" || ch === '"' || ch === '`') { let q = p + 1; while (q < src.length && src[q] !== ch) { if (src[q] === '\\') q++; else if (src[q] === '\n') line++; q++; } p = q; continue; }
    if (ch === '[' || ch === '{') { if (ch === '{' && depth === 1) out.push(line); depth++; }
    else if (ch === ']' || ch === '}') { depth--; if (depth === 0) break; }
  }
  return out;
})();
const where = (m, i) => {
  const name = m && m.title ? `"${m.title}"` : `movie #${i + 1}`;
  return starts[i] ? `${name} (line ${starts[i]})` : name;
};
const err = (m, i, msg) => errors.push(`${where(m, i)}: ${msg}`);
const warn = (m, i, msg) => warnings.push(`${where(m, i)}: ${msg}`);
const norm = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');
const slug = t => String(t || '').toLowerCase().normalize('NFKD').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const isStr = v => typeof v === 'string';
const filled = v => isStr(v) && v.trim() !== '';
const names_ = v => (Array.isArray(v) ? v : [v]).filter(filled).map(x => x.trim());
const has = v => names_(v).length > 0;
function dist(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

// ── check each movie ──
const ids = new Map(), titles = new Map();
MOVIES.forEach((m, i) => {
  if (!m || typeof m !== 'object' || Array.isArray(m)) return err(m, i, 'is not a movie entry { ... }');

  Object.keys(m).forEach(k => { if (!FIELDS.includes(k)) err(m, i, `unknown field "${k}" (a typo? allowed: ${FIELDS.join(', ')})`); });

  // id
  if (!filled(m.id)) err(m, i, `has no id (suggested: '${slug(m.title)}')`);
  else {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.id)) err(m, i, `id '${m.id}' should be lowercase words joined by "-" (like 'pokiri')`);
    if (ids.has(m.id)) err(m, i, `id '${m.id}' is already used by ${where(MOVIES[ids.get(m.id)], ids.get(m.id))}`);
    else ids.set(m.id, i);
  }

  // basics
  if (!filled(m.title)) err(m, i, 'has no title');
  if (!Number.isInteger(m.year)) err(m, i, 'year must be a number like 2006 (no quotes), or 0 if not known');
  else if (m.year !== 0 && (m.year < 1930 || m.year > THIS_YEAR + 2)) err(m, i, `year ${m.year} looks wrong`);
  if (!LEVELS.includes(m.level)) err(m, i, `level must be 'easy', 'medium' or 'hard' (found ${JSON.stringify(m.level)})`);

  TEXT.forEach(k => { if (k in m && !isStr(m[k])) err(m, i, `${k} must be text in quotes`); });
  LISTS.forEach(k => { if (k in m && !isStr(m[k]) && !(Array.isArray(m[k]) && m[k].every(isStr))) err(m, i, `${k} must be a name in quotes, or a list like ['Jr NTR', 'Ram Charan']`); });
  PEOPLE.forEach(k => names_(m[k]).forEach(n => { if (/[,&\/]| and /i.test(n)) warn(m, i, `${k} "${n}" looks like more than one person: use a list, like ['A', 'B']`); }));

  if ('act' in m || 'draw' in m) warn(m, i, 'act and draw are no longer used (games have no levels): delete them');

  // roles (Starring: hero's role, heroine's role, optional famous third character)
  if ('roles' in m) {
    if (!Array.isArray(m.roles) || !m.roles.every(isStr)) err(m, i, "roles must be a list in brackets, like ['Pandu', 'Shruti', 'Ali Bhai']");
    else {
      const rs = m.roles.filter(filled);
      if (rs.length === 1) warn(m, i, 'roles has only one name: needs 2 or 3 (or leave it empty)');
      if (rs.length > 3) warn(m, i, 'roles has more than 3 names: only the first 3 are used');
      if (new Set(rs.map(norm)).size < rs.length) warn(m, i, 'the same role is listed twice');
      rs.forEach(r => { if (filled(m.title) && norm(m.title).length > 3 && norm(r) === norm(m.title)) warn(m, i, `role "${r}" is the same as the title, so it gives the answer away`); });
    }
  }

  // aka
  if ('aka' in m) {
    if (!Array.isArray(m.aka) || !m.aka.every(isStr)) err(m, i, "aka must be a list in brackets, like ['Bahubali']");
  }

  // stats
  if ('stats' in m) {
    if (!m.stats || typeof m.stats !== 'object' || Array.isArray(m.stats)) err(m, i, 'stats must look like { imdb: 7.9, songs: 6, runtime: 168 }');
    else {
      Object.keys(m.stats).forEach(k => { if (!(k in STATS)) err(m, i, `stats has unknown "${k}" (allowed: imdb, songs, runtime)`); });
      Object.entries(STATS).forEach(([k, [lo, hi]]) => {
        const v = m.stats[k];
        if (v === undefined || v === 0) return;
        if (typeof v !== 'number') err(m, i, `stats.${k} must be a number (no quotes)`);
        else if (v < lo || v > hi) err(m, i, `stats.${k} = ${v} looks wrong (expected ${lo} to ${hi}, or 0 for not filled)`);
        else if (k !== 'imdb' && !Number.isInteger(v)) err(m, i, `stats.${k} must be a whole number`);
      });
    }
  }

  // spoiler
  if ('spoiler' in m) {
    if (!Array.isArray(m.spoiler) || !m.spoiler.every(isStr)) err(m, i, "spoiler must be a list in brackets, like ['line one', 'line two']");
    else {
      m.spoiler.forEach((v, n) => {
        if (filled(v) && filled(m.title) && norm(v).includes(norm(m.title)) && norm(m.title).length > 3) err(m, i, `spoiler line ${n + 1} gives away the title`);
        if (filled(v) && v.trim().split(/\s+/).length < 10) warn(m, i, `spoiler line ${n + 1} is short (under 10 words); make it tell the story: "${v.slice(0, 50)}"`);
      });
      const vals = m.spoiler.filter(filled).map(norm);
      if (new Set(vals).size < vals.length) warn(m, i, 'two spoiler lines are the same');
    }
  }

  // dialogues
  if ('dialogues' in m) {
    if (!Array.isArray(m.dialogues) || !m.dialogues.every(isStr)) err(m, i, "dialogues must be a list in brackets, like ['line one', 'line two']");
    else {
      const ds = m.dialogues.filter(filled).map(norm);
      if (new Set(ds).size < ds.length) warn(m, i, 'the same dialogue is listed twice');
      m.dialogues.forEach(d => { if (filled(d) && filled(m.title) && norm(m.title).length > 3 && norm(d).includes(norm(m.title))) warn(m, i, `a dialogue says the title: "${d.slice(0, 40)}..."`); });
    }
  }

  // clues
  if ('clues' in m) {
    if (!m.clues || typeof m.clues !== 'object' || Array.isArray(m.clues)) err(m, i, "clues must look like { job: '', location: '', song: '', scene: '' }");
    else {
      Object.keys(m.clues).forEach(k => { if (!CLUES.includes(k)) err(m, i, `clues has unknown "${k}" (allowed: ${CLUES.join(', ')})`); });
      CLUES.forEach(k => {
        const v = m.clues[k];
        if (v !== undefined && !isStr(v)) err(m, i, `clues.${k} must be text in quotes`);
        if (filled(v) && filled(m.title) && norm(m.title).length > 3 && norm(v).includes(norm(m.title))) err(m, i, `clues.${k} gives away the title`);
      });
      // a location most movies share is a wasted clue: only keep places that set this movie apart
      if (filled(m.clues.location) && WEAK_PLACES.some(p => norm(m.clues.location).includes(p)))
        warn(m, i, `clues.location "${m.clues.location}" is where most movies are set, so it's a wasted clue: use a place that matters to this story, or leave it ''`);
    }
  }

  // same movie twice?
  if (filled(m.title)) {
    const key = norm(m.title) + '|' + m.year;
    if (titles.has(key)) err(m, i, `same title and year as ${where(MOVIES[titles.get(key)], titles.get(key))}`);
    else titles.set(key, i);
  }
});

// ── typed answers: one spelling can't point to two movies ──
const spell = new Map();
MOVIES.forEach((m, i) => {
  if (!m || !filled(m.title)) return;
  [m.title, ...(Array.isArray(m.aka) ? m.aka : [])].filter(filled).forEach(s => {
    const k = norm(s);
    if (spell.has(k) && spell.get(k) !== i) {
      const o = spell.get(k);
      if (MOVIES[o].year !== m.year || norm(MOVIES[o].title) !== norm(m.title))
        warn(m, i, `"${s}" also matches ${where(MOVIES[o], o)}: typing it can't tell them apart (add the year to one aka?)`);
    } else spell.set(k, i);
  });
});

// ── names written two ways (the most common mistake) ──
const names = new Map(); // norm -> { spellings: Map(spelling -> count) }
MOVIES.forEach(m => m && PEOPLE.forEach(k => names_(m[k]).forEach(s => {
  const n = norm(s);
  if (!names.has(n)) names.set(n, new Map());
  const sp = names.get(n); sp.set(s, (sp.get(s) || 0) + 1);
})));
names.forEach(sp => {
  if (sp.size > 1) warnings.push(`Name written ${sp.size} ways: ${[...sp.keys()].map(s => `"${s}"`).join(', ')}. Pick one.`);
});
const keys = [...names.keys()].filter(n => n.length >= 5);
for (let a = 0; a < keys.length; a++) for (let b = a + 1; b < keys.length; b++) {
  const x = keys[a], y = keys[b];
  if (Math.abs(x.length - y.length) > 2) continue;
  const lim = Math.min(x.length, y.length) >= 10 ? 2 : 1;
  if (dist(x, y) <= lim) {
    const sx = [...names.get(x).keys()][0], sy = [...names.get(y).keys()][0];
    warnings.push(`"${sx}" and "${sy}" look like the same person spelled differently. If they are, pick one.`);
  }
}

// ── directors.js: every movie's director must be listed there ──
let DIRS = null, dirNote = '';
if (fs.existsSync(DIR_FILE)) {
  try {
    const box = { self: {}, module: { exports: {} } };
    vm.runInNewContext(fs.readFileSync(DIR_FILE, 'utf8'), box, { filename: 'directors.js' });
    DIRS = Array.isArray(box.module.exports) ? box.module.exports : box.self.CinefiedDirectors;
  } catch (e) { errors.push(`directors.js has a typing mistake and can't be read: ${e.message}`); }
} else dirNote = 'directors.js not found next to movies.js: skipped the director checks';
if (Array.isArray(DIRS)) {
  const dn = new Map(), dids = new Set();
  DIRS.forEach((d, j) => {
    const at = `directors.js entry #${j + 1}${d && d.name ? ` ("${d.name}")` : ''}`;
    if (!d || !filled(d.name)) return errors.push(`${at}: has no name`);
    if (!filled(d.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.id)) errors.push(`${at}: id should be lowercase words joined by "-"`);
    else if (dids.has(d.id)) errors.push(`${at}: id '${d.id}' is used twice`); else dids.add(d.id);
    if ('level' in d) warnings.push(`${at}: directors have no level any more: delete it`);
    if (dn.has(d.name.trim())) errors.push(`${at}: listed twice`); else dn.set(d.name.trim(), 0);
  });
  MOVIES.forEach((m, i) => {
    if (!m || !filled(m.director)) return;
    const d = m.director.trim();
    if (dn.has(d)) dn.set(d, dn.get(d) + 1);
    else {
      const near = [...dn.keys()].find(k => norm(k) === norm(d) || dist(norm(k), norm(d)) <= 2);
      err(m, i, `director "${d}" is not in directors.js${near ? ` (did you mean "${near}"?)` : ''}`);
    }
  });
  dn.forEach((n, name) => { if (n === 0) warnings.push(`directors.js: "${name}" has no movies in movies.js`); });
}

// ── people.js: actors, actresses and characters ──
let PEOPLE_ = null, CHARS = null, pplNote = '';
if (fs.existsSync(PEOPLE_FILE)) {
  try {
    const box = { self: {}, module: { exports: {} } };
    vm.runInNewContext(fs.readFileSync(PEOPLE_FILE, 'utf8'), box, { filename: 'people.js' });
    const D = box.module.exports && box.module.exports.PEOPLE ? box.module.exports : box.self.CinefiedPeople;
    if (D && Array.isArray(D.PEOPLE) && Array.isArray(D.CHARACTERS)) { PEOPLE_ = D.PEOPLE; CHARS = D.CHARACTERS; }
    else errors.push('people.js loaded but has no PEOPLE or CHARACTERS list');
  } catch (e) {
    const m = /:(\d+)/.exec(String(e.stack || ''));
    errors.push(`people.js has a typing mistake and can't be read: ${e.message}${m ? ` (around line ${m[1]})` : ''}`);
  }
} else pplNote = 'people.js not found next to movies.js: skipped the people checks';
if (PEOPLE_) {
  const ids = new Set(), owner = new Map();            // every name and aka, squashed, → who uses it
  PEOPLE_.forEach((p, j) => {
    const at = `people.js person #${j + 1}${p && p.name ? ` ("${p.name}")` : ''}`;
    if (!p || !filled(p.name)) return errors.push(`${at}: has no name`);
    if (!filled(p.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) errors.push(`${at}: id should be lowercase words joined by "-"`);
    else if (ids.has(p.id)) errors.push(`${at}: id '${p.id}' is used twice`); else ids.add(p.id);
    if (!Array.isArray(p.aka) || !p.aka.every(filled)) errors.push(`${at}: aka must be a list of names, or [] if none`);
    if (!KINDS.includes(p.kind)) errors.push(`${at}: kind must be 'actor' or 'actress'`);
    if (!FROM.includes(p.from)) errors.push(`${at}: from must be one of ${FROM.map(f => `'${f}'`).join(', ')}`);
    if (!LEVELS.includes(p.level)) errors.push(`${at}: level must be 'easy', 'medium' or 'hard'`);
    Object.keys(p).forEach(k => { if (!['id', 'name', 'aka', 'kind', 'from', 'level'].includes(k)) warnings.push(`${at}: "${k}" is not a field people.js uses`); });
    [p.name, ...(Array.isArray(p.aka) ? p.aka : [])].filter(filled).forEach(n => {
      const k = norm(n);
      if (owner.has(k) && owner.get(k) !== p) errors.push(`${at}: the name "${n}" is also used by "${owner.get(k).name}". Each name and aka must belong to one person`);
      else owner.set(k, p);
    });
  });
  // every hero and heroine in movies.js should be someone in people.js
  const missing = new Map(), wrongKind = new Map();
  MOVIES.forEach(m => {
    if (!m || !filled(m.title)) return;
    [['hero', 'actor'], ['heroine', 'actress']].forEach(([f, kind]) => names_(m[f]).forEach(n => {
      const p = owner.get(norm(n));
      if (!p) { if (!missing.has(n)) missing.set(n, []); missing.get(n).push(m.title); }
      else if (p.kind !== kind && !wrongKind.has(n)) wrongKind.set(n, `${f} in ${m.title}, but people.js has "${p.name}" as an ${p.kind}`);
    }));
  });
  missing.forEach((t, n) => warnings.push(`"${n}" (${t.slice(0, 3).join(', ')}${t.length > 3 ? ` +${t.length - 3}` : ''}) is in movies.js but not in people.js`));
  wrongKind.forEach((w, n) => warnings.push(`"${n}": ${w}`));
  // characters
  const live = new Set(MOVIES.filter(m => m && filled(m.id)).map(m => m.id)), cids = new Set();
  CHARS.forEach((c, j) => {
    const at = `people.js character #${j + 1}${c && c.name ? ` ("${c.name}")` : ''}`;
    if (!c || !filled(c.name)) return errors.push(`${at}: has no name`);
    if (!filled(c.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id)) errors.push(`${at}: id should be lowercase words joined by "-"`);
    else if (cids.has(c.id)) errors.push(`${at}: id '${c.id}' is used twice`); else cids.add(c.id);
    if (!filled(c.film)) errors.push(`${at}: film is empty (it's what the games show after the name)`);
    if (typeof c.movie !== 'string') errors.push(`${at}: movie must be a movie id in quotes, or ''`);
    else if (c.movie && !live.has(c.movie)) errors.push(`${at}: movie '${c.movie}' is not an id in movies.js (use '' if the movie isn't there)`);
    if (!filled(c.by)) warnings.push(`${at}: by is empty (who played them)`);
    if ('level' in c) warnings.push(`${at}: characters have no level: delete it`);
  });
}

// ── what each game can use ──
const ok = m => m && filled(m.title) && Number.isInteger(m.year) && LEVELS.includes(m.level);
const good = MOVIES.filter(ok).filter(m => m.level !== 'hard');   // hard movies are left out of every game for now
const hardN = MOVIES.filter(ok).filter(m => m.level === 'hard').length;
const spMovies = good.filter(m => Array.isArray(m.spoiler) && m.spoiler.some(filled));
const spLines = spMovies.reduce((n, m) => n + m.spoiler.filter(filled).length, 0);
const noYear = good.filter(m => m.year === 0).length;
const statsFull = good.filter(m => m.year > 0).filter(m => m.stats && Object.keys(STATS).every(k => typeof m.stats[k] === 'number' && m.stats[k] > 0));
const dlg = good.filter(m => Array.isArray(m.dialogues) && m.dialogues.some(filled));
const dlgN = dlg.reduce((n, m) => n + m.dialogues.filter(filled).length, 0);
const starEasy = good.filter(m => has(m.hero) && has(m.heroine) && filled(m.music));
const starRoles = good.filter(m => Array.isArray(m.roles) && m.roles.filter(filled).length >= 2 && (m.roles.filter(filled).length >= 3 || filled(m.director)));
const dirCount = {}; good.forEach(m => { if (filled(m.director)) dirCount[m.director.trim()] = (dirCount[m.director.trim()] || 0) + 1; });
const dirsReady = Object.entries(dirCount).filter(([, n]) => n >= 3);
const pairs = good.reduce((n, m) => n + names_(m.hero).length + names_(m.heroine).length, 0);
// Clue Pool: free = hero · weak (genre, location, job, character names) · medium (music, director) · strong (scene, song, character names)
const tiers = m => {
  const c = m.clues && typeof m.clues === 'object' ? m.clues : {};
  return [
    [filled(m.genre), filled(c.location) && !WEAK_PLACES.some(p => norm(c.location).includes(p)), filled(c.job), Array.isArray(m.roles) && m.roles.filter(filled).length >= 2].filter(Boolean).length,
    [filled(m.music), filled(m.director)].filter(Boolean).length,
    [filled(c.scene), filled(c.song), Array.isArray(m.roles) && m.roles.filter(filled).length >= 2].filter(Boolean).length,
  ];
};
const cpPlay = good.filter(m => has(m.hero) && tiers(m).every(n => n >= 1));
const cpVaried = good.filter(m => tiers(m).every(n => n >= 2));
const cpMissing = cpPlay.length - cpVaried.length;
const gameDirs = Object.entries(dirCount).filter(([, n]) => n >= GAME_DIRS).length;
const ppl = (kind, all) => PEOPLE_ ? PEOPLE_.filter(p => p.kind === kind && (all || p.level !== 'hard')).length : 0;

// ── report ──
const pad = (s, n) => String(s).padEnd(n);
console.log(`\n${C.b}CINEFIED DATA CHECK${C.x}  ${C.d}${path.relative(process.cwd(), FILE)} · ${MOVIES.length} movies${C.x}\n`);
if (errors.length) {
  console.log(`${C.r}${C.b}ERRORS (${errors.length}) — fix these before uploading${C.x}`);
  errors.forEach(e => console.log(`${C.r}  ✗ ${e}${C.x}`));
  console.log('');
}
if (warnings.length) {
  console.log(`${C.y}${C.b}WARNINGS (${warnings.length}) — worth a look${C.x}`);
  warnings.forEach(w => console.log(`${C.y}  ! ${w}${C.x}`));
  console.log('');
}
if (!errors.length && !warnings.length) console.log(`${C.g}${C.b}No problems found.${C.x}\n`);

const row = (game, what, n) => console.log(`  ${pad(game, 20)}${pad(n, 30)}${C.d}${what}${C.x}`);
console.log(`${C.b}WHAT EACH GAME CAN USE${C.x}`);
row('Charades', 'movies (every one except the hard ones)', good.length);
row('Hard movies', "only Imposter on Hard uses them", hardN);
row('Spoiler', `story lines across ${spMovies.length} movies`, spLines);
row('Dialogue Detective', `dialogues across ${dlg.length} movies`, dlgN);
row('Starring', 'STARRING rounds · THE CHARACTERS rounds', `${starEasy.length} · ${starRoles.length}`);
row("Director's Cut", 'directors with 3+ movies', dirsReady.length);
if (dirNote) console.log(`  ${C.d}${dirNote}${C.x}`);
row('Memory Match', 'actor + movie pairs', pairs);
row('Higher or Lower', 'movies with year + all 3 stats', statsFull.length);
row('Clue Pool', 'playable · varied (2+ per tier)', `${cpPlay.length} · ${cpVaried.length}`);
if (cpMissing > 0) console.log(`  ${C.d}${' '.repeat(20)}${cpMissing} playable movies would show the same clue each time in some tier${C.x}`);
if (PEOPLE_) {
  row('Heads Up, Blindspot', 'actors · actresses · characters (no hard ones)', `${ppl('actor')} · ${ppl('actress')} · ${CHARS.length}`);
  row('Imposter', 'actors · actresses · characters (all levels)', `${ppl('actor', 1)} · ${ppl('actress', 1)} · ${CHARS.length}`);
  row('Directors', `directors with ${GAME_DIRS}+ movies (Heads Up, Blindspot, Imposter)`, gameDirs);
}
if (pplNote) console.log(`  ${C.d}${pplNote}${C.x}`);
console.log('');

const checks = (src.match(/\/\/\s*check\b/gi) || []).length;
if (checks) console.log(`${C.y}${checks} lines still marked // check (filled from memory, need verifying)${C.x}`);
if (noYear) console.log(`${C.y}${noYear} movies have no year yet (year: 0)${C.x}`);
if (checks || noYear) console.log('');
if (errors.length) { console.log(`${C.r}${C.b}Not ready to upload.${C.x}\n`); process.exit(1); }
console.log(`${C.g}${C.b}Ready to upload.${C.x}\n`);
