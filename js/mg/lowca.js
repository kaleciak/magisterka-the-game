'use strict';
/* ŁOWCA BŁĘDÓW – komisja słucha odpowiedzi kolegi; wskaż błędne sformułowania. */
class Lowca extends MG {
  start() {
    const ch = this.ch, q = ch.q, P = this.S.panel;
    this.found = 0; this.wrong = 0; this.over = false;
    this.allowed = ch.n >= 3 ? 2 : 1;
    this.left = this.total = U.clamp((40 + ch.n * 12) / this.speed, 35, 90);
    const word = ch.n === 1 ? 'błąd merytoryczny' : `${ch.n} ${U.pl(ch.n, 'błąd', 'błędy', 'błędów')} merytoryczne`;
    this.S.prompt({ lead: `${ch.tag} · Łowca błędów`, text: q.q, sub: `Kolega odpowiada przed komisją. W jego odpowiedzi jest ${word}. Tapnij błędne sformułowania.` });
    this.room = new Room(P, { say: 'Proszę posłuchać kolegi i wskazać błędy.', mood: 0.45 });
    this.bar = U.el('div', { class: 'tbar' }, U.el('i'));
    this.stat = U.el('div', { class: 'mw-stat' });
    this.toks = [];
    const text = U.el('ol', { class: 'say hunt-text' });
    ch.segs.forEach((segs, si) => {
      const t = U.el('span', { class: 'say-t' });
      for (const s of segs) {
        if (s.k === 'txt') { t.append(s.t); continue; }
        const b = U.el('button', { class: 'tok', type: 'button' }, s.t);
        b.onclick = () => this.tap(s, b);
        this.toks.push({ s, b });
        t.append(b);
      }
      text.append(U.el('li', { class: 'say-' + ch.roles[si] }, U.el('span', { class: 'role role-' + ch.roles[si] }, CH.ROLE_NAME[ch.roles[si]]), t));
    });
    P.append(U.el('div', { class: 'mw' }, this.bar, this.stat, text));
    this.updStat();
  }
  updStat() { this.stat.textContent = `Znalezione błędy: ${this.found}/${this.ch.n} · chybione: ${this.wrong}/${this.allowed + 1}`; }
  tap(s, b) {
    if (this.done || this.over || this.S.intro > 0 || b.disabled) return;
    AUDIO.resume();
    b.disabled = true;
    if (s.err) {
      this.found++;
      b.classList.add('caught');
      b.innerHTML = '';
      b.append(U.el('s', {}, s.t), ' ', U.el('b', {}, s.fix));
      this.S.sfx('coin');
      this.room.set(0.15, 'Dokładnie! To był błąd.');
      this.updStat();
      if (this.found >= this.ch.n) this.finish(true);
    } else {
      this.wrong++;
      b.classList.add('fine');
      this.S.sfx('bad');
      this.room.set(-0.15, 'Nie, to akurat było poprawne.');
      this.updStat();
      if (this.wrong > this.allowed) this.finish(false);
    }
  }
  finish(ok, timeout) {
    if (this.over) return;
    this.over = true;
    for (const { s, b } of this.toks) {
      b.disabled = true;
      if (s.err && !b.classList.contains('caught')) { b.classList.add('missed'); b.innerHTML = ''; b.append(U.el('s', {}, s.t), ' ', U.el('b', {}, s.fix)); }
    }
    this.S.sfx(ok ? 'ok' : 'lose');
    this.room.set(ok ? 0.2 : -0.2, ok ? 'Świetne oko. Pan/Pani to wie.' : 'Błędy przeszły niezauważone…');
    Room.finale(this, ok, ok ? '✓ WSZYSTKIE BŁĘDY ZNALEZIONE' : `✗ ${timeout ? 'CZAS MINĄŁ' : 'ZA DUŻO CHYBIEŃ'} – przekreślone są błędy, obok poprawna wersja`);
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
Lowca.dom = true;
Lowca.intro = { title: 'ŁOWCA BŁĘDÓW!', hint: 'Tapnij błędne sformułowania w odpowiedzi kolegi' };
MINIGAMES.hunt = Lowca;
