/* ════════════════════════════════════════════════════════════════
   CINEFIED · MASTER MOVIE LIST
   One entry per movie. Every game reads the parts it needs.

   Before uploading, always run:   node tools/check.js
   It finds typos, duplicates and missing pieces, checks this file
   against directors.js, and shows how many movies each game can use.

   ── "// check" ──
   A line ending in // check holds something filled in from memory that
   needs verifying. Fix it (or confirm it), then delete the // check.
   The checker counts how many are left.
   level and roles are first guesses for every movie: adjust freely.

   ── RULES ──
   • id      never change it, never reuse it. Lowercase title words
             joined by "-", e.g. 'pokiri'. Add the year only when two
             movies share a title ('kushi-2023').
   • year    0 means not known yet (Higher or Lower and Clue Pool skip it).
   • hero / heroine   one name, or a list for two-hero films:
             ['Jr NTR', 'Ram Charan']
   • director   must match a name in directors.js exactly.
   • Write people's names the SAME way every time.
   • Leave a field '' (or [] / 0) when you don't have it yet.
     A movie is simply skipped by any game that needs the empty part.
   • Comments (// like this) and a comma after the last item are fine.

   ── FIELDS ──
   id, title, aka, year ....... aka = other spellings accepted when typing
   level ...................... how well known: 'easy' 'medium' 'hard'.
                                Used only behind the scenes (e.g. Tier'd),
                                never shown to players as a difficulty choice.
   hero, heroine, director,
   music, villain, banner, genre
   roles ...................... Starring: character names, in this order:
                                hero's role, heroine's role, and a famous
                                third character (villain or comedian) if
                                there is one. 2 or 3 names. [] = not filled.
   stats ...................... Higher or Lower: imdb (0-10), songs, runtime (minutes)
   spoiler .................... Spoiler only: up to 2 story lines, each a full sentence (10+ words) that tells the plot. No vague hints.
                                One is picked at random; each line must work
                                on its own.
   dialogues .................. Dialogue Detective only
   clues ...................... Clue Pool only: job, location, song (title only), scene

   No levels in the games: Charades and Pictionary use every movie
   (Pictionary's drawer picks 1 of 3 random movies).

   Filled automatically from this file: Starring (mixes two kinds of
   round at random: STARRING = hero + heroine + music director, and
   THE CHARACTERS = the roles, with the director as the third clue when
   roles has only 2 names), Director's Cut (directors with 3+ movies),
   Memory Match (hero/heroine and movie pairs), and Clue Pool's genre,
   decade, year, music, villain, banner and director.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  const MOVIES = [

    /* ── SWITCHED OFF: movies before 2000 ───────────────────
       No game uses anything inside this comment. To bring a movie
       back, cut its whole { ... }, block and paste it below the
       2000s line. Delete this whole comment to bring them all back.

    // ── 1970s ─────────────────────────────────────────────

    {
      id: 'adavi-ramudu',
      title: 'Adavi Ramudu',
      aka: [],
      year: 1977,
      level: 'hard',

      hero: 'N. T. Rama Rao',
      heroine: 'Jaya Prada',
      director: 'K. Raghavendra Rao',
      music: 'K. V. Mahadevan',
      villain: '',   // check
      banner: 'Satya Chitra',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.8, songs: 7, runtime: 180 },   // check

      spoiler: [
        'A forest officer fights a gang of smugglers who exploit tribal people in the jungle.',
        'A man who loves the forest goes undercover to protect its people and its animals.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Forest officer',
        location: 'A forest',
        song: 'Aaresukoboyi Paaresukunnanu',
        scene: 'The hero rides an elephant into the smugglers\' camp',
      },
    },

    // ── 1980s ─────────────────────────────────────────────

    {
      id: 'sankarabharanam',
      title: 'Sankarabharanam',
      aka: [],
      year: 1980,
      level: 'hard',

      hero: 'J. V. Somayajulu',
      heroine: 'Manju Bhargavi',
      director: 'K. Viswanath',
      music: 'K. V. Mahadevan',
      villain: '',
      banner: 'Poornodaya Movie Creations',
      genre: 'Musical drama',
      roles: ['Sankara Sastry', 'Tulasi'],   // check

      stats: { imdb: 8.8, songs: 10, runtime: 143 },   // check

      spoiler: [
        'A classical singer gives shelter to a dancer and her son, and is shunned by society.',
        'A Carnatic music maestro and a courtesan\'s daughter.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Classical singer',
        location: 'Rajahmundry',
        song: 'Sankara Naadha Sareera Para',
        scene: 'A great classical singer and a courtesan\'s daughter who reveres him',
      },
    },
    {
      id: 'khaidi',
      title: 'Khaidi',
      aka: [],
      year: 1983,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Madhavi',
      director: 'A. Kodandarami Reddy',
      music: 'K. Chakravarthy',
      villain: 'Rao Gopal Rao',
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 7.6, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A young man falsely accused of a crime escapes from jail to take revenge on the landlord who ruined his life.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Fugitive',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'challenge',
      title: 'Challenge',
      aka: [],
      year: 1984,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Vijayashanti',
      director: 'A. Kodandarami Reddy',
      music: 'Ilaiyaraaja',
      villain: 'Rao Gopal Rao',   // check
      banner: '',   // check
      genre: 'Drama',
      roles: [],

      stats: { imdb: 7.6, songs: 6, runtime: 150 },   // check

      spoiler: [
        'An unemployed graduate bets a rich man that he can earn five lakh rupees honestly in five years.',
        'A poor graduate bets a businessman that he can become rich honestly.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed graduate',
        location: 'Hyderabad',
        song: '',
        scene: 'A poor graduate shakes hands on a bet with a businessman in front of everyone',
      },
    },
    {
      id: 'geethanjali',
      title: 'Geethanjali',
      aka: [],
      year: 1989,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Girija Shettar',
      director: 'Mani Ratnam',
      music: 'Ilaiyaraaja',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.3, songs: 6, runtime: 140 },   // check

      spoiler: [
        'A friendly young man moves into a house haunted by a spirit, and the more he tries to ignore it, the more it follows him.',
        'Two young people with little time left fall in love in the hills.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College graduate',
        location: 'Ooty',
        song: 'O Priya Priya',
        scene: 'Two people who are terminally ill fall in love in Ooty',
      },
    },
    {
      id: 'shiva',
      title: 'Shiva',
      aka: [],
      year: 1989,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Amala',
      director: 'Ram Gopal Varma',
      music: 'Ilaiyaraaja',
      villain: 'Raghuvaran',
      banner: 'Annapurna Studios',
      genre: 'Crime action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.2, songs: 5, runtime: 165 },   // check

      spoiler: [
        'A college student stands up to a gang leader who controls the student politics of Vijayawada.',
        'A student breaks a bicycle chain and starts a war with a gangster.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Vijayawada',
        song: 'Botany Paatam Undi',
        scene: 'A college student fights a gangster with a cycle chain',
      },
    },

    // ── 1990s ─────────────────────────────────────────────

    {
      id: 'jagadeka-veerudu-athiloka-sundari',
      title: 'Jagadeka Veerudu Athiloka Sundari',
      aka: [],
      year: 1990,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Sridevi',
      director: 'K. Raghavendra Rao',
      music: 'Ilaiyaraaja',
      villain: 'Amrish Puri',
      banner: 'Vyjayanthi Movies',
      genre: 'Fantasy',
      roles: ['Raju', 'Indraja', 'Mahadrashta'],   // check

      stats: { imdb: 8, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A goddess loses her magic ring on Earth, and a tourist guide who finds it refuses to give it back.',
        'An apsara comes down from heaven and lives with a kind-hearted guide and his orphans.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Tourist guide',
        location: 'Hyderabad and heaven',
        song: 'Abbanee Theeyani Debba',
        scene: 'A goddess loses her ring on earth',
      },
    },
    {
      id: 'kshana-kshanam',
      title: 'Kshana Kshanam',
      aka: [],
      year: 1991,
      level: 'hard',

      hero: 'Venkatesh',
      heroine: 'Sridevi',
      director: 'Ram Gopal Varma',
      music: 'M. M. Keeravani',
      villain: 'Paresh Rawal',
      banner: '',   // check
      genre: 'Thriller',
      roles: ['Chandu', 'Satya', 'Nayar'],   // check

      stats: { imdb: 7.9, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A woman accidentally stumbles onto stolen money and goes on the run with a small-time thief.',
        'A chase through the forests with a girl and a thief.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Small-time thief',
        location: 'A forest',
        song: '',
        scene: '',
      },
    },
    {
      id: 'gharana-mogudu',
      title: 'Gharana Mogudu',
      aka: [],
      year: 1992,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Nagma',
      director: 'K. Raghavendra Rao',
      music: 'M. M. Keeravani',
      villain: 'Kaikala Satyanarayana',   // check
      banner: '',   // check
      genre: 'Action comedy',
      roles: ['Raju', 'Uma Devi'],   // check

      stats: { imdb: 7.1, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A worker in a factory marries the arrogant daughter of its owner and tames her.',
        'A labourer teaches his proud boss-wife a lesson.',
      ],
      dialogues: ['Okkasaari face turning ichukondi.'],

      clues: {   // check
        job: 'Factory worker',
        location: 'Vizag',
        song: 'Bangaru Kodipetta',
        scene: 'A worker marries the arrogant owner of his company',
      },
    },
    {
      id: 'gaayam',
      title: 'Gaayam',
      aka: [],
      year: 1993,
      level: 'hard',

      hero: 'Jagapathi Babu',
      heroine: 'Urmila Matondkar',
      director: 'Ram Gopal Varma',
      music: 'Sri',
      villain: 'Kota Srinivasa Rao',
      banner: '',   // check
      genre: 'Crime drama',
      roles: [],

      stats: { imdb: 8.1, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A young man is forced to take over his murdered brother\'s gang and fight a powerful politician.',
        'A brother becomes a gangster to avenge his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Student turned gangster',
        location: 'Vijayawada',
        song: '',
        scene: 'A brother takes over a gang after a murder',
      },
    },
    {
      id: 'hello-brother',
      title: 'Hello Brother',
      aka: [],
      year: 1994,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Ramya Krishnan',
      director: 'E. V. V. Satyanarayana',
      music: 'Raj–Koti',
      villain: '',
      banner: '',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 7, songs: 6, runtime: 160 },   // check

      spoiler: [
        'Twins separated at birth feel each other\'s pain, which causes chaos when one is a thief and the other a singer.',
        'When one twin is hit, the other feels it.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Thief and singer',
        location: 'Hyderabad',
        song: '',
        scene: 'One twin gets hit and the other feels the pain',
      },
    },
    {
      id: 'baasha',
      title: 'Baasha',
      aka: [],
      year: 1995,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Nagma',
      director: 'Suresh Krissna',
      music: 'Deva',
      villain: 'Raghuvaran',
      banner: 'Sathya Movies',
      genre: 'Action drama',
      roles: ['Manikyam', 'Priya', 'Mark Antony'],   // check

      stats: { imdb: 8.3, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A humble auto-rickshaw driver hides a past as the most feared don of Bombay.',
        'A peaceful man takes beatings silently until his family is in danger and his old self returns.',
      ],
      dialogues: ['Nenu okkasari chepthe vanda saarlu cheppinattu.'],

      clues: {   // check
        job: 'Auto-rickshaw driver',
        location: 'Madras and Bombay',
        song: '',
        scene: 'An auto driver gets tied to a pole and beaten without fighting back',
      },
    },
    {
      id: 'gulabi',
      title: 'Gulabi',
      aka: [],
      year: 1995,
      level: 'hard',

      hero: 'J. D. Chakravarthy',
      heroine: 'Maheswari',
      director: 'Krishna Vamsi',
      music: 'Shashi Preetam',
      villain: '',
      banner: '',   // check
      genre: 'Romantic thriller',
      roles: [],

      stats: { imdb: 7.2, songs: 6, runtime: 140 },   // check

      spoiler: [
        'A young man falls for a girl and gets caught up in a human trafficking racket while trying to save her.',
        'A love story turns into a thriller about missing girls.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Hyderabad',
        song: 'Ee Vela Lo Neevu',
        scene: 'A young man chases a van that kidnapped his girlfriend',
      },
    },
    {
      id: 'rangeela',
      title: 'Rangeela',
      aka: [],
      year: 1995,
      level: 'hard',

      hero: 'Aamir Khan',
      heroine: 'Urmila Matondkar',
      director: 'Ram Gopal Varma',
      music: 'A. R. Rahman',
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: ['Munna', 'Mili'],   // check

      stats: { imdb: 7.4, songs: 7, runtime: 142 },   // check

      spoiler: [
        'A girl who dreams of being an actress is torn between a street-smart friend and a film star.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Ticket black-marketeer',
        location: 'Mumbai',
        song: 'Tanha Tanha',
        scene: 'A girl dances on a beach for a film shoot',
      },
    },
    {
      id: 'akkada-ammayi-ikkada-abbayi',
      title: 'Akkada Ammayi Ikkada Abbayi',
      aka: [],
      year: 1996,
      level: 'hard',

      hero: 'Pawan Kalyan',
      heroine: 'Supriya Yarlagadda',
      director: 'E. V. V. Satyanarayana',
      music: 'Koti',
      villain: '',
      banner: 'Annapurna Studios',   // check
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 5.8, songs: 6, runtime: 150 },   // check

      spoiler: [   // check
        'A carefree young man falls for a girl and has to fight her family to marry her.',
        'A young man breaks bricks with his bare hands to prove his love.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: 'The hero breaks a stack of bricks with his bare hand',
      },
    },
    {
      id: 'ninne-pelladata',
      title: 'Ninne Pelladata',
      aka: [],
      year: 1996,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Tabu',
      director: 'Krishna Vamsi',
      music: 'Sandeep Chowta',
      villain: '',
      banner: 'Annapurna Studios',
      genre: 'Romantic family drama',
      roles: ['Seenu', 'Maha Lakshmi'],   // check

      stats: { imdb: 8, songs: 6, runtime: 155 },   // check

      spoiler: [
        'A young man and a girl from two very different families fall in love and bring their families together.',
        'A wedding love story with two big joint families.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pelli-sandadi',
      title: 'Pelli Sandadi',
      aka: [],
      year: 1996,
      level: 'hard',

      hero: 'Srikanth',
      heroine: 'Ravali',
      director: 'K. Raghavendra Rao',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',   // check
      genre: 'Romantic musical',
      roles: [],

      stats: { imdb: 7, songs: 8, runtime: 155 },   // check

      spoiler: [
        'A young man falls for a girl he saw in a picture and searches for her, while another girl loves him.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'anaganaga-oka-roju',
      title: 'Anaganaga Oka Roju',
      aka: [],
      year: 1997,
      level: 'hard',

      hero: 'J. D. Chakravarthy',
      heroine: 'Urmila Matondkar',
      director: 'Ram Gopal Varma',
      music: 'Sri',   // check
      villain: '',
      banner: '',   // check
      genre: 'Thriller',
      roles: [],

      stats: { imdb: 7, songs: 5, runtime: 135 },   // check

      spoiler: [   // check
        'A young couple who eloped accidentally witness a murder and are chased by killers through one long day.',
        'Two runaway lovers stumble into a crime and become targets of a gang and the police at once.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Runaway lover',
        location: 'Hyderabad',
        song: '',
        scene: 'A couple hides in a car boot while killers search the area',
      },
    },
    {
      id: 'annamayya',
      title: 'Annamayya',
      aka: [],
      year: 1997,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Ramya Krishnan',
      director: 'K. Raghavendra Rao',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',   // check
      genre: 'Devotional biographical',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.2, songs: 12, runtime: 165 },   // check

      spoiler: [
        'The life of a 15th-century poet who wrote thousands of songs for Lord Venkateswara.',
        'A young man gives up worldly pleasures for devotion after a vision on the hills of Tirumala.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Poet and composer',
        location: 'Tirumala',
        song: 'Adivo Alladivo',
        scene: 'A young man climbs the seven hills to Tirumala barefoot',
      },
    },
    {
      id: 'gokulamlo-seeta',
      title: 'Gokulamlo Seeta',
      aka: [],
      year: 1997,
      level: 'hard',

      hero: 'Pawan Kalyan',
      heroine: 'Raasi',
      director: 'Muthyala Subbaiah',
      music: 'Koti',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 5.8, songs: 6, runtime: 150 },   // check

      spoiler: [   // check
        'A rich playboy who treats girls as toys changes when he meets a simple, self-respecting girl.',
        'A spoilt rich man finds love with an orphan girl.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Rich playboy',
        location: 'Hyderabad',
        song: '',
        scene: 'A rich young man throws a party to impress girls',
      },
    },
    {
      id: 'master',
      title: 'Master',
      aka: [],
      year: 1997,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Sakshi Shivanand',
      director: 'Suresh Krissna',
      music: 'Deva',
      villain: '',
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.5, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A heavy-drinking professor takes a job at a juvenile school and goes up against a gangster who uses boys as pawns.',
        'A lecturer goes up against student gangs and a politician who uses them.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College lecturer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sindhooram',
      title: 'Sindhooram',
      aka: [],
      year: 1997,
      level: 'hard',

      hero: 'Ravi Teja',   // check
      heroine: 'Sanghavi',   // check
      director: 'Krishna Vamsi',
      music: 'Srinivasa Chakravarthy',   // check
      villain: '',
      banner: '',   // check
      genre: 'Political drama',
      roles: [],

      stats: { imdb: 8.1, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A police constable and a young man who joins the Naxals find themselves on opposite sides.',
        'Friends who join the police and the Naxal movement.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Naxalite',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'choodalani-vundi',
      title: 'Choodalani Vundi',
      aka: [],
      year: 1998,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Soundarya',
      director: 'Gunasekhar',
      music: 'Mani Sharma',
      villain: 'Prakash Raj',   // check
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 7, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A man travels to Kolkata to find his missing wife and son, and takes on a gangster there.',
        'A father searches Calcutta for his child who was taken away.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Railway employee',
        location: 'Kolkata',
        song: '',
        scene: 'A man searches the streets of Kolkata for his son',
      },
    },
    {
      id: 'satya',
      title: 'Satya',
      aka: [],
      year: 1998,
      level: 'hard',

      hero: 'J. D. Chakravarthy',
      heroine: 'Urmila Matondkar',
      director: 'Ram Gopal Varma',
      music: 'Vishal Bhardwaj',
      villain: '',
      banner: '',   // check
      genre: 'Crime drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.3, songs: 6, runtime: 170 },   // check

      spoiler: [
        'A newcomer to Bombay is drawn into the underworld and becomes a feared gangster.',
        'A man with no past rises in the Mumbai mafia with his friend Bhiku.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Gangster',
        location: 'Mumbai',
        song: '',
        scene: '',
      },
    },
    {
      id: 'suswagatham',
      title: 'Suswagatham',
      aka: [],
      year: 1998,
      level: 'hard',

      hero: 'Pawan Kalyan',
      heroine: 'Devayani',
      director: 'Bhimaneni Srinivasa Rao',
      music: 'S. A. Rajkumar',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 6.5, songs: 6, runtime: 150 },   // check

      spoiler: [   // check
        'A young man waits for years for a girl to accept his love.',
        'A hero who keeps waiting for a reply.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'tholi-prema',
      title: 'Tholi Prema',
      aka: [],
      year: 1998,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Keerthi Reddy',
      director: 'A. Karunakaran',
      music: 'Deva',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: ['Balu', 'Anu'],   // check

      stats: { imdb: 8.3, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A carefree young man falls in love at first sight and spends the whole film unable to tell her.',
        'A boy saves a girl\'s life but never says he loves her.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: 'Emi Sodhara',
        scene: 'A carefree young man falls in love at first sight on a Diwali night',
      },
    },
    {
      id: 'narasimha',
      title: 'Narasimha',
      aka: [],
      year: 1999,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Soundarya',
      director: 'K. S. Ravikumar',
      music: 'A. R. Rahman',
      villain: 'Ramya Krishnan',
      banner: '',   // check
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8, songs: 6, runtime: 175 },   // check

      spoiler: [
        'A man rejected by a proud rich woman becomes a success, and she plans revenge for eighteen years.',
        'Neelambari waits years to take revenge on the hero.',
      ],
      dialogues: ['Athiga aashapade magavaadu, athiga aaveshapade aadadi sukhapadinattu charitralo ledu.', 'Naa daari rahadaari.'],

      clues: {   // check
        job: 'Engineer',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'thammudu',
      title: 'Thammudu',
      aka: [],
      year: 1999,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Preeti Jhangiani',
      director: 'P. A. Arun Prasad',
      music: 'Ramana Gogula',
      villain: '',
      banner: '',   // check
      genre: 'Sports drama',
      roles: ['Subhash', 'Janaki'],   // check

      stats: { imdb: 7.6, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A careless younger brother trains as a kickboxer to win the championship his elder brother lost.',
        'A wayward brother finds his purpose in the ring.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },

    ── end of the switched-off movies ── */

    // ── 2000s ─────────────────────────────────────────────

    {
      id: 'annayya',
      title: 'Annayya',
      aka: [],
      year: 2000,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Soundarya',
      director: 'Muthyala Subbaiah',
      music: 'Mani Sharma',
      villain: '',
      banner: '',  
      genre: 'Family action drama',
      roles: [],

      stats: { imdb: 6.6, songs: 6, runtime: 157 },  

      spoiler: [   
        'An elder brother who sacrificed everything for his younger brothers is hurt when they turn against him.',
        'Rajaram loves his brothers and always forgives their offences but an ugly incident forces him to throw them out on the street. He secretly continues to help them but they harbour hatred towards him.',
      ],
      dialogues: ['mechanical engineers, state first rank, character lo gems andi gems'],

      clues: {   // check
        job: 'Lorry Business owner and elder brother',
        location: 'Hyderabad',
        song: 'Aata Kaavala',
        scene: '',
      },
    },
    {
      id: 'badri',
      title: 'Badri',
      aka: [],
      year: 2000,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Amisha Patel',
      director: 'Puri Jagannadh',
      music: 'Ramana Gogula',
      villain: 'Prakash Raj',   
      banner: '',   
      genre: 'Romantic action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.3, songs: 6, runtime: 158 },   

      spoiler: ['A carefree guy with an arranged marriage bets he can make a stranger fall for him, but the game turns real and puts him up against her fiercely protective elder brother.'],
      dialogues: ['Nuvvu Nanda aithe nenu Badri, Badrinath.'],

      clues: {  
        job: '',
        location: '',
        song: 'Bangala Kathamlo',
        scene: '',
      },
    },
    {
      id: 'daddy',
      title: 'Daddy',
      aka: [],
      year: 2001,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Simran',
      director: 'Suresh Krissna',
      music: 'S. A. Rajkumar',
      villain: '',
      banner: '',  
      genre: 'Family drama',
      roles: [],

      stats: { imdb: 6.6, songs: 6, runtime: 156 },  
       
      spoiler: [ 
         'After a tragic loss and misunderstandings drive his wife away, a heartbroken man spots a lookalike of his late daughter years later and tries to build a bond with her.',
        'Betrayed by friends, a wealthy dancer loses his fortune and daughter, separates from his wife, and later reunites his family.',
      ],
      dialogues: [],

      clues: {   
        job: 'Dancer and audio company owner',
        location: '',
        song: 'Gummaadi Gummaadi',
        scene: '',
      },
    },
    {
      id: 'kushi',
      title: 'Kushi',
      aka: [],
      year: 2001,
      level: 'easy',

      hero: 'Pawan Kalyan',
      heroine: 'Bhumika Chawla',
      director: 'S. J. Suryah',
      music: 'Mani Sharma',
      villain: '',
      banner: '',
      genre: 'Romantic comedy',
      roles: ['Siddhu', 'Madhu'],

      stats: { imdb: 8.1, songs: 6, runtime: 177 },  

      spoiler: [
        'College friends grow close while helping their friends unite in love, secretly fall for each other, let stubborn egos divide them',
        'Destined since childhood, Two college students turn rivals after a petty misunderstanding, fall in love while helping friends elope, and must overcome their stubborn egos to unite.',
      ],
      dialogues: ['meeru gudumba sathi garu kavachu thokkalo sathi kavachu, i dont care because im sidhu siddartha roy!',
                 'Jaya aunty mallum tereko, Lallu uncle mallum tereko ye sab mere piche hai'],

      clues: {   
        job: 'College student',
        location: 'Kolkata and Hyderabad',
        song: 'Ammaye Sannaga',
        scene: 'Despite their ongoing cold war Siddhu and Madhumitha agree to help their friends Babu and Shanti secretly get married',
      },
    },
    {
      id: 'murari',
      title: 'Murari',
      aka: [],
      year: 2001,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Sonali Bendre',
      director: 'Krishna Vamsi',
      music: 'Mani Sharma',
      villain: '',
      banner: '',   
      genre: 'Family drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.8, songs: 7, runtime: 170 },   

      spoiler: [
        'A family is cursed by a goddess, and every generation one son dies young, until a young man defies it.',
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: 'Alanati Ramachandrudu',
        scene: 'A family curse takes the life of an heir every 48 years',
      },
    },
   
    {
      id: 'nuvvu-naaku-nachav',
      title: 'Nuvvu Naaku Nachav',
      aka: [],
      year: 2001,
      level: 'medium',

      hero: 'Venkatesh',
      heroine: 'Aarthi Agarwal',
      director: 'K. Vijaya Bhaskar',
      music: 'Koti',
      villain: '',
      banner: '',
      genre: 'Family comedy',
      roles: ['Venky', 'Nandini'],  

      stats: { imdb: 8.8, songs: 6, runtime: 180 },   

      spoiler: [
        'A young man who stays with his father\'s friend\'s family falls for their daughter, who is engaged to someone else.',
      ],
      dialogues: [],

      clues: {  
        job: 'Unemployed young man',
        location: 'Hyderabad and Anakapalli',
        song: 'O priyathama',
        scene: 'Venky is caught eating without saying his prayers and lies to his strict uncle, leading to a moment where the uncle responds by reading a poem dedicated to his late mother.',
      },
    },
    
    {
      id: 'aadi',
      title: 'Aadi',
      aka: [],
      year: 2002,
      level: 'medium',

      hero: 'Jr NTR',
      heroine: 'Keerthi Chawla',   
      director: 'V. V. Vinayak',
      music: 'Mani Sharma',
      villain: '',   
      banner: '',   
      genre: 'Faction action drama',
      roles: [],

      stats: { imdb: 7.3, songs: 6, runtime: 162 },   

      spoiler: [
        '',
        '',
      ],
      dialogues: ['ammathodu addanga narikestha.'],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'chennakesava-reddy',
      title: 'Chennakesava Reddy',
      aka: [],
      year: 2002,
      level: 'medium',

      hero: 'Balakrishna',
      heroine: 'Shriya Saran',
      director: 'V. V. Vinayak',
      music: 'Mani Sharma',
      villain: '',   
      banner: '',   
      genre: 'Faction action drama',
      roles: [],

      stats: { imdb: 6.1, songs: 6, runtime: 145 },   

      spoiler: [
        '',
        '',
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'eeswar',
      title: 'Eeswar',
      aka: [],
      year: 2002,
      level: 'hard',

      hero: 'Prabhas',
      heroine: 'Sridevi Vijaykumar',
      director: 'Jayanth C. Paranjee',
      music: 'R. P. Patnaik',
      villain: '',
      banner: '',   
      genre: 'Action romance',
      roles: [],

      stats: { imdb: 5.4, songs: 6, runtime: 165 },   

      spoiler: [   
        '',
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'idiot',
      title: 'Idiot',
      aka: [],
      year: 2002,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Rakshita',
      director: 'Puri Jagannadh',
      music: 'Chakri',
      villain: 'Prakash Raj',
      banner: '',   
      genre: 'Action romance',
      roles: ['Chanti', 'Suchitra'],   

      stats: { imdb: 7.1, songs: 6, runtime: 133 },   

      spoiler: [
        'A carefree rowdy falls for a police commissioner\'s daughter, and her father will do anything to stop it.',
      ],
      dialogues: ['City ki entho mandi commissioners vasthuntaru pothuntaru... Chanti gaadu eppudu ikkade untadu, local.'],

      clues: {   
        job: '',
        location: '',
        song: 'Chupultho Guchi Guchi',
        scene: 'A student is beaten up by police for loving the commissioner\'s daughter',
      },
    },
    {
      id: 'indra',
      title: 'Indra',
      aka: [],
      year: 2002,
      level: 'easy',

      hero: 'Chiranjeevi',
      heroine: 'Sonali Bendre',
      director: 'B. Gopal',
      music: 'Mani Sharma',
      villain: '',
      banner: '',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.5, songs: 5, runtime: 173 },   

      spoiler: [
        'A reformed man who once ruled rayalaseema hides his violent past while he lives peacefully in kashi.',
        'A taxi driver in Varanasi is really a former Rayalaseema faction leader who left to keep a promise.',
      ],
      dialogues: ['Veera Shankar Reddy... mokke kada ani peekesthe peeka kostha.', 'Tappu naa vaipu undi kabatti tala dinchukuni velthunna, ledante talalu teesukellevaadni.'],   

      clues: {   
        job: '',
        location: 'Varanasi and Rayalaseema',
        song: 'Radhe Govinda',
        scene: 'A taxi driver in Varanasi hides his past as a faction leader',
      },
    },
   
    {
      id: 'manmadhudu',
      title: 'Manmadhudu',
      aka: [],
      year: 2002,
      level: 'easy',

      hero: 'Nagarjuna',
      heroine: 'Sonali Bendre',
      director: 'K. Vijaya Bhaskar',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',
      genre: 'Romantic comedy',
      roles: ['Abhiram', 'Harika'],   

      stats: { imdb: 8.3, songs: 6, runtime: 142 },   

      spoiler: [
        'A woman-hating ad agency boss tries driving away his new female assistant, only for her to slowly win him over completely.',
        'A man who hates women after a heartbreak is forced to work with a female assistant.',
      ],
      dialogues: ['akasam erraga undhi'],

      clues: {   
        job: 'Advertising manager',
        location: 'Hyderabad and Paris',
        song: 'gundello emundho',
        scene: 'An ad agency manager who cannot stand women',
      },
    },
    {
      id: 'nuvve-nuvve',
      title: 'Nuvve Nuvve',
      aka: [],
      year: 2002,
      level: 'hard',

      hero: 'Tarun',
      heroine: 'Shriya Saran',
      director: 'Trivikram Srinivas',
      music: 'Koti',
      villain: '',
      banner: '',   
      genre: 'Romantic comedy',
      roles: ['Rishi', 'Anjali'],  

      stats: { imdb: 7.5, songs: 6, runtime: 160 },   

      spoiler: [
        'A carefree young man falls for a rich girl, and her strict father says no.',
        'A father who loves his daughter too much clashes with her boyfriend.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'amma-nanna-o-tamila-ammayi',
      title: 'Amma Nanna O Tamila Ammayi',
      aka: [],
      year: 2003,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Asin',
      director: 'Puri Jagannadh',
      music: 'Chakri',
      villain: '',
      banner: '',   
      genre: 'Sports drama',
      roles: [],

      stats: { imdb: 7.4, songs: 6, runtime: 122 },   

      spoiler: [
        'A kickboxer who grew up away from his father meets him again and has to win his love and a big fight.',
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'dil',
      title: 'Dil',
      aka: [],
      year: 2003,
      level: 'medium',

      hero: 'Nithiin',
      heroine: 'Neha Bamb',
      director: 'V. V. Vinayak',
      music: 'R. P. Patnaik',
      villain: 'Prakash Raj',
      banner: '',   
      genre: 'Action romance',
      roles: [],

      stats: { imdb: 7.1, songs: 6, runtime: 122 },   

      spoiler: [
        '',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    
    {
      id: 'okkadu',
      title: 'Okkadu',
      aka: [],
      year: 2003,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Bhumika Chawla',
      director: 'Gunasekhar',
      music: 'Mani Sharma',
      villain: 'Prakash Raj',
      banner: '',   
      genre: 'Action romance',
      roles: ['Ajay', 'Swapna', 'Obul Reddy'],   

      stats: { imdb: 8, songs: 6, runtime: 169 },

      spoiler: [
        'A kabaddi player in Hyderabad rescues a girl from a forced marriage to a faction leader, and goes up against him in his own city.',
        'A kabaddi player rescues a girl from a faction leader and hides her in his home who wants to marry her .',
      ],
      dialogues: [],

      clues: {   
        job: 'Kabaddi player',
        location: 'Hyderabad and Kurnool',
        song: 'Cheppave Chirugali',
        scene: 'A kabaddi player rescues a girl from a faction leader in Kurnool',
      },
    },
    {
      id: 'shivamani',
      title: 'Shivamani',
      aka: [],
      year: 2003,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Asin',   
      director: 'Puri Jagannadh',
      music: 'Chakri',
      villain: '',
      banner: '',   
      genre: 'Action romance',
      roles: [],

      stats: { imdb: 6.3, songs: 6, runtime: 143 },   

      spoiler: [
        '',
      ],
      dialogues: ['Naa peru Shivamani, naaku konchem mental...'],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'simhadri',
      title: 'Simhadri',
      aka: [],
      year: 2003,
      level: 'medium',

      hero: 'Jr NTR',
      heroine: 'Bhumika Chawla',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',   
      genre: 'Action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.3, songs: 7, runtime: 169 },

      spoiler: [
        '',
        '',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'tagore',
      title: 'Tagore',
      aka: [],
      year: 2003,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Shriya Saran',
      director: 'V. V. Vinayak',
      music: 'Mani Sharma',
      villain: '',
      banner: '',   
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 7.9, songs: 6, runtime: 176 },  

      spoiler: [
        'A professor teaches by day and fights corruption by night, with a network of students as his eyes and ears.',
        'A professor leads a secret group that kidnaps and punishes corrupt officials.',
      ],
      dialogues: ['Telugu bhashalo naaku nachani oke okka padam kshaminchadam.'],

      clues: {   
        job: 'Professor',
        location: 'Hyderabad',
        song: '',
        scene: 'A professor runs a secret force against corruption',
      },
    },
   
    {
      id: 'arjun',
      title: 'Arjun',
      aka: [],
      year: 2004,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Shriya Saran',
      director: 'Gunasekhar',
      music: 'Mani Sharma',
      villain: 'Prakash Raj',   
      banner: '',   
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.5, songs: 6, runtime: 131 },  

      spoiler: [
        'A brother goes to Madurai to protect his twin sister after she marries into a dangerous family.',
        'A man discovers that his sister\'s in-laws are planning to kill her for her property.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Madhura Madhura',
        scene: '',
      },
    },
    {
      id: 'arya',
      title: 'Arya',
      aka: [],
      year: 2004,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Anuradha Mehta',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',
      genre: 'Romantic drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.8, songs: 6, runtime: 151 },

      spoiler: [
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'gudumba-shankar',
      title: 'Gudumba Shankar',
      aka: [],
      year: 2004,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Meera Jasmine',
      director: 'Veera Shankar',
      music: 'Mani Sharma',
      villain: '',
      banner: '',  
      genre: 'Romantic comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 5.8, songs: 6, runtime: 175 },  

      spoiler: [

      ],
      dialogues: [],

      clues: { 
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'malliswari',
      title: 'Malliswari',
      aka: [],
      year: 2004,
      level: 'medium',

      hero: 'Venkatesh',
      heroine: 'Katrina Kaif',
      director: 'K. Vijaya Bhaskar',
      music: 'Koti',
      villain: '',
      banner: 'Suresh Productions',
      genre: 'Romantic comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.8, songs: 6, runtime: 155 },  

      spoiler: [
        'A desperate bachelor bank clerk falls for a seemingly ordinary maid, unaware she is actually a royal heiress hiding from scheming enemies plotting her murder',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'shankar-dada-m-b-b-s',
      title: 'Shankar Dada M.B.B.S.',
      aka: [],
      year: 2004,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Sonali Bendre',
      director: 'Jayanth C. Paranjee',
      music: 'Devi Sri Prasad',
      villain: 'Paresh Rawal',
      banner: '',   
      genre: 'Comedy drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.6, songs: 7, runtime: 172 },  

      spoiler: [
        'A goon joins medical college to fulfil his father\'s dream and changes the hospital with kindness.',
        'A kind-hearted Hyderabad gangster enrolls in medical school to fulfill his father\'s dream and avenge an insult, using love and laughter to heal patients'
      ],
      dialogues: [],

      clues: {   // check
        job: 'Goon turned medical student',
        location: 'Hyderabad',
        song: 'Chaila Chaila',
        scene: '',
      },
    },
    {
      id: 'sye',
      title: 'Sye',
      aka: [],
      year: 2004,
      level: 'medium',

      hero: 'Nithiin',
      heroine: 'Genelia D\'Souza',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',  
      genre: 'Sports action',
      roles: ['Prithvi', 'Indu', 'Bikshu Yadav'],  

      stats: { imdb: 7.2, songs: 6, runtime: 163 }, 

      spoiler: [
        'Two rival college groups unite to play a rugby match against a gangster\'s team to save their college ground.',
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'varsham',
      title: 'Varsham',
      aka: [],
      year: 2004,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Trisha',
      director: 'Sobhan',
      music: 'Devi Sri Prasad',
      villain: 'Gopichand',
      banner: '',
      genre: 'Romantic action',
      roles: ['Venkat', 'Sailaja', 'Bhadranna'],  

      stats: { imdb: 7.2, songs: 6, runtime: 160 },  

      spoiler: [
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'venky',
      title: 'Venky',
      aka: [],
      year: 2004,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Sneha',
      director: 'Sreenu Vaitla',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 7.5, songs: 6, runtime: 170 },  

      spoiler: [
        'A group of friends on a train journey get caught in a murder conspiracy.',
        'A carefree graduate traveling with friends to police training falls for a passenger, before getting framed for a train murder.',
      ],
      dialogues: [],

      clues: {   
        job: 'Police trainee',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'andarivaadu',
      title: 'Andarivaadu',
      aka: [],
      year: 2005,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Tabu',
      director: 'Sreenu Vaitla',  
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   
      genre: 'Family comedy',
      roles: [],

      stats: { imdb: 5, songs: 6, runtime: 162 },   /

      spoiler: [   
        'A carefree laborer and his disciplined television-host son bond closely until a vengeful woman marries into their family plotting division',
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'athadu',
      title: 'Athadu',
      aka: [],
      year: 2005,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Trisha',
      director: 'Trivikram Srinivas',
      music: 'Mani Sharma',
      villain: 'Sonu Sood',
      banner: '',
      genre: 'Action thriller',
      roles: ['Nandu', 'Poori'],   

      stats: { imdb: 8.3, songs: 6, runtime: 172 },

      spoiler: [
        'A professional assassin on the run poses as a missing man to hide in a village, and slowly becomes part of the family he is pretending to belong to.',
        'A contract killer who is framed for a politician\'s murder hides by posing as a family\'s long-lost son.',
        'Framed for a politician\'s murder during a staged attack, hitman Nandu assumes a dead man\'s identity in a village while evading police and uncovering traitors.',
      ],
      dialogues: ['Gun choodalanuko tappu ledu, kaani bullet choodalanukoku, chachipothav.'],

      clues: {  
        job: 'Contract killer',
        location: 'Basarlapudi',
        song: 'Pillagali Allari',
        scene: 'A hitman hides in a village by pretending to be someone else',
      },
    },
    
    {
      id: 'balu',
      title: 'Balu',
      aka: [],
      year: 2005,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Shriya Saran',
      director: 'A. Karunakaran',
      music: 'Mani Sharma',
      villain: '',   
      banner: '',
      genre: 'Action romance',
      roles: ['Ghani', 'Indu'],

      stats: { imdb: 6, songs: 6, runtime: 151 },   

      spoiler: [
      ],
      dialogues: [],

      clues: { 
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'bhadra',
      title: 'Bhadra',
      aka: [],
      year: 2005,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Meera Jasmine',
      director: 'Boyapati Srinu',
      music: 'Devi Sri Prasad',
      villain: '',  
      banner: '',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.9, songs: 7, runtime: 150 },   

      spoiler: [
        
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'bunny',
      title: 'Bunny',
      aka: [],
      year: 2005,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Gowri Munjal',
      director: 'V. V. Vinayak',
      music: 'Devi Sri Prasad',
      villain: '',   
      banner: '',   
      genre: 'Action drama',
      roles: [],   

      stats: { imdb: 6.6, songs: 6, runtime: 165 },   

      spoiler: [
        'A student in Visakhapatnam takes on a corrupt politician to protect a family he has come to love, hiding his own past in the process.',
        'A student marries a rich businessman\'s daughter as part of a plan to recover what her father took from his family.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'chatrapathi',
      title: 'Chatrapathi',
      aka: [],
      year: 2005,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Shriya Saran',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Pradeep Rawat',
      banner: '',  
      genre: 'Action drama',
      roles: ['Sivaji', 'Neelu', 'Bajirao'],   

      stats: { imdb: 7.7, songs: 6, runtime: 165 },  

      spoiler: [
        'A refugee boy from Sri Lanka grows up in a harbour town and rises to take on those who treated his people as slaves.',
        'A Sri Lankan refugee boy separated from his mother grows into a leader of the refugees in Vizag.',
      ],
      dialogues: ['Oka adugu... oke okka adugu.'],

      clues: {  
        job: '',
        location: '',
        song: 'A Vachi B Pai Vaali',
        scene: '',
      },
    },
    {
      id: 'ghajini',
      title: 'Ghajini',
      aka: [],
      year: 2005,
      level: 'easy',

      hero: 'Suriya',
      heroine: 'Asin',
      director: 'A. R. Murugadoss',
      music: 'Harris Jayaraj',
      villain: '',
      banner: '',   
      genre: 'Psychological action thriller',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.6, songs: 5, runtime: 175 },   

      spoiler: [
        'A businessman with short-term memory loss tattoos clues all over his body to hunt down the man who killed his beloved.',
        'A man who forgets everything every fifteen minutes uses tattoos and photos to hunt his girlfriend\'s killer.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Hrudayam Ekkadunnadi',
        scene: '',
      },
    },
    {
      id: 'jai-chiranjeeva',
      title: 'Jai Chiranjeeva',
      aka: [],
      year: 2005,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Sameera Reddy',
      director: 'K. Vijaya Bhaskar',
      music: 'Mani Sharma',
      villain: '',  
      banner: '',   
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.1, songs: 6, runtime: 165 },   

      spoiler: [   
        'A man goes to America to find the killers of his young niece.',
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'nuvvostanante-nenoddantana',
      title: 'Nuvvostanante Nenoddantana',
      aka: [],
      year: 2005,
      level: 'medium',

      hero: 'Siddharth',
      heroine: 'Trisha',
      director: 'Prabhu Deva',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   
      genre: 'Romantic drama',
      roles: ['Santosh', 'Siri'], 

      stats: { imdb: 7.9, songs: 7, runtime: 165 },   

      spoiler: [
        'A rich NRI boy works as a farmhand for a year to prove to a girl\'s brother that he deserves her.',
       
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'annavaram',
      title: 'Annavaram',
      aka: [],
      year: 2006,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Asin',
      director: 'Bhimaneni Srinivasa Rao',
      music: 'Ramana Gogula',
      villain: '',   
      banner: '',  
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5, songs: 5, runtime: 174 },  

      spoiler: [
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'bommarillu',
      title: 'Bommarillu',
      aka: [],
      year: 2006,
      level: 'easy',

      hero: 'Siddharth',
      heroine: 'Genelia D\'Souza',
      director: 'Bhaskar',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',
      genre: 'Family romance',
      roles: ['Siddhu', 'Hasini'],  

      stats: { imdb: 8.2, songs: 6, runtime: 170 },

      spoiler: [
        'A young man raised under his controlling father\'s influence falls for a cheerful girl, forcing him to challenge family expectations and discover independence.',
        'A son whose father decides everything for him brings home his free-spirited girlfriend for a week.',
      ],
      dialogues: ['Anthena? Inkem kavali? Veelaithe naalugu maatalu, kudirithe cup coffee!'],

      clues: {   
        job: '',
        location: '',
        song: 'Appudo Ippudo',
        scene: 'A father makes every decision for his grown-up son',
      },
    },
    {
      id: 'happy',
      title: 'Happy',
      aka: [],
      year: 2006,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Genelia D\'Souza',
      director: 'A. Karunakaran',
      music: 'Yuvan Shankar Raja',
      villain: 'Manoj Bajpayee',
      banner: '',
      genre: 'Romantic comedy',
      roles: ['Bunny', 'Madhumathi'],   

      stats: { imdb: 7.2, songs: 6, runtime: 152 }, 

      spoiler: [
        'A carefree pizza delivery boy unexpectedly marries a politician\'s daughter, leading to an unusual relationship',
        'A carefree young man helps a girl escape a forced marriage to a cop, by pretending to be her husband.',
      ],
      dialogues: [],

      clues: {   
        job: 'Pizza delivery boy',
        location: '',
        song: '',
        scene: 'A Pizza delivery boy pretends to be married to a girl he barely knows',
      },
    },
    {
      id: 'lakshmi',
      title: 'Lakshmi',
      aka: [],
      year: 2006,
      level: 'hard',

      hero: 'Venkatesh',
      heroine: 'Nayanthara',
      director: 'V. V. Vinayak',
      music: 'Ramana Gogula',
      villain: '',   
      banner: '',  
      genre: 'Family action drama',
      roles: [],

      stats: { imdb: 5.9, songs: 5, runtime: 155 },  

      spoiler: [
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pokiri',
      title: 'Pokiri',
      aka: [],
      year: 2006,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Ileana D\'Cruz',
      director: 'Puri Jagannadh',
      music: 'Mani Sharma',
      villain: 'Prakash Raj',
      banner: '',   
      genre: 'Action thriller',
      roles: ['Pandu', 'Shruti', 'Ali Bhai'],   

      stats: { imdb: 8, songs: 6, runtime: 164 },

      spoiler: [
        'A street thug who beats people up for a price turns out to be an undercover police officer hunting a powerful underworld don.',
      ],
      dialogues: ['Okka saari commit ayithe naa maata nene vinanu.', 'Evadu kodithe dimma thirigi mind block ayipothado aade Pandugaadu.', 'Builder handover chesesada, padmavathi happy ey na'],

      clues: {  
        job: '',
        location: '',
        song: 'Jagadame',
        scene: 'An undercover cop poses as a gangster',
      },
    },
    {
      id: 'rakhi',
      title: 'Rakhi',
      aka: [],
      year: 2006,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Ileana D\'Cruz',
      director: 'Krishna Vamsi',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',  
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.4, songs: 6, runtime: 173 },  

      spoiler: [
        'After his sister\'s dowry death, a young man becomes a vigilante fighting violence and injustice against women.',
        'A young man becomes a vigilante against men who harm women.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sainikudu',
      title: 'Sainikudu',
      aka: [],
      year: 2006,
      level: 'hard',

      hero: 'Mahesh Babu',
      heroine: 'Trisha',
      director: 'Gunasekhar',
      music: 'Harris Jayaraj',
      villain: '',
      banner: '',  
      genre: 'Political action',
      roles: [],

      stats: { imdb: 5.1, songs: 6, runtime: 169 },   

      spoiler: [
        
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sri-ramadasu',
      title: 'Sri Ramadasu',
      aka: [],
      year: 2006,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Sneha',
      director: 'K. Raghavendra Rao',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',  
      genre: 'Devotional biographical',
      roles: [],

      stats: { imdb: 7.2, songs: 18, runtime: 156 },   
      spoiler: [
        'A devoted man builds Lord Rama\'s temple, faces imprisonment and finds divine grace through unwavering faith.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'stalin',
      title: 'Stalin',
      aka: [],
      year: 2006,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Trisha',
      director: 'A. R. Murugadoss',
      music: 'Mani Sharma',
      villain: '',
      banner: '',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.1, songs: 6, runtime: 168 },  

      spoiler: [
        'A man helps others without expecting anything and asks them to pass on the favour to three more people.',
        'A former army man asks every person he helps to help three others, while fighting a corrupt minister.',
      ],
      dialogues: ['Okkariki sahayam cheyandi... aa okkarini maro mugguriki sahayam cheyamani cheppandi', 'Gunde meedha cheyi vesav... theliyaledha akkada unna naa power?', 'Nuvvu oka amma ki abba ki putti unte, mundhu naa meedha cheyi vesi aa tarvatha maa vaalla joliki vellu..'],

      clues: {   
        job: 'Ex-army officer',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'vikramarkudu',
      title: 'Vikramarkudu',
      aka: [],
      year: 2006,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Anushka Shetty',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',  
      genre: 'Action',
      roles: [],  

      stats: { imdb: 7.7, songs: 6, runtime: 161 },  

      spoiler: [
        'A small-time thief takes the place of his lookalike, a fearless cop, and takes care of the cop\'s daughter.',
      ],
      dialogues: ['Chaavu naa edhuruga unnapudu naa kallallo beruku undakudadhu, naa moothi meedha chirunavvu undali, naa cheyyi naa meesam meedha undali sir!'],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: 'A thief looks exactly like a fearless police officer',
      },
    },
    {
      id: 'athidhi',
      title: 'Athidhi',
      aka: [],
      year: 2007,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Amrita Rao',
      director: 'Surender Reddy',
      music: 'Mani Sharma',
      villain: '',
      banner: '', 
      genre: 'Action thriller',
      roles: [],

      stats: { imdb: 5.6, songs: 6, runtime: 172 }, 

      spoiler: [
       
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: 'Khiladi Koona',
        scene: '',
      },
    },

    {
      id: 'chirutha',
      title: 'Chirutha',
      aka: [],
      year: 2007,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Neha Sharma',
      director: 'Puri Jagannadh',
      music: 'Mani Sharma',
      villain: '',  
      banner: '',
      genre: 'Action romance',
      roles: [],   
      stats: { imdb: 5.4, songs: 5, runtime: 151 },   
       
      spoiler: [
        
      ],
      dialogues: ['ee aadavi naade, veta naade'],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'desamuduru',
      title: 'Desamuduru',
      aka: [],
      year: 2007,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Hansika Motwani',
      director: 'Puri Jagannadh',
      music: 'Chakri',
      villain: '',   
      banner: '',
      genre: 'Action romance',
      roles: ['Bala Govind', 'Vaishali'],  

      stats: { imdb: 6.2, songs: 6, runtime: 148 },   

      spoiler: [
        'a TV reporter who is sent to Kullu Manali after clashing with a gangster\'s son, where he falls for a sanyasini named Vaishali and fights to save her from a ruthless villain',
        'A TV journalist falls in love with a young sanyasini at a Himalayan ashram.',
      ],
      dialogues: ['You know Guntur bolke ek sheher hai? Nenu ikkada kottaananuko, resound udhar aatha!'],

      clues: {  
        job: 'TV journalist',
        location: 'Kullu Manali',
        song: 'Ninne Ninne',
        scene: 'A TV reporter falls for a sanyasin in Manali',
      },
    },
    {
      id: 'dhee',
      title: 'Dhee',
      aka: [],
      year: 2007,
      level: 'medium',

      hero: 'Manchu Vishnu',
      heroine: 'Genelia D\'Souza',
      director: 'Sreenu Vaitla',
      music: 'Chakri',
      villain: '',
      banner: '',
      genre: 'Action comedy',
      roles: ['Bablu', 'Pooja', 'Shankar Goud'],   

      stats: { imdb: 7.3, songs: 6, runtime: 143 },   

      spoiler: [
        'A carefree youngster joins a gangster\'s organisation, falls for his sister and uses clever tricks to win approval.',
        'A carefree young man falls for the sister of a don who is very strict about her safety.',
      ],
      dialogues: ['Shankar Goud ni premisthe thappu kaani, vaadi chellilni premisthe thappenti?'],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'dubai-seenu',
      title: 'Dubai Seenu',
      aka: [],
      year: 2007,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Nayanthara',
      director: 'Sreenu Vaitla',
      music: 'Mani Sharma',
      villain: '',
      banner: '',   
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.6, songs: 6, runtime: 157 },  

      spoiler: [
        'A man cheated by an agent who promised him a job in Dubai ends up in Mumbai, where he falls in love.',
        'A jobless man dreams of Dubai and gets stuck in Mumbai with his friends instead.',
      ],
      dialogues: ['Appadam... appadam ayipodhi! '],

      clues: {   
        job: '',
        location: 'Mumbai',
        song: '',
        scene: 'Friends are cheated by a fake Dubai agent',
      },
    },
    {
      id: 'happy-days',
      title: 'Happy Days',
      aka: [],
      year: 2007,
      level: 'easy',

      hero: 'Varun Sandesh',
      heroine: 'Tamannaah',
      director: 'Sekhar Kammula',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: '',
      genre: 'Coming-of-age drama',
      roles: ['Chandu', 'Madhu' ],   

      stats: { imdb: 7.9, songs: 7, runtime: 153 },   

      spoiler: [
        'A group of engineering college friends enjoy their college, falling in love, fighting and growing up together.',
        'Eight engineering students share four years of college, ragging, friendship and love.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Oh My Friend',
        scene: 'Four years in the life of eight engineering students',
      },
    },
    {
      id: 'jagadam',
      title: 'Jagadam',
      aka: [],
      year: 2007,
      level: 'hard',

      hero: 'Ram Pothineni',
      heroine: 'Isha Sahni',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: '',  
      banner: '',   
      genre: 'Crime drama',
      roles: [],

      stats: { imdb: 6.8, songs: 4, runtime: 163 },  

      spoiler: [
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'munna',
      title: 'Munna',
      aka: [],
      year: 2007,
      level: 'hard',

      hero: 'Prabhas',
      heroine: 'Ileana D\'Cruz',
      director: 'Vamshi Paidipally',
      music: 'Harris Jayaraj',
      villain: 'Prakash Raj',
      banner: '',   
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5.6, songs: 6, runtime: 167 },   

      spoiler: [
        'A college student takes on a powerful gangster, only to discover the shocking truth that he is his father.',
        'A son hunts the man responsible for his mother\'s death.',
      ],
      dialogues: ['eroju nunchi veedu naa koduku ani nuvvu anukonela nenu ey pani cheyanu naa kodaka! anukunela chestha!'],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'shankar-dada-zindabad',
      title: 'Shankar Dada Zindabad',
      aka: [],
      year: 2007,
      level: 'hard',

      hero: 'Chiranjeevi',
      heroine: 'Karishma Kotak', 
      director: 'Prabhu Deva',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   
      genre: 'Comedy drama',
      roles: [],

      stats: { imdb: 5.3, songs: 6, runtime: 152 },  

      spoiler: [
        'A goon starts seeing Mahatma Gandhi and learns to solve problems through non-violence.',
        'A lovable gangster embraces Gandhian principles, using nonviolence to fight injustice.',
      ],
      dialogues: ['ayana Gandhigiri ki thala vonchi mounam ga unnaru, adhe Dadagiri cheste meelo okadu kuda migalaru'],

      clues: {   
        job: '',
        location: '',
        song: 'Good Morning Hyderabad',
        scene: '',
      },
    },
    {
      id: 'shivaji',
      title: 'Shivaji',
      aka: [],
      year: 2007,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Shriya Saran',
      director: 'Shankar',
      music: 'A. R. Rahman',
      villain: 'Suman',
      banner: '',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.6, songs: 7, runtime: 188 },   

      spoiler: [
        'A software engineer returns from America to build free hospitals and schools, and corrupt officials try to ruin him.',
        'A rich NRI fights black money in the system.',
      ],
      dialogues: ['Nanna, pandulu gumpuga vasthayi... simham single ga vasthundi.'],

      clues: {   
        job: '',
        location: '',
        song: 'Vaaji Vaaji',
        scene: '',
      },
    },
    {
      id: 'tulasi',
      title: 'Tulasi',
      aka: [],
      year: 2007,
      level: 'hard',

      hero: 'Venkatesh',
      heroine: 'Nayanthara',
      director: 'Boyapati Srinu',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 0, songs: 0, runtime: 0 },  

      spoiler: [
       
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'yamadonga',
      title: 'Yamadonga',
      aka: [],
      year: 2007,
      level: 'easy',

      hero: 'Jr NTR',
      heroine: 'Priyamani',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: '',
      banner: '',   
      genre: 'Fantasy action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.2, songs: 7, runtime: 185 },   

      spoiler: [
        'A thief sent to the afterlife by mistake finds a loophole in the rules and tricks the god of death himself.',
        'A thief dies and goes to hell, where he steals the god of death\'s powers.',
      ],
      dialogues: ['Pulini dooram nunchi choodalanipinchindanuko choosko. Pulitho photo digalanipinchindanuko koncham risk ayina parvaledhu try cheyyochu. Sare chanuvu ichindi kadha ani pulitho aadukunte mathram.. vetadestadi!'],

      clues: {   
        job: '',
        location: '',
        song: 'Naachore',
        scene: 'A thief lands in the god of death\'s kingdom and steals his noose',
      },
    },
    {
      id: 'yogi',
      title: 'Yogi',
      aka: [],
      year: 2007,
      level: 'hard',

      hero: 'Prabhas',
      heroine: 'Nayanthara',
      director: 'V. V. Vinayak',
      music: 'Ramana Gogula',
      villain: '',
      banner: '',   
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 4.7, songs: 6, runtime: 155 },   

      spoiler: [
       
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ashta-chamma',
      title: 'Ashta Chamma',
      aka: [],
      year: 2008,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Colors Swathi',
      director: 'Mohan Krishna Indraganti',
      music: 'Kalyani Malik',
      villain: '',
      banner: '',   
      genre: 'Romantic comedy',
      roles: ['Rambabu', 'Lavanya'],

      stats: { imdb: 7.4, songs: 4, runtime: 126 },   

      spoiler: [
        'A girl obsessed with the name Mahesh wants to marry only a man called Mahesh, and a man pretends to be Mahesh.',
        'A Mahesh Babu fan insists on marrying someone named Mahesh, triggering romantic misunderstandings and unexpected revelations.',
      ],
      dialogues: ['Mahesh... aa perulo matthu undi, style undi, vibrations unnay!'],

      clues: {   
        job: '',
        location: '',
        song: 'Aadinchi Ashta Chamma',
        scene: '',
      },
    },
    {
      id: 'bujjigadu',
      title: 'Bujjigadu',
      aka: [],
      year: 2008,
      level: 'medium',

      hero: 'Prabhas',
      heroine: 'Trisha',
      director: 'Puri Jagannadh',
      music: 'Sandeep Chowta',
      villain: '',   
      banner: '',   
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.3, songs: 6, runtime: 150 },  

      spoiler: [
        'A youngster returns after twelve years, searching for his childhood sweetheart amid gang rivalries and mistaken identities.',
         
      ],
      dialogues: ['Tipper lorry velli scooter ni guddesthe ela untadho thelusa? Ala untadhi nenu guddithe!','Akkada oka Rajinikanth unnadu ikkada oka Rajinikanth unnadu Bus lo iddaru Rajinikanth-lu undaga bus ela ekkarra?!'],

      clues: {   
        job: '',
        location: '',
        song: 'Chitti Aayire',
        scene: '',
      },
    },
    {
      id: 'gamyam',
      title: 'Gamyam',
      aka: [],
      year: 2008,
      level: 'hard',

      hero: ['Sharwanand', 'Allari Naresh'],
      heroine: 'Kamalinee Mukherjee',
      director: 'Krish Jagarlamudi',
      music: 'E. S. Murthy',  
      villain: '',
      banner: '',   
      genre: 'Road drama',
      roles: ['Abhiram', 'Janaki', 'Gaali Seenu'],   

      stats: { imdb: 8.3, songs: 5, runtime: 128 },   

      spoiler: [
        'A wealthy young man searches for his love alongside a thief, discovering humanity, friendship and life\'s true meaning.',
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: 'A rich man and a small thief ride a motorbike across villages',
      },
    },
    {
      id: 'jalsa',
      title: 'Jalsa',
      aka: [],
      year: 2008,
      level: 'easy',

      hero: 'Pawan Kalyan',
      heroine: 'Ileana D\'Cruz',
      director: 'Trivikram Srinivas',
      music: 'Devi Sri Prasad',
      villain: 'Mukesh Rishi',
      banner: 'Geetha Arts',
      genre: 'Action comedy',
      roles: ['Sanjay Sahu', 'Bhagyamathi'],   

      stats: { imdb: 7.5, songs: 6, runtime: 163 },   

      spoiler: [
        'A former Naxalite settles into city life and gets entangled with the daughter of the cop who once hunted him.',
      ],
      dialogues: ['Yuddhamlo gelavadam ante shatruvuni odinchadam, champadam kaadu.', 'kkada kashtam gurinchi maatlaade hakku naaku maathrame undi, neeku ledhu!', 'Andhamga undatam ante manaki nachela undatam... edhutavaallaki nachinattu kaadhu!'],

      clues: {   
        job: '',
        location: '',
        song: 'Gaallo Thelinattunde',
        scene: 'A college student hides his past as a Naxalite',
      },
    },
    {
      id: 'kantri',
      title: 'Kantri',
      aka: [],
      year: 2008,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Hansika Motwani',
      director: 'Meher Ramesh',
      music: 'Mani Sharma',
      villain: '',
      banner: 'Vyjayanthi Movies',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 4.7, songs: 6, runtime: 159 },   

      spoiler: [
              ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'king',
      title: 'King',
      aka: [],
      year: 2008,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Trisha',
      director: 'Sreenu Vaitla',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.6, songs: 7, runtime: 174 },   

      spoiler: [
        'A gangster impersonates his murdered royal lookalike to protect his family and avenge his death.',
      ],
      dialogues: ['Memu ekkadiko teskelali anukuntam meeru ikkade untaru akkadiki raaru'],

      clues: {   
        job: '',
        location: '',
        song: 'Chupu Chaalu O Manmadhudaa',
        scene: '',
      },
    },
   {
      id: 'krishna',
      title: 'Krishna',
      aka: [],
      year: 2008,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Trisha',
      director: 'V. V. Vinayak',
      music: 'Chakri',
      villain: '',   
      banner: '', 
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.3, songs: 6, runtime: 147 },   

      spoiler: [
        'In Vijayawada, carefree Krishna falls deeply for Sandhya, only to protect her family from a ruthless, obsessive gangster Jakka.',
        'A kind-hearted unemployed youngster falls for a gangster\'s sister, confronting dangerous rivals while fighting to win her love',
      ],
      dialogues: ['Rey rowdyism puttindhe aa Bezawada ki, aa Bezawada ke rowdyism nerpadaaniki vachava nuvvu!'],

      clues: {   
        job: '',
        location: 'Vijayawada',
        song: 'Dil Mangey More',
        scene: '',
      },
    },
    {
      id: 'neninthe',
      title: 'Neninthe',
      aka: [],
      year: 2008,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Siya Gautham',  
      director: 'Puri Jagannadh',
      music: 'Chakri',
      villain: '',
      banner: '',  
      genre: 'Drama',
      roles: [],

      stats: { imdb: 7, songs: 7, runtime: 156 },   

      spoiler: [
        'An assistant director tries to make his first film and faces the dark side of the industry.',
        'An ambitious assistant director struggles against industry politics, personal hardships while pursuing his filmmaking dream.'
      ],
      dialogues: ['Nenu entha yedhavano naake telidu... maaku telusu le raa', ],

      clues: {  
        job: 'Assistant director',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'parugu',
      title: 'Parugu',
      aka: [],
      year: 2008,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Sheela',
      director: 'Bhaskar',
      music: 'Mani Sharma',
      villain: '',
      banner: '',   
      genre: 'Romantic drama',
      roles: ['Krishna', 'Meena'],   

      stats: { imdb: 7.1, songs: 6, runtime: 165 },   

      spoiler: [
        'A young man falls for a village headman\'s daughter while helping locate her missing sister after elopement.',
        'A young man is blamed when his friend elopes with a powerful man\'s daughter, and has to help find them.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Nammavemo Gaani',
        scene: '',
      },
    },
    {
      id: 'ready',
      title: 'Ready',
      aka: [],
      year: 2008,
      level: 'medium',

      hero: 'Ram Pothineni',
      heroine: 'Genelia D\'Souza',
      director: 'Sreenu Vaitla',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   
      genre: 'Action comedy',
      roles: ['Chandu', 'Pooja'], 

      stats: { imdb: 7.2, songs: 6, runtime: 165 },   

      spoiler: [
        'A young man rescues the wrong bride from a wedding and has to win over her two violent uncles.',
      ],
      dialogues: ['Nenu apara Brahmmi ni antaava? Innaallu naa shakthi naaku theliyaka, ee jaffa gaalla daggara anavasaramga pani chesaanantaava?!'],

      clues: {   
        job: '',
        location: '',
        song: 'Om Namaste Bolo',
        scene: '',
      },
    },
    {
      id: 'arya-2',
      title: 'Arya 2',
      aka: [],
      year: 2009,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Kajal Aggarwal',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: '',  
      banner: '',
      genre: 'Romantic action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.5, songs: 6, runtime: 155 },   

      spoiler: [
        'An obsessive young man struggles to protect his best friend while both fall in love with one woman.',
        'An orphan who loves his best friend too much falls for the same girl as him.',
      ],
      dialogues: ['Edam chethi tho utharam raasinandhuku sorry... kudi chethi tho raase adrustham eppudisthav?!'],

      clues: {   
        job: '',
        location: '',
        song: 'Ringa Ringa',
        scene: '',
      },
    },
    {
      id: 'billa',
      title: 'Billa',
      aka: [],
      year: 2009,
      level: 'medium',

      hero: 'Prabhas',
      heroine: 'Anushka Shetty',
      director: 'Meher Ramesh',
      music: 'Mani Sharma',
      villain: '',
      banner: '',
      genre: 'Action thriller',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.2, songs: 6, runtime: 149 },   

      spoiler: [
        'A stylish international don has a lookalike, and a policeman needs a petty thief to take his place and bring him down.',
        'A small-time thief who looks like a don is sent into the gang to bring it down.',
      ],
      dialogues: ['Trust no one, kill anyone, be only one!'],

      clues: {   
        job: '',
        location: 'Malaysia',
        song: 'Bommali',
        scene: 'A thief practises walking and talking like a don',
      },
    },
    {
      id: 'ek-niranjan',
      title: 'Ek Niranjan',
      aka: [],
      year: 2009,
      level: 'hard',

      hero: 'Prabhas',
      heroine: 'Kangana Ranaut',
      director: 'Puri Jagannadh',
      music: 'Mani Sharma',
      villain: '',   
      banner: '',   
      genre: 'Action romance',
      roles: [],

      stats: { imdb: 5.4, songs: 6, runtime: 143 },  

      spoiler: [
        'An orphan bounty hunter who catches criminals for money searches for his lost parents.',
        'A man nicknamed Chotu helps the police catch criminals while looking for his family.',
      ],
      dialogues: [],

      clues: {  
        job: 'Bounty hunter',
        location: '',
        song: '',
        scene: 'A man catches criminals for a police reward',
      },
    },
    {
      id: 'kick',
      title: 'Kick',
      aka: [],
      year: 2009,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Ileana D\'Cruz',
      director: 'Surender Reddy',
      music: 'S. Thaman',
      villain: '',   
      banner: '',   
      genre: 'Action comedy',
      roles: ['Kalyan', 'Naina', 'Kalyan Krishna'],   

      stats: { imdb: 7.9, songs: 6, runtime: 160 },  

      spoiler: [
        'A man who does everything for a thrill is secretly a thief who steals to fund surgeries for poor children.', 
        'A thrill seeking youngster becomes a mysterious thief, while a determined police officer pursues him across countries.',

      ],
      dialogues: ['I\'m Raj Prakash Raj! Hi... I\'m Jigiri Jinganiya!'],

      clues: {   
        job: '',
        location: 'Hyderabad and Malaysia',
        song: 'Bossuu Manaki Memory Lossuu',
        scene: 'A man does everything only for the thrill of it',
      },
    },
    {
      id: 'magadheera',
      title: 'Magadheera',
      aka: [],
      year: 2009,
      level: 'easy',

      hero: 'Ram Charan',
      heroine: 'Kajal Aggarwal',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Dev Gill',
      banner: 'Geetha Arts',
      genre: 'Fantasy action romance',
      roles: ['Harsha', 'Indu'],   

      stats: { imdb: 7.7, songs: 6, runtime: 158 },

      spoiler: [
        'A young man and a woman feel a bond they cannot explain. Four hundred years earlier, a fearless warrior and a princess were kept apart by a jealous commander.',
        'A bike racer meets a girl whose touch reminds him of a warrior\'s life 400 years ago.',
      ],
      dialogues: ['Okkokkadini kaadu Sher Khan... okesaari vanda mandini pampinchu.'],

      clues: {  
        job: '',
        location: '',
        song: 'Dheera Dheera',
        scene: 'One warrior fights off a hundred soldiers',
      },
    },
    {
      id: 'oy',
      title: 'Oy',
      aka: [],
      year: 2009,
      level: 'hard',

      hero: 'Siddharth',
      heroine: 'Shamili',
      director: 'Anand Ranga',
      music: 'Yuvan Shankar Raja',
      villain: '',
      banner: '',   
      genre: 'Romantic drama',
      roles: ['Uday', 'Sandhya'],

      stats: { imdb: 7.2, songs: 6, runtime: 164 },  

      spoiler: [
        'A carefree millionaire falls deeply in love with a disciplined girl, discovering her terminal illness and fulfilling wishes.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Sehri Sehari',
        scene: '',
      },
    },

    // ── 2010s ─────────────────────────────────────────────

    {
      id: 'adhurs',
      title: 'Adhurs',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Jr NTR',
      heroine: 'Nayanthara',
      director: 'V. V. Vinayak',
      music: 'Devi Sri Prasad',
      villain: 'Mahesh Manjrekar',
      banner: 'Sri Venkateswara Creations',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.5, songs: 6, runtime: 155 },   // check

      spoiler: [
        'Twin brothers, one a timid priest and the other a loud, brave guy, swap roles to protect a family from a mad don.',
        'Twins separated at birth, one a shy priest and one a fearless rogue, team up against a gangster.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Temple priest',
        location: 'Hyderabad',
        song: 'Chandrakala',
        scene: 'Twins separated at birth, one of them a priest\'s assistant',
      },
    },
    {
      id: 'brindavanam',
      title: 'Brindavanam',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Jr NTR',
      heroine: 'Samantha',
      director: 'Vamshi Paidipally',
      music: 'S. Thaman',
      villain: 'Prakash Raj',
      banner: 'Sri Venkateswara Creations',
      genre: 'Family action comedy',
      roles: ['Krish', 'Indu', 'Bhoomi'],   // check

      stats: { imdb: 6.3, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A young man pretends to be a girl\'s boyfriend to help her, and ends up fixing a family feud in her village.',
        'A city boy goes to a village as a fake lover and has to keep two families from fighting.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Rich young man',
        location: 'A village',
        song: '',
        scene: 'A man poses as a girl\'s boyfriend and ends up uniting two feuding families',
      },
    },
    {
      id: 'darling',
      title: 'Darling',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Prabhas',
      heroine: 'Kajal Aggarwal',
      director: 'A. Karunakaran',
      music: 'G. V. Prakash Kumar',
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 7, songs: 6, runtime: 155 },   // check

      spoiler: [
        'A young man who is shy in love gets a girl\'s attention through a series of misunderstandings and then loses her again.',
        'A man tells his father\'s friends a story about his first love at a family reunion.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Hyderabad and Switzerland',
        song: 'Inka Edo',
        scene: 'A man invents a love story set in Switzerland to escape a gangster\'s daughter',
      },
    },
    {
      id: 'don-seenu',
      title: 'Don Seenu',
      aka: [],
      year: 2010,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Shriya Saran',
      director: 'Gopichand Malineni',
      music: 'Mani Sharma',
      villain: 'Srihari',
      banner: '',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.8, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A young man who dreams of being a don joins a gang and falls for a rival don\'s sister.',
        'A wannabe don works for two gangsters at once.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Wannabe don',
        location: 'Hyderabad',
        song: '',
        scene: 'A young man auditions to join a gang',
      },
    },
    {
      id: 'khaleja',
      title: 'Khaleja',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Anushka Shetty',
      director: 'Trivikram Srinivas',
      music: 'Mani Sharma',
      villain: 'Prakash Raj',
      banner: '',   // check
      genre: 'Action comedy',
      roles: ['Alluri Seetarama Raju', 'Subhashini'],   // check

      stats: { imdb: 7.6, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A taxi driver with a strange knack for being in the right place at the right time ends up as the saviour of a village.',
        'A taxi driver is mistaken for a god by a dying village, and finds out they may be right.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Taxi driver',
        location: 'Rajasthan desert',
        song: 'Sada Siva',
        scene: 'A taxi driver is believed to be a god by a dying village',
      },
    },
    {
      id: 'leader',
      title: 'Leader',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Rana Daggubati',
      heroine: 'Richa Gangopadhyay',
      director: 'Sekhar Kammula',
      music: 'Mickey J. Meyer',
      villain: 'Kota Srinivasa Rao',
      banner: '',   // check
      genre: 'Political drama',
      roles: [],

      stats: { imdb: 7.8, songs: 5, runtime: 165 },   // check

      spoiler: [
        'The young son of a murdered chief minister takes over the post and decides to clean up politics.',
        'An NRI becomes CM and finds corruption everywhere, including his own family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Chief minister',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'maryada-ramanna',
      title: 'Maryada Ramanna',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Sunil',
      heroine: 'Saloni Aswani',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Nagineedu',
      banner: 'Arka Media Works',
      genre: 'Action comedy',
      roles: ['Ramu', 'Aparna'],   // check

      stats: { imdb: 7.5, songs: 5, runtime: 125 },   // check

      spoiler: [
        'A man is safe from a family that wants to kill him as long as he stays inside their house, because they never harm a guest.',
        'A young man refuses to leave a house full of men who want him dead.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Rayalaseema',
        song: '',
        scene: '',
      },
    },
    {
      id: 'orange',
      title: 'Orange',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Genelia D\'Souza',
      director: 'Bhaskar',
      music: 'Harris Jayaraj',
      villain: '',
      banner: 'Anjana Productions',
      genre: 'Romantic comedy',
      roles: ['Ram', 'Jaanu'],   // check

      stats: { imdb: 7, songs: 6, runtime: 170 },   // check

      spoiler: [
        'A man who believes love is a lie meets a girl who believes it is everything, and neither of them quite keeps to their rules.',
        'A young man who believes love cannot last forever has nine break-ups behind him.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Graffiti artist',
        location: 'Sydney',
        song: 'Rooba Rooba',
        scene: 'A man paints graffiti on a wall in Sydney',
      },
    },
    {
      id: 'ragada',
      title: 'Ragada',
      aka: [],
      year: 2010,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Anushka Shetty',
      director: 'Veerabhadram',   // check
      music: 'S. Thaman',
      villain: '',
      banner: '',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.5, songs: 6, runtime: 150 },   // check

      spoiler: [   // check
        'A young man becomes a gangster to protect his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Gangster',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'rama-rama-krishna-krishna',
      title: 'Rama Rama Krishna Krishna',
      aka: [],
      year: 2010,
      level: 'hard',

      hero: 'Ram Pothineni',
      heroine: 'Priya Anand',   // check
      director: 'Srivas',
      music: 'M. M. Keeravani',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5.6, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A young man falls for a girl whose family is caught in a faction feud.',
        'Love in the middle of a village war.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Rayalaseema',
        song: '',
        scene: '',
      },
    },
    {
      id: 'robo',
      title: 'Robo',
      aka: [],
      year: 2010,
      level: 'easy',

      hero: 'Rajinikanth',
      heroine: 'Aishwarya Rai',
      director: 'Shankar',
      music: 'A. R. Rahman',
      villain: 'Rajinikanth',
      banner: 'Sun Pictures',
      genre: 'Sci-fi action',
      roles: ['Vaseegaran', 'Sana', 'Chitti'],   // check

      stats: { imdb: 7.1, songs: 7, runtime: 174 },   // check

      spoiler: [
        'A scientist builds a human-like machine that falls in love with his fiancée and turns violent when it is rejected.',
        'A scientist builds a machine that looks like him, and it falls for the scientist\'s girlfriend.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Scientist',
        location: 'Chennai',
        song: 'Arima Arima',
        scene: 'A machine man pulls a train full of people',
      },
    },
    {
      id: 'simha',
      title: 'Simha',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Balakrishna',
      heroine: 'Nayanthara',
      director: 'Boyapati Srinu',
      music: 'Chakri',
      villain: '',
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.2, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A fearless district collector goes after the crooks who killed his family and takes on a ruthless industrialist.',
        'A college lecturer is really the son of a doctor killed by a powerful gang, and takes revenge.',
      ],
      dialogues: ['Choodu, oka vaipe choodu... rendo vaipu chudal anukoku, tattukolev.'],

      clues: {   // check
        job: 'Lecturer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'singham',
      title: 'Singham',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: 'Suriya',
      heroine: 'Anushka Shetty',
      director: 'Hari',
      music: 'Devi Sri Prasad',
      villain: 'Prakash Raj',
      banner: '',
      genre: 'Action',
      roles: ['Durai Singam', 'Kavya'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A village police officer is transferred to the city and takes on a gangster there.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police inspector',
        location: 'Thoothukudi and Chennai',
        song: '',
        scene: '',
      },
    },
    {
      id: 'varudu',
      title: 'Varudu',
      aka: [],
      year: 2010,
      level: 'hard',

      hero: 'Allu Arjun',
      heroine: 'Bhanu Sri Mehra',
      director: 'Gunasekhar',
      music: 'Mani Sharma',
      villain: 'Arya',
      banner: '',   // check
      genre: 'Action romance',
      roles: [],

      stats: { imdb: 4, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A groom is kidnapped on his wedding day by a man who wants to make sure the marriage never happens.',
        'A groom\'s bride is kidnapped during a five-day traditional wedding, and he goes after the kidnapper.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Groom',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'vedam',
      title: 'Vedam',
      aka: [],
      year: 2010,
      level: 'medium',

      hero: ['Allu Arjun', 'Manchu Manoj'],
      heroine: 'Anushka Shetty',
      director: 'Krish Jagarlamudi',
      music: 'M. M. Keeravani',
      villain: '',
      banner: 'Arka Media Works',
      genre: 'Drama',
      roles: ['Cable Raju', 'Saroja', 'Vivek'],   // check

      stats: { imdb: 8.1, songs: 5, runtime: 160 },

      spoiler: [
        'Five strangers in Hyderabad live very different lives, and one day their paths cross in a way that changes all of them.',
        'Five strangers from very different lives end up in the same hospital during a terror attack.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cable operator',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'yamudu',
      title: 'Yamudu',
      aka: [],
      year: 2010,
      level: 'hard',

      hero: 'Suriya',
      heroine: 'Anushka Shetty',
      director: 'Hari',
      music: 'Devi Sri Prasad',
      villain: 'Prakash Raj',
      banner: '',
      genre: 'Action',
      roles: ['Durai Singam', 'Kavya'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A village police officer is transferred to the city and takes on a gangster.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police inspector',
        location: 'Thoothukudi',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ye-maaya-chesave',
      title: 'Ye Maaya Chesave',
      aka: [],
      year: 2010,
      level: 'easy',

      hero: 'Naga Chaitanya',
      heroine: 'Samantha',
      director: 'Gautham Vasudev Menon',
      music: 'A. R. Rahman',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: ['Karthik', 'Jessie'],   // check

      stats: { imdb: 7.9, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A young aspiring filmmaker falls for a girl from a different faith, and both families are against it.',
        'An aspiring filmmaker falls for a girl older than him from a strict Christian family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Aspiring filmmaker',
        location: 'Hyderabad and Kerala',
        song: 'Kundanapu Bomma',
        scene: 'A young filmmaker chases a girl from a different faith',
      },
    },
    {
      id: '100-love',
      title: '100% Love',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Naga Chaitanya',
      heroine: 'Tamannaah',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Geetha Arts',   // check
      genre: 'Romantic comedy',
      roles: ['Balu', 'Mahalakshmi'],   // check

      stats: { imdb: 7, songs: 6, runtime: 141 },   // check

      spoiler: [
        'A college topper and his cousin from the village turn their rivalry over exam marks into an ego war that hides their love.',
        'A proud topper cannot bear it when the girl staying in his house starts beating him in every exam.',
      ],
      dialogues: [],

      clues: {
        job: 'Engineering student',
        location: 'Hyderabad',
        song: 'A Square B Square',
        scene: 'The hero quietly sabotages his cousin before an exam to stay the topper',
      },
    },
    {
      id: '7th-sense',
      title: '7th Sense',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Suriya',
      heroine: 'Shruti Haasan',
      director: 'A. R. Murugadoss',
      music: 'Harris Jayaraj',
      villain: 'Johnny Tri Nguyen',
      banner: 'Red Giant Movies',   // check
      genre: 'Sci-fi action',
      roles: ['Aravind', 'Subha', 'Dong Lee'],   // check

      stats: { imdb: 6.2, songs: 6, runtime: 168 },   // check

      spoiler: [
        'A geneticist tries to awaken the skills of an ancient Indian monk in his descendant, a circus performer, to stop a deadly virus.',
        'A Chinese agent uses hypnosis to spread a virus in India, and the answer lies with a 5th-century martial artist.',
      ],
      dialogues: [],

      clues: {
        job: 'Circus performer',
        location: 'Chennai',
        song: 'Yamma Yamma',
        scene: 'The villain hypnotises an entire street of people into attacking the hero',
      },
    },
    {
      id: 'ala-modalaindi',
      title: 'Ala Modalaindi',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Nithya Menen',
      director: 'B. V. Nandini Reddy',
      music: 'Kalyani Malik',
      villain: '',
      banner: 'Sri Ranjith Movies',   // check
      genre: 'Romantic comedy',
      roles: ['Gautham', 'Nitya'],   // check

      stats: { imdb: 7.6, songs: 6, runtime: 140 },   // check

      spoiler: [
        'Two heartbroken strangers meet at a wedding, become friends and slowly realise they are perfect for each other.',
        'A boy and a girl keep meeting at the wrong moments, years after they first bonded over failed relationships.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software engineer',
        location: 'Hyderabad',
        song: 'Ammammo Ammo',
        scene: 'Two strangers get drunk together at a wedding and share their break-up stories',
      },
    },
    {
      id: 'badrinath',
      title: 'Badrinath',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Tamannaah',
      director: 'V. V. Vinayak',
      music: 'M. M. Keeravani',
      villain: 'Prakash Raj',
      banner: 'Geetha Arts',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 4.7, songs: 6, runtime: 166 },   // check

      spoiler: [
        'A guardian of a sacred temple falls in love with a girl whose family has a long-standing grudge against him.',
        'A warrior trained to protect a Himalayan temple falls for a girl who does not believe in God.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Temple guardian',
        location: 'The Himalayas',
        song: 'Nath Nath',
        scene: 'A warrior fights with a sword in the snow near a Himalayan temple',
      },
    },
    {
      id: 'dookudu',
      title: 'Dookudu',
      aka: [],
      year: 2011,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Samantha',
      director: 'Sreenu Vaitla',
      music: 'S. Thaman',
      villain: 'Sonu Sood',
      banner: '14 Reels Entertainment',
      genre: 'Action comedy',
      roles: ['Ajay', 'Prashanthi', 'Padmasri'],   // check

      stats: { imdb: 7.4, songs: 6, runtime: 165 },

      spoiler: [
        'A cop who has been playing a double game as a local goon is hunted down by both the cops and the underworld.',
        'A cop stages a fake political life around his father, who just woke from a coma, to protect him from shock.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Hyderabad and Turkey',
        song: 'Poovai Poovai',
        scene: 'A cop makes his father believe he has become an MLA',
      },
    },
    {
      id: 'gaganam',
      title: 'Gaganam',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Poonam Kaur',   // check
      director: 'Radha Mohan',
      music: 'Pravin Mani',   // check
      villain: '',
      banner: '',   // check
      genre: 'Hijack thriller',
      roles: [],

      stats: { imdb: 7.7, songs: 0, runtime: 110 },   // check

      spoiler: [
        'A National Security Guard commando negotiates with terrorists who have hijacked a plane.',
        'A tense negotiation over the phone to save passengers on a plane.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'NSG commando',
        location: 'Kandahar and Delhi',
        song: '',
        scene: 'A commando talks to hijackers over a radio',
      },
    },
    {
      id: 'golconda-high-school',
      title: 'Golconda High School',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Sumanth',
      heroine: 'Swati Reddy',
      director: 'Mohan Krishna Indraganti',
      music: 'Kalyani Malik',
      villain: '',
      banner: '',   // check
      genre: 'Sports drama',
      roles: [],

      stats: { imdb: 7.6, songs: 4, runtime: 140 },   // check

      spoiler: [
        'A former cricketer trains a team of schoolboys to save their school ground from being sold.',
        'A coach turns a group of losers into a winning cricket team.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cricket coach',
        location: 'Hyderabad',
        song: '',
        scene: 'Schoolboys practise cricket on their last day on the ground',
      },
    },
    {
      id: 'kandireega',
      title: 'Kandireega',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Ram Pothineni',
      heroine: 'Hansika Motwani',
      director: 'Santosh Srinivas',
      music: 'S. Thaman',
      villain: 'Sonu Sood',
      banner: '',   // check
      genre: 'Action comedy',
      roles: ['Seenu', 'Shruti'],   // check

      stats: { imdb: 6.1, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A carefree young man falls for a girl who is engaged to a goon.',
        'A young man takes on a rowdy to win his girl.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'mirapakay',
      title: 'Mirapakay',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Richa Gangopadhyay',
      director: 'Harish Shankar',
      music: 'S. Thaman',
      villain: 'Prakash Raj',
      banner: '',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.5, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A Hindi lecturer in a college is secretly an undercover cop hunting a terrorist.',
        'A cop poses as a college teacher to get close to a criminal\'s daughter.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Hindi lecturer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'mr-perfect',
      title: 'Mr. Perfect',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Prabhas',
      heroine: 'Kajal Aggarwal',
      director: 'Dasaradh',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Romantic family drama',
      roles: ['Vicky', 'Priya', 'Maggie'],   // check

      stats: { imdb: 7.3, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A workaholic who believes in logic and a free-spirited girl clash over what makes a good relationship.',
        'A man who believes in living for himself learns from a girl that compromise is part of love.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Game designer',
        location: 'Melbourne',
        song: '',
        scene: '',
      },
    },
    {
      id: 'oosaravelli',
      title: 'Oosaravelli',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Tamannaah',
      director: 'Surender Reddy',
      music: 'Devi Sri Prasad',
      villain: 'Prakash Raj',
      banner: 'Sri Venkateswara Cine Chitra',
      genre: 'Action thriller',
      roles: ['Tony', 'Niharika'],   // check

      stats: { imdb: 6.1, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A man who changes colours like a chameleon helps a girl find the killers of her brother.',
        'A mercenary takes on a revenge mission for a stranger.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Mercenary',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'panjaa',
      title: 'Panjaa',
      aka: [],
      year: 2011,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Sarah-Jane Dias',
      director: 'Vishnuvardhan',
      music: 'Yuvan Shankar Raja',
      villain: 'Jackie Shroff',
      banner: '',   // check
      genre: 'Action thriller',
      roles: ['Jai', 'Sandhya', 'Bhagavan'],   // check

      stats: { imdb: 6.4, songs: 5, runtime: 165 },   // check

      spoiler: [
        'A stylish man with an odd habit of hating wealth is hunted by a mafia boss, and the real reason comes out when his past does.',
        'A trusted hitman of a Kolkata don breaks away after the don\'s son targets someone he cares about.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Hitman',
        location: 'Kolkata',
        song: '',
        scene: 'A hitman walks away from his boss in the rain',
      },
    },
    {
      id: 'shakthi',
      title: 'Shakthi',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Ileana D\'Cruz',
      director: 'Meher Ramesh',
      music: 'Mani Sharma',
      villain: 'Jackie Shroff',
      banner: 'Vyjayanthi Movies',
      genre: 'Fantasy action',
      roles: [],

      stats: { imdb: 3.5, songs: 6, runtime: 175 },   // check

      spoiler: [
        'A young man discovers he is the heir of a family sworn to protect a goddess\'s sacred power.',
        'A tourist guide in Rajasthan learns about his destiny.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Tourist guide',
        location: 'Rajasthan',
        song: '',
        scene: '',
      },
    },
    {
      id: 'solo',
      title: 'Solo',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Nara Rohit',
      heroine: 'Nisha Agarwal',
      director: 'Parasuram',
      music: 'Mani Sharma',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 6.7, songs: 5, runtime: 150 },   // check

      spoiler: [
        'An orphan wants to marry into a big family, and his girlfriend\'s father wants her husband to have a family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Orphan',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'teen-maar',
      title: 'Teen Maar',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Pawan Kalyan',
      heroine: 'Trisha',
      director: 'Jayanth C. Paranjee',
      music: 'Mani Sharma',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: ['Michael', 'Meera', 'Arjun Palwai'],   // check

      stats: { imdb: 5, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A modern chef in Cape Town and his grandfather\'s love story from decades ago run side by side.',
      ],
      dialogues: ['Kaaranam leni kopam, gauravam leni prema, badhyatha leni yavvanam, gnaapakam leni vruddhapyam anavasaram.'],

      clues: {   // check
        job: 'Chef',
        location: 'Cape Town',
        song: '',
        scene: '',
      },
    },
    {
      id: 'veera',
      title: 'Veera',
      aka: [],
      year: 2011,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Kajal Aggarwal',
      director: 'Ramesh Varma',
      music: 'S. Thaman',
      villain: '',
      banner: '',   // check
      genre: 'Action',
      roles: [],

      stats: { imdb: 4.5, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A young man hides his past as a fearsome village strongman.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'andala-rakshasi',
      title: 'Andala Rakshasi',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Naveen Chandra',
      heroine: 'Lavanya Tripathi',
      director: 'Hanu Raghavapudi',
      music: 'Radhan',
      villain: '',
      banner: 'Vaaraahi Chalana Chitram',   // check
      genre: 'Romantic drama',
      roles: ['Gautam', 'Midhuna', 'Surya'],   // check

      stats: { imdb: 7.1, songs: 6, runtime: 140 },   // check

      spoiler: [
        'Two young men love the same girl in very different ways, one of them obsessed and the other patient.',
        'A girl recovering from tragedy finds herself between a rich young man and a painter who loved her silently.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Painter',
        location: 'Visakhapatnam',
        song: 'Yemito Idhi',
        scene: 'A painter draws the heroine\'s portrait from memory',
      },
    },
    {
      id: 'bus-stop',
      title: 'Bus Stop',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Prince',
      heroine: 'Sri Divya',
      director: 'Maruthi',
      music: 'J. B.',   // check
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 5.5, songs: 5, runtime: 135 },   // check

      spoiler: [   // check
        'Groups of college students fall in and out of love while waiting for the same bus every morning.',
        'Young love, phone calls and parents, around one roadside shelter.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: 'College students chat while waiting for their bus every morning',
      },
    },
    {
      id: 'businessman',
      title: 'Businessman',
      aka: [],
      year: 2012,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Kajal Aggarwal',
      director: 'Puri Jagannadh',
      music: 'S. Thaman',
      villain: 'Prakash Raj',
      banner: 'R. R. Movie Makers',
      genre: 'Crime action',
      roles: ['Surya', 'Chitra'],   // check

      stats: { imdb: 7, songs: 6, runtime: 140 },   // check

      spoiler: [
        'A man from a small village dreams of building a gangster\'s empire in Mumbai, and he has a plan that nobody could see coming.',
        'A man from Hyderabad comes to Mumbai to build his own underworld empire, with a secret plan.',
      ],
      dialogues: ['Nee target 10 miles ayithe, aim for the 11th mile.', 'Yuddham chethakaanode dharmam gurinchi maatladathaadu sir.'],

      clues: {   // check
        job: 'Gangster',
        location: 'Mumbai',
        song: 'Sir Osthara',
        scene: 'A man lands in Mumbai wanting to rule it as a don',
      },
    },
    {
      id: 'cameraman-gangatho-rambabu',
      title: 'Cameraman Gangatho Rambabu',
      aka: [],
      year: 2012,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Tamannaah',
      director: 'Puri Jagannadh',
      music: 'Mani Sharma',
      villain: 'Prakash Raj',
      banner: 'Universal Media',
      genre: 'Political action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 5.5, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A hot-headed mechanic becomes a journalist and exposes a dangerous politician.',
        'A mechanic with a temper joins a TV channel to fight a corrupt politician.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Mechanic turned journalist',
        location: 'Hyderabad',
        song: '',
        scene: 'A mechanic beats up a goon live on a news channel',
      },
    },
    {
      id: 'damarukam',
      title: 'Damarukam',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Anushka Shetty',
      director: 'Srinivasa Reddy',
      music: 'Devi Sri Prasad',
      villain: 'Ravi Shankar',   // check
      banner: '',   // check
      genre: 'Fantasy action',
      roles: [],

      stats: { imdb: 5.5, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A man who does not believe in God is chosen to stop a demon who wants to marry the woman he loves.',
        'Lord Shiva helps a common man fight a demon.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Atheist',
        location: 'Hyderabad',
        song: '',
        scene: 'God appears to help a man fight a demon',
      },
    },
    {
      id: 'dammu',
      title: 'Dammu',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Trisha',
      director: 'Boyapati Srinu',
      music: 'M. M. Keeravani',
      villain: '',   // check
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 4.7, songs: 5, runtime: 160 },   // check

      spoiler: [
        'An orphan adopted by a royal family as their heir has to fight their sworn enemies.',
        'A boy becomes the heir of a king and is drawn into a deadly feud.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Adopted heir',
        location: 'A royal village',
        song: '',
        scene: 'A young man is crowned heir of a fort-town',
      },
    },
    {
      id: 'ee-rojullo',
      title: 'Ee Rojullo',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Srinivas',   // check
      heroine: 'Reshma Rathore',   // check
      director: 'Maruthi',
      music: 'J. B.',
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 5.5, songs: 5, runtime: 130 },   // check

      spoiler: [
        'Two young people who were cheated in love meet and become friends, then slowly fall for each other.',
        'A boy and a girl both hate the opposite sex after bad break-ups.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software employee',
        location: 'Hyderabad',
        song: '',
        scene: 'Two heartbroken strangers vow never to fall in love again',
      },
    },
    {
      id: 'eega',
      title: 'Eega',
      aka: [],
      year: 2012,
      level: 'easy',

      hero: 'Nani',
      heroine: 'Samantha',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Sudeep',
      banner: 'Vaaraahi Chalana Chitram',
      genre: 'Fantasy comedy thriller',
      roles: ['Nani', 'Bindu', 'Sudeep'],   // check

      stats: { imdb: 7.7, songs: 3, runtime: 134 },

      spoiler: [
        'A young man murdered by a ruthless businessman is reborn as a housefly and sets out to take his revenge.',
        'A man killed by a jealous rich man returns as a housefly to torment his killer.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Fireworks maker',
        location: 'Hyderabad',
        song: '',
        scene: 'A murdered man is reborn as a housefly',
      },
    },
    {
      id: 'gabbar-singh',
      title: 'Gabbar Singh',
      aka: [],
      year: 2012,
      level: 'easy',

      hero: 'Pawan Kalyan',
      heroine: 'Shruti Haasan',
      director: 'Harish Shankar',
      music: 'Devi Sri Prasad',
      villain: 'Abhimanyu Singh',
      banner: 'Parameswara Art Productions',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.4, songs: 6, runtime: 163 },

      spoiler: [
        'A fun-loving police officer who adores song contests is posted to a rural town and takes on a corrupt, dangerous local boss.',
        'A police officer who names himself after a famous Hindi villain cleans up a town and falls for a pot-maker\'s daughter.',
      ],
      dialogues: ['Naaku konchem thikka undi, daaniko lekka undi.', 'Naaku konchem tikkundi, kaani daaniki oka lekkundi.'],

      clues: {   // check
        job: 'Police inspector',
        location: 'Kondaveedu',
        song: 'Kevvu Keka',
        scene: 'A cop who loves antakshari',
      },
    },
    {
      id: 'ishq',
      title: 'Ishq',
      aka: [],
      year: 2012,
      level: 'medium',

      hero: 'Nithiin',
      heroine: 'Nithya Menen',
      director: 'Vikram Kumar',
      music: 'Anup Rubens',   // check
      villain: '',
      banner: 'Sresht Movies',
      genre: 'Romantic action',
      roles: ['Rahul', 'Priya'],   // check

      stats: { imdb: 7.4, songs: 6, runtime: 145 },   // check

      spoiler: [
        'A young man falls for a girl at an airport, but her short-tempered brother does not approve.',
        'A love story that begins when two strangers miss a flight.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Goa and Hyderabad',
        song: 'Lachamma',
        scene: 'Two strangers bond after missing a flight',
      },
    },
    {
      id: 'julayi',
      title: 'Julayi',
      aka: [],
      year: 2012,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Ileana D\'Cruz',
      director: 'Trivikram Srinivas',
      music: 'Devi Sri Prasad',
      villain: 'Sonu Sood',
      banner: 'Haarika & Hassine Creations',
      genre: 'Action comedy',
      roles: ['Ravi', 'Madhu', 'Bittu'],   // check

      stats: { imdb: 7.2, songs: 6, runtime: 155 },   // check

      spoiler: [
        'An unemployed graduate stumbles onto a bank robbery plan that could make him rich, if he can outwit a ruthless gangster.',
        'A smart young man who believes in quick money foils a bank robbery and makes an enemy of the gangster behind it.',
      ],
      dialogues: ['Cheppali sir... nannu gelakoddu, chastharu ani cheppakapothe ela?'],

      clues: {   // check
        job: 'Unemployed graduate',
        location: 'Hyderabad',
        song: 'O Madhu',
        scene: 'A smart idler crosses paths with a bank robber',
      },
    },
    {
      id: 'krishnam-vande-jagadgurum',
      title: 'Krishnam Vande Jagadgurum',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Rana Daggubati',
      heroine: 'Nayanthara',
      director: 'Krish Jagarlamudi',
      music: 'Mani Sharma',
      villain: 'Milind Gunaji',
      banner: '',   // check
      genre: 'Action drama',
      roles: ['B.Tech Babu', 'Devika'],   // check

      stats: { imdb: 7.4, songs: 5, runtime: 160 },   // check

      spoiler: [
        'A stage actor from a family of drama artists exposes illegal mining in Bellary.',
        'A theatre artist takes on a mining mafia.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Stage actor',
        location: 'Bellary',
        song: '',
        scene: '',
      },
    },
    {
      id: 'life-is-beautiful',
      title: 'Life Is Beautiful',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Abhijeet',   // check
      heroine: 'Shriya Saran',
      director: 'Sekhar Kammula',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: 'Amigos Creations',
      genre: 'Coming-of-age drama',
      roles: [],

      stats: { imdb: 7.2, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A group of friends in a Hyderabad colony grow up together through one summer of love and fights.',
        'Young people in a gated colony learn about life and love.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College graduate',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'racha',
      title: 'Racha',
      aka: [],
      year: 2012,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Tamannaah',
      director: 'Sampath Nandi',
      music: 'Mani Sharma',
      villain: 'Mukesh Rishi',
      banner: 'Mega Super Good Films',
      genre: 'Action drama',
      roles: ['Raj', 'Chaitra'],   // check

      stats: { imdb: 5.9, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A man who works as a taxi driver in Hyderabad goes after a rowdy gang lord who wants to make him a pawn in a blood feud.',
        'A betting expert in Hyderabad is hired to make a mine owner\'s daughter fall for him.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Bet taker',
        location: 'Hyderabad',
        song: 'Vaana Vaana Velluvaye',
        scene: 'A man accepts a bet to make a girl love him',
      },
    },
    {
      id: 'rebel',
      title: 'Rebel',
      aka: [],
      year: 2012,
      level: 'medium',

      hero: 'Prabhas',
      heroine: 'Tamannaah',
      director: 'Raghava Lawrence',
      music: 'Raghava Lawrence',
      villain: '',
      banner: '',   // check
      genre: 'Action drama',
      roles: ['Rishi', 'Nandini'],   // check

      stats: { imdb: 5.2, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A hero grows up trying to carry out a promise to his dying guardian, but the world stands in his way.',
        'A man hunts the gangsters who killed his father, a powerful don.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Son of a don',
        location: 'Hyderabad and Bangkok',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sarocharu',
      title: 'Sarocharu',
      aka: [],
      year: 2012,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Kajal Aggarwal',
      director: 'Parasuram',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 5.5, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A married man tells a girl travelling with him about his past romance.',
        'A love story told on a road trip in Italy.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Italy',
        song: '',
        scene: '',
      },
    },
    {
      id: 'thuppakki',
      title: 'Thuppakki',
      aka: [],
      year: 2012,
      level: 'medium',

      hero: 'Vijay',
      heroine: 'Kajal Aggarwal',
      director: 'A. R. Murugadoss',
      music: 'Harris Jayaraj',
      villain: 'Vidyut Jammwal',
      banner: 'V Creations',
      genre: 'Action thriller',
      roles: ['Jagadish', 'Nisha'],   // check

      stats: { imdb: 8, songs: 6, runtime: 169 },   // check

      spoiler: [
        'An army officer on leave in Mumbai discovers sleeper cells planning bomb blasts and hunts them.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Army captain',
        location: 'Mumbai',
        song: '',
        scene: '',
      },
    },
    {
      id: 'attarintiki-daredi',
      title: 'Attarintiki Daredi',
      aka: [],
      year: 2013,
      level: 'easy',

      hero: 'Pawan Kalyan',
      heroine: 'Samantha',
      director: 'Trivikram Srinivas',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Sri Venkateswara Cine Chitra',
      genre: 'Family comedy drama',
      roles: ['Gautham', 'Sasi', 'Sunanda'],   // check

      stats: { imdb: 7.4, songs: 6, runtime: 166 },

      spoiler: [
        'A billionaire\'s grandson takes a job as a driver in his own aunt\'s house to bring his estranged family back together.',
        'A rich man from Milan works as a driver in his aunt\'s home in India to bring her back to his grandfather.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Driver',
        location: 'Hyderabad and Milan',
        song: 'Ninnu Chudagaane',
        scene: 'A grandson returns as a driver to reunite his family',
      },
    },
    {
      id: 'baadshah',
      title: 'Baadshah',
      aka: [],
      year: 2013,
      level: 'medium',

      hero: 'Jr NTR',
      heroine: 'Kajal Aggarwal',
      director: 'Sreenu Vaitla',
      music: 'S. Thaman',
      villain: 'Ashish Vidyarthi',   // check
      banner: 'Parameswara Art Productions',
      genre: 'Action comedy',
      roles: ['Rama Rao', 'Janaki', 'Saadhu Bhai'],   // check

      stats: { imdb: 6.5, songs: 6, runtime: 165 },   // check

      spoiler: [
        'A lookalike who stays in a lawless land of mafia gangs takes down a feared don while trying to keep his family safe.',
        'A man whose family runs a gang goes undercover to take down a don, using his talent for fooling people.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Undercover cop',
        location: 'Milan and Hyderabad',
        song: 'Banthi Poola Janaki',
        scene: 'A fake dream sequence is staged to fool a comic character',
      },
    },
    {
      id: 'balupu',
      title: 'Balupu',
      aka: [],
      year: 2013,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Shruti Haasan',
      director: 'Gopichand Malineni',
      music: 'S. Thaman',
      villain: 'Ashutosh Rana',   // check
      banner: 'PVP Cinema',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.4, songs: 6, runtime: 155 },   // check

      spoiler: [
        'A call centre employee and his father con rich girls, until the past of the son catches up with them.',
        'A man who runs a racket with his father to cheat girls who play with boys\' hearts.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Call centre employee',
        location: 'Bengaluru and Vizag',
        song: 'Lucky Lucky Rai',
        scene: 'A father and son trick a rich girl into falling for the son',
      },
    },
    {
      id: 'greeku-veerudu',
      title: 'Greeku Veerudu',
      aka: [],
      year: 2013,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Nayanthara',
      director: 'Dasaradh',
      music: 'S. Thaman',
      villain: '',
      banner: '',   // check
      genre: 'Family drama',
      roles: [],

      stats: { imdb: 4.5, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A man who hates family ties hires a woman to pose as his wife at a family function.',
        'A businessman in America learns to love his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Event manager',
        location: 'New York and India',
        song: '',
        scene: '',
      },
    },
    {
      id: 'gunde-jaari-gallanthayyinde',
      title: 'Gunde Jaari Gallanthayyinde',
      aka: [],
      year: 2013,
      level: 'hard',

      hero: 'Nithiin',
      heroine: 'Nithya Menen',
      director: 'Vijay Kumar Konda',
      music: 'Anup Rubens',
      villain: '',
      banner: 'Sresht Movies',
      genre: 'Romantic comedy',
      roles: ['Karthik', 'Sravani'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A man falls in love over the phone with a girl who is not the one he thinks she is.',
        'A phone call goes to the wrong girl, and love follows.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software engineer',
        location: 'Hyderabad',
        song: '',
        scene: 'A wrong-number call turns into a love story',
      },
    },
    {
      id: 'iddarammayilatho',
      title: 'Iddarammayilatho',
      aka: [],
      year: 2013,
      level: 'hard',

      hero: 'Allu Arjun',
      heroine: 'Amala Paul',
      director: 'Puri Jagannadh',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Universal Media',
      genre: 'Action romance',
      roles: ['Sanju', 'Komali', 'Akanksha'],   // check

      stats: { imdb: 5.5, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A street musician in Barcelona falls for a girl, only to learn of another girl\'s diary that connects to his past.',
        'A guitarist\'s love life in Spain gets tangled with a mafia story.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Street musician',
        location: 'Barcelona',
        song: 'Top Lechipoddi',
        scene: 'A girl reads an old diary in a Barcelona flat',
      },
    },
    {
      id: 'mirchi',
      title: 'Mirchi',
      aka: [],
      year: 2013,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Anushka Shetty',
      director: 'Koratala Siva',
      music: 'Devi Sri Prasad',
      villain: 'Sampath Raj',
      banner: 'UV Creations',
      genre: 'Action drama',
      roles: ['Jai', 'Vennela', 'Manasa'],   // check

      stats: { imdb: 7.5, songs: 6, runtime: 160 },

      spoiler: [
        'A cold, calm man from a feuding family hides his true background until his love is put at risk by an old rivalry.',
        'A man from a feuding family goes to his enemies\' house in disguise to end the feud forever.',
      ],
      dialogues: ['Kathi vaadatam modalupedithe naakanna baaga evaru vaadaleru.'],

      clues: {   // check
        job: 'Architect',
        location: 'Milan and Rayalaseema',
        song: 'Pandagala Digivachavu',
        scene: 'A man enters his enemy\'s village to change it with love',
      },
    },
    {
      id: 'naayak',
      title: 'Naayak',
      aka: [],
      year: 2013,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Kajal Aggarwal',
      director: 'V. V. Vinayak',
      music: 'S. Thaman',
      villain: 'Rahul Dev',
      banner: 'Universal Media',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A young man\'s life is turned upside down when his lookalike, a feared underworld figure, takes his identity.',
        'A software engineer is mistaken for his lookalike, a feared man from Kolkata.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software engineer',
        location: 'Kolkata',
        song: 'Laila O Laila',
        scene: 'A man is mistaken for his twin by goons',
      },
    },
    {
      id: 'ramayya-vasthavayya',
      title: 'Ramayya Vasthavayya',
      aka: [],
      year: 2013,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Samantha',
      director: 'Harish Shankar',
      music: 'S. Thaman',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5.3, songs: 5, runtime: 160 },   // check

      spoiler: [
        'A college student is secretly on a mission against a businessman who wiped out a family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'seethamma-vakitlo-sirimalle-chettu',
      title: 'Seethamma Vakitlo Sirimalle Chettu',
      aka: [],
      year: 2013,
      level: 'easy',

      hero: ['Venkatesh', 'Mahesh Babu'],
      heroine: 'Samantha',
      director: 'Srikanth Addala',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Family drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7, songs: 6, runtime: 158 },   // check

      spoiler: [
        'Two brothers in a big Godavari family keep fighting over jobs and love, while their father hopes they will grow up.',
        'An elder and a younger brother, both unemployed, in a family full of love.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Godavari village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'thoofan',
      title: 'Thoofan',
      aka: [],
      year: 2013,
      level: 'hard',

      hero: 'Ram Charan',
      heroine: 'Priyanka Chopra',
      director: 'Apoorva Lakhia',
      music: 'Chirantan Bhatt',
      villain: 'Prakash Raj',
      banner: 'Reliance Entertainment',
      genre: 'Action',
      roles: ['Vijay Khanna', 'Mala', 'Teja'],   // check

      stats: { imdb: 2.5, songs: 5, runtime: 140 },   // check

      spoiler: [
        'An angry police officer in Mumbai exposes the oil mafia after a journalist is killed.',
        'A remake of a famous 1970s cop film.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Mumbai',
        song: '',
        scene: '',
      },
    },
    {
      id: 'zanjeer',
      title: 'Zanjeer',
      aka: [],
      year: 2013,
      level: 'hard',

      hero: 'Ram Charan',
      heroine: 'Priyanka Chopra',
      director: 'Apoorva Lakhia',
      music: 'Chirantan Bhatt',
      villain: 'Prakash Raj',
      banner: 'Reliance Entertainment',
      genre: 'Action',
      roles: ['Vijay Khanna', 'Mala', 'Teja'],   // check

      stats: { imdb: 2.5, songs: 5, runtime: 140 },   // check

      spoiler: [
        'An angry police officer in Mumbai exposes the oil mafia after a journalist is killed.',
        'A Hindi remake of a famous 1970s cop film.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Mumbai',
        song: '',
        scene: '',
      },
    },
    {
      id: '1-nenokkadine',
      title: '1: Nenokkadine',
      aka: ['Nenokkadine', '1 Nenokkadine'],
      year: 2014,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Kriti Sanon',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: '',   // check
      banner: '14 Reels Entertainment',
      genre: 'Psychological action thriller',
      roles: ['Gautham', 'Sameera'],   // check

      stats: { imdb: 8.1, songs: 6, runtime: 170 },   // check

      spoiler: [
        'A rock star who is not sure which of his memories are real hunts the three men he believes killed his parents.',
        'A musician with a mental condition chases a past that his doctors say never happened.',
      ],
      dialogues: [],

      clues: {
        job: 'Rock star',
        location: 'London and Goa',
        song: 'Who R U',
        scene: 'A rock concert where the singer suddenly sees a man from his nightmares in the crowd',
      },
    },
    {
      id: 'aagadu',
      title: 'Aagadu',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Tamannaah',
      director: 'Sreenu Vaitla',
      music: 'S. Thaman',
      villain: 'Sonu Sood',
      banner: '14 Reels Entertainment',
      genre: 'Action comedy',
      roles: ['Shankar', 'Saroja', 'Damodar'],   // check

      stats: { imdb: 4.4, songs: 6, runtime: 169 },   // check

      spoiler: [
        'A cop with a sharp tongue is sent to a village to take on a ruthless man who controls everything there.',
        'An orphan raised by a strict police officer becomes a cop and goes after the local strongman his father once fought.',
      ],
      dialogues: ['Dikki balisina kodi chicken shop mundukochi thoda kottindanta.'],

      clues: {   // check
        job: 'Police inspector',
        location: 'Bukkapatnam village',
        song: 'Bhel Puri',
        scene: 'The cop mimics famous film dialogues to confuse the villain\'s gang',
      },
    },
    {
      id: 'drushyam',
      title: 'Drushyam',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Venkatesh',
      heroine: 'Meena',
      director: 'Sripriya',
      music: 'Sharreth',
      villain: '',
      banner: 'Suresh Productions',
      genre: 'Thriller',
      roles: ['Rambabu', 'Jyothi'],   // check

      stats: { imdb: 8.2, songs: 3, runtime: 160 },   // check

      spoiler: [
        'A cable TV operator uses everything he learnt from movies to protect his family after his daughter accidentally kills a boy.',
        'A man creates a perfect alibi for his family that even the police cannot break.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cable TV operator',
        location: 'A small town',
        song: '',
        scene: 'A cable operator protects his family after an accidental killing',
      },
    },
    {
      id: 'govindudu-andarivadele',
      title: 'Govindudu Andarivadele',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Kajal Aggarwal',
      director: 'Krishna Vamsi',
      music: 'Yuvan Shankar Raja',
      villain: '',
      banner: 'Parameswara Art Productions',
      genre: 'Family drama',
      roles: ['Abhiram', 'Satya'],   // check

      stats: { imdb: 6, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A young man from London goes to his grandfather\'s village to reunite his family after an old fight.',
        'A grandson hides his identity to bring his father back to the family home.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Medical graduate',
        location: 'A village near Hyderabad',
        song: '',
        scene: 'A grandson secretly works in his grandfather\'s house',
      },
    },
    {
      id: 'karthikeya',
      title: 'Karthikeya',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Nikhil Siddhartha',
      heroine: 'Swati Reddy',
      director: 'Chandoo Mondeti',
      music: 'Shekar Chandra',
      villain: '',
      banner: '',   // check
      genre: 'Mystery thriller',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.6, songs: 4, runtime: 125 },   // check

      spoiler: [
        'A curious medical student investigates mysterious deaths around an old Subrahmanya temple that has been locked for years.',
        'A temple, a snake and a medical student who wants answers.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Medical student',
        location: 'Subrahmanyapuram',
        song: '',
        scene: '',
      },
    },
    {
      id: 'legend',
      title: 'Legend',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Balakrishna',
      heroine: 'Sonal Chauhan',
      director: 'Boyapati Srinu',
      music: 'Devi Sri Prasad',
      villain: 'Jagapathi Babu',
      banner: '14 Reels Entertainment',
      genre: 'Action drama',
      roles: ['Krishna', 'Snehitha', 'Jitendra'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 160 },   // check

      spoiler: [
        'A political rival tries to stop a fearless man from giving justice to the people, but he fights back in a style of his own.',
        'A man returns from Dubai to protect his family from a ruthless politician, with help from his elder brother.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Rayalaseema and Dubai',
        song: '',
        scene: '',
      },
    },
    {
      id: 'lingaa',
      title: 'Lingaa',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Anushka Shetty',
      director: 'K. S. Ravikumar',
      music: 'A. R. Rahman',
      villain: '',
      banner: 'Rockline Entertainment',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5.4, songs: 5, runtime: 175 },   // check

      spoiler: [
        'A thief goes to his grandfather\'s village and learns how he built a dam for its people.',
        'A grandson finds out his royal grandfather gave up everything for a dam.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Thief',
        location: 'A village in Tamil Nadu',
        song: '',
        scene: '',
      },
    },
    {
      id: 'manam',
      title: 'Manam',
      aka: [],
      year: 2014,
      level: 'easy',

      hero: ['Nagarjuna', 'Naga Chaitanya'],
      heroine: 'Samantha',
      director: 'Vikram Kumar',
      music: 'Anup Rubens',
      villain: '',
      banner: 'Annapurna Studios',
      genre: 'Fantasy family drama',
      roles: [],

      stats: { imdb: 8.3, songs: 5, runtime: 137 },

      spoiler: [
        'A family across three generations are separated by fate and keep finding each other again, lifetime after lifetime.',
        'A businessman meets a young man who looks exactly like his late father, and the past starts to repeat itself.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Hyderabad',
        song: 'Kani Penchina Ma Ammake',
        scene: 'Three generations of a family are reborn',
      },
    },
    {
      id: 'mukunda',
      title: 'Mukunda',
      aka: [],
      year: 2014,
      level: 'hard',

      hero: 'Varun Tej',
      heroine: 'Pooja Hegde',
      director: 'Srikanth Addala',
      music: 'Mickey J. Meyer',
      villain: 'Prakash Raj',   // check
      banner: '',   // check
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 5.5, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A young man in a small town fights local politics for the sake of his friend.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'A small town',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pilla-nuvvu-leni-jeevitham',
      title: 'Pilla Nuvvu Leni Jeevitham',
      aka: [],
      year: 2014,
      level: 'hard',

      hero: 'Sai Dharam Tej',
      heroine: 'Regina Cassandra',
      director: 'A. S. Ravikumar Chowdary',
      music: 'Anup Rubens',
      villain: 'Jagapathi Babu',
      banner: 'Geetha Arts',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.8, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A young man is caught between two politicians who both want to use him.',
        'A carefree youth becomes a pawn in local politics.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'power',
      title: 'Power',
      aka: [],
      year: 2014,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Hansika Motwani',
      director: 'Bobby Kolli',
      music: 'S. Thaman',
      villain: '',
      banner: '',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.7, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A corrupt cop dies and his honest lookalike takes his place to finish his mission.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Kolkata',
        song: '',
        scene: '',
      },
    },
    {
      id: 'rabhasa',
      title: 'Rabhasa',
      aka: [],
      year: 2014,
      level: 'hard',

      hero: 'Jr NTR',
      heroine: 'Samantha',
      director: 'Santosh Srinivas',
      music: 'S. Thaman',
      villain: '',
      banner: 'Sri Lakshmi Narasimha Productions',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 4.6, songs: 6, runtime: 160 },   // check

      spoiler: [
        'A young man promises his mother he will marry his cousin, but falls for someone else.',
        'A hero is mistaken for someone else at college.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'race-gurram',
      title: 'Race Gurram',
      aka: [],
      year: 2014,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Shruti Haasan',
      director: 'Surender Reddy',
      music: 'S. Thaman',
      villain: 'Ravi Kishan',
      banner: 'Sri Lakshmi Narasimha Productions',
      genre: 'Action comedy',
      roles: ['Lucky', 'Spandana', 'Shiva Reddy'],   // check

      stats: { imdb: 7.2, songs: 7, runtime: 156 },

      spoiler: [
        'Two brothers who cannot stand each other end up in a war of wits after a ruthless politician enters their lives.',
        'A carefree younger brother and his serious cop brother clash, until a corrupt politician targets their family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Hyderabad',
        song: 'Cinema Choopistha Mava',
        scene: 'Two brothers clash and a funny cop named Kill Bill Pandey appears',
      },
    },
    {
      id: 'run-raja-run',
      title: 'Run Raja Run',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Sharwanand',
      heroine: 'Seerat Kapoor',
      director: 'Sujeeth',
      music: 'Ghibran',
      villain: '',
      banner: 'UV Creations',
      genre: 'Crime comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.6, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A carefree young man falls for a police commissioner\'s daughter, and gets drawn into a kidnapping plot.',
        'A young man is used as a pawn in a fake kidnapping.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ugramm',
      title: 'Ugramm',
      aka: [],
      year: 2014,
      level: 'hard',

      hero: 'Srii Murali',
      heroine: 'Haripriya',   // check
      director: 'Prashanth Neel',
      music: 'Ravi Basrur',
      villain: '',
      banner: 'Inkfinite Pictures',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 8.1, songs: 4, runtime: 140 },   // check

      spoiler: [
        'A mechanic in Mysore protects a young woman who returns from Australia and is hunted by her father\'s enemies.',
        'A quiet man with a violent past from a lawless town called Mughor.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Mechanic',
        location: 'Mughor and Mysore',
        song: '',
        scene: '',
      },
    },
    {
      id: 'yevadu',
      title: 'Yevadu',
      aka: [],
      year: 2014,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Shruti Haasan',
      director: 'Vamshi Paidipally',
      music: 'Devi Sri Prasad',
      villain: 'Rahul Dev',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action thriller',
      roles: ['Charan', 'Deepthi', 'Veeru Potla'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 166 },   // check

      spoiler: [
        'A man whose face has been reconstructed after a brutal attack returns for revenge against the gangster who nearly killed him.',
        'A man whose face is rebuilt by surgery takes revenge on the gang that killed his girlfriend.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Vizag',
        song: '',
        scene: '',
      },
    },
    {
      id: 'baahubali-the-beginning',
      title: 'Baahubali: The Beginning',
      aka: [],
      year: 2015,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Tamannaah',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Rana Daggubati',
      banner: 'Arka Media Works',
      genre: 'Epic fantasy action',
      roles: ['Shivudu', 'Avanthika', 'Bhallaladeva'],   // check

      stats: { imdb: 8, songs: 7, runtime: 159 },

      spoiler: [
        'A boy raised by villagers climbs a giant waterfall and falls for a rebel warrior woman. He then discovers he is the son of a king whose kingdom was taken through betrayal.',
        'A boy raised at the foot of a giant waterfall climbs it and learns he belongs to a royal family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Village youth',
        location: 'Mahishmati',
        song: 'Dheevara',
        scene: 'A young man climbs a giant waterfall',
      },
    },
    {
      id: 'bhale-bhale-magadivoy',
      title: 'Bhale Bhale Magadivoy',
      aka: [],
      year: 2015,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Lavanya Tripathi',
      director: 'Maruthi',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'GA2 Pictures',
      genre: 'Romantic comedy',
      roles: ['Lucky', 'Nandana'],   // check

      stats: { imdb: 7.6, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A scientist who forgets everything in seconds tries to hide his absent-mindedness from his girlfriend and her strict father.',
        'A forgetful man keeps getting into trouble because he cannot remember anything for long.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Plant scientist',
        location: 'Hyderabad',
        song: '',
        scene: 'A man hides his forgetfulness from the girl he loves',
      },
    },
    {
      id: 'bruce-lee-the-fighter',
      title: 'Bruce Lee: The Fighter',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Ram Charan',
      heroine: 'Rakul Preet Singh',
      director: 'Sreenu Vaitla',
      music: 'S. Thaman',
      villain: 'Arun Vijay',
      banner: 'DVV Entertainment',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 3.9, songs: 6, runtime: 153 },   // check

      spoiler: [
        'A stuntman pretends to be a police officer to impress his sister\'s in-laws, and ends up fighting a real criminal.',
        'A film stunt double fakes being a cop to protect his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Film stuntman',
        location: 'Hyderabad',
        song: '',
        scene: 'A stuntman does a real fight dressed as a cop',
      },
    },
    {
      id: 'gopala-gopala',
      title: 'Gopala Gopala',
      aka: [],
      year: 2015,
      level: 'medium',

      hero: ['Venkatesh', 'Pawan Kalyan'],
      heroine: 'Shriya Saran',
      director: 'Kishore Kumar Pardasany',
      music: 'Anup Rubens',
      villain: 'Mithun Chakraborty',   // check
      banner: 'Suresh Productions',
      genre: 'Fantasy comedy drama',
      roles: [],

      stats: { imdb: 7.4, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A shopkeeper who loses his shop in an earthquake sues God, and God himself turns up to help him.',
        'An atheist files a court case against God after an earthquake.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Shopkeeper',
        location: 'Hyderabad',
        song: '',
        scene: 'A man files a court case against God',
      },
    },
    {
      id: 'kanche',
      title: 'Kanche',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Varun Tej',
      heroine: 'Pragya Jaiswal',
      director: 'Krish Jagarlamudi',
      music: 'Chirantan Bhatt',
      villain: '',
      banner: 'First Frame Entertainments',
      genre: 'Period war drama',
      roles: ['Dhoopati Hari Babu', 'Sita Devi'],   // check

      stats: { imdb: 7.6, songs: 5, runtime: 125 },   // check

      spoiler: [
        'A soldier fighting in the Second World War remembers his love for a girl from a higher caste back home.',
        'A love story in an Indian village, told during a battle in Italy.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Soldier',
        location: 'Italy and an Andhra village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'kick-2',
      title: 'Kick 2',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Rakul Preet Singh',
      director: 'Surender Reddy',
      music: 'S. Thaman',
      villain: 'Ravi Kishan',
      banner: 'N.T.R. Arts',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 4.6, songs: 5, runtime: 160 },   // check

      spoiler: [
        'The comfort-loving son of a thrill seeker goes to a village in Bihar and ends up fighting a cruel landlord.',
        'A man obsessed with comfort finds himself in a lawless village.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Doctor',
        location: 'Bihar village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'lion',
      title: 'Lion',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Balakrishna',
      heroine: 'Trisha',
      director: 'Satyadev',
      music: 'Mani Sharma',
      villain: '',   // check
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 4, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A man who wakes up from a coma is told he is someone else, and fights to discover his real identity.',
        'A CBI officer\'s identity is wiped out by enemies.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'CBI officer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pandaga-chesko',
      title: 'Pandaga Chesko',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Ram Pothineni',
      heroine: 'Rakul Preet Singh',
      director: 'Gopichand Malineni',
      music: 'S. Thaman',
      villain: '',
      banner: '',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.6, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A rich businessman from Portugal goes to an Indian village to end a feud between two families.',
        'A man disguises himself to fix a family quarrel.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Portugal and a village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pataas',
      title: 'Pataas',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Kalyan Ram',
      heroine: 'Shruti Sodhi',
      director: 'Anil Ravipudi',
      music: 'Sai Karthik',
      villain: 'Ashutosh Rana',
      banner: 'N.T.R. Arts',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 6.5, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A corrupt cop changes after meeting his estranged father and turns on the politician he was working for.',
        'A crooked police officer becomes an honest one.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'premam',
      title: 'Premam',
      aka: [],
      year: 2015,
      level: 'medium',

      hero: 'Nivin Pauly',
      heroine: 'Sai Pallavi',
      director: 'Alphonse Puthren',
      music: 'Rajesh Murugesan',
      villain: '',
      banner: '',
      genre: 'Romantic comedy',
      roles: ['George', 'Malar', 'Mary'],   // check

      stats: { imdb: 8.3, songs: 6, runtime: 156 },   // check

      spoiler: [
        'A young man falls in love three times across his school years, his college life and his working life.',
        'A Malayalam film about a young man\'s three loves at school, college and later life.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Baker',
        location: 'Aluva',
        song: '',
        scene: '',
      },
    },
    {
      id: 'rudhramadevi',
      title: 'Rudhramadevi',
      aka: [],
      year: 2015,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Anushka Shetty',
      director: 'Gunasekhar',
      music: 'Ilaiyaraaja',
      villain: 'Rana Daggubati',
      banner: 'Gunaa Teamworks',
      genre: 'Historical action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.1, songs: 6, runtime: 158 },   // check

      spoiler: [
        'A Kakatiya princess raised as a boy becomes queen and fights to keep her kingdom.',
        'A queen disguised as a prince rules Warangal.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Queen',
        location: 'Warangal',
        song: '',
        scene: '',
      },
    },
    {
      id: 's-o-satyamurthy',
      title: 'S/O Satyamurthy',
      aka: [],
      year: 2015,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Samantha',
      director: 'Trivikram Srinivas',
      music: 'Devi Sri Prasad',
      villain: 'Upendra',
      banner: 'Haarika & Hassine Creations',
      genre: 'Family action drama',
      roles: ['Viraj', 'Subbalakshmi'],   // check

      stats: { imdb: 6.8, songs: 6, runtime: 162 },   // check

      spoiler: [
        'A rich young man must start again from scratch when his father passes away and a debt that nobody mentioned comes to the surface.',
        'A rich son loses everything after his father\'s death and works as a wedding planner to pay his father\'s debts.',
      ],
      dialogues: ['Manam baagunnappudu lekkalu maatlaadi, kashtallo unnappudu viluvalu maatlaadakoodadu.'],

      clues: {   // check
        job: 'Wedding planner',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'srimanthudu',
      title: 'Srimanthudu',
      aka: [],
      year: 2015,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Shruti Haasan',
      director: 'Koratala Siva',
      music: 'Devi Sri Prasad',
      villain: 'Jagapathi Babu',
      banner: 'Mythri Movie Makers',
      genre: 'Action drama',
      roles: ['Harsha', 'Charuseela'],   // check

      stats: { imdb: 7.3, songs: 6, runtime: 160 },

      spoiler: [
        'The son of a billionaire gives up his rich life to adopt a poor village, and fights a local politician who wants to keep it down.',
        'A billionaire\'s son adopts his father\'s ancestral village and changes it, facing a local thug.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Billionaire\'s son',
        location: 'Devarakota village',
        song: 'Jaago',
        scene: 'A rich heir adopts a village',
      },
    },
    {
      id: 'subramanyam-for-sale',
      title: 'Subramanyam for Sale',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Sai Dharam Tej',
      heroine: 'Regina Cassandra',
      director: 'Harish Shankar',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 5.5, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A man in America who does any job for money gets hired to pose as a girl\'s husband.',
        'A money-minded man takes on a strange assignment.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Odd-job worker',
        location: 'USA',
        song: '',
        scene: '',
      },
    },
    {
      id: 'temper',
      title: 'Temper',
      aka: [],
      year: 2015,
      level: 'easy',

      hero: 'Jr NTR',
      heroine: 'Kajal Aggarwal',
      director: 'Puri Jagannadh',
      music: 'Anup Rubens',
      villain: 'Prakash Raj',
      banner: 'Parameswara Art Productions',
      genre: 'Action drama',
      roles: ['Daya', 'Shanvi', 'Waltair Vasu'],   // check

      stats: { imdb: 7.3, songs: 5, runtime: 150 },

      spoiler: [
        'A corrupt police officer who takes bribes changes completely after a crime against a girl, and decides to take on the system himself.',
        'A corrupt cop who works for a gangster turns against him after a girl\'s case.',
      ],
      dialogues: ['Naa peru Daya... naaku lenide adi.', 'Neeku ego lopala untundemo, naaku naa chuttu Wi-Fi la untundi.', 'Neeku naaku friendship emitira? Nuvvu villain, nenu hero!', 'Username Daya, password Police!'],

      clues: {   // check
        job: 'Police inspector',
        location: 'Vizag',
        song: '',
        scene: 'A corrupt cop turns honest',
      },
    },
    {
      id: 'yevade-subramanyam',
      title: 'Yevade Subramanyam',
      aka: [],
      year: 2015,
      level: 'hard',

      hero: 'Nani',
      heroine: 'Malavika Nair',
      director: 'Nag Ashwin',
      music: 'Radhan',
      villain: '',
      banner: 'Swapna Cinema',
      genre: 'Drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.1, songs: 4, runtime: 155 },   // check

      spoiler: [
        'A businessman obsessed with success travels to the Himalayas to scatter his friend\'s ashes and finds himself.',
        'A trip to Doodh Kasi changes a man\'s life.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Himalayas',
        song: '',
        scene: '',
      },
    },
    {
      id: '24',
      title: '24',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Suriya',
      heroine: 'Samantha',
      director: 'Vikram Kumar',
      music: 'A. R. Rahman',
      villain: 'Suriya',
      banner: '2D Entertainment',
      genre: 'Sci-fi thriller',
      roles: ['Sethuraman', 'Sathya', 'Athreya'],   // check

      stats: { imdb: 7.9, songs: 5, runtime: 164 },   // check

      spoiler: [
        'A watch mechanic finds a watch that lets him travel through time, while his evil uncle wants it at any cost.',
        'Twin brothers, one a scientist and one a killer, fight over an invention that controls time.',
      ],
      dialogues: [],   // check

      clues: {   // check
        job: 'Watch mechanic',
        location: 'Mumbai',
        song: 'Kaalam Ika Ledu',
        scene: 'The hero freezes time at a cricket match and plays pranks on the frozen crowd',
      },
    },
    {
      id: 'a-aa',
      title: 'A Aa',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Nithiin',
      heroine: 'Samantha',
      director: 'Trivikram Srinivas',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: 'Haarika & Hassine Creations',
      genre: 'Romantic family drama',
      roles: ['Anand Vihari', 'Anasuya'],   // check

      stats: { imdb: 7.2, songs: 6, runtime: 155 },   // check

      spoiler: [
        'A rich girl runs away from her strict mother to spend time with her father\'s family in a village, and falls for her cousin.',
        'A girl discovers her mother has been keeping her away from her own relatives for years, and a cousin holds the key to the feud.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cousin who runs a family business',
        location: 'A village near Rajahmundry',
        song: 'Yellipoke Shyamala',
        scene: 'The heroine secretly runs away from home in a car with her father\'s permission',
      },
    },
    {
      id: 'babu-bangaram',
      title: 'Babu Bangaram',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Venkatesh',
      heroine: 'Nayanthara',
      director: 'Maruthi',
      music: 'Ghibran',
      villain: 'Sampath Raj',   // check
      banner: 'Sithara Entertainments',   // check
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.3, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A soft-hearted cop who cannot see anyone suffer falls for a girl whose family is hunted by a gang.',
        'A police officer known for his kindness helps a girl find her missing father.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Hyderabad',
        song: '',
        scene: 'A cop hugs a criminal after beating him up',
      },
    },
    {
      id: 'brahmotsavam',
      title: 'Brahmotsavam',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Samantha',
      director: 'Srikanth Addala',
      music: 'Mickey J. Meyer',
      villain: 'Rao Ramesh',
      banner: 'PVP Cinema',
      genre: 'Family drama',
      roles: [],

      stats: { imdb: 3, songs: 6, runtime: 170 },   // check

      spoiler: [
        'After his father\'s death, a young man travels across India to find his family\'s lost relatives.',
        'A man goes on a journey to trace seven generations of his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Paint company heir',
        location: 'Vijayawada',
        song: '',
        scene: 'A huge family gathers for a festival in one house',
      },
    },
    {
      id: 'dhruva',
      title: 'Dhruva',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Rakul Preet Singh',
      director: 'Surender Reddy',
      music: 'Hiphop Tamizha',
      villain: 'Arvind Swamy',
      banner: 'Geetha Arts',
      genre: 'Action thriller',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.6, songs: 5, runtime: 152 },   // check

      spoiler: [
        'An IPS officer secretly gathers information on the country\'s top criminals and targets the biggest one, a celebrated scientist.',
        'A cop and a brilliant villain play mind games through a hidden bug.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'IPS officer',
        location: 'Hyderabad',
        song: 'Neethone Dance',
        scene: 'A cop discovers a tiny tracking device in his own ear',
      },
    },
    {
      id: 'dictator',
      title: 'Dictator',
      aka: [],
      year: 2016,
      level: 'hard',

      hero: 'Balakrishna',
      heroine: 'Anjali',
      director: 'Sriwass',
      music: 'S. Thaman',
      villain: '',   // check
      banner: 'Eros International',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 4.3, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A supermarket manager turns out to be the head of a powerful business family.',
        'A quiet manager is really a businessman avenging his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Supermarket manager',
        location: 'Delhi',
        song: '',
        scene: 'A store manager reveals he owns the whole business',
      },
    },
    {
      id: 'gentleman',
      title: 'Gentleman',
      aka: [],
      year: 2016,
      level: 'hard',

      hero: 'Nani',
      heroine: 'Surabhi',   // check
      director: 'Mohan Krishna Indraganti',
      music: 'Mani Sharma',
      villain: 'Nani',
      banner: 'Sridevi Movies',
      genre: 'Thriller',
      roles: [],

      stats: { imdb: 7.3, songs: 5, runtime: 135 },   // check

      spoiler: [
        'Two women who meet on a flight discover that their boyfriends look exactly alike, and one of them may be a killer.',
        'A girl suspects her boyfriend\'s lookalike of murder.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Hyderabad',
        song: '',
        scene: 'Two women compare photos of their lookalike boyfriends',
      },
    },
    {
      id: 'janatha-garage',
      title: 'Janatha Garage',
      aka: [],
      year: 2016,
      level: 'easy',

      hero: 'Jr NTR',
      heroine: 'Samantha',
      director: 'Koratala Siva',
      music: 'Devi Sri Prasad',
      villain: 'Unni Mukundan',
      banner: 'Mythri Movie Makers',
      genre: 'Action drama',
      roles: ['Anand', 'Bujji', 'Sathyam'],   // check

      stats: { imdb: 7, songs: 5, runtime: 160 },

      spoiler: [
        'A mechanic who runs a workshop as a family for the poor stands with a young man who loves nature, and the two take on injustice together.',
        'A nature-loving student from Mumbai comes to Hyderabad and takes over a garage that repairs people\'s problems.',
      ],
      dialogues: ['Balavanthudu balahenudini bhayapetti bathakadam aanavaayithi. Kaani aa balahenudi pakkana kooda oka balam undi.'],

      clues: {   // check
        job: 'Environmental student',
        location: 'Hyderabad',
        song: 'Pakka Local',
        scene: 'A nature lover joins a workshop that also repairs people\'s problems',
      },
    },
    {
      id: 'kabali',
      title: 'Kabali',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Radhika Apte',
      director: 'Pa. Ranjith',
      music: 'Santhosh Narayanan',
      villain: 'Winston Chao',
      banner: 'V Creations',
      genre: 'Gangster drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.1, songs: 5, runtime: 152 },   // check

      spoiler: [
        'An ageing gangster released after 25 years in a Malaysian jail goes looking for his wife and the men who betrayed him.',
        'A don fights for the rights of Tamil workers in Malaysia.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Gangster',
        location: 'Malaysia',
        song: 'Neruppu Da',
        scene: 'A man walks out of prison after 25 years in a suit',
      },
    },
    {
      id: 'krishna-gaadi-veera-prema-gaadha',
      title: 'Krishna Gaadi Veera Prema Gaadha',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Mehreen Pirzada',
      director: 'Hanu Raghavapudi',
      music: 'Vishal Chandrashekhar',
      villain: '',
      banner: '14 Reels Entertainment',
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 7.1, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A cowardly village boy has to protect three children and his girlfriend from gangsters.',
        'A timid lover takes on gangsters for the first time.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Village youth',
        location: 'Hindupur',
        song: '',
        scene: '',
      },
    },
    {
      id: 'kshanam',
      title: 'Kshanam',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Adivi Sesh',
      heroine: 'Adah Sharma',
      director: 'Ravikanth Perepu',
      music: 'Sricharan Pakala',
      villain: '',
      banner: 'PVP Cinema',
      genre: 'Thriller',
      roles: ['Rishi', 'Swetha'],   // check

      stats: { imdb: 7.9, songs: 2, runtime: 127 },

      spoiler: [
        'A man returns to meet an old girlfriend who says her daughter is missing, but nobody believes a child ever existed.',
        'A man returns from the US to help his ex-girlfriend find her kidnapped daughter, but everyone says the girl never existed.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'NRI',
        location: 'Hyderabad',
        song: '',
        scene: 'A man returns to India to find his ex-girlfriend\'s missing daughter',
      },
    },
    {
      id: 'majnu',
      title: 'Majnu',
      aka: [],
      year: 2016,
      level: 'hard',

      hero: 'Nani',
      heroine: 'Anu Emmanuel',
      director: 'Virinchi Varma',
      music: 'Gopi Sundar',
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 6.3, songs: 5, runtime: 145 },   // check

      spoiler: [
        'An assistant director tells his new girlfriend about the first love he lost.',
        'A film assistant\'s love story told in flashback.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Assistant director',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'nannaku-prematho',
      title: 'Nannaku Prematho',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Jr NTR',
      heroine: 'Rakul Preet Singh',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: 'Jagapathi Babu',
      banner: 'Sri Venkateswara Cine Chitra',
      genre: 'Action thriller',
      roles: ['Abhiram', 'Divyanka', 'Krishna Murthy'],   // check

      stats: { imdb: 7.4, songs: 5, runtime: 168 },   // check

      spoiler: [
        'A son has thirty days to take revenge on the businessman who ruined his dying father.',
        'A clever son plays mind games with a billionaire in London.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Corporate trainer',
        location: 'London',
        song: 'Follow Follow',
        scene: 'A son takes on a billionaire in London for his dying father',
      },
    },
    {
      id: 'nenu-sailaja',
      title: 'Nenu Sailaja',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Ram Pothineni',
      heroine: 'Keerthy Suresh',
      director: 'Kishore Tirumala',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Sravanthi Movies',
      genre: 'Romantic drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A DJ who keeps getting rejected by girls falls for his childhood friend, who will not say yes.',
        'A young man\'s every proposal fails until he meets Sailaja.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'DJ',
        location: 'Vizag',
        song: '',
        scene: '',
      },
    },
    {
      id: 'oopiri',
      title: 'Oopiri',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: ['Nagarjuna', 'Karthi'],
      heroine: 'Tamannaah',
      director: 'Vamshi Paidipally',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'PVP Cinema',
      genre: 'Comedy drama',
      roles: ['Vikramaditya', 'Seenu', 'Keerthi'],   // check

      stats: { imdb: 7.9, songs: 4, runtime: 150 },

      spoiler: [
        'A rich man who cannot move his body hires a street-smart ex-convict as his caregiver, and the two change each other\'s lives.',
        'A paralysed billionaire hires an ex-convict as his caretaker, and they become best friends.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Caretaker',
        location: 'Hyderabad and Paris',
        song: '',
        scene: 'A paralysed billionaire hires an ex-convict as his caretaker',
      },
    },
    {
      id: 'pelli-choopulu',
      title: 'Pelli Choopulu',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Ritu Varma',
      director: 'Tharun Bhascker',
      music: 'Vivek Sagar',
      villain: '',
      banner: 'Dharmapatha Creations',   // check
      genre: 'Romantic comedy',
      roles: ['Prashanth', 'Chitra'],   // check

      stats: { imdb: 7.9, songs: 4, runtime: 139 },

      spoiler: [
        'A topper who gives up his career for a street food truck falls into a bumpy friendship that turns into love.',
        'A lazy young man and an ambitious girl get locked in a room during a bride-viewing and later start a food truck together.',
      ],
      dialogues: ['Naa saavu nenu sastha, neekenduku?'],

      clues: {   // check
        job: 'Food truck cook',
        location: 'Hyderabad',
        song: '',
        scene: 'A matchmaking visit to the wrong house leads to a food truck',
      },
    },
    {
      id: 'pittagoda',
      title: 'Pittagoda',
      aka: [],
      year: 2016,
      level: 'hard',

      hero: 'Vishwadev Rachakonda',   // check
      heroine: 'Punarnavi Bhupalam',   // check
      director: 'Anudeep K. V.',
      music: 'Pranam Kamlakhar',   // check
      villain: '',
      banner: '',
      genre: 'Comedy',
      roles: [],

      stats: { imdb: 6.3, songs: 4, runtime: 130 },   // check

      spoiler: [
        'A group of jobless friends in a small Telangana town spend their days doing nothing, until a cricket match.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Telangana village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'premam-2016',
      title: 'Premam',
      aka: ['Premam (2016)'],
      year: 2016,
      level: 'medium',

      hero: 'Naga Chaitanya',
      heroine: 'Shruti Haasan',
      director: 'Chandoo Mondeti',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'Sithara Entertainments',
      genre: 'Romantic comedy',
      roles: ['Vikram', 'Sithara', 'Suma'],   // check

      stats: { imdb: 6.8, songs: 6, runtime: 150 },   // check

      spoiler: [
        'A young man falls in love three times, from his school days to adulthood, in the Telugu remake of a Malayalam hit.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Chef',
        location: 'Rajahmundry',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sardaar-gabbar-singh',
      title: 'Sardaar Gabbar Singh',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Kajal Aggarwal',
      director: 'Bobby Kolli',
      music: 'Devi Sri Prasad',
      villain: 'Sharad Kelkar',
      banner: 'North Star Entertainment',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 4.2, songs: 5, runtime: 163 },   // check

      spoiler: [
        'The cop Gabbar Singh is posted to a mining town and falls for a princess while fighting a tyrant.',
        'A cop protects a royal girl from a ruthless king.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police inspector',
        location: 'Rattanpur',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sarrainodu',
      title: 'Sarrainodu',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Rakul Preet Singh',
      director: 'Boyapati Srinu',
      music: 'S. Thaman',
      villain: 'Aadhi Pinisetty',
      banner: 'Geetha Arts',
      genre: 'Action',
      roles: ['Gana', 'Mahalakshmi', 'Vairam Dhanush'],   // check

      stats: { imdb: 6.3, songs: 5, runtime: 159 },   // check

      spoiler: [
        'A man with a short fuse and a heart of gold takes on a corrupt politician, one fight at a time.',
        'An ex-army man with a short temper fights a ruthless chief minister\'s son.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Ex-army officer',
        location: 'Hyderabad',
        song: 'Blockbuster',
        scene: 'An ex-army man takes on a chief minister\'s son',
      },
    },
    {
      id: 'soggade-chinni-nayana',
      title: 'Soggade Chinni Nayana',
      aka: [],
      year: 2016,
      level: 'medium',

      hero: 'Nagarjuna',
      heroine: 'Ramya Krishnan',
      director: 'Kalyan Krishna',
      music: 'Anup Rubens',
      villain: '',
      banner: 'Annapurna Studios',
      genre: 'Fantasy comedy',
      roles: ['Bangarraju', 'Satyabhama'],   // check

      stats: { imdb: 6.8, songs: 5, runtime: 146 },   // check

      spoiler: [
        'The ghost of a flirtatious village man comes back to fix his son\'s marriage.',
        'A father\'s spirit helps his shy son save his marriage.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Doctor',
        location: 'A Godavari village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'srirastu-subhamastu',
      title: 'Srirastu Subhamastu',
      aka: [],
      year: 2016,
      level: 'hard',

      hero: 'Allu Sirish',
      heroine: 'Lavanya Tripathi',
      director: 'Parasuram',
      music: 'S. Thaman',
      villain: '',
      banner: 'Geetha Arts',
      genre: 'Romantic family drama',
      roles: [],

      stats: { imdb: 6.3, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A rich young man hides his background to win a middle-class girl and prove her father wrong.',
        'A man pretends to be poor to win respect.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'supreme',
      title: 'Supreme',
      aka: [],
      year: 2016,
      level: 'hard',

      hero: 'Sai Dharam Tej',
      heroine: 'Raashii Khanna',
      director: 'Anil Ravipudi',
      music: 'Sai Karthik',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5.8, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A taxi driver protects a boy who is the heir to a property worth crores.',
        'A cab driver and a kid on the run.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Taxi driver',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'arjun-reddy',
      title: 'Arjun Reddy',
      aka: [],
      year: 2017,
      level: 'easy',

      hero: 'Vijay Deverakonda',
      heroine: 'Shalini Pandey',
      director: 'Sandeep Reddy Vanga',
      music: 'Radhan',
      villain: '',
      banner: 'Bhadrakali Pictures',
      genre: 'Romantic drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8, songs: 7, runtime: 182 },

      spoiler: [
        'A short-tempered, brilliant medical student falls for a junior at college. When they are forced apart, he spirals into alcohol and self-destruction.',
        'A brilliant surgeon with uncontrollable anger destroys himself after his girlfriend is married off to someone else.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Surgeon',
        location: 'Hyderabad and Mangalore',
        song: 'Telisiney Na Nuvvey',
        scene: 'A brilliant surgeon spirals after heartbreak',
      },
    },
    {
      id: 'baahubali-2-the-conclusion',
      title: 'Baahubali 2: The Conclusion',
      aka: [],
      year: 2017,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Anushka Shetty',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Rana Daggubati',
      banner: 'Arka Media Works',
      genre: 'Epic action drama',
      roles: ['Amarendra Baahubali', 'Devasena', 'Bhallaladeva'],   // check

      stats: { imdb: 8.2, songs: 5, runtime: 167 },

      spoiler: [
        'The crowned prince of Mahishmati is exiled by his own family, and the whole kingdom is left asking one question about the man who stabbed him.',
        'The answer to why the most loyal man in the kingdom stabbed his prince in the back.',
      ],
      dialogues: ['Naa maate shaasanam.'],

      clues: {   // check
        job: 'Prince',
        location: 'Mahishmati',
        song: 'Saahore Baahubali',
        scene: 'The question the whole country asked about Kattappa gets answered',
      },
    },
    {
      id: 'dj-duvvada-jagannadham',
      title: 'DJ: Duvvada Jagannadham',
      aka: ['Duvvada Jagannadham', 'DJ'],
      year: 2017,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Pooja Hegde',
      director: 'Harish Shankar',
      music: 'Devi Sri Prasad',
      villain: 'Rao Ramesh',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 5.4, songs: 5, runtime: 156 },   // check

      spoiler: [
        'A Brahmin cook who caters for weddings is secretly a vigilante who punishes criminals.',
        'A priest-like cook leads a double life as an undercover fighter.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cook and caterer',
        location: 'Vijayawada and Abu Dhabi',
        song: 'Seeti Maar',
        scene: 'A Brahmin cook removes his sacred thread and fights goons',
      },
    },
    {
      id: 'fidaa',
      title: 'Fidaa',
      aka: [],
      year: 2017,
      level: 'easy',

      hero: 'Varun Tej',
      heroine: 'Sai Pallavi',
      director: 'Sekhar Kammula',
      music: 'Shakthikanth Karthick',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Romantic drama',
      roles: ['Varun', 'Bhanumathi'],   // check

      stats: { imdb: 7.4, songs: 6, runtime: 147 },   // check

      spoiler: [
        'A Telangana village girl with a strong will clashes and bonds with an NRI doctor who has come home for his brother\'s wedding.',
        'A strong-willed village girl and an NRI doctor fall in love at a wedding but cannot agree on where to live.',
      ],
      dialogues: ['Bhanumathi... okkate piece.'],

      clues: {   // check
        job: 'Medical student',
        location: 'Banswada village',
        song: 'Vachinde',
        scene: 'An NRI falls for a spirited girl from a Telangana village',
      },
    },
    {
      id: 'gautamiputra-satakarni',
      title: 'Gautamiputra Satakarni',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Balakrishna',
      heroine: 'Shriya Saran',
      director: 'Krish Jagarlamudi',
      music: 'Chirantan Bhatt',
      villain: '',
      banner: 'First Frame Entertainments',
      genre: 'Historical action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.1, songs: 4, runtime: 135 },   // check

      spoiler: [
        'A Satavahana emperor sets out to unite all the kingdoms of India under one rule.',
        'An ancient Telugu king fights battles across the land to end war forever.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Emperor',
        location: 'Amaravati',
        song: '',
        scene: 'A king leads a battle on a ship at sea',
      },
    },
    {
      id: 'jai-lava-kusa',
      title: 'Jai Lava Kusa',
      aka: [],
      year: 2017,
      level: 'easy',

      hero: 'Jr NTR',
      heroine: 'Raashii Khanna',
      director: 'Bobby Kolli',
      music: 'Devi Sri Prasad',
      villain: 'Jr NTR',
      banner: 'N.T.R. Arts',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.5, songs: 5, runtime: 155 },   // check

      spoiler: [
        'Three brothers separated by fate, one of whom is bitter and violent, plan a showdown that ends in a family reunion.',
        'A stammering brother, rejected as a child, grows into a feared don and takes revenge on his twin brothers.',
      ],
      dialogues: ['Aa Ravanudini champaalante samudram daatala... ee Ravanudini champaalante samudramantha dhairyam undala?'],

      clues: {   // check
        job: 'Bank manager, thief and don',
        location: 'Hyderabad and Odisha',
        song: 'Swing Zara',
        scene: 'A stammering villain performs a stage play as Ravana',
      },
    },
    {
      id: 'jaya-janaki-nayaka',
      title: 'Jaya Janaki Nayaka',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Bellamkonda Srinivas',
      heroine: 'Rakul Preet Singh',
      director: 'Boyapati Srinu',
      music: 'Devi Sri Prasad',
      villain: 'Jagapathi Babu',   // check
      banner: '',   // check
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5, songs: 5, runtime: 160 },   // check

      spoiler: [
        'A young man protects a girl who has lost her family in an honour killing.',
        'A man takes on powerful businessmen to save a girl.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'katamarayudu',
      title: 'Katamarayudu',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Shruti Haasan',
      director: 'Kishore Kumar Pardasany',
      music: 'Anup Rubens',
      villain: 'Rao Ramesh',
      banner: 'North Star Entertainment',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 4.8, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A kind-hearted village strongman refuses to bow down to anybody, even when it means taking on his own brothers\' enemies.',
        'A village strongman who hates the idea of marriage falls in love and protects his girlfriend\'s family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Village strongman',
        location: 'Rayalaseema',
        song: '',
        scene: '',
      },
    },
    {
      id: 'khaidi-no-150',
      title: 'Khaidi No. 150',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Kajal Aggarwal',
      director: 'V. V. Vinayak',
      music: 'Devi Sri Prasad',
      villain: 'Tarun Arora',
      banner: 'Konidela Production Company',
      genre: 'Action drama',
      roles: ['Kaththi Seenu', 'Lakshmi'],   // check

      stats: { imdb: 6.1, songs: 5, runtime: 148 },   // check

      spoiler: [
        'A prisoner who looks identical to a farmer-activist takes his place and fights the corporate land grab that destroyed a village.',
        'A petty criminal takes the place of his lookalike, a farmer leader, to fight a cola company grabbing village land.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Escaped prisoner',
        location: 'Hyderabad',
        song: 'Ammadu Let\'s Do Kummudu',
        scene: 'Farmers hang upside down from a water tank in protest',
      },
    },
    {
      id: 'mahanubhavudu',
      title: 'Mahanubhavudu',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Sharwanand',
      heroine: 'Mehreen Pirzada',
      director: 'Maruthi',
      music: 'S. Thaman',
      villain: '',
      banner: 'UV Creations',
      genre: 'Romantic comedy',
      roles: ['Anand', 'Meghana'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A man with obsessive-compulsive disorder about cleanliness falls for a girl from a village.',
        'A neat freak must survive a dusty village to win his girlfriend.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software employee',
        location: 'Hyderabad and a village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'malli-raava',
      title: 'Malli Raava',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Sumanth',
      heroine: 'Aakanksha Singh',
      director: 'Gowtam Tinnanuri',
      music: 'Shravan Bharadwaj',
      villain: '',
      banner: '',   // check
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 7.6, songs: 4, runtime: 135 },   // check

      spoiler: [
        'A man and a woman who loved each other as teenagers meet again years later.',
        'A love story told across three stages of life.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software employee',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'mental-madhilo',
      title: 'Mental Madhilo',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Sree Vishnu',
      heroine: 'Nivetha Pethuraj',
      director: 'Vivek Athreya',
      music: 'Prashanth R. Vihari',
      villain: '',
      banner: '',   // check
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 7.5, songs: 4, runtime: 130 },   // check

      spoiler: [
        'A young man who can never make decisions finds himself torn between two girls.',
        'An indecisive man gets engaged and then meets someone else.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Software employee',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'middle-class-abbayi',
      title: 'Middle Class Abbayi',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Sai Pallavi',
      director: 'Venu Sriram',
      music: 'Devi Sri Prasad',
      villain: 'Vijay Varma',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action drama',
      roles: ['Nani', 'Pallavi', 'Siva'],   // check

      stats: { imdb: 6, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A middle-class young man moves in with his brother\'s wife, a transport officer, and protects her from a criminal.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Warangal',
        song: '',
        scene: '',
      },
    },
    {
      id: 'nene-raju-nene-mantri',
      title: 'Nene Raju Nene Mantri',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Rana Daggubati',
      heroine: 'Kajal Aggarwal',
      director: 'Teja',
      music: 'Anup Rubens',
      villain: '',
      banner: 'Suresh Productions',
      genre: 'Political drama',
      roles: ['Jogendra', 'Radha'],   // check

      stats: { imdb: 6.9, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A moneylender goes into politics to win respect for his wife and becomes ruthless along the way.',
        'A man climbs from village sarpanch to chief minister for love.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Moneylender',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'nenu-local',
      title: 'Nenu Local',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Keerthy Suresh',
      director: 'Trinadha Rao Nakkina',
      music: 'Devi Sri Prasad',
      villain: 'Naveen Chandra',
      banner: 'Sri Venkateswara Creations',
      genre: 'Romantic comedy',
      roles: ['Babu', 'Keerthi', 'Siddharth'],   // check

      stats: { imdb: 6.7, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A carefree engineering graduate chases a girl whose father wants a police officer as her husband.',
        'A local boy competes with a cop to win a girl.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Engineering graduate',
        location: 'Vizag',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ninnu-kori',
      title: 'Ninnu Kori',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Nivetha Thomas',
      director: 'Shiva Nirvana',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'DVV Entertainment',
      genre: 'Romantic drama',
      roles: ['Uma', 'Pallavi', 'Arun'],   // check

      stats: { imdb: 7.6, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A man stays with his ex-girlfriend and her husband in America to prove she still loves him.',
        'An old flame visits a married couple for ten days.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'PhD student',
        location: 'Vizag and USA',
        song: '',
        scene: '',
      },
    },
    {
      id: 'paisa-vasool',
      title: 'Paisa Vasool',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Balakrishna',
      heroine: 'Shriya Saran',
      director: 'Puri Jagannadh',
      music: 'Anup Rubens',
      villain: '',
      banner: 'Bhavya Creations',
      genre: 'Action comedy',
      roles: [],

      stats: { imdb: 5, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A Hyderabad rowdy named Theda Singh is hired by the police to kill a dreaded international gangster.',
        'A crazy man is recruited for an underworld mission in Portugal.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Rowdy',
        location: 'Portugal and Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'raja-the-great',
      title: 'Raja The Great',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Mehreen Pirzada',
      director: 'Anil Ravipudi',
      music: 'Sai Karthik',
      villain: 'Vivan Bhatena',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.4, songs: 5, runtime: 152 },   // check

      spoiler: [
        'A blind man joins the police on a secret mission to protect a girl from a gangster.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Blind police recruit',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'rarandoi-veduka-chudham',
      title: 'Rarandoi Veduka Chudham',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Naga Chaitanya',
      heroine: 'Rakul Preet Singh',
      director: 'Kalyan Krishna',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Annapurna Studios',
      genre: 'Romantic family drama',
      roles: ['Shiva', 'Bhramaramba'],   // check

      stats: { imdb: 6.2, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A young man falls for a village girl whose father and his father were once friends turned enemies.',
        'Two families with an old fight and a new romance.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'singham-3',
      title: 'Singham 3',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Suriya',
      heroine: 'Anushka Shetty',
      director: 'Hari',
      music: 'Harris Jayaraj',
      villain: 'Thakur Anoop Singh',
      banner: '',
      genre: 'Action',
      roles: [],

      stats: { imdb: 5.2, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A police officer goes to Australia to bring back a criminal who dumped toxic waste in India.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Vizag and Australia',
        song: '',
        scene: '',
      },
    },
    {
      id: 'spyder',
      title: 'Spyder',
      aka: [],
      year: 2017,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Rakul Preet Singh',
      director: 'A. R. Murugadoss',
      music: 'Harris Jayaraj',
      villain: 'S. J. Suryah',
      banner: 'NVR Cinema',
      genre: 'Spy thriller',
      roles: ['Shiva', 'Charlie', 'Bhairavudu'],   // check

      stats: { imdb: 5.6, songs: 5, runtime: 145 },   // check

      spoiler: [
        'An intelligence officer who taps phone calls to stop crimes faces a serial killer who enjoys the sound of crying.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Intelligence officer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'winner',
      title: 'Winner',
      aka: [],
      year: 2017,
      level: 'hard',

      hero: 'Sai Dharam Tej',
      heroine: 'Rakul Preet Singh',
      director: 'Gopichand Malineni',
      music: 'S. Thaman',
      villain: '',
      banner: '',   // check
      genre: 'Sports drama',
      roles: [],

      stats: { imdb: 4.5, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A young man becomes a horse racer to win back his estranged father and a girl.',
        'A son races horses to reconcile with his father.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Horse racer',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: '2-0',
      title: '2.0',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Rajinikanth',
      heroine: 'Amy Jackson',
      director: 'Shankar',
      music: 'A. R. Rahman',
      villain: 'Akshay Kumar',
      banner: 'Lyca Productions',
      genre: 'Sci-fi action',
      roles: ['Vaseegaran', 'Nila', 'Pakshi Rajan'],   // check

      stats: { imdb: 6.1, songs: 3, runtime: 147 },   // check

      spoiler: [
        'Mobile phones start flying out of people\'s hands across a city, and a scientist revives his old robot to fight the force behind it.',
        'A bird lover\'s angry spirit takes revenge on the mobile industry, and only a dismantled robot can stop him.',
      ],
      dialogues: [],

      clues: {
        job: 'Scientist',
        location: 'Chennai',
        song: 'Endhira Logathu Sundariye',
        scene: 'Thousands of phones fly out of people\'s hands and join together in the sky',
      },
    },
    {
      id: 'agnyaathavaasi',
      title: 'Agnyaathavaasi',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Keerthy Suresh',   // check
      director: 'Trivikram Srinivas',
      music: 'Anirudh Ravichander',
      villain: 'Aadhi Pinisetty',
      banner: 'Haarika & Hassine Creations',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 3.9, songs: 6, runtime: 158 },   // check

      spoiler: [
        'The secret son of a business tycoon joins the company in disguise to find who killed his father and brother.',
        'A man raised away from his rich family takes a job in their company under a false name.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Employee in a corporate company',
        location: 'Hyderabad',
        song: 'Kodakaa Koteswar Rao',
        scene: 'The hero sings a funny song in the company office in front of the staff',
      },
    },
    {
      id: 'aravinda-sametha-veera-raghava',
      title: 'Aravinda Sametha Veera Raghava',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Jr NTR',
      heroine: 'Pooja Hegde',
      director: 'Trivikram Srinivas',
      music: 'S. Thaman',
      villain: 'Jagapathi Babu',
      banner: 'Haarika & Hassine Creations',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.2, songs: 6, runtime: 169 },

      spoiler: [
        'After his father is killed, the son of a faction leader tries to end a bloody family war in Rayalaseema.',
        'A man from a faction family moves to the city to learn how to end violence without fighting.',
      ],
      dialogues: ['Kantapaddava kanikaristaanemo, ventapaddava narikestha.'],

      clues: {   // check
        job: 'Son of a faction leader',
        location: 'Rayalaseema',
        song: 'Peniviti',
        scene: 'A faction leader\'s son tries to end a bloody feud',
      },
    },
    {
      id: 'awe',
      title: 'Awe!',
      aka: [],
      year: 2018,
      level: 'hard',

      hero: '',
      heroine: 'Kajal Aggarwal',
      director: 'Prasanth Varma',
      music: 'Mark K. Robin',
      villain: '',
      banner: 'Wall Poster Cinema',
      genre: 'Psychological thriller',
      roles: [],

      stats: { imdb: 7.5, songs: 1, runtime: 111 },   // check

      spoiler: [
        'Several strange stories unfold in one restaurant on one evening, and all of them are connected in a shocking way.',
        'A talking fish and tree, a time traveller and a magician share the same restaurant.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'A restaurant',
        song: '',
        scene: 'A fish and a bonsai tree talk to each other in a restaurant kitchen',
      },
    },
    {
      id: 'bharat-ane-nenu',
      title: 'Bharat Ane Nenu',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Kiara Advani',
      director: 'Koratala Siva',
      music: 'Devi Sri Prasad',
      villain: 'Prakash Raj',
      banner: 'DVV Entertainment',
      genre: 'Political drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.5, songs: 6, runtime: 173 },

      spoiler: [
        'A young man studying abroad returns home after his father\'s death and unexpectedly becomes chief minister, determined to run the state by his own honest rules.',
        'An Oxford graduate who becomes chief minister by accident tries to clean up the state his father ran.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Chief minister',
        location: 'Andhra Pradesh',
        song: 'Vachaadayyo Saami',
        scene: 'A young man becomes chief minister after his father dies',
      },
    },
    {
      id: 'devadas',
      title: 'Devadas',
      aka: [],
      year: 2018,
      level: 'hard',

      hero: ['Nagarjuna', 'Nani'],
      heroine: 'Rashmika Mandanna',
      director: 'Sriram Aditya',
      music: 'Mani Sharma',
      villain: '',
      banner: 'Vyjayanthi Movies',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.1, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A don hiding from the police becomes friends with a kind doctor who treats him.',
        'A doctor who cannot refuse a patient ends up treating a dreaded gangster.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Doctor',
        location: 'Hyderabad',
        song: '',
        scene: 'A doctor removes a bullet from a don in secret',
      },
    },
    {
      id: 'ee-nagaraniki-emaindi',
      title: 'Ee Nagaraniki Emaindi',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Vishwak Sen',
      heroine: 'Simran Choudhary',
      director: 'Tharun Bhascker',
      music: 'Vivek Sagar',
      villain: '',
      banner: 'Suresh Productions',
      genre: 'Comedy',
      roles: ['Vivek', 'Karthik', 'Kaushik'],   // check

      stats: { imdb: 8, songs: 4, runtime: 140 },   // check

      spoiler: [
        'Four friends who once dreamed of making short films go on a drunken trip to Goa and rediscover their friendship.',
        'Old friends get together for a bachelor party and end up shooting a short film.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Bartender',
        location: 'Hyderabad and Goa',
        song: '',
        scene: 'Four friends end up in Goa and make a short film',
      },
    },
    {
      id: 'geetha-govindam',
      title: 'Geetha Govindam',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Vijay Deverakonda',
      heroine: 'Rashmika Mandanna',
      director: 'Parasuram',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'GA2 Pictures',
      genre: 'Romantic comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.7, songs: 7, runtime: 143 },

      spoiler: [
        'A mild-mannered lecturer kisses a sleeping stranger on a bus ride. When they meet again, her family turns out to be the one his sister is about to marry into.',
        'A lecturer who accidentally kisses a sleeping woman on a bus spends the film trying to win her forgiveness.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College lecturer',
        location: 'Hyderabad and Kakinada',
        song: 'Inkem Inkem Inkem Kaavaale',
        scene: 'A kiss on a bus starts a big misunderstanding',
      },
    },
    {
      id: 'goodachari',
      title: 'Goodachari',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Adivi Sesh',
      heroine: 'Sobhita Dhulipala',
      director: 'Sashi Kiran Tikka',
      music: 'Sricharan Pakala',
      villain: 'Jagapathi Babu',
      banner: 'Abhishek Pictures',   // check
      genre: 'Spy thriller',
      roles: ['Gopi', 'Sameera'],   // check

      stats: { imdb: 7.9, songs: 3, runtime: 147 },

      spoiler: [
        'A young man joins a secret agency for a sacred mission, and soon learns that the real enemy may be among his own.',
        'A spy-in-training is framed for killing his own team and has to clear his name.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Spy',
        location: 'Hyderabad and Chittagong',
        song: '',
        scene: 'A new recruit of a secret agency is framed as a traitor',
      },
    },
    {
      id: 'kaala',
      title: 'Kaala',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Huma Qureshi',
      director: 'Pa. Ranjith',
      music: 'Santhosh Narayanan',
      villain: 'Nana Patekar',
      banner: 'Wunderbar Films',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.9, songs: 5, runtime: 166 },   // check

      spoiler: [
        'The leader of a Mumbai slum stands against a politician who wants to take over the land.',
        'A slum\'s protector fights for the land his people live on.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Slum leader',
        location: 'Dharavi',
        song: '',
        scene: '',
      },
    },
    {
      id: 'kgf-chapter-1',
      title: 'KGF: Chapter 1',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Yash',
      heroine: 'Srinidhi Shetty',
      director: 'Prashanth Neel',
      music: 'Ravi Basrur',
      villain: 'Ramachandra Raju',
      banner: 'Hombale Films',
      genre: 'Period action',
      roles: ['Rocky', 'Reena', 'Garuda'],   // check

      stats: { imdb: 8.2, songs: 4, runtime: 155 },   // check

      spoiler: [
        'A boy from the streets of Bombay grows into a feared gangster and enters gold mines to kill their ruler.',
        'Rocky goes undercover as a slave in the Kolar mines.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Gangster',
        location: 'Kolar Gold Fields',
        song: 'Salaam Rocky Bhai',
        scene: 'A man walks through a mine full of slaves with a hammer',
      },
    },
    {
      id: 'mahanati',
      title: 'Mahanati',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Dulquer Salmaan',
      heroine: 'Keerthy Suresh',
      director: 'Nag Ashwin',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: 'Vyjayanthi Movies',
      genre: 'Biographical drama',
      roles: ['Savitri', 'Gemini Ganesan', 'Madhuravani'],   // check

      stats: { imdb: 8.4, songs: 6, runtime: 177 },

      spoiler: [
        'A journalist traces the life of a legendary actress, from her days as a child artist to being the biggest star in the industry, and her fall.',
        'Two reporters dig into the life of a legendary actress who rose to the top and lost everything.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Actress',
        location: 'Madras',
        song: 'Mooga Manasulu',
        scene: 'The rise and fall of the actress Savitri',
      },
    },
    {
      id: 'naa-peru-surya-naa-illu-india',
      title: 'Naa Peru Surya Naa Illu India',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Allu Arjun',
      heroine: 'Anu Emmanuel',
      director: 'Vakkantham Vamsi',
      music: 'Vishal–Shekhar',
      villain: 'Sarath Kumar',
      banner: 'Ramalakshmi Cine Creations',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6, songs: 5, runtime: 167 },   // check

      spoiler: [
        'A soldier with an uncontrollable temper must get a psychologist\'s approval to return to the border.',
        'An angry army man has to control himself for 21 days.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Army soldier',
        location: 'Vizag',
        song: '',
        scene: '',
      },
    },
    {
      id: 'padi-padi-leche-manasu',
      title: 'Padi Padi Leche Manasu',
      aka: [],
      year: 2018,
      level: 'hard',

      hero: 'Sharwanand',
      heroine: 'Sai Pallavi',
      director: 'Hanu Raghavapudi',
      music: 'Vishal Chandrashekhar',
      villain: '',
      banner: 'Sri Lakshmi Venkateswara Cinemas',
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 6.2, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A footballer and a medical student fall in love in Kolkata, and an earthquake in Nepal changes everything.',
        'Lovers separated by a natural disaster meet again.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Footballer',
        location: 'Kolkata and Nepal',
        song: '',
        scene: '',
      },
    },
    {
      id: 'rangasthalam',
      title: 'Rangasthalam',
      aka: [],
      year: 2018,
      level: 'easy',

      hero: 'Ram Charan',
      heroine: 'Samantha',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: 'Jagapathi Babu',
      banner: 'Mythri Movie Makers',
      genre: 'Period action drama',
      roles: ['Chitti Babu', 'Ramalakshmi', 'Presidentgaaru'],   // check

      stats: { imdb: 8.2, songs: 7, runtime: 179 },

      spoiler: [
        'In a 1980s village, a hard-of-hearing young man who runs a water pump for farmers is caught between his elder brother and the tyrannical village president.',
        'A partly deaf young man in a 1980s village helps his brother fight the village president in an election.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Water pump operator',
        location: 'A Godavari village in the 1980s',
        song: 'Rangamma Mangamma',
        scene: 'A man with hearing trouble in a 1980s village',
      },
    },
    {
      id: 'rx-100',
      title: 'RX 100',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Kartikeya Gummakonda',
      heroine: 'Payal Rajput',
      director: 'Ajay Bhupathi',
      music: 'Chaitan Bharadwaj',
      villain: '',
      banner: 'KCW',   // check
      genre: 'Romantic action',
      roles: ['Shiva', 'Indu'],   // check

      stats: { imdb: 7.4, songs: 5, runtime: 152 },   // check

      spoiler: [
        'A young man waits for the girl who left him, not knowing the shocking truth about her.',
        'A village boy, a bike and a girl who used him.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Village youth',
        location: 'Athreyapuram',
        song: 'Pillaa Raa',
        scene: 'A young man waits by a road on his bike for years',
      },
    },
    {
      id: 'sammohanam',
      title: 'Sammohanam',
      aka: [],
      year: 2018,
      level: 'hard',

      hero: 'Sudheer Babu',
      heroine: 'Aditi Rao Hydari',
      director: 'Mohan Krishna Indraganti',
      music: 'Vivek Sagar',
      villain: '',
      banner: 'Sridevi Movies',
      genre: 'Romantic drama',
      roles: ['Vijay', 'Sameera'],   // check

      stats: { imdb: 7.6, songs: 5, runtime: 130 },   // check

      spoiler: [
        'A children\'s book illustrator who dislikes films falls for a film star who shoots at his house.',
        'A movie shoot in a house brings an artist and an actress together.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Illustrator',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'savyasachi',
      title: 'Savyasachi',
      aka: [],
      year: 2018,
      level: 'hard',

      hero: 'Naga Chaitanya',
      heroine: 'Nidhhi Agerwal',
      director: 'Chandoo Mondeti',
      music: 'M. M. Keeravani',
      villain: 'R. Madhavan',
      banner: 'Mythri Movie Makers',
      genre: 'Action thriller',
      roles: [],

      stats: { imdb: 5, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A man whose left hand has a mind of its own, because of a twin he absorbed before birth, fights a psycho who kidnaps his niece.',
        'A hero with vanishing twin syndrome battles a masked villain.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Ad filmmaker',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'taxiwaala',
      title: 'Taxiwaala',
      aka: [],
      year: 2018,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Priyanka Jawalkar',
      director: 'Rahul Sankrityan',
      music: 'Jakes Bejoy',
      villain: '',
      banner: 'GA2 Pictures',
      genre: 'Fantasy horror',
      roles: ['Shiva', 'Anu'],   // check

      stats: { imdb: 7.2, songs: 4, runtime: 135 },   // check

      spoiler: [
        'A young man buys a second-hand car and soon learns that it comes with a ghost who has something to settle.',
        'A cab driver discovers his second-hand car is haunted and drives itself.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cab driver',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'tholi-prema-2018',
      title: 'Tholi Prema',
      aka: ['Tholi Prema (2018)'],
      year: 2018,
      level: 'medium',

      hero: 'Varun Tej',
      heroine: 'Raashii Khanna',
      director: 'Venky Atluri',
      music: 'S. Thaman',
      villain: '',
      banner: 'Sri Venkateswara Cine Chitra',
      genre: 'Romantic drama',
      roles: ['Aditya', 'Varsha'],   // check

      stats: { imdb: 7.1, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A short-tempered young man and a girl fall in love on a train, break up and meet again years later in London.',
        'A love story across a train, a college and London.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Architect',
        location: 'Hyderabad and London',
        song: '',
        scene: '',
      },
    },
    {
      id: 'touch-chesi-chudu',
      title: 'Touch Chesi Chudu',
      aka: [],
      year: 2018,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Raashii Khanna',
      director: 'Vikram Sirikonda',
      music: 'Pritam',
      villain: '',
      banner: '',   // check
      genre: 'Action',
      roles: [],

      stats: { imdb: 4.5, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A businessman in Puducherry hides his past as a fierce police officer.',
        'A cop leaves the force and returns to finish a case.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Puducherry',
        song: '',
        scene: '',
      },
    },
    {
      id: 'agent-sai-srinivasa-athreya',
      title: 'Agent Sai Srinivasa Athreya',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Naveen Polishetty',
      heroine: 'Shruti Sharma',
      director: 'Swaroop RSJ',
      music: 'Mark K. Robin',
      villain: '',
      banner: '',   // check
      genre: 'Comedy thriller',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.4, songs: 2, runtime: 148 },   // check

      spoiler: [
        'A small-time detective in Nellore stumbles onto a case of unclaimed dead bodies that is much bigger than he thought.',
        'A self-styled private eye who mostly solves petty cases gets framed while investigating a series of deaths near a railway track.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Private detective',
        location: 'Nellore',
        song: '',
        scene: 'A detective from Nellore looks into unidentified bodies near railway tracks',
      },
    },
    {
      id: 'brochevarevarura',
      title: 'Brochevarevarura',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: 'Sree Vishnu',
      heroine: 'Nivetha Thomas',
      director: 'Vivek Athreya',
      music: 'Vivek Sagar',
      villain: '',
      banner: 'Manyam Productions',
      genre: 'Crime comedy',
      roles: ['Rahul', 'Mithra', 'Vishal'],   // check

      stats: { imdb: 8, songs: 3, runtime: 140 },   // check

      spoiler: [
        'Three friends find themselves in a film school in a series of wacky events when a kidnapping makes them heroes.',
        'Three college failures plan a fake kidnapping to help a friend, while a film director narrates a story that mirrors theirs.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'College student',
        location: 'Hyderabad',
        song: '',
        scene: 'Three friends stage a fake kidnapping of their friend',
      },
    },
    {
      id: 'chitralahari',
      title: 'Chitralahari',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: 'Sai Dharam Tej',
      heroine: 'Kalyani Priyadarshan',
      director: 'Kishore Tirumala',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Mythri Movie Makers',
      genre: 'Drama',
      roles: [],

      stats: { imdb: 6, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A young man whose every invention and relationship fails struggles to find success.',
        'An engineer named Vijay keeps failing until he finally believes in himself.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed engineer',
        location: 'Vizag',
        song: '',
        scene: 'An inventor presents an accident-alert device that no one wants',
      },
    },
    {
      id: 'dear-comrade',
      title: 'Dear Comrade',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Rashmika Mandanna',
      director: 'Bharat Kamma',
      music: 'Justin Prabhakaran',
      villain: '',
      banner: 'Mythri Movie Makers',
      genre: 'Romantic drama',
      roles: ['Bobby', 'Lilly'],   // check

      stats: { imdb: 7.3, songs: 5, runtime: 170 },   // check

      spoiler: [
        'A student leader with a fiery temper has to help the woman he loves recover after a traumatic experience.',
        'A student leader with anger issues and a state-level cricketer fall in love, until she faces harassment.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Student union leader',
        location: 'Kakinada',
        song: 'Kadalalle',
        scene: 'A hot-headed student leader and a state-level cricketer',
      },
    },
    {
      id: 'evaru',
      title: 'Evaru',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Adivi Sesh',
      heroine: 'Regina Cassandra',
      director: 'Venkat Ramji',
      music: 'Sricharan Pakala',
      villain: '',
      banner: 'PVP Cinema',
      genre: 'Crime thriller',
      roles: ['Vikram Vasudev', 'Sameera'],   // check

      stats: { imdb: 7.9, songs: 2, runtime: 120 },

      spoiler: [
        'A police officer investigates a rape, and the more he digs, the less the story matches what the witness says happened.',
        'A corrupt cop interrogates a woman accused of killing a senior police officer, and her story keeps changing.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Coorg',
        song: '',
        scene: 'A cop questions a woman at her house through one night',
      },
    },
    {
      id: 'f2-fun-and-frustration',
      title: 'F2: Fun and Frustration',
      aka: [],
      year: 2019,
      level: 'easy',

      hero: ['Venkatesh', 'Varun Tej'],
      heroine: 'Tamannaah',
      director: 'Anil Ravipudi',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Comedy',
      roles: ['Venky', 'Harika', 'Varun'],   // check

      stats: { imdb: 6.5, songs: 5, runtime: 148 },   // check

      spoiler: [
        'Two brothers-in-law who are tired of their wives\' demands try to run away from them and cause even more trouble.',
        'Two henpecked men leave their wives and go to Europe, hoping to make them realise their value.',
      ],
      dialogues: ['That is mahalakshmi.'],   // check

      clues: {   // check
        job: 'Assistant to an MLA',
        location: 'Hyderabad and Europe',
        song: 'Rechipodham Brother',
        scene: 'Two frustrated husbands escape to Europe',
      },
    },
    {
      id: 'gaddalakonda-ganesh',
      title: 'Gaddalakonda Ganesh',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Varun Tej',
      heroine: 'Pooja Hegde',
      director: 'Harish Shankar',
      music: 'Mickey J. Meyer',
      villain: 'Varun Tej',
      banner: '14 Reels Plus',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.7, songs: 5, runtime: 170 },   // check

      spoiler: [
        'A young filmmaker wants to make a film about a real gangster and gets close to the dangerous man himself.',
        'A director asks a feared rowdy to act in his film.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Gangster',
        location: 'Gaddalakonda',
        song: 'Elluvochi Godaramma',
        scene: 'A gangster agrees to act in a film about himself',
      },
    },
    {
      id: 'gang-leader',
      title: 'Gang Leader',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Priyanka Arul Mohan',
      director: 'Vikram Kumar',
      music: 'Anirudh Ravichander',
      villain: 'Kartikeya Gummakonda',
      banner: 'Mythri Movie Makers',
      genre: 'Comedy thriller',
      roles: ['Pencil Parthasarathy', 'Priya', 'Dev'],   // check

      stats: { imdb: 7, songs: 5, runtime: 155 },   // check

      spoiler: [
        'Five women of different ages hire a revenge-thriller writer to help them find the man who killed someone they loved.',
        'A novelist who copies Hollywood plots leads a group of women on a revenge mission.',
      ],
      dialogues: ['Cheyyi choosava entha rough ga undo... rough aadinchestha.'],

      clues: {   // check
        job: 'Crime novelist',
        location: 'Hyderabad',
        song: '',
        scene: 'A grandmother and her gang plan a revenge',
      },
    },
    {
      id: 'ismart-shankar',
      title: 'iSmart Shankar',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Ram Pothineni',
      heroine: 'Nidhhi Agerwal',
      director: 'Puri Jagannadh',
      music: 'Mani Sharma',
      villain: '',
      banner: 'Puri Connects',
      genre: 'Sci-fi action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.2, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A Hyderabad hitman gets a dead cop\'s memories implanted in his brain.',
        'A street-smart killer starts remembering another man\'s life.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Hitman',
        location: 'Hyderabad',
        song: 'iSmart Title Song',
        scene: '',
      },
    },
    {
      id: 'jersey',
      title: 'Jersey',
      aka: [],
      year: 2019,
      level: 'easy',

      hero: 'Nani',
      heroine: 'Shraddha Srinath',
      director: 'Gowtam Tinnanuri',
      music: 'Anirudh Ravichander',
      villain: '',
      banner: 'Sithara Entertainments',
      genre: 'Sports drama',
      roles: ['Arjun', 'Sara'],   // check

      stats: { imdb: 8.4, songs: 4, runtime: 160 },

      spoiler: [
        'A talented cricketer who quit the game after failure decides to return in his late thirties to give his young son the one thing he asked for.',
        'A failed cricketer returns to the game at 36 to buy his son an Indian team shirt.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed cricketer',
        location: 'Hyderabad',
        song: 'Adhento Gaani Vunnapaatuga',
        scene: 'A failed cricketer returns to the game for his son',
      },
    },
    {
      id: 'kabir-singh',
      title: 'Kabir Singh',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Shahid Kapoor',
      heroine: 'Kiara Advani',
      director: 'Sandeep Reddy Vanga',
      music: 'Mithoon',   // check
      villain: '',
      banner: 'T-Series',
      genre: 'Romantic drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7, songs: 7, runtime: 172 },   // check

      spoiler: [
        'A Hindi remake of a Telugu cult hit about an angry surgeon who self-destructs after a break-up.',
        'A doctor with a temper spirals after his girlfriend\'s family rejects him.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Surgeon',
        location: 'Delhi and Mumbai',
        song: 'Bekhayali',
        scene: 'A surgeon operates on a patient while drunk',
      },
    },
    {
      id: 'kalki-2019',
      title: 'Kalki',
      aka: ['Kalki (2019)'],
      year: 2019,
      level: 'hard',

      hero: 'Rajasekhar',
      heroine: 'Adah Sharma',
      director: 'Prasanth Varma',
      music: 'Shravan Bharadwaj',
      villain: '',
      banner: '',   // check
      genre: 'Crime thriller',
      roles: [],

      stats: { imdb: 6.2, songs: 3, runtime: 140 },   // check

      spoiler: [
        'A police officer investigates a murder in a small town in 1983 that is linked to its powerful family.',
        'A cop arrives in Kollapur to solve a mystery death.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Kollapur',
        song: '',
        scene: '',
      },
    },
    {
      id: 'maharshi',
      title: 'Maharshi',
      aka: [],
      year: 2019,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Pooja Hegde',
      director: 'Vamshi Paidipally',
      music: 'Devi Sri Prasad',
      villain: 'Jagapathi Babu',
      banner: 'Sri Venkateswara Creations',
      genre: 'Drama',
      roles: ['Rishi', 'Pooja', 'Ravi'],   // check

      stats: { imdb: 7.3, songs: 6, runtime: 177 },

      spoiler: [
        'A billionaire on top of the world returns to his village and has to face a friend he left behind and a cause he forgot.',
        'A billionaire CEO returns to his college friend\'s village to help farmers and pay back an old debt.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'CEO',
        location: 'Hyderabad and a village',
        song: 'Padara Padara',
        scene: 'A CEO returns to save his friend\'s village and its farmers',
      },
    },
    {
      id: 'majili',
      title: 'Majili',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Naga Chaitanya',
      heroine: 'Samantha',
      director: 'Shiva Nirvana',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'Shine Screens',
      genre: 'Romantic drama',
      roles: ['Poorna', 'Sravani', 'Anshu'],   // check

      stats: { imdb: 7.3, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A cricketer whose life crumbled after a lost love slowly rebuilds when a young woman steps in and teaches him how to care again.',
        'A failed cricketer who drinks to forget his first love is married to a woman who loves him silently.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Cricketer',
        location: 'Vizag',
        song: 'Priyathama Priyathama',
        scene: 'A drunk man plays street cricket with kids',
      },
    },
    {
      id: 'manmadhudu-2',
      title: 'Manmadhudu 2',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: 'Nagarjuna',
      heroine: 'Rakul Preet Singh',
      director: 'Rahul Ravindran',
      music: 'Chaitan Bharadwaj',
      villain: '',
      banner: 'Manam Enterprises',
      genre: 'Romantic comedy',
      roles: ['Sam', 'Avanthika'],   // check

      stats: { imdb: 4.5, songs: 4, runtime: 155 },   // check

      spoiler: [
        'A playboy in Portugal hires a woman to pretend to be his fiancée to stop his family pushing him to marry.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Perfumer',
        location: 'Portugal',
        song: '',
        scene: '',
      },
    },
    {
      id: 'mathu-vadalara',
      title: 'Mathu Vadalara',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Sri Simha Koduri',
      heroine: '',
      director: 'Ritesh Rana',
      music: 'Kaala Bhairava',
      villain: '',
      banner: 'Clap Entertainment',
      genre: 'Comedy thriller',
      roles: ['Babu', 'Yesu'],   // check

      stats: { imdb: 7.6, songs: 1, runtime: 130 },   // check

      spoiler: [
        'A rookie delivery agent is dragged into a messy murder case with his friend in a night of dark humour.',
        'A courier delivery boy who steals small amounts from customers gets trapped at a murder scene.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Delivery agent',
        location: 'Hyderabad',
        song: '',
        scene: 'A delivery boy\'s small scam goes wrong inside an apartment',
      },
    },
    {
      id: 'mr-majnu',
      title: 'Mr. Majnu',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: 'Akhil Akkineni',
      heroine: 'Nidhhi Agerwal',
      director: 'Venky Atluri',
      music: 'S. Thaman',
      villain: '',
      banner: 'Sree Venkateswara Cinemas',
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 5, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A flirt falls for a girl who dislikes him, and finds out what real love means.',
        'A playboy in London has to prove he can commit.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Playboy',
        location: 'London',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ntr-kathanayakudu',
      title: 'NTR: Kathanayakudu',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: 'Balakrishna',
      heroine: 'Vidya Balan',
      director: 'Krish Jagarlamudi',
      music: 'M. M. Keeravani',
      villain: '',
      banner: 'N. B. K. Films',
      genre: 'Biographical drama',
      roles: ['NTR', 'Basavatarakam'],   // check

      stats: { imdb: 6.8, songs: 6, runtime: 171 },   // check

      spoiler: [
        'The life of a legendary actor, from a government clerk to the biggest film star of Telugu cinema.',
        'A son plays his own father, the screen\'s Lord Krishna.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Actor',
        location: 'Madras',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ntr-mahanayakudu',
      title: 'NTR: Mahanayakudu',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: 'Balakrishna',
      heroine: 'Vidya Balan',
      director: 'Krish Jagarlamudi',
      music: 'M. M. Keeravani',
      villain: '',
      banner: 'N. B. K. Films',
      genre: 'Biographical drama',
      roles: ['NTR', 'Basavatarakam'],   // check

      stats: { imdb: 6.5, songs: 4, runtime: 128 },   // check

      spoiler: [
        'A film star starts his own party and becomes chief minister within nine months.',
        'A superstar\'s political journey and his wife\'s illness.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Politician',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'peta',
      title: 'Peta',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Simran',
      director: 'Karthik Subbaraj',
      music: 'Anirudh Ravichander',
      villain: 'Vijay Sethupathi',
      banner: 'Sun Pictures',
      genre: 'Action thriller',
      roles: ['Kaali', 'Mangalam', 'Jithu'],   // check

      stats: { imdb: 7.2, songs: 5, runtime: 171 },   // check

      spoiler: [
        'A hostel warden in a hill station hides a violent past connected to a powerful family in Uttar Pradesh.',
        'A warden protects a young couple from a gangster.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Hostel warden',
        location: 'Darjeeling',
        song: '',
        scene: '',
      },
    },
    {
      id: 'prati-roju-pandage',
      title: 'Prati Roju Pandage',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Sai Dharam Tej',
      heroine: 'Raashii Khanna',
      director: 'Maruthi',
      music: 'S. Thaman',
      villain: '',
      banner: 'GA2 Pictures',
      genre: 'Family comedy drama',
      roles: [],

      stats: { imdb: 6.8, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A grandson makes his dying grandfather\'s last days happy, while his busy family stays abroad.',
        'A young man brings his scattered family home for his grandfather.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'NRI',
        location: 'Rajahmundry',
        song: '',
        scene: '',
      },
    },
    {
      id: 'saaho',
      title: 'Saaho',
      aka: [],
      year: 2019,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Shraddha Kapoor',
      director: 'Sujeeth',
      music: 'Ghibran',
      villain: 'Neil Nitin Mukesh',
      banner: 'UV Creations',
      genre: 'Action thriller',
      roles: ['Ashok', 'Amritha'],   // check

      stats: { imdb: 5.2, songs: 4, runtime: 170 },   // check

      spoiler: [
        'An undercover cop and a master thief in Mumbai end up in the middle of a deadly heist in a city ruled by crime lords.',
        'An undercover officer chases a big heist in a city controlled by a crime syndicate called Roy Group.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Undercover police officer',
        location: 'Waaji city',
        song: 'Psycho Saiyaan',
        scene: 'An undercover agent, a black box and a crime syndicate',
      },
    },
    {
      id: 'sye-raa-narasimha-reddy',
      title: 'Sye Raa Narasimha Reddy',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Nayanthara',
      director: 'Surender Reddy',
      music: 'Amit Trivedi',
      villain: '',
      banner: 'Konidela Production Company',
      genre: 'Historical action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7, songs: 3, runtime: 170 },   // check

      spoiler: [
        'A chieftain of Rayalaseema rises against the British, long before the freedom struggle became a national movement.',
        'A Rayalaseema chieftain leads one of the first revolts against the British East India Company.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Chieftain',
        location: 'Rayalaseema',
        song: '',
        scene: 'A ruler revolts against the British years before 1857',
      },
    },
    {
      id: 'venky-mama',
      title: 'Venky Mama',
      aka: [],
      year: 2019,
      level: 'hard',

      hero: ['Venkatesh', 'Naga Chaitanya'],
      heroine: ['Payal Rajput', 'Raashii Khanna'],
      director: 'Bobby Kolli',
      music: 'S. Thaman',
      villain: '',
      banner: 'Suresh Productions',
      genre: 'Family action comedy',
      roles: ['Venkataratnam', 'Karthik'],   // check

      stats: { imdb: 5.5, songs: 5, runtime: 150 },   // check

      spoiler: [
        'An uncle raises his nephew against an astrologer\'s warning that one of them will die because of the other.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Farmer and army officer',
        location: 'A village and Kashmir',
        song: '',
        scene: '',
      },
    },
    {
      id: 'vinaya-vidheya-rama',
      title: 'Vinaya Vidheya Rama',
      aka: [],
      year: 2019,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Kiara Advani',
      director: 'Boyapati Srinu',
      music: 'Devi Sri Prasad',
      villain: 'Vivek Oberoi',
      banner: 'DVV Entertainment',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 2, songs: 5, runtime: 147 },   // check

      spoiler: [
        'An orphan raised by four brothers protects them from a ruthless warlord in Bihar.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Vizag and Bihar',
        song: '',
        scene: '',
      },
    },

    // ── 2020s ─────────────────────────────────────────────

    {
      id: 'ala-vaikunthapurramuloo',
      title: 'Ala Vaikunthapurramuloo',
      aka: [],
      year: 2020,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Pooja Hegde',
      director: 'Trivikram Srinivas',
      music: 'S. Thaman',
      villain: 'Samuthirakani',
      banner: 'Geetha Arts',
      genre: 'Family action comedy',
      roles: ['Bantu', 'Amulya', 'Appala Naidu'],   // check

      stats: { imdb: 7.3, songs: 7, runtime: 165 },

      spoiler: [
        'A man raised by a strict, stingy father takes a job in a rich businessman\'s company, unaware that this is the family he was actually born into.',
        'A middle-class man finds out he was swapped at birth with a rich man\'s son, and quietly goes to work for his real family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Office employee',
        location: 'Hyderabad',
        song: 'Butta Bomma',
        scene: 'Two babies are swapped at birth in a hospital',
      },
    },
    {
      id: 'bheeshma',
      title: 'Bheeshma',
      aka: [],
      year: 2020,
      level: 'medium',

      hero: 'Nithiin',
      heroine: 'Rashmika Mandanna',
      director: 'Venky Kudumula',
      music: 'Mahati Swara Sagar',
      villain: 'Jisshu Sengupta',
      banner: 'Sithara Entertainments',
      genre: 'Romantic comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A single young man suddenly finds himself named the head of a big organic farming company.',
        'A jobless meme-maker becomes the CEO of a company and fights a rival who uses chemicals.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed meme-maker',
        location: 'Hyderabad',
        song: 'Whattey Beauty',
        scene: 'A jobless guy is named CEO of a company by mistake',
      },
    },
    {
      id: 'color-photo',
      title: 'Color Photo',
      aka: [],
      year: 2020,
      level: 'medium',

      hero: 'Suhas',
      heroine: 'Chandini Chowdary',
      director: 'Sandeep Raj',
      music: 'Kaala Bhairava',
      villain: 'Sunil',
      banner: 'Amrutha Productions',
      genre: 'Romantic drama',
      roles: ['Jayakrishna', 'Deepthi'],   // check

      stats: { imdb: 7.6, songs: 4, runtime: 128 },   // check

      spoiler: [
        'A dark-skinned engineering student and a fair girl fall in love, but her brother, a police officer, will not allow it.',
        'A love story in the 1990s that is broken by prejudice about skin colour.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Engineering student',
        location: 'Machilipatnam',
        song: 'Tharagathi Gadhi',
        scene: 'A boy sells milk to pay his college fees',
      },
    },
    {
      id: 'darbar',
      title: 'Darbar',
      aka: [],
      year: 2020,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Nayanthara',
      director: 'A. R. Murugadoss',
      music: 'Anirudh Ravichander',
      villain: 'Suniel Shetty',
      banner: 'Lyca Productions',
      genre: 'Action thriller',
      roles: ['Aaditya Arunachalam', 'Lilly', 'Hari Chopra'],   // check

      stats: { imdb: 5.4, songs: 4, runtime: 159 },   // check

      spoiler: [
        'A tough police commissioner in Mumbai takes on a drug lord, and loses someone close to him.',
        'An encounter specialist goes after a drug gang that targets his daughter.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police commissioner',
        location: 'Mumbai',
        song: '',
        scene: 'A cop does a stylish walk in a police station',
      },
    },
    {
      id: 'disco-raja',
      title: 'Disco Raja',
      aka: [],
      year: 2020,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Nabha Natesh',
      director: 'V. I. Anand',
      music: 'S. Thaman',
      villain: 'Bobby Simha',
      banner: 'SRT Entertainments',
      genre: 'Sci-fi action',
      roles: [],

      stats: { imdb: 5, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A dead man is brought back to life by scientists, but has no memory of his past as a gangster.',
        'A scientific experiment revives a man frozen in the 1980s.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Revived gangster',
        location: 'Ladakh and Chennai',
        song: '',
        scene: 'Scientists revive a frozen body found in the snow',
      },
    },
    {
      id: 'hit-the-first-case',
      title: 'HIT: The First Case',
      aka: [],
      year: 2020,
      level: 'medium',

      hero: 'Vishwak Sen',
      heroine: 'Ruhani Sharma',
      director: 'Sailesh Kolanu',
      music: 'Vivek Sagar',
      villain: '',
      banner: 'Wall Poster Cinema',
      genre: 'Crime thriller',
      roles: ['Vikram', 'Neha'],   // check

      stats: { imdb: 7.6, songs: 1, runtime: 125 },   // check

      spoiler: [
        'A cop with a traumatic past investigates the disappearance of a young woman, while his own girlfriend goes missing.',
        'A Homicide Intervention Team officer hunts for two missing women.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Hyderabad',
        song: '',
        scene: 'A cop has panic attacks near fire',
      },
    },
    {
      id: 'sarileru-neekevvaru',
      title: 'Sarileru Neekevvaru',
      aka: [],
      year: 2020,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Rashmika Mandanna',
      director: 'Anil Ravipudi',
      music: 'Devi Sri Prasad',
      villain: 'Prakash Raj',
      banner: 'AK Entertainments',
      genre: 'Action comedy',
      roles: ['Ajay Krishna', 'Samskruthi', 'Nagendra'],   // check

      stats: { imdb: 6.2, songs: 6, runtime: 169 },

      spoiler: [
        'An army major on a mission to escort a family ends up taking on a ruthless businessman across a long train ride.',
        'An army major delivers news of a soldier\'s injury to his family in Kurnool and stays to protect them from a minister.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Army major',
        location: 'Kurnool',
        song: 'Mind Block',
        scene: 'An army major travels to Kurnool, with a long comedy episode on a train',
      },
    },
    {
      id: 'solo-brathuke-so-better',
      title: 'Solo Brathuke So Better',
      aka: [],
      year: 2020,
      level: 'hard',

      hero: 'Sai Dharam Tej',
      heroine: 'Nabha Natesh',
      director: 'Subbu',
      music: 'S. Thaman',
      villain: '',
      banner: 'Sri Venkateswara Cine Chitra',
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 5.3, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A young man who preaches that staying single is best changes his mind when he meets a girl.',
        'A man who leads a singles club falls in love.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'v',
      title: 'V',
      aka: [],
      year: 2020,
      level: 'hard',

      hero: ['Nani', 'Sudheer Babu'],
      heroine: 'Aditi Rao Hydari',
      director: 'Mohan Krishna Indraganti',
      music: 'Amit Trivedi',
      villain: 'Nani',
      banner: 'Sri Venkateswara Creations',
      genre: 'Action thriller',
      roles: ['Vishnu', 'Aditya', 'Apoorva'],   // check

      stats: { imdb: 5.4, songs: 4, runtime: 140 },   // check

      spoiler: [
        'A killer challenges a celebrated cop to stop him before he murders his next target.',
        'A cop and a killer play cat and mouse.',
      ],
      dialogues: ['Sollaapu... dammunte nannu aapu.'],

      clues: {   // check
        job: '',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'world-famous-lover',
      title: 'World Famous Lover',
      aka: [],
      year: 2020,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Raashii Khanna',
      director: 'Kranthi Madhav',
      music: 'Gopi Sundar',
      villain: '',
      banner: 'Creative Commercials',
      genre: 'Romantic drama',
      roles: [],

      stats: { imdb: 4, songs: 5, runtime: 150 },   // check

      spoiler: [
        'A man\'s love life through four chapters is told through his heartbreak and the women who changed him.',
        'A writer imagines his love life through several stories after his girlfriend leaves him.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Writer',
        location: 'Hyderabad and Paris',
        song: '',
        scene: '',
      },
    },
    {
      id: 'akhanda',
      title: 'Akhanda',
      aka: [],
      year: 2021,
      level: 'easy',

      hero: 'Balakrishna',
      heroine: 'Pragya Jaiswal',
      director: 'Boyapati Srinu',
      music: 'S. Thaman',
      villain: 'Srikanth',
      banner: 'Dwaraka Creations',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.1, songs: 5, runtime: 167 },

      spoiler: [
        'A fearless Aghora steps in to protect a girl and a district from a corrupt mining mafia, and he has a very different twin brother.',
        'A farmer who fights a mining mafia gets help from his twin brother, an Aghora who lives among the dead in Kashi.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Farmer and Aghora',
        location: 'Anantapur and Kashi',
        song: 'Jai Balayya',
        scene: 'A man appears as a fierce Aghora',
      },
    },
    {
      id: 'jathi-ratnalu',
      title: 'Jathi Ratnalu',
      aka: [],
      year: 2021,
      level: 'easy',

      hero: 'Naveen Polishetty',
      heroine: 'Faria Abdullah',
      director: 'Anudeep K. V.',
      music: 'Radhan',
      villain: '',
      banner: 'Swapna Cinema',
      genre: 'Comedy',
      roles: ['Srikanth', 'Chitti'],   // check

      stats: { imdb: 7.6, songs: 4, runtime: 148 },   // check

      spoiler: [
        'Three innocent friends from a small town move to Hyderabad and get arrested for an attempt on a minister\'s life.',
        'Three clueless men from Jogipet end up in a big political case.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young men',
        location: 'Jogipet and Hyderabad',
        song: 'Chitti',
        scene: 'Three friends from a small town land in jail in Hyderabad',
      },
    },
    {
      id: 'kondapolam',
      title: 'Kondapolam',
      aka: [],
      year: 2021,
      level: 'hard',

      hero: 'Vaisshnav Tej',
      heroine: 'Rakul Preet Singh',
      director: 'Krish Jagarlamudi',
      music: 'M. M. Keeravani',
      villain: '',
      banner: 'First Frame Entertainments',
      genre: 'Adventure drama',
      roles: [],

      stats: { imdb: 6.7, songs: 4, runtime: 140 },   // check

      spoiler: [
        'A shepherd boy who failed to get a job takes his family\'s sheep to the forest and learns lessons for life.',
        'A graduate goes with his grandfather\'s flock into a forest full of danger.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Shepherd',
        location: 'Nallamala forest',
        song: '',
        scene: '',
      },
    },
    {
      id: 'krack',
      title: 'Krack',
      aka: [],
      year: 2021,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Shruti Haasan',
      director: 'Gopichand Malineni',
      music: 'S. Thaman',
      villain: 'Samuthirakani',
      banner: 'Saraswathi Films',
      genre: 'Action thriller',
      roles: ['Pothuraju Veera Shankar', 'Kalyani', 'Katari'],   // check

      stats: { imdb: 7.2, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A tough police officer in Ongole takes on a dreaded gangster and his network.',
        'A cop and a criminal clash over a small incident that turns into a war.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Ongole',
        song: 'Bhoomi Badhalai',
        scene: 'A cop fights in a crowded market',
      },
    },
    {
      id: 'love-story',
      title: 'Love Story',
      aka: [],
      year: 2021,
      level: 'medium',

      hero: 'Naga Chaitanya',
      heroine: 'Sai Pallavi',
      director: 'Sekhar Kammula',
      music: 'Pawan Ch',
      villain: 'Rajeev Kanakala',
      banner: 'Sree Venkateswara Cinemas',
      genre: 'Romantic drama',
      roles: ['Revanth', 'Mounika'],   // check

      stats: { imdb: 7, songs: 5, runtime: 159 },   // check

      spoiler: [
        'A boy from an oppressed community and a girl from a rich family find music in each other and fight for the right to be together.',
        'A dancer from a lower caste and a girl from a dominant caste run a dance studio and face caste prejudice and a secret.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Dance instructor',
        location: 'Armoor and Hyderabad',
        song: 'Saranga Dariya',
        scene: 'Two young people start a fitness studio together',
      },
    },
    {
      id: 'maha-samudram',
      title: 'Maha Samudram',
      aka: [],
      year: 2021,
      level: 'hard',

      hero: ['Sharwanand', 'Siddharth'],
      heroine: 'Aditi Rao Hydari',
      director: 'Ajay Bhupathi',
      music: 'Chaitan Bharadwaj',
      villain: '',
      banner: 'AK Entertainments',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 4.7, songs: 4, runtime: 155 },   // check

      spoiler: [
        'Two friends in Vizag go separate ways and one becomes a smuggler.',
        'A friendship broken by crime and love by the sea.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Smuggler',
        location: 'Vizag',
        song: '',
        scene: '',
      },
    },
    {
      id: 'narappa',
      title: 'Narappa',
      aka: [],
      year: 2021,
      level: 'hard',

      hero: 'Venkatesh',
      heroine: 'Priyamani',
      director: 'Srikanth Addala',
      music: 'Mani Sharma',
      villain: '',
      banner: 'Suresh Productions',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.2, songs: 3, runtime: 155 },   // check

      spoiler: [
        'A farmer who has avoided violence for years has to protect his son, who killed a landlord.',
        'A peaceful father goes on the run with his family.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Farmer',
        location: 'Anantapur',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pushpa-the-rise',
      title: 'Pushpa: The Rise',
      aka: [],
      year: 2021,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Rashmika Mandanna',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: 'Fahadh Faasil',
      banner: 'Mythri Movie Makers',
      genre: 'Action drama',
      roles: ['Pushpa Raj', 'Srivalli', 'Bhanwar Singh Shekhawat'],   // check

      stats: { imdb: 7.6, songs: 6, runtime: 179 },

      spoiler: [
        'A daily-wage labourer in the forests of Seshachalam rises through the red sandalwood smuggling trade on sheer nerve, chasing the respect his family name never had.',
        'A coolie in the red sandalwood trade rises to the top of a smuggling syndicate.',
      ],
      dialogues: ['Pushpa ante flower anukuntunnara? Fire!'],

      clues: {   // check
        job: 'Coolie',
        location: 'Seshachalam forest',
        song: 'Srivalli',
        scene: 'A labourer rises through the red sandalwood smuggling trade',
      },
    },
    {
      id: 'rang-de',
      title: 'Rang De',
      aka: [],
      year: 2021,
      level: 'hard',

      hero: 'Nithiin',
      heroine: 'Keerthy Suresh',
      director: 'Venky Atluri',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Sithara Entertainments',
      genre: 'Romantic comedy',
      roles: ['Arjun', 'Anu'],   // check

      stats: { imdb: 6.2, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A boy who has always found his neighbour girl annoying is forced to marry her.',
        'Childhood rivals end up as husband and wife.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Architect',
        location: 'Hyderabad and Milan',
        song: '',
        scene: '',
      },
    },
    {
      id: 'shyam-singha-roy',
      title: 'Shyam Singha Roy',
      aka: [],
      year: 2021,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Sai Pallavi',
      director: 'Rahul Sankrityan',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: 'Niharika Entertainment',
      genre: 'Period drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.9, songs: 5, runtime: 157 },   // check

      spoiler: [
        'A modern filmmaker is accused of plagiarism, and the story of an earlier writer bleeds into his own life.',
        'A young filmmaker accused of copying a famous writer\'s works finds out about his previous life in 1970s Bengal.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Filmmaker',
        location: 'Hyderabad and Kolkata',
        song: 'Pranavalaya',
        scene: 'A filmmaker discovers his past life as a Bengali writer',
      },
    },
    {
      id: 'tuck-jagadish',
      title: 'Tuck Jagadish',
      aka: [],
      year: 2021,
      level: 'hard',

      hero: 'Nani',
      heroine: 'Ritu Varma',
      director: 'Shiva Nirvana',
      music: 'S. Thaman',
      villain: '',
      banner: 'Shine Screens',
      genre: 'Family drama',
      roles: [],

      stats: { imdb: 5.6, songs: 5, runtime: 145 },   // check

      spoiler: [
        'A young man becomes a village officer to settle a land dispute that has broken his family.',
        'A son tries to reunite his family after his father\'s death.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Village revenue officer',
        location: 'Bhoodevipuram',
        song: '',
        scene: '',
      },
    },
    {
      id: 'uppena',
      title: 'Uppena',
      aka: [],
      year: 2021,
      level: 'medium',

      hero: 'Vaisshnav Tej',
      heroine: 'Krithi Shetty',
      director: 'Buchi Babu Sana',
      music: 'Devi Sri Prasad',
      villain: 'Vijay Sethupathi',
      banner: 'Mythri Movie Makers',
      genre: 'Romantic drama',
      roles: ['Aasi', 'Bebamma', 'Rayanam'],   // check

      stats: { imdb: 6.8, songs: 5, runtime: 147 },   // check

      spoiler: [
        'A fisherman\'s son falls for the daughter of a proud village head who will do anything to protect his honour.',
        'A love story in a coastal village and a brutal punishment.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Fisherman',
        location: 'Uppada',
        song: 'Nee Kannu Neeli Samudram',
        scene: 'A fisherman\'s son loves a powerful landlord\'s daughter',
      },
    },
    {
      id: 'vakeel-saab',
      title: 'Vakeel Saab',
      aka: [],
      year: 2021,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Shruti Haasan',
      director: 'Venu Sriram',
      music: 'S. Thaman',
      villain: 'Prakash Raj',
      banner: 'Sri Venkateswara Creations',
      genre: 'Legal drama',
      roles: ['Satyadev', 'Pallavi', 'Nanda'],   // check

      stats: { imdb: 7, songs: 4, runtime: 154 },   // check

      spoiler: [
        'Three girls are accused of a crime, and a retired lawyer who has stayed silent for years returns to court to defend them.',
        'A suspended lawyer fights in court for three young women falsely accused after they resisted assault.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Lawyer',
        location: 'Hyderabad',
        song: 'Maguva Maguva',
        scene: 'A suspended lawyer defends three women in court',
      },
    },
    {
      id: 'zombie-reddy',
      title: 'Zombie Reddy',
      aka: [],
      year: 2021,
      level: 'hard',

      hero: 'Teja Sajja',
      heroine: 'Anandhi',
      director: 'Prasanth Varma',
      music: 'Mark K. Robin',
      villain: '',
      banner: '',
      genre: 'Zombie comedy',
      roles: [],

      stats: { imdb: 6, songs: 3, runtime: 130 },   // check

      spoiler: [
        'A group of friends visit a village in Rayalaseema just as a zombie outbreak hits.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Game developer',
        location: 'Rayalaseema',
        song: '',
        scene: '',
      },
    },
    {
      id: 'acharya',
      title: 'Acharya',
      aka: [],
      year: 2022,
      level: 'easy',

      hero: ['Chiranjeevi', 'Ram Charan'],
      heroine: 'Pooja Hegde',
      director: 'Koratala Siva',
      music: 'Mani Sharma',
      villain: 'Sonu Sood',
      banner: 'Konidela Production Company',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 4, songs: 5, runtime: 154 },   // check

      spoiler: [
        'A former Naxalite arrives at a temple town to protect its people from a corrupt businessman who wants the land.',
        'A comrade comes to Dharmasthali to finish the fight that a young man named Siddha started.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Former Naxalite',
        location: 'Dharmasthali',
        song: 'Laahe Laahe',
        scene: 'Two comrades fight side by side in a forest at night',
      },
    },
    {
      id: 'ante-sundaraniki',
      title: 'Ante Sundaraniki',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Nazriya Nazim',
      director: 'Vivek Athreya',
      music: 'Vivek Sagar',
      villain: '',
      banner: 'Mythri Movie Makers',
      genre: 'Romantic comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.9, songs: 5, runtime: 176 },   // check

      spoiler: [
        'A Brahmin boy and a Christian girl invent one lie after another to get their conservative families to agree to their marriage.',
        'A man whose family controls every part of his life tells a huge lie to marry the girl he loves.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Photographer',
        location: 'Amalapuram',
        song: 'Entha Chithram',
        scene: 'A Brahmin boy and a Christian girl lie to both families to get married',
      },
    },
    {
      id: 'bangarraju',
      title: 'Bangarraju',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: ['Nagarjuna', 'Naga Chaitanya'],
      heroine: 'Krithi Shetty',
      director: 'Kalyan Krishna',
      music: 'Anup Rubens',
      villain: '',
      banner: 'Annapurna Studios',
      genre: 'Fantasy comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 5.5, songs: 5, runtime: 160 },   // check

      spoiler: [
        'The spirit of a playful grandfather comes back from heaven to help his grandson win over a girl and save the village temple.',
        'A ghost grandfather and his flirtatious grandson team up against villagers who want the temple\'s treasure.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Village youth',
        location: 'Sivapuram',
        song: 'Laddunda',
        scene: 'A grandfather\'s spirit possesses his grandson to romance a girl',
      },
    },
    {
      id: 'beast',
      title: 'Beast',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Vijay',
      heroine: 'Pooja Hegde',
      director: 'Nelson Dilipkumar',
      music: 'Anirudh Ravichander',
      villain: 'Shine Tom Chacko',
      banner: 'Sun Pictures',
      genre: 'Action comedy',
      roles: ['Veera Raghavan', 'Preethi'],   // check

      stats: { imdb: 5.1, songs: 4, runtime: 155 },   // check

      spoiler: [
        'A former spy is trapped inside a shopping mall that terrorists have taken over.',
        'An ex-RAW agent on a security job fights hostage-takers from inside a mall.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Former RAW agent',
        location: 'Chennai',
        song: 'Arabic Kuthu',
        scene: 'A spy flies a fighter jet out of a city',
      },
    },
    {
      id: 'bheemla-nayak',
      title: 'Bheemla Nayak',
      aka: [],
      year: 2022,
      level: 'easy',

      hero: ['Pawan Kalyan', 'Rana Daggubati'],
      heroine: 'Nithya Menen',
      director: 'Saagar K. Chandra',
      music: 'S. Thaman',
      villain: 'Rana Daggubati',
      banner: 'Sithara Entertainments',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.9, songs: 5, runtime: 145 },   // check

      spoiler: [
        'An honest cop and a retired army havildar with pride as big as the other\'s go head to head over a small mistake.',
        'A forest cop and a retired army man fall into an ego war over a minor arrest.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police sub-inspector',
        location: 'A forest checkpost',
        song: 'Lala Bheemla',
        scene: 'A clash of egos between a police officer and an ex-army man',
      },
    },
    {
      id: 'bimbisara',
      title: 'Bimbisara',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Kalyan Ram',
      heroine: 'Catherine Tresa',
      director: 'Mallidi Vassishta',
      music: 'M. M. Keeravani',
      villain: 'Vivan Bhatena',   // check
      banner: 'N.T.R. Arts',
      genre: 'Fantasy action',
      roles: [],

      stats: { imdb: 7.1, songs: 4, runtime: 146 },   // check

      spoiler: [
        'A cruel ancient king is thrown into the present day by a magic mirror and learns humility.',
        'A tyrant from 500 BC lands in modern Hyderabad, where his treasure is being hunted.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Ancient king',
        location: 'Trigartala and Hyderabad',
        song: '',
        scene: 'A king walks out of a mirror into the modern world',
      },
    },
    {
      id: 'dhamaka',
      title: 'Dhamaka',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Ravi Teja',
      heroine: 'Sreeleela',
      director: 'Trinadha Rao Nakkina',
      music: 'Bheems Ceciroleo',
      villain: 'Jayaram',
      banner: 'People Media Factory',
      genre: 'Action comedy',
      roles: ['Swami', 'Pranavi'],   // check

      stats: { imdb: 5.9, songs: 5, runtime: 145 },   // check

      spoiler: [
        'Two lookalikes, one a jobless young man and one a company heir, are mixed up while a businessman tries to grab a company.',
        'A girl loves one lookalike, while a company needs the other.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Unemployed young man',
        location: 'Hyderabad',
        song: 'Jinthaak',
        scene: 'Two lookalikes are confused at a wedding',
      },
    },
    {
      id: 'dj-tillu',
      title: 'DJ Tillu',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Siddhu Jonnalagadda',
      heroine: 'Neha Shetty',
      director: 'Vimal Krishna',
      music: 'Sricharan Pakala',
      villain: '',
      banner: 'Sithara Entertainments',
      genre: 'Crime comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.2, songs: 3, runtime: 125 },   // check

      spoiler: [
        'A local DJ with a big mouth falls for a mysterious singer and gets dragged into a murder.',
        'A small-time DJ helps a girl hide a body and keeps lying to the police.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'DJ',
        location: 'Hyderabad',
        song: '',
        scene: 'A local DJ is pulled into a murder by his girlfriend',
      },
    },
    {
      id: 'f3-fun-and-frustration',
      title: 'F3: Fun and Frustration',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: ['Venkatesh', 'Varun Tej'],
      heroine: 'Tamannaah',
      director: 'Anil Ravipudi',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Family comedy',
      roles: ['Venky', 'Harika', 'Varun'],   // check

      stats: { imdb: 5.4, songs: 5, runtime: 148 },   // check

      spoiler: [
        'Two men who need money pose as the long-lost son of a rich businessman.',
        'A man with night blindness and a man who stammers chase a fortune.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Small-time hustler',
        location: 'Hyderabad',
        song: '',
        scene: 'Two men compete to prove they are a rich man\'s lost son',
      },
    },
    {
      id: 'godfather',
      title: 'GodFather',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Nayanthara',
      director: 'Mohan Raja',
      music: 'S. Thaman',
      villain: 'Satyadev',
      banner: 'Konidela Production Company',
      genre: 'Political action drama',
      roles: ['Brahma', 'Sathya Priya', 'Jaidev'],   // check

      stats: { imdb: 6.1, songs: 4, runtime: 157 },   // check

      spoiler: [
        'After a chief minister\'s death, a mysterious man returns to stop the CM\'s son-in-law from grabbing power.',
        'A shadowy figure with a big network protects the political party of his late father.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Political strongman',
        location: 'Hyderabad',
        song: '',
        scene: 'A man walks into the CM\'s funeral and everyone falls silent',
      },
    },
    {
      id: 'hit-the-second-case',
      title: 'HIT: The Second Case',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Adivi Sesh',
      heroine: 'Meenakshi Chaudhary',
      director: 'Sailesh Kolanu',
      music: 'M. M. Sreelekha',   // check
      villain: '',
      banner: 'Wall Poster Cinema',
      genre: 'Crime thriller',
      roles: ['Krishna Dev', 'Aarya'],   // check

      stats: { imdb: 7.4, songs: 1, runtime: 126 },   // check

      spoiler: [
        'A casual cop in Vizag hunts a serial killer who leaves behind bodies made from different women.',
        'A laid-back officer faces a killer who builds one body out of many.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer',
        location: 'Vizag',
        song: '',
        scene: 'Police find a body assembled from several victims',
      },
    },
    {
      id: 'karthikeya-2',
      title: 'Karthikeya 2',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Nikhil Siddhartha',
      heroine: 'Anupama Parameswaran',
      director: 'Chandoo Mondeti',
      music: 'Kaala Bhairava',
      villain: '',
      banner: 'People Media Factory',
      genre: 'Mystery adventure',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.9, songs: 3, runtime: 140 },   // check

      spoiler: [
        'A doctor goes on a hunt across India for an ancient anklet of Lord Krishna that holds a great secret.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Doctor',
        location: 'Dwarka',
        song: '',
        scene: 'A doctor searches for Lord Krishna\'s lost anklet',
      },
    },
    {
      id: 'kgf-chapter-2',
      title: 'KGF: Chapter 2',
      aka: [],
      year: 2022,
      level: 'easy',

      hero: 'Yash',
      heroine: 'Srinidhi Shetty',
      director: 'Prashanth Neel',
      music: 'Ravi Basrur',
      villain: 'Sanjay Dutt',
      banner: 'Hombale Films',
      genre: 'Period action',
      roles: ['Rocky', 'Reena', 'Adheera'],   // check

      stats: { imdb: 8.2, songs: 4, runtime: 168 },   // check

      spoiler: [
        'The ruler of the gold fields fights a dreaded warrior and the Prime Minister of India.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Gold field ruler',
        location: 'Kolar Gold Fields',
        song: 'Toofan',
        scene: 'A man fires a huge machine gun at a police station',
      },
    },
    {
      id: 'liger',
      title: 'Liger',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Ananya Panday',
      director: 'Puri Jagannadh',
      music: 'Vikram Montrose',   // check
      villain: '',
      banner: 'Puri Connects',
      genre: 'Sports action',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 3, songs: 5, runtime: 140 },   // check

      spoiler: [
        'A tea-seller\'s son from Mumbai with a stammer goes after a place in the MMA ring, guided by his determined mother.',
        'A stammering fighter from a chaiwala family trains to become a mixed martial arts champion.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'MMA fighter',
        location: 'Mumbai and Las Vegas',
        song: 'Akdi Pakdi',
        scene: 'A boy with a stammer trains to fight in a cage',
      },
    },
    {
      id: 'major',
      title: 'Major',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Adivi Sesh',
      heroine: 'Saiee Manjrekar',
      director: 'Sashi Kiran Tikka',
      music: 'Sricharan Pakala',
      villain: '',
      banner: 'GMB Entertainment',
      genre: 'Biographical action',
      roles: ['Sandeep Unnikrishnan', 'Isha'],   // check

      stats: { imdb: 8.1, songs: 3, runtime: 149 },

      spoiler: [
        'The true story of an army commando who gave his life saving hostages during the 2008 attacks on Mumbai hotels.',
        'The life of Sandeep Unnikrishnan, from his childhood dream of joining the army to the hotel siege where he died.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'NSG commando',
        location: 'Mumbai',
        song: 'Hrudayama',
        scene: 'A commando fights in the 2008 Mumbai attacks',
      },
    },
    {
      id: 'prince',
      title: 'Prince',
      aka: [],
      year: 2022,
      level: 'hard',

      hero: 'Sivakarthikeyan',
      heroine: 'Maria Ryaboshapka',
      director: 'Anudeep K. V.',
      music: 'S. Thaman',
      villain: '',
      banner: 'Sree Venkateswara Cinemas',
      genre: 'Romantic comedy',
      roles: [],

      stats: { imdb: 4.4, songs: 4, runtime: 143 },   // check

      spoiler: [
        'A school teacher in a village falls for a British woman, and the villagers turn it into a patriotic fight.',
        'An Indian teacher and a British girl cause a village war.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Social studies teacher',
        location: 'Puducherry',
        song: '',
        scene: '',
      },
    },
    {
      id: 'radhe-shyam',
      title: 'Radhe Shyam',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Prabhas',
      heroine: 'Pooja Hegde',
      director: 'Radha Krishna Kumar',
      music: 'Justin Prabhakaran',
      villain: '',
      banner: 'UV Creations',
      genre: 'Period romance',
      roles: ['Vikramaditya', 'Prerana'],   // check

      stats: { imdb: 5.6, songs: 6, runtime: 138 },   // check

      spoiler: [
        'A palmist who has never believed in love meets a doctor on a trip to Italy, where his own predictions fall apart.',
        'A famous palmist who can read anyone\'s future falls for a doctor whose palm says she will die soon.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Palmist',
        location: 'Italy',
        song: '',
        scene: '',
      },
    },
    {
      id: 'rrr',
      title: 'RRR',
      aka: [],
      year: 2022,
      level: 'easy',

      hero: ['Jr NTR', 'Ram Charan'],
      heroine: 'Alia Bhatt',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Ray Stevenson',
      banner: 'DVV Entertainment',
      genre: 'Period action drama',
      roles: ['Bheem', 'Ram', 'Sita'],   // check

      stats: { imdb: 7.8, songs: 6, runtime: 187 },

      spoiler: [
        'Two revolutionaries in British India become the closest of friends without knowing that each has a secret mission that will put them on opposite sides.',
        'A tribal man trying to rescue a girl and a police officer hunting him become best friends.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Police officer and tribal warrior',
        location: 'Delhi',
        song: 'Naatu Naatu',
        scene: 'A dance-off at a British party',
      },
    },
    {
      id: 'sarkaru-vaari-paata',
      title: 'Sarkaru Vaari Paata',
      aka: [],
      year: 2022,
      level: 'medium',

      hero: 'Mahesh Babu',
      heroine: 'Keerthy Suresh',
      director: 'Parasuram',
      music: 'S. Thaman',
      villain: 'Samuthirakani',
      banner: 'Mythri Movie Makers',
      genre: 'Action comedy',
      roles: ['Mahesh', 'Kalavathi', 'Rajendranath'],   // check

      stats: { imdb: 5.8, songs: 5, runtime: 162 },   // check

      spoiler: [
        'A moneylender in America goes to India to recover a loan from a powerful businessman.',
        'A man chases a debt and uncovers a bank scam.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Moneylender',
        location: 'Miami and Vizag',
        song: 'Kalaavathi',
        scene: 'A moneylender chases a borrower across countries',
      },
    },
    {
      id: 'sita-ramam',
      title: 'Sita Ramam',
      aka: [],
      year: 2022,
      level: 'easy',

      hero: 'Dulquer Salmaan',
      heroine: 'Mrunal Thakur',
      director: 'Hanu Raghavapudi',
      music: 'Vishal Chandrashekhar',
      villain: '',
      banner: 'Vyjayanthi Movies',
      genre: 'Period romance',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.5, songs: 6, runtime: 163 },

      spoiler: [
        'A young woman sets out to deliver a soldier\'s letters, written decades ago, to the person they were meant for.',
        'An orphan soldier receives love letters from a woman he has never met, and sets out to find her.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Army lieutenant',
        location: 'Kashmir and Hyderabad',
        song: 'Inthandham',
        scene: 'An orphan soldier receives letters from a woman who signs as his wife',
      },
    },
    {
      id: 'adipurush',
      title: 'Adipurush',
      aka: [],
      year: 2023,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Kriti Sanon',
      director: 'Om Raut',
      music: 'Ajay–Atul',   // check
      villain: 'Saif Ali Khan',
      banner: 'T-Series',
      genre: 'Mythological action',
      roles: ['Raghava', 'Janaki', 'Lankesh'],   // check

      stats: { imdb: 3.8, songs: 5, runtime: 179 },   // check

      spoiler: [
        'A prince goes into exile with his wife and brother, and a demon king steals her away across the sea.',
        'An exiled prince crosses the sea with an army to rescue his wife from a ten-headed king.',
      ],
      dialogues: [],

      clues: {
        job: 'Exiled prince',
        location: 'Lanka',
        song: 'Jai Shri Ram',
        scene: 'An army builds a bridge of stones across the sea',
      },
    },
    {
      id: 'agent',
      title: 'Agent',
      aka: [],
      year: 2023,
      level: 'hard',

      hero: 'Akhil Akkineni',
      heroine: 'Sakshi Vaidya',   // check
      director: 'Surender Reddy',
      music: 'Hiphop Tamizha',
      villain: 'Dino Morea',
      banner: 'AK Entertainments',
      genre: 'Spy action',
      roles: [],

      stats: { imdb: 3.4, songs: 4, runtime: 156 },   // check

      spoiler: [
        'A reckless young man desperate to join RAW is recruited by a tough chief for a secret mission against a rogue spy.',
        'A wannabe spy proves himself to a chief who keeps rejecting him.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Wannabe RAW spy',
        location: 'Hyderabad',
        song: 'Malli Malli',
        scene: 'The hero hacks into a RAW office just to get noticed',
      },
    },
    {
      id: 'animal',
      title: 'Animal',
      aka: [],
      year: 2023,
      level: 'easy',

      hero: 'Ranbir Kapoor',
      heroine: 'Rashmika Mandanna',
      director: 'Sandeep Reddy Vanga',
      music: 'Harshavardhan Rameshwar',   // check
      villain: 'Bobby Deol',
      banner: 'T-Series',
      genre: 'Action crime drama',
      roles: ['Ranvijay', 'Geetanjali', 'Abrar'],   // check

      stats: { imdb: 6.1, songs: 8, runtime: 201 },   // check

      spoiler: [
        'A son obsessed with his distant billionaire father goes on a bloody rampage after an attempt on his father\'s life.',
        'A man\'s toxic love for his father turns him into a killer, and a mute enemy waits for him.',
      ],
      dialogues: [],

      clues: {
        job: 'Heir to a steel company',
        location: 'Delhi',
        song: 'Ammayi',
        scene: 'The hero fights hundreds of men in a hotel corridor with a huge machine gun',
      },
    },
    {
      id: 'baby',
      title: 'Baby',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Anand Deverakonda',
      heroine: 'Vaishnavi Chaitanya',
      director: 'Sai Rajesh',
      music: 'Vijai Bulganin',
      villain: '',
      banner: 'Mass Movie Makers',
      genre: 'Romantic drama',
      roles: ['Anand', 'Vaishnavi', 'Viraj'],   // check

      stats: { imdb: 7.3, songs: 5, runtime: 174 },   // check

      spoiler: [
        'A girl from a slum changes after she joins an engineering college, leaving her school sweetheart, an auto driver, heartbroken.',
        'A love triangle between an auto driver, a college girl and her rich classmate.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Auto driver',
        location: 'Hyderabad',
        song: 'O Rendu Prema Meghaalila',
        scene: 'An auto driver waits outside a college gate for a girl who no longer looks at him',
      },
    },
    {
      id: 'bhagavanth-kesari',
      title: 'Bhagavanth Kesari',
      aka: [],
      year: 2023,
      level: 'easy',

      hero: 'Balakrishna',
      heroine: 'Kajal Aggarwal',
      director: 'Anil Ravipudi',
      music: 'S. Thaman',
      villain: 'Arjun Rampal',
      banner: 'Shine Screens',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.7, songs: 4, runtime: 164 },   // check

      spoiler: [
        'A tough ex-convict makes a promise to a dying friend and trains the man\'s daughter to be fearless.',
        'A former prisoner raises his friend\'s daughter and trains her to join the army.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Ex-convict',
        location: 'Telangana',
        song: 'Ganesh Anthem',
        scene: 'A man trains a scared girl to become fearless',
      },
    },
    {
      id: 'bhola-shankar',
      title: 'Bhola Shankar',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Tamannaah',
      director: 'Meher Ramesh',
      music: 'Mahati Swara Sagar',
      villain: 'Tarun Arora',
      banner: 'AK Entertainments',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 3, songs: 5, runtime: 160 },   // check

      spoiler: [
        'A taxi driver in Kolkata hunts a gang that kidnaps girls, to protect his sister.',
        'A brother and sister move to Kolkata, where he hides a violent past.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Taxi driver',
        location: 'Kolkata',
        song: '',
        scene: 'A taxi driver fights a gang at a Kolkata station',
      },
    },
    {
      id: 'bro',
      title: 'Bro',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: ['Pawan Kalyan', 'Sai Dharam Tej'],
      heroine: 'Ketika Sharma',
      director: 'Samuthirakani',
      music: 'S. Thaman',
      villain: '',
      banner: 'People Media Factory',
      genre: 'Fantasy comedy drama',
      roles: ['Mark', 'Titan'],   // check

      stats: { imdb: 5.1, songs: 4, runtime: 135 },   // check

      spoiler: [
        'A busy young man who dies in an accident is given 90 more days to live, with Time itself watching over him.',
        'Time takes human form to teach a selfish man what really matters.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Working professional',
        location: 'Hyderabad',
        song: '',
        scene: 'Time appears as a stylish man in front of a dead man',
      },
    },
    {
      id: 'dasara',
      title: 'Dasara',
      aka: [],
      year: 2023,
      level: 'easy',

      hero: 'Nani',
      heroine: 'Keerthy Suresh',
      director: 'Srikanth Odela',
      music: 'Santhosh Narayanan',
      villain: 'Shine Tom Chacko',
      banner: 'SLV Cinemas',
      genre: 'Rural action drama',
      roles: ['Dharani', 'Vennela', 'Suri'],   // check

      stats: { imdb: 6.2, songs: 6, runtime: 156 },

      spoiler: [
        'In a coal-mining village, a man and his two best friends see their lives turn upside down because of love, betrayal and the local bar.',
        'A drunkard in a coal village keeps a secret about his best friend\'s love that changes all their lives.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Coal mine worker',
        location: 'Veerlapally',
        song: 'Chamkeela Angeelesi',
        scene: 'A coal mining village where the bar is the centre of life',
      },
    },
    {
      id: 'hi-nanna',
      title: 'Hi Nanna',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Mrunal Thakur',
      director: 'Shouryuv',
      music: 'Hesham Abdul Wahab',
      villain: '',
      banner: 'Vyra Entertainments',
      genre: 'Family drama',
      roles: ['Viraj', 'Yashna', 'Mahi'],   // check

      stats: { imdb: 8.1, songs: 5, runtime: 155 },   // check

      spoiler: [
        'A father tells his curious young daughter a bedtime love story every night, and the girl in that story turns out to be real.',
        'A photographer\'s daughter keeps asking for her mother\'s story, and a stranger who befriends them turns out to be part of it.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Photographer',
        location: 'Mumbai and Coonoor',
        song: 'Samayama',
        scene: 'A father tells his daughter a bedtime love story',
      },
    },
    {
      id: 'jailer',
      title: 'Jailer',
      aka: [],
      year: 2023,
      level: 'easy',

      hero: 'Rajinikanth',
      heroine: 'Ramya Krishnan',
      director: 'Nelson Dilipkumar',
      music: 'Anirudh Ravichander',
      villain: 'Vinayakan',
      banner: 'Sun Pictures',
      genre: 'Action comedy',
      roles: ['Muthuvel Pandian', 'Vijaya', 'Varman'],   // check

      stats: { imdb: 7, songs: 4, runtime: 168 },   // check

      spoiler: [
        'A retired prison warden with a calm life turns lethal when his son goes missing in a case with a ruthless smuggling ring.',
        'A retired prison warden turns ruthless to hunt the gang behind his police officer son\'s disappearance.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Retired prison warden',
        location: 'Chennai',
        song: 'Kaavaalaa',
        scene: 'A quiet grandfather turns into a ruthless fighter',
      },
    },
    {
      id: 'kushi-2023',
      title: 'Kushi',
      aka: ['Kushi (2023)'],
      year: 2023,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Samantha',
      director: 'Shiva Nirvana',
      music: 'Hesham Abdul Wahab',
      villain: '',
      banner: 'Mythri Movie Makers',
      genre: 'Romantic drama',
      roles: ['Viplav', 'Aaradhya'],   // check

      stats: { imdb: 5.9, songs: 5, runtime: 165 },   // check

      spoiler: [
        'A government employee posted in Kashmir falls for a girl, but their families, one atheist and one religious, clash.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Government employee',
        location: 'Kashmir and Hyderabad',
        song: 'Naa Roja Nuvve',
        scene: 'A man falls in love on a boat in Kashmir',
      },
    },
    {
      id: 'leo',
      title: 'Leo',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Vijay',
      heroine: 'Trisha',
      director: 'Lokesh Kanagaraj',
      music: 'Anirudh Ravichander',
      villain: 'Sanjay Dutt',
      banner: 'Seven Screen Studio',
      genre: 'Action thriller',
      roles: ['Parthiban', 'Sathya', 'Antony Das'],   // check

      stats: { imdb: 7.2, songs: 4, runtime: 164 },   // check

      spoiler: [
        'A peaceful cafe owner in Himachal whose past catches up with him when a pair of gangsters come to claim him.',
        'A café owner in Himachal is mistaken for a gangster\'s long-lost son, and his violent past may be real.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Café owner',
        location: 'Himachal Pradesh',
        song: 'Naa Ready',
        scene: 'A café owner fights off armed robbers in his shop',
      },
    },
    {
      id: 'mad',
      title: 'MAD',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Narne Nithiin',
      heroine: 'Gouri Priya',   // check
      director: 'Kalyan Shankar',
      music: 'Bheems Ceciroleo',
      villain: '',
      banner: 'Sithara Entertainments',
      genre: 'Comedy',
      roles: [],

      stats: { imdb: 7.4, songs: 4, runtime: 128 },   // check

      spoiler: [
        'Three engineering students have a crazy four years of college, with love and lots of fights.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Engineering student',
        location: 'Hyderabad',
        song: '',
        scene: '',
      },
    },
    {
      id: 'mangalavaaram',
      title: 'Mangalavaaram',
      aka: [],
      year: 2023,
      level: 'hard',

      hero: 'Nandita Swetha',   // check
      heroine: 'Payal Rajput',
      director: 'Ajay Bhupathi',
      music: 'Ajaneesh Loknath',
      villain: '',
      banner: '',
      genre: 'Horror thriller',
      roles: [],

      stats: { imdb: 7, songs: 3, runtime: 145 },   // check

      spoiler: [
        'Every Tuesday someone in a village dies after their names are written on a wall, and a woman shunned by villagers holds the secret.',
        'Mysterious deaths on Tuesdays in a 1990s village.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'A village',
        song: '',
        scene: '',
      },
    },
    {
      id: 'salaar-part-1-ceasefire',
      title: 'Salaar: Part 1 – Ceasefire',
      aka: [],
      year: 2023,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Shruti Haasan',
      director: 'Prashanth Neel',
      music: 'Ravi Basrur',
      villain: 'Prithviraj Sukumaran',
      banner: 'Hombale Films',
      genre: 'Action',
      roles: ['Deva', 'Aadya', 'Vardha'],   // check

      stats: { imdb: 6.4, songs: 4, runtime: 175 },

      spoiler: [
        'Two childhood friends grow up apart. One of them becomes the most feared protector of a lawless fortress city when the other is in danger.',
        'A quiet mechanic in Assam returns to the violent city of Khansaar to protect his childhood friend.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Mechanic',
        location: 'Khansaar',
        song: 'Sooreede',
        scene: 'Two friends in the violent city of Khansaar',
      },
    },
    {
      id: 'shaakuntalam',
      title: 'Shaakuntalam',
      aka: [],
      year: 2023,
      level: 'hard',

      hero: 'Dev Mohan',
      heroine: 'Samantha',
      director: 'Gunasekhar',
      music: 'Mani Sharma',
      villain: '',
      banner: 'Gunaa Teamworks',
      genre: 'Mythological romance',
      roles: ['Dushyanta', 'Shakuntala'],   // check

      stats: { imdb: 3.5, songs: 6, runtime: 142 },   // check

      spoiler: [
        'A forest girl marries a king in secret, and a sage\'s curse makes him forget her.',
      ],
      dialogues: [],

      clues: {   // check
        job: '',
        location: 'Kanva\'s ashram',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sir',
      title: 'Sir',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Dhanush',
      heroine: 'Samyuktha',
      director: 'Venky Atluri',
      music: 'G. V. Prakash Kumar',
      villain: 'Samuthirakani',
      banner: 'Sithara Entertainments',
      genre: 'Drama',
      roles: ['Bala', 'Meenakshi'],   // check

      stats: { imdb: 7.2, songs: 4, runtime: 139 },   // check

      spoiler: [
        'A junior lecturer posted to a poor village school fights against the privatisation of education.',
        'A teacher inspires village students to pass exams despite threats.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Junior lecturer',
        location: 'A village',
        song: 'Banjara',
        scene: '',
      },
    },
    {
      id: 'tiger-nageswara-rao',
      title: 'Tiger Nageswara Rao',
      aka: [],
      year: 2023,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Nupur Sanon',
      director: 'Vamsee',
      music: 'G. V. Prakash Kumar',
      villain: '',
      banner: 'Abhishek Agarwal Arts',
      genre: 'Biographical crime',
      roles: [],

      stats: { imdb: 5.5, songs: 5, runtime: 180 },   // check

      spoiler: [
        'The story of a famous thief from Stuartpuram who robbed the rich in the 1970s.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Thief',
        location: 'Stuartpuram',
        song: '',
        scene: '',
      },
    },
    {
      id: 'varasudu',
      title: 'Varasudu',
      aka: ['Varisu'],
      year: 2023,
      level: 'medium',

      hero: 'Vijay',
      heroine: 'Rashmika Mandanna',
      director: 'Vamshi Paidipally',
      music: 'S. Thaman',
      villain: 'Prakash Raj',
      banner: 'Sri Venkateswara Creations',
      genre: 'Family drama',
      roles: ['Vijay Rajendran', 'Divya'],   // check

      stats: { imdb: 5.7, songs: 5, runtime: 170 },   // check

      spoiler: [
        'The youngest son of a rich businessman, who was thrown out, returns to hold his family and company together.',
        'A son becomes heir to his father\'s business empire.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Business heir',
        location: 'Hyderabad',
        song: 'Ranjithame',
        scene: '',
      },
    },
    {
      id: 'veera-simha-reddy',
      title: 'Veera Simha Reddy',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Balakrishna',
      heroine: 'Shruti Haasan',
      director: 'Gopichand Malineni',
      music: 'S. Thaman',
      villain: 'Duniya Vijay',
      banner: 'Mythri Movie Makers',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5.4, songs: 5, runtime: 170 },   // check

      spoiler: [
        'A powerful faction leader in Rayalaseema is away, and the story of what he left behind slowly comes to light.',
        'A man living in Istanbul finds out about his father, a Rayalaseema leader, and his family\'s enemies.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Businessman',
        location: 'Istanbul and Rayalaseema',
        song: 'Jai Balayya',
        scene: '',
      },
    },
       {
      id: 'waltair-veerayya',
      title: 'Waltair Veerayya',
      aka: [],
      year: 2023,
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Shruti Haasan',
      director: 'Bobby Kolli',
      music: 'Devi Sri Prasad',
      villain: 'Prakash Raj',
      banner: 'Mythri Movie Makers',
      genre: 'Action comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.2, songs: 5, runtime: 160 },   // check

      spoiler: [
         'A fisherman from Vizag goes to Malaysia on a mission to catch a drug lord,',
      ],
      dialogues: [],

      clues: {
        job: 'Fisherman',
        location: 'Vizag and Malaysia',
        song: 'Boss Party',
        scene: 'A fisherman goes to Malaysia to catch a drug lord',
      },
    },
    {
      id: 'devara-part-1',
      title: 'Devara: Part 1',
      aka: [],
      year: 2024,
      level: 'easy',

      hero: 'Jr NTR',
      heroine: 'Janhvi Kapoor',
      director: 'Koratala Siva',
      music: 'Anirudh Ravichander',
      villain: 'Saif Ali Khan',
      banner: '',
      genre: 'Action drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.0, songs: 4, runtime: 176 },   
      spoiler: [
        'A coastal leader stops his men from smuggling, and the sea becomes a place of fear for anyone who tries.',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Chuttamalle',
        scene: 'A feared man of the coast turns against smuggling at sea',
      },
    },
    {
      id: 'family-star',
      title: 'Family Star',
      aka: [],
      year: 2024,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Mrunal Thakur',
      director: 'Parasuram',
      music: 'Gopi Sundar',
      villain: '',
      banner: '',
      genre: 'Family drama',
      roles: ['Govardhan', 'Indu'],   

      stats: { imdb: 4.5, songs: 5, runtime: 160 },   // check

      spoiler: [
        'A middle-class man who carries his whole family\'s responsibilities finds out his tenant is writing a thesis about him.',
        
      ],
      dialogues: [],

      clues: {  
        job: 'Architect',
        location: 'Hyderabad and New York',
        song: 'Kalyani Vaccha Vacchaa',
        scene: '',
      },
    },
    {
      id: 'guntur-kaaram',
      title: 'Guntur Kaaram',
      aka: [],
      year: 2024,
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Sreeleela',
      director: 'Trivikram Srinivas',
      music: 'S. Thaman',
      villain: '',
      banner: '',
      genre: 'Family action drama',
      roles: ['Ramana', 'Amu'],  

      stats: { imdb: 5.4, songs: 5, runtime: 159 },   

      spoiler: [
        'A man estranged from his mother and her powerful family is forced to confront the past and the family he never knew.',
        'A man whose mother left him as a child is asked to sign papers saying he is not her son.',
      ],
      dialogues: [],

      clues: {  
        job: '',
        location: '',
        song: 'Kurchi Madathapetti',
        scene: 'A man refuses to sign away his relationship with his mother',
      },
    },
    {
      id: 'hanu-man',
      title: 'Hanu-Man',
      aka: [],
      year: 2024,
      level: 'easy',

      hero: 'Teja Sajja',
      heroine: 'Amritha Aiyer',
      director: 'Prasanth Varma',
      music: 'Gowra Hari',
      villain: '',
      banner: '',
      genre: 'Superhero fantasy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 7.7, songs: 5, runtime: 158 },

      spoiler: [
         ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: 'Avakaya Anjaneya',
        scene: '',
      },
    },
    {
      id: 'kalki-2898-ad',
      title: 'Kalki 2898 AD',
      aka: [],
      year: 2024,
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Deepika Padukone',
      director: 'Nag Ashwin',
      music: 'Santhosh Narayanan',
      villain: 'Kamal Haasan',
      banner: 'Vyjayanthi Movies',
      genre: 'Sci-fi epic',
      roles: ['Bhairava', 'Sumathi', 'Ashwatthama'],   

      stats: { imdb: 7, songs: 3, runtime: 181 },

      spoiler: [
        'In a distant future, the last living city is ruled by a tyrant, while a mysterious pregnant woman becomes the key to everyone\'s fate.',
        'A bounty hunter in the last city on Earth is hired to capture a pregnant woman, guarded by an immortal warrior.',
      ],
      dialogues: [],

      clues: {   
        job: 'Bounty hunter',
        location: 'Kasi',
        song: 'Bhairava Anthem',
        scene: 'A futuristic city and a mysterious pregnant woman',
      },
    },
    {
      id: 'lucky-baskhar',
      title: 'Lucky Baskhar',
      aka: [],
      year: 2024,
      level: 'medium',

      hero: 'Dulquer Salmaan',
      heroine: 'Meenakshi Chaudhary',
      director: 'Venky Atluri',
      music: 'G. V. Prakash Kumar',
      villain: '',
      banner: '',
      genre: 'Crime drama',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 8.1, songs: 3, runtime: 150 },  

      spoiler: [
        'A struggling bank cashier in 1990s Bombay gets involved in a financial scam and becomes rich.',
        'A middle-class bank employee learns to play the stock market illegally.',
      ],
      dialogues: [],

      clues: {   
        job: 'Bank cashier',
        location: 'Bombay',
        song: 'Srimathi Garu',
        scene: '',
      },
    },
    {
      id: 'mr-bachchan',
      title: 'Mr. Bachchan',
      aka: [],
      year: 2024,
      level: 'hard',

      hero: 'Ravi Teja',
      heroine: 'Bhagyashri Borse',
      director: 'Harish Shankar',
      music: 'Mickey J. Meyer',
      villain: '',
      banner: '',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 3.4, songs: 4, runtime: 160 },   

      spoiler: [
        'An honest income tax officer raids the home of a powerful politician.',
       
      ],
      dialogues: [],

      clues: {   
        job: 'Income tax officer',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'pushpa-2-the-rule',
      title: 'Pushpa 2: The Rule',
      aka: [],
      year: 2024,
      level: 'easy',

      hero: 'Allu Arjun',
      heroine: 'Rashmika Mandanna',
      director: 'Sukumar',
      music: 'Devi Sri Prasad',
      villain: 'Fahadh Faasil',
      banner: 'Mythri Movie Makers',
      genre: 'Action drama',
      roles: ['Pushpa Raj', 'Srivalli', 'Bhanwar Singh Shekhawat'],  

      stats: { imdb: 6, songs: 5, runtime: 200 },

      spoiler: [
        'The labourer who became a smuggling kingpin now faces a rival police officer and a growing empire that refuses to bow.',
        'The red sandalwood smuggler expands his empire abroad while a revenge-driven police officer hunts him.',
      ],
      dialogues: [],

      clues: {   
        job: 'Smuggling kingpin',
        location: 'Tirupati',
        song: 'Peelings',
        scene: 'A smuggler who now runs the syndicate wants one photo with the chief minister',
      },
    },
    {
      id: 'saripodhaa-sanivaaram',
      title: 'Saripodhaa Sanivaaram',
      aka: [],
      year: 2024,
      level: 'medium',

      hero: 'Nani',
      heroine: 'Priyanka Arul Mohan',
      director: 'Vivek Athreya',
      music: 'Jakes Bejoy',
      villain: 'S. J. Suryah',
      banner: '',
      genre: 'Action thriller',
      roles: ['Surya', 'Charulatha', 'Daya'],  

      stats: { imdb: 7.1, songs: 4, runtime: 174 },   // check

      spoiler: [
        'A man who lets out his anger only on Saturdays takes on a cruel police officer.',
        'An insurance agent saves all his rage for one day a week.',
      ],
      dialogues: [],

      clues: {   // check
        job: 'Insurance agent',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'tillu-square',
      title: 'Tillu Square',
      aka: [],
      year: 2024,
      level: 'medium',

      hero: 'Siddhu Jonnalagadda',
      heroine: 'Anupama Parameswaran',
      director: 'Mallik Ram',
      music: 'Ram Miriyala',
      villain: '',
      banner: '',
      genre: 'Crime comedy',
      roles: [],   // the character names give the title away, so this movie uses the STARRING round only

      stats: { imdb: 6.6, songs: 4, runtime: 124 }, 

      spoiler: [
        'A local DJ falls for another mysterious woman and is dragged into a new crime.',
        
      ],
      dialogues: [],

      clues: {   
        job: 'DJ',
        location: 'Hyderabad',
        song: 'Ticket Eh Konakunda',
        scene: '',
      },
    },
    {
      id: 'vettaiyan',
      title: 'Vettaiyan',
      aka: [],
      year: 2024,
      level: 'medium',

      hero: 'Rajinikanth',
      heroine: 'Manju Warrier',
      director: 'T. J. Gnanavel',
      music: 'Anirudh Ravichander',
      villain: 'Rana Daggubati',
      banner: '',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 6.8, songs: 3, runtime: 163 },   

      spoiler: [
        'An encounter specialist kills the wrong man and must find the real killer.',
      ],
      dialogues: [],

      clues: {   
        job: 'Police officer',
        location: 'Kanyakumari',
        song: '',
        scene: '',
      },
    },
    {
      id: 'akhanda-2-thaandavam',
      title: 'Akhanda 2: Thaandavam',
      aka: [],
      year: 2025,   
      level: 'easy',

      hero: 'Balakrishna',
      heroine: 'Samyuktha',   
      director: 'Boyapati Srinu',
      music: 'S. Thaman',
      villain: '',   
      banner: '',  
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 0, songs: 0, runtime: 0 },   

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
        {
      id: 'coolie',
      title: 'Coolie',
      aka: [],
      year: 2025,
      level: 'easy',

      hero: 'Rajinikanth',
      heroine: 'Shruti Haasan',   
      director: 'Lokesh Kanagaraj',
      music: 'Anirudh Ravichander',
      villain: 'Nagarjuna',   
      banner: 'Sun Pictures',
      genre: 'Action thriller',
      roles: [],

      stats: { imdb: 6, songs: 4, runtime: 170 },   

      spoiler: [  'Former union leader Deva infiltrates a ruthless port smuggling syndicate to avenge his murdered friend and protect his estranged daughter.' 
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'daaku-maharaj',
      title: 'Daaku Maharaj',
      aka: ['Daaku Maharaaj'],
      year: 2025,
      level: 'medium',

      hero: 'Balakrishna',
      heroine: 'Pragya Jaiswal',  
      director: 'Bobby Kolli',
      music: 'S. Thaman',
      villain: 'Bobby Deol', 
      banner: '',
      genre: 'Action drama',
      roles: [],

      stats: { imdb: 5.9, songs: 5, runtime: 150 },   

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'game-changer',
      title: 'Game Changer',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Kiara Advani',
      director: 'Shankar',
      music: 'S. Thaman',
      villain: 'S. J. Suryah',
      banner: '',
      genre: 'Political action drama',
      roles: ['Ram Nandan', 'Deepika', 'Mopidevi'],   

      stats: { imdb: 5, songs: 5, runtime: 165 },   

      spoiler: [   
        'An honest IAS officer takes on a corrupt minister, and a story from his father\'s past is revealed.',
        'A district collector fights corruption with the election commission behind him.',
      ],
      dialogues: [],

      clues: {  
        job: 'IAS officer',
        location: 'Visakhapatnam',
        song: 'Jaragandi',
        scene: '',
      },
    },
    {
      id: 'hari-hara-veera-mallu',
      title: 'Hari Hara Veera Mallu',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Nidhhi Agerwal',
      director: 'Jyothi Krishna',  
      music: 'M. M. Keeravani',
      villain: 'Bobby Deol',
      banner: '',
      genre: 'Period action',
      roles: [],

      stats: { imdb: 5, songs: 3, runtime: 150 },  

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'kannappa',
      title: 'Kannappa',
      aka: [],
      year: 2025,
      level: 'hard',

      hero: 'Manchu Vishnu',
      heroine: 'Preity Mukhundhan',
      director: 'Mukesh Kumar Singh',
      music: 'Stephen Devassy',
      villain: '',
      banner: '',
      genre: 'Mythological drama',
      roles: ['Thinnadu', 'Nemali'],   

      stats: { imdb: 4.6, songs: 6, runtime: 183 },  

      spoiler: [   
        'A tribal hunter who does not believe in God becomes one of Lord Shiva\'s greatest devotees.',
        'An atheist hunter offers his own eyes to Shiva ',
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'kingdom',
      title: 'Kingdom',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: 'Vijay Deverakonda',
      heroine: 'Bhagyashri Borse', 
      director: 'Gowtam Tinnanuri',
      music: 'Anirudh Ravichander',
      villain: '',
      banner: '',
      genre: 'Spy action',
      roles: [],

      stats: { imdb: 5.5, songs: 3, runtime: 160 },   

      spoiler: [  
        'A police constable is sent undercover to Sri Lanka, where he finds his long-lost brother leading a gang.',
      
      ],
      dialogues: [],

      clues: {   
        job: 'Police constable',
        location: 'Sri Lanka',
        song: '',
        scene: '',
      },
    },
    {
      id: 'kuberaa',
      title: 'Kuberaa',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: ['Dhanush', 'Nagarjuna'],
      heroine: 'Rashmika Mandanna',
      director: 'Sekhar Kammula',
      music: 'Devi Sri Prasad',
      villain: 'Jim Sarbh',
      banner: '',
      genre: 'Crime drama',
      roles: ['Deva', 'Sameera', 'Deepak'],   

      stats: { imdb: 6.4, songs: 4, runtime: 182 },  

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: 'Beggar',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'mirai',
      title: 'Mirai',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: 'Teja Sajja',
      heroine: 'Ritika Nayak',   
      director: 'Karthik Gattamneni',
      music: 'Gowra Hari',
      villain: 'Manchu Manoj',
      banner: '',
      genre: 'Superhero fantasy',
      roles: [],

      stats: { imdb: 6.8, songs: 6, runtime: 169 },  

      spoiler: [  
        'A young man must protect nine ancient scriptures that could make an evil man immortal.',
        
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'sankranthiki-vasthunnam',
      title: 'Sankranthiki Vasthunnam',
      aka: ['Sankranthiki Vasthunam'],
      year: 2025,
      level: 'medium',

      hero: 'Venkatesh',
      heroine: ['Aishwarya Rajesh', 'Meenakshi Chaudhary'],
      director: 'Anil Ravipudi',
      music: 'Bheems Ceciroleo',
      villain: '',
      banner: 'Sri Venkateswara Creations',
      genre: 'Family action comedy',
      roles: ['YD Raju', 'Bhagyam', 'Meenakshi'],   

      stats: { imdb: 6.1, songs: 5, runtime: 144 },   

      spoiler: [   
        'A former cop is called back to rescue a kidnapped businessman, with his wife and ex-girlfriend both coming along.',
       
      ],
      dialogues: [],

      clues: {  
        job: 'Former police officer',
        location: '',
        song: 'Godari Gattu',
        scene: '',
      },
    },
    {
      id: 'thandel',
      title: 'Thandel',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: 'Naga Chaitanya',
      heroine: 'Sai Pallavi',
      director: 'Chandoo Mondeti',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',
      genre: 'Romantic drama',
      roles: [],   

      stats: { imdb: 6.4, songs: 6, runtime: 151 },   

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'they-call-him-og',
      title: 'They Call Him OG',
      aka: [],
      year: 2025,
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Priyanka Arul Mohan',
      director: 'Sujeeth',
      music: 'S. Thaman',
      villain: 'Emraan Hashmi',
      banner: '',
      genre: 'Gangster action',
      roles: ['Ojas Gambheera', 'Kanmani'],   

      stats: { imdb: 6, songs: 6, runtime: 150 },   

      spoiler: [   
        'A feared gangster who vanished from Bombay returns after years to settle an old war.',
      ],
      dialogues: [],

      clues: {  
        job: 'Gangster',
        location: 'Bombay',
        song: 'Hungry Cheetah',
        scene: '',
      },
    },
    
    {
      id: 'mana-shankara-varaprasad-garu',
      title: 'Mana Shankara Varaprasad Garu',
      aka: [],
      year: 2026,  
      level: 'medium',

      hero: 'Chiranjeevi',
      heroine: 'Nayanthara',   
      director: 'Anil Ravipudi',
      music: 'Bheems Ceciroleo',   
      villain: '',
      banner: '',   
      genre: 'Family comedy',  
      roles: [],

      stats: { imdb: 5.7, songs: 4, runtime: 165 },   // check

      spoiler: [ 'A national security officer goes undercover to protect and reconnect with his wife and children from dangerous criminal threats.'
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'the-rajasaab',
      title: 'The RajaSaab',
      aka: [],
      year: 2026,   
      level: 'medium',

      hero: 'Prabhas',
      heroine: ['Malavika Mohanan', 'Nidhhi Agerwal', 'Riddhi Kumar'],   
      director: 'Maruthi',
      music: 'S. Thaman',
      villain: 'Sanjay Dutt',  
      banner: '',
      genre: 'Horror comedy',
      roles: [],

      stats: { imdb: 3.1, songs: 6, runtime: 180 },   

      spoiler: [ 'Searching for his missing grandfather, a young man enters a haunted mansion, uncovering dark family secrets and battling sinister supernatural powers.'
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },

    // ── Year not known yet ────────────────────────────────

    {
      id: 'fauzi',
      title: 'Fauzi',
      aka: [],
      year: 0,   
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Imanvi',  
      director: 'Hanu Raghavapudi',
      music: 'Vishal Chandrashekhar',   
      villain: '',
      banner: 'Mythri Movie Makers',
      genre: 'Period war drama',  
      roles: [],

      stats: { imdb: 0, songs: 0, runtime: 0 },   

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'paradise',
      title: 'Paradise',
      aka: [],
      year: 2026,   
      level: 'medium',

      hero: 'Nani',
      heroine: 'Kayadu lohar',   
      director: 'Srikanth Odela',
      music: 'Anirudh Ravichander',
      villain: '',
      banner: '',
      genre: 'Action drama',   
      roles: [],

      stats: { imdb: 5.5, songs: 4, runtime: 173 },   

      spoiler: [  'In 1980s Secunderabad, ex convict leads his tribe in a rebellion against ruthless feudal landlord, fighting for citizenship rights.'
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'peddi',
      title: 'Peddi',
      aka: [],
      year: 2026,   
      level: 'medium',

      hero: 'Ram Charan',
      heroine: 'Janhvi Kapoor',
      director: 'Buchi Babu Sana',
      music: 'A. R. Rahman',
      villain: '',
      banner: '',
      genre: 'Sports drama',   
      roles: [],

      stats: { imdb: 5.1, songs: 4, runtime: 189 },   

      spoiler: [  'In 1994 Vizianagaram, tribal villager overcomes a severe wrestling injury to become a para athlete, winning national acclaim and official recognition for his community.'],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'spirit',
      title: 'Spirit',
      aka: [],
      year: 0,   
      level: 'easy',

      hero: 'Prabhas',
      heroine: 'Triptii Dimri',   
      director: 'Sandeep Reddy Vanga',
      music: 'Harshavardhan Rameshwar',   
      villain: '',
      banner: '',
      genre: 'Action drama',  
      roles: [],

      stats: { imdb: 0, songs: 0, runtime: 0 },  

      spoiler: [   // check
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'ustaad-bhagat-singh',
      title: 'Ustaad Bhagat Singh',
      aka: [],
      year: 2026,  
      level: 'medium',

      hero: 'Pawan Kalyan',
      heroine: 'Sreeleela',
      director: 'Harish Shankar',
      music: 'Devi Sri Prasad',
      villain: '',
      banner: '',
      genre: 'Action drama',   
      roles: [],

      stats: { imdb: 4, songs: 3, runtime: 154 },  

      spoiler: [   
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },
    {
      id: 'varanasi',
      title: 'Varanasi',
      aka: [],
      year: 0,   
      level: 'easy',

      hero: 'Mahesh Babu',
      heroine: 'Priyanka Chopra',
      director: 'S. S. Rajamouli',
      music: 'M. M. Keeravani',
      villain: 'Prithviraj Sukumaran',
      banner: '',
      genre: '',   
      roles: [],

      stats: { imdb: 0, songs: 0, runtime: 0 },   

      spoiler: [  
      ],
      dialogues: [],

      clues: {   
        job: '',
        location: '',
        song: '',
        scene: '',
      },
    },

  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = MOVIES; else root.CinefiedMovies = MOVIES;
})(typeof self !== 'undefined' ? self : this);
