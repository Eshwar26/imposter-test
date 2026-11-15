/* Sends each request to the right game's referee, by the room's game. Used by Cloud Functions and the tests. */
(function (root) {
  'use strict';
  const CODE_RE = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
  function makeGames(env, parts) {
    // parts: { Referee, ImposterWords, Pictionary, PictionaryMovies, Wavelength, WavelengthScales }
    const games = {
      imposter: parts.Referee.makeReferee(Object.assign({}, env, { words: parts.ImposterWords })),
      pictionary: parts.Pictionary.makePictionary(Object.assign({}, env, { movies: parts.PictionaryMovies })),
    };
    if (parts.Wavelength) games.wavelength = parts.Wavelength.makeWavelength(Object.assign({}, env, { scales: parts.WavelengthScales }));
    async function which(code) {
      if (!CODE_RE.test(String(code || ''))) return null;
      const g = await env.db.get(`rooms/${code}/game`);
      return games[g] || null;
    }
    return {
      async handle(uid, data) {
        const g = await which(data && data.code);
        if (!g) return { ok: false, error: data && CODE_RE.test(String(data.code || '')) ? 'not_found' : 'bad_request' };
        return g.handle(uid, data);
      },
      async playerGone(code) { const g = await which(code); if (g) await g.playerGone(code); },
      wipeRoom(code) {
        if (!CODE_RE.test(String(code))) return Promise.resolve();
        return env.db.update({ [`private/${code}`]: null, [`secret/${code}`]: null, [`draw/${code}`]: null }).catch(() => {});
      },
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { makeGames }; else root.Games = { makeGames };
})(typeof self !== 'undefined' ? self : this);
