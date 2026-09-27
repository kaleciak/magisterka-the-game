'use strict';
/* Postęp gracza: poziomy opanowania pytań (0–5), statystyki, ustawienia. */
/* Profile graczy: każdy ma osobny zapis (wiele osób na jednym urządzeniu). Zapis jest bezkolizyjny także przy
   kilku kartach naraz: localStorage między kartami synchronizuje się z opóźnieniem, więc zamiast „odczytaj-zmień-zapisz”
   każdy stan scala się funkcją przemienną i idempotentną (CRDT): pytania i ustawienia – nowszy znacznik czasu wygrywa,
   liczniki – każda karta ma własny licznik, suma ze wszystkich; rekordy – maksimum; bossowie – suma zbiorów. */
const LS = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } /* tryb prywatny – gra działa dalej */ },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* brak dostępu */ } },
  sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* brak dostępu */ } },
  json(s) { try { return s ? JSON.parse(s) : null; } catch (e) { return null; } },
};
const deepEq = (a, b) => {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
  const ka = Object.keys(a).filter(k => a[k] !== undefined), kb = Object.keys(b).filter(k => b[k] !== undefined);
  return ka.length === kb.length && ka.every(k => deepEq(a[k], b[k]));
};
const clone = o => JSON.parse(JSON.stringify(o));
const STORE = {
  base: 'magisterka-the-game-v2',
  idxKey: 'magisterka-the-game-v2:players',
  COUNTERS: ['runs', 'answers', 'correct', 'defenses', 'rehearsed'],
  pid: null,
  wid: null,        // identyfikator karty (autor liczników)
  players: null,
  data: null,
  view: null,       // ostatni scalony stan – wykrywa lokalne zmiany do ostemplowania
  get key() { return `${this.base}:p:${this.pid}`; },
  pkey(pid) { return `${this.base}:p:${pid}`; },
  now() { this._t = Math.max(Date.now(), (this._t || 0) + 1); return this._t; },
  load() {
    this.wid = LS.sget('mtg-writer') || ('w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7));
    LS.sset('mtg-writer', this.wid);
    const idx = this.loadIndex();
    let pid = LS.sget('mtg-player');
    const live = idx.list.filter(p => !p.del);
    if (!live.some(p => p.id === pid)) pid = live.some(p => p.id === idx.last.id) ? idx.last.id : live[0].id;
    this.use(pid);
    if (!this.listening && typeof window !== 'undefined' && window.addEventListener) {
      this.listening = true;
      window.addEventListener('storage', e => {
        if (e.key === this.idxKey) this.loadIndex();
        else if (e.key === this.key && this.sync() && typeof UI !== 'undefined' && UI.onSync) UI.onSync();
      });
    }
  },
  /* ---------- lista graczy (też scalana: dodania, zmiany nazw, usunięcia jako znaczniki) ---------- */
  mergeIndex(A, B) {
    const byId = {};
    for (const e of [...(A ? A.list : []), ...(B ? B.list : [])]) {
      const o = byId[e.id];
      if (!o) { byId[e.id] = { ...e }; continue; }
      const pick = (e.t || 0) > (o.t || 0) || ((e.t || 0) === (o.t || 0) && String(e.name) > String(o.name)) ? e : o;
      byId[e.id] = { ...pick, created: Math.min(o.created || 0, e.created || 0), del: Math.max(o.del || 0, e.del || 0) };
    }
    const list = Object.values(byId).sort((a, b) => (a.created || 0) - (b.created || 0) || (a.id < b.id ? -1 : 1));
    const la = (A && A.last) || { id: '', t: 0 }, lb = (B && B.last) || { id: '', t: 0 };
    return { list, last: la.t > lb.t || (la.t === lb.t && la.id > lb.id) ? la : lb };
  },
  loadIndex() {
    let stored = LS.json(LS.get(this.idxKey));
    if (stored && Array.isArray(stored.list) && typeof stored.last === 'string') stored.last = { id: stored.last, t: 0 };
    if (!stored || !Array.isArray(stored.list) || !stored.list.length) {
      stored = { list: [{ id: 'p1', name: 'Gracz 1', created: 1, t: 0 }], last: { id: 'p1', t: 0 } };
      const old = LS.get(this.base); // zapis sprzed profili trafia do pierwszego gracza
      if (old && !LS.get(this.pkey('p1'))) LS.set(this.pkey('p1'), old);
    }
    const merged = this.mergeIndex(stored, this.players);
    if (!merged.list.some(p => !p.del)) merged.list.push({ id: 'p1', name: 'Gracz 1', created: 1, t: this.now() });
    if (!deepEq(merged, LS.json(LS.get(this.idxKey)))) LS.set(this.idxKey, JSON.stringify(merged));
    this.players = merged;
    return merged;
  },
  editIndex(fn) { this.loadIndex(); fn(this.players); this.players = this.mergeIndex(this.players, null); LS.set(this.idxKey, JSON.stringify(this.players)); },
  livePlayers() { return this.players.list.filter(p => !p.del); },
  player() { return this.players.list.find(p => p.id === this.pid) || { id: this.pid, name: 'Gracz' }; },
  use(pid) {
    this.pid = pid;
    LS.sset('mtg-player', pid);
    this.editIndex(idx => { idx.last = { id: pid, t: this.now() }; });
    this.data = this.fix(LS.json(LS.get(this.key)));
    this.view = clone(this.data);
  },
  addPlayer(name) {
    const id = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    this.editIndex(idx => idx.list.push({ id, name: this.cleanName(name) || `Gracz ${this.livePlayers().length + 1}`, created: Date.now(), t: this.now() }));
    return id;
  },
  renamePlayer(id, name) {
    const n = this.cleanName(name);
    if (n) this.editIndex(idx => { const p = idx.list.find(x => x.id === id); if (p) { p.name = n; p.t = this.now(); } });
  },
  removePlayer(id) {
    this.loadIndex();
    if (this.livePlayers().length <= 1) return false;
    this.editIndex(idx => { const p = idx.list.find(x => x.id === id); if (p) p.del = this.now(); });
    LS.del(this.pkey(id));
    if (this.pid === id) this.use(this.livePlayers()[0].id);
    return true;
  },
  cleanName: n => String(n || '').replace(/\s+/g, ' ').trim().slice(0, 24),
  /* podgląd postępu innego gracza (lista profili) */
  peek(pid) { return pid === this.pid ? this.data : this.fix(LS.json(LS.get(this.pkey(pid)))); },
  /* ---------- stan gracza ---------- */
  fix(d) {
    d = d && typeof d === 'object' ? d : {};
    d.q = d.q || {};
    for (const q of QUESTIONS) d.q[q.id] = Object.assign({ L: 0, seen: 0, ok: 0, bad: 0, last: 0, best: 0 }, d.q[q.id] || {});
    d.ex = d.ex || {};          // licznik ekspozycji elementów (by pokazywać wszystkie fakty)
    d.best = Object.assign({ marathon: 0, final: 0 }, d.best || {});
    d.stats = Object.assign({ runs: 0, answers: 0, correct: 0, tick: 0, defenses: 0, bestCombo: 0, rehearsed: 0 }, d.stats || {});
    d.set = Object.assign({ sfx: true, music: true, tempo: 1, font: 'jersey' }, d.set || {});
    d.setT = d.setT || {};
    d.boss = d.boss || {};
    d.fuSeen = d.fuSeen || {};
    d.epoch = d.epoch || { t: 0 };
    if (!d.cnt) { // zapis sprzed liczników per karta
      d.cnt = { legacy: {} };
      for (const k of this.COUNTERS) d.cnt.legacy[k] = d.stats[k] || 0;
    }
    this.views(d);
    return d;
  },
  views(d) { for (const k of this.COUNTERS) d.stats[k] = Object.values(d.cnt).reduce((s, c) => s + (c[k] || 0), 0); return d; },
  /* scalanie: przemienne, łączne i idempotentne – wynik nie zależy od kolejności ani powtórzeń */
  merge(A, B) {
    if ((A.epoch.t || 0) !== (B.epoch.t || 0)) return clone((A.epoch.t || 0) > (B.epoch.t || 0) ? A : B); // wyzerowanie profilu
    const newer = (a, b) => ((a.t || 0) > (b.t || 0) || ((a.t || 0) === (b.t || 0) && JSON.stringify(a) >= JSON.stringify(b))) ? a : b;
    const maxMap = (a = {}, b = {}) => { const r = { ...a }; for (const k in b) r[k] = Math.max(r[k] || 0, b[k] || 0); return r; };
    const M = { epoch: clone(A.epoch), q: {}, ex: {}, cnt: {}, set: {}, setT: {}, boss: {} };
    for (const id of new Set([...Object.keys(A.q), ...Object.keys(B.q)])) {
      const a = A.q[id] || {}, b = B.q[id] || {};
      M.q[id] = { ...newer(a, b), best: Math.max(a.best || 0, b.best || 0), seen: Math.max(a.seen || 0, b.seen || 0) };
    }
    for (const k of new Set([...Object.keys(A.ex), ...Object.keys(B.ex)])) M.ex[k] = maxMap(A.ex[k], B.ex[k]);
    M.fuSeen = maxMap(A.fuSeen, B.fuSeen);
    for (const w of new Set([...Object.keys(A.cnt), ...Object.keys(B.cnt)])) M.cnt[w] = maxMap(A.cnt[w], B.cnt[w]);
    M.best = maxMap(A.best, B.best);
    for (const k in { ...A.boss, ...B.boss }) if (A.boss[k] || B.boss[k]) M.boss[k] = true;
    for (const k of new Set([...Object.keys(A.set), ...Object.keys(B.set)])) {
      const ta = A.setT[k] || 0, tb = B.setT[k] || 0;
      M.set[k] = ta > tb ? A.set[k] : tb > ta ? B.set[k] : (k in A.set ? A.set[k] : B.set[k]);
      M.setT[k] = Math.max(ta, tb);
    }
    M.stats = { ...B.stats, ...A.stats, tick: Math.max(A.stats.tick || 0, B.stats.tick || 0), bestCombo: Math.max(A.stats.bestCombo || 0, B.stats.bestCombo || 0) };
    return this.views(M);
  },
  /* lokalne zmiany od ostatniego scalenia: stempel czasu na pytaniach i ustawieniach, przyrost własnego licznika */
  stamp() {
    const d = this.data, v = this.view, strip = r => { const { t, w, ...rest } = r || {}; return rest; };
    for (const id in d.q) if (!deepEq(strip(d.q[id]), strip(v.q[id]))) { d.q[id].t = this.now(); d.q[id].w = this.wid; }
    for (const k in d.set) if (!deepEq(d.set[k], v.set[k])) d.setT[k] = this.now();
    const own = d.cnt[this.wid] || (d.cnt[this.wid] = {});
    for (const k of this.COUNTERS) { const inc = (d.stats[k] || 0) - (v.stats[k] || 0); if (inc > 0) own[k] = (own[k] || 0) + inc; }
    this.views(d);
  },
  /* zapis: scal z tym, co jest w pamięci przeglądarki, i zapisz tylko, jeśli wiemy coś nowego */
  save() {
    if (!this.data) return;
    this.stamp();
    const raw = LS.get(this.key), stored = raw ? this.fix(LS.json(raw)) : null;
    const merged = stored ? this.merge(stored, this.data) : clone(this.data);
    const gone = this.players && !this.players.list.some(p => p.id === this.pid && !p.del);
    if (!gone && (!stored || !deepEq(merged, stored))) LS.set(this.key, JSON.stringify(merged));
    this.assign(this.data, merged);
    this.view = clone(this.data);
  },
  /* inna karta zapisała ten profil – przyjmij jej zmiany (i dopisz własne, jeśli ich tam brak) */
  sync() {
    if (!this.data) return false;
    const before = JSON.stringify(this.data);
    this.save();
    return JSON.stringify(this.data) !== before;
  },
  /* wpisanie scalonego stanu do istniejących obiektów (inne moduły trzymają do nich referencje) */
  assign(target, src) {
    for (const k of Object.keys(target)) if (!(k in src)) delete target[k];
    for (const k in src) {
      const v = src[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) this.assign(target[k], v);
      else target[k] = v;
    }
  },
  reset() {
    this.data = this.fix({ epoch: { t: this.now() } });
    LS.set(this.key, JSON.stringify(this.data));
    this.view = clone(this.data);
  },
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
  mastered(d = this.data) { return QUESTIONS.filter(q => d.q[q.id].L >= 5).length; },
  totalL(d = this.data) { return QUESTIONS.reduce((s, q) => s + d.q[q.id].L, 0); },
  percent(d = this.data) { return Math.round(this.totalL(d) / (QUESTIONS.length * 5) * 100); },
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
