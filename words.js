/* Imposter word lists. Lives only on the server: the game page never downloads this file.
   Built from copies of public/data/movies.js, people.js and directors.js that tools/copy-data.js
   puts here on every functions deploy. Nothing to edit here: change those files instead.

   Movies, actors and actresses are split by level (the Difficulty setting). Each level is its
   own list: Easy deals only easy names, Medium only medium, Hard only hard.
     movies      { easy, medium, hard }   from movies.js
     actors      { easy, medium, hard }   from people.js
     actresses   { easy, medium, hard }   from people.js
   Directors and characters have no levels: always all of them.
     directors   directors with 2+ easy or medium movies
     characters  "Kattappa (Baahubali)" */
(function (root) {
  const filled = v => typeof v === 'string' && v.trim() !== '';
  const LEVELS = ['easy', 'medium', 'hard'];
  const MOVIES = require('./movies.js').filter(m => m && filled(m.title));
  const { PEOPLE, CHARACTERS } = require('./people.js');
  const DIRECTORS = require('./directors.js');

  const byLevel = (items, name) => {
    const out = { easy: [], medium: [], hard: [] };
    items.forEach(x => { if (LEVELS.includes(x.level)) out[x.level].push(name(x).trim()); });
    return out;
  };
  const people = PEOPLE.filter(p => p && filled(p.name));
  const count = {};
  MOVIES.filter(m => m.level !== 'hard').forEach(m => { if (filled(m.director)) count[m.director.trim()] = (count[m.director.trim()] || 0) + 1; });

  const WORDS = {
    movies: byLevel(MOVIES, m => m.title),
    actors: byLevel(people.filter(p => p.kind === 'actor'), p => p.name),
    actresses: byLevel(people.filter(p => p.kind === 'actress'), p => p.name),
    directors: DIRECTORS.filter(d => d && filled(d.name) && (count[d.name.trim()] || 0) >= 2).map(d => d.name.trim()),
    characters: CHARACTERS.filter(c => c && filled(c.name)).map(c => (filled(c.film) ? `${c.name.trim()} (${c.film.trim()})` : c.name.trim())),
  };
  module.exports = WORDS;
})(this);
