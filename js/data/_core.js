'use strict';
/* Rejestr treści: 8 światów, 40 pytań.
   Źródło główne: „Zagadnienia – egzamin magisterski” (plik 2).
   Styl minimum i część wiedzy: „40 zagadnień – wersja minimalistyczna” (plik 1).
   Format pytania:
     t  – krótki tytuł, q – treść pytania, a – MINIMUM (tablica akapitów, **pogrubienia**),
     x  – ROZSZERZENIE (## nagłówek, • punkt, ◦ podpunkt), k – hasła do minimum,
     m  – haczyk pamięciowy, f – [pojęcie, opis], tf – [zdanie, prawda?, poprawka],
     c  – [zdanie z ___, odpowiedź, [dystraktory]], o – kolejności, g – grupy, s – zbiory,
     sc – scenki [sytuacja, odpowiedź, [dystraktory]], nx – słowa, których nie używać jako dystraktorów,
     gen – generator zadań liczbowych. */
const WORLDS = [
  { id: 0, name: 'Huta i Laboratorium', short: 'Huta', icon: 'ingot', color: '#ff7a1a', desc: 'Technologie metali, mikroskopia, struktura, skanowanie i druk 3D' },
  { id: 1, name: 'Głowa Inżyniera', short: 'Głowa', icon: 'brain', color: '#ff77a8', desc: 'Rodzaje wiedzy, proces twórczy, osobowość, pracownicy wiedzy' },
  { id: 2, name: 'Magazyn Strategii', short: 'Magazyn', icon: 'crate', color: '#e0a458', desc: 'Logistyka, controlling, strategie i ich wdrażanie' },
  { id: 3, name: 'Agencja Marketingu', short: 'Agencja', icon: 'mega', color: '#29adff', desc: 'Segmentacja, PEST, RTB, Public Relations' },
  { id: 4, name: 'Dojo Toyoty', short: 'Dojo', icon: 'torii', color: '#e0303c', desc: 'TPS, JIT, Jidoka, CORE, QRQC, Hoshin Kanri' },
  { id: 5, name: 'Fabryka 4.0', short: '4.0', icon: 'robot', color: '#6fe3ff', desc: 'Przemysł 4.0, bliźniaki, ERP/MES/SCADA, personalizacja, cyber' },
  { id: 6, name: 'Laboratorium Jakości', short: 'Jakość', icon: 'lens', color: '#9be23a', desc: 'SPC, RCA, FMEA, CMM, normy ISO, Six Sigma' },
  { id: 7, name: 'Piramida i OEE', short: 'OEE', icon: 'pyramid', color: '#ffd23a', desc: 'Warstwy systemów zarządzania produkcją i 6 strat OEE' },
];
const QUESTIONS = [];
function Q(def) {
  const arr = v => (v ? (Array.isArray(v) ? v : [v]) : []);
  def.o = arr(def.o); def.g = arr(def.g); def.s = arr(def.s);
  def.f = def.f || []; def.tf = def.tf || []; def.c = def.c || []; def.sc = def.sc || [];
  def.k = def.k || []; def.x = def.x || []; def.nx = def.nx || [];
  QUESTIONS.push(def);
}
