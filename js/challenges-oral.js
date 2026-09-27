'use strict';
/* Zadania na poziomie całej odpowiedzi ustnej:
   builder (Mównica – ułóż wypowiedź), luki (znikający tekst), hunt (łowca błędów), fu (pytanie dodatkowe). */
Object.assign(CH, {
  ROLE_RANK: { def: 0, list: 1, det: 2, ex: 3, end: 4 },
  ROLE_NAME: { def: 'Definicja', list: 'Wyliczenie', det: 'Rozwinięcie', ex: 'Przykład', end: 'Domknięcie' },
  ANSWER_TYPES: ['builder', 'luki', 'hunt', 'fu', 'keys'],

  /* podział zdania na fragmenty: tekst zwykły i **pojęcia** */
  parseBold(t) {
    const out = [];
    const re = /\*\*(.+?)\*\*/g;
    let last = 0, m;
    while ((m = re.exec(t))) {
      if (m.index > last) out.push({ k: 'txt', t: t.slice(last, m.index) });
      out.push({ k: 'b', t: m[1] });
      last = re.lastIndex;
    }
    if (last < t.length) out.push({ k: 'txt', t: t.slice(last) });
    return out;
  },
  sayPlain(q) { return q.say.map(s => U.plain(s[1])).join(' '); },
  boldTerms(q) { return q.say.flatMap(s => this.parseBold(s[1]).filter(p => p.k === 'b').map(p => p.t)); },
  /* plan odpowiedzi: role + pierwsze pojęcie zdania jako podpowiedź */
  plan(q) {
    return q.say.map(([r, t]) => {
      const b = this.parseBold(t).find(p => p.k === 'b');
      return { role: r, name: this.ROLE_NAME[r], cue: b ? b.t : '' };
    });
  },

  /* ---------- Mównica: ułóż wypowiedź ---------- */
  make_builder(q, level) {
    const sents = q.say.map(([r, t], i) => ({ i, role: r, rank: this.ROLE_RANK[r], t }));
    const intr = [];
    const others = this.world(q).filter(o => o.id !== q.id && o.say.length);
    const pool = (others.length ? others : QUESTIONS.filter(o => o.id !== q.id)).flatMap(o => o.say.filter(s => s[0] !== 'def').map(s => ({ o, t: s[1] })));
    const foreign = U.shuffle(pool).find(x => !x.o.say.some(s => s[1] === x.t && q.say.some(y => y[1] === x.t)));
    if (foreign) intr.push({ t: foreign.t, why: `To zdanie pochodzi z innego pytania: P${foreign.o.id} ${foreign.o.t}.` });
    if (level >= 4 || Math.random() < 0.35) {
      const e = U.shuffle(q.err).find(([o]) => q.say.some(s => s[1].includes(o)));
      if (e) {
        const s = q.say.find(x => x[1].includes(e[0]));
        intr.push({ t: s[1].replace(e[0], e[1]), why: `Błąd merytoryczny: „${U.plain(e[1])}” zamiast „${U.plain(e[0])}”.`, twin: true });
      }
    }
    return { sents, intr, plan: this.plan(q) };
  },

  /* ---------- Luki: znikający tekst ---------- */
  make_luki(q, level) {
    const parts = q.say.map(s => this.parseBold(s[1]));
    const cands = [];
    const seenT = new Set();
    parts.forEach((ps, si) => ps.forEach((p, pi) => {
      if (p.k !== 'b' || p.t.length > 48 || seenT.has(U.key(p.t))) return;
      seenT.add(U.key(p.t));
      cands.push({ si, pi, t: p.t });
    }));
    const frac = level >= 4 ? 0.7 : 0.4;
    const n = U.clamp(Math.round(cands.length * frac), Math.min(3, cands.length), 9);
    const chosen = U.sample(cands, n).sort((a, b) => a.si - b.si || a.pi - b.pi);
    chosen.forEach((c, j) => { parts[c.si][c.pi].blank = j; });
    const wrongs = q.err.map(e => U.plain(e[1])).filter(w => w.length <= 48);
    const foreign = U.shuffle(this.world(q).filter(o => o.id !== q.id).flatMap(o => this.boldTerms(o))).filter(t => t.length <= 40 && !this.inQ(q, t));
    const nd = level >= 4 ? 4 : 3;
    const dist = U.uniq([...U.sample(wrongs, 2), ...foreign]).filter(d => !chosen.some(c => U.key(c.t) === U.key(d))).slice(0, nd);
    const bank = U.shuffle([...chosen.map(c => ({ t: c.t, ok: true })), ...dist.map(t => ({ t, ok: false }))]);
    return { parts, roles: q.say.map(s => s[0]), blanks: chosen.map(c => c.t), bank };
  },

  /* ---------- Łowca błędów ---------- */
  make_hunt(q, level) {
    const want = level >= 5 ? 3 : 2;
    const sents = q.say.map(s => s[1]);
    const used = new Set();
    const errs = [];
    for (const [o, w] of U.shuffle(q.err)) {
      if (errs.length >= want) break;
      const si = sents.findIndex((t, i) => !used.has(i) && t.includes(o));
      if (si < 0) continue;
      used.add(si);
      sents[si] = sents[si].replace(o, '\u0001' + errs.length + '\u0003' + w + '\u0002');
      errs.push({ o: U.plain(o), w: U.plain(w) });
    }
    const segs = sents.map(t => this.huntSegments(t, errs));
    return { segs, roles: q.say.map(s => s[0]), n: errs.length, errs };
  },
  huntSegments(t, errs) {
    // znacznik błędu: \u0001<id>\u0003<tekst>\u0002 ; może leżeć wewnątrz **…** albo zawierać **…**
    const out = [];
    const re = /\*\*(.+?)\*\*|\u0001(\d+)\u0003([\s\S]+?)\u0002/g;
    let last = 0, m;
    while ((m = re.exec(t))) {
      if (m.index > last) out.push({ k: 'txt', t: t.slice(last, m.index) });
      if (m[1] != null) {
        const inner = m[1];
        const em = /\u0001(\d+)\u0003([\s\S]+?)\u0002/.exec(inner);
        if (em) {
          const e = errs[+em[1]];
          out.push({ k: 'tok', err: true, t: U.plain(inner.replace(em[0], em[2])), fix: U.plain(inner.replace(em[0], e.o)) });
        } else out.push({ k: 'tok', err: false, t: inner });
      } else {
        const e = errs[+m[2]];
        out.push({ k: 'tok', err: true, t: U.plain(m[3]), fix: e.o });
      }
      last = re.lastIndex;
    }
    if (last < t.length) out.push({ k: 'txt', t: t.slice(last) });
    return out;
  },

  /* ---------- Pytanie dodatkowe ---------- */
  make_fu(q, level) {
    const [f] = STORE.pickLeast('fu' + q.id, q.fu, 1, x => x[0]);
    const others = U.shuffle(this.world(q).filter(o => o.id !== q.id).flatMap(o => o.fu.map(x => x[1])));
    const glob = U.shuffle(QUESTIONS.filter(o => o.w !== q.w).flatMap(o => o.fu.map(x => x[1])));
    const third = [...others, ...glob].find(a => U.key(a) !== U.key(f[1]) && U.key(a) !== U.key(f[2]));
    const opts = U.shuffle([f[1], f[2], third].filter(Boolean));
    return { question: f[0], options: opts, answer: opts.indexOf(f[1]), fix: f[1] };
  },
});

