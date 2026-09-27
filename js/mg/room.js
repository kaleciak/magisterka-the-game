'use strict';
/* SALA EGZAMINACYJNA – pikselowa scenka z komisją reagującą na odpowiedzi + nastrój komisji. */
class Room {
  constructor(parent, opts = {}) {
    this.mood = opts.mood == null ? 0.5 : opts.mood;
    this.shown = this.mood;
    this.t = Math.random() * 10;
    this.pulse = 0;
    this.blink = [2, 3.4, 5.1];
    this.cv = U.el('canvas', { class: 'room-cv', width: 320, height: 88, 'aria-hidden': 'true' });
    this.ctx = this.cv.getContext('2d');
    this.bubble = U.el('div', { class: 'room-bubble' }, opts.say || 'Proszę bardzo, słuchamy.');
    this.meter = U.el('div', { class: 'room-meter', title: 'Nastrój komisji' }, U.el('span', {}, 'Nastrój komisji'), U.el('div', { class: 'rm-bar' }, U.el('i')));
    this.el = U.el('div', { class: 'room' }, this.cv, this.bubble, this.meter);
    parent.append(this.el);
    this.draw();
  }
  set(delta, text) {
    this.mood = U.clamp(this.mood + delta, 0, 1);
    this.pulse = 0.5;
    if (text) this.say(text);
  }
  say(text) { this.bubble.textContent = text; this.bubble.classList.remove('pop'); void this.bubble.offsetWidth; this.bubble.classList.add('pop'); }
  face() { return this.mood > 0.66 ? 'profH' : this.mood < 0.34 ? 'profA' : 'prof'; }
  update(dt) {
    this.t += dt;
    this.pulse = Math.max(0, this.pulse - dt);
    this.shown += (this.mood - this.shown) * Math.min(1, dt * 5);
    const bar = this.meter.querySelector('i');
    bar.style.width = Math.round(this.shown * 100) + '%';
    bar.style.background = this.shown > 0.66 ? 'var(--green)' : this.shown < 0.34 ? 'var(--red)' : 'var(--amber)';
    this.draw();
  }
  draw() {
    const c = this.ctx, t = this.t;
    c.imageSmoothingEnabled = false;
    c.fillStyle = '#2b2138'; c.fillRect(0, 0, 320, 88);
    c.fillStyle = '#33283f';
    for (let x = 0; x < 320; x += 20) c.fillRect(x, 0, 10, 60);
    // okno z nocnym niebem nad Krakowem
    c.fillStyle = PAL.k; c.fillRect(250, 6, 60, 36);
    c.fillStyle = '#16304a'; c.fillRect(252, 8, 56, 32);
    c.fillStyle = '#f6e7b0'; c.fillRect(292, 12, 6, 6);
    c.fillStyle = '#0b1b27'; c.fillRect(252, 28, 56, 12); c.fillRect(266, 20, 8, 8); c.fillRect(284, 24, 6, 4);
    c.fillStyle = PAL.k; c.fillRect(279, 8, 2, 32);
    // tablica
    c.fillStyle = PAL.k; c.fillRect(8, 6, 70, 34);
    c.fillStyle = '#1f4a31'; c.fillRect(10, 8, 66, 30);
    c.fillStyle = 'rgba(242,236,217,.7)'; c.fillRect(14, 14, 30, 2); c.fillRect(14, 20, 44, 2); c.fillRect(14, 26, 22, 2);
    // komisja
    const face = this.face();
    const swaps = [{ l: '#b8c4bc', B: '#1b4f8a' }, { l: '#4a2c18', B: '#8e1a26' }, { l: '#f2ecd9', B: '#138a45' }];
    [100, 150, 200].forEach((x, i) => {
      const bob = this.pulse > 0 ? Math.round(Math.sin((0.5 - this.pulse) * 30 + i) * 1.5) : 0;
      const blinking = ((t + this.blink[i]) % 4.2) < 0.12;
      SPR.drawC(c, blinking && face === 'prof' ? 'profB' : face, x, 64 + bob, 3, { swap: swaps[i] });
    });
    // stół komisji
    c.fillStyle = PAL.k; c.fillRect(70, 58, 160, 30);
    c.fillStyle = '#6b4424'; c.fillRect(72, 60, 156, 28);
    c.fillStyle = '#8a5a32'; c.fillRect(72, 60, 156, 4);
    c.fillStyle = PAL.w; c.fillRect(90, 56, 14, 4); c.fillRect(186, 56, 16, 4);
    // student przy mównicy
    SPR.drawC(c, 'student', 262, 80, 2);
    c.fillStyle = PAL.k; c.fillRect(248, 66, 30, 22);
    c.fillStyle = '#5a3e24'; c.fillRect(250, 68, 26, 20);
    c.fillStyle = '#8a5a32'; c.fillRect(250, 68, 26, 3);
    c.fillStyle = '#1a1222'; c.fillRect(0, 84, 320, 4);
  }
}

/* Wzorcowa odpowiedź ustna jako lista zdań z rolami (używane w grach i nakładkach). */
Room.answer = function (q, opts = {}) {
  const ol = U.el('ol', { class: 'say' + (opts.compact ? ' compact' : '') });
  q.say.forEach(([r, t]) => ol.append(U.el('li', { class: 'say-' + r },
    U.el('span', { class: 'role role-' + r }, CH.ROLE_NAME[r]), U.el('span', { class: 'say-t', html: U.md(t) }))));
  return ol;
};
/* Wspólna końcówka gier „ustnych”: werdykt, wzorcowa odpowiedź, haczyk, DALEJ. */
Room.finale = function (mg, ok, verdict, extra) {
  const q = mg.ch.q;
  const btn = U.el('button', { class: 'btn primary', type: 'button' }, 'DALEJ ▶');
  btn.onclick = () => { if (!mg.done) mg.end({ ok, skipCorrection: true }, 0.05); };
  const box = U.el('div', { class: 'finale' },
    U.el('div', { class: 'verdict ' + (ok ? 'good' : 'bad') }, verdict),
    extra || null,
    U.el('div', { class: 'mini-label' }, 'TAK TO POWIEDZ KOMISJI'),
    Room.answer(q),
    U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), q.m),
    U.el('div', { class: 'kom-actions' }, btn));
  mg.S.panel.append(box);
  mg.finaleBtn = btn;
  setTimeout(() => box.scrollIntoView({ block: 'start', behavior: 'smooth' }), 60);
  btn.focus({ preventScroll: true });
};
