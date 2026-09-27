'use strict';
/* Drobne narzędzia wspólne dla całej gry. */
const U = {
  rnd: (a, b) => a + Math.random() * (b - a),
  ri: (a, b) => Math.floor(a + Math.random() * (b - a + 1)),
  pick: arr => arr[Math.floor(Math.random() * arr.length)],
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  sample: (arr, n) => U.shuffle(arr).slice(0, n),
  clamp: (v, a, b) => Math.max(a, Math.min(b, v)),
  lerp: (a, b, t) => a + (b - a) * t,
  uniq(arr) {
    const seen = new Set();
    return arr.filter(x => { const k = U.key(x); if (seen.has(k)) return false; seen.add(k); return true; });
  },
  key: s => String(s).replace(/\*\*/g, '').toLowerCase().replace(/\s+/g, ' ').trim(),
  esc: s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])),
  /* **pogrubienie** → <b>, reszta escapowana */
  md: s => U.esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'),
  plain: s => String(s).replace(/\*\*/g, ''),
  cap: s => { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); },
  norm: s => U.plain(s).toLowerCase().replace(/[()„”"'.,;:!?–—\-/]/g, ' ').replace(/\s+/g, ' ').trim(),
  /* Czy pojęcie występuje w tekście (ochrona przed niejednoznacznymi dystraktorami) */
  mentions(text, term) {
    const t = U.norm(term);
    if (t.length < 3) return false;
    return U.norm(text).includes(t);
  },
  el(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') { for (const sk in v) { if (sk.startsWith('--')) e.style.setProperty(sk, v[sk]); else e.style[sk] = v[sk]; } }
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  },
  $: sel => document.querySelector(sel),
  fmt: n => Math.round(n).toLocaleString('pl-PL'),
  pl(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (n === 1) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  },
  /* Render tablicy akapitów (minimum / rozszerzenie) do HTML */
  richText(lines) {
    return lines.map(l => {
      if (l.startsWith('## ')) return `<h4>${U.md(l.slice(3))}</h4>`;
      if (l.startsWith('◦ ')) return `<p class="li li2">${U.md(l.slice(2))}</p>`;
      if (l.startsWith('• ')) return `<p class="li">${U.md(l.slice(2))}</p>`;
      if (/^\d+\. /.test(l)) return `<p class="li num">${U.md(l)}</p>`;
      return `<p>${U.md(l)}</p>`;
    }).join('');
  },
};
