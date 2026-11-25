/* ════════════════════════════════════════════════════════════════
   Cinefied · Lines content · v0.2.0
   Everything Lines shows: the scene themes and the secret sentences.
   No game code lives here, so it is safe to edit.

   To add content: add lines to a list below, upload this file, then
   change ?v= on the <script src="data/lines.js?v=..."> line in
   lines.html so every phone loads the new copy.

   themes     s = the situation, r = example roles (players can always make up their own)
   random     Tenglish sentences, grouped by feel (the groups are only for editing)
   Movie titles and dialogues come from data/movies.js (lines.html builds them).

   How often each kind comes up is set by MIX (random 75%, dialogues 15%, titles 10%).
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';

  const MIX = { random: 75, dialogues: 15, titles: 10 };

  // ═════════════ THEMES (50) ═════════════
  const themes = [
    // everyday
    { s: 'Government job interview', r: ['Interviewer', 'Candidate', 'Peon'] },
    { s: 'Engagement lo ring missing', r: ['Bride', 'Groom', 'Both mothers', 'Photographer'] },
    { s: 'Income tax raid', r: ['IT officer', 'Businessman', 'His wife', 'Driver'] },
    { s: 'Parent-teacher meeting', r: ['Class teacher', 'Amma', 'Nanna', 'Student'] },
    { s: 'USA ki send-off at the airport', r: ['Son', 'Amma', 'Nanna', 'Cousin'] },
    { s: 'Temple festival committee meeting', r: ['President', 'Treasurer', 'Villagers'] },
    { s: 'Real estate site visit', r: ['Broker', 'Buyer', 'Land owner'] },
    { s: 'Doctor consultation', r: ['Doctor', 'Patient', 'Attendant'] },
    { s: 'Matrimony site video call', r: ['Bride', 'Groom', 'Both mothers'] },
    { s: 'Customer care call', r: ['Executive', 'Angry customer', 'Supervisor'] },
    { s: 'College farewell', r: ['Principal', 'Students', 'Lecturer'] },
    { s: 'Cooking show live', r: ['Chef', 'Host', 'Guest'] },
    { s: 'Gym first day', r: ['Trainer', 'New member', 'Gym regular'] },
    { s: 'Election campaign door to door', r: ['Candidate', 'Voter', 'Party worker'] },
    { s: 'Driving licence test', r: ['RTO officer', 'Learner', 'Driving school master'] },
    { s: 'Kirana shop credit khata', r: ['Shop owner', 'Customers'] },
    { s: 'News channel debate', r: ['Anchor', 'Panelists'] },
    { s: 'Insurance agent visit', r: ['Agent', 'Family'] },
    { s: 'Bus stand enquiry counter', r: ['Staff', 'Travellers'] },
    { s: 'Jyothishyudu consultation', r: ['Jyothishyudu', 'Family'] },
    { s: 'Wedding planner meeting', r: ['Planner', 'Bride', 'Groom\'s mother'] },
    { s: 'Hair salon', r: ['Barber', 'Customer', 'Next customer'] },
    { s: 'Startup pitch to investors', r: ['Founder', 'Investors'] },
    { s: 'Neighbour borrowing things again', r: ['Neighbours'] },
    { s: 'Class reunion after 10 years', r: ['Old friends'] },
    // movie-flavoured
    { s: 'Hero meets villain for the first time', r: ['Hero', 'Villain', 'Henchman'] },
    { s: 'Director narrating a story to a star hero', r: ['Director', 'Hero', 'Manager'] },
    { s: 'Heroine\'s dad interviews the hero', r: ['Heroine\'s dad', 'Hero', 'Heroine'] },
    { s: 'Comedian\'s pelli choopulu', r: ['Comedian', 'Bride\'s family'] },
    { s: 'Village festival with rival families', r: ['Two family heads', 'Villagers'] },
    { s: 'Undercover cop in a gang meeting', r: ['Don', 'Undercover cop', 'Gang'] },
    { s: 'Court room climax', r: ['Judge', 'Lawyers', 'Witness'] },
    { s: 'Ghost house night stay', r: ['Friends', 'Watchman', 'Ghost'] },
    { s: 'Treasure hunt in an old fort', r: ['Explorers', 'Guide'] },
    { s: 'Climax shooting with a real lion', r: ['Trainer', 'Hero', 'Director'] },
    { s: 'Hero training montage with guru', r: ['Guru', 'Hero'] },
    { s: 'Kidnapper ransom call', r: ['Kidnapper', 'Rich father', 'Police'] },
    { s: 'Mass hero at a politician\'s press meet', r: ['Politician', 'Hero', 'Reporters'] },
    { s: 'College ragging scene', r: ['Seniors', 'Junior', 'Lecturer'] },
    { s: 'Amma reveals the hero\'s flashback', r: ['Amma', 'Hero', 'Sister'] },
    { s: 'Bank robbery planning', r: ['Gang leader', 'Gang'] },
    { s: 'Talk show with a star couple', r: ['Host', 'Star couple'] },
    { s: 'Love letter reaches the wrong person', r: ['Sender', 'Receiver', 'Friend'] },
    { s: 'Villain\'s birthday party', r: ['Villain', 'Guests', 'Hero in disguise'] },
    { s: 'Fake baba ashram', r: ['Baba', 'Devotees', 'Inspector'] },
    { s: 'Casting call auditions', r: ['Casting director', 'Aspiring actors'] },
    { s: 'Hero returns to his village from abroad', r: ['Hero', 'Villagers', 'Thatha'] },
    { s: 'Time travel to Krishnadevaraya\'s court', r: ['King', 'Ministers', 'Time traveller'] },
    { s: 'Release day, rival theatre owners', r: ['Two owners', 'Distributor'] },
    { s: 'Superhero recruiting a team', r: ['Superhero', 'Recruits'] }
  ];

  // ═════════════ RANDOM SENTENCES (batch 1: 100) ═════════════
  const random = {
    everyday: [
      'Na phone charger evaru teesaru?',
      'Ee roju biryani lekapothe nenu bratakalenu.',
      'Maa amma ki WhatsApp forwards pampodhu.',
      'Nenu gym ki join ayyanu, kaani vellaledu.',
      'Petrol rate chusi naaku BP vachindi.',
      'Traffic lo ganta sepu irukkupoyanu.',
      'Maa pakkinti uncle roju 5 ki lechi paatalu paadutadu.',
      'EMI kattali, salary inka raaledu.',
      'Na Netflix password evariki ichhanu?',
      'Chai lekunda nenu maatladanu.',
      'Ee roju Monday la undi, kaani Friday.',
      'Nenu diet lo unna, oka samosa matrame.',
      'Maa intlo WiFi kanna pakkintlo WiFi fast.',
      'Nenu 2 nimishallo vasta. Already 1 hour ayyindi.',
      'Office lo meeting meeting meeting, pani eppudu?',
      'Maa thatha ki Instagram account undi.',
      'Nenu last bench student ni.',
      'Auto vaadu "meter ledu sir" annadu.',
      'Pelli ki vachina vaallu bhojanam kosame vacharu.',
      'Online lo order chesina dress size match avvaledu.',
      'Rain vasthe current pothundi, guaranteed.',
      'Maa boss naa birthday marchipoyadu.',
      'Nenu cook chesina daal ki evaru peru pettaleru.',
      'Exam mundu raatri matrame chaduvutha.',
      'Atthagaru phone chesindi, attend cheyyala?'
    ],
    weird: [
      'Nenu ninna oka buffalo tho race petti odipoyanu.',
      'Naa cat ki naa kanna ekkuva followers unnaru.',
      'Chinnappudu mango tree meeda nidrapoyevaadini.',
      'Moon meeda chai stall pedatha.',
      'Naa shadow naa kanna mundu nadustundi.',
      'Oka chiluka naaku English nerpinchindi.',
      'Nenu dreams lo matrame dance baaga chestha.',
      'Naa left shoe ki oka secret undi.',
      'Nenu oka sari deyyam tho selfie teesukunna.',
      'Kodi pilla naa alarm clock.',
      'Nenu Mars nunchi vacchanu, evariki cheppakandi.',
      'Naa umbrella ki peru pettanu: Ramesh.',
      'Vankaya ante naaku bhayam.',
      'Nenu oka sari dosa tho propose chesanu.',
      'Naa phone raatri naatho maatladutundi.'
    ],
    dramatic: [
      'Ee roju naa jeevitham marchipoye roju.',
      'Nuvvu leka nenu sunna.',
      'Idi naa last warning.',
      'Nijam eppudu daagadhu.',
      'Naa kallallo neellu kaadu, nippu.',
      'Ee kshanam kosame nenu puttanu.',
      'Okka maata, okke okka maata.',
      'Kaalam samadhanam chebutundi.',
      'Ee yuddham ippude modalaindi.',
      'Nenu odipoledu, nerchukunnanu.',
      'Naa gunde aagipoyindi.',
      'Evaru unna lekapoyina, nenu untanu.',
      'Idi katha kaadu, naa jeevitham.',
      'Ammaku maata ichhanu.',
      'Ninnu marchipovadam naa valla kaadu.'
    ],
    questions: [
      'Nuvvu deyyalanu nammutava?',
      'Ee madhya evaraina ninnu follow chestunnara?',
      'Nee favourite hero evaru, nijam cheppu?',
      'Mana first meeting gurthunda?',
      'Ee plan lo emaina problem unda?',
      'Nuvvu evarini preminchav?',
      'Nee bank balance entha?',
      'Ninna raatri ekkada unnav?',
      'Neeku Telugu vacha, leka acting aa?',
      'Ee secret inkevariki telusu?',
      'Idi nee idea aa, leka mee amma idea aa?',
      'Nuvvu last time eppudu edichav?',
      'Pizza meeda pineapple ok aa?',
      'Nenu ela kanipistunnanu, nijam cheppu?',
      'Neeku evaraina dabbulu baaki unnara?'
    ],
    'movie-ish': [
      'Ee scene lo hero nene.',
      'Interval tarvata asalu katha.',
      'Background music vinipistunda?',
      'Ippudu slow motion lo nadavali.',
      'Naa entry ki whistles kavali.',
      'Climax lo nenu chanipothanu anukunnara?',
      'Ee family ki naa sentiment teliyadu.',
      'Villain ki kuda oka flashback untundi.',
      'Item song ki budget ledu.',
      'Ee dialogue ki theatre lo papers egurutayi.',
      'Comedy track lo pedda twist undi.',
      'Migatadi sequel lo cheptha.',
      'Director\'s cut lo ee scene undi.',
      'Naa mass ki konchem class add chesthe.',
      'Ee fight lo 50 mandi, nenu okkadine.',
      'Song kosam Switzerland vellali.',
      'First day first show, first row.',
      'Climax lo varsham padali.',
      'Naa intro song lo 100 dancers.',
      'Hero amma entry tho emotional scene.'
    ],
    fun: [
      'Naa kaallu nijamga mass.',
      'WiFi lekapothe nenu ekkadiki vellanu.',
      'Cricket match chusthe nenu umpire ni.',
      'Naaku Hindi raadu, kaani manage chestha.',
      'Mee intlo filter coffee untunda?',
      'Nenu professional nidra pote vaadini.',
      'Mobile data aipoyindi, jeevitham aipoyindi.',
      'Ee roju naaku lottery tagilindi... kalalo.',
      'Nenu ekkadiki vellina auto vaallu nannu gurtupadataru.',
      'Naa autograph teesukondi, tarvata expensive avtundi.'
    ]
  };

  root.CinefiedLines = {
    version: '0.2.0',
    MIX,
    themes,
    random: Object.keys(random).flatMap(k => random[k]),
  };
})(typeof window !== 'undefined' ? window : globalThis);
