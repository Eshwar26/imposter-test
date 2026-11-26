/* Clue Pool movies. Lives only on the server. Built from movies.js (a copy of public/data/movies.js
   that tools/copy-data.js puts here on every functions deploy). Nothing to edit here: fix the clues in movies.js.

   n = name, y = year, a = the free clue (the hero, or both heroes)
   h = the three hint tiers. Each is a list of possible hints { k: kind, v: text }; one is picked at random each round.
     tier 1 (vague):  genre, place (not plain Hyderabad), hero's job, character names
     tier 2 (medium): music director, director
     tier 3 (sharp):  famous scene, a song, character names
   A movie is left out when any tier is empty, or the only choice for tiers 1 and 3 is the character names. */
(function (root) {
  const ALL = require('./movies.js');
  const filled = v => typeof v === 'string' && v.trim() !== '';
  const list = v => (Array.isArray(v) ? v : [v]).filter(filled).map(s => s.trim());
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const WEAK_PLACES = ['hyderabad'];          // a place most movies share is a wasted clue (only when it is the whole place)
  const names = a => (a.length <= 2 ? a.join(' and ') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]);

  function build(m) {
    const t = norm(m.title), c = m.clues && typeof m.clues === 'object' ? m.clues : {};
    const hero = list(m.hero);
    if (!filled(m.title) || !hero.length) return null;
    // character names, unless one of them gives the title away
    const roles = list(m.roles || []).slice(0, 3);
    const giveaway = roles.some(r => { const n = norm(r); return n.length > 3 && t.length > 3 && (n.includes(t) || t.includes(n)); });
    const R = roles.length >= 2 && !giveaway ? [{ k: 'roles', v: roles.join(', ') }] : [];
    const opt = (k, v) => (filled(v) ? [{ k, v: v.trim() }] : []);
    const place = filled(c.location) && !WEAK_PLACES.includes(norm(c.location)) ? c.location : '';
    const h = [
      [...opt('genre', m.genre), ...opt('place', place), ...opt('job', c.job), ...R],
      [...opt('music', m.music), ...opt('director', m.director)],
      [...opt('scene', c.scene), ...opt('song', c.song), ...R],
    ];
    if (h.some(x => !x.length)) return null;
    if (!h[0].some(a => h[2].some(b => b.k !== a.k))) return null;     // tiers 1 and 3 would show the same hint
    return { n: m.title.trim(), y: m.year, a: names(hero), h };
  }
  const MOVIES = ALL.filter(m => m && m.level !== 'hard').map(build).filter(Boolean);   // hard movies stay out
  module.exports = MOVIES;
})(this);
