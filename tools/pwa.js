// Pliki aplikacji instalowalnej (PWA) do hostingu, np. na GitHub Pages:
// ikony PNG z pikselowego studenta, manifest i service worker z listą plików do pracy offline.
//   node tools/pwa.js   (uruchamiane też przez tools/build.js)
const fs = require('fs'), path = require('path'), vm = require('vm'), zlib = require('zlib'), crypto = require('crypto');
const root = path.join(__dirname, '..');

/* ---------- minimalny koder PNG (RGBA, bez filtrów) ---------- */
const CRC = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(w, h, px) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) px.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

/* ---------- ikona: student w birecie na tle w barwach AGH ---------- */
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/sprites.js'), 'utf8') + '\n;this.PAL = PAL; this.SPRITES = SPRITES;', ctx);
const { PAL, SPRITES } = ctx;
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function icon(size, fill) {
  const px = Buffer.alloc(size * size * 4);
  const put = (x, y, [r, g, b]) => { if (x < 0 || y < 0 || x >= size || y >= size) return; const i = (y * size + x) * 4; px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255; };
  const rect = (x, y, w, h, col) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) put(i, j, col); };
  rect(0, 0, size, size, hex('#3a6150'));
  // pikselowa kratka i pasy w kolorach AGH (zieleń, czerń, czerwień)
  const cell = Math.max(2, Math.round(size / 24));
  for (let y = 0; y < size; y += cell * 2) for (let x = (y / cell / 2) % 2 ? cell : 0; x < size; x += cell * 2) rect(x, y, cell, cell, hex('#335745'));
  const band = Math.round(size * 0.12);
  rect(0, size - band, size, band, hex('#138a45'));
  rect(0, size - band - cell, size, cell, hex('#e0303c'));
  const spr = SPRITES.student, sh = spr.length, sw = spr[0].length;
  const s = Math.floor(size * fill / sh);
  const ox = Math.round((size - sw * s) / 2), oy = Math.round((size - sh * s) / 2 - size * 0.03);
  spr.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.' && PAL[ch]) rect(ox + x * s, oy + y * s, s, s, hex(PAL[ch])); }));
  return png(size, size, px);
}
fs.mkdirSync(path.join(root, 'icons'), { recursive: true });
const icons = [['icon-192.png', 192, 0.62], ['icon-512.png', 512, 0.62], ['icon-maskable-512.png', 512, 0.5], ['apple-touch-icon.png', 180, 0.58]];
for (const [f, size, fill] of icons) fs.writeFileSync(path.join(root, 'icons', f), icon(size, fill));

/* ---------- manifest ---------- */
const manifest = {
  name: 'Magisterka The Game', short_name: 'Magisterka', lang: 'pl',
  description: 'Pikselowa gra do nauki 40 zagadnień na egzamin magisterski: minigry, trening odpowiedzi przed komisją, symulator obrony.',
  start_url: './', scope: './', display: 'standalone', orientation: 'any',
  background_color: '#0b130f', theme_color: '#0b130f',
  icons: [
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
fs.writeFileSync(path.join(root, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

/* ---------- service worker: najpierw sieć (świeża wersja), bez sieci – pamięć podręczna ---------- */
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const assets = ['./', 'index.html', 'manifest.webmanifest', ...icons.map(i => 'icons/' + i[0]),
  ...[...html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+)"/g)].map(m => m[1]),
  ...fs.readdirSync(path.join(root, 'fonts')).filter(f => f.endsWith('.woff2')).map(f => 'fonts/' + f)];
const hash = crypto.createHash('sha1');
for (const a of assets) if (a !== './') hash.update(fs.readFileSync(path.join(root, a)));
const version = 'mtg-' + hash.digest('hex').slice(0, 10);
const sw = `// Wygenerowane przez tools/pwa.js – nie edytuj ręcznie.
const VERSION = '${version}';
const ASSETS = ${JSON.stringify(assets, null, 2)};
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
// kasujemy tylko własne, stare pamięci – domena kaleciak.github.io może mieć też inne strony
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('mtg-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
`;
fs.writeFileSync(path.join(root, 'sw.js'), sw);
fs.writeFileSync(path.join(root, '.nojekyll'), '');
console.log(`PWA: ${icons.length} ikony, manifest, sw.js (${assets.length} plików, ${version})`);
