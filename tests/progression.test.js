// Symulacja długiej gry: ~150 zadań, 85% trafień, restarty rund. Sprawdza postęp i brak zawieszeń.
const path = require('path');
const { chromium } = require(process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.join(__dirname, '..', process.env.PAGE || 'index.html'));
  await page.waitForTimeout(300);
  await page.click('#scr-title .btn.primary');
  const types = {}; let solved = 0, stuck = 0, runs = 1;
  while (solved < 150 && stuck < 40) {
    const state = await page.evaluate(() => {
      const G = window.__G;
      const ov = document.querySelector('#overlay:not([hidden]) [data-primary]');
      if (ov) { ov.disabled = false; ov.click(); return 'overlay'; }
      if (G.UI.cur === 'summary') { document.querySelector('#scr-summary .btn.primary').click(); return 'summary'; }
      if (G.STAGE.mg && !G.STAGE.mg.done && G.STAGE.active) { const t = G.STAGE.mg.ch.type; G.solve(Math.random() < 0.85); return 't:' + t; }
      return 'wait';
    });
    if (state.startsWith('t:')) { types[state.slice(2)] = (types[state.slice(2)] || 0) + 1; solved++; stuck = 0; }
    else if (state === 'summary') runs++;
    else if (state === 'wait') stuck++;
    await page.waitForTimeout(state === 'wait' ? 150 : 60);
  }
  const res = await page.evaluate(() => {
    const G = window.__G, L = {};
    G.QUESTIONS.forEach(q => { const l = G.STORE.q(q.id).L; L[l] = (L[l] || 0) + 1; });
    return { levels: L, mastered: G.STORE.mastered(), seen: G.QUESTIONS.filter(q => G.STORE.q(q.id).seen).length, answers: G.STORE.data.stats.answers };
  });
  await browser.close();
  console.log('rozwiązane:', solved, 'rund:', runs, 'zawieszenia:', stuck);
  console.log('typy minigier:', JSON.stringify(types));
  console.log('poziomy pytań:', JSON.stringify(res.levels), 'opanowane:', res.mastered, 'widziane:', res.seen, 'odpowiedzi:', res.answers);
  console.log(errors.length ? 'BŁĘDY: ' + errors.join('\n') : 'Brak błędów JS.');
  process.exit(errors.length || stuck >= 40 ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
