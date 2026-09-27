'use strict';
/* Postęp gracza: poziomy opanowania pytań (0–5), statystyki, ustawienia. */
const STORE = {
  key: 'magisterka-the-game-v2',
  data: null,
  load() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(this.key) || 'null'); } catch (e) { d = null; }
    this.data = this.fix(d);
  },
  fix(d) {
    d = d && typeof d === 'object' ? d : {};
    d.q = d.q || {};
    for (const q of QUESTIONS) d.q[q.id] = Object.assign({ L: 0, seen: 0, ok: 0, bad: 0, last: 0, best: 0 }, d.q[q.id] || {});
    d.ex = d.ex || {};          // licznik ekspozycji elementów (by pokazywać wszystkie fakty)
    d.best = Object.assign({ marathon: 0, final: 0 }, d.best || {});
    d.stats = Object.assign({ runs: 0, answers: 0, correct: 0, tick: 0, defenses: 0, bestCombo: 0 }, d.stats || {});
    d.set = Object.assign({ sfx: true, music: true, tempo: 1 }, d.set || {});
    d.boss = d.boss || {};
    return d;
  },
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) { /* tryb prywatny – gra działa dalej */ } },
  reset() { this.data = this.fix(null); this.save(); },
  q(id) { return this.data.q[id]; },
  /* zapis odpowiedzi; zwraca {before, after} */
  record(id, ok, opts = {}) {
    const m = this.q(id), before = m.L;
    const d = this.data;
    d.stats.tick++;
    m.last = d.stats.tick;
    m.seen = 1;
    d.stats.answers++;
    if (ok) {
      m.ok++; d.stats.correct++;
      m.L = Math.min(5, m.L + (opts.gain || 1));
    } else {
      m.bad++;
      m.L = Math.max(0, m.L - (opts.loss == null ? 1 : opts.loss));
    }
    m.best = Math.max(m.best, m.L);
    this.save();
    return { before, after: m.L };
  },
  markSeen(id) { const m = this.q(id); if (!m.seen) { m.seen = 1; m.last = ++this.data.stats.tick; this.save(); } },
  /* ekspozycja: wybierz n elementów, preferując najrzadziej pokazywane */
  pickLeast(bucket, items, n, keyFn = x => JSON.stringify(x)) {
    const ex = this.data.ex[bucket] || (this.data.ex[bucket] = {});
    const scored = U.shuffle(items).map(it => ({ it, c: ex[this.hash(keyFn(it))] || 0 }));
    scored.sort((a, b) => a.c - b.c);
    const chosen = scored.slice(0, n).map(s => s.it);
    for (const it of chosen) { const h = this.hash(keyFn(it)); ex[h] = (ex[h] || 0) + 1; }
    return chosen;
  },
  hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); },
  mastered() { return QUESTIONS.filter(q => this.q(q.id).L >= 5).length; },
  totalL() { return QUESTIONS.reduce((s, q) => s + this.q(q.id).L, 0); },
  percent() { return Math.round(this.totalL() / (QUESTIONS.length * 5) * 100); },
  worldPct(w) {
    const qs = QUESTIONS.filter(q => q.w === w);
    return Math.round(qs.reduce((s, q) => s + this.q(q.id).L, 0) / (qs.length * 5) * 100);
  },
  RANKS: [
    [0, 'Pierwszak z indeksem'], [12, 'Student na kawie'], [40, 'Inżynier w natarciu'],
    [80, 'Magistrant'], [130, 'Magister in spe'], [175, 'Pogromca Komisji'], [200, 'Profesor zwyczajny'],
  ],
  rank() {
    const t = this.totalL();
    let r = this.RANKS[0][1];
    for (const [min, name] of this.RANKS) if (t >= min) r = name;
    return r;
  },
};
