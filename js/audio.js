'use strict';
/* Dźwięki 8-bit generowane w WebAudio + prosty chiptune w tle. */
const AUDIO = {
  ctx: null, master: null, sfxBus: null, musicBus: null,
  sfxOn: true, musicOn: true,
  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain(); this.master.gain.value = 0.55; this.master.connect(this.ctx.destination);
      this.sfxBus = this.ctx.createGain(); this.sfxBus.gain.value = 0.9; this.sfxBus.connect(this.master);
      this.musicBus = this.ctx.createGain(); this.musicBus.gain.value = 0.32; this.musicBus.connect(this.master);
    } catch (e) { this.ctx = null; }
  },
  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  },
  tone(freq, dur, type = 'square', vol = 0.18, slide = 0, when = 0, bus) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || this.sfxBus);
    o.start(t); o.stop(t + dur + 0.02);
  },
  noise(dur, vol = 0.2, freq = 1800, when = 0, bus) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq;
    const g = this.ctx.createGain(); g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(bus || this.sfxBus);
    src.start(t);
  },
  play(name) {
    if (!this.sfxOn || !this.ctx) return;
    const T = (...a) => this.tone(...a);
    switch (name) {
      case 'flap': T(520, 0.07, 'square', 0.1, 300); break;
      case 'jump': T(300, 0.12, 'square', 0.12, 420); break;
      case 'bump': T(160, 0.08, 'triangle', 0.14, -60); break;
      case 'ok': T(660, 0.08, 'square', 0.13); T(990, 0.14, 'square', 0.13, 0, 0.07); break;
      case 'bad': T(220, 0.18, 'sawtooth', 0.14, -120); T(150, 0.25, 'square', 0.1, -60, 0.1); break;
      case 'coin': T(988, 0.06, 'square', 0.1); T(1319, 0.16, 'square', 0.1, 0, 0.05); break;
      case 'chop': this.noise(0.08, 0.25, 2600); T(180, 0.06, 'square', 0.1, -80); break;
      case 'whack': this.noise(0.06, 0.3, 1200); T(110, 0.08, 'square', 0.14, -40); break;
      case 'boom': this.noise(0.6, 0.5, 700); T(90, 0.5, 'sawtooth', 0.2, -60); break;
      case 'click': T(1200, 0.03, 'square', 0.06); break;
      case 'weld': this.noise(0.12, 0.18, 5000); T(1500, 0.08, 'square', 0.06, 400); break;
      case 'tick': T(1800, 0.02, 'square', 0.05); break;
      case 'level': [523, 659, 784, 1047].forEach((f, i) => T(f, 0.12, 'square', 0.11, 0, i * 0.09)); break;
      case 'fanfare': [523, 523, 523, 698, 880, 784, 880, 1047].forEach((f, i) => T(f, 0.16, 'square', 0.11, 0, i * 0.11)); break;
      case 'lose': [392, 370, 349, 262].forEach((f, i) => T(f, 0.24, 'triangle', 0.14, 0, i * 0.2)); break;
      case 'drop': T(700, 0.15, 'triangle', 0.1, -500); break;
      case 'splash': this.noise(0.3, 0.2, 900); break;
    }
  },
  /* ---- muzyka ---- */
  seqTimer: null, step: 0, nextTime: 0, tempo: 118,
  PATTERN: {
    chords: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], // Am F C G
    bass: [45, 41, 36, 43],
  },
  midi: n => 440 * Math.pow(2, (n - 69) / 12),
  startMusic() {
    if (!this.ctx || !this.musicOn || this.seqTimer) return;
    this.step = 0; this.nextTime = this.ctx.currentTime + 0.05;
    this.seqTimer = setInterval(() => this.schedule(), 25);
  },
  stopMusic() { if (this.seqTimer) { clearInterval(this.seqTimer); this.seqTimer = null; } },
  setTempo(speed) { this.tempo = 110 + (speed - 1) * 90; },
  schedule() {
    if (!this.ctx) return;
    const spb = 60 / this.tempo / 4; // szesnastki
    while (this.nextTime < this.ctx.currentTime + 0.12) {
      const s = this.step % 64, bar = Math.floor(s / 16), st = s % 16;
      const when = this.nextTime - this.ctx.currentTime;
      const ch = this.PATTERN.chords[bar];
      if (st % 4 === 0) this.tone(this.midi(this.PATTERN.bass[bar]), spb * 3.2, 'triangle', 0.22, 0, when, this.musicBus);
      if (st % 4 === 2) this.tone(this.midi(this.PATTERN.bass[bar] + 12), spb * 1.4, 'triangle', 0.12, 0, when, this.musicBus);
      const arp = ch[(st + bar) % 3] + 12 + (st >= 12 ? 12 : 0);
      if (st % 2 === 0) this.tone(this.midi(arp), spb * 1.6, 'square', 0.035, 0, when, this.musicBus);
      if (st % 4 === 2) this.noise(0.03, 0.05, 7000, when, this.musicBus);
      if (st === 0 || st === 8) this.noise(0.08, 0.09, 500, when, this.musicBus);
      this.nextTime += spb;
      this.step++;
    }
  },
};
