// Walidacja treści: kompletność pól, długości etykiet, spójność grup.
const load = require('./load-data');
const ctx = load(); const { QUESTIONS, WORLDS } = ctx;
let errors = 0, warns = 0;
const U_plain = t => t.replace(/\*\*/g, '');
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
  // odpowiedź ustna
  const roles = ['def', 'list', 'det', 'ex', 'end'];
  if (q.say.length < 4) err(q, 'za krótka odpowiedź ustna');
  q.say.forEach(([r, t]) => {
    if (!roles.includes(r)) err(q, 'zła rola: ' + r);
    if ((t.match(/\*\*/g) || []).length % 2) err(q, 'niesparowane ** w say: ' + t.slice(0, 40));
    if (!/\*\*/.test(t)) warn(q, 'zdanie bez pojęć: ' + t.slice(0, 40));
  });
  if (q.say[0] && q.say[0][0] !== 'def') warn(q, 'odpowiedź nie zaczyna się od definicji');
  const raw = q.say.map(s => s[1]).join(' ');
  const words = U_plain(raw).split(/\s+/).length;
  if (words > 150) warn(q, `odpowiedź ustna długa: ${words} słów`);
  if (q.fu.length < 2) err(q, 'mało pytań dodatkowych');
  q.fu.forEach(f => { if (f.length < 3 || !f[2]) err(q, 'pytanie dodatkowe bez pułapki: ' + f[0]); });
  if (q.err.length < 3) err(q, 'mało błędów do łowcy');
  q.err.forEach(([o, w]) => { if (!raw.includes(o)) err(q, 'błąd nie występuje w say: ' + o); if (o === w) err(q, 'błąd = oryginał'); if ((w.match(/\*\*/g) || []).length !== (o.match(/\*\*/g) || []).length) err(q, 'niezgodne ** w err: ' + o); });
  const plain = q.a.join(' ');
  if ((plain.match(/\*\*/g) || []).length % 2) err(q, 'niesparowane ** w a');
}
const types = { o: 0, g: 0, s: 0, sc: 0, c: 0 };
QUESTIONS.forEach(q => { for (const k in types) if (q[k].length) types[k]++; });
console.log(`\n${QUESTIONS.length} pytań, błędy: ${errors}, ostrzeżenia: ${warns}`);
console.log('pokrycie typów (liczba pytań):', JSON.stringify(types));
console.log('faktów:', QUESTIONS.reduce((s, q) => s + q.f.length, 0), 'tf:', QUESTIONS.reduce((s, q) => s + q.tf.length, 0), 'scenek:', QUESTIONS.reduce((s, q) => s + q.sc.length, 0));
process.exit(errors ? 1 : 0);
