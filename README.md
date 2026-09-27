# Magisterka The Game

Pikselowa gra przeglądarkowa do nauki 40 zagadnień na egzamin magisterski (AGH, Wydział Metali Nieżelaznych).
Każde pytanie przechodzi 5 poziomów opanowania, a każdy kolejny poziom to trudniejsza minigra.
Gra sama dobiera zagadnienia (najsłabsze i najdawniej ćwiczone najpierw), a błędy wracają po dwóch zadaniach.

Najważniejsze: gra uczy **mówić odpowiedź przed komisją**, nie tylko rozpoznawać pojęcia. Każde pytanie ma
wzorcową odpowiedź ustną ułożoną wg jednego szkieletu: **definicja → wyliczenie → rozwinięcie → przykład → domknięcie**,
pytania dodatkowe komisji (z typowymi pułapkami) oraz listę typowych pomyłek. Poziomy 3–5 to już praca na całej wypowiedzi.

## Jak grać

- **Online (telefon, 24/7):** https://kaleciak.github.io/magisterka-the-game/
- **Najprościej:** otwórz `dist/magisterka.html` (jeden plik, działa po dwukliku, także na telefonie).
- Wersja deweloperska: `index.html` (te same pliki źródłowe w `js/` i `css/`).
- Postęp zapisuje się w przeglądarce (localStorage).

### Online na telefonie (GitHub Pages, 24/7, bez logowania)

Katalog główny repozytorium to gotowa strona (z `.nojekyll`, manifestem, ikonami i service workerem do pracy offline).
1. Repozytorium musi być publiczne (albo konto z GitHub Pro): *Settings → General → Danger Zone → Change visibility*.
2. *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `claude/charming-cori-jw0tcj`, folder `/ (root)` → Save*.
3. Po ok. minucie gra działa pod adresem `https://kaleciak.github.io/magisterka-the-game/`.

Na telefonie: iPhone – *Udostępnij → Do ekranu początkowego*, Android – *⋮ → Zainstaluj aplikację*. Po pierwszym otwarciu gra działa też bez internetu,
a gdy jest sieć – zawsze pobiera najnowszą wersję. `node tools/build.js` odświeża ikony, manifest i `sw.js`.

Czcionka: domyślnie pikselowa Jersey 15 (czytelna), w Ustawieniach można przełączyć na Pixelify Sans albo zwykłą systemową. Czcionki są wbudowane w `fonts/` (działają offline).

Sterowanie: klawiatura (strzałki, spacja, 1–6, Enter, Esc = pauza) albo dotyk.

## Tryby

| Tryb | Opis |
|---|---|
| Maraton | Wszystkie 40 pytań. Wprowadza po 4 nowe naraz, powtarza słabe, rośnie tempo i combo. |
| Trening odpowiedzi | Tylko gry „ustne”: Mównica, Znikający tekst, Łowca błędów, Dopytka komisji i Komisja. |
| Mapa światów | 8 światów tematycznych: gra w danym świecie, karty nauki, boss „Komisja”. |
| Symulator obrony | Losowanie jak na egzaminie, odpowiedź na głos z zegarem (cel 1:00–2:30), płatna podpowiedź planu, porównanie ze wzorcem zdanie po zdaniu, pytanie dodatkowe komisji, ocena 2,0–5,0. |
| Egzamin końcowy | 12 losowych pytań, wszystkie typy minigier, 3 życia. |
| Kompendium | Zakładki: Jak odpowiedzieć (plan + wzorcowa odpowiedź), Minimum, Rozszerzenie, Dopytki; tryb fiszek, wyszukiwarka i trening „Na pamięć” (tekst znika w 5 krokach). |

## Poziomy i minigry

| Poziom | Minigry |
|---|---|
| 0 Nowe | Drwal Prawdy (prawda/fałsz, Timberman), Flappy Birret (2 bramki) |
| 1 Rozpoznaję | Flappy Birret (3 bramki), McBomba (scenki, McPixel), Drwal |
| 2 Kojarzę | Spawarka Par (pojęcie ↔ opis), McBomba, Taśma Sortownia, Młotek Jidoka, Wieża Wiedzy (kolejność, Icy Tower) |
| 3 Układam odpowiedź | Mównica (ułóż wypowiedź ze zdań w dobrej kolejności, odrzuć zdania obce i z błędem), Znikający tekst (luki w odpowiedzi), Dopytka komisji |
| 4 Mówię jak na obronie | Łowca błędów (znajdź pomyłki w odpowiedzi kolegi), więcej luk, Komisja, Mównica z pułapkami |
| 5 Opanowane | Powtórki – głównie gry ustne, czasem pozostałe |

Gry ustne rozgrywają się w pikselowej sali egzaminacyjnej: komisja reaguje miną i komentarzem, a pasek pokazuje jej nastrój.
Po każdej grze ustnej widać wzorcową odpowiedź „Tak to powiedz komisji”.

Dodatkowo generator zadań liczbowych: OEE (P40), EVM – CV/SV/CPI/SPI (P13), RPN (P35).

## Źródła treści

- **Główne:** „Zagadnienia – egzamin magisterski” (plik 2), razem z treścią obrazków (Dom Toyoty, SPC, piramida systemów, diagram strat OEE, przykład OEE 64,8%).
- **Styl minimum i uzupełnienia:** „40 zagadnień – wersja minimalistyczna” (plik 1). Wiedza tylko z tego pliku jest oznaczona „(plik 1)”. Przy sprzecznościach wygrywa plik 2.
- **P10 Role pracowników wiedzy:** według slajdów z wykładu (Kontroler, Pomocnik, Uczący się, Konsolidator, Łącznik, Organizator).

Treść: `js/data/w0.js` … `w7.js` (jedno pytanie = jeden obiekt `Q({...})`), odpowiedzi ustne, dopytki i typowe pomyłki: `js/data/oral-a.js`, `oral-b.js`,
reguły antydwuznaczności dystraktorów: `js/data/_rules.js`.

## Struktura

```
index.html, css/style.css
js/util.js, sprites.js, audio.js, store.js   narzędzia, pixel-art, dźwięk 8-bit, zapis postępu
js/challenges.js, challenges-oral.js         generator zadań dla minigier (+ zadania liczbowe i ustne)
js/stage.js, js/mg/*.js                      scena canvas, 12 minigier, sala egzaminacyjna (mg/room.js)
js/scene.js                                  animowana scena tytułowa
js/run.js, ui.js, defense.js, main.js        runda, ekrany, symulator obrony, start
tools/validate.js, tools/build.js            walidacja treści, budowanie dist/magisterka.html
tools/pwa.js                                 ikony, manifest.webmanifest i sw.js (aplikacja na telefon, offline)
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
