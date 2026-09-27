'use strict';
/* Pikselowe sprite'y (tekstowe mapy), rysowanie na canvasie i tekst. */
const PAL = {
  k: '#0b0f0c', w: '#f2ecd9', s: '#f0b48a', S: '#c98260', g: '#2bd46b', G: '#138a45',
  r: '#e0303c', R: '#8e1a26', y: '#ffd23a', o: '#ff7a1a', b: '#29adff', B: '#1b4f8a',
  n: '#8a5a32', N: '#4a2c18', l: '#b8c4bc', m: '#6b7d72', d: '#33413a', p: '#ff77a8',
  c: '#6fe3ff', h: '#3a2a1e',
};

const SPRITES = {
  student: [
    '..kkkkkk..', 'kkkkkkkkkk', '..kkkkkky.', '..hhhhhhy.', '..hsssshy.', '..skssks..', '..ssssss..',
    '...sRRs...', '..gggggg..', '.sgGwwGgs.', '.sggwwggs.', '..gggggg..', '..BB..BB..', '..kk..kk..',
  ],
  bird: [
    '...kkkkkk...', '.kkkkkkkkkk.', '...kyyyyk.y.', '..yyyyyyyyy.', '.yyyywkyyyy.', 'yyyyywwyyooo',
    'ywwwyyyyyoo.', 'yywwwyyyyy..', '.yyyyyyyyy..', '...nn..nn...',
  ],
  prof: [
    '...llllll...', '..llllllll..', '..lssssssl..', '..skkssskk..', '..ssssssss..', '...ssSSss...',
    '...slllls...', '....llll....', '..BBBwwBBB..', '.BBBBwrBBBB.', '.BBBBwrBBBB.', '.BBBBBBBBBB.',
  ],
  profH: [
    '...llllll...', '..llllllll..', '..lssssssl..', '..skkssskk..', '..ssssssss..', '...ssSSss...',
    '..RsllllsR..', '...sRRRRs...', '..BBBwwBBB..', '.BBBBwrBBBB.', '.BBBBwrBBBB.', '.BBBBBBBBBB.',
  ],
  profA: [
    '...llllll...', '..llllllll..', '..lkksskkl..', '..sskssks...', '..ssssssss..', '...ssSSss...',
    '...slllls...', '....kkkk....', '..BBBwwBBB..', '.BBBBwrBBBB.', '.BBBBwrBBBB.', '.BBBBBBBBBB.',
  ],
  profB: [
    '...llllll...', '..llllllll..', '..lssssssl..', '..sllssslls.', '..ssssssss..', '...ssSSss...',
    '...slllls...', '....llll....', '..BBBwwBBB..', '.BBBBwrBBBB.', '.BBBBwrBBBB.', '.BBBBBBBBBB.',
  ],
  mole: [
    '....yyyy....', '..yyyyyyyy..', '.yyyyyyyyyy.', 'yyyyyyyyyyyy', '.nnnnnnnnnn.', '.nkwnnnnwkn.',
    '.nnnnppnnnn.', '.nnnwwwwnnn.', '.nnnnnnnnnn.', 'nnnnnnnnnnnn', 'nnnnnnnnnnnn',
  ],
  bomb: [
    '........yo..', '.......o....', '......n.....', '.....kkk....', '...kkkkkkk..', '..kkkkkkkkk.',
    '.kkwwkkkkkkk', '.kwwkkkkkkkk', '.kkkkkkkkkkk', '.kkkkkkkkkkk', '..kkkkkkkkk.', '...kkkkkkk..',
  ],
  heart: ['.rr.rr.', 'rwrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...'],
  heartE: ['.mm.mm.', 'mddmddm', 'mdddddm', '.mdddm.', '..mdm..', '...m...'],
  star: ['...y...', '..yyy..', 'yyyyyyy', '.yyyyy.', '..yyy..', '.yy.yy.', 'yy...yy'],
  starE: ['...m...', '..mdm..', 'mmdddmm', '.mdddm.', '..mdm..', '.mm.mm.', 'mm...mm'],
  ext: [
    '...kkk....', '...kmk.kk.', '...rrrk...', '..rrrrr...', '..rwwwr...', '..rrrrr...', '..rrrrr...',
    '..rwwwr...', '..rrrrr...', '..rrrrr...', '..RRRRR...', '..kkkkk...',
  ],
  bucket: [
    '..........', '..mmmmmm..', '.m......m.', '.m......m.', 'kbbbbbbbbk', 'kbllbbbbbk', '.kbbbbbbk.',
    '.kbbbbbbk.', '.kbbbbbbk.', '..kbbbbk..', '..kBBBBk..', '...kkkk...',
  ],
  cat: [
    'o.......o.', 'oo.....oo.', 'ooooooooo.', 'okgoookgo.', 'ooooppooo.', 'oowoooowo.', '.ooooooo..',
    '..ooooo...', '.ooooooo..', '.ooooooo.o', '.ooooooooo', '.oo.o.oo..',
  ],
  toilet: [
    'wwwww.....', 'wlllw.....', 'wwwww.....', '.www......', 'wwwwwwwww.', 'wlllllllw.', 'wwwwwwwww.',
    '.wwwwwww..', '..wwwww...', '..wwwww...', '.wwwwwww..', '.mmmmmmm..',
  ],
  duck: [
    '...yyy....', '..yyyyy...', '..ykyyyoo.', '..yyyyyoo.', '...yyyy...', '.yyyyyyyy.', 'yyyyyyyyyy',
    'yywwyyyyyy', 'yyyyyyyyyy', '.yyyyyyyy.', '..........', '..........',
  ],
  wrench: [
    '.m...m....', '.mm.mm....', '..mmm.....', '...m......', '...mm.....', '....m.....', '....mm....',
    '.....m....', '.....mm...', '......mm..', '.......mm.', '........m.',
  ],
  ingot: [
    '............', '...oyyyo....', '..oyyyyyo...', '..ooyyyoo...', '...ooooo....', '....mmm.....',
    '...mmmmm....', '..mmmmmmm...', '.mmmmmmmmm..', 'mmmmmmmmmmm.', 'llllllllllll', '............',
  ],
  brain: [
    '............', '...pppppp...', '..ppwppppp..', '.ppppppwppp.', '.pwpppppppp.', '.ppppwppppp.',
    '.pppppppwpp.', '..pppppppp..', '...pppppp...', '.....pp.....', '.....pp.....', '............',
  ],
  crate: [
    'nnnnnnnnnnnn', 'nNNNNNNNNNNn', 'nNnnnnnnnnNn', 'nNnNnnnnNnNn', 'nNnnNnnNnnNn', 'nNnnnNNnnnNn',
    'nNnnnNNnnnNn', 'nNnnNnnNnnNn', 'nNnNnnnnNnNn', 'nNnnnnnnnnNn', 'nNNNNNNNNNNn', 'nnnnnnnnnnnn',
  ],
  mega: [
    '............', '........b...', '......bbb...', '....bbbbb...', 'kkbbbbbbb.w.', 'kkbbbbbbb..w',
    'kkbbbbbbb.w.', '....bbbbb...', '...k..bbb...', '..k.....b...', '............', '............',
  ],
  torii: [
    'rrrrrrrrrrrr', '.rrrrrrrrrr.', '..r......r..', 'rrrrrrrrrrrr', '..r......r..', '..r......r..',
    '..r......r..', '..r......r..', '..r......r..', '..r......r..', '.kkk....kkk.', '............',
  ],
  robot: [
    '.....y......', '.....m......', '..cccccccc..', '..ckkcckkc..', '..cwkcckwc..', '..cccccccc..',
    '..crrrrrrc..', '..cccccccc..', 'mmmcccccccmm', 'm.cccccccc.m', '..cc....cc..', '..mm....mm..',
  ],
  lens: [
    '...kkkk.....', '..kcccck....', '.kcwcccck...', '.kcwcccck...', '.kcccccck...', '.kcccccck...',
    '..kcccck....', '...kkkkm....', '.......mm...', '........mm..', '.........mm.', '..........m.',
  ],
  pyramid: [
    '............', '.....yy.....', '....yyyy....', '....oooo....', '...oooooo...', '...yyyyyy...',
    '..yyyyyyyy..', '..oooooooo..', '.oooooooooo.', '.yyyyyyyyyy.', 'yyyyyyyyyyyy', '............',
  ],
};

