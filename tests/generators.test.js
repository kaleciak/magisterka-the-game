// Test generatorów: każde pytanie × każdy typ × każdy poziom, wielokrotnie.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { console, Math, JSON, localStorage: { getItem: () => null, setItem: () => {} }, document: undefined };
vm.createContext(ctx);
const files = ['js/util.js', 'js/data/_core.js', ...[0,1,2,3,4,5,6,7].map(i => `js/data/w${i}.js`), 'js/data/_rules.js', 'js/store.js', 'js/challenges.js'];
let src = files.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n;\n');
src += '\n;this.__ = { QUESTIONS, CH, STORE, GEN, U };';
vm.runInContext(src, ctx);
const { QUESTIONS, CH, STORE, GEN, U } = ctx.__;
STORE.load();
let fails = 0; const count = {};
const fail = (q, t, m) => { fails++; if (fails < 60) console.log(`FAIL P${q.id} ${t}: ${m}`); };
for (let rep = 0; rep < 6; rep++) for (const q of QUESTIONS) {
  const av = CH.available(q);
  for (const t of av) for (let L = 0; L <= 5; L++) {
    let ch;
    try { ch = CH.make(q, t, L); } catch (e) { fail(q, t, 'wyjątek ' + e.message); continue; }
    count[t] = (count[t] || 0) + 1;
    if (t === 'flappy' || t === 'bomb') {
      if (ch.options.length < 2) fail(q, t, 'mało opcji: ' + ch.prompt);
      if (ch.answer < 0) fail(q, t, 'brak odpowiedzi');
      if (new Set(ch.options.map(U.key)).size !== ch.options.length) fail(q, t, 'duplikaty opcji');
      const max = t === 'flappy' ? CH.FLAPPY_MAX : CH.BOMB_MAX;
      if (ch.options.some(o => o.length > max)) fail(q, t, 'opcja za długa');
      if (t === 'flappy' && L >= 1 && ch.options.length < 3 && rep === 0) console.log(`  info P${q.id} flappy: tylko ${ch.options.length} opcje dla "${ch.prompt.slice(0,40)}"`);
    }
    if (t === 'tf') { if (ch.items.length < 3) fail(q, t, 'mało zdań'); if (!ch.items.some(i => i.v) || !ch.items.some(i => !i.v)) fail(q, t, 'brak mieszanki P/F'); if (ch.items.some(i => !i.v && !i.fix)) fail(q, t, 'fałsz bez poprawki'); }
    if (t === 'match') { if (ch.pairs.length < 3) fail(q, t, 'mało par'); if (new Set(ch.pairs.map(p => p[1])).size !== ch.pairs.length) fail(q, t, 'duplikat opisu'); }
    if (t === 'sort') { if (ch.cats.length < 2 || ch.items.length < 3) fail(q, t, 'sort mały'); }
    if (t === 'whac') { if (!ch.items.some(i => i.ok) || !ch.items.some(i => !i.ok)) fail(q, t, 'whac bez mieszanki'); if (new Set(ch.items.map(i => i.t)).size !== ch.items.length) fail(q, t, 'whac duplikat'); }
    if (t === 'tower') { if (ch.rows.some(r => r.opts.length < 2 || r.ans < 0)) fail(q, t, 'wiersz wieży zły: ' + JSON.stringify(ch.rows)); if (ch.rows.some(r => new Set(r.opts).size !== r.opts.length)) fail(q, t, 'duplikat w wierszu wieży'); }
    if (t === 'keys') { const g = ch.chips.filter(c => c.ok).length, b = ch.chips.length - g; if (g < 3 || b < 2) fail(q, t, `chipy ${g}/${b}`); if (new Set(ch.chips.map(c => U.key(c.t))).size !== ch.chips.length) fail(q, t, 'duplikat chipów'); }
  }
}
for (let i = 0; i < 200; i++) for (const g of ['oee', 'evm', 'rpn']) { const it = GEN[g](); if (it.d.length < 2 || it.d.includes(it.a)) { fails++; console.log('FAIL gen', g, JSON.stringify(it)); } }
// wybór typu wg poziomu
const lv = {}; for (const q of QUESTIONS) for (let L = 0; L <= 5; L++) { const t = CH.chooseType(q, L); lv[L] = lv[L] || {}; lv[L][t] = (lv[L][t] || 0) + 1; }
console.log('typy wg poziomu:', JSON.stringify(lv));
console.log('wygenerowano:', JSON.stringify(count), 'błędy:', fails);
// przykłady
const q13 = QUESTIONS.find(q => q.id === 13);
console.log('przykład EVM:', JSON.stringify(GEN.evm()));
console.log('przykład OEE:', JSON.stringify(GEN.oee()).slice(0, 300));
console.log('przykład keys P21:', JSON.stringify(CH.make(QUESTIONS.find(q => q.id === 21), 'keys', 4).chips.map(c => (c.ok ? '+' : '-') + c.t)));
process.exit(fails ? 1 : 0);
