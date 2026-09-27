'use strict';
/* SYMULATOR OBRONY – losowanie pytań, odpowiedź na głos, samoocena hasłami, ocena 2–5. */
const DEF = {
  timer: null,
  grade(p) { return p >= 0.9 ? 5 : p >= 0.8 ? 4.5 : p >= 0.7 ? 4 : p >= 0.6 ? 3.5 : p >= 0.5 ? 3 : 2; },
  fmtGrade: g => g.toFixed(1).replace('.', ','),
  stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } },
};

UI.defense = function () {
  DEF.stopTimer();
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  let n = 3, picked = new Set();
  const grid = U.el('div', { class: 'mgrid pick' });
  for (const q of QUESTIONS) {
    const b = U.el('button', { class: 'mcell ' + this.lvlClass(STORE.q(q.id).L), type: 'button', title: `${this.qTag(q)} ${q.t}`, style: { '--wc': WORLDS[q.w].color } }, String(q.id));
    b.addEventListener('click', () => { if (picked.has(q)) picked.delete(q); else picked.add(q); b.classList.toggle('sel', picked.has(q)); AUDIO.play('click'); });
    grid.append(b);
  }
  const nBtns = U.el('div', { class: 'ov-actions' }, ...[1, 3, 5].map(k => {
    const b = this.btn(`${k} ${U.pl(k, 'pytanie', 'pytania', 'pytań')}`, () => { n = k; nBtns.querySelectorAll('.btn').forEach(x => x.classList.remove('on')); b.classList.add('on'); }, 'sm' + (k === 3 ? ' on' : ''));
    return b;
  }));
  const start = list => { if (list.length) DEF.run(list, 0, []); };
  el.append(
    U.el('div', { class: 'topbar' }, this.btn('◀ Menu', () => this.title(), 'ghost'), U.el('h2', {}, 'Symulator obrony')),
    U.el('div', { class: 'card def-intro' },
      U.el('div', { class: 'kom-head' }, U.el('div', { class: 'profs' },
        SPR.img('prof', 4, '', { l: '#b8c4bc', B: '#1b4f8a' }), SPR.img('prof', 4, '', { l: '#4a2c18', B: '#8e1a26' }), SPR.img('prof', 4, '', { l: '#f2ecd9', B: '#138a45' })),
        U.el('div', { class: 'bubble' }, 'Proszę losować.')),
      U.el('p', {}, 'Tak jak na egzaminie: komisja losuje pytanie, a Ty odpowiadasz na głos (ok. 1–2 minuty). Potem odsłaniasz minimum i zaznaczasz hasła, które padły. Wynik to ocena i zmiana poziomu opanowania.'),
      U.el('p', { class: 'tip' }, 'Schemat odpowiedzi: 1) definicja jednym zdaniem, 2) wyliczenie elementów, 3) dwa zdania szczegółu lub przykład.'),
      nBtns,
      U.el('div', { class: 'menu row' },
        this.btn('LOSUJ (jak na egzaminie)', () => start(U.sample(QUESTIONS, n)), 'primary', { 'data-primary': '' }),
        this.btn('LOSUJ Z NAJSŁABSZYCH', () => start(U.shuffle(QUESTIONS).sort((a, b) => STORE.q(a.id).L - STORE.q(b.id).L).slice(0, n)), 'boss'))),
    U.el('div', { class: 'card' },
      U.el('h3', {}, 'Albo wybierz konkretne pytania'),
      grid,
      U.el('div', { class: 'ov-actions' }, this.btn('Start z wybranymi', () => start(U.shuffle([...picked])), ''))));
  this.show('defense');
};

DEF.run = function (list, i, results) {
  DEF.stopTimer();
  const q = list[i];
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  let sec = 0;
  const clock = U.el('div', { class: 'clock' }, '0:00');
  DEF.timer = setInterval(() => {
    sec++;
    clock.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
    clock.classList.toggle('warn', sec > 120);
  }, 1000);
  const reveal = UI.btn('POKAŻ MINIMUM ▶', () => DEF.reveal(list, i, results, sec), 'primary', { 'data-primary': '' });
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('✕ Przerwij', () => UI.defense(), 'ghost'), U.el('h2', {}, `Pytanie ${i + 1}/${list.length}`)),
    U.el('div', { class: 'card def-q' },
      U.el('div', { class: 'qb-tag', style: { '--wc': WORLDS[q.w].color } }, `${UI.qTag(q)} · ${WORLDS[q.w].name}`),
      U.el('h3', { class: 'def-question' }, q.q),
      clock,
      U.el('p', { class: 'tip' }, 'Mów na głos. Zacznij od definicji, potem wymień elementy. Nie podglądaj!'),
      U.el('div', { class: 'ov-actions' }, reveal)));
  UI.show('defense');
};

