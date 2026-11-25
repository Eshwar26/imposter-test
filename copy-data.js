/* Copies movies.js, people.js and directors.js from public/data/ into functions/, so the referee
   (Pictionary, Imposter, Clue Pool) reads the same lists as the website.
   Runs by itself before every functions deploy (see "predeploy" in firebase.json).
   You can also run it by hand from the project folder:  node tools/copy-data.js */
const fs = require('fs'), path = require('path');
const root = process.env.PROJECT_DIR || path.join(__dirname, '..');
const out = [];
for (const f of ['movies.js', 'people.js', 'directors.js']) {
  const from = path.join(root, 'public', 'data', f), to = path.join(root, 'functions', f);
  fs.copyFileSync(from, to);
  const d = require(to);
  out.push(`${f} (${Array.isArray(d) ? d.length : (d.PEOPLE || []).length + ' people, ' + (d.CHARACTERS || []).length + ' characters'})`);
}
console.log('copied into functions/: ' + out.join(', '));
