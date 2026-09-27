'use strict';
/* Generator zadań: dla pytania i poziomu opanowania tworzy wyzwanie dla minigry.
   Poziomy: 0 poznaj → 1 rozpoznaj → 2 powiąż → 3 uporządkuj → 4 odpowiedz komisji → 5 opanowane. */
const CH = {
  LEVELS: [
    ['tf', 'flappy'],
    ['flappy', 'bomb', 'tf'],
    ['match', 'bomb', 'sort', 'whac'],
    ['tower', 'sort', 'whac', 'match'],
    ['keys'],
    ['bomb', 'match', 'sort', 'whac', 'tower', 'keys', 'flappy', 'tf'],
  ],
  LEVEL_NAMES: ['Nowe', 'Rozpoznaję', 'Kojarzę', 'Porządkuję', 'Odpowiadam', 'Opanowane'],
  FLAPPY_MAX: 34, BOMB_MAX: 46,

  qById: id => QUESTIONS.find(q => q.id === id),
  world: q => QUESTIONS.filter(o => o.w === q.w),
  fullText(q) { return q._full || (q._full = [q.t, ...q.a, ...q.x, ...q.k].join(' ')); },
  normText(q) { return q._norm || (q._norm = U.norm(this.fullText(q))); },
  /* czy pojęcie pojawia się w treści pytania (tekst znormalizowany z cache) */
  inQ(q, term) { const t = U.norm(term); return t.length >= 3 && this.normText(q).includes(t); },
  /* czy dwa pojęcia z faktów tego pytania są „zbyt bliskie” */
  close(q, a, b) {
    if (U.norm(a) === U.norm(b)) return true;
    if (q.noswap.includes(a) || q.noswap.includes(b)) return true;
    return q.ns.some(g => g.includes(a) && g.includes(b));
  },
  /* dystraktor z innego pytania: nie może pojawiać się w treści bieżącego pytania */
  foreignOk(q, term) {
    if (this.inQ(q, term)) return false;
    return !q.nx.some(t => U.norm(term).includes(U.norm(t)));
  },

  available(q) {
    if (q._av) return q._av;
    const s = new Set();
    if (q.tf.length + q.f.length >= 4) s.add('tf');
    if (this.mcItems(q, this.FLAPPY_MAX).length) s.add('flappy');
    if (this.mcItems(q, this.BOMB_MAX).length) s.add('bomb');
    if (q.f.length >= 3) s.add('match');
    if (q.g.length) s.add('sort');
    if (q.s.length) s.add('whac');
    if (q.o.length || q.s.length) s.add('tower');
    if (q.k.length >= 4) s.add('keys');
    q._av = s;
    return s;
  },
  chooseType(q, level, avoid) {
    const av = this.available(q);
    const order = [level, level - 1, level + 1, level - 2, 2, 1, 0, 3, 4, 5];
    for (const L of order) {
      if (L < 0 || L > 5) continue;
      let c = this.LEVELS[L].filter(t => av.has(t));
      if (!c.length) continue;
      const c2 = c.filter(t => t !== avoid);
      if (c2.length) c = c2;
      return U.pick(c);
    }
    return 'tf';
  },
  make(q, type, level) {
    const base = { type, qid: q.id, q, level, tag: `P${String(q.id).padStart(2, '0')} · ${q.t}` };
    const fn = this['make_' + type];
    return Object.assign(base, fn.call(this, q, level));
  },

  /* ---------- wybór wielokrotny (Flappy, Bomba) ---------- */
  mcItems(q, maxLen) {
    const items = [];
    const world = this.world(q);
    for (const [term, def] of q.f) {
      if (term.length > maxLen) continue;
      items.push({ kind: 'fact', lead: 'Jakie to pojęcie?', p: U.cap(def), a: term, fix: `${term} – ${def}`, term });
    }
    for (const [text, ans, ds] of q.c) {
      if (ans.length > maxLen) continue;
      items.push({ kind: 'cloze', lead: 'Uzupełnij lukę', p: text.replace('___', '▁▁▁▁'), a: ans, d: ds, fix: text.replace('___', ans) });
    }
    for (const [text, ans, ds] of q.sc) {
      if (ans.length > maxLen || ds.some(d => d.length > maxLen)) continue;
      items.push({ kind: 'sc', lead: 'Sytuacja z hali', p: text, a: ans, d: ds, fix: `${text} → ${ans}` });
    }
    if (q.t.length <= maxLen && world.length > 1) {
      for (const [term] of q.f) {
        if (world.some(o => o.id !== q.id && this.inQ(o, term))) continue;
        items.push({ kind: 'which', lead: 'Z którego zagadnienia?', p: `„${term}” – do którego pytania należy?`, a: q.t, fix: `„${term}” → P${q.id} ${q.t}` });
      }
    }
    return items;
  },
  mcOptions(q, item, n, maxLen) {
    let pool = [];
    if (item.gen) pool = item.d.slice();
    else if (item.kind === 'fact') {
      const same = q.f.map(f => f[0]).filter(t => !this.close(q, t, item.a) && !U.mentions(item.p, t));
      const world = this.world(q).filter(o => o.id !== q.id).flatMap(o => o.f.map(f => f[0])).filter(t => this.foreignOk(q, t));
      const glob = QUESTIONS.filter(o => o.w !== q.w).flatMap(o => o.f.map(f => f[0])).filter(t => this.foreignOk(q, t));
      pool = [...U.shuffle(same), ...U.shuffle(world), ...U.shuffle(glob)];
    } else if (item.kind === 'which') {
      pool = [...U.shuffle(this.world(q).filter(o => o.id !== q.id).map(o => o.t)), ...U.shuffle(QUESTIONS.filter(o => o.w !== q.w).map(o => o.t))];
    } else pool = U.shuffle(item.d);
    pool = pool.filter(t => t.length <= maxLen && U.key(t) !== U.key(item.a));
    const opts = U.uniq([item.a, ...pool]).slice(0, n);
    const sh = U.shuffle(opts);
    return { options: sh, answer: sh.indexOf(item.a) };
  },
  pickMc(q, level, maxLen) {
    let items = this.mcItems(q, maxLen);
    if (q.gen && GEN[q.gen] && Math.random() < 0.35) items = [GEN[q.gen]()];
    if (level <= 0) { const easy = items.filter(i => i.kind !== 'which'); if (easy.length) items = easy; }
    const [it] = STORE.pickLeast('mc' + q.id, items, 1, i => i.gen ? 'gen' + i.p : i.p);
    return it;
  },
  make_flappy(q, level) {
    const it = this.pickMc(q, level, this.FLAPPY_MAX);
    const n = level <= 0 ? 2 : 3;
    const o = this.mcOptions(q, it, n, this.FLAPPY_MAX);
    return { lead: it.lead, prompt: it.p, options: o.options, answer: o.answer, fix: it.fix, kind: it.kind };
  },
  make_bomb(q, level) {
    const it = this.pickMc(q, level, this.BOMB_MAX);
    const n = level <= 1 ? 3 : 4;
    const o = this.mcOptions(q, it, n, this.BOMB_MAX);
    return { lead: it.lead, prompt: it.p, options: o.options, answer: o.answer, fix: it.fix, kind: it.kind };
  },

  /* ---------- prawda / fałsz (Drwal) ---------- */
  tfPool(q) {
    const pool = q.tf.map(([s, v, fix]) => ({ s, v, fix: fix || null, hand: true }));
    const swappable = q.f.filter(f => !q.noswap.includes(f[0]));
    for (const [term, def] of q.f) pool.push({ s: `${term}: ${def}`, v: true, fix: null });
    for (const [term, def] of swappable) {
      const others = swappable.filter(o => !this.close(q, o[0], term) && U.norm(o[1]) !== U.norm(def));
      if (!others.length) continue;
      const [, od] = U.pick(others);
      pool.push({ s: `${term}: ${od}`, v: false, fix: `${term}: ${def}` });
    }
    for (const [text, ans, ds] of q.c) {
      pool.push({ s: text.replace('___', ans), v: true, fix: null });
      pool.push({ s: text.replace('___', U.pick(ds)), v: false, fix: text.replace('___', ans) });
    }
    return pool;
  },
  make_tf(q, level) {
    const n = level <= 0 ? 4 : 5;
    const pool = this.tfPool(q);
    const hand = pool.filter(p => p.hand), gen = pool.filter(p => !p.hand);
    const nh = Math.min(hand.length, Math.ceil(n * 0.6));
    let items = [...STORE.pickLeast('tf' + q.id, hand, nh, p => p.s), ...STORE.pickLeast('tf' + q.id, gen, n - nh, p => p.s)];
    if (!items.some(i => i.v)) { const t = pool.find(p => p.v && !items.includes(p)); if (t) items[items.length - 1] = t; }
    if (!items.some(i => !i.v)) { const f = pool.find(p => !p.v && !items.includes(p)); if (f) items[items.length - 1] = f; }
    return { items: U.shuffle(items) };
  },

  /* ---------- łączenie par (Spawarka) ---------- */
  make_match(q, level) {
    const n = Math.min(q.f.length, level >= 3 ? 5 : 4);
    const chosen = [];
    for (const f of STORE.pickLeast('match' + q.id, q.f, q.f.length, f => f[0])) {
      if (chosen.length >= n) break;
      if (chosen.some(c => this.close(q, c[0], f[0]) && !(q.noswap.includes(c[0]) || q.noswap.includes(f[0])))) continue;
      chosen.push(f);
    }
    return { pairs: chosen.length >= 3 ? chosen : q.f.slice(0, n) };
  },

  /* ---------- sortowanie (Taśma) ---------- */
  make_sort(q, level) {
    const g = U.pick(q.g);
    let cats = Object.keys(g.c);
    if (cats.length > 4) cats = U.sample(cats, 4);
    const want = level >= 3 ? 8 : 6;
    const items = [];
    cats.forEach((c, i) => { const it = U.pick(g.c[c]); items.push({ t: it, c: i }); });
    const rest = U.shuffle(cats.flatMap((c, i) => g.c[c].map(t => ({ t, c: i })))).filter(x => !items.some(y => y.t === x.t));
    while (items.length < want && rest.length) items.push(rest.shift());
    return { title: g.n, cats, items: U.shuffle(items) };
  },

  /* ---------- zbiory (Młotek) ---------- */
  intruders(q, count, exclude = []) {
    const cand = QUESTIONS.filter(o => o.w !== q.w).flatMap(o => o.s.flatMap(s => s.y)).filter(t => t.length <= 40 && this.foreignOk(q, t) && !exclude.includes(t));
    return U.sample(U.uniq(cand), count);
  },
  make_whac(q, level) {
    const s = U.pick(q.s);
    const ny = Math.min(s.y.length, level >= 3 ? 6 : 5);
    const ys = U.sample(s.y, ny);
    const xs = U.uniq([...U.sample(s.x, Math.min(s.x.length, 2)), ...this.intruders(q, 3, [...s.y, ...s.x])]).slice(0, 4);
    const items = U.shuffle([...ys.map(t => ({ t, ok: true })), ...xs.map(t => ({ t, ok: false }))]);
    return { title: s.n, items, all: s.y };
  },

  /* ---------- wieża: kolejność lub zbiór (Icy Tower) ---------- */
  make_tower(q, level) {
    const nOpt = level <= 2 ? 2 : 3;
    if (q.o.length && (!q.s.length || Math.random() < 0.7)) {
      const o = U.pick(q.o);
      const rows = o.i.map((correct, k) => {
        const later = o.i.slice(k + 1), earlier = o.i.slice(0, k);
        const ds = [...U.shuffle(later), ...U.shuffle(earlier)].slice(0, nOpt - 1);
        const opts = U.shuffle([correct, ...ds]);
        return { opts, ans: opts.indexOf(correct) };
      });
      return { mode: 'order', title: o.n, seq: o.i, rows };
    }
    const s = U.pick(q.s);
    const ys = U.sample(s.y, Math.min(4, s.y.length));
    const xpool = U.uniq([...U.shuffle(s.x), ...this.intruders(q, 4, [...s.y, ...s.x])]);
    const rows = ys.map((y, i) => {
      const ds = [];
      for (let j = 0; j < nOpt - 1; j++) ds.push(xpool[(i * (nOpt - 1) + j) % xpool.length]);
      const opts = U.shuffle([y, ...U.uniq(ds)]);
      return { opts, ans: opts.indexOf(y) };
    });
    return { mode: 'set', title: s.n, seq: ys, rows, all: s.y };
  },

  /* ---------- komisja: hasła z minimum (Keys) ---------- */
  make_keys(q, level) {
    const good = STORE.pickLeast('keys' + q.id, q.k, Math.min(6, q.k.length), k => k);
    const worldK = U.shuffle(this.world(q).filter(o => o.id !== q.id).flatMap(o => o.k)).filter(k => this.foreignOk(q, k));
    const globK = U.shuffle(QUESTIONS.filter(o => o.w !== q.w).flatMap(o => o.k)).filter(k => this.foreignOk(q, k));
    const bad = U.uniq([...worldK.slice(0, 2), ...globK]).filter(b => !good.includes(b)).slice(0, 4);
    const chips = U.shuffle([...good.map(t => ({ t, ok: true })), ...bad.map(t => ({ t, ok: false }))]);
    return { chips };
  },
};

