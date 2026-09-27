'use strict';
/* DRWAL PRAWDY (Timberman) – rąb z lewej = FAŁSZ, z prawej = PRAWDA. */
class Drwal extends MG {
  start() {
    this.items = this.ch.items;
    this.i = 0;
    this.per = U.clamp(11 / this.speed, 5.5, 13);
    this.left = this.per;
    this.side = 1; this.swing = 0; this.drop = 0; this.squash = false;
    this.flying = [];
    this.cx = this.W / 2;
    this.gy = this.H - 50;
    this.reach = this.W >= 400 ? 70 : 62;
    this.deco = Array.from({ length: 20 }, () => U.pick([-1, 0, 1, 0, 0]));
    this.S.controls([{ label: '◀ FAŁSZ', key: 'left', cls: 'bad' }, { label: 'PRAWDA ▶', key: 'right', cls: 'good' }]);
    this.show();
  }
  show() {
    this.S.prompt({ lead: `${this.ch.tag} · Prawda czy fałsz? ${this.i + 1}/${this.items.length}`, text: this.items[this.i].s });
  }
  key(k, down) {
    if (!down || this.done) return;
    if (k === 'left') this.answer(false);
    if (k === 'right') this.answer(true);
  }
  pointer(type, x) { if (type === 'down') this.answer(x >= this.cx); }
  answer(v) {
    if (this.done) return;
    const it = this.items[this.i];
    this.side = v ? 1 : -1; this.swing = 0.2;
    if (v === it.v) {
      this.S.sfx('chop');
      this.flying.push({ x: this.cx, y: this.gy - 36, vx: -this.side * 280, vy: -160, rot: 0 });
      this.S.float(v ? 'PRAWDA ✓' : 'FAŁSZ ✓', this.cx + this.side * (this.reach + 20), this.gy - 130, PAL.g, 13);
      this.S.burst(this.cx + this.side * 30, this.gy - 20, ['#8a5a32', '#c98260', PAL.y], 10, 90);
      this.i++; this.drop = 1;
      if (this.i >= this.items.length) {
        this.S.sfx('ok');
        this.S.burst(this.cx, this.H / 2, [PAL.g, PAL.y, PAL.w], 26);
        this.end({ ok: true }, 0.6);
      } else { this.left = this.per; this.show(); }
    } else {
      this.squash = true;
      this.S.sfx('bad'); this.S.shake(7); this.S.flash(PAL.r, 0.15);
      this.end({ ok: false, your: v ? 'PRAWDA' : 'FAŁSZ', right: `${it.v ? 'PRAWDA' : 'FAŁSZ'} – „${it.s}”`, fix: it.fix }, 1.0);
    }
  }
  update(dt) {
    super.update(dt);
    if (this.swing > 0) this.swing -= dt;
    this.drop = Math.max(0, this.drop - dt * 7);
    for (const f of this.flying) { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 700 * dt; f.rot += dt * 9 * Math.sign(f.vx); }
    this.flying = this.flying.filter(f => f.y < this.H + 40);
    if (!this.done) {
      this.left -= dt;
      if (this.left <= 0) {
        const it = this.items[this.i];
        this.squash = true;
        this.S.sfx('bad'); this.S.shake(5);
        this.end({ ok: false, timeout: true, right: `${it.v ? 'PRAWDA' : 'FAŁSZ'} – „${it.s}”`, fix: it.fix }, 1.0);
      }
    }
  }
  segment(c, x, y, w, h, deco, current) {
    c.fillStyle = PAL.k; c.fillRect(x - 2, y, w + 4, h);
    c.fillStyle = '#8a5a32'; c.fillRect(x, y, w, h);
    c.fillStyle = '#6b4424'; c.fillRect(x + 8, y + 4, 4, h - 8); c.fillRect(x + 30, y + 10, 4, h - 14); c.fillRect(x + 46, y + 2, 3, h - 10);
    c.fillStyle = '#a8724a'; c.fillRect(x + 2, y, 4, h);
    if (deco) {
      const bx = deco < 0 ? x - 34 : x + w;
      c.fillStyle = PAL.k; c.fillRect(bx - 1, y + 10, 36, 10);
      c.fillStyle = '#6b4424'; c.fillRect(bx, y + 11, 34, 8);
      c.fillStyle = PAL.G; c.fillRect(deco < 0 ? bx - 6 : bx + 26, y + 2, 14, 12);
    }
    if (current) {
      pxbox(c, x + 12, y + 8, w - 24, h - 16, PAL.y);
      TXT.box(c, '?', x + w / 2, y + h / 2, w - 28, h - 20, { sizes: [16], weight: 700 });
    }
  }
  draw(c) {
    const W = this.W, H = this.H, gy = this.gy, cx = this.cx;
    const bands = ['#1d3b4f', '#22445a', '#284e66', '#2e5872', '#35637d'];
    const bh = Math.ceil(H / bands.length);
    bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * bh, W, bh + 1); });
    c.fillStyle = '#f6e7b0'; c.fillRect(W - 80, 30, 30, 30); c.fillStyle = '#35637d'; c.fillRect(W - 68, 30, 18, 12);
    c.fillStyle = '#16382a';
    for (let x = -20; x < W + 20; x += 44) { c.fillRect(x + 14, gy - 80, 16, 80); c.fillRect(x + 4, gy - 64, 36, 20); c.fillRect(x + 8, gy - 78, 28, 14); }
    c.fillStyle = '#3a2a1e'; c.fillRect(0, gy, W, H - gy);
    c.fillStyle = PAL.g; c.fillRect(0, gy, W, 4);
    const w = 64, x = cx - w / 2, h = 36;
    const remaining = this.items.length - this.i;
    const off = this.drop * h;
    for (let k = 0; k < remaining + 12; k++) {
      const y = gy - 36 - k * h - off;
      if (y < -h) break;
      this.segment(c, x, y, w, h, k === 0 ? 0 : this.deco[(this.i + k) % this.deco.length], k === 0 && !this.done && remaining > 0);
    }
    c.fillStyle = PAL.k; c.fillRect(x - 6, gy - 2, w + 12, 6);
    for (const f of this.flying) {
      c.save(); c.translate(f.x, f.y); c.rotate(f.rot);
      this.segment(c, -w / 2, -h / 2, w, h, 0, false);
      c.restore();
    }
    const px = cx + this.side * this.reach;
    const flip = this.side > 0;
    if (this.squash) {
      c.save(); c.translate(px, gy); c.scale(1.4, 0.35);
      SPR.drawC(c, 'student', 0, 0, 3, { flip });
      c.restore();
      c.fillStyle = PAL.k; c.fillRect(px - 40, gy - 36, 80, 14); c.fillStyle = '#6b4424'; c.fillRect(px - 38, gy - 34, 76, 10);
    } else {
      SPR.drawC(c, 'student', px, gy, 3, { flip });
      const a = this.swing > 0 ? -1.2 + (0.2 - this.swing) * 10 : -0.4;
      c.save(); c.translate(px - this.side * 10, gy - 36); c.rotate(this.side * -a);
      c.fillStyle = '#6b4424'; c.fillRect(-this.side * 2 - 2, -30, 4, 30);
      c.fillStyle = PAL.l; c.fillRect(this.side > 0 ? -14 : 2, -34, 12, 10);
      c.restore();
    }
    const sw = Math.min(110, W * 0.32);
    pxbox(c, 8, H - 38, sw, 30, '#ff6b6b');
    TXT.box(c, '◀ FAŁSZ', 8 + sw / 2, H - 23, sw - 10, 24, { sizes: [13, 12, 11] });
    pxbox(c, W - 8 - sw, H - 38, sw, 30, '#9be23a');
    TXT.box(c, 'PRAWDA ▶', W - 8 - sw / 2, H - 23, sw - 10, 24, { sizes: [13, 12, 11] });
    this.S.timerBar(c, this.left / this.per);
  }
}
Drwal.intro = { title: 'RĄB!', hint: '← / lewa połowa = FAŁSZ · → / prawa połowa = PRAWDA' };
MINIGAMES.tf = Drwal;
