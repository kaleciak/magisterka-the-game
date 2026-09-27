'use strict';
/* SPAWARKA PAR – połącz pojęcia z opisami (spawanie iskrą). */
class Spawarka extends MG {
  start() {
    const ch = this.ch, P = this.S.panel;
    this.pairs = ch.pairs;
    this.total = U.clamp(this.pairs.length * 12 / this.speed, 28, 75);
    this.left = this.total;
    this.allowed = this.pairs.length >= 4 ? 1 : 0;
    this.mist = 0; this.matched = 0; this.sel = null; this.errors = [];
    this.cols = ['#2bd46b', '#29adff', '#ffd23a', '#ff77a8', '#ff7a1a'];
    this.S.prompt({ lead: `${ch.tag} · Łączenie par`, text: 'Połącz każde pojęcie z jego opisem.', sub: this.allowed ? 'Dozwolona 1 pomyłka.' : 'Bez pomyłek!' });
    this.bar = U.el('div', { class: 'tbar' }, U.el('i'));
    const L = U.el('div', { class: 'wcol' }), R = U.el('div', { class: 'wcol' });
    this.btnL = U.shuffle(this.pairs.map((p, i) => ({ i, t: p[0] }))).map(o => { const b = U.el('button', { class: 'wbtn term', type: 'button' }, o.t); b.onclick = () => this.pick(b, 'L', o.i); L.append(b); return b; });
    this.btnR = U.shuffle(this.pairs.map((p, i) => ({ i, t: p[1] }))).map(o => { const b = U.el('button', { class: 'wbtn def', type: 'button' }, o.t); b.onclick = () => this.pick(b, 'R', o.i); R.append(b); return b; });
    P.append(U.el('div', { class: 'weld' },
      U.el('div', { class: 'weld-head' }, SPR.img('robot', 3), U.el('span', {}, 'Spawarka par'), this.stat = U.el('b', {}, ''), this.bar),
      U.el('div', { class: 'wgrid' }, L, R)));
    this.updStat();
  }
  updStat() { this.stat.textContent = `${this.matched}/${this.pairs.length} · pomyłki ${this.mist}/${this.allowed + 1}`; }
  pick(btn, side, idx) {
    if (this.done || btn.classList.contains('done') || this.S.intro > 0) return;
    AUDIO.resume();
    this.S.sfx('click');
    if (!this.sel || this.sel.side === side) {
      if (this.sel) this.sel.btn.classList.remove('sel');
      if (this.sel && this.sel.btn === btn) { this.sel = null; return; }
      this.sel = { btn, side, idx };
      btn.classList.add('sel');
      return;
    }
    const a = this.sel; this.sel = null;
    a.btn.classList.remove('sel');
    if (a.idx === idx) {
      const col = this.cols[this.matched % this.cols.length];
      for (const b of [a.btn, btn]) { b.classList.add('done'); b.style.setProperty('--wc', col); }
      this.matched++;
      this.S.sfx('weld');
      this.updStat();
      if (this.matched === this.pairs.length) { this.S.sfx('ok'); this.end({ ok: true, note: this.mist ? this.errors[0] : null }, 0.5); }
    } else {
      for (const b of [a.btn, btn]) { b.classList.add('bad'); setTimeout(() => b.classList.remove('bad'), 450); }
      this.mist++;
      const term = this.pairs[side === 'L' ? idx : a.idx][0], def = this.pairs[side === 'L' ? a.idx : idx][1];
      this.errors.push(`„${term}” ≠ „${def}”`);
      this.S.sfx('bad');
      this.updStat();
      if (this.mist > this.allowed) this.fail();
    }
  }
  fail(timeout) {
    this.end({ ok: false, timeout, your: this.errors.join('; '), right: this.pairs.map(p => `${p[0]} – ${p[1]}`).join(' · '), fix: this.pairs.map(p => `${p[0]} – ${p[1]}`).join('\n') }, 0.9);
  }
  update(dt) {
    super.update(dt);
    if (this.done) return;
    this.left -= dt;
    const f = U.clamp(this.left / this.total, 0, 1);
    this.bar.firstChild.style.width = (f * 100) + '%';
    this.bar.classList.toggle('low', f < 0.25);
    if (this.left <= 0) { this.S.sfx('bad'); this.fail(true); }
  }
}
Spawarka.dom = true;
Spawarka.intro = { title: 'SPAWAJ!', hint: 'Tapnij pojęcie, potem pasujący opis' };
MINIGAMES.match = Spawarka;
