'use strict';
/* Ekrany i nakładki (DOM). */
const UI = {
  cur: 'title',
  init() {
    U.$('#btn-pause').addEventListener('click', () => RUN.pause());
    U.$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') this.closeModal(); });
    document.addEventListener('keydown', e => this.onKey(e, true));
    document.addEventListener('keyup', e => this.onKey(e, false));
    document.addEventListener('pointerdown', () => AUDIO.resume(), { once: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.cur === 'game' && RUN.s && !RUN.s.over && !STAGE.paused) RUN.pause(); });
  },
  /* ---------- klawiatura ---------- */
  KEYMAP: { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', Space: 'up', Enter: 'enter', NumpadEnter: 'enter' },
  onKey(e, down) {
    const tag = (e.target && e.target.tagName) || '';
    const typing = tag === 'INPUT' || tag === 'TEXTAREA';
    if (typing) return;
    const modal = !U.$('#modal').hidden;
    const ov = U.$('#overlay');
    if (down && (modal || (this.cur === 'game' && !ov.hidden))) {
      if (e.code === 'Escape') { if (modal) this.closeModal(); else if (this.ovKind === 'pause') RUN.resume(); e.preventDefault(); return; }
      if (e.code === 'Enter' || e.code === 'NumpadEnter' || (e.code === 'Space' && tag !== 'BUTTON')) {
        const root = modal ? U.$('#modal') : ov;
        const b = root.querySelector('[data-primary]:not([disabled])');
        if (b) { e.preventDefault(); b.click(); }
      }
      return;
    }
    if (this.cur !== 'game' || !STAGE.mg) return;
    if (down && (e.code === 'Escape' || e.code === 'KeyP')) { RUN.pause(); e.preventDefault(); return; }
    let k = this.KEYMAP[e.code];
    const dm = /^(Digit|Numpad)(\d)$/.exec(e.code);
    if (dm) k = 'n' + dm[2];
    if (!k) return;
    if ((e.code === 'Space' || k === 'enter') && tag === 'BUTTON') return;
    if (['up', 'left', 'right'].includes(k) || e.code === 'Space') e.preventDefault();
    if (down && e.repeat) return;
    if (!down) { STAGE.mg.key(k, false); return; }
    if (STAGE.canInput()) STAGE.mg.key(k, true);
  },
  /* ---------- nawigacja ---------- */
  show(name) {
    if (this.cur === 'game' && name !== 'game') { STAGE.stop(); AUDIO.stopMusic(); this.overlay(null); }
    document.querySelectorAll('.screen').forEach(s => { s.hidden = s.id !== 'scr-' + name; });
    this.cur = name;
    const el = U.$('#scr-' + name);
    if (el && name !== 'game') el.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  stars(L, cls = '') {
    return U.el('span', { class: 'stars ' + cls, title: `Poziom ${L}/5 – ${CH.LEVEL_NAMES[L]}`, 'aria-label': `Poziom ${L} z 5` }, ...[1, 2, 3, 4, 5].map(i => U.el('i', { class: i <= L ? 'on' : '' })));
  },
  lvlClass: L => 'lv' + L,
  qTag: q => `P${String(q.id).padStart(2, '0')}`,
  btn(label, onclick, cls = '', attrs = {}) {
    const b = U.el('button', Object.assign({ class: 'btn ' + cls, type: 'button' }, attrs), label);
    b.addEventListener('click', e => { AUDIO.resume(); AUDIO.play('click'); onclick(e); });
    return b;
  },
  examDays() {
    const exam = new Date(2026, 8, 28);
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const d = Math.round((exam - now) / 86400000);
    if (d === 1) return 'Obrona: jutro (28.09.2026)';
    if (d === 0) return 'Obrona: dziś! Powodzenia!';
    if (d < 0) return 'Po obronie – gratulacje, Magistrze!';
    return `Obrona za ${d} ${U.pl(d, 'dzień', 'dni', 'dni')} (28.09.2026)`;
  },
  /* ---------- ekran tytułowy ---------- */
  title() {
    const el = U.$('#scr-title');
    el.innerHTML = '';
    const S = STORE;
    const grid = U.el('div', { class: 'mgrid', role: 'list' });
    for (const w of WORLDS) {
      for (const q of QUESTIONS.filter(q => q.w === w.id)) {
        const L = S.q(q.id).L;
        const cell = U.el('button', { class: 'mcell ' + this.lvlClass(L), type: 'button', role: 'listitem', title: `${this.qTag(q)} ${q.t} – ${CH.LEVEL_NAMES[L]}`, style: { '--wc': w.color } }, String(q.id));
        cell.addEventListener('click', () => this.qModal(q));
        grid.append(cell);
      }
    }
    const weakest = WORLDS.map(w => ({ w, p: S.worldPct(w.id) })).sort((a, b) => a.p - b.p)[0];
    const scene = U.el('canvas', { class: 'title-scene', width: 320, height: 96, 'aria-hidden': 'true' });
    const hero = U.el('div', { class: 'hero' },
      scene,
      U.el('div', { class: 'logo' }, U.el('span', { class: 'l1' }, 'MAGISTERKA'), U.el('span', { class: 'l2' }, 'THE GAME')),
      U.el('div', { class: 'hero-row' },
        U.el('div', { class: 'avatar' }, SPR.img('student', 6, 'bob')),
        U.el('div', { class: 'hero-stats' },
          U.el('div', { class: 'exam' }, this.examDays()),
          U.el('div', { class: 'rank' }, S.rank()),
          U.el('div', { class: 'pbar', 'aria-label': `Postęp ${S.percent()}%` }, U.el('i', { style: { width: S.percent() + '%' } })),
          U.el('div', { class: 'pline' }, `Opanowane ${S.mastered()}/40 · postęp ${S.percent()}% · rekord ${U.fmt(S.data.best.marathon)}`))));
    const menu = U.el('div', { class: 'menu' },
      this.btn(U.el('span', {}, U.el('b', {}, '▶ MARATON'), U.el('small', {}, 'Gra sama dobiera zagadnienia – od najsłabszych')), () => RUN.start({ mode: 'marathon', pool: QUESTIONS }), 'primary big', { 'data-primary': '' }),
      this.btn(U.el('span', {}, U.el('b', {}, '▶ TRENING ODPOWIEDZI'), U.el('small', {}, 'Mównica, luki, łowca błędów, dopytki – uczysz się mówić jak na obronie')), () => RUN.start({ mode: 'answers', pool: QUESTIONS }), 'answer big'),
      this.btn(U.el('span', {}, U.el('b', {}, 'MAPA ŚWIATÓW'), U.el('small', {}, '8 światów tematycznych + bossowie')), () => this.map(), 'big'),
      this.btn(U.el('span', {}, U.el('b', {}, 'SYMULATOR OBRONY'), U.el('small', {}, 'Losujesz pytanie, mówisz na głos wg planu, komisja dopytuje, dostajesz ocenę')), () => this.defense(), 'big'),
      this.btn(U.el('span', {}, U.el('b', {}, 'EGZAMIN KOŃCOWY'), U.el('small', {}, `12 losowych pytań, 3 życia · rekord ${U.fmt(S.data.best.final)}`)), () => RUN.start({ mode: 'final', pool: QUESTIONS }), 'big'),
      this.btn(U.el('span', {}, U.el('b', {}, 'KOMPENDIUM'), U.el('small', {}, 'Minimum, rozszerzenie i haczyki do 40 pytań')), () => this.book(), 'big'));
    el.append(
      hero,
      U.el('div', { class: 'card' },
        U.el('div', { class: 'card-h' }, U.el('h3', {}, 'Mapa opanowania · 40 zagadnień'), U.el('span', { class: 'legend-lv' }, ...[0, 1, 2, 3, 4, 5].map(L => U.el('span', { class: 'lvdot ' + this.lvlClass(L) }, CH.LEVEL_NAMES[L])))),
        grid,
        U.el('p', { class: 'tip' }, `Najsłabiej: ${weakest.w.name} (${weakest.p}%). Każde pytanie przechodzi 5 poziomów – każdy kolejny to trudniejsza minigra.`)),
      menu,
      U.el('div', { class: 'foot' },
        this.btn('Ustawienia', () => this.settings(), 'ghost'),
        this.btn('Jak grać?', () => this.help(), 'ghost')),
    );
    this.show('title');
    SCENE.title(scene);
  },
  /* ---------- mapa światów ---------- */
  map() {
    const el = U.$('#scr-map');
    el.innerHTML = '';
    const tiles = U.el('div', { class: 'worlds' });
    for (const w of WORLDS) {
      const qs = QUESTIONS.filter(q => q.w === w.id);
      const pct = STORE.worldPct(w.id);
      const t = U.el('button', { class: 'wtile', type: 'button', style: { '--wc': w.color } },
        U.el('div', { class: 'wt-top' }, SPR.img(w.icon, 4), STORE.data.boss[w.id] ? U.el('span', { class: 'crown', title: 'Boss pokonany' }, '♛') : null),
        U.el('div', { class: 'wt-name' }, `${w.id + 1}. ${w.name}`),
        U.el('div', { class: 'wt-range' }, `P${String(qs[0].id).padStart(2, '0')}–P${String(qs[qs.length - 1].id).padStart(2, '0')} · ${pct}%`),
        U.el('div', { class: 'wt-dots' }, ...qs.map(q => U.el('i', { class: this.lvlClass(STORE.q(q.id).L) }))));
      t.addEventListener('click', () => { AUDIO.play('click'); this.world(w.id); });
      tiles.append(t);
    }
    el.append(
      U.el('div', { class: 'topbar' }, this.btn('◀ Menu', () => this.title(), 'ghost'), U.el('h2', {}, 'Mapa światów')),
      tiles);
    this.show('map');
  },
  world(wid) {
    const w = WORLDS[wid];
    const qs = QUESTIONS.filter(q => q.w === wid);
    const el = U.$('#scr-world');
    el.innerHTML = '';
    const list = U.el('div', { class: 'qlist' });
    for (const q of qs) {
      const L = STORE.q(q.id).L;
      list.append(U.el('div', { class: 'qrow ' + this.lvlClass(L) },
        U.el('button', { class: 'qrow-main', type: 'button', onclick: () => this.qModal(q) }, U.el('b', {}, this.qTag(q)), U.el('span', {}, q.t)),
        this.stars(L),
        this.btn('Ćwicz', () => RUN.start({ mode: 'focus', pool: [q], title: `Trening ${this.qTag(q)}` }), 'sm')));
    }
    const bossReady = qs.every(q => STORE.q(q.id).seen);
    el.append(
      U.el('div', { class: 'topbar' }, this.btn('◀ Mapa', () => this.map(), 'ghost'), U.el('h2', {}, w.name)),
      U.el('div', { class: 'whead', style: { '--wc': w.color } }, SPR.img(w.icon, 5), U.el('div', {}, U.el('p', {}, w.desc), U.el('div', { class: 'pbar' }, U.el('i', { style: { width: STORE.worldPct(wid) + '%' } })))),
      U.el('div', { class: 'menu row' },
        this.btn('▶ GRAJ ŚWIAT', () => RUN.start({ mode: 'world', pool: qs, title: w.name }), 'primary', { 'data-primary': '' }),
        this.btn('KARTY NAUKI', () => this.cards(qs, 0)),
        this.btn(STORE.data.boss[wid] ? '♛ BOSS (rewanż)' : 'BOSS: KOMISJA', () => RUN.start({ mode: 'boss', pool: qs, world: wid, title: `Boss · ${w.name}` }), bossReady ? 'boss' : 'boss dim')),
      bossReady ? null : U.el('p', { class: 'tip' }, 'Boss zada każde pytanie świata. Najpierw przerób karty albo zagraj świat.'),
      list);
    this.show('world');
  },
  /* ---------- nakładki w grze ---------- */
  overlay(node, kind) {
    const ov = U.$('#overlay');
    ov.innerHTML = '';
    this.ovKind = kind || null;
    if (!node) { ov.hidden = true; return; }
    ov.append(node);
    ov.hidden = false;
    ov.scrollTop = 0;
  },
  /* Blok pytania: zakładki Jak odpowiedzieć / Minimum / Rozszerzenie / Dopytki */
  qBlock(q, opts = {}) {
    const w = WORLDS[q.w];
    const head = [U.el('div', { class: 'qb-tag', style: { '--wc': w.color } }, `${this.qTag(q)} · ${w.name}`), U.el('h3', { class: 'qb-q' }, q.q)];
    if (opts.hideAnswer) return U.el('div', { class: 'qblock' }, ...head);
    const tabs = [
      ['say', 'Jak odpowiedzieć', () => U.el('div', { class: 'tabp' },
        this.planEl(q),
        Room.answer(q),
        U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), q.m),
        U.el('div', { class: 'ov-actions left' }, this.btn('Ćwicz na pamięć ▶', () => this.rehearse(q), 'sm answer')))],
      ['min', 'Minimum', () => U.el('div', { class: 'tabp' }, U.el('div', { class: 'rich', html: U.richText(q.a) }), U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), q.m))],
      ['ext', 'Rozszerzenie', () => U.el('div', { class: 'tabp' }, U.el('div', { class: 'rich', html: U.richText(q.x) }))],
      ['fu', `Dopytki (${q.fu.length})`, () => U.el('div', { class: 'tabp' }, U.el('p', { class: 'tip' }, 'Pytania, które komisja może zadać po Twojej odpowiedzi:'),
        U.el('dl', { class: 'fus' }, ...q.fu.flatMap(([fq, fa]) => [U.el('dt', {}, fq), U.el('dd', {}, fa)])))],
    ];
    const bar = U.el('div', { class: 'tabs', role: 'tablist' });
    const body = U.el('div', { class: 'tabbody' });
    const open = key => {
      bar.querySelectorAll('button').forEach(b => { const on = b.dataset.k === key; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      body.innerHTML = '';
      body.append(tabs.find(t => t[0] === key)[2]());
    };
    for (const [k, label] of tabs) {
      const b = U.el('button', { class: 'tab', type: 'button', role: 'tab', 'data-k': k }, label);
      b.addEventListener('click', () => { AUDIO.play('click'); open(k); });
      bar.append(b);
    }
    open(opts.tab || 'say');
    return U.el('div', { class: 'qblock' }, ...head, bar, body);
  },
  planEl(q, cues = true) {
    return U.el('div', { class: 'plan' }, U.el('span', { class: 'plan-l' }, 'PLAN ODPOWIEDZI:'),
      ...CH.plan(q).map((p, i) => U.el('span', { class: 'plan-s role-' + p.role }, U.el('b', {}, `${i + 1}. ${p.name}`), cues && p.cue ? U.el('small', {}, p.cue) : null)));
  },
  /* Trening na pamięć: tekst znika stopniowo, a Ty mówisz na głos */
  rehearse(q, lvl = 0) {
    const tips = ['Przeczytaj odpowiedź na głos, spokojnie, jak przed komisją.', 'Pojęcia zniknęły – powiedz na głos, uzupełniając je z pamięci.', 'Zostały pierwsze litery części słów – mów płynnie.', 'Tylko pierwsze litery – powiedz całość.', 'Tylko plan – powiedz całą odpowiedź z pamięci.'];
    const mask = (t, L) => {
      if (L === 0) return U.md(t);
      return CH.parseBold(t).map(p => {
        if (p.k === 'b') return '<b class="mask">' + U.esc(p.t.split(/\s+/).map(w => /[0-9A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/.test(w) ? w[0] + '…' : w).join(' ')) + '</b>';
        if (L < 2) return U.esc(p.t);
        let n = 0;
        return U.esc(p.t).replace(/[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9]{3,}/g, w => (L >= 3 || n++ % 2 === 0) ? w[0] + '<span class="dots">' + '·'.repeat(Math.min(w.length - 1, 6)) + '</span>' : w);
      }).join('');
    };
    const list = U.el('ol', { class: 'say rehearse' });
    q.say.forEach(([r, t]) => list.append(U.el('li', { class: 'say-' + r }, U.el('span', { class: 'role role-' + r }, CH.ROLE_NAME[r]),
      U.el('span', { class: 'say-t', html: lvl >= 4 ? '<span class="dots">· · ·</span>' : mask(t, lvl) }))));
    const steps = U.el('div', { class: 'steps' }, ...[0, 1, 2, 3, 4].map(i => U.el('i', { class: i <= lvl ? 'on' : '' })));
    this.modal(U.el('div', { class: 'reh' },
      U.el('div', { class: 'ov-kicker' }, 'NA PAMIĘĆ', steps),
      U.el('div', { class: 'qb-tag', style: { '--wc': WORLDS[q.w].color } }, `${this.qTag(q)} · ${q.t}`),
      U.el('h3', { class: 'qb-q' }, q.q),
      U.el('p', { class: 'reh-tip' }, `Krok ${lvl + 1}/5: ${tips[lvl]}`),
      this.planEl(q),
      list,
      U.el('div', { class: 'ov-actions' },
        lvl > 0 ? this.btn('◀ Mniej', () => this.rehearse(q, lvl - 1), 'ghost') : null,
        lvl < 4 ? this.btn('Ukryj więcej ▶', () => this.rehearse(q, lvl + 1), 'primary', { 'data-primary': '' })
          : this.btn('Pokaż całość ✓', () => { STORE.data.stats.rehearsed = (STORE.data.stats.rehearsed || 0) + 1; STORE.save(); this.rehearse(q, 0); }, 'primary', { 'data-primary': '' }))));
  },
  celebrate(title, sub) {
    const box = U.el('div', { class: 'celebrate', 'aria-live': 'polite' }, U.el('div', { class: 'cel-t' }, title), sub ? U.el('div', { class: 'cel-s' }, sub) : null);
    const cols = ['#2bd46b', '#ffc21a', '#ff77a8', '#29adff', '#ff7a1a', '#f2ecd9'];
    for (let i = 0; i < 36; i++) box.append(U.el('i', { class: 'conf', style: { left: U.ri(0, 100) + '%', background: U.pick(cols), animationDelay: (Math.random() * 0.4) + 's', animationDuration: (1 + Math.random() * 0.8) + 's' } }));
    U.$('#scr-game').append(box);
    AUDIO.play('fanfare');
    setTimeout(() => box.remove(), 2200);
  },
  learnCard(q, then) {
    AUDIO.play('level');
    const go = this.btn('ZAPAMIĘTANE – GRAMY ▶', () => { STORE.markSeen(q.id); this.overlay(null); then(); }, 'primary', { 'data-primary': '' });
    const box = U.el('div', { class: 'ov-card learn' },
      U.el('div', { class: 'ov-kicker' }, 'NOWE ZAGADNIENIE'),
      this.qBlock(q),
      U.el('p', { class: 'tip' }, 'Przeczytaj na głos odpowiedź ustną – dokładnie tak powiesz ją komisji. Gra sprawdzi najpierw pojęcia, potem całą wypowiedź.'),
      U.el('div', { class: 'ov-actions' }, go));
    this.overlay(box, 'learn');
  },
  correction(q, ch, res, rec, then) {
    const quips = ['Recenzent unosi brew.', 'Promotor udaje, że nie słyszał.', 'Komisja notuje coś na marginesie…', 'Spokojnie, to dopiero trening.', 'Kawa się wylała. Jeszcze raz!'];
    const lines = [];
    if (res.timeout) lines.push(U.el('p', { class: 'c-your' }, '⏱ Czas minął.'));
    if (res.your) lines.push(U.el('p', { class: 'c-your' }, U.el('b', {}, 'Twoja odpowiedź: '), res.your));
    if (res.right) lines.push(U.el('p', { class: 'c-right' }, U.el('b', {}, 'Poprawnie: '), res.right));
    if (res.fix && res.fix !== res.right) lines.push(U.el('p', { class: 'c-fix' }, ...String(res.fix).split('\n').flatMap((l, i) => i ? [U.el('br'), l] : [l])));
    const btn = this.btn('DALEJ ▶', () => { this.overlay(null); then(); }, 'primary', { 'data-primary': '', disabled: true });
    setTimeout(() => { btn.disabled = false; }, 900);
    const ext = U.el('details', { class: 'ext' }, U.el('summary', {}, 'Pokaż wzorcową odpowiedź dla komisji'), Room.answer(q, { compact: true }));
    const lvl = rec && rec.before !== rec.after ? U.el('span', { class: 'lvchg' }, `poziom ${rec.before} → ${rec.after}`) : null;
    const box = U.el('div', { class: 'ov-card bad' },
      U.el('div', { class: 'ov-kicker bad' }, '✗ PUDŁO!', U.el('small', {}, U.pick(quips))),
      U.el('div', { class: 'qb-tag', style: { '--wc': WORLDS[q.w].color } }, `${this.qTag(q)} · ${q.t}`, lvl),
      ...lines,
      U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), q.m),
      ext,
      U.el('p', { class: 'tip' }, 'To pytanie wróci za chwilę – zapamiętaj poprawną odpowiedź.'),
      U.el('div', { class: 'ov-actions' }, btn));
    this.overlay(box, 'correct');
  },
  pauseMenu() {
    const box = U.el('div', { class: 'ov-card' },
      U.el('div', { class: 'ov-kicker' }, 'PAUZA'),
      U.el('p', {}, `Wynik: ${U.fmt(RUN.s.score)} · poprawne ${RUN.s.correct}/${RUN.s.count}`),
      U.el('div', { class: 'ov-actions col' },
        this.btn('▶ Kontynuuj', () => RUN.resume(), 'primary', { 'data-primary': '' }),
        this.btn('Zakończ rundę (podsumowanie)', () => { this.overlay(null); STAGE.paused = false; RUN.end('quit'); }),
        this.btn('Menu główne', () => { this.overlay(null); STAGE.paused = false; RUN.s.over = true; STAGE.stop(); AUDIO.stopMusic(); this.title(); }, 'ghost')));
    this.overlay(box, 'pause');
  },
  hud(q) {
    const s = RUN.s;
    if (!s) return;
    const h = U.$('#hearts');
    h.innerHTML = '';
    for (let i = 0; i < s.maxHearts; i++) h.append(SPR.img(i < s.hearts ? 'heart' : 'heartE', 3, 'heart'));
    U.$('#hud-mode').textContent = s.title + (s.queue ? ` · ${s.queue.length} do końca` : '');
    U.$('#hud-score').textContent = U.fmt(s.score);
    U.$('#hud-combo').textContent = s.combo >= 2 ? `×${s.combo}` : '';
    U.$('#hud-tempo').textContent = `TEMPO ${s.speed.toFixed(2).replace('.', ',')}`;
    if (q) { const L = STORE.q(q.id).L; U.$('#hud-lvl').innerHTML = ''; U.$('#hud-lvl').append(this.stars(L, 'sm')); }
  },
  toast(text, kind = '') {
    const t = U.el('div', { class: 'toast ' + kind }, text);
    const box = U.$('#toasts');
    box.append(t);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => t.classList.add('out'), 1300);
    setTimeout(() => t.remove(), 1800);
  },
  /* ---------- podsumowanie ---------- */
  summary(s, reason, record) {
    const el = U.$('#scr-summary');
    el.innerHTML = '';
    const titles = { dead: 'KONIEC RUNDY', mastered: 'OPANOWANE!', win: s.mode === 'boss' ? 'KOMISJA POKONANA!' : 'EGZAMIN ZDANY!', quit: 'PRZERWANO RUNDĘ' };
    const acc = s.count ? Math.round(s.correct / s.count * 100) : 0;
    const changes = new Map();
    for (const e of s.log) {
      if (!changes.has(e.q.id)) changes.set(e.q.id, { q: e.q, from: s.start[e.q.id], to: e.after });
      else changes.get(e.q.id).to = e.after;
    }
    const mistakes = s.log.filter(e => !e.ok);
    const missedQs = U.uniq(mistakes.map(e => String(e.q.id))).map(id => CH.qById(+id));
    const chRows = [...changes.values()].sort((a, b) => (b.to - b.from) - (a.to - a.from)).map(c =>
      U.el('div', { class: 'chg ' + (c.to > c.from ? 'up' : c.to < c.from ? 'down' : '') },
        U.el('b', {}, this.qTag(c.q)), U.el('span', {}, c.q.t), this.stars(c.from, 'sm'), U.el('span', { class: 'arr' }, '→'), this.stars(c.to, 'sm')));
    const misRows = mistakes.map(e => {
      const d = U.el('details', { class: 'mis' },
        U.el('summary', {}, U.el('b', {}, this.qTag(e.q)), ` ${e.q.t} · ${this.typeName(e.type)}`),
        e.res.right ? U.el('p', { class: 'c-right' }, U.el('b', {}, 'Poprawnie: '), e.res.right) : null,
        e.res.fix && e.res.fix !== e.res.right ? U.el('p', { class: 'c-fix' }, e.res.fix) : null,
        U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), e.q.m),
        Room.answer(e.q, { compact: true }));
      return d;
    });
    const again = () => RUN.start(s.opts);
    el.append(
      U.el('div', { class: 'sum-head ' + (['win', 'mastered'].includes(reason) ? 'good' : '') },
        U.el('h2', {}, titles[reason] || 'KONIEC'),
        SPR.img(reason === 'dead' ? 'bomb' : 'student', 6, reason === 'dead' ? '' : 'bob'),
        U.el('div', { class: 'score' }, U.fmt(s.score), record ? U.el('span', { class: 'rec' }, 'NOWY REKORD!') : null),
        U.el('div', { class: 'sum-stats' },
          U.el('span', {}, `Poprawne: ${s.correct}/${s.count} (${acc}%)`),
          U.el('span', {}, `Najlepsze combo: ×${s.bestCombo}`),
          U.el('span', {}, `Opanowane łącznie: ${STORE.mastered()}/40`))),
      U.el('div', { class: 'menu row' },
        this.btn('↻ JESZCZE RAZ', again, 'primary', { 'data-primary': '' }),
        missedQs.length ? this.btn(`Popraw błędy (${missedQs.length})`, () => RUN.start({ mode: 'drill', pool: missedQs, cap: missedQs.length, title: 'Poprawka błędów' }), 'boss') : null,
        this.btn('Menu', () => this.title(), 'ghost')),
      chRows.length ? U.el('div', { class: 'card' }, U.el('h3', {}, 'Postęp zagadnień w tej rundzie'), ...chRows) : null,
      misRows.length ? U.el('div', { class: 'card' }, U.el('h3', {}, `Do powtórki (${misRows.length}) – kliknij, by zobaczyć poprawkę`), ...misRows) : U.el('p', { class: 'tip' }, 'Bez pomyłek. Komisja jest pod wrażeniem.'));
    this.show('summary');
  },
  typeName(t) { return { tf: 'Drwal Prawdy', flappy: 'Flappy Birret', bomb: 'McBomba', match: 'Spawarka Par', sort: 'Taśma Sortownia', whac: 'Młotek Jidoka', tower: 'Wieża Wiedzy', keys: 'Komisja', builder: 'Mównica', luki: 'Znikający tekst', hunt: 'Łowca błędów', fu: 'Dopytka komisji' }[t] || t; },
  /* ---------- modal: pytanie / karty / ustawienia ---------- */
  modal(node) {
    const m = U.$('#modal');
    const box = m.querySelector('.modal-box');
    box.innerHTML = '';
    box.append(U.el('button', { class: 'm-close', type: 'button', 'aria-label': 'Zamknij', onclick: () => this.closeModal() }, '✕'), node);
    m.hidden = false;
    box.scrollTop = 0;
  },
  closeModal() { U.$('#modal').hidden = true; if (this.cur === 'title') this.title(); },
  qModal(q) {
    const L = STORE.q(q.id).L;
    this.modal(U.el('div', {},
      this.qBlock(q),
      U.el('details', { class: 'ext' }, U.el('summary', {}, `Pojęcia i definicje (${q.f.length})`),
        U.el('dl', { class: 'facts' }, ...q.f.flatMap(([t, d]) => [U.el('dt', {}, t), U.el('dd', {}, d)]))),
      U.el('div', { class: 'ov-actions' },
        U.el('span', { class: 'lvtxt' }, 'Poziom: ', this.stars(L), ` ${CH.LEVEL_NAMES[L]}`),
        this.btn('Na pamięć', () => this.rehearse(q), 'answer'),
        this.btn('▶ Ćwicz to pytanie', () => { U.$('#modal').hidden = true; RUN.start({ mode: 'focus', pool: [q], title: `Trening ${this.qTag(q)}` }); }, 'primary', { 'data-primary': '' }))));
  },
  cards(list, i) {
    const q = list[i];
    let shown = false;
    const body = U.el('div', {});
    const render = () => {
      body.innerHTML = '';
      body.append(
        U.el('div', { class: 'ov-kicker' }, `KARTA ${i + 1}/${list.length}`),
        this.qBlock(q, { hideAnswer: !shown }),
        U.el('div', { class: 'ov-actions' },
          i > 0 ? this.btn('◀', () => this.cards(list, i - 1), 'ghost') : null,
          !shown ? this.btn('Pokaż odpowiedź', () => { shown = true; STORE.markSeen(q.id); render(); }, 'primary', { 'data-primary': '' })
            : i < list.length - 1 ? this.btn('Następna ▶', () => this.cards(list, i + 1), 'primary', { 'data-primary': '' })
              : this.btn('▶ Graj ten świat', () => { U.$('#modal').hidden = true; RUN.start({ mode: 'world', pool: list, title: WORLDS[q.w].name }); }, 'primary', { 'data-primary': '' })));
    };
    render();
    this.modal(body);
  },
  settings() {
    const S = STORE.data.set;
    const tog = (label, key, fn) => {
      const b = this.btn(`${label}: ${S[key] ? 'WŁ.' : 'WYŁ.'}`, () => { S[key] = !S[key]; STORE.save(); fn && fn(); this.settings(); }, S[key] ? 'on' : '');
      return b;
    };
    let armed = false;
    const reset = this.btn('Wyzeruj postęp', () => {
      if (!armed) { armed = true; reset.textContent = 'Na pewno? Kliknij ponownie'; reset.classList.add('danger'); return; }
      STORE.reset(); this.closeModal(); this.title();
    }, 'ghost');
    const tempos = [[0.75, 'Spokojne'], [1, 'Normalne'], [1.25, 'Turbo']];
    this.modal(U.el('div', { class: 'settings' },
      U.el('h3', {}, 'Ustawienia'),
      U.el('div', { class: 'ov-actions col' },
        tog('Efekty dźwiękowe', 'sfx', () => { AUDIO.sfxOn = S.sfx; }),
        tog('Muzyka', 'music', () => { AUDIO.musicOn = S.music; if (!S.music) AUDIO.stopMusic(); })),
      U.el('p', {}, 'Czcionka:'),
      U.el('div', { class: 'ov-actions left' }, ...[['jersey', 'Pikselowa czytelna'], ['pixelify', 'Pikselowa klasyczna'], ['system', 'Zwykła']].map(([k, n]) =>
        this.btn(U.el('span', { style: { fontFamily: FONT.BODIES[k] } }, n), () => { S.font = k; STORE.save(); FONT.use(k); this.settings(); }, S.font === k ? 'on' : ''))),
      U.el('p', {}, 'Tempo startowe (czas na odpowiedź):'),
      U.el('div', { class: 'ov-actions' }, ...tempos.map(([v, n]) => this.btn(n, () => { S.tempo = v; STORE.save(); this.settings(); }, S.tempo === v ? 'on' : ''))),
      U.el('p', { class: 'tip' }, 'Postęp zapisuje się w tej przeglądarce. Tryb prywatny może go nie zachować.'),
      document.querySelector('link[rel="manifest"]') ? U.el('p', { class: 'tip' }, 'Na telefonie: iPhone – Udostępnij → „Do ekranu początkowego”; Android – menu ⋮ → „Zainstaluj aplikację”. Po pierwszym otwarciu gra działa też bez internetu.') : null,
      U.el('div', { class: 'ov-actions' }, reset)));
  },
  help() {
    const rows = [
      ['Drwal Prawdy', '← FAŁSZ / PRAWDA →. Rąb zanim skończy się czas.'],
      ['Flappy Birret', 'Spacja/tap = machnięcie. Wleć w bramkę z dobrą odpowiedzią.'],
      ['McBomba', 'Tapnij przedmiot z dobrą odpowiedzią (albo 1–4), zanim lont się dopali.'],
      ['Spawarka Par', 'Łącz pojęcia z opisami. Jedna pomyłka dozwolona przy 4+ parach.'],
      ['Taśma Sortownia', 'Wrzucaj skrzynki do właściwych pojemników (tap albo 1–5).'],
      ['Młotek Jidoka', 'Wal tylko w krety z hasłami ze zbioru. Przegapienie = pomyłka.'],
      ['Wieża Wiedzy', '← → sterujesz skoczkiem. Ląduj na platformach w dobrej kolejności.'],
      ['Komisja', 'Zaznacz hasła z minimum odpowiedzi. Potem zobaczysz wzorcową odpowiedź ustną.'],
      ['Mównica', 'Układasz odpowiedź zdanie po zdaniu: definicja → wyliczenie → rozwinięcie → przykład → domknięcie. Zdania z innego pytania i z błędem odrzucasz.'],
      ['Znikający tekst', 'Wzorcowa odpowiedź z lukami – wstawiasz kolejne pojęcia z banku. Im wyższy poziom, tym więcej luk.'],
      ['Łowca błędów', 'Kolega odpowiada przed komisją i myli pojęcia. Tapnij błędne sformułowania – zobaczysz poprawną wersję.'],
      ['Dopytka komisji', 'Pytanie dodatkowe po odpowiedzi. Wybierz odpowiedź, która Cię obroni (1–3).'],
    ];
    this.modal(U.el('div', { class: 'help' },
      U.el('h3', {}, 'Jak to działa'),
      U.el('p', {}, 'Każde z 40 pytań ma 5 poziomów. Dobra odpowiedź podnosi poziom, zła obniża i wraca za 2 zadania. Poziom decyduje o minigrze:'),
      U.el('ol', {}, ...CH.LEVELS.slice(0, 5).map((l, i) => U.el('li', {}, U.el('b', {}, CH.LEVEL_NAMES[i] + ': '), l.map(t => this.typeName(t)).join(', ')))),
      U.el('p', {}, 'Poziom 5 = opanowane (co jakiś czas wraca na powtórkę). Combo przyspiesza tempo i daje więcej punktów, co 8 trafień w serii – dodatkowe życie.'),
      U.el('p', {}, U.el('b', {}, 'Jak mówić przed komisją: '), 'każda odpowiedź ma ten sam szkielet – 1) definicja jednym zdaniem, 2) wyliczenie elementów, 3) rozwinięcie najważniejszego, 4) przykład z praktyki, 5) domknięcie (po co to jest / wniosek). Trening odpowiedzi i poziomy 3–5 ćwiczą właśnie to. W karcie pytania kliknij „Na pamięć”, by powtarzać odpowiedź z coraz mniejszą ilością podpowiedzi.'),
      U.el('dl', { class: 'facts' }, ...rows.flatMap(([a, b]) => [U.el('dt', {}, a), U.el('dd', {}, b)])),
      U.el('p', { class: 'tip' }, 'Źródła: „Zagadnienia – egzamin magisterski” (główne) + „40 zagadnień – wersja minimalistyczna” (styl minimum i uzupełnienia oznaczone „plik 1”). Role pracowników wiedzy – wg slajdów z wykładu.')));
  },
  /* ---------- kompendium ---------- */
  book(focusId) {
    const el = U.$('#scr-book');
    el.innerHTML = '';
    let flash = false, filter = '', wsel = -1;
    const list = U.el('div', { class: 'book-list' });
    const render = () => {
      list.innerHTML = '';
      const f = U.norm(filter);
      for (const w of WORLDS) {
        if (wsel >= 0 && w.id !== wsel) continue;
        const qs = QUESTIONS.filter(q => q.w === w.id && (!f || CH.normText(q).includes(f) || U.norm(q.q).includes(f) || String(q.id) === filter.trim()));
        if (!qs.length) continue;
        list.append(U.el('h3', { class: 'book-w', style: { '--wc': w.color } }, SPR.img(w.icon, 2), ` ${w.id + 1}. ${w.name}`));
        for (const q of qs) {
          const L = STORE.q(q.id).L;
          const body = U.el('div', { class: 'book-body' });
          const det = U.el('details', { class: 'book-q ' + this.lvlClass(L), id: 'bq' + q.id },
            U.el('summary', {}, U.el('b', {}, this.qTag(q)), U.el('span', {}, q.t), this.stars(L, 'sm')),
            body);
          det.addEventListener('toggle', () => {
            if (!det.open || body.childNodes.length) return;
            if (flash) {
              const reveal = this.btn('Pokaż odpowiedź', () => { body.innerHTML = ''; body.append(this.qBlock(q), this.bookActions(q)); STORE.markSeen(q.id); }, 'primary');
              body.append(this.qBlock(q, { hideAnswer: true }), U.el('p', { class: 'tip' }, 'Odpowiedz w myślach albo na głos, potem sprawdź.'), reveal);
            } else body.append(this.qBlock(q), this.bookActions(q));
          });
          list.append(det);
        }
      }
      if (!list.children.length) list.append(U.el('p', { class: 'tip' }, 'Brak wyników.'));
    };
    const search = U.el('input', { type: 'search', id: 'book-search', placeholder: 'Szukaj: np. SMED, Hall-Petch, 12…', 'aria-label': 'Szukaj w kompendium' });
    search.addEventListener('input', () => { filter = search.value; render(); });
    const fl = this.btn('Tryb fiszek: WYŁ.', () => { flash = !flash; fl.textContent = `Tryb fiszek: ${flash ? 'WŁ.' : 'WYŁ.'}`; fl.classList.toggle('on', flash); render(); }, 'sm');
    const chips = U.el('div', { class: 'wchips' }, ...[-1, ...WORLDS.map(w => w.id)].map(id => {
      const b = this.btn(id < 0 ? 'Wszystkie' : WORLDS[id].short, () => { wsel = id; chips.querySelectorAll('.btn').forEach(x => x.classList.remove('on')); b.classList.add('on'); render(); }, 'sm' + (id < 0 ? ' on' : ''));
      return b;
    }));
    el.append(
      U.el('div', { class: 'topbar' }, this.btn('◀ Menu', () => this.title(), 'ghost'), U.el('h2', {}, 'Kompendium')),
      U.el('div', { class: 'book-tools' }, search, fl),
      chips,
      list);
    render();
    this.show('book');
    if (focusId) { const d = U.$('#bq' + focusId); if (d) { d.open = true; d.scrollIntoView({ block: 'start' }); } }
  },
  bookActions(q) {
    return U.el('div', { class: 'ov-actions' },
      U.el('details', { class: 'ext' }, U.el('summary', {}, `Pojęcia i definicje (${q.f.length})`), U.el('dl', { class: 'facts' }, ...q.f.flatMap(([t, d]) => [U.el('dt', {}, t), U.el('dd', {}, d)]))),
      this.btn('Na pamięć', () => this.rehearse(q), 'answer'),
      this.btn('▶ Ćwicz to pytanie', () => RUN.start({ mode: 'focus', pool: [q], title: `Trening ${this.qTag(q)}` }), 'primary'));
  },
};
