'use strict';
/* MÓWNICA – ułóż odpowiedź dla komisji z gotowych zdań, w dobrej kolejności; odrzuć zdania błędne. */
class Mownica extends MG {
  start() {
    const ch = this.ch, q = ch.q, P = this.S.panel;
    this.left = this.total = U.clamp(ch.sents.length * 15 / this.speed, 45, 110);
    this.allowed = 2; this.mist = 0; this.placed = 0; this.over = false;
    this.S.prompt({ lead: `${ch.tag} · Mównica: ułóż odpowiedź`, text: q.q, sub: 'Wybieraj zdania w kolejności, w jakiej powiesz je komisji: definicja → wyliczenie → rozwinięcie → przykład. Zdania błędne pomiń.' });
    this.room = new Room(P, { say: 'Słuchamy. Proszę zacząć od definicji.' });
    this.bar = U.el('div', { class: 'tbar' }, U.el('i'));
    this.stat = U.el('div', { class: 'mw-stat' });
    this.speech = U.el('ol', { class: 'say speech' });
    this.pool = U.el('div', { class: 'mw-pool' });
    const cards = U.shuffle([...ch.sents.map(s => ({ ...s, ok: true })), ...ch.intr.map(s => ({ ...s, ok: false }))]);
    this.cards = cards.map(c => {
      const b = U.el('button', { class: 'mw-card', type: 'button', html: U.md(c.t) });
      b.onclick = () => this.pick(c, b);
      this.pool.append(b);
      return { c, b };
    });
    P.append(U.el('div', { class: 'mw' }, this.bar, this.stat,
      U.el('div', { class: 'mini-label' }, 'TWOJA WYPOWIEDŹ'), this.speech,
      U.el('div', { class: 'mini-label' }, 'ZDANIA DO WYBORU'), this.pool));
    this.updStat();
  }
  remaining() { return this.cards.filter(x => x.c.ok && !x.c.used).map(x => x.c); }
  updStat() { this.stat.textContent = `Zdania: ${this.placed}/${this.ch.sents.length} · pomyłki: ${this.mist}/${this.allowed + 1}`; }
  pick(c, b) {
    if (this.done || this.over || this.S.intro > 0 || b.disabled) return;
    AUDIO.resume();
    if (!c.ok) {
      this.mistake(b, c.twin ? 'To zdanie ma błąd merytoryczny!' : 'To nie jest odpowiedź na to pytanie!');
      b.disabled = true; b.classList.add('gone');
      b.append(U.el('small', { class: 'why' }, c.why));
      return;
    }
    const minRank = Math.min(...this.remaining().map(s => s.rank));
    if (c.rank > minRank) {
      const need = this.remaining().find(s => s.rank === minRank);
      this.mistake(b, `Za wcześnie! Najpierw: ${CH.ROLE_NAME[need.role].toLowerCase()}.`);
      return;
    }
    c.used = true; b.disabled = true; b.classList.add('used');
    this.placed++;
    this.speech.append(U.el('li', { class: 'say-' + c.role + ' fresh' }, U.el('span', { class: 'role role-' + c.role }, CH.ROLE_NAME[c.role]), U.el('span', { class: 'say-t', html: U.md(c.t) })));
    this.room.set(0.1, U.pick(['Mhm.', 'Dobrze.', 'Tak, słuchamy dalej.', 'Konkretnie – tak trzymać.']));
    this.S.sfx('ok');
    this.updStat();
    if (!this.remaining().length) this.finish(true);
    else this.showPool();
  }
  /* pula zdań ma być widoczna: przewiń scenę, jeśli wypowiedź zepchnęła ją w dół */
  showPool() {
    const st = this.S.panel.parentElement, r = this.pool.getBoundingClientRect(), sr = st.getBoundingClientRect();
    if (r.top > sr.bottom - 140) st.scrollTo({ top: st.scrollTop + r.top - sr.top - 140, behavior: 'smooth' });
  }
  mistake(b, text) {
    this.mist++;
    b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad');
    this.room.set(-0.18, text);
    this.S.sfx('bad');
    this.updStat();
    if (this.mist > this.allowed) this.finish(false);
  }
  finish(ok, timeout) {
    if (this.over) return;
    this.over = true;
    this.S.sfx(ok ? 'coin' : 'lose');
    this.room.set(ok ? 0.2 : -0.2, ok ? 'Pełna, uporządkowana odpowiedź. Brawo!' : 'Hmm… Proszę jeszcze to przećwiczyć.');
    this.cards.forEach(({ b }) => { b.disabled = true; });
    this.pool.hidden = true;
    Room.finale(this, ok, ok ? `✓ WYPOWIEDŹ UŁOŻONA · pomyłki: ${this.mist}` : `✗ ${timeout ? 'CZAS MINĄŁ' : 'ZA DUŻO POMYŁEK'} – przeczytaj wzorcową odpowiedź`);
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
Mownica.dom = true;
Mownica.intro = { title: 'MÓWNICA!', hint: 'Ułóż odpowiedź dla komisji zdanie po zdaniu' };
MINIGAMES.builder = Mownica;
