'use strict';
/* FLAPPY BIRRET – leć przez bramkę z właściwą odpowiedzią. */
class Flappy extends MG {
  start() {
    const ch = this.ch, S = this.S, W = this.W, H = this.H;
    S.prompt({ lead: `${ch.tag} · ${ch.lead}`, text: ch.prompt });
    S.controls([{ label: '▲ MACHNIJ', key: 'up', cls: 'wide' }]);
    this.groundY = H - 28;
    const n = ch.options.length;
    const total = this.groundY - 6;
    this.gh = Math.min(n === 2 ? 130 : 108, total / (n + 0.38 * (n + 1)));
    const wall = (total - n * this.gh) / (n + 1);
    this.gaps = ch.options.map((label, i) => ({ y: 6 + wall + i * (this.gh + wall), h: this.gh, label }));
    this.lw = W >= 400 ? 158 : 184;
    this.hover = H * 0.46;
    this.b = { x: Math.round(W * 0.21), y: this.hover, vy: 0, rot: 0 };
    this.gx = W + 40; this.gw = 34;
    this.vx = 44 * this.speed;
    this.scroll = 0; this.chosen = -1; this.crashed = false; this.flapped = false;
    this.stars = Array.from({ length: 26 }, () => [U.ri(0, W), U.ri(4, Math.round(H * 0.6)), Math.random()]);
  }
  key(k, down) { if (down && (k === 'up' || k === 'enter')) this.flap(); }
  pointer(type) { if (type === 'down') this.flap(); }
  flap() {
    if (this.done || this.chosen >= 0) return;
    this.flapped = true;
    this.b.vy = -205;
    this.S.sfx('flap');
  }
  choose() {
    const b = this.b;
    let best = 0, bd = 1e9;
    this.gaps.forEach((g, i) => { const d = Math.abs(b.y - (g.y + g.h / 2)); if (d < bd) { bd = d; best = i; } });
    this.chosen = best;
    if (best !== this.ch.answer) {
      this.crashed = true; b.vy = -180;
      this.S.sfx('bad'); this.S.shake(6); this.S.flash(PAL.r, 0.12);
      this.S.burst(b.x, b.y, [PAL.y, PAL.w, PAL.o], 22);
      this.end({ ok: false, your: this.ch.options[best], right: this.ch.options[this.ch.answer], fix: this.ch.fix }, 1.1);
    }
  }
  update(dt) {
    super.update(dt);
    const b = this.b;
    if (!this.crashed) this.gx -= this.vx * dt;
    this.scroll += this.vx * dt * (this.crashed ? 0.2 : 1);
    if (this.chosen < 0) {
      if (this.flapped) { b.vy = Math.min(b.vy + 600 * dt, 300); b.y += b.vy * dt; }
      else b.y = this.hover + Math.sin(this.t * 5) * 6;
      if (b.y < 10) { b.y = 10; b.vy = 0; }
      if (b.y > this.groundY - 10) { b.y = this.groundY - 10; b.vy = -170; this.S.sfx('bump'); }
      b.rot = U.clamp(b.vy / 500, -0.5, 0.9);
      if (this.gx <= b.x + 10) this.choose();
    } else if (!this.crashed) {
      const g = this.gaps[this.chosen];
      b.y += (g.y + g.h / 2 - b.y) * Math.min(1, dt * 10);
      b.rot *= 0.9;
      if (this.gx + this.gw < b.x - 14 && !this.done) {
        this.S.sfx('ok');
        this.S.burst(b.x, b.y, [PAL.y, PAL.g, PAL.w], 18);
        this.S.float('DOBRZE!', b.x + 50, b.y - 24, PAL.g, 16);
        this.end({ ok: true }, 0.55);
      }
    } else {
      b.vy += 700 * dt; b.y = Math.min(this.groundY - 8, b.y + b.vy * dt); b.x -= 30 * dt; b.rot += dt * 8;
    }
  }
  draw(c) {
    const W = this.W, H = this.H, gy = this.groundY;
    const bands = ['#0f2233', '#112739', '#132c40', '#163347', '#193a4f', '#1c4156'];
    const bh = Math.ceil(H / bands.length);
    bands.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * bh, W, bh + 1); });
    for (const [x, y, p] of this.stars) { c.fillStyle = (Math.sin(this.t * 3 + p * 9) > 0.6) ? PAL.w : '#5c7a8a'; c.fillRect(x, y, 2, 2); }
    const off = -(this.scroll * 0.2) % 160;
    c.fillStyle = '#0b1b27';
    for (let x = off - 160; x < W + 160; x += 160) {
      c.fillRect(x, gy - 82, 70, 90); c.fillRect(x + 10, gy - 122, 12, 40); c.fillRect(x + 40, gy - 107, 10, 25);
      c.fillRect(x + 80, gy - 62, 60, 70); c.fillRect(x + 100, gy - 96, 8, 34);
    }
    c.fillStyle = 'rgba(180,200,210,.12)';
    for (let x = off - 160; x < W + 160; x += 160) c.fillRect(x + 8 + Math.sin(this.t + x) * 3, gy - 140 - (this.t * 10 % 20), 16, 12);
    const off2 = -(this.scroll * 0.5) % 90;
    c.fillStyle = '#0f2a22';
    for (let x = off2 - 90; x < W + 90; x += 90) { c.fillRect(x, gy - 34, 60, 40); c.fillRect(x + 10, gy - 46, 40, 12); }
    // bramka
    const gx = Math.round(this.gx), gw = this.gw;
    const segs = [];
    let top = 0;
    for (const g of this.gaps) { segs.push([top, g.y]); top = g.y + g.h; }
    segs.push([top, gy]);
    for (const [y0, y1] of segs) {
      if (y1 - y0 < 1) continue;
      c.fillStyle = PAL.k; c.fillRect(gx - 2, y0, gw + 4, y1 - y0);
      c.fillStyle = PAL.G; c.fillRect(gx, y0, gw, y1 - y0);
      c.fillStyle = PAL.g; c.fillRect(gx + 4, y0, 8, y1 - y0);
      c.fillStyle = '#9be23a'; c.fillRect(gx + 6, y0, 3, y1 - y0);
      if (y0 > 0) { c.fillStyle = PAL.k; c.fillRect(gx - 5, y0, gw + 10, 7); c.fillStyle = PAL.g; c.fillRect(gx - 3, y0 + 1, gw + 6, 5); }
      if (y1 < gy) { c.fillStyle = PAL.k; c.fillRect(gx - 5, y1 - 7, gw + 10, 7); c.fillStyle = PAL.g; c.fillRect(gx - 3, y1 - 6, gw + 6, 5); }
    }
    // etykiety bramek (przypięte do prawej krawędzi, aż bramka nadleci)
    const lw = this.lw;
    const cx = Math.min(gx + gw / 2, W - lw / 2 - 4);
    this.gaps.forEach((g, i) => {
      const lh = Math.min(g.h - 12, 72);
      let fill = PAL.w;
      if (this.chosen >= 0) {
        if (i === this.ch.answer) fill = '#9be23a';
        else if (i === this.chosen) fill = '#ff6b6b';
      }
      pxbox(c, cx - lw / 2, g.y + (g.h - lh) / 2, lw, lh, fill);
      TXT.box(c, g.label, cx, g.y + g.h / 2, lw - 12, lh - 6, { sizes: [15, 14, 13, 12, 11, 10, 9] });
    });
    c.fillStyle = '#3a2a1e'; c.fillRect(0, gy, W, H - gy);
    c.fillStyle = PAL.g; c.fillRect(0, gy, W, 4);
    c.fillStyle = '#2a1e15';
    const off3 = -(this.scroll % 16);
    for (let x = off3; x < W; x += 16) c.fillRect(x, gy + 10, 8, 3);
    const b = this.b;
    SPR.draw(c, 'bird', b.x - 12, b.y - 10, 2, { rot: b.rot });
    if (!this.flapped && !this.done) TXT.line(c, 'TAPNIJ / SPACJA', b.x + 8, b.y + 16, { size: 10, align: 'center', color: PAL.y, shadow: PAL.k });
  }
}
Flappy.intro = { title: 'LEĆ!', hint: 'Spacja / tapnij = machnij · wleć w bramkę z dobrą odpowiedzią' };
MINIGAMES.flappy = Flappy;
