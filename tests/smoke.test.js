// Test dymny w Chromium: menu, maraton, każda minigra z prawdziwym wejściem, ekrany pomocnicze.
const path = require('path');
const { chromium } = require(process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright');
const OUT = process.env.SHOTS || path.join(__dirname, '..', 'tests', 'shots');
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const errors = [];
  const run = async (vp, tag) => {
    const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
    page.on('pageerror', e => errors.push(`[${tag}] pageerror: ${e.message}\n${e.stack}`));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_|net::/.test(m.text())) errors.push(`[${tag}] console: ${m.text()}`); });
    await page.goto('file://' + path.join(__dirname, '..', process.env.PAGE || 'index.html'));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${tag}-01-title.png` });
    // maraton
    await page.click('#scr-title .btn.primary');
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${tag}-02-learn.png` });
    for (let step = 0; step < 14; step++) {
      const ov = await page.$('#overlay:not([hidden]) [data-primary]');
      if (ov) { await page.waitForTimeout(950); await ov.click(); await page.waitForTimeout(250); continue; }
      const type = await page.evaluate(() => window.__G.STAGE.mg && window.__G.STAGE.mg.ch.type);
      if (!type) { await page.waitForTimeout(300); continue; }
      await page.waitForTimeout(1300);
      if (step === 3) await page.screenshot({ path: `${OUT}/${tag}-03-run-${type}.png` });
      await page.evaluate(ok => window.__G.solve(ok), step % 4 !== 1);
      await page.waitForTimeout(500);
    }
    // wszystkie minigry z wejściem gracza
    const types = ['tf', 'flappy', 'bomb', 'match', 'sort', 'whac', 'tower', 'keys'];
    await page.evaluate(() => { const G = window.__G; G.QUESTIONS.forEach(q => G.STORE.markSeen(q.id)); });
    for (const t of types) {
      await page.evaluate(t => {
        const G = window.__G;
        if (G.RUN.s && !G.RUN.s.over) { G.RUN.s.over = true; G.STAGE.stop(); }
        const q = G.QUESTIONS.find(q => G.CH.available(q).has(t) && q.id % 3 === (t.length % 3)) || G.QUESTIONS.find(q => G.CH.available(q).has(t));
        G.RUN.start({ mode: 'focus', pool: [q] });
        setTimeout(() => {
          const ch = G.CH.make(q, t, 3); ch.speed = 1;
          G.STAGE.load(new G.MINIGAMES[t](ch), res => G.RUN.onResult(q, ch, res));
        }, 120);
      }, t);
      await page.waitForTimeout(1700);
      await page.screenshot({ path: `${OUT}/${tag}-10-${t}.png` });
      // prawdziwe wejście
      const box = await page.$eval('#stage', e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
      if (t === 'flappy') { for (let i = 0; i < 6; i++) { await page.keyboard.press('Space'); await page.waitForTimeout(250); } }
      if (t === 'tf') { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300); await page.keyboard.press('ArrowLeft'); }
      if (t === 'tower') { await page.keyboard.down('ArrowRight'); await page.waitForTimeout(700); await page.keyboard.up('ArrowRight'); await page.waitForTimeout(900); }
      if (t === 'bomb') { await page.mouse.click(box.x + box.w * 0.2, box.y + box.h * 0.45); }
      if (t === 'sort') { await page.keyboard.press('Digit1'); await page.waitForTimeout(500); await page.mouse.click(box.x + box.w * 0.8, box.y + box.h * 0.85); }
      if (t === 'whac') { await page.waitForTimeout(1500); await page.mouse.click(box.x + box.w * 0.5, box.y + box.h * 0.45); }
      if (t === 'match') { const b = await page.$$('.wbtn'); if (b.length > 3) { await b[0].click(); await b[b.length - 1].click(); } }
      if (t === 'keys') { const c = await page.$$('.chip'); for (const x of c.slice(0, 4)) await x.click(); await page.screenshot({ path: `${OUT}/${tag}-11-keys-picked.png` }); await page.click('.kom-actions .btn'); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}/${tag}-12-keys-reveal.png` }); }
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/${tag}-13-${t}-after.png` });
      const ovb = await page.$('#overlay:not([hidden]) [data-primary]');
      if (ovb) { await page.screenshot({ path: `${OUT}/${tag}-14-${t}-correction.png` }); await page.waitForTimeout(950); await ovb.click(); }
      await page.waitForTimeout(300);
    }
    // koniec rundy → podsumowanie
    await page.evaluate(() => { const G = window.__G; if (G.RUN.s && !G.RUN.s.over) G.RUN.end('quit'); });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${tag}-20-summary.png`, fullPage: true });
    // mapa, świat, kompendium, obrona
    await page.evaluate(() => window.__G.UI.map()); await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/${tag}-21-map.png` });
    await page.evaluate(() => window.__G.UI.world(4)); await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/${tag}-22-world.png` });
    await page.evaluate(() => window.__G.UI.book(21)); await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${tag}-23-book.png` });
    await page.evaluate(() => window.__G.UI.defense()); await page.waitForTimeout(200);
    await page.click('#scr-defense .btn.primary'); await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/${tag}-24-defense-q.png` });
    await page.click('#scr-defense .btn.primary'); await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/${tag}-25-defense-reveal.png` });
    await page.evaluate(() => window.__G.UI.qModal(window.__G.QUESTIONS[39])); await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/${tag}-26-qmodal.png` });
    await page.close();
  };
  await run({ width: 1000, height: 760 }, 'desk');
  await run({ width: 390, height: 844 }, 'mob');
  await browser.close();
  console.log(errors.length ? errors.join('\n') : 'Brak błędów JS.');
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
