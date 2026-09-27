// Wygenerowane przez tools/pwa.js – nie edytuj ręcznie.
const VERSION = 'mtg-fb5a5f078f';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "css/fonts.css",
  "css/style.css",
  "js/util.js",
  "js/data/_core.js",
  "js/data/w0.js",
  "js/data/w1.js",
  "js/data/w2.js",
  "js/data/w3.js",
  "js/data/w4.js",
  "js/data/w5.js",
  "js/data/w6.js",
  "js/data/w7.js",
  "js/data/oral-a.js",
  "js/data/oral-b.js",
  "js/data/_rules.js",
  "js/sprites.js",
  "js/audio.js",
  "js/store.js",
  "js/challenges.js",
  "js/challenges-oral.js",
  "js/stage.js",
  "js/mg/flappy.js",
  "js/mg/drwal.js",
  "js/mg/wieza.js",
  "js/mg/tasma.js",
  "js/mg/mlotek.js",
  "js/mg/bomba.js",
  "js/mg/room.js",
  "js/mg/spawarka.js",
  "js/mg/komisja.js",
  "js/mg/mownica.js",
  "js/mg/luki.js",
  "js/mg/lowca.js",
  "js/mg/dopytka.js",
  "js/run.js",
  "js/scene.js",
  "js/ui.js",
  "js/defense.js",
  "js/main.js",
  "fonts/Jersey15-latin-ext.woff2",
  "fonts/Jersey15-latin.woff2",
  "fonts/PixelifySans-latin-ext.woff2",
  "fonts/PixelifySans-latin.woff2",
  "fonts/PressStart2P-latin-ext.woff2",
  "fonts/PressStart2P-latin.woff2",
  "fonts/VT323-latin-ext.woff2",
  "fonts/VT323-latin.woff2"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  const fromCache = () => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined));
  const net = fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  });
  e.respondWith(new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    // słaby zasięg: po 3 s pokaż wersję z pamięci, sieć i tak odświeży ją w tle
    const t = setTimeout(() => fromCache().then(finish), 3000);
    net.then(r => { clearTimeout(t); finish(r); })
      .catch(() => { clearTimeout(t); fromCache().then(r => { if (!done) { done = true; resolve(r || Response.error()); } }); });
  }));
});
