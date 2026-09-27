'use strict';
/* KOMISJA – zaznacz hasła, które należą do minimum odpowiedzi; potem pełne minimum. */
class Komisja extends MG {
  start() {
    const ch = this.ch, q = ch.q, P = this.S.panel;
    this.total = U.clamp(50 / this.speed, 28, 60);
    this.left = this.total;
    this.submitted = false;
    this.S.prompt({ lead: `${ch.tag} · Pytanie egzaminacyjne`, text: q.q });
    const quips = ['No to słucham…', 'Proszę wymienić najważniejsze elementy.', 'Konkretnie, panie magistrze.', 'Mamy czas. Chociaż nie za dużo.', 'Proszę się nie denerwować.'];
    this.room = new Room(P, { say: U.pick(quips) });
    this.bar = U.el('div', { class: 'tbar' }, U.el('i'));
    this.chipsEl = U.el('div', { class: 'chips' });
    this.chips = ch.chips.map(c => {
      const b = U.el('button', { class: 'chip', type: 'button', 'aria-pressed': 'false' }, c.t);
      b.onclick = () => { if (this.submitted || this.S.intro > 0) return; AUDIO.resume(); const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', on); this.S.sfx('click'); };
      this.chipsEl.append(b);
      return { el: b, ...c };
    });
    this.btn = U.el('button', { class: 'btn primary', type: 'button' }, 'ODPOWIADAM ▶');
    this.btn.onclick = () => this.submitted ? this.next() : this.submit(false);
    this.reveal = U.el('div', { class: 'kom-reveal', hidden: true });
    const boss = ch.boss ? U.el('div', { class: 'boss' }, U.el('span', {}, `Komisja: ${ch.boss.hp}/${ch.boss.max}`), U.el('div', { class: 'hp' }, U.el('i', { style: { width: (ch.boss.hp / ch.boss.max * 100) + '%' } }))) : null;
    P.append(U.el('div', { class: 'kom' }, boss, this.bar,
      U.el('p', { class: 'kom-ins' }, 'Zaznacz hasła, które należą do minimum odpowiedzi na to pytanie:'),
      this.chipsEl, U.el('div', { class: 'kom-actions' }, this.btn), this.reveal));
  }
  key(k, down) {
    if (!down) return;
    if (k === 'enter') this.submitted ? this.next() : this.submit(false);
  }
  submit(timeout) {
    if (this.submitted) return;
    this.submitted = true;
    const good = this.chips.filter(c => c.ok);
    const picked = this.chips.filter(c => c.el.classList.contains('on'));
    const hit = good.filter(c => c.el.classList.contains('on')).length;
    const missed = good.length - hit;
    const wrong = picked.filter(c => !c.ok).length;
    const allowMiss = good.length >= 5 ? 1 : 0;
    this.ok = hit > 0 && missed <= allowMiss && wrong <= 1;
    for (const c of this.chips) {
      const on = c.el.classList.contains('on');
      c.el.classList.add(c.ok && on ? 'hit' : c.ok ? 'miss' : on ? 'wrong' : 'off');
      c.el.disabled = true;
    }
    const q = this.ch.q;
    this.room.set(this.ok ? 0.3 : -0.3, this.ok ? U.pick(['Bardzo dobrze. Następne pytanie.', 'Widać, że Pan/Pani się przygotował(a).', 'Komisja kiwa głową.']) : U.pick(['Hmm… a gdzie reszta?', 'Komisja marszczy brwi.', 'To nie do końca to…']));
    this.S.sfx(this.ok ? 'ok' : 'bad');
    this.reveal.hidden = false;
    this.reveal.innerHTML = '';
    this.reveal.append(
      U.el('div', { class: 'verdict ' + (this.ok ? 'good' : 'bad') }, (this.ok ? '✓ ZALICZONE' : '✗ NIEZALICZONE') + (timeout ? ' (czas minął)' : '') + ` · trafione ${hit}/${good.length}, błędne ${wrong}`),
      U.el('div', { class: 'legend' }, U.el('span', { class: 'chip hit sm' }, 'trafione'), U.el('span', { class: 'chip miss sm' }, 'pominięte'), U.el('span', { class: 'chip wrong sm' }, 'błędne')),
      U.el('div', { class: 'mini-label' }, 'TAK TO POWIEDZ KOMISJI'),
      Room.answer(q),
      U.el('div', { class: 'hook' }, U.el('b', {}, 'HACZYK: '), q.m),
      U.el('details', { class: 'ext' }, U.el('summary', {}, 'Minimum egzaminacyjne'), U.el('div', { class: 'rich', html: U.richText(q.a) })));
    this.btn.textContent = 'DALEJ ▶';
    this.reveal.append(U.el('div', { class: 'kom-actions' }, this.btn));
    this.btn.focus({ preventScroll: true });
    this.reveal.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  next() { if (!this.done) this.end({ ok: this.ok, skipCorrection: true }, 0.05); }
  update(dt) {
    super.update(dt);
    this.room.update(dt);
    if (this.submitted || this.done) return;
    this.left -= dt;
    const f = U.clamp(this.left / this.total, 0, 1);
    this.bar.firstChild.style.width = (f * 100) + '%';
    this.bar.classList.toggle('low', f < 0.25);
    if (this.left <= 0) this.submit(true);
  }
}
Komisja.dom = true;
Komisja.intro = { title: 'KOMISJA PYTA!', hint: 'Zaznacz hasła z minimum odpowiedzi i kliknij ODPOWIADAM' };
MINIGAMES.keys = Komisja;
