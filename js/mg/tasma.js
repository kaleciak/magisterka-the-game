'use strict';
/* TAŚMA SORTOWNIA – przydziel skrzynki z taśmy do właściwych pojemników. */
class Tasma extends MG {
  start() {
    const ch = this.ch, W = this.W, H = this.H;
    this.nb = ch.cats.length;
    this.grid = W < 400 && this.nb >= 4;
    this.cw = this.grid ? 170 : 120;
    this.chh = this.grid ? 44 : 34;
    this.beltY = this.grid ? Math.round(H * 0.32) : 130;
    const cols = ['#e0a458', '#29adff', '#ff77a8', '#9be23a', '#ffd23a'];
    const gap = this.grid ? 16 : 6;
    const ncol = this.grid ? 2 : this.nb;
    const nrow = Math.ceil(this.nb / ncol);
    const top = this.grid ? this.beltY + 70 : H - Math.max(104, Math.round(H * 0.36)) - 6;
    const bw = (W - 12 - 6 * (ncol - 1)) / ncol;
    const bh = (H - 6 - top - gap * (nrow - 1)) / nrow;
    this.bins = ch.cats.map((label, i) => {
      const r = Math.floor(i / ncol), cI = i % ncol;
      const inRow = Math.min(ncol, this.nb - r * ncol);
      const off = (ncol - inRow) * (bw + 6) / 2;
      return { x: 6 + off + cI * (bw + 6), y: top + r * (bh + gap), w: bw, h: bh, label, col: cols[i % cols.length], n: 0, ok: 0, bad: 0 };
    });
    this.items = ch.items.map((it, i) => ({ t: it.t, c: it.c, x: 30 - i * (this.cw + 30), y: this.beltY - this.chh, state: 'belt', f: 0 }));
    this.beltV = 24 * this.speed;
    this.mist = 0;
    this.allowed = ch.items.length >= 6 ? 1 : 0;
    this.errors = [];
    this.scroll = 0;
    this.S.prompt({ lead: `${ch.tag} · Sortowanie`, text: ch.title, sub: 'Tapnij pojemnik albo wciśnij jego numer.' });
    this.S.controls(ch.cats.map((c, i) => ({ label: String(i + 1), key: 'n' + (i + 1), cls: 'num' })));
  }
  active() { return this.items.find(i => i.state === 'belt'); }
  key(k, down) {
    if (!down || this.done) return;
    const m = /^n(\d)$/.exec(k);
    if (m) { const i = +m[1] - 1; if (i < this.nb) this.send(i); }
  }
  pointer(type, x, y) {
    if (type !== 'down' || this.done) return;
    const b = this.bins.findIndex(b => x >= b.x && x <= b.x + b.w && y >= b.y - 12 && y <= b.y + b.h);
    if (b >= 0) this.send(b);
  }
  send(i) {
    const it = this.active();
    if (!it) return;
    it.state = 'fly'; it.f = 0; it.from = { x: it.x + this.cw / 2, y: it.y + this.chh / 2 };
    const b = this.bins[i];
    it.to = { x: b.x + b.w / 2, y: b.y + Math.min(30, b.h / 2) }; it.bin = i;
    this.S.sfx('click');
  }
  land(it) {
    const b = this.bins[it.bin];
    b.n++;
    it.state = 'in';
    if (it.bin === it.c) {
      b.ok = 0.4;
      this.S.sfx('drop');
      this.S.float('✓', b.x + b.w / 2, b.y - 8, PAL.g, 16);
    } else {
      b.bad = 0.5;
      this.mist++;
      this.errors.push(`${it.t} → ${this.ch.cats[it.c]}`);
      this.S.sfx('bad'); this.S.shake(4);
      this.S.float('✗ ' + this.ch.cats[it.c], U.clamp(b.x + b.w / 2, 70, this.W - 70), b.y - 12, '#ff6b6b', 12);
      if (this.mist > this.allowed) this.fail();
    }
    this.check();
  }
  fail() {
    this.end({ ok: false, right: this.ch.items.map(i => `${i.t} → ${this.ch.cats[i.c]}`).join(' · '), your: this.errors.join(' · '), fix: `Twoje pomyłki: ${this.errors.join('; ')}` }, 1.1);
  }
  check() {
    if (this.done) return;
    if (this.items.every(i => i.state === 'in' || i.state === 'lost')) {
      if (this.mist <= this.allowed) {
        this.S.sfx('ok');
        this.S.burst(this.W / 2, this.H / 2, [PAL.g, PAL.y, PAL.w], 24);
        this.end({ ok: true, note: this.mist ? `1 pomyłka: ${this.errors[0]}` : null }, 0.6);
      } else this.fail();
    }
  }
  update(dt) {
    super.update(dt);
    for (const b of this.bins) { b.ok = Math.max(0, b.ok - dt); b.bad = Math.max(0, b.bad - dt); }
    const act = this.active();
    let v = this.beltV;
    if (act && act.x < 30) v += 170;
    if (!this.done) {
      this.scroll += v * dt;
      for (const it of this.items) if (it.state === 'belt') it.x += v * dt;
    }
    for (const it of this.items) {
      if (it.state === 'fly') {
        it.f += dt / 0.32;
        if (it.f >= 1) this.land(it);
      }
      if (it.state === 'belt' && it.x > this.W - 30 && !this.done) {
        it.state = 'lost'; this.mist++;
        this.errors.push(`${it.t} → ${this.ch.cats[it.c]} (spadło z taśmy)`);
        this.S.sfx('bad');
        this.S.float('Spadło! → ' + this.ch.cats[it.c], this.W / 2, this.beltY - 70, '#ff6b6b', 12);
        if (this.mist > this.allowed) this.fail(); else this.check();
      }
    }
  }
  crate(c, x, y, label, hi) {
    const w = this.cw, h = this.chh;
    if (hi) { c.fillStyle = (Math.sin(this.t * 8) > 0) ? PAL.y : PAL.o; c.fillRect(x - 3, y - 3, w + 6, h + 6); }
    pxbox(c, x, y, w, h, '#b07a44');
    c.fillStyle = '#8a5a32'; c.fillRect(x + 4, y + 4, 4, h - 8); c.fillRect(x + w - 8, y + 4, 4, h - 8);
    pxbox(c, x + 10, y + 4, w - 20, h - 8, PAL.w);
    TXT.box(c, label, x + w / 2, y + h / 2, w - 26, h - 12, { sizes: this.grid ? [14, 13, 12, 11, 10, 9] : [11, 10, 9, 8, 7] });
  }
  draw(c) {
    const W = this.W, H = this.H, by = this.beltY;
    const fy = Math.min(...this.bins.map(b => b.y)) - 18;
    c.fillStyle = '#1c2a33'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#22333e';
    for (let x = 0; x < W; x += 50) c.fillRect(x, 0, 24, fy);
    c.fillStyle = '#ffd23a'; for (let x = 0; x < W; x += 40) c.fillRect(x, fy - 4, 20, 4);
    c.fillStyle = PAL.k; c.fillRect(0, by, W, 20);
    c.fillStyle = '#3b4a52'; c.fillRect(0, by + 2, W, 14);
    c.fillStyle = '#56666e';
    const o = this.scroll % 20;
    for (let x = o - 20; x < W; x += 20) c.fillRect(x, by + 4, 10, 10);
    for (let x = 10; x < W; x += 40) { c.fillStyle = PAL.k; c.fillRect(x - 6, by + 20, 12, 12); c.fillStyle = PAL.m; c.fillRect(x - 4, by + 22, 8, 8); }
    c.fillStyle = '#4a2c18'; c.fillRect(W - 28, by - 4, 28, 30);
    TXT.line(c, '⚠', W - 14, by, { size: 12, align: 'center', color: PAL.y });
    const act = this.active();
    for (const it of this.items) {
      if (it.state === 'belt' && it.x > -this.cw - 5) {
        this.crate(c, Math.round(it.x), it.y, it.t, it === act);
        if (it === act) { const ax = it.x + this.cw / 2, ay = it.y - 26 + Math.sin(this.t * 8) * 3; c.fillStyle = PAL.y; c.fillRect(ax - 6, ay, 12, 8); c.fillRect(ax - 3, ay + 8, 6, 6); }
      }
      if (it.state === 'fly') {
        const f = it.f, x = U.lerp(it.from.x, it.to.x, f), y = U.lerp(it.from.y, it.to.y, f) - Math.sin(f * Math.PI) * 50;
        c.save(); c.translate(x, y); c.scale(1 - f * 0.4, 1 - f * 0.4);
        this.crate(c, -this.cw / 2, -this.chh / 2, it.t, false);
        c.restore();
      }
    }
    this.bins.forEach((b, i) => {
      const fill = b.ok > 0 ? '#9be23a' : b.bad > 0 ? '#ff6b6b' : b.col;
      pxbox(c, b.x, b.y, b.w, b.h, fill);
      c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(b.x + 4, b.y + 4, b.w - 8, 10);
      pxbox(c, b.x + 4, b.y + 18, b.w - 8, b.h - 24, PAL.w);
      TXT.box(c, b.label, b.x + b.w / 2, b.y + 18 + (b.h - 24) / 2, b.w - 14, b.h - 30, { sizes: [14, 13, 12, 11, 10, 9, 8, 7] });
      pxbox(c, b.x + b.w / 2 - 9, b.y - 8, 18, 16, PAL.k, PAL.y);
      TXT.box(c, String(i + 1), b.x + b.w / 2, b.y, 14, 12, { sizes: [10], color: PAL.y });
    });
    TXT.line(c, `Pomyłki: ${this.mist}/${this.allowed + 1}`, 8, 6, { size: 11, color: this.mist ? '#ff6b6b' : PAL.l, shadow: PAL.k });
    const left = this.items.filter(i => i.state === 'belt' || i.state === 'fly').length;
    TXT.line(c, `Zostało: ${left}`, W - 8, 6, { size: 11, align: 'right', color: PAL.l, shadow: PAL.k });
  }
}
Tasma.intro = { title: 'SORTUJ!', hint: 'Tapnij pojemnik albo wciśnij jego numer (1–5)' };
MINIGAMES.sort = Tasma;
