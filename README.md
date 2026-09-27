# Magisterka The Game

Pikselowa gra przeglądarkowa do nauki 40 zagadnień na egzamin magisterski (AGH, Wydział Metali Nieżelaznych).
Każde pytanie przechodzi 5 poziomów opanowania, a każdy kolejny poziom to trudniejsza minigra.
Gra sama dobiera zagadnienia (najsłabsze i najdawniej ćwiczone najpierw), a błędy wracają po dwóch zadaniach.

## Jak grać

- **Najprościej:** otwórz `dist/magisterka.html` (jeden plik, działa po dwukliku, także na telefonie).
- Wersja deweloperska: `index.html` (te same pliki źródłowe w `js/` i `css/`).
- Postęp zapisuje się w przeglądarce (localStorage).

Sterowanie: klawiatura (strzałki, spacja, 1–6, Enter, Esc = pauza) albo dotyk.

## Tryby

| Tryb | Opis |
|---|---|
| Maraton | Wszystkie 40 pytań. Wprowadza po 4 nowe naraz, powtarza słabe, rośnie tempo i combo. |
| Mapa światów | 8 światów tematycznych: gra w danym świecie, karty nauki, boss „Komisja”. |
| Symulator obrony | Losowanie pytań jak na egzaminie, odpowiedź na głos z zegarem, samoocena hasłami, ocena 2,0–5,0. |
| Egzamin końcowy | 12 losowych pytań, wszystkie typy minigier, 3 życia. |
| Kompendium | Minimum egzaminacyjne, pełne rozszerzenie, haczyki pamięciowe, pojęcia; tryb fiszek i wyszukiwarka. |

## Poziomy i minigry

| Poziom | Minigry |
|---|---|
| 0 Nowe | Drwal Prawdy (prawda/fałsz, Timberman), Flappy Birret (2 bramki) |
| 1 Rozpoznaję | Flappy Birret (3 bramki), McBomba (scenki, McPixel), Drwal |
| 2 Kojarzę | Spawarka Par (pojęcie ↔ opis), McBomba, Taśma Sortownia, Młotek Jidoka |
| 3 Porządkuję | Wieża Wiedzy (kolejność, Icy Tower), Taśma, Młotek, Spawarka |
| 4 Odpowiadam | Komisja: zaznacz hasła z minimum odpowiedzi, potem pełne minimum |
| 5 Opanowane | Losowe powtórki wszystkimi typami |

Dodatkowo generator zadań liczbowych: OEE (P40), EVM – CV/SV/CPI/SPI (P13), RPN (P35).

## Źródła treści

- **Główne:** „Zagadnienia – egzamin magisterski” (plik 2), razem z treścią obrazków (Dom Toyoty, SPC, piramida systemów, diagram strat OEE, przykład OEE 64,8%).
- **Styl minimum i uzupełnienia:** „40 zagadnień – wersja minimalistyczna” (plik 1). Wiedza tylko z tego pliku jest oznaczona „(plik 1)”. Przy sprzecznościach wygrywa plik 2.
- **P10 Role pracowników wiedzy:** według slajdów z wykładu (Kontroler, Pomocnik, Uczący się, Konsolidator, Łącznik, Organizator).

Treść: `js/data/w0.js` … `w7.js` (jedno pytanie = jeden obiekt `Q({...})`), reguły antydwuznaczności dystraktorów: `js/data/_rules.js`.

## Struktura

```
index.html, css/style.css
js/util.js, sprites.js, audio.js, store.js   narzędzia, pixel-art, dźwięk 8-bit, zapis postępu
js/challenges.js                             generator zadań dla minigier (+ zadania liczbowe)
js/stage.js, js/mg/*.js                      scena canvas i 8 minigier
js/run.js, ui.js, defense.js, main.js        runda, ekrany, symulator obrony, start
tools/validate.js, tools/build.js            walidacja treści, budowanie dist/magisterka.html
tests/*.test.js                              testy generatorów, test dymny i symulacja gry (Playwright)
```

## Testy i budowanie

```
node tools/validate.js          # kompletność treści 40 pytań
node tests/generators.test.js   # każde pytanie × typ × poziom
node tests/smoke.test.js        # Chromium: menu, każda minigra, ekrany (desktop + telefon)
node tests/progression.test.js  # symulacja ~150 zadań
node tools/build.js             # dist/magisterka.html
```
