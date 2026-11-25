/* Copies public/data/movies.js into functions/ so the referee (Pictionary, Imposter, Clue Pool) reads the same list.
   Runs by itself before every functions deploy (see "predeploy" in firebase.json).
   You can also run it by hand from the project folder:  node tools/copy-data.js */
const fs = require('fs'), path = require('path');
const root = process.env.PROJECT_DIR || path.join(__dirname, '..');
const from = path.join(root, 'public', 'data', 'movies.js'), to = path.join(root, 'functions', 'movies.js');
fs.copyFileSync(from, to);
const n = require(to).length;
console.log(`copied movies.js into functions/ (${n} movies)`);