/* dostępność i wybór typów z uwzględnieniem zadań „ustnych” */
(function () {
  const baseAvail = CH.available.bind(CH);
  CH.available = function (q) {
    const s = baseAvail(q);
    if (!q._avOral) {
      if (q.say.length >= 4) s.add('builder');
      if (CH.boldTerms(q).length >= 4) s.add('luki');
      if (q.err.length >= 2) s.add('hunt');
      if (q.fu.length >= 1) s.add('fu');
      q._avOral = true;
    }
    return s;
  };
  CH.LEVELS = [
    ['tf', 'flappy'],
    ['flappy', 'bomb', 'tf', 'match'],
    ['match', 'sort', 'whac', 'tower', 'bomb'],
    ['builder', 'luki', 'fu'],
    ['hunt', 'luki', 'keys', 'fu', 'builder'],
    ['builder', 'luki', 'hunt', 'fu', 'keys', 'bomb', 'match', 'sort', 'tower', 'whac', 'flappy', 'tf'],
  ];
  CH.LEVEL_NAMES = ['Nowe', 'Rozpoznaję', 'Kojarzę', 'Układam odpowiedź', 'Mówię jak na obronie', 'Opanowane'];
  const baseChoose = CH.chooseType.bind(CH);
  CH.chooseType = function (q, level, avoid) {
    if (level >= 5 && Math.random() < 0.65) return CH.chooseAnswerType(q, 5, avoid);
    return baseChoose(q, level, avoid);
  };
  /* tylko zadania „ustne” – tryb Trening odpowiedzi */
  CH.chooseAnswerType = function (q, level, avoid) {
    const av = CH.available(q);
    let c = (level < 3 ? ['builder', 'luki', 'fu'] : ['hunt', 'luki', 'keys', 'fu', 'builder']).filter(t => av.has(t));
    if (!c.length) c = CH.ANSWER_TYPES.filter(t => av.has(t));
    const c2 = c.filter(t => t !== avoid);
    return U.pick(c2.length ? c2 : c);
  };
})();
