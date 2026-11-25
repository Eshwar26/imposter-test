/* Imposter word lists. Lives only on the server: the game page never downloads this file.
   Built from copies of public/data/movies.js, people.js and directors.js that tools/copy-data.js
   puts here on every functions deploy. Nothing to edit here: change those files instead.
     movies      every live movie
     actors      every actor in people.js (all levels)
     actresses   every actress in people.js (all levels)
     directors   directors with 2+ movies in movies.js
     characters  "Kattappa (Baahubali)"
   (Levels are in those files too, for Imposter's difficulty setting later.) */
(function (root) {
  const filled = v => typeof v === 'string' && v.trim() !== '';
  const MOVIES = require('./movies.js').filter(m => m && filled(m.title));
  const { PEOPLE, CHARACTERS } = require('./people.js');
  const DIRECTORS = require('./directors.js');

  const people = PEOPLE.filter(p => p && filled(p.name));
  const count = {};
  MOVIES.forEach(m => { if (filled(m.director)) count[m.director.trim()] = (count[m.director.trim()] || 0) + 1; });

  const WORDS = {
    movies: MOVIES.map(m => m.title.trim()),
    actors: people.filter(p => p.kind === 'actor').map(p => p.name.trim()),
    actresses: people.filter(p => p.kind === 'actress').map(p => p.name.trim()),
    directors: DIRECTORS.filter(d => d && filled(d.name) && (count[d.name.trim()] || 0) >= 2).map(d => d.name.trim()),
    characters: CHARACTERS.filter(c => c && filled(c.name)).map(c => (filled(c.film) ? `${c.name.trim()} (${c.film.trim()})` : c.name.trim())),
  };
  module.exports = WORDS;
})(this);
