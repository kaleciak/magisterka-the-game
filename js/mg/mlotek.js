'use strict';
/* MŁOTEK JIDOKA (whac-a-mole) – wal tylko w krety z hasłami należącymi do zbioru. */
class Mlotek extends MG {
  start() {
    const ch = this.ch;
    const W = this.W, H = this.H;
    this.holes = [];
    if (H >= 420) {
      this.sw = Math.min(150, W * 0.46);
      for (const fy of [0.4, 0.64, 0.88]) for (const fx of [0.27, 0.73]) this.holes.push({ x: Math.round(W * fx), y: Math.round(H * fy) });
    } else {
      this.sw = Math.min(120, W / 3 - 8);
      for (const y of [H - 134, H - 30]) for (const fx of [0.175, 0.5, 0.825]) this.holes.push({ x: Math.round(W * fx), y });
    }
    this.queue = ch.items.slice();
    this.moles = [];
    this.spawnT = 0.3;
    this.popEvery = 1.35 / this.speed;
    this.up = U.clamp(3.1 / this.speed, 1.8, 3.4);
    this.mist = 0;
    this.allowed = ch.items.length >= 7 ? 1 : 0;
    this.errors = [];
    this.hammer = null;
    this.S.prompt({ lead: `${ch.tag} · Zbiór`, text: `WALNIJ tylko: ${ch.title}`, sub: 'Intruzów nie ruszaj. Przegapienie pasującego = pomyłka.' });
    this.S.controls([]);
  }
  key(k, down) {
    if (!down || this.done) return;
    const m = /^n(\d)$/.exec(k);
    if (m) { const mole = this.moles.find(o => o.hole === +m[1] - 1 && o.state === 'up'); if (mole) this.whack(mole); }
  }
  pointer(type, x, y) {
    if (type !== 'down' || this.done) return;
    const mole = this.moles.find(o => {
      if (o.state !== 'up') return false;
      const h = this.holes[o.hole];
      return x > h.x - this.sw / 2 - 2 && x < h.x + this.sw / 2 + 2 && y > h.y - 86 && y < h.y + 8;
    });
    if (mole) this.whack(mole);
    else this.hammer = { x, y, t: 0.18 };
  }
  whack(m) {
    const h = this.holes[m.hole];
    m.hit = true; m.state = 'down';
    this.hammer = { x: h.x + 20, y: h.y - 40, t: 0.2 };
    if (m.it.ok) {
      this.S.sfx('whack'); this.S.sfx('coin');
      this.S.burst(h.x, h.y - 30, [PAL.y, PAL.w, PAL.g], 12);
      this.S.float('+', h.x, h.y - 70, PAL.g, 18);
    } else {
      this.mist++;
      this.errors.push(`„${m.it.t}” – to intruz`);
      this.S.sfx('bad'); this.S.shake(4);
      this.S.float('✗ INTRUZ', h.x, h.y - 70, '#ff6b6b', 12);
      this.checkFail();
    }
  }
  checkFail() {
    if (this.mist > this.allowed && !this.done) {
      this.end({ ok: false, your: this.errors.join('; '), right: `Należą: ${this.ch.all.join(', ')}`, fix: `${this.ch.title}: ${this.ch.all.join(', ')}` }, 1.1);
    }
  }
  update(dt) {
    super.update(dt);
    if (this.hammer) { this.hammer.t -= dt; if (this.hammer.t <= 0) this.hammer = null; }
    if (!this.done) {
      this.spawnT -= dt;
      const live = this.moles.filter(m => m.state === 'up');
      if (this.spawnT <= 0 && this.queue.length && live.length < 2) {
        const free = this.holes.map((_, i) => i).filter(i => !this.moles.some(m => m.hole === i));
        if (free.length) {
          this.moles.push({ hole: U.pick(free), it: this.queue.shift(), t: 0, h: 0, state: 'up', hit: false });
          this.spawnT = this.popEvery;
        }
      }
    }
    for (const m of this.moles) {
      m.t += dt;
      if (m.state === 'up') {
        m.h = Math.min(1, m.h + dt * 6);
        if (m.t > this.up && !this.done) {
          m.state = 'down';
          const h = this.holes[m.hole];
          if (m.it.ok && !m.hit) {
            this.mist++;
            this.errors.push(`przegapione: „${m.it.t}”`);
            this.S.sfx('bad');
            this.S.float('Przegapione!', h.x, h.y - 70, '#ff6b6b', 11);
            this.checkFail();
          } else if (!m.it.ok) this.S.float('✓ ok', h.x, h.y - 70, PAL.g, 10);
        }
      } else m.h = Math.max(0, m.h - dt * 6);
    }
    this.moles = this.moles.filter(m => !(m.state === 'down' && m.h <= 0));
    if (!this.done && !this.queue.length && !this.moles.length) {
      if (this.mist <= this.allowed) {
        this.S.sfx('ok'); this.S.burst(this.W / 2, this.H / 2, [PAL.g, PAL.y], 24);
        this.end({ ok: true, note: this.mist ? this.errors[0] : null }, 0.6);
      } else this.checkFail();
    }
  }
  draw(c) {
    const W = this.W, H = this.H, sw = this.sw;
    c.fillStyle = '#1f5a2e'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#246636';
    for (let y = 8; y < H; y += 22) for (let x = (y % 44 ? 0 : 11); x < W; x += 22) c.fillRect(x, y, 4, 4);
    c.fillStyle = '#16432a'; c.fillRect(0, 0, W, 40);
    this.holes.forEach((h, i) => {
      c.fillStyle = '#12301f'; c.fillRect(h.x - 44, h.y - 8, 88, 18);
      c.fillStyle = PAL.k; c.fillRect(h.x - 38, h.y - 6, 76, 12);
      TXT.line(c, String(i + 1), h.x - 50, h.y - 4, { size: 9, color: '#7bd18f' });
    });
    for (const m of this.moles) {
      const h = this.holes[m.hole];
      const rise = m.h * 38;
      c.save();
      c.beginPath(); c.rect(h.x - 60, h.y - 120, 120, 120); c.clip();
      SPR.drawC(c, 'mole', h.x, h.y + 38 - rise + (m.hit ? 6 : 0), 3, { alpha: 1 });
      c.restore();
      if (m.h > 0.6 && m.state === 'up') {
        const sy = h.y - rise - 34;
        pxbox(c, h.x - sw / 2, sy - 8, sw, 38, m.hit ? '#9be23a' : PAL.w);
        TXT.box(c, m.it.t, h.x, sy + 11, sw - 8, 32, { sizes: [13, 12, 11, 10, 9, 8] });
      }
      c.fillStyle = PAL.k; c.fillRect(h.x - 44, h.y + 4, 88, 8);
    }
    if (this.hammer) {
      const hm = this.hammer, a = hm.t * 6;
      c.save(); c.translate(hm.x, hm.y); c.rotate(-a);
      c.fillStyle = '#6b4424'; c.fillRect(-3, -4, 6, 34);
      c.fillStyle = PAL.k; c.fillRect(-15, -16, 30, 16); c.fillStyle = PAL.l; c.fillRect(-13, -14, 26, 12);
      c.restore();
    }
    TXT.line(c, `Pomyłki: ${this.mist}/${this.allowed + 1}`, 8, 8, { size: 10, color: this.mist ? '#ff6b6b' : '#bfe8c9', shadow: PAL.k });
    TXT.line(c, `W kolejce: ${this.queue.length}`, W - 8, 8, { size: 10, align: 'right', color: '#bfe8c9', shadow: PAL.k });
  }
}
Mlotek.intro = { title: 'WALNIJ!', hint: 'Tapnij (albo 1–6) tylko krety z pasującymi hasłami' };
MINIGAMES.whac = Mlotek;
