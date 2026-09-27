'use strict';
/* ZNIKAJĄCY TEKST – uzupełnij luki w wzorcowej odpowiedzi ustnej kolejnymi pojęciami. */
class Luki extends MG {
  start() {
    const ch = this.ch, q = ch.q, P = this.S.panel;
    this.n = ch.blanks.length;
    this.cur = 0; this.mist = 0; this.over = false;
    this.allowed = Math.max(1, Math.floor(this.n / 4));
    this.left = this.total = U.clamp((15 + this.n * 9) / this.speed, 30, 110);
    this.S.prompt({ lead: `${ch.tag} · Znikający tekst`, text: q.q, sub: 'Uzupełnij luki po kolei – tak brzmi odpowiedź, którą powiesz komisji.' });
    this.room = new Room(P, { say: 'Proszę mówić pełnymi zdaniami.' });
    this.bar = U.el('div', { class: 'tbar' }, U.el('i'));
    this.stat = U.el('div', { class: 'mw-stat' });
    this.blankEls = [];
    const text = U.el('ol', { class: 'say luki-text' });
    ch.parts.forEach((ps, si) => {
      const t = U.el('span', { class: 'say-t' });
      for (const p of ps) {
        if (p.k === 'b' && p.blank != null) {
          const bl = U.el('span', { class: 'blank', style: { minWidth: Math.min(16, Math.max(4, p.t.length * 0.55)) + 'em' } }, ' ');
          this.blankEls[p.blank] = bl;
          t.append(bl);
        } else if (p.k === 'b') t.append(U.el('b', {}, p.t));
        else t.append(p.t);
      }
      text.append(U.el('li', { class: 'say-' + ch.roles[si] }, U.el('span', { class: 'role role-' + ch.roles[si] }, CH.ROLE_NAME[ch.roles[si]]), t));
    });
    this.bank = U.el('div', { class: 'chips bank' });
    this.chips = ch.bank.map(c => {
      const b = U.el('button', { class: 'chip', type: 'button' }, c.t);
      b.onclick = () => this.pick(c, b);
      this.bank.append(b);
      return b;
    });
    P.append(U.el('div', { class: 'mw' }, this.bar, this.stat, text, U.el('div', { class: 'mini-label' }, 'BANK POJĘĆ – wybierz pojęcie do podświetlonej luki'), this.bank));
    this.mark();
  }
  mark() {
    this.blankEls.forEach((b, i) => b.classList.toggle('cur', i === this.cur && !this.over));
    this.stat.textContent = `Luki: ${this.cur}/${this.n} · pomyłki: ${this.mist}/${this.allowed + 1}`;
    const el = this.blankEls[this.cur];
    if (el && this.cur > 0) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  pick(c, b) {
    if (this.done || this.over || this.S.intro > 0 || b.disabled) return;
    AUDIO.resume();
    const want = this.ch.blanks[this.cur];
    if (U.key(c.t) === U.key(want)) {
      const bl = this.blankEls[this.cur];
      bl.textContent = want; bl.classList.add('filled');
      b.disabled = true; b.classList.add('hit');
      this.cur++;
      this.S.sfx('coin');
      this.room.set(0.06);
      if (this.cur >= this.n) return this.finish(true);
      this.mark();
    } else {
      this.mist++;
      b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake', 'wrong');
      setTimeout(() => b.classList.remove('wrong'), 500);
      this.room.set(-0.15, c.ok ? 'To pojęcie pasuje, ale w innym miejscu.' : 'To nie pasuje do tej odpowiedzi.');
      this.S.sfx('bad');
      this.mark();
      if (this.mist > this.allowed) this.finish(false);
    }
  }
  finish(ok, timeout) {
    if (this.over) return;
    this.over = true;
    this.blankEls.forEach((bl, i) => { if (!bl.classList.contains('filled')) { bl.textContent = this.ch.blanks[i]; bl.classList.add('missed'); } bl.classList.remove('cur'); });
    this.chips.forEach(b => { b.disabled = true; });
    this.bank.hidden = true;
    this.S.sfx(ok ? 'ok' : 'lose');
    this.room.set(ok ? 0.2 : -0.2, ok ? 'Płynnie i merytorycznie. Tak trzymać!' : 'Brakuje kluczowych pojęć…');
    Room.finale(this, ok, ok ? `✓ ODPOWIEDŹ KOMPLETNA · pomyłki: ${this.mist}` : `✗ ${timeout ? 'CZAS MINĄŁ' : 'ZA DUŻO POMYŁEK'} – na żółto brakujące pojęcia`);
  }
  key(k, down) { if (down && k === 'enter' && this.finaleBtn) this.finaleBtn.click(); }
  update(dt) {
    super.update(dt);
    this.room.update(dt);
    if (this.over || this.done) return;
    this.left -= dt;
    const f = U.clamp(this.left / this.total, 0, 1);
    this.bar.firstChild.style.width = (f * 100) + '%';
    this.bar.classList.toggle('low', f < 0.25);
    if (this.left <= 0) this.finish(false, true);
  }
}
Luki.dom = true;
Luki.intro = { title: 'LUKI!', hint: 'Uzupełnij wzorcową odpowiedź brakującymi pojęciami' };
MINIGAMES.luki = Luki;
