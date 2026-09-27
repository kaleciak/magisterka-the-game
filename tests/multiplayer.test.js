// Wielu graczy bez kolizji: dwie karty tego samego gracza grające naraz (scalanie zapisów),
// kilku graczy na jednym urządzeniu (osobne profile, także równocześnie w dwóch kartach),
// migracja zapisu sprzed profili, odizolowane urządzenia. Strona serwowana po HTTP (jak na GitHub Pages).
const path = require('path'), http = require('http'), fs = require('fs');
const { chromium } = require(process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright');
const root = path.join(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0]);
  if (f.endsWith('/')) f += 'index.html';
  const file = path.join(root, path.normalize(f));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
let fails = 0;
const deepEqQ = (a, b) => Object.keys(b).every(k => a[k].L === b[k].L && a[k].ok === b[k].ok);
const check = (cond, msg) => { console.log((cond ? 'OK   ' : 'FAIL ') + msg); if (!cond) fails++; };
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const URL = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();
  const errors = [];
  const open = async ctx => {
    const p = await ctx.newPage();
    p.on('pageerror', e => errors.push(e.message));
    await p.goto(URL);
    await p.waitForFunction(() => window.__G);
    return p;
  };
  const rec = (p, id, ok, n = 1) => p.evaluate(([id, ok, n]) => { for (let i = 0; i < n; i++) window.__G.STORE.record(id, ok); }, [id, ok, n]);
  const stored = (p, pid) => p.evaluate(pid => JSON.parse(localStorage.getItem('magisterka-the-game-v2:p:' + pid)), pid);

  // 1) ten sam gracz w dwóch kartach, odpowiedzi przeplatane bez czekania na synchronizację
  const ctx = await browser.newContext();
  const a = await open(ctx), b = await open(ctx);
  for (let i = 0; i < 3; i++) { await rec(a, 1, true); await rec(b, 2, true); }
  await rec(a, 3, false); await rec(b, 4, true);
  // rekordy jak w grze (run.js): zapis tylko, gdy wynik wyższy od znanego rekordu; obie karty kończą rundę naraz
  await Promise.all([[a, 500], [b, 300]].map(([p, sc]) => p.evaluate(sc => { const S = window.__G.STORE; if (sc > S.data.best.marathon) { S.data.best.marathon = sc; S.save(); } }, sc)));
  await a.waitForTimeout(300);
  let d = await stored(a, 'p1');
  check(d.q[1].L === 3 && d.q[2].L === 3 && d.q[4].L === 1, `dwie karty: poziomy z obu kart zachowane (P1=${d.q[1].L}, P2=${d.q[2].L}, P4=${d.q[4].L})`);
  check(d.q[3].bad === 1 && d.q[3].seen === 1, 'dwie karty: błąd z karty A zachowany');
  check(d.stats.answers === 8 && d.stats.correct === 7, `dwie karty: liczniki zsumowane (odpowiedzi ${d.stats.answers}/8, poprawne ${d.stats.correct}/7)`);
  check(d.best.marathon === 500, `dwie karty: rekord to maksimum (${d.best.marathon})`);
  const memB = await b.evaluate(() => ({ p1: window.__G.STORE.q(1).L, ans: window.__G.STORE.data.stats.answers }));
  check(memB.p1 === 3 && memB.ans === 8, 'dwie karty: karta B zsynchronizowana w pamięci');

  // 1b) dwie karty naraz grają prawdziwy maraton – żadna odpowiedź nie może zginąć
  const before = (await stored(a, 'p1')).stats.answers;
  const play = async (p, n) => {
    await p.evaluate(() => window.__G.RUN.start({ mode: 'marathon', pool: window.__G.QUESTIONS }));
    let solved = 0, guard = 0;
    while (solved < n && guard++ < 400) {
      const st = await p.evaluate(() => {
        const G = window.__G, ov = document.querySelector('#overlay:not([hidden]) [data-primary]');
        if (ov) { ov.disabled = false; ov.click(); return 'ov'; }
        if (G.UI.cur === 'summary') { G.RUN.start({ mode: 'marathon', pool: G.QUESTIONS }); return 'sum'; }
        if (G.STAGE.mg && !G.STAGE.mg.done && G.STAGE.active) { G.solve(Math.random() < 0.8); return 'ok'; }
        return 'wait';
      });
      if (st === 'ok') solved++;
      await p.waitForTimeout(st === 'wait' ? 60 : 20);
    }
    return solved;
  };
  const [na, nb] = await Promise.all([play(a, 25), play(b, 25)]);
  await a.waitForTimeout(700);
  d = await stored(a, 'p1');
  check(d.stats.answers === before + na + nb, `maraton w dwóch kartach: ${na}+${nb} odpowiedzi, zapisano ${d.stats.answers - before}`);
  for (const p of [a, b]) await p.evaluate(() => { const G = window.__G; if (G.RUN.s && !G.RUN.s.over) G.RUN.end('quit'); G.UI.title(); });

  // 2) kilku graczy na jednym urządzeniu – osobne profile, grające równocześnie w dwóch kartach
  const g0 = await stored(a, 'p1');
  const olaId = await a.evaluate(() => { const S = window.__G.STORE; const id = S.addPlayer('Ola'); S.use(id); return id; });
  await rec(a, 10, true, 2);          // Ola w karcie A
  await rec(b, 11, true, 1);          // Gracz 1 w karcie B
  await a.waitForTimeout(200);
  const ola = await stored(a, olaId), g1 = await stored(a, 'p1');
  check(ola.q[10].L === 2 && ola.q[11].L === 0 && ola.q[1].L === 0, 'profile: postęp Oli tylko u Oli');
  check(g1.q[11].L === Math.min(5, g0.q[11].L + 1) && g1.q[10].L === g0.q[10].L && g1.q[1].L === g0.q[1].L, 'profile: postęp Gracza 1 nietknięty przez Olę');
  check(await b.evaluate(() => window.__G.STORE.pid) === 'p1', 'profile: wybór gracza jest osobny dla każdej karty');
  const c = await open(ctx);
  check(await c.evaluate(() => window.__G.STORE.player().name) === 'Ola', 'profile: nowa karta otwiera ostatnio wybranego gracza');
  check(await c.evaluate(() => window.__G.STORE.livePlayers().map(p => p.name).join(',')) === 'Gracz 1,Ola', 'profile: lista graczy wspólna dla kart');
  await c.evaluate(() => window.__G.UI.players()); await c.waitForTimeout(150);
  check((await c.$$('#modal .prow')).length === 2, 'profile: okno „Gracze” pokazuje obu graczy');
  await c.evaluate(() => { window.__G.STORE.reset(); });
  check(deepEqQ((await stored(c, 'p1')).q, g1.q), 'profile: wyzerowanie Oli nie rusza Gracza 1');
  await c.evaluate(id => window.__G.STORE.removePlayer(id), olaId);
  check(await c.evaluate(() => window.__G.STORE.pid) === 'p1' && !(await stored(c, olaId)), 'profile: usunięcie gracza kasuje tylko jego zapis');

  // 3) migracja zapisu sprzed profili
  const ctx2 = await browser.newContext();
  const m0 = await ctx2.newPage();
  await m0.goto(URL + 'manifest.webmanifest');
  await m0.evaluate(() => localStorage.setItem('magisterka-the-game-v2', JSON.stringify({ q: { 5: { L: 4, seen: 1, ok: 4, bad: 0, last: 9, best: 4 } }, stats: { answers: 4 } })));
  const m = await open(ctx2);
  check(await m.evaluate(() => window.__G.STORE.q(5).L) === 4, 'migracja: stary postęp trafia do „Gracza 1”');

  // 4) osobne urządzenia (osobne przeglądarki) nie widzą swoich zapisów
  const ctx3 = await browser.newContext();
  const x = await open(ctx3);
  check(await x.evaluate(() => window.__G.STORE.q(1).L) === 0, 'urządzenia: nowe urządzenie zaczyna od zera, bez cudzych wyników');

  await browser.close();
  server.close();
  if (errors.length) { fails++; console.log('BŁĘDY JS:\n' + errors.join('\n')); }
  console.log(fails ? `Nieudane: ${fails}` : 'Wszystko OK – brak kolizji.');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