/* ---------- zadania liczbowe ---------- */
const GEN = {
  num: (v, d = 1) => v.toFixed(d).replace('.', ','),
  /* dystraktory liczbowe; gdy się dublują, dopełnia je przesunięciami wyniku */
  choices(correct, wrongs, suffix = '') {
    const d = U.uniq(wrongs.filter(w => w !== correct));
    const base = parseFloat(String(correct).replace(',', '.'));
    const dec = (String(correct).split(',')[1] || '').replace(/\D/g, '').length;
    let k = 1;
    while (d.length < 3 && k < 20) {
      const v = base + (k % 2 ? 1 : -1) * (Math.ceil(k / 2) * (dec ? 3.7 : 7));
      const str = (dec ? v.toFixed(dec).replace('.', ',') : String(Math.round(v))) + suffix;
      if (str !== correct && !d.includes(str) && v > 0) d.push(str);
      k++;
    }
    return d.slice(0, 3);
  },
  oee() {
    const A = U.ri(80, 97) / 100, W = U.ri(75, 96) / 100, J = U.ri(85, 99) / 100;
    const P = U.pick([100, 420, 450, 480]);
    const B = Math.round(P * A);
    const C = U.pick([1000, 1200, 2000, 150000, 5000]);
    const D = Math.round(C * W), F = Math.round(D * J);
    const a = B / P, w = D / C, j = F / D, oee = a * w * j * 100;
    const ask = U.pick(['oee', 'oee', 'oee', 'A', 'W', 'J']);
    const stem = `Planowany czas ${P} min, rzeczywisty czas pracy ${B} min. Oczekiwano ${U.fmt(C)} szt., wyprodukowano ${U.fmt(D)}, w tym dobrych ${U.fmt(F)}.`;
    if (ask === 'oee') {
      const ans = GEN.num(oee) + '%';
      const wr = [GEN.num((a + w + j) / 3 * 100) + '%', GEN.num(a * w * 100) + '%', GEN.num(oee + U.ri(4, 9)) + '%', GEN.num(Math.max(1, oee - U.ri(4, 9))) + '%'];
      return { gen: 1, kind: 'num', lead: 'Policz OEE', p: `${stem} OEE = ?`, a: ans, d: GEN.choices(ans, wr, '%'), fix: `OEE = ${B}/${P} × ${U.fmt(D)}/${U.fmt(C)} × ${U.fmt(F)}/${U.fmt(D)} = ${GEN.num(a, 2)} × ${GEN.num(w, 2)} × ${GEN.num(j, 2)} = ${ans}` };
    }
    const map = { A: ['Dostępność', a, `${B}/${P}`], W: ['Wydajność', w, `${U.fmt(D)}/${U.fmt(C)}`], J: ['Jakość', j, `${U.fmt(F)}/${U.fmt(D)}`] };
    const [name, val, frac] = map[ask];
    const ans = GEN.num(val * 100) + '%';
    const others = Object.values(map).filter(m => m[0] !== name).map(m => GEN.num(m[1] * 100) + '%');
    return { gen: 1, kind: 'num', lead: `Policz: ${name}`, p: `${stem} ${name} = ?`, a: ans, d: GEN.choices(ans, [...others, GEN.num(oee) + '%'], '%'), fix: `${name} = ${frac} = ${ans}` };
  },
  evm() {
    let bcwp, acwp, bcws;
    do { bcwp = U.ri(6, 15) * 10; acwp = U.ri(6, 15) * 10; bcws = U.ri(6, 15) * 10; } while (bcwp === acwp || bcwp === bcws || acwp === bcws);
    const ask = U.pick(['CV', 'SV', 'CPI', 'SPI']);
    const stem = `BCWP = ${bcwp}, ACWP = ${acwp}, BCWS = ${bcws}.`;
    const r = (x, y) => GEN.num(x / y, 2);
    let ans, wr, fix;
    if (ask === 'CV') { ans = String(bcwp - acwp); wr = [String(bcwp - bcws), String(acwp - bcwp), r(bcwp, acwp)]; fix = `CV = BCWP − ACWP = ${bcwp} − ${acwp} = ${ans}`; }
    if (ask === 'SV') { ans = String(bcwp - bcws); wr = [String(bcwp - acwp), String(bcws - bcwp), r(bcwp, bcws)]; fix = `SV = BCWP − BCWS = ${bcwp} − ${bcws} = ${ans}`; }
    if (ask === 'CPI') { ans = r(bcwp, acwp); wr = [r(bcwp, bcws), r(acwp, bcwp), String(bcwp - acwp)]; fix = `CPI = BCWP / ACWP = ${bcwp} / ${acwp} = ${ans}`; }
    if (ask === 'SPI') { ans = r(bcwp, bcws); wr = [r(bcwp, acwp), r(bcws, bcwp), String(bcwp - bcws)]; fix = `SPI = BCWP / BCWS = ${bcwp} / ${bcws} = ${ans}`; }
    return { gen: 1, kind: 'num', lead: `Policz ${ask} (EVM)`, p: `${stem} ${ask} = ?`, a: ans, d: GEN.choices(ans, wr), fix };
  },
  rpn() {
    const S = U.ri(2, 10), O = U.ri(1, 9), D = U.ri(1, 9);
    const ans = String(S * O * D);
    const wr = [String(S + O + D), String(S * O), String(S * O * D + U.ri(5, 40)), String(Math.max(1, S * O * D - U.ri(5, 30)))];
    return { gen: 1, kind: 'num', lead: 'Policz RPN (FMEA)', p: `Znaczenie S = ${S}, częstość O = ${O}, wykrywalność D = ${D}. RPN = ?`, a: ans, d: GEN.choices(ans, wr), fix: `RPN = S × O × D = ${S} × ${O} × ${D} = ${ans}` };
  },
};
