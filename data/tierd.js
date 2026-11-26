/* ════════════════════════════════════════════════════════════════
   Cinefied · tierd.js · Tier'd themes
   Each game of Tier'd picks one theme at random (no repeats until all are used),
   deals 10 random items for it, and players rank them into tiers.

     id      short name, no spaces (never change it once games use it)
     name    what the game shows, big, at the top
     type    where the 10 come from:
               'movies'      released movies in movies.js
               'actors'      actors in people.js (not the hard ones)
               'actresses'   actresses in people.js (not the hard ones)
               'characters'  characters in people.js
               'directors'   directors with 2+ movies in movies.js
               'music'       music directors with 3+ movies in movies.js

   Movie themes can be narrowed to one person's movies (spelled exactly as in movies.js):
     director: 'S. S. Rajamouli'    only movies he directed
     hero: 'Mahesh Babu'            only movies with him as hero
     music: 'Devi Sri Prasad'       only movies he composed for
   Without one of these, the 10 are random from every released movie.

   Any theme can instead list its own items (10 or more, spelled exactly as in the data files):
     items: ['Bhallaladeva', 'Pasupathi', ...]    10 at random from this list only
   A person theme needs 10+ released movies in movies.js (the checker warns if not).
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  const THEMES = [

    // ═════════════ MOVIES · any 10 at random ═════════════
    { id: 'banger-intervals', name: 'Banger intervals', type: 'movies' },
    { id: 'banger-climaxes', name: 'Banger climaxes', type: 'movies' },
    { id: 'cult-classics', name: 'Cult classics', type: 'movies' },
    { id: 'tv-reruns', name: 'TV reruns you never skip', type: 'movies' },
    { id: 'mass-masala', name: 'Mass masala', type: 'movies' },
    { id: 'family-entertainers', name: 'Family entertainers', type: 'movies' },
    { id: 'comedy', name: 'Comedy', type: 'movies' },
    { id: 'chartbuster-albums', name: 'Chartbuster albums', type: 'movies' },
    { id: 'music', name: 'Music', type: 'movies' },
    { id: 'hero-entries', name: 'Hero entries', type: 'movies' },
    { id: 'villains', name: 'Villains', type: 'movies' },
    { id: 'fights', name: 'Fight scenes', type: 'movies' },
    { id: 'dialogues', name: 'Dialogues', type: 'movies' },
    { id: 'love-stories', name: 'Love stories', type: 'movies' },
    { id: 'rewatch-value', name: 'Rewatch value', type: 'movies' },
    { id: 'big-letdowns', name: 'Big letdowns', type: 'movies' },

    // ═════════════ MOVIES · one director ═════════════
    { id: 'rajamouli-movies', name: "Rajamouli's movies", type: 'movies', director: 'S. S. Rajamouli' },
    { id: 'trivikram-movies', name: "Trivikram's movies", type: 'movies', director: 'Trivikram Srinivas' },
    { id: 'puri-movies', name: "Puri Jagannadh's movies", type: 'movies', director: 'Puri Jagannadh' },
    { id: 'vinayak-movies', name: "V. V. Vinayak's movies", type: 'movies', director: 'V. V. Vinayak' },
    { id: 'sreenu-vaitla-movies', name: "Sreenu Vaitla's movies", type: 'movies', director: 'Sreenu Vaitla' },

    // ═════════════ MOVIES · one hero ═════════════
    { id: 'chiranjeevi-movies', name: "Chiranjeevi's movies", type: 'movies', hero: 'Chiranjeevi' },
    { id: 'nagarjuna-movies', name: "Nagarjuna's movies", type: 'movies', hero: 'Nagarjuna' },
    { id: 'venkatesh-movies', name: "Venkatesh's movies", type: 'movies', hero: 'Venkatesh' },
    { id: 'pawan-movies', name: "Pawan Kalyan's movies", type: 'movies', hero: 'Pawan Kalyan' },
    { id: 'mahesh-movies', name: "Mahesh Babu's movies", type: 'movies', hero: 'Mahesh Babu' },
    { id: 'ntr-movies', name: "Jr NTR's movies", type: 'movies', hero: 'Jr NTR' },
    { id: 'prabhas-movies', name: "Prabhas's movies", type: 'movies', hero: 'Prabhas' },
    { id: 'allu-arjun-movies', name: "Allu Arjun's movies", type: 'movies', hero: 'Allu Arjun' },
    { id: 'ram-charan-movies', name: "Ram Charan's movies", type: 'movies', hero: 'Ram Charan' },
    { id: 'ravi-teja-movies', name: "Ravi Teja's movies", type: 'movies', hero: 'Ravi Teja' },
    { id: 'nani-movies', name: "Nani's movies", type: 'movies', hero: 'Nani' },
    { id: 'rajinikanth-movies', name: "Rajinikanth's movies", type: 'movies', hero: 'Rajinikanth' },

    // ═════════════ MOVIES · one music director ═════════════
    { id: 'dsp-albums', name: 'Devi Sri Prasad albums', type: 'movies', music: 'Devi Sri Prasad' },
    { id: 'thaman-albums', name: 'Thaman albums', type: 'movies', music: 'S. Thaman' },
    { id: 'mani-sharma-albums', name: 'Mani Sharma albums', type: 'movies', music: 'Mani Sharma' },
    { id: 'keeravani-albums', name: 'Keeravani albums', type: 'movies', music: 'M. M. Keeravani' },
    { id: 'anirudh-albums', name: 'Anirudh albums', type: 'movies', music: 'Anirudh Ravichander' },
    { id: 'mickey-albums', name: 'Mickey J. Meyer albums', type: 'movies', music: 'Mickey J. Meyer' },

    // ═════════════ PEOPLE · any 10 at random ═════════════
    { id: 'comedy-timing', name: 'Comedy timing', type: 'actors' },
    { id: 'dialogue-delivery', name: 'Dialogue delivery', type: 'actors' },
    { id: 'dancers', name: 'Dancers', type: 'actors' },
    { id: 'screen-presence', name: 'Screen presence', type: 'actresses' },
    { id: 'heroine-dancers', name: 'Dancers', type: 'actresses' },
    { id: 'iconic-characters', name: 'Iconic characters', type: 'characters' },
    { id: 'iconic-villains', name: 'Iconic villains', type: 'characters', items: [
      'Bhallaladeva', 'Bhanwar Singh Shekhawat', 'Pasupathi', 'Obul Reddy', 'Ali Bhai', 'Sher Khan', 'Ranadev Billa',
      'Siddharth Abhimanyu', 'Basi Reddy', 'Bikshu Yadav', 'Bajirao', 'Adheera', 'Bavuji', 'Neelambari'] },
    { id: 'brahmi-characters', name: "Brahmanandam's characters", type: 'characters', items: [
      'Kill Bill Pandey', 'Padmasri', 'Lavangam', 'McDowell Murthy', 'Halwa Raj', 'Pilli Padmanabha Simha',
      'Jayasurya', 'Chari', 'Bhattu', 'Gachibowli Diwakar'] },
    { id: 'directors', name: 'Directors', type: 'directors' },
    { id: 'music-directors', name: 'Music directors', type: 'music' },

  ];

  if (typeof module !== 'undefined' && module.exports) module.exports = THEMES; else root.CinefiedTierd = THEMES;
})(typeof self !== 'undefined' ? self : this);
