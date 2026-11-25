/* Pictionary movies, sorted by difficulty. Lives only on the server.
   Built from movies.js (a copy of public/data/movies.js that tools/copy-data.js puts here on every functions deploy).
   Easy = one word of up to 9 letters. Hard = three or more words, or 14+ letters. Medium = the rest. */
(function (root) {
  const ALL = require('./movies.js');
  const filled = v => typeof v === 'string' && v.trim() !== '';
  const MOVIES = { easy: [], medium: [], hard: [] };
  ALL.filter(m => m && filled(m.title)).forEach(m => {
    const t = m.title.trim();
    const words = t.split(/\s+/).filter(w => /[a-z0-9]/i.test(w)).length;
    const letters = t.replace(/[^a-z0-9]/gi, '').length;
    const d = words >= 3 || letters >= 14 ? 'hard' : words === 1 && letters <= 9 ? 'easy' : 'medium';
    MOVIES[d].push(t);
  });
  module.exports = MOVIES;
})(this);
