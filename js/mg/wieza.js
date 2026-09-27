'use strict';
/* WIEŻA (Icy Tower / Doodle Jump) – skacz po platformach w dobrej kolejności. */
class Wieza extends MG {
  start() {
    const ch = this.ch, W = this.W, H = this.H;
    this.gap = 74; this.baseY = H - 28;
    this.ph = W >= 400 ? 26 : 36;
    this.plats = [{ x: 0, w: W, h: 28, y: this.baseY, row: 0, ground: true, state: 'ok', label: 'START' }];
    ch.rows.forEach((r, i) => {
      const n = r.opts.length;
      const slots = U.shuffle(n === 2 ? [W * 0.27, W * 0.73] : [W * 0.175, W * 0.5, W * 0.825]);
      const pw = n === 2 ? W * 0.39 : W * 0.3;
      r.opts.forEach((label, j) => this.plats.push({
        x: slots[j] - pw / 2 + U.ri(-4, 4), w: pw, h: this.ph, y: this.baseY - (i + 1) * this.gap,
        row: i + 1, label, correct: j === r.ans, state: 'idle', vy: 0,
      }));
    });
    this.p = { x: W / 2, y: this.baseY, vx: 0, vy: -440, face: 1 };
    this.cur = 0;
    this.camY = this.targetCam();
    this.total = U.clamp(ch.rows.length * 10 / this.speed, 20, 70); this.left = this.total;
    this.inL = false; this.inR = false; this.fell = false;
    this.S.controls([{ label: '◀', key: 'left', cls: 'big' }, { label: '▶', key: 'right', cls: 'big' }]);
    this.updPrompt();
  }
  targetCam() { return (this.baseY - this.cur * this.gap) - (this.H - 68); }
  updPrompt() {
    const ch = this.ch;
    const got = ch.seq.slice(0, this.cur);
    const text = ch.mode === 'order' ? `Skacz w kolejności: ${ch.title}` : `Skacz tylko po elementach: ${ch.title}`;
    const sub = ch.mode === 'order' ? (got.length ? got.join(' → ') + ' → ?' : 'Start → ?') : (got.length ? '✓ ' + got.join(' · ') : '');
    this.S.prompt({ lead: `${ch.tag} · ${ch.mode === 'order' ? 'Kolejność' : 'Zbiór'} ${this.cur}/${ch.rows.length}`, text, sub });
  }
  key(k, down) { if (k === 'left') this.inL = down; if (k === 'right') this.inR = down; }
  pointer(type, x) {
    if (type === 'down') { if (x < this.W / 2) this.inL = true; else this.inR = true; }
    if (type === 'up') { this.inL = false; this.inR = false; }
  }
  rowAnswer(row) { return this.plats.find(p => p.row === row && p.correct); }
  fixText() {
    const ch = this.ch;
    return ch.mode === 'order' ? `Kolejność: ${ch.seq.join(' → ')}` : `Należą: ${ch.all.join(', ')}`;
  }
  update(dt) {
    super.update(dt);
    const p = this.p, W = this.W;
    if (!this.done) {
      this.left -= dt;
      if (this.left <= 0) {
        const r = this.rowAnswer(this.cur + 1);
        this.S.sfx('bad');
        this.end({ ok: false, timeout: true, right: r ? r.label : '', fix: this.fixText() }, 0.9);
      }
    }
    const ax = (this.inR ? 1 : 0) - (this.inL ? 1 : 0);
    p.vx += (ax * 190 - p.vx) * Math.min(1, dt * 10);
    if (ax) p.face = ax;
    p.x += p.vx * dt;
    if (p.x < -10) p.x += W + 20;
    if (p.x > W + 10) p.x -= W + 20;
    const prev = p.y;
    p.vy = Math.min(p.vy + 950 * dt, 700);
    p.y += p.vy * dt;
    if (p.vy > 0 && !this.fell) {
      for (const pl of this.plats) {
        if (pl.state === 'broken') continue;
        if (pl.row !== this.cur && pl.row !== this.cur + 1) continue;
        if (prev <= pl.y && p.y >= pl.y && p.x + 7 > pl.x && p.x - 7 < pl.x + pl.w) {
          p.y = pl.y;
          if (pl.row === this.cur + 1 && !this.done) {
            if (pl.correct) {
              pl.state = 'ok'; this.cur++; p.vy = -440;
              this.S.sfx('coin');
              this.S.burst(p.x, pl.y - this.camY, [PAL.g, PAL.y], 10);
              this.updPrompt();
              if (this.cur === this.ch.rows.length) {
                this.S.sfx('ok');
                this.S.float('KOMPLET!', W / 2, 90, PAL.g, 18);
                this.S.burst(W / 2, 120, [PAL.g, PAL.y, PAL.w], 28);
                this.end({ ok: true }, 0.8);
              }
            } else {
              pl.state = 'broken'; this.fell = true; p.vy = 40;
              this.S.sfx('bad'); this.S.shake(6);
              const r = this.rowAnswer(pl.row);
              this.end({ ok: false, your: pl.label, right: r ? r.label : '', fix: this.fixText() }, 1.2);
            }
          } else { p.vy = -440; this.S.sfx('jump'); }
          break;
        }
      }
    }
    for (const pl of this.plats) if (pl.state === 'broken') { pl.vy += 600 * dt; pl.y += pl.vy * dt; }
    this.camY += (this.targetCam() - this.camY) * Math.min(1, dt * 4);
  }
  draw(c) {
    const cam = this.camY, W = this.W, H = this.H;
    c.fillStyle = '#2a1d33'; c.fillRect(0, 0, W, H);
    const bo = -(cam * 0.5) % 20;
    for (let y = bo - 20; y < H; y += 20) {
      const row = Math.floor((y - bo + cam * 0.5) / 20);
      for (let x = (row % 2 ? -20 : 0); x < W; x += 40) {
        c.fillStyle = '#34253f'; c.fillRect(x + 1, y + 1, 38, 18);
        c.fillStyle = '#3d2c4a'; c.fillRect(x + 1, y + 1, 38, 3);
      }
    }
    c.fillStyle = '#1a1222'; c.fillRect(0, 0, 8, H); c.fillRect(W - 8, 0, 8, H);
    for (const pl of this.plats) {
      const y = pl.y - cam;
      if (y < -40 || y > H + 30) continue;
      if (pl.ground) {
        c.fillStyle = '#3a2a1e'; c.fillRect(0, y, W, 40);
        c.fillStyle = PAL.g; c.fillRect(0, y, W, 4);
        TXT.line(c, 'START', W / 2, y + 10, { size: 10, align: 'center', color: PAL.l });
        continue;
      }
      const next = pl.row === this.cur + 1;
      const future = pl.row > this.cur + 1;
      c.globalAlpha = future ? 0.5 : 1;
      let fill = PAL.w;
      if (pl.state === 'ok') fill = '#9be23a';
      if (pl.state === 'broken') fill = '#ff6b6b';
      if (next && !this.done) {
        c.fillStyle = (Math.sin(this.t * 6) > 0) ? PAL.y : PAL.o;
        c.fillRect(pl.x - 3, y - 3, pl.w + 6, pl.h + 6);
      }
      pxbox(c, pl.x, y, pl.w, pl.h, fill);
      c.fillStyle = PAL.m; c.fillRect(pl.x + 4, y + pl.h - 5, pl.w - 8, 2);
      TXT.box(c, pl.label, pl.x + pl.w / 2, y + pl.h / 2, pl.w - 8, pl.h - 7, { sizes: [12, 11, 10, 9, 8, 7] });
      c.globalAlpha = 1;
    }
    const p = this.p;
    const st = U.clamp(1 - p.vy / 1400, 0.8, 1.2);
    c.save(); c.translate(p.x, p.y - cam); c.scale(1 / st, st);
    SPR.drawC(c, 'student', 0, 0, 2, { flip: p.face < 0 });
    c.restore();
    this.S.timerBar(c, this.left / this.total);
    pxbox(c, W - 48, H - 28, 42, 22, PAL.k, PAL.y);
    TXT.box(c, `${this.cur}/${this.ch.rows.length}`, W - 27, H - 17, 36, 16, { sizes: [12, 11], color: PAL.y });
  }
}
Wieza.intro = { title: 'SKACZ!', hint: '← → (albo przytrzymaj lewą/prawą połowę) · ląduj na właściwej platformie' };
MINIGAMES.tower = Wieza;
