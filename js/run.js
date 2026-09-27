'use strict';
/* Runda: dobór pytań (powtórki rozłożone w czasie), życia, combo, tempo, wynik. */
const RUN = {
  s: null,
  MODES: {
    marathon: { title: 'Maraton', cap: 4 },
    world: { title: 'Świat', cap: 3 },
    focus: { title: 'Trening pytania', cap: 1 },
    drill: { title: 'Poprawka błędów', cap: 6 },
    boss: { title: 'Boss: Komisja', cap: 0 },
    final: { title: 'Egzamin końcowy', cap: 0 },
  },
  start(opts) {
    const base = STORE.data.set.tempo || 1;
    const mode = this.MODES[opts.mode];
    this.s = {
      opts, mode: opts.mode, title: opts.title || mode.title, pool: opts.pool.slice(), cap: opts.cap || mode.cap,
      hearts: 3, maxHearts: 3, score: 0, combo: 0, bestCombo: 0, base, speed: base,
      count: 0, correct: 0, retry: [], log: [], lastQ: null, lastType: null,
      start: {}, queue: null, boss: null, over: false,
    };
    for (const q of QUESTIONS) this.s.start[q.id] = STORE.q(q.id).L;
    if (opts.mode === 'boss') { this.s.queue = U.shuffle(opts.pool); this.s.boss = { hp: this.s.queue.length, max: this.s.queue.length }; }
    if (opts.mode === 'final') this.s.queue = U.sample(QUESTIONS, 12);
    STORE.data.stats.runs++; STORE.save();
    UI.overlay(null);
    UI.show('game');
    UI.hud();
    AUDIO.resume();
    if (STORE.data.set.music) AUDIO.startMusic();
    AUDIO.setTempo(this.s.speed);
    setTimeout(() => this.next(), 60);
  },
  pickQuestion() {
    const s = this.s;
    const di = s.retry.findIndex(r => r.at <= s.count);
    if (di >= 0) return s.retry.splice(di, 1)[0].q;
    const M = q => STORE.q(q.id);
    const learning = s.pool.filter(q => M(q).seen && M(q).L < 5);
    const unseen = s.pool.filter(q => !M(q).seen);
    const mastered = s.pool.filter(q => M(q).L >= 5);
    if (unseen.length && learning.length < s.cap) return unseen[0];
    let cands = learning.length ? learning : unseen.length ? [unseen[0]] : mastered;
    if (mastered.length && learning.length && Math.random() < 0.12) cands = mastered;
    if (!cands.length) cands = s.pool;
    let c2 = cands.filter(q => q.id !== s.lastQ);
    if (!c2.length) c2 = cands;
    c2.sort((a, b) => (M(a).last + M(a).L * 2) - (M(b).last + M(b).L * 2));
    return c2[Math.floor(Math.random() * Math.min(2, c2.length))];
  },
  next() {
    const s = this.s;
    if (!s || s.over) return;
    if (s.hearts <= 0) return this.end('dead');
    const allDone = s.pool.every(q => STORE.q(q.id).L >= 5);
    if (s.count > 0 && (s.mode === 'focus' || s.mode === 'world' || s.mode === 'drill') && allDone) return this.end('mastered');
    if ((s.mode === 'boss' || s.mode === 'final') && !s.queue.length) return this.end('win');
    let q, type;
    if (s.mode === 'boss') { q = s.queue[0]; type = 'keys'; }
    else if (s.mode === 'final') { q = s.queue[0]; type = CH.chooseType(q, 5, s.lastType); }
    else { q = this.pickQuestion(); type = CH.chooseType(q, STORE.q(q.id).L, s.lastType); }
    if (!STORE.q(q.id).seen && s.mode !== 'boss' && s.mode !== 'final') UI.learnCard(q, () => this.play(q, type));
    else this.play(q, type);
  },
  play(q, type) {
    const s = this.s;
    if (s.over) return;
    const level = s.mode === 'final' ? 5 : STORE.q(q.id).L;
    const ch = CH.make(q, type, level);
    ch.speed = s.speed;
    if (s.boss) ch.boss = s.boss;
    s.lastQ = q.id; s.lastType = type;
    UI.hud(q);
    STAGE.load(new MINIGAMES[type](ch), res => this.onResult(q, ch, res));
  },
  onResult(q, ch, res) {
    const s = this.s;
    if (!s || s.over) return;
    s.count++;
    const rec = STORE.record(q.id, res.ok);
    s.log.push({ q, type: ch.type, ok: res.ok, before: rec.before, after: rec.after, res });
    if (res.ok) {
      s.correct++; s.combo++;
      s.bestCombo = Math.max(s.bestCombo, s.combo);
      STORE.data.stats.bestCombo = Math.max(STORE.data.stats.bestCombo, s.combo);
      const gain = Math.round((100 + 40 * rec.before) * (1 + Math.min(s.combo, 20) * 0.1) * s.speed);
      s.score += gain;
      s.speed = Math.min(s.base + 0.75, s.speed + 0.05);
      UI.toast(`+${U.fmt(gain)}${s.combo >= 3 ? ` · COMBO ×${s.combo}` : ''}`, 'good');
      if (rec.after > rec.before) UI.toast(`P${q.id}: ${CH.LEVEL_NAMES[rec.after]} ${'★'.repeat(rec.after)}`, 'lvl');
      if (s.combo % 8 === 0 && s.hearts < s.maxHearts) { s.hearts++; UI.toast('+♥ Kawa z automatu!', 'heart'); AUDIO.play('coin'); }
      if (s.combo % 5 === 0) { AUDIO.play('level'); UI.toast('TEMPO ↑', 'tempo'); }
      if (res.note) UI.toast(res.note, 'note');
      if (s.boss) { s.queue.shift(); s.boss.hp--; }
      if (s.mode === 'final') s.queue.shift();
    } else {
      s.combo = 0; s.hearts--;
      s.speed = Math.max(s.base, s.speed - 0.12);
      if (s.mode === 'boss') s.queue.push(s.queue.shift());
      else if (s.mode === 'final') s.queue.shift();
      else s.retry.push({ q, at: s.count + 2 });
      if (s.hearts <= 0) AUDIO.play('lose');
    }
    AUDIO.setTempo(s.speed);
    UI.hud(q);
    if (!res.ok && !res.skipCorrection) UI.correction(q, ch, res, rec, () => this.next());
    else setTimeout(() => this.next(), res.ok ? 250 : 400);
  },
  pause() {
    if (!this.s || this.s.over) return;
    if (UI.ovKind && UI.ovKind !== 'pause') return; // karta nauki / poprawka już wstrzymuje grę
    STAGE.paused = true; UI.pauseMenu();
  },
  resume() { STAGE.paused = false; UI.overlay(null); },
  end(reason) {
    const s = this.s;
    if (!s || s.over) return;
    s.over = true;
    STAGE.stop();
    AUDIO.stopMusic();
    const key = s.mode === 'final' ? 'final' : 'marathon';
    let record = false;
    if ((s.mode === 'marathon' || s.mode === 'final') && s.score > (STORE.data.best[key] || 0)) { STORE.data.best[key] = s.score; record = true; }
    if (s.mode === 'boss' && reason === 'win') STORE.data.boss[s.opts.world] = true;
    STORE.save();
    if (['win', 'mastered'].includes(reason)) AUDIO.play('fanfare');
    UI.summary(s, reason, record);
  },
  quit() { if (this.s && !this.s.over) this.end('quit'); },
};
