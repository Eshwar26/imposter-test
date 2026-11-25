/* ════════════════════════════════════════════════════════════════
   CINEFIED · PICK
   Shared helpers for every game that reads data/movies.js.

   deck(key, items, opts) gives a card picker with no repeats:
     • every item comes up once before any comes up again
       (remembered on this phone under localStorage[key]);
     • opts.group(item) → never two cards from the same group back to
       back (e.g. two dialogues from the same movie).
   Items need an id. Items removed from the data are forgotten safely.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const load = k => { try { const v = JSON.parse(localStorage.getItem(k) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const filled = v => typeof v === 'string' && v.trim() !== '';
  const list = v => (Array.isArray(v) ? v : [v]).filter(filled).map(s => s.trim());
  const rnd = a => a[Math.floor(Math.random() * a.length)];
  function shuffle(a) {
    a = a.slice();
    for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
    return a;
  }
  // all live movies (the ones not switched off in movies.js)
  const movies = () => (Array.isArray(root.CinefiedMovies) ? root.CinefiedMovies : []).filter(m => m && filled(m.title));

  function deck(key, items, opts = {}) {
    const group = opts.group || (x => x.id);
    const ids = new Set(items.map(x => x.id));
    let seen = load(key).filter(i => ids.has(i));
    let last = null;
    return {
      size: items.length,
      next() {
        if (!items.length) return null;
        let left = items.filter(x => !seen.includes(x.id));
        if (!left.length) { seen = []; left = items.slice(); }
        let pool = left;
        if (last !== null && left.length > 1) { const p = left.filter(x => group(x) !== last); if (p.length) pool = p; }
        const it = rnd(pool);
        seen.push(it.id); save(key, seen); last = group(it);
        return it;
      }
    };
  }

  // The name lists for Heads Up and Blindspot, from data/movies.js, data/people.js and data/directors.js.
  // Hard actors and actresses are left out unless opts.hard. Directors need 2+ movies in movies.js.
  // A character reads "Kattappa (Baahubali)". Every phone builds the same lists in the same order.
  function words(opts = {}) {
    const P = root.CinefiedPeople || {};
    const people = (Array.isArray(P.PEOPLE) ? P.PEOPLE : []).filter(p => p && filled(p.name) && (opts.hard || p.level !== 'hard'));
    const chars = (Array.isArray(P.CHARACTERS) ? P.CHARACTERS : []).filter(c => c && filled(c.name));
    const ms = movies(), count = {};
    ms.forEach(m => { if (filled(m.director)) count[m.director.trim()] = (count[m.director.trim()] || 0) + 1; });
    const dirs = (Array.isArray(root.CinefiedDirectors) ? root.CinefiedDirectors : []).filter(d => d && filled(d.name) && (count[d.name.trim()] || 0) >= 2);
    return {
      movies: ms.map(m => m.title.trim()),
      actors: people.filter(p => p.kind === 'actor').map(p => p.name.trim()),
      actresses: people.filter(p => p.kind === 'actress').map(p => p.name.trim()),
      directors: dirs.map(d => d.name.trim()),
      characters: chars.map(c => (filled(c.film) ? `${c.name.trim()} (${c.film.trim()})` : c.name.trim())),
    };
  }
  root.CinefiedPick = { filled, list, rnd, shuffle, movies, deck, words };
})(typeof self !== 'undefined' ? self : this);
