'use strict';
/* Animowana scena tytułowa: nocny Kraków, gmach główny AGH z hutnikiem i górnikiem, huta z iskrami,
   student idący na obronę. Rysowana w 320×96 i skalowana pikselowo. */
const SCENE = {
  raf: 0,
  title(cv) {
    const W = 320, H = 96, c = cv.getContext('2d');
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stars = Array.from({ length: 34 }, () => ({ x: U.ri(0, W - 1), y: U.ri(0, 38), p: Math.random() * 6 }));
    const lit = Array.from({ length: 24 }, () => Math.random() < 0.55);
    const sparks = [], smoke = [];
    let t = 0, sx = -12, last = performance.now(), cap = null;
    const R = (col, x, y, w, h) => { c.fillStyle = col; c.fillRect(x | 0, y | 0, w, h); };
    const draw = () => {
      c.imageSmoothingEnabled = false;
      // niebo pasami (pikselowy gradient)
      ['#07101c', '#0a1522', '#0d1b29', '#112233', '#16293a'].forEach((col, i) => R(col, 0, i * 12, W, 12));
      for (const s of stars) if ((t * 1.3 + s.p) % 6 > 0.5) R(s.p > 3 ? '#f2ecd9' : '#8fa3b8', s.x, s.y, 1, 1);
      ['..###..', '.###...', '###....', '###....', '###....', '.###...', '..###..'].forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#') R('#f6e7b0', 24 + x, 6 + y, 1, 1); }));
      // panorama Krakowa (Wawel, Mariacki)
      c.fillStyle = '#0c1826';
      c.beginPath(); c.moveTo(0, 62);
      [[0, 54], [18, 54], [18, 46], [22, 42], [26, 46], [26, 52], [40, 52], [44, 40], [46, 36], [48, 40], [52, 52], [70, 50], [72, 44], [76, 44], [76, 50], [98, 52], [98, 62]].forEach(([x, y]) => c.lineTo(x, y));
      c.fill();
      c.fillStyle = '#0c1826';
      c.beginPath(); c.moveTo(250, 62); [[250, 50], [262, 50], [262, 40], [265, 32], [268, 40], [268, 48], [276, 48], [278, 42], [281, 42], [283, 48], [320, 50], [320, 62]].forEach(([x, y]) => c.lineTo(x, y)); c.fill();
      // gmach główny AGH (A-0)
      R('#0b0f0c', 94, 30, 132, 50);
      R('#3b4a42', 96, 32, 128, 48);
      R('#46574d', 96, 32, 128, 3);
      R('#0b0f0c', 138, 22, 44, 10); R('#52645a', 140, 24, 40, 8);
      // litery AGH z pikseli (bez czcionek)
      const A = ['.#.', '#.#', '###', '#.#', '#.#'], G = ['###', '#..', '#.#', '#.#', '###'], Hh = ['#.#', '#.#', '###', '#.#', '#.#'];
      [A, G, Hh].forEach((L, li) => L.forEach((row, ry) => [...row].forEach((ch, rx) => { if (ch === '#') R('#2bd46b', 150 + li * 7 + rx * 2 - 1, 25 + ry, 2, 1); })));
      // hutnik i górnik na dachu
      [[102, '#1b4f8a'], [210, '#8e1a26']].forEach(([x, col], i) => {
        R('#0b0f0c', x, 18, 8, 14); R(col, x + 1, 22, 6, 9); R('#b8a27a', x + 2, 19, 4, 3);
        R('#b8a27a', i ? x + 6 : x - 2, 14 + (i ? 1 : 0), 2, 9); // młot / kilof uniesiony
        R('#ffc21a', i ? x + 5 : x - 3, 13, 4, 2);
      });
      // kolumny portyku
      for (let k = 0; k < 6; k++) { R('#0b0f0c', 138 + k * 8, 36, 4, 38); R('#a9b7ae', 139 + k * 8, 36, 2, 38); }
      R('#0b0f0c', 134, 34, 52, 3);
      // okna skrzydeł
      let wi = 0;
      for (const bx of [100, 188]) for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
        const on = lit[wi++ % lit.length];
        R('#0b0f0c', bx + col * 8, 38 + row * 12, 6, 8);
        R(on ? ((wi + Math.floor(t * 0.3)) % 9 === 0 ? '#ffe9a0' : '#ffc21a') : '#1d2a33', bx + 1 + col * 8, 39 + row * 12, 4, 6);
      }
      R('#0b0f0c', 154, 64, 12, 16); R(sx > 148 && sx < 168 ? '#ffe9a0' : '#6b4424', 155, 65, 10, 15);
      // huta: hala, komin, dym, blask, iskry
      R('#0b0f0c', 232, 50, 50, 30); R('#2a2f33', 234, 52, 46, 28);
      R('#0b0f0c', 286, 20, 12, 60); R('#4a3a36', 288, 22, 8, 58);
      for (let k = 0; k < 4; k++) R(k % 2 ? '#e0303c' : '#f2ecd9', 288, 24 + k * 4, 8, 2);
      const glow = 0.6 + Math.sin(t * 7) * 0.25 + Math.sin(t * 13) * 0.1;
      c.fillStyle = `rgba(255,122,26,${glow.toFixed(2)})`; c.fillRect(242, 62, 22, 18);
      R('#ffd23a', 248, 70, 10, 10);
      for (const p of smoke) { c.fillStyle = `rgba(120,130,140,${(0.45 * p.a).toFixed(2)})`; c.fillRect(p.x | 0, p.y | 0, p.s, p.s); }
      for (const p of sparks) R(p.l > 0.5 ? '#ffd23a' : '#ff7a1a', p.x, p.y, 1, 1);
      // ulica i latarnie
      R('#0b0f0c', 0, 80, W, 16); R('#1c2622', 0, 81, W, 3); R('#141b18', 0, 84, W, 12);
      for (let k = 0; k < 6; k++) R('#2b3833', k * 56 + 8, 89, 20, 2);
      [40, 230].forEach(x => { R('#0b0f0c', x, 56, 2, 25); R('#ffe9a0', x - 2, 54, 6, 3); c.fillStyle = 'rgba(255,233,160,.08)'; c.fillRect(x - 10, 57, 22, 24); });
      // student idący do gmachu
      const step = Math.floor(t * 6) % 2;
      if (sx < 156) SPR.draw(c, 'student', sx | 0, 67 - step, 1);
      if (cap) { R('#0b0f0c', cap.x | 0, cap.y | 0, 7, 2); R('#ffc21a', (cap.x | 0) + 6, (cap.y | 0) + 1, 1, 3); }
    };
    const step = dt => {
      t += dt;
      sx += dt * 14;
      if (sx > 158) { sx = -12; cap = { x: 160, y: 62, vx: 22, vy: -34 }; }
      if (cap) { cap.x += cap.vx * dt; cap.y += cap.vy * dt; cap.vy += 20 * dt; if (cap.y > 100) cap = null; }
      if (Math.random() < dt * 30) sparks.push({ x: 253, y: 68, vx: (Math.random() - 0.3) * 40, vy: -20 - Math.random() * 40, l: 1 });
      for (const p of sparks) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 60 * dt; p.l -= dt * 1.2; }
      while (sparks.length && sparks[0].l <= 0) sparks.shift();
      if (Math.random() < dt * 3) smoke.push({ x: 289 + Math.random() * 4, y: 18, s: 3 + U.ri(0, 3), a: 1 });
      for (const p of smoke) { p.x -= dt * 8; p.y -= dt * 6; p.s += dt * 2; p.a -= dt * 0.25; }
      while (smoke.length && smoke[0].a <= 0) smoke.shift();
    };
    cancelAnimationFrame(this.raf);
    if (reduce) { sx = 60; draw(); return; }
    const loop = now => {
      if (!cv.isConnected) { this.raf = 0; return; }
      step(Math.min(0.05, (now - last) / 1000));
      last = now;
      draw();
      this.raf = requestAnimationFrame(loop);
    };
    draw();
    this.raf = requestAnimationFrame(loop);
  },
};
