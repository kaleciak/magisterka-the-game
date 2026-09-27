'use strict';
/* SYMULATOR OBRONY 2.0 – losowanie, odpowiedź na głos wg planu, porównanie ze wzorcem zdanie po zdaniu,
   pytanie dodatkowe komisji, ocena 2–5 i zmiana poziomu opanowania. */
const DEF = {
  timer: null,
  room: null,
  raf: 0,
  grade(p) { return p >= 0.9 ? 5 : p >= 0.8 ? 4.5 : p >= 0.7 ? 4 : p >= 0.6 ? 3.5 : p >= 0.5 ? 3 : 2; },
  fmtGrade: g => g.toFixed(1).replace('.', ','),
  fmtTime: sec => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`,
  stopTimer() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.mic.stop();
    if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
    this.room = null;
  },
  /* scenka z komisją animowana poza pętlą gry */
  scene(parent, opts) {
    this.room = new Room(parent, opts);
    let last = performance.now();
    const loop = now => {
      if (!this.room || !this.room.el.isConnected) { this.raf = 0; return; }
      this.room.update(Math.min(0.05, (now - last) / 1000));
      last = now;
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
    return this.room;
  },
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
      U.el('p', {}, 'Tak jak na egzaminie: komisja losuje pytanie, a Ty odpowiadasz na głos (ok. 1–2 minuty). Potem porównujesz się ze wzorcową odpowiedzią zdanie po zdaniu, a komisja zadaje pytanie dodatkowe. Wynik to ocena i zmiana poziomu opanowania.'),
      U.el('ol', { class: 'plan-steps' },
        U.el('li', {}, U.el('b', {}, 'Definicja'), ' – jedno zdanie: „X to…”.'),
        U.el('li', {}, U.el('b', {}, 'Wyliczenie'), ' – „Wyróżniamy… / składa się z…”.'),
        U.el('li', {}, U.el('b', {}, 'Rozwinięcie'), ' – najważniejszy element lub mechanizm.'),
        U.el('li', {}, U.el('b', {}, 'Przykład'), ' – z praktyki, z zakładu, z liczbą.'),
        U.el('li', {}, U.el('b', {}, 'Domknięcie'), ' – po co to jest, wniosek.')),
      U.el('p', { class: 'tip' }, 'Podpowiedź z planem kosztuje punkty – jak na prawdziwej obronie, gdzie promotor musi Cię naprowadzać.'),
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

/* Rozpoznawanie mowy (Chrome/Edge/Android): gra słucha odpowiedzi i sprawdza, które pojęcia kluczowe padły. */
DEF.mic = {
  rec: null, on: false, text: '', interim: '',
  api() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; },
  start(onUpd, onErr) {
    const API = this.api();
    if (!API) return onErr('Ta przeglądarka nie obsługuje rozpoznawania mowy.');
    this.stop();
    this.text = ''; this.interim = ''; this.on = true;
    const rec = this.rec = new API();
    rec.lang = 'pl-PL'; rec.continuous = true; rec.interimResults = true;
    rec.onresult = e => {
      let tmp = '';
      for (let k = e.resultIndex; k < e.results.length; k++) {
        const r = e.results[k];
        if (r.isFinal) this.text += ' ' + r[0].transcript; else tmp += ' ' + r[0].transcript;
      }
      this.interim = tmp;
      onUpd();
    };
    rec.onerror = e => {
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      this.on = false;
      onErr(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'Brak dostępu do mikrofonu – oceń się ręcznie.' : 'Rozpoznawanie mowy przerwane (' + e.error + ').');
    };
    rec.onend = () => { if (this.on && this.rec === rec) { try { rec.start(); } catch (err) { this.on = false; } } };
    try { rec.start(); } catch (err) { this.on = false; onErr('Nie udało się włączyć mikrofonu.'); }
  },
  stop() {
    this.on = false;
    if (this.rec) { try { this.rec.stop(); } catch (e) { /* już zatrzymane */ } this.rec = null; }
  },
  all() { return (this.text + ' ' + this.interim).trim(); },
};
DEF.fold = s => U.norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
/* czy pojęcie padło w wypowiedzi: dopasowanie rdzeni słów (odmiana przez przypadki) */
DEF.heard = function (term, folded) {
  const words = DEF.fold(term).split(' ').filter(w => w.length >= 3 || /\d/.test(w));
  if (!words.length) return false;
  const txt = ' ' + folded + ' ';
  const hit = words.filter(w => /\d/.test(w) ? txt.includes(w) : txt.includes(' ' + w.slice(0, w.length <= 4 ? w.length : Math.max(4, Math.ceil(w.length * 0.7))))).length;
  return hit >= Math.ceil(words.length * 0.6);
};

DEF.run = function (list, i, results) {
  DEF.stopTimer();
  const q = list[i];
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  let sec = 0, hint = 0;
  const clock = U.el('div', { class: 'clock' }, '0:00');
  const target = U.el('div', { class: 'clock-t' }, 'cel: 1:00–2:30');
  DEF.timer = setInterval(() => {
    sec++;
    clock.textContent = DEF.fmtTime(sec);
    clock.classList.toggle('ok', sec >= 60 && sec <= 150);
    clock.classList.toggle('warn', sec > 150);
    if (sec === 45 && DEF.room) DEF.room.say('Mhm… proszę kontynuować.');
    if (sec === 150 && DEF.room) DEF.room.say('Proszę powoli zmierzać do konkluzji.');
  }, 1000);
  const hintBox = U.el('div', { class: 'def-hint' });
  const hintBtn = UI.btn('Podpowiedź: plan (−5%)', () => {
    hint++;
    hintBox.innerHTML = '';
    hintBox.append(UI.planEl(q, hint >= 2));
    if (DEF.room) DEF.room.set(-0.08, hint >= 2 ? 'Naprowadzę Pana/Panią słowami kluczowymi…' : 'Proszę zacząć od definicji, potem wyliczenie.');
    if (hint >= 2) hintBtn.remove(); else hintBtn.textContent = 'Podpowiedź: pojęcia (−10%)';
    AUDIO.play('click');
  }, 'ghost sm hint-btn');
  const terms = CH.boldTerms(q);
  const live = U.el('div', { class: 'mic-live', hidden: true }, U.el('div', { class: 'mic-n' }), U.el('div', { class: 'mic-t' }));
  const updLive = () => {
    const f = DEF.fold(DEF.mic.all());
    const n = terms.filter(t => DEF.heard(t, f)).length;
    live.firstChild.textContent = `🎤 Słucham… pojęcia kluczowe: ${n}/${terms.length}`;
    live.lastChild.textContent = DEF.mic.all().slice(-160) || '(mów wyraźnie, pełnymi zdaniami)';
    if (DEF.room && n && n % 4 === 0 && n !== live._n) { live._n = n; DEF.room.set(0.06, U.pick(['Mhm, dobrze.', 'Tak…', 'Słuchamy dalej.'])); }
  };
  let micBtn = null;
  if (DEF.mic.api()) {
    micBtn = UI.btn('🎤 Słuchaj mnie', () => {
      if (DEF.mic.on) { DEF.mic.stop(); micBtn.textContent = '🎤 Słuchaj mnie'; micBtn.classList.remove('on'); return; }
      live.hidden = false;
      micBtn.textContent = '■ Zatrzymaj'; micBtn.classList.add('on');
      DEF.mic.start(updLive, msg => { live.hidden = false; live.lastChild.textContent = msg; micBtn.textContent = '🎤 Słuchaj mnie'; micBtn.classList.remove('on'); });
      updLive();
    }, 'answer sm');
  }
  const reveal = UI.btn('SKOŃCZYŁEM – PORÓWNAJ ZE WZORCEM ▶', () => DEF.reveal(list, i, results, sec, hint, DEF.mic.all()), 'primary', { 'data-primary': '' });
  const card = U.el('div', { class: 'card def-q' });
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('✕ Przerwij', () => UI.defense(), 'ghost'), U.el('h2', {}, `Pytanie ${i + 1}/${list.length}`)),
    card);
  DEF.scene(card, { say: U.pick(['Proszę, słuchamy.', 'Zapraszamy do odpowiedzi.', 'Proszę spokojnie zacząć.']) });
  card.append(
    U.el('div', { class: 'qb-tag', style: { '--wc': WORLDS[q.w].color } }, `${UI.qTag(q)} · ${WORLDS[q.w].name}`),
    U.el('h3', { class: 'def-question' }, q.q),
    U.el('div', { class: 'clock-row' }, clock, target),
    U.el('p', { class: 'tip' }, 'Mów na głos, pełnymi zdaniami. Definicja → wyliczenie → rozwinięcie → przykład → domknięcie. Nie podglądaj!'),
    hintBox,
    live,
    U.el('div', { class: 'ov-actions' }, micBtn, hintBtn, reveal),
    micBtn ? U.el('p', { class: 'tip' }, 'Mikrofon (opcjonalnie): gra rozpozna, które pojęcia kluczowe padły, i sama zaznaczy zdania wzorca. Działa w Chrome/Edge, wymaga zgody na mikrofon.') : null);
  UI.show('defense');
};

DEF.hintCost = h => (h >= 1 ? 0.05 : 0) + (h >= 2 ? 0.1 : 0);

DEF.reveal = function (list, i, results, sec, hint, said) {
  DEF.stopTimer();
  const q = list[i];
  const folded = said ? DEF.fold(said) : '';
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  let heardAll = 0, termsAll = 0;
  const checks = q.say.map(([r, t], j) => {
    const id = `ds-${q.id}-${j}`;
    const cb = U.el('input', { type: 'checkbox', id });
    let html = U.md(t);
    if (said) {
      const ps = CH.parseBold(t);
      const bs = ps.filter(p => p.k === 'b');
      const hs = bs.filter(p => DEF.heard(p.t, folded));
      heardAll += hs.length; termsAll += bs.length;
      html = ps.map(p => p.k === 'b' ? `<b class="${hs.includes(p) ? 'heard' : 'unheard'}">${U.esc(p.t)}</b>` : U.esc(p.t)).join('');
      if (bs.length && hs.length / bs.length >= 0.5) cb.checked = true;
    }
    const row = U.el('label', { class: 'dk ds say-' + r, for: id }, cb, U.el('span', { class: 'role role-' + r }, CH.ROLE_NAME[r]), U.el('span', { class: 'say-t', html }));
    return { cb, row, w: r === 'def' ? 1.5 : 1 };
  });
  const cov = () => { const all = checks.reduce((s, c) => s + c.w, 0); return checks.reduce((s, c) => s + (c.cb.checked ? c.w : 0), 0) / all; };
  const meter = U.el('div', { class: 'cov' }, U.el('span', {}, 'Pokrycie wzorca: 0%'), U.el('div', { class: 'pbar' }, U.el('i', { style: { width: '0%' } })));
  const upd = () => { const p = Math.round(cov() * 100); meter.firstChild.textContent = `Pokrycie wzorca: ${p}%`; meter.querySelector('i').style.width = p + '%'; };
  checks.forEach(c => c.cb.addEventListener('change', () => { upd(); AUDIO.play('tick'); }));
  upd();
  const timeNote = sec < 40 ? 'Za krótko – na obronie rozwiń odpowiedź do ok. 1,5 minuty (dodaj przykład i domknięcie).'
    : sec > 180 ? 'Za długo – komisja przerwie. Trzymaj się planu i mów konkretnie.' : 'Dobry czas odpowiedzi.';
  const next = UI.btn('DALEJ: PYTANIE DODATKOWE ▶', () => {
    const c = cov();
    if (!q.fu.length) return DEF.score(list, i, results, { sec, hint, cov: c, fu: 1 });
    DEF.followUp(list, i, results, { sec, hint, cov: c });
  }, 'primary', { 'data-primary': '' });
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('✕ Przerwij', () => UI.defense(), 'ghost'), U.el('h2', {}, `Pytanie ${i + 1}/${list.length} · ${DEF.fmtTime(sec)}`)),
    U.el('div', { class: 'card' },
      U.el('div', { class: 'qb-tag', style: { '--wc': WORLDS[q.w].color } }, `${UI.qTag(q)} · ${WORLDS[q.w].name}`),
      U.el('h3', { class: 'qb-q' }, q.q),
      U.el('h3', {}, 'Które zdania wzorca powiedziałeś/aś (sensem, nie słowo w słowo)?'),
      said ? U.el('p', { class: 'tip mic-sum' }, `Mikrofon: padło ${heardAll}/${termsAll} pojęć kluczowych (na zielono; na czerwono – pominięte). Zdania z większością pojęć są już zaznaczone – popraw, jeśli trzeba.`) : null,
      U.el('div', { class: 'dks say-check' }, ...checks.map(c => c.row)),
      meter,
      U.el('p', { class: 'tip' }, `Czas: ${DEF.fmtTime(sec)}. ${timeNote}${hint ? ` Podpowiedź: −${Math.round(DEF.hintCost(hint) * 100)}%.` : ''}`),
      U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), q.m),
      U.el('div', { class: 'ov-actions' }, UI.btn('Zaznacz wszystko', () => { checks.forEach(c => { c.cb.checked = true; }); upd(); }, 'ghost sm'), next)),
    said ? U.el('details', { class: 'ext card' }, U.el('summary', {}, 'Co usłyszała gra (transkrypcja)'), U.el('p', {}, said)) : null,
    U.el('details', { class: 'ext card' }, U.el('summary', {}, 'Minimum i pełny materiał'), U.el('div', { class: 'rich', html: U.richText(q.a) }), U.el('div', { class: 'rich', html: U.richText(q.x) })));
  UI.show('defense');
};

DEF.followUp = function (list, i, results, st) {
  DEF.stopTimer();
  const q = list[i];
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  const seen = STORE.data.fuSeen || (STORE.data.fuSeen = {});
  const idx = q.fu.map((f, j) => j).sort((a, b) => (seen[q.id + ':' + a] || 0) - (seen[q.id + ':' + b] || 0) || Math.random() - 0.5)[0];
  seen[q.id + ':' + idx] = (seen[q.id + ':' + idx] || 0) + 1;
  STORE.save();
  const [fq, fa] = q.fu[idx];
  const card = U.el('div', { class: 'card def-q' });
  const ans = U.el('div', { class: 'fu-ans', hidden: true }, U.el('div', { class: 'mini-label' }, 'DOBRA ODPOWIEDŹ'), U.el('p', {}, fa));
  const rate = U.el('div', { class: 'ov-actions', hidden: true }, U.el('span', { class: 'lvtxt' }, 'Czy tak odpowiedziałeś/aś?'),
    ...[['TAK', 1, 'primary'], ['CZĘŚCIOWO', 0.5, ''], ['NIE', 0, 'danger']].map(([l, v, c]) => UI.btn(l, () => DEF.score(list, i, results, { ...st, fu: v }), c)));
  const show = UI.btn('POKAŻ ODPOWIEDŹ ▶', () => { ans.hidden = false; rate.hidden = false; show.remove(); rate.querySelector('.btn').focus(); }, 'primary', { 'data-primary': '' });
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('✕ Przerwij', () => UI.defense(), 'ghost'), U.el('h2', {}, `Pytanie ${i + 1}/${list.length} · dopytka`)),
    card);
  const room = DEF.scene(card, { say: `„${fq}”`, mood: U.clamp(0.25 + st.cov * 0.6, 0, 1) });
  room.pulse = 0.5;
  card.append(
    U.el('div', { class: 'mini-label' }, 'PYTANIE DODATKOWE KOMISJI'),
    U.el('h3', { class: 'def-question' }, fq),
    U.el('p', { class: 'tip' }, 'Odpowiedz na głos 1–2 zdaniami, potem sprawdź.'),
    ans,
    U.el('div', { class: 'ov-actions' }, show),
    rate);
  UI.show('defense');
};

DEF.score = function (list, i, results, st) {
  const q = list[i];
  const p = U.clamp(0.75 * st.cov + 0.25 * st.fu - DEF.hintCost(st.hint), 0, 1);
  const g = DEF.grade(p);
  if (p >= 0.8) STORE.record(q.id, true);
  else if (p < 0.5) STORE.record(q.id, false);
  else STORE.markSeen(q.id);
  STORE.data.stats.defenses++; STORE.save();
  AUDIO.play(g >= 4 ? 'ok' : g >= 3 ? 'coin' : 'bad');
  results.push({ q, p, g, sec: st.sec, cov: st.cov, fu: st.fu, hint: st.hint });
  if (i + 1 < list.length) DEF.run(list, i + 1, results); else DEF.final(list, results);
};

DEF.final = function (list, results) {
  DEF.stopTimer();
  const el = U.$('#scr-defense');
  el.innerHTML = '';
  const avg = results.reduce((s, r) => s + r.g, 0) / results.length;
  const passed = results.every(r => r.g >= 3);
  const verdicts = passed ? ['Komisja gratuluje. Tytuł magistra na horyzoncie!', 'Pewna odpowiedź. Tak trzymać jutro!'] : ['Jeszcze jedno podejście i będzie dobrze.', 'Komisja daje drugą szansę – powtórz słabsze pytania.'];
  const card = U.el('div', { class: 'card' });
  DEF.scene(card, { say: U.pick(verdicts), mood: U.clamp((avg - 2) / 3, 0, 1) });
  card.append(...results.map(r =>
    U.el('div', { class: 'chg def-row ' + (r.g >= 4 ? 'up' : r.g < 3 ? 'down' : '') },
      U.el('b', {}, UI.qTag(r.q)), U.el('span', {}, r.q.t),
      U.el('small', {}, `wzorzec ${Math.round(r.cov * 100)}% · dopytka ${r.fu === 1 ? '✓' : r.fu ? '½' : '✗'}${r.hint ? ' · podp.' : ''} · ${DEF.fmtTime(r.sec)}`),
      U.el('b', { class: 'grade' }, DEF.fmtGrade(r.g)))));
  el.append(
    U.el('div', { class: 'topbar' }, UI.btn('◀ Menu', () => UI.title(), 'ghost'), U.el('h2', {}, 'Werdykt komisji')),
    U.el('div', { class: 'sum-head ' + (passed ? 'good' : '') },
      U.el('h2', {}, passed ? 'ZDANE!' : 'DO POPRAWKI'),
      U.el('div', { class: 'score' }, DEF.fmtGrade(Math.round(avg * 2) / 2))),
    card,
    U.el('div', { class: 'menu row' },
      UI.btn('KOLEJNA KOMISJA', () => UI.defense(), 'primary', { 'data-primary': '' }),
      results.some(r => r.g < 4) ? UI.btn('Ćwicz słabsze w grze', () => { const qs = results.filter(r => r.g < 4).map(r => r.q); RUN.start({ mode: 'answers', pool: qs, cap: qs.length, title: 'Poprawka po obronie' }); }, 'boss') : null,
      results.some(r => r.g < 4) ? UI.btn('Na pamięć: najsłabsze', () => UI.rehearse(results.slice().sort((a, b) => a.g - b.g)[0].q), 'answer') : null));
  UI.show('defense');
};
