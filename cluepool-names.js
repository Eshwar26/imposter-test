/* Every movie a captain may propose in Clue Pool: all titles in movies.js. Lives only on the server.
   The phones build the same list from public/data/movies.js. */
(function (root) {
  const filled = v => typeof v === 'string' && v.trim() !== '';
  module.exports = require('./movies.js').filter(m => m && filled(m.title)).map(m => m.title.trim());
})(this);
