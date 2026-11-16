/* Clue Pool movies. n = name, y = year, g = genre, a = lead actor(s), s = story clue (must not contain the name).
   Edit freely (keep the same shape), then run:  node functions/cluepool-movies.js   (rebuilds public/data/cluepool-names.js)
   and deploy:  npx firebase-tools deploy --only functions,hosting
   The first 30 are from the original Clue Pool; the rest are new and need a fact-check before release. */
(function (root) {
  const MOVIES = [
    { n: 'RRR', y: 2022, g: 'Period action drama', a: 'N. T. Rama Rao Jr. and Ram Charan', s: 'A dance-off at a British party' },
    { n: 'Baahubali: The Beginning', y: 2015, g: 'Epic fantasy action', a: 'Prabhas', s: 'A young man climbs a giant waterfall' },
    { n: 'Baahubali 2: The Conclusion', y: 2017, g: 'Epic action drama', a: 'Prabhas', s: 'The question the whole country asked about Kattappa gets answered' },
    { n: 'Pushpa: The Rise', y: 2021, g: 'Action drama', a: 'Allu Arjun', s: 'A labourer rises through the red sandalwood smuggling trade' },
    { n: 'Magadheera', y: 2009, g: 'Fantasy action romance', a: 'Ram Charan', s: 'One warrior fights off a hundred soldiers' },
    { n: 'Arjun Reddy', y: 2017, g: 'Romantic drama', a: 'Vijay Deverakonda', s: 'A brilliant surgeon spirals after heartbreak' },
    { n: 'Ala Vaikunthapurramuloo', y: 2020, g: 'Family action comedy', a: 'Allu Arjun', s: 'Two babies are swapped at birth in a hospital' },
    { n: 'Rangasthalam', y: 2018, g: 'Period action drama', a: 'Ram Charan', s: 'A man with hearing trouble in a 1980s village' },
    { n: 'Eega', y: 2012, g: 'Fantasy comedy thriller', a: 'Nani, Samantha and Sudeep', s: 'A murdered man is reborn as a housefly' },
    { n: 'Arundhati', y: 2009, g: 'Fantasy horror', a: 'Anushka Shetty', s: 'A princess is locked in a haunted fort and a fearsome spirit awakens' },
    { n: 'Pokiri', y: 2006, g: 'Action thriller', a: 'Mahesh Babu', s: 'An undercover cop poses as a gangster' },
    { n: 'Athadu', y: 2005, g: 'Action thriller', a: 'Mahesh Babu', s: 'A hitman hides in a village by pretending to be someone else' },
    { n: 'Srimanthudu', y: 2015, g: 'Action drama', a: 'Mahesh Babu', s: 'A rich heir adopts a village' },
    { n: 'Gabbar Singh', y: 2012, g: 'Action comedy', a: 'Pawan Kalyan', s: 'A cop who loves antakshari' },
    { n: 'Attarintiki Daredi', y: 2013, g: 'Family comedy drama', a: 'Pawan Kalyan', s: 'A grandson returns as a driver to reunite his family' },
    { n: 'Jersey', y: 2019, g: 'Sports drama', a: 'Nani', s: 'A failed cricketer returns to the game for his son' },
    { n: 'Salaar: Part 1 – Ceasefire', y: 2023, g: 'Action', a: 'Prabhas', s: 'Two friends in the violent city of Khansaar' },
    { n: 'Kalki 2898 AD', y: 2024, g: 'Sci-fi epic', a: 'Prabhas', s: 'A futuristic city and a mysterious pregnant woman' },
    { n: 'Dasara', y: 2023, g: 'Rural action drama', a: 'Nani', s: 'A coal mining village where the bar is the centre of life' },
    { n: 'Geetha Govindam', y: 2018, g: 'Romantic comedy', a: 'Vijay Deverakonda', s: 'A kiss on a bus starts a big misunderstanding' },
    { n: 'Temper', y: 2015, g: 'Action drama', a: 'N. T. Rama Rao Jr.', s: 'A corrupt cop turns honest' },
    { n: 'Aravinda Sametha Veera Raghava', y: 2018, g: 'Action drama', a: 'N. T. Rama Rao Jr.', s: "A faction leader's son tries to end a bloody feud" },
    { n: 'Akhanda', y: 2021, g: 'Action drama', a: 'Balakrishna', s: 'A man appears as a fierce Aghora' },
    { n: 'Hi Nanna', y: 2023, g: 'Family drama', a: 'Nani and Mrunal Thakur', s: 'A father tells his daughter a bedtime love story' },
    { n: 'Bharat Ane Nenu', y: 2018, g: 'Political drama', a: 'Mahesh Babu', s: 'A young man becomes chief minister after his father dies' },
    { n: 'Major', y: 2022, g: 'Biographical action', a: 'Adivi Sesh', s: 'A commando fights in the 2008 Mumbai attacks' },
    { n: 'Hanu-Man', y: 2024, g: 'Superhero fantasy', a: 'Teja Sajja', s: 'A small-town thief gets powers from a magical gem' },
    { n: 'Race Gurram', y: 2014, g: 'Action comedy', a: 'Allu Arjun', s: 'Two brothers clash and a funny cop named Kill Bill Pandey appears' },
    { n: 'Manam', y: 2014, g: 'Fantasy family drama', a: 'Nageswara Rao, Nagarjuna and Naga Chaitanya', s: 'Three generations of a family are reborn' },
    { n: 'Ye Maaya Chesave', y: 2010, g: 'Romantic drama', a: 'Naga Chaitanya and Samantha', s: 'A young filmmaker chases a girl from a different faith' },
    // ── new: fact-check before release ──
    { n: 'Okkadu', y: 2003, g: 'Action romance', a: 'Mahesh Babu', s: 'A kabaddi player rescues a girl from a faction leader in Kurnool' },
    { n: 'Dookudu', y: 2011, g: 'Action comedy', a: 'Mahesh Babu', s: 'A cop makes his father believe he has become an MLA' },
    { n: 'Businessman', y: 2012, g: 'Crime action', a: 'Mahesh Babu', s: 'A man lands in Mumbai wanting to rule it as a don' },
    { n: 'Khaleja', y: 2010, g: 'Action comedy', a: 'Mahesh Babu', s: 'A taxi driver is believed to be a god by a dying village' },
    { n: 'Maharshi', y: 2019, g: 'Drama', a: 'Mahesh Babu', s: "A CEO returns to save his friend's village and its farmers" },
    { n: 'Sarileru Neekevvaru', y: 2020, g: 'Action comedy', a: 'Mahesh Babu', s: 'An army major travels to Kurnool, with a long comedy episode on a train' },
    { n: 'Murari', y: 2001, g: 'Family drama', a: 'Mahesh Babu', s: 'A family curse takes the life of an heir every 48 years' },
    { n: 'Simhadri', y: 2003, g: 'Action', a: 'N. T. Rama Rao Jr.', s: 'A loyal adopted son has a violent past in Kerala' },
    { n: 'Yamadonga', y: 2007, g: 'Fantasy comedy', a: 'N. T. Rama Rao Jr.', s: "A thief lands in the god of death's kingdom and steals his noose" },
    { n: 'Adhurs', y: 2010, g: 'Action comedy', a: 'N. T. Rama Rao Jr.', s: "Twins separated at birth, one of them a priest's assistant" },
    { n: 'Janatha Garage', y: 2016, g: 'Action drama', a: 'N. T. Rama Rao Jr. and Mohanlal', s: "A nature lover joins a workshop that also repairs people's problems" },
    { n: 'Nannaku Prematho', y: 2016, g: 'Action thriller', a: 'N. T. Rama Rao Jr.', s: 'A son takes on a billionaire in London for his dying father' },
    { n: 'Brindavanam', y: 2010, g: 'Family action comedy', a: 'N. T. Rama Rao Jr.', s: "A man poses as a girl's boyfriend and ends up uniting two feuding families" },
    { n: 'Devara: Part 1', y: 2024, g: 'Action drama', a: 'N. T. Rama Rao Jr.', s: 'A feared man of the coast turns against smuggling at sea' },
    { n: 'Chatrapathi', y: 2005, g: 'Action drama', a: 'Prabhas', s: 'A refugee rises against the dons of the Vizag port' },
    { n: 'Mirchi', y: 2013, g: 'Action drama', a: 'Prabhas', s: "A man enters his enemy's village to change it with love" },
    { n: 'Darling', y: 2010, g: 'Romantic comedy', a: 'Prabhas', s: "A man invents a love story set in Switzerland to escape a gangster's daughter" },
    { n: 'Varsham', y: 2004, g: 'Romantic action', a: 'Prabhas and Trisha', s: 'A love that blooms whenever it rains' },
    { n: 'Saaho', y: 2019, g: 'Action thriller', a: 'Prabhas', s: 'An undercover agent, a black box and a crime syndicate' },
    { n: 'Arya', y: 2004, g: 'Romantic drama', a: 'Allu Arjun', s: 'A boy happily keeps loving a girl who is with someone else' },
    { n: 'Julayi', y: 2012, g: 'Action comedy', a: 'Allu Arjun', s: 'A smart idler crosses paths with a bank robber' },
    { n: 'Sarrainodu', y: 2016, g: 'Action', a: 'Allu Arjun', s: "An ex-army man takes on a chief minister's son" },
    { n: 'Pushpa 2: The Rule', y: 2024, g: 'Action drama', a: 'Allu Arjun', s: 'A smuggler who now runs the syndicate wants one photo with the chief minister' },
    { n: 'Desamuduru', y: 2007, g: 'Action romance', a: 'Allu Arjun', s: 'A TV reporter falls for a sanyasin in Manali' },
    { n: 'Kushi', y: 2001, g: 'Romantic comedy', a: 'Pawan Kalyan', s: 'Two college students whose egos stop them from confessing love' },
    { n: 'Tholi Prema', y: 1998, g: 'Romantic drama', a: 'Pawan Kalyan', s: 'A carefree young man falls in love at first sight on a Diwali night' },
    { n: 'Jalsa', y: 2008, g: 'Action comedy', a: 'Pawan Kalyan', s: 'A college student hides his past as a Naxalite' },
    { n: 'Vakeel Saab', y: 2021, g: 'Legal drama', a: 'Pawan Kalyan', s: 'A suspended lawyer defends three women in court' },
    { n: 'Bheemla Nayak', y: 2022, g: 'Action drama', a: 'Pawan Kalyan and Rana Daggubati', s: 'A clash of egos between a police officer and an ex-army man' },
    { n: 'Indra', y: 2002, g: 'Action drama', a: 'Chiranjeevi', s: 'A taxi driver in Varanasi hides his past as a faction leader' },
    { n: 'Tagore', y: 2003, g: 'Action drama', a: 'Chiranjeevi', s: 'A professor runs a secret force against corruption' },
    { n: 'Jagadeka Veerudu Athiloka Sundari', y: 1990, g: 'Fantasy', a: 'Chiranjeevi and Sridevi', s: 'A goddess loses her ring on earth' },
    { n: 'Gharana Mogudu', y: 1992, g: 'Action comedy', a: 'Chiranjeevi', s: 'A worker marries the arrogant owner of his company' },
    { n: 'Sye Raa Narasimha Reddy', y: 2019, g: 'Historical action', a: 'Chiranjeevi', s: 'A ruler revolts against the British years before 1857' },
    { n: 'Waltair Veerayya', y: 2023, g: 'Action comedy', a: 'Chiranjeevi', s: 'A fisherman goes to Malaysia to catch a drug lord' },
    { n: 'Bommarillu', y: 2006, g: 'Family romance', a: 'Siddharth and Genelia', s: 'A father makes every decision for his grown-up son' },
    { n: 'Happy Days', y: 2007, g: 'Coming-of-age drama', a: 'Varun Sandesh and Tamannaah', s: 'Four years in the life of eight engineering students' },
    { n: 'Fidaa', y: 2017, g: 'Romantic drama', a: 'Varun Tej and Sai Pallavi', s: 'An NRI falls for a spirited girl from a Telangana village' },
    { n: 'Pelli Choopulu', y: 2016, g: 'Romantic comedy', a: 'Vijay Deverakonda and Ritu Varma', s: 'A matchmaking visit to the wrong house leads to a food truck' },
    { n: 'Dear Comrade', y: 2019, g: 'Romantic drama', a: 'Vijay Deverakonda and Rashmika Mandanna', s: 'A hot-headed student leader and a state-level cricketer' },
    { n: 'Mahanati', y: 2018, g: 'Biographical drama', a: 'Keerthy Suresh', s: 'The rise and fall of the actress Savitri' },
    { n: 'Ante Sundaraniki', y: 2022, g: 'Romantic comedy', a: 'Nani and Nazriya', s: 'A Brahmin boy and a Christian girl lie to both families to get married' },
    { n: 'Shyam Singha Roy', y: 2021, g: 'Period drama', a: 'Nani', s: 'A filmmaker discovers his past life as a Bengali writer' },
    { n: 'Bhale Bhale Magadivoy', y: 2015, g: 'Romantic comedy', a: 'Nani', s: 'A man hides his forgetfulness from the girl he loves' },
    { n: 'Goodachari', y: 2018, g: 'Spy thriller', a: 'Adivi Sesh', s: 'A new recruit of a secret agency is framed as a traitor' },
    { n: 'Kshanam', y: 2016, g: 'Thriller', a: 'Adivi Sesh', s: "A man returns to India to find his ex-girlfriend's missing daughter" },
    { n: 'Agent Sai Srinivasa Athreya', y: 2019, g: 'Comedy thriller', a: 'Naveen Polishetty', s: 'A detective from Nellore looks into unidentified bodies near railway tracks' },
    { n: 'Jathi Ratnalu', y: 2021, g: 'Comedy', a: 'Naveen Polishetty', s: 'Three friends from a small town land in jail in Hyderabad' },
    { n: 'DJ Tillu', y: 2022, g: 'Crime comedy', a: 'Siddhu Jonnalagadda', s: 'A local DJ is pulled into a murder by his girlfriend' },
    { n: 'Ee Nagaraniki Emaindi', y: 2018, g: 'Comedy', a: 'Vishwak Sen', s: 'Four friends end up in Goa and make a short film' },
    { n: 'Kick', y: 2009, g: 'Action comedy', a: 'Ravi Teja', s: 'A man does everything only for the thrill of it' },
    { n: 'Vikramarkudu', y: 2006, g: 'Action', a: 'Ravi Teja', s: 'A thief looks exactly like a fearless police officer' },
    { n: 'Geethanjali', y: 1989, g: 'Romantic drama', a: 'Nagarjuna', s: 'Two people who are terminally ill fall in love in Ooty' },
    { n: 'Shiva', y: 1989, g: 'Crime action', a: 'Nagarjuna', s: 'A college student fights a gangster with a cycle chain' },
    { n: 'Manmadhudu', y: 2002, g: 'Romantic comedy', a: 'Nagarjuna', s: 'An ad agency manager who cannot stand women' },
    { n: 'Oopiri', y: 2016, g: 'Comedy drama', a: 'Nagarjuna and Karthi', s: 'A paralysed billionaire hires an ex-convict as his caretaker' },
    { n: 'Nuvvu Naaku Nachav', y: 2001, g: 'Family comedy', a: 'Venkatesh', s: "A house guest falls for his host's engaged daughter" },
    { n: 'Drushyam', y: 2014, g: 'Thriller', a: 'Venkatesh', s: 'A cable operator protects his family after an accidental killing' },
    { n: 'F2: Fun and Frustration', y: 2019, g: 'Comedy', a: 'Venkatesh and Varun Tej', s: 'Two frustrated husbands escape to Europe' },
    { n: 'Sankarabharanam', y: 1980, g: 'Musical drama', a: 'J. V. Somayajulu', s: "A great classical singer and a courtesan's daughter who reveres him" },
    { n: 'Sita Ramam', y: 2022, g: 'Period romance', a: 'Dulquer Salmaan and Mrunal Thakur', s: 'An orphan soldier receives letters from a woman who signs as his wife' },
    { n: 'Uppena', y: 2021, g: 'Romantic drama', a: 'Vaisshnav Tej and Krithi Shetty', s: "A fisherman's son loves a powerful landlord's daughter" },
    { n: 'Karthikeya 2', y: 2022, g: 'Mystery adventure', a: 'Nikhil Siddhartha', s: "A doctor searches for Lord Krishna's lost anklet" },
    { n: 'Mathu Vadalara', y: 2019, g: 'Comedy thriller', a: 'Sri Simha', s: "A delivery boy's small scam goes wrong inside an apartment" },
  ];
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MOVIES;
    if (require.main === module) {   // rebuild the names file the phones use for autocomplete (names only, no clues)
      const fs = require('fs'), path = require('path');
      const extra = require('./words.js').movies;
      const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      const seen = new Set(), names = [];
      [...MOVIES.map(m => m.n), ...extra].forEach(n => { if (!seen.has(norm(n))) { seen.add(norm(n)); names.push(n); } });
      names.sort((a, b) => a.localeCompare(b));
      const out = `/* Built from functions/cluepool-movies.js + words.js. Do not edit: run  node functions/cluepool-movies.js */\n(function (root) {\n  const NAMES = ${JSON.stringify(names)};\n  if (typeof module !== 'undefined' && module.exports) module.exports = NAMES; else root.CluePoolNames = NAMES;\n})(typeof self !== 'undefined' ? self : this);\n`;
      fs.writeFileSync(path.join(__dirname, 'cluepool-names.js'), out);
      fs.mkdirSync(path.join(__dirname, '../public/data'), { recursive: true });
      fs.writeFileSync(path.join(__dirname, '../public/data/cluepool-names.js'), out);
      console.log(MOVIES.length, 'movies with clues ·', names.length, 'names for autocomplete');
    }
  } else root.CluePoolMovies = MOVIES;
})(typeof self !== 'undefined' ? self : this);