const SPR = {
  cache: new Map(),
  get(name, swap) {
    const key = name + (swap ? JSON.stringify(swap) : '');
    if (this.cache.has(key)) return this.cache.get(key);
    const rows = SPRITES[name];
    const h = rows.length, w = Math.max(...rows.map(r => r.length));
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const x = c.getContext('2d');
    rows.forEach((row, j) => {
      for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch === '.') continue;
        const col = (swap && swap[ch]) || PAL[ch];
        if (!col) continue;
        x.fillStyle = col;
        x.fillRect(i, j, 1, 1);
      }
    });
    this.cache.set(key, c);
    return c;
  },
  url(name, scale = 4, swap) {
    const key = 'url:' + name + scale + (swap ? JSON.stringify(swap) : '');
    if (this.cache.has(key)) return this.cache.get(key);
    const s = this.get(name, swap);
    const c = document.createElement('canvas');
    c.width = s.width * scale; c.height = s.height * scale;
    const x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    x.drawImage(s, 0, 0, c.width, c.height);
    const u = c.toDataURL();
    this.cache.set(key, u);
    return u;
  },
  img(name, scale = 4, cls = '', swap) {
    return U.el('img', { src: this.url(name, scale, swap), class: 'px-img ' + cls, alt: '', draggable: 'false' });
  },
  /* rysowanie: x,y = lewy górny róg */
  draw(ctx, name, x, y, scale = 2, o = {}) {
    const s = this.get(name, o.swap);
    const w = s.width * scale, h = s.height * scale;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (o.alpha != null) ctx.globalAlpha = o.alpha;
    if (o.rot || o.flip) {
      ctx.translate(x + w / 2, y + h / 2);
      if (o.rot) ctx.rotate(o.rot);
      if (o.flip) ctx.scale(-1, 1);
      ctx.drawImage(s, -w / 2, -h / 2, w, h);
    } else ctx.drawImage(s, x, y, w, h);
    ctx.restore();
    return { w, h };
  },
  /* cx = środek poziomo, by = dół */
  drawC(ctx, name, cx, by, scale = 2, o = {}) {
    const s = this.get(name, o.swap);
    return this.draw(ctx, name, cx - s.width * scale / 2, by - s.height * scale, scale, o);
  },
  size(name, scale = 2) { const s = this.get(name); return { w: s.width * scale, h: s.height * scale }; },
};