DEF.reveal = function (list, i, results, sec) {
  DEF.stopTimer();
  const q = list[i];
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  const checks = q.k.map((k, j) => {
    const id = `dk-${q.id}-${j}`;
    const cb = U.el('input', { type: 'checkbox', id });
    return { cb, row: U.el('label', { class: 'dk', for: id }, cb, U.el('span', {}, k)) };
  });
  const rate = UI.btn('OCEŃ ▶', () => {
    const got = checks.filter(c => c.cb.checked).length;
    const p = got / checks.length;
    const g = DEF.grade(p);
    if (p >= 0.8) STORE.record(q.id, true);
    else if (p < 0.5) STORE.record(q.id, false);
    else STORE.markSeen(q.id);
    STORE.data.stats.defenses++; STORE.save();
    AUDIO.play(g >= 4 ? 'ok' : g >= 3 ? 'coin' : 'bad');
    results.push({ q, p, g, sec });
    if (i + 1 < list.length) DEF.run(list, i + 1, results); else DEF.final(list, results);
  }, 'primary', { 'data-primary': '' });
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('✕ Przerwij', () => UI.defense(), 'ghost'), U.el('h2', {}, `Pytanie ${i + 1}/${list.length} · ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`)),
    U.el('div', { class: 'card' }, UI.qBlock(q)),
    U.el('div', { class: 'card' },
      U.el('h3', {}, 'Co padło w Twojej odpowiedzi? Zaznacz uczciwie:'),
      U.el('div', { class: 'dks' }, ...checks.map(c => c.row)),
      U.el('div', { class: 'ov-actions' }, UI.btn('Zaznacz wszystko', () => checks.forEach(c => { c.cb.checked = true; }), 'ghost sm'), rate)));
  UI.show('defense');
};

DEF.final = function (list, results) {
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  const avg = results.reduce((s, r) => s + r.g, 0) / results.length;
  const passed = results.every(r => r.g >= 3);
  const verdicts = passed ? ['Komisja gratuluje. Tytuł magistra na horyzoncie!', 'Pewna odpowiedź. Tak trzymać jutro!'] : ['Jeszcze jedno podejście i będzie dobrze.', 'Komisja daje drugą szansę – powtórz słabsze pytania.'];
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('◀ Menu', () => UI.title(), 'ghost'), U.el('h2', {}, 'Werdykt komisji')),
    U.el('div', { class: 'sum-head ' + (passed ? 'good' : '') },
      U.el('h2', {}, passed ? 'ZDANE!' : 'DO POPRAWKI'),
      U.el('div', { class: 'score' }, DEF.fmtGrade(Math.round(avg * 2) / 2)),
      U.el('p', {}, U.pick(verdicts))),
    U.el('div', { class: 'card' }, ...results.map(r =>
      U.el('div', { class: 'chg ' + (r.g >= 4 ? 'up' : r.g < 3 ? 'down' : '') },
        U.el('b', {}, UI.qTag(r.q)), U.el('span', {}, r.q.t), U.el('span', {}, `${Math.round(r.p * 100)}%`), U.el('b', { class: 'grade' }, DEF.fmtGrade(r.g))))),
    U.el('div', { class: 'menu row' },
      UI.btn('KOLEJNA KOMISJA', () => UI.defense(), 'primary', { 'data-primary': '' }),
      results.some(r => r.g < 4) ? UI.btn('Ćwicz słabsze w grze', () => { const qs = results.filter(r => r.g < 4).map(r => r.q); RUN.start({ mode: 'drill', pool: qs, cap: qs.length, title: 'Poprawka po obronie' }); }, 'boss') : null));
  UI.show('defense');
};
