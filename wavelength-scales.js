/* Wavelength scales: l = left end of the dial, r = right end.
   Edit freely (keep the same shape), then: npx firebase-tools deploy --only functions
   The first 40 are from the original Wavelength; the rest are new. */
(function (root) {
  const SCALES = [
    { l: 'Class', r: 'Mass' }, { l: 'Underrated', r: 'Overrated' }, { l: 'Sad ending', r: 'Happy ending' }, { l: 'Slow-paced', r: 'Fast-paced' },
    { l: 'Hero-driven', r: 'Story-driven' }, { l: 'Serious', r: 'Funny' }, { l: 'Realistic', r: 'Over-the-top' }, { l: 'Forgettable', r: 'Iconic' },
    { l: 'Feel-good', r: 'Gut-wrenching' }, { l: 'Kids-friendly', r: 'Adults only' }, { l: 'Hero steals the show', r: 'Villain steals the show' },
    { l: 'Best watched alone', r: 'Best watched with friends' }, { l: "Songs don't matter", r: 'Songs make the film' },
    { l: 'Overacting', r: 'Subtle acting' }, { l: 'Cringe', r: 'Cool' }, { l: 'Predictable', r: 'Surprising' }, { l: 'Old-school', r: 'Modern' },
    { l: 'Village story', r: 'City story' }, { l: 'Romantic', r: 'Action-packed' }, { l: 'Dialogue-heavy', r: 'Visual-heavy' },
    { l: 'Watch once', r: 'Watch on repeat' }, { l: 'Everyone loved it', r: 'Divisive' }, { l: 'Comedy track', r: 'Emotional track' },
    { l: 'Sequel ruined it', r: 'Sequel improved it' }, { l: 'Low-key hero entry', r: 'Grand hero entry' },
    { l: 'Cheap-looking', r: 'Expensive-looking' }, { l: 'Flop', r: 'Blockbuster' }, { l: 'Low budget', r: 'Mega budget' },
    { l: 'Sentimental', r: 'Cold' }, { l: 'Pure fantasy', r: 'Based on real life' }, { l: 'Forgettable villain', r: 'Memorable villain' },
    { l: 'Cheap thrills', r: 'Deep meaning' }, { l: 'Trailer oversold it', r: 'Trailer undersold it' },
    { l: 'Hero is a good person', r: 'Hero is a rogue' }, { l: 'Loud', r: 'Quiet' }, { l: 'Terrible first-date movie', r: 'Perfect first-date movie' },
    { l: 'Understood by everyone', r: 'Needs a rewatch' }, { l: "Hero's film", r: "Director's film" }, { l: 'Outdated', r: 'Ahead of its time' }, { l: 'Light', r: 'Intense' },
    // new
    { l: 'Watch with family', r: 'Hide it from family' }, { l: 'Forgettable BGM', r: 'Goosebumps BGM' }, { l: 'Fans only', r: 'Everyone enjoys it' },
    { l: 'Interval bang flops', r: 'Interval bang kills' }, { l: 'Better in theatres', r: 'Fine on the phone' }, { l: 'Small screen star', r: 'Pan-India star' },
    { l: 'Comedian is wasted', r: 'Comedian steals the show' }, { l: 'Heroine is decoration', r: 'Heroine drives the story' },
    { l: 'First half better', r: 'Second half better' }, { l: 'Remake ruined it', r: 'Remake beat the original' }, { l: 'Plays on TV forever', r: 'Never on TV' },
    { l: 'No memes', r: 'Meme goldmine' }, { l: 'Simple story', r: 'Mind-bending story' }, { l: 'Soft hero', r: 'Angry young man' },
    { l: 'Dance is basic', r: 'Dance is a festival' }, { l: 'Short film', r: 'Three-hour epic' }, { l: 'Kid-friendly songs', r: 'Pub songs' },
    { l: 'Cringe dialogues', r: 'Iconic punch dialogues' }, { l: 'Forgot the title', r: 'Know every scene' }, { l: 'Weak climax', r: 'Massive climax' },
    { l: 'Morning show crowd', r: 'Midnight benefit show crowd' }, { l: 'Bad VFX', r: 'Hollywood-level VFX' }, { l: 'Calm hero', r: 'Whistle-worthy hero' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = SCALES; else root.WavelengthScales = SCALES;
})(typeof self !== 'undefined' ? self : this);
