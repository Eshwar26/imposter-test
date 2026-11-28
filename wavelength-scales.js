/* Wavelength scales: l = left end of the dial, r = right end.
   Edit freely (keep the same shape), then: npx firebase deploy --only functions
   100 scales, reviewed 2026-11-28. */
(function (root) {
  const SCALES = [
    { l: 'Class', r: 'Mass' }, { l: 'Underrated', r: 'Overrated' }, { l: 'Sad ending', r: 'Happy ending' },
    { l: 'Slow-paced', r: 'Fast-paced' }, { l: 'Hero-driven', r: 'Story-driven' }, { l: 'Serious', r: 'Funny' },
    { l: 'Realistic', r: 'Over-the-top' }, { l: 'Forgettable', r: 'Iconic' }, { l: 'Feel-good', r: 'Gut-wrenching' },
    { l: 'Kids-friendly', r: 'Adults only' }, { l: 'Hero steals the show', r: 'Villain steals the show' }, { l: 'Best watched alone', r: 'Best watched with friends' },
    { l: "Songs don't matter", r: 'Songs make the film' }, { l: 'Overacting', r: 'Subtle acting' }, { l: 'Cringe', r: 'Cool' },
    { l: 'Predictable', r: 'Surprising' }, { l: 'Old-school', r: 'Modern' }, { l: 'Village story', r: 'City story' },
    { l: 'Romantic', r: 'Action-packed' }, { l: 'Dialogue-heavy', r: 'Visual-heavy' }, { l: 'Watch once', r: 'Watch on repeat' },
    { l: 'Everyone loved it', r: 'Divisive' }, { l: 'Comedy track', r: 'Emotional track' }, { l: 'Sequel ruined it', r: 'Sequel improved it' },
    { l: 'Low-key hero entry', r: 'Grand hero entry' }, { l: 'Cheap-looking', r: 'Expensive-looking' }, { l: 'Flop', r: 'Blockbuster' },
    { l: 'Low budget', r: 'Mega budget' }, { l: 'Sentimental', r: 'Cold' }, { l: 'Pure fantasy', r: 'Based on real life' },
    { l: 'Forgettable villain', r: 'Memorable villain' }, { l: 'Cheap thrills', r: 'Deep meaning' }, { l: 'Trailer oversold it', r: 'Trailer undersold it' },
    { l: 'Hero is a good person', r: 'Hero is a rogue' }, { l: 'Loud', r: 'Quiet' }, { l: 'Terrible first-date movie', r: 'Perfect first-date movie' },
    { l: 'Understood by everyone', r: 'Needs a rewatch' }, { l: "Hero's film", r: "Director's film" }, { l: 'Outdated', r: 'Ahead of its time' },
    { l: 'Light', r: 'Intense' }, { l: 'Watch with family', r: 'Hide it from family' }, { l: 'Forgettable BGM', r: 'Goosebumps BGM' },
    { l: 'Fans only', r: 'Everyone enjoys it' }, { l: 'Interval bang flops', r: 'Interval bang kills' }, { l: 'Better in theatres', r: 'Fine on the phone' },
    { l: 'Small screen star', r: 'Pan-India star' }, { l: 'Comedian is wasted', r: 'Comedian steals the show' }, { l: 'First half better', r: 'Second half better' },
    { l: 'Remake ruined it', r: 'Remake beat the original' }, { l: 'Plays on TV forever', r: 'Never on TV' }, { l: 'No memes', r: 'Meme goldmine' },
    { l: 'Simple story', r: 'Mind-bending story' }, { l: 'Soft hero', r: 'Angry young man' }, { l: 'Dance is basic', r: 'Dance is a festival' },
    { l: 'Kid-friendly songs', r: 'Pub songs' }, { l: 'Cringe dialogues', r: 'Iconic punch dialogues' }, { l: 'Forgot the title', r: 'Know every scene' },
    { l: 'Weak climax', r: 'Massive climax' }, { l: 'Bad VFX', r: 'Hollywood-level VFX' }, { l: 'Calm hero', r: 'Whistle-worthy hero' },
    { l: 'Low hype', r: 'Insane hype' }, { l: 'Let down after the hype', r: 'Lived up to the hype' }, { l: 'Theatre was empty', r: 'Theatre was dancing' },
    { l: 'Weak first-day talk', r: 'Massive first-day talk' }, { l: 'Logic needed', r: 'Leave your brain at home' }, { l: 'Villain is a joke', r: 'Villain is terrifying' },
    { l: 'Fights make sense', r: 'Fights defy physics' }, { l: 'Slow burn', r: 'Starts with a bang' }, { l: 'One good scene', r: 'Every scene is good' },
    { l: 'Remembered for songs', r: 'Remembered for fights' }, { l: 'Award material', r: 'Pure entertainer' }, { l: 'One-man show', r: 'Big ensemble cast' },
    { l: "Hero's look forgettable", r: "Hero's look became a trend" }, { l: 'Comedy aged badly', r: 'Comedy still works' }, { l: 'Story fits in one line', r: 'Nobody can explain the story' },
    { l: 'Sankranti family film', r: 'Midnight thriller' }, { l: 'Easy to act out', r: 'Impossible to act out' }, { l: 'Stays with you', r: 'Forgot it by the parking lot' },
    { l: 'Ending explained', r: 'Open ending' }, { l: 'Boring', r: 'Edge of the seat' }, { l: 'Stupid fun', r: 'Smart fun' },
    { l: 'Low energy', r: 'High energy' }, { l: 'Time pass', r: 'Life-changing' }, { l: 'Fake emotions', r: 'Real emotions' },
    { l: 'Feels long', r: 'Feels short' }, { l: 'Seen it all before', r: 'Never seen before' }, { l: 'No goosebumps', r: 'Goosebumps every 10 minutes' },
    { l: 'Wholesome', r: 'Chaotic' }, { l: 'Flat', r: 'Twist after twist' }, { l: 'Sleep-inducing', r: 'Whistle-inducing' },
    { l: 'Dark and gritty', r: 'Bright and colourful' }, { l: 'Scenes you would skip', r: 'Scenes you would rewind' }, { l: 'Forgettable character names', r: 'Character names everyone uses' },
    { l: 'Totally normal', r: 'Totally weird' }, { l: 'Safe film', r: 'Risky film' }, { l: 'Lazy writing', r: 'Smart writing' },
    { l: "Wouldn't recommend", r: 'Would drag friends to watch it' }, { l: 'Quiet hero', r: 'Talkative hero' }, { l: 'Guilty pleasure', r: 'Proud favourite' },
    { l: 'Bad first watch', r: 'Better every rewatch' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = SCALES; else root.WavelengthScales = SCALES;
})(typeof self !== 'undefined' ? self : this);
