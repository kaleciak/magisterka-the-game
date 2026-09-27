'use strict';
/* Start gry. */
(function boot() {
  STORE.load();
  AUDIO.sfxOn = STORE.data.set.sfx;
  AUDIO.musicOn = STORE.data.set.music;
  STAGE.init();
  UI.init();
  UI.title();
  if (document.fonts && document.fonts.load) {
    Promise.all(['600 12px "Pixelify Sans"', '12px "Press Start 2P"'].map(f => document.fonts.load(f))).catch(() => {});
  }
  /* Aplikacja na telefon: praca offline, gdy gra jest hostowana (np. GitHub Pages) */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && document.querySelector('link[rel="manifest"]')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
  /* Uchwyty do testów automatycznych (nie wpływają na grę). */
  window.__G = {
    STORE, RUN, CH, STAGE, UI, QUESTIONS, MINIGAMES,
    solve(ok = true) { if (STAGE.mg && !STAGE.mg.done) { STAGE.intro = 0; STAGE.splashEl.hidden = true; STAGE.mg.end({ ok, right: ok ? null : 'test', fix: null }, 0.05); } },
  };
})();