/* Tekst na canvasie (współrzędne logiczne) */
const FONT = {
  body: '"Pixelify Sans", "Trebuchet MS", ui-monospace, monospace',
  display: '"Press Start 2P", ui-monospace, monospace',
  mono: '"VT323", ui-monospace, monospace',
};
const TXT = {
  font: (size, weight = 500, fam = 'body') => `${weight} ${size}px ${FONT[fam] || FONT.body}`,
  wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; }
      else cur = t;
    }
    if (cur) lines.push(cur);
    return lines;
  },
  /* Rysuje tekst dopasowany do prostokąta (auto-rozmiar). cx, cy – środek */
  box(ctx, text, cx, cy, w, h, o = {}) {
    const sizes = o.sizes || [12, 11, 10, 9, 8, 7];
    let chosen = null;
    for (const size of sizes) {
      ctx.font = TXT.font(size, o.weight || 600, o.fam);
      const lines = TXT.wrap(ctx, text, w);
      const lh = size * 1.12;
      if (lines.length * lh <= h && lines.every(l => ctx.measureText(l).width <= w + 1)) { chosen = { size, lines, lh }; break; }
    }
    if (!chosen) {
      const size = sizes[sizes.length - 1];
      ctx.font = TXT.font(size, o.weight || 600, o.fam);
      const lh = size * 1.1;
      const maxLines = Math.max(1, Math.floor(h / lh));
      let lines = TXT.wrap(ctx, text, w);
      if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] += '…'; }
      chosen = { size, lines, lh };
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const total = chosen.lines.length * chosen.lh;
    let y = cy - total / 2 + chosen.lh / 2;
    for (const L of chosen.lines) {
      if (o.shadow) { ctx.fillStyle = o.shadow; ctx.fillText(L, cx + 1, y + 1); }
      ctx.fillStyle = o.color || PAL.k;
      ctx.fillText(L, cx, y);
      y += chosen.lh;
    }
  },
  line(ctx, text, x, y, o = {}) {
    ctx.font = TXT.font(o.size || 10, o.weight || 600, o.fam);
    ctx.textAlign = o.align || 'left';
    ctx.textBaseline = o.base || 'top';
    if (o.shadow) { ctx.fillStyle = o.shadow; ctx.fillText(text, x + (o.sd || 1), y + (o.sd || 1)); }
    ctx.fillStyle = o.color || PAL.w;
    ctx.fillText(text, x, y);
  },
};

/* Pikselowa ramka z fazowanymi rogami i cieniowaniem */
function pxbox(ctx, x, y, w, h, fill, edge = PAL.k) {
  x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
  ctx.fillStyle = edge;
  ctx.fillRect(x + 2, y, w - 4, h);
  ctx.fillRect(x, y + 2, w, h - 4);
  ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
  ctx.fillStyle = fill;
  ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
  ctx.fillStyle = 'rgba(255,255,255,.22)';
  ctx.fillRect(x + 2, y + 2, w - 4, 2);
  ctx.fillStyle = 'rgba(0,0,0,.22)';
  ctx.fillRect(x + 2, y + h - 4, w - 4, 2);
}
