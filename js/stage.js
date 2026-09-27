'use strict';
/* Scena minigier: canvas 400×300 (współrzędne logiczne), pętla, wejście, efekty. */
const STAGE = {
  W: 400, H: 300,
  cv: null, ctx: null, k: 1,
  mg: null, onDone: null, pending: null,
  intro: 0, outro: 0, active: false, paused: false, dom: false,
  particles: [], floats: [], shakeT: 0, shakeA: 0, flashT: 0, flashCol: '#fff',
  speed: 1, t: 0,

  init() {
    this.cv = U.$('#cv');
    this.ctx = this.cv.getContext('2d');
    this.stageEl = U.$('#stage');
    this.wrapEl = U.$('#stage-wrap');
    this.panel = U.$('#panel');
    this.controlsEl = U.$('#controls');
    this.promptEl = U.$('#prompt');
    this.splashEl = U.$('#splash');
    const ro = new ResizeObserver(() => this.resize());
    ro.observe(this.wrapEl);
    window.addEventListener('resize', () => this.resize());
    const pos = e => {
      const r = this.cv.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width * this.W, (e.clientY - r.top) / r.height * this.H];
    };
    this.cv.addEventListener('pointerdown', e => {
      e.preventDefault();
      AUDIO.resume();
      if (!this.canInput()) return;
      const [x, y] = pos(e);
      this.cv.setPointerCapture && this.cv.setPointerCapture(e.pointerId);
      this.mg.pointer('down', x, y);
    });
    const up = e => { if (this.mg && this.active) { const [x, y] = pos(e); this.mg.pointer('up', x, y); } };
    this.cv.addEventListener('pointerup', up);
    this.cv.addEventListener('pointercancel', up);
    this.cv.addEventListener('pointermove', e => { if (this.canInput()) { const [x, y] = pos(e); this.mg.pointer('move', x, y); } });
    requestAnimationFrame(t => this.frame(t));
  },
  canInput() { return this.active && !this.paused && this.mg && !this.mg.done && this.intro <= 0; },
  /* Wymiary logiczne: poziomo 400×300; na telefonie w pionie węższa i wyższa scena (większe napisy). */
  computeDims() {
    const aw = this.wrapEl.clientWidth || 400;
    const ah = (this.wrapEl.clientHeight || 300) - (this.controlsEl.childElementCount ? 0 : 72);
    if (aw < 600 && ah > aw * 0.95) { this.W = 320; this.H = U.clamp(Math.round(ah / aw * 320), 300, 540); }
    else { this.W = 400; this.H = 300; }
    this.portrait = this.W < 400;
  },
  resize() {
    if (!this.wrapEl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    if (this.dom) { this.stageEl.style.width = ''; this.stageEl.style.height = ''; return; }
    const aw = this.wrapEl.clientWidth, ah = this.wrapEl.clientHeight;
    if (!aw || !ah) return;
    const ar = this.W / this.H;
    let w = Math.min(aw, ah * ar, 880);
    w = Math.max(200, Math.floor(w));
    const h = Math.floor(w / ar);
    this.stageEl.style.width = w + 'px';
    this.stageEl.style.height = h + 'px';
    const bw = Math.round(w * dpr), bh = Math.round(h * dpr);
    if (this.cv.width !== bw || this.cv.height !== bh) { this.cv.width = bw; this.cv.height = bh; }
    this.k = bw / this.W;
  },
  /* ---- API dla minigier ---- */
  prompt(o) {
    const el = this.promptEl;
    el.querySelector('.lead').textContent = o.lead || '';
    const t = el.querySelector('.text');
    if (o.html != null) t.innerHTML = o.html; else t.textContent = o.text || '';
    t.classList.toggle('long', (o.text || o.html || '').length > 150);
    el.querySelector('.sub').textContent = o.sub || '';
  },
  controls(list) {
    this.controlsEl.innerHTML = '';
    for (const c of list || []) {
      const b = U.el('button', { class: 'ctl ' + (c.cls || ''), tabindex: '-1', type: 'button' }, c.label);
      const down = e => { e.preventDefault(); AUDIO.resume(); if (this.canInput()) this.mg.key(c.key, true); b.classList.add('down'); };
      const upf = () => { if (this.mg && this.active) this.mg.key(c.key, false); b.classList.remove('down'); };
      b.addEventListener('pointerdown', down);
      b.addEventListener('pointerup', upf);
      b.addEventListener('pointerleave', upf);
      b.addEventListener('pointercancel', upf);
      this.controlsEl.append(b);
    }
  },
  setDom(on) {
    this.dom = on;
    this.stageEl.classList.toggle('dom', on);
    this.panel.innerHTML = '';
    this.panel.hidden = !on;
    this.resize();
  },
  sfx(n) { AUDIO.play(n); },
  shake(a = 4, t = 0.25) { this.shakeA = a; this.shakeT = t; },
  flash(col = '#fff', t = 0.15) { this.flashCol = col; this.flashT = t; },
  burst(x, y, color = PAL.y, n = 14, spd = 120) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = spd * (0.4 + Math.random());
      this.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, life: 0.5 + Math.random() * 0.5, max: 1, color: Array.isArray(color) ? U.pick(color) : color, s: 2 + Math.floor(Math.random() * 3) });
    }
  },
  float(text, x, y, color = PAL.y, size = 14) { this.floats.push({ text, x, y, vy: -38, life: 1.1, color, size }); },
  /* ---- cykl życia minigry ---- */
  load(mg, onDone) {
    this.mg = mg; this.onDone = onDone; this.pending = null; this.outro = 0;
    this.particles = []; this.floats = [];
    this.active = true; this.paused = false;
    this.speed = mg.ch.speed || 1;
    this.setDom(!!mg.constructor.dom);
    this.controls([]);
    this.computeDims();
    mg.W = this.W; mg.H = this.H;
    mg.start();
    const info = mg.constructor.intro || { title: 'GRAJ!', hint: '' };
    this.intro = Math.max(0.75, 1.15 / Math.sqrt(this.speed));
    this.splashEl.innerHTML = '';
    this.splashEl.append(U.el('div', { class: 'sp-title' }, info.title), U.el('div', { class: 'sp-hint' }, info.hint));
    this.splashEl.hidden = false;
    this.splashEl.classList.remove('go'); void this.splashEl.offsetWidth; this.splashEl.classList.add('go');
    this.resize();
  },
  finish(res, delay = 0.85) {
    if (this.pending) return;
    this.pending = res;
    this.outro = delay;
  },
  stop() { this.active = false; this.mg = null; this.splashEl.hidden = true; this.controls([]); },
  frame(t) {
    const dt = Math.min(0.05, (t - (this.lastT || t)) / 1000);
    this.lastT = t;
    if (this.active && !this.paused && this.mg) {
      this.t += dt;
      this.update(dt);
      if (!this.dom) this.draw();
    }
    requestAnimationFrame(tt => this.frame(tt));
  },
  update(dt) {
    if (this.intro > 0) {
      this.intro -= dt;
      if (this.intro <= 0) { this.splashEl.hidden = true; this.mg.begin && this.mg.begin(); }
    } else this.mg.update(dt);
    for (const p of this.particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 260 * dt; p.life -= dt; }
    this.particles = this.particles.filter(p => p.life > 0);
    for (const f of this.floats) { f.y += f.vy * dt; f.life -= dt; }
    this.floats = this.floats.filter(f => f.life > 0);
    if (this.shakeT > 0) this.shakeT -= dt;
    if (this.flashT > 0) this.flashT -= dt;
    if (this.pending && this.intro <= 0) {
      this.outro -= dt;
      if (this.outro <= 0) {
        const res = this.pending, cb = this.onDone;
        this.pending = null;
        this.active = false;
        cb && cb(res);
      }
    }
  },
  draw() {
    const c = this.ctx;
    c.setTransform(this.k, 0, 0, this.k, 0, 0);
    c.imageSmoothingEnabled = false;
    c.save();
    if (this.shakeT > 0) c.translate(U.rnd(-this.shakeA, this.shakeA), U.rnd(-this.shakeA, this.shakeA));
    c.fillStyle = '#0c1410';
    c.fillRect(-10, -10, this.W + 20, this.H + 20);
    this.mg.draw(c);
    for (const p of this.particles) { c.globalAlpha = U.clamp(p.life * 2, 0, 1); c.fillStyle = p.color; c.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s); }
    c.globalAlpha = 1;
    for (const f of this.floats) {
      c.globalAlpha = U.clamp(f.life * 1.6, 0, 1);
      TXT.line(c, f.text, f.x, f.y, { size: f.size, align: 'center', color: f.color, shadow: PAL.k, sd: 2, weight: 700, fam: 'body' });
    }
    c.globalAlpha = 1;
    c.restore();
    if (this.flashT > 0) { c.globalAlpha = U.clamp(this.flashT * 4, 0, 0.7); c.fillStyle = this.flashCol; c.fillRect(0, 0, this.W, this.H); c.globalAlpha = 1; }
  },
  /* pasek czasu na górze sceny */
  timerBar(c, frac) {
    frac = U.clamp(frac, 0, 1);
    const w = this.W - 16;
    c.fillStyle = PAL.k; c.fillRect(6, 4, w + 4, 9);
    c.fillStyle = '#1e3629'; c.fillRect(8, 6, w, 5);
    c.fillStyle = frac > 0.5 ? PAL.g : frac > 0.25 ? PAL.y : PAL.r;
    c.fillRect(8, 6, Math.round(w * frac), 5);
  },
};

/* Bazowa klasa minigry */
class MG {
  constructor(ch) { this.ch = ch; this.t = 0; this.done = false; this.S = STAGE; this.speed = ch.speed || 1; }
  start() {}
  update(dt) { this.t += dt; }
  draw() {}
  key() {}
  pointer() {}
  end(res, delay) { if (this.done) return; this.done = true; this.S.finish(res, delay); }
}
const MINIGAMES = {};
