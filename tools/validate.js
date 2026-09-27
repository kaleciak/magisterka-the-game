// Walidacja treści: kompletność pól, długości etykiet, spójność grup.
const load = require('./load-data');
const { QUESTIONS, WORLDS } = load();
let errors = 0, warns = 0;
const err = (q, m) => { errors++; console.log(`ERR  P${q.id}: ${m}`); };
const warn = (q, m) => { warns++; console.log(`warn P${q.id}: ${m}`); };
const ids = QUESTIONS.map(q => q.id);
if (QUESTIONS.length !== 40) console.log('ERR liczba pytań', QUESTIONS.length);
for (let i = 1; i <= 40; i++) if (!ids.includes(i)) console.log('ERR brak P' + i);
for (const q of QUESTIONS) {
  for (const k of ['t', 'q', 'a', 'k', 'm']) if (!q[k] || (Array.isArray(q[k]) && !q[k].length)) err(q, 'brak ' + k);
  if (!WORLDS[q.w]) err(q, 'zły świat');
  if (q.t.length > 32) warn(q, 't za długie: ' + q.t);
  if (q.k.length < 4) warn(q, 'mało haseł k');
  q.k.forEach(k => { if (k.length > 48) warn(q, 'k długie: ' + k); });
  if (q.f.length < 2) warn(q, 'mało faktów');
  q.f.forEach(([t, d]) => { if (!t || !d) err(q, 'fakt pusty'); if (t.length > 40) warn(q, 'termin długi: ' + t); if (d.length > 130) warn(q, 'opis długi: ' + d.slice(0, 50)); });
  if (q.tf.length < 3) warn(q, 'mało tf');
  q.tf.forEach(t => { if (typeof t[1] !== 'boolean') err(q, 'tf bez bool: ' + t[0]); if (t[1] === false && !t[2]) warn(q, 'fałsz bez poprawki: ' + t[0]); });
  q.c.forEach(c => { if (!c[0].includes('___')) err(q, 'cloze bez ___: ' + c[0]); if (!Array.isArray(c[2]) || c[2].length < 2) err(q, 'cloze dystraktory'); if (c[2].includes(c[1])) err(q, 'cloze dystraktor = odpowiedź'); });
  q.sc.forEach(s => { if (s[2].includes(s[1])) err(q, 'scenka dystraktor = odpowiedź'); if (s[2].length < 2) err(q, 'scenka mało opcji'); });
  q.o.forEach(o => { if (o.i.length < 3) warn(q, 'kolejność krótka: ' + o.n); if (new Set(o.i).size !== o.i.length) err(q, 'duplikat w kolejności'); o.i.forEach(i => { if (i.length > 44) warn(q, 'element kolejności długi: ' + i); }); });
  q.g.forEach(g => { const all = Object.values(g.c).flat(); if (new Set(all).size !== all.length) err(q, 'duplikat w grupach: ' + g.n); if (Object.keys(g.c).length < 2) err(q, 'mniej niż 2 grupy'); all.forEach(i => { if (i.length > 44) warn(q, 'element grupy długi: ' + i); }); });
  q.s.forEach(s => { if (s.y.some(y => s.x.includes(y))) err(q, 'zbiór y∩x'); if (s.y.length < 3) warn(q, 'zbiór mały'); });
  const plain = q.a.join(' ');
  if ((plain.match(/\*\*/g) || []).length % 2) err(q, 'niesparowane ** w a');
}
const types = { o: 0, g: 0, s: 0, sc: 0, c: 0 };
QUESTIONS.forEach(q => { for (const k in types) if (q[k].length) types[k]++; });
console.log(`\n${QUESTIONS.length} pytań, błędy: ${errors}, ostrzeżenia: ${warns}`);
console.log('pokrycie typów (liczba pytań):', JSON.stringify(types));
console.log('faktów:', QUESTIONS.reduce((s, q) => s + q.f.length, 0), 'tf:', QUESTIONS.reduce((s, q) => s + q.tf.length, 0), 'scenek:', QUESTIONS.reduce((s, q) => s + q.sc.length, 0));
process.exit(errors ? 1 : 0);
