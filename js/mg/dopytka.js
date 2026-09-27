'use strict';
/* DOPYTKA – komisja zadaje pytanie dodatkowe; wybierz odpowiedź, która Cię obroni. */
class Dopytka extends MG {
  start() {
    const ch = this.ch, q = ch.q, P = this.S.panel;
    this.left = this.total = U.clamp(32 / this.speed, 18, 40);
    this.S.prompt({ lead: `${ch.tag} · Pytanie dodatkowe`, text: ch.question, sub: `Temat: ${q.t}. Która odpowiedź obroni Cię przed komisją?` });
    this.room = new Room(P, { say: `„${ch.question}”` });
    this.bar = U.el('div', { class: 'tbar' }, U.el('i'));
    this.btns = ch.options.map((o, i) => {
      const b = U.el('button', { class: 'mw-card fu-opt', type: 'button' }, U.el('b', { class: 'fu-n' }, String(i + 1)), ' ', o);
      b.onclick = () => this.choose(i);
      return b;
    });
    P.append(U.el('div', { class: 'mw' }, this.bar, U.el('div', { class: 'fu-list' }, ...this.btns)));
  }
  key(k, down) {
    if (!down) return;
    const m = /^n(\d)$/.exec(k);
    if (m && +m[1] <= this.btns.length) this.choose(+m[1] - 1);
  }
  choose(i) {
    if (this.done || this.S.intro > 0) return;
    AUDIO.resume();
    const ok = i === this.ch.answer;
    this.btns.forEach((b, j) => { b.disabled = true; if (j === this.ch.answer) b.classList.add('right'); else if (j === i) b.classList.add('wrongc'); });
    if (ok) {
      this.room.set(0.3, U.pick(['Dokładnie tak. Dziękujemy.', 'Bardzo dobrze.', 'Wyczerpująco. Brawo.']));
      this.S.sfx('ok');
      this.end({ ok: true }, 1.3);
    } else {
      this.room.set(-0.3, 'Hmm… nie do końca.');
      this.S.sfx('bad');
      this.end({ ok: false, your: this.ch.options[i], right: this.ch.fix, fix: `Pytanie komisji: „${this.ch.question}”` }, 1.4);
    }
  }
  update(dt) {
    super.update(dt);
    this.room.update(dt);
    if (this.done) return;
    this.left -= dt;
    const f = U.clamp(this.left / this.total, 0, 1);
    this.bar.firstChild.style.width = (f * 100) + '%';
    this.bar.classList.toggle('low', f < 0.25);
    if (this.left <= 0) {
      this.room.set(-0.3, 'Cisza to też odpowiedź…');
      this.S.sfx('bad');
      this.end({ ok: false, timeout: true, right: this.ch.fix, fix: `Pytanie komisji: „${this.ch.question}”` }, 1.0);
    }
  }
}
Dopytka.dom = true;
Dopytka.intro = { title: 'DOPYTKA!', hint: 'Komisja dopytuje – wybierz odpowiedź, która Cię obroni (1–3)' };
MINIGAMES.fu = Dopytka;
