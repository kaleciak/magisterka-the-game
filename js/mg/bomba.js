'use strict';
/* McBOMBA (McPixel) – rozbrój bombę, klikając przedmiot z właściwą odpowiedzią. */
class Bomba extends MG {
  start() {
    const ch = this.ch, n = ch.options.length, W = this.W, H = this.H;
    this.lw = Math.min(148, W * 0.46);
    const lx = Math.round(W * 0.26), rx = Math.round(W * 0.74);
    let pos;
    if (H >= 420) pos = n === 4 ? [[lx, H * 0.3], [rx, H * 0.3], [lx, H * 0.8], [rx, H * 0.8]] : n === 3 ? [[lx, H * 0.3], [rx, H * 0.3], [W / 2, H * 0.84]] : [[lx, H * 0.45], [rx, H * 0.45]];
    else pos = n === 4 ? [[lx, 118], [rx, 118], [lx, 236], [rx, 236]] : n === 3 ? [[lx, 122], [rx, 122], [W / 2, 250]] : [[lx, 150], [rx, 150]];
    const sprites = U.sample(['ext', 'bucket', 'cat', 'toilet', 'duck', 'wrench'], n);
    this.objs = ch.options.map((label, i) => ({ x: pos[i][0], y: pos[i][1], spr: sprites[i], label, bob: Math.random() * 6 }));
    this.bomb = H >= 420 ? { x: W / 2, y: H * (n === 3 ? 0.56 : 0.55) } : n === 3 ? { x: W / 2, y: 150 } : { x: W / 2, y: 176 };
    this.floorY = H >= 420 ? Math.round(H * 0.62) : 200;
    this.fuse = U.clamp(14 / this.speed, 8, 16); this.left = this.fuse;
    this.state = 'arm';
    this.S.prompt({ lead: `${ch.tag} · ${ch.lead}`, text: ch.prompt });
    this.S.controls(ch.options.map((o, i) => ({ label: String(i + 1), key: 'n' + (i + 1), cls: 'num' })));
  }
  key(k, down) {
    if (!down || this.done) return;
    const m = /^n(\d)$/.exec(k);
    if (m && +m[1] <= this.objs.length) this.choose(+m[1] - 1);
  }
  pointer(type, x, y) {
    if (type !== 'down' || this.done) return;
    const i = this.objs.findIndex(o => x > o.x - this.lw / 2 - 2 && x < o.x + this.lw / 2 + 2 && y > o.y - 40 && y < o.y + 46);
    if (i >= 0) this.choose(i);
  }
  choose(i) {
    const o = this.objs[i];
    if (i === this.ch.answer) {
      this.state = 'safe';
      this.S.sfx('ok'); setTimeout(() => this.S.sfx('coin'), 120);
      this.S.burst(this.bomb.x, this.bomb.y, [PAL.g, PAL.y, PAL.p, PAL.b, PAL.w], 34, 160);
      this.S.float('ROZBROJONE!', this.W / 2, this.bomb.y - 100, PAL.g, 18);
      this.S.float(U.pick(Bomba.WIN), this.W / 2, this.bomb.y - 78, PAL.w, 11);
      this.end({ ok: true }, 0.9);
    } else {
      this.boom(o.label);
    }
  }
  boom(label) {
    this.state = 'boom';
    this.S.sfx('boom'); this.S.shake(10, 0.5); this.S.flash('#fff3b0', 0.3);
    this.S.burst(this.bomb.x, this.bomb.y, [PAL.o, PAL.y, PAL.r, PAL.k, PAL.w], 60, 220);
    this.S.float('BUM!', this.W / 2, this.bomb.y - 90, PAL.o, 26);
    this.S.float(label ? U.pick(Bomba.LOSE).replace('X', label.length > 22 ? label.slice(0, 20) + '…' : label) : 'Czas minął…', this.W / 2, this.bomb.y - 58, PAL.w, 10);
    this.end({ ok: false, timeout: !label, your: label || null, right: this.ch.options[this.ch.answer], fix: this.ch.fix }, 1.3);
  }
  update(dt) {
    super.update(dt);
    if (this.state === 'arm' && !this.done) {
      const before = Math.ceil(this.left);
      this.left -= dt;
      if (Math.ceil(this.left) !== before && this.left < 4) this.S.sfx('tick');
      if (this.left <= 0) this.boom(null);
    }
  }
  draw(c) {
    // pokój
    const W = this.W, H = this.H, fl = this.floorY;
    c.fillStyle = '#3b2f4a'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#433556';
    for (let x = 0; x < W; x += 24) c.fillRect(x, 0, 12, fl);
    c.fillStyle = '#5a4a32'; c.fillRect(0, fl, W, H - fl);
    c.fillStyle = '#4c3e2a';
    for (let y = fl + 6; y < H; y += 14) for (let x = (y % 28 ? 0 : 20); x < W; x += 40) c.fillRect(x, y, 30, 2);
    c.fillStyle = PAL.k; c.fillRect(0, fl - 4, W, 6);
    // lont
    const b = this.bomb, frac = U.clamp(this.left / this.fuse, 0, 1);
    const pts = [];
    const up = Math.min(90, b.y - 40);
    for (let i = 0; i <= 24; i++) { const t = i / 24; pts.push([b.x + 12 + Math.sin(t * 9) * 14 * (1 - t) + t * 30, b.y - 26 - t * up]); }
    const visible = Math.max(1, Math.round(frac * 24));
    c.fillStyle = '#c9b48a';
    for (let i = 0; i < visible; i++) c.fillRect(pts[i][0] - 1, pts[i][1] - 1, 3, 3);
    if (this.state === 'arm') {
      const [sx, sy] = pts[visible - 1];
      c.fillStyle = (Math.sin(this.t * 30) > 0) ? PAL.y : PAL.o; c.fillRect(sx - 3, sy - 3, 7, 7);
      c.fillStyle = PAL.w; c.fillRect(sx - 1, sy - 1, 3, 3);
    }
    // bomba
    if (this.state !== 'boom') {
      const wob = this.state === 'arm' && this.left < 3 ? Math.sin(this.t * 40) * 2 : 0;
      SPR.drawC(c, 'bomb', b.x + wob, b.y + 26, 4);
      if (this.state === 'arm') TXT.line(c, String(Math.ceil(this.left)), b.x + wob, b.y + 2, { size: 16, align: 'center', base: 'middle', color: this.left < 4 ? PAL.r : PAL.y, weight: 700 });
      else TXT.line(c, '✓', b.x, b.y + 2, { size: 18, align: 'center', base: 'middle', color: PAL.g, weight: 700 });
    } else {
      c.fillStyle = '#1a1410'; c.fillRect(b.x - 30, b.y + 18, 60, 10);
    }
    // przedmioty
    this.objs.forEach((o, i) => {
      const bob = Math.sin(this.t * 3 + o.bob) * 2;
      SPR.drawC(c, o.spr, o.x, o.y + bob, 3);
      let fill = PAL.w;
      if (this.done) { if (i === this.ch.answer) fill = '#9be23a'; }
      const lw = this.lw, lh = this.H >= 420 ? 46 : 36;
      pxbox(c, o.x - lw / 2, o.y + 4, lw, lh, fill);
      pxbox(c, o.x - lw / 2 - 6, o.y - 6, 16, 16, PAL.k, PAL.y);
      TXT.box(c, String(i + 1), o.x - lw / 2 + 2, o.y + 2, 12, 12, { sizes: [10], color: PAL.y });
      TXT.box(c, o.label, o.x + 2, o.y + 4 + lh / 2, lw - 12, lh - 6, { sizes: [13, 12, 11, 10, 9, 8, 7] });
    });
    this.S.timerBar(c, frac);
  }
}
Bomba.WIN = ['Kot jest z ciebie dumny.', 'Promotor ociera łzę.', 'Komisja kiwa głową.', 'Dziekan zapisuje nazwisko.', 'Bomba idzie spać.', 'Hala ocalona!'];
Bomba.LOSE = ['„X” nie pomogło…', 'Wsadziłeś „X” do bomby. Serio?', '„X”? Komisja zakrywa oczy.', 'Kaczka była mądrzejsza niż „X”.'];
Bomba.intro = { title: 'ROZBRÓJ!', hint: 'Tapnij przedmiot z dobrą odpowiedzią (albo 1–4), zanim lont się dopali' };
MINIGAMES.bomb = Bomba;
