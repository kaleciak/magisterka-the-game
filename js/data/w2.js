'use strict';
/* ŚWIAT 3 · MAGAZYN STRATEGII · P11–P16 */

Q({
  id: 11, w: 2, t: 'Logistyka',
  q: 'Co to jest logistyka?',
  a: [
    '**Logistyka** to proces **przepływu fizycznego dóbr materialnych** (surowców, materiałów, wyrobów gotowych) w przedsiębiorstwie i **między przedsiębiorstwami** oraz **towarzyszących im informacji**. To także **zintegrowana, systemowa koncepcja zarządzania** tymi procesami, której ideą jest **koordynacja przepływów w celu minimalizacji ich kosztów**; jako dziedzina wiedzy ekonomicznej bada prawidłowości tych przepływów w gospodarce.',
    'Trzy aspekty: **koncepcyjno-funkcjonalny** (koncepcja zarządzania przepływami), **przedmiotowo-strukturalny** (fizyczny proces przepływów i czynności), **efektywnościowy** (pożądany poziom obsługi klienta przy racjonalnych kosztach).',
    'Fundament (plik 1): zasada **7R** – właściwy **produkt, ilość, stan, miejsce, czas, klient i koszt**.'
  ],
  x: [
    'Logistyka to proces przepływu fizycznego dóbr materialnych (surowców, materiałów, wyrobów gotowych) w przedsiębiorstwie oraz między przedsiębiorstwami, a także przepływ towarzyszących im informacji. To również zintegrowana i systemowa koncepcja zarządzania tymi procesami, której ideą jest koordynacja przepływów w celu minimalizacji ich kosztów. Jako dziedzina wiedzy ekonomicznej bada prawidłowości i zjawiska tych przepływów w gospodarce i jej ogniwach.',
    '• Aspekt koncepcyjno-funkcjonalny: logistyka jako koncepcja systemowego i zintegrowanego sposobu zarządzania przepływami dóbr i informacji.',
    '• Aspekt przedmiotowo-strukturalny: logistyka jako fizyczny proces przepływów towarowych oraz kompleks czynności związanych z ich realizacją.',
    '• Aspekt efektywnościowy: logistyka jako determinanta wzrostu efektywności – pożądany poziom obsługi klientów przy równoczesnej racjonalizacji struktury kosztów.',
    '## Uzupełnienie (plik 1)',
    'Logistyka to planowanie, realizowanie i kontrolowanie efektywnego przepływu od źródła do konsumenta. Fundamentem jest zasada 7R (7W): właściwy produkt, właściwa ilość, właściwy stan, właściwe miejsce, właściwy czas, właściwy klient i właściwy koszt.'
  ],
  k: ['Przepływ fizyczny dóbr materialnych', 'Towarzysząca informacja', 'W firmie i między firmami', 'Zintegrowana koncepcja zarządzania', 'Koordynacja → minimalizacja kosztów', 'Aspekt koncepcyjno-funkcjonalny', 'Aspekt przedmiotowo-strukturalny', 'Aspekt efektywnościowy', 'Zasada 7R'],
  m: 'Logistyka = „towar + informacja, taniej”. 3 aspekty K-P-E: Koncepcja (jak zarządzać), Przedmiot (co fizycznie płynie), Efektywność (obsługa vs koszty). 7R: „Przez Ile Stacji Musi Czekać Każdy Kurier?” = Produkt, Ilość, Stan, Miejsce, Czas, Klient, Koszt.',
  f: [
    ['Aspekt koncepcyjno-funkcjonalny', 'logistyka jako koncepcja systemowego, zintegrowanego zarządzania przepływami'],
    ['Aspekt przedmiotowo-strukturalny', 'logistyka jako fizyczny proces przepływów towarowych i kompleks czynności'],
    ['Aspekt efektywnościowy', 'pożądany poziom obsługi klienta przy racjonalizacji kosztów'],
    ['Zasada 7R', 'właściwy produkt, ilość, stan, miejsce, czas, klient i koszt'],
    ['Idea logistyki', 'koordynacja przepływów w celu minimalizacji ich kosztów'],
  ],
  c: [
    ['Ideą logistyki jest koordynacja przepływów w celu minimalizacji ich ___', 'kosztów', ['zapasów bezpieczeństwa', 'cen sprzedaży', 'zatrudnienia']],
    ['Zasada 7R: produkt, ilość, stan, miejsce, czas, klient i ___', 'koszt', ['dostawca', 'marka', 'kolor']],
  ],
  tf: [
    ['Logistyka obejmuje także przepływ informacji', true],
    ['Logistyka dotyczy wyłącznie przepływów wewnątrz jednej firmy', false, 'Logistyka to przepływy W przedsiębiorstwie ORAZ MIĘDZY przedsiębiorstwami'],
    ['Ideą logistyki jest koordynacja przepływów w celu minimalizacji kosztów', true],
    ['Aspekt efektywnościowy łączy poziom obsługi klienta z racjonalizacją kosztów', true],
    ['Zasada 7R obejmuje właściwego dostawcę', false, '7R: produkt, ilość, stan, miejsce, czas, klient, koszt'],
  ],
  o: { n: 'Zasada 7R (w kolejności)', i: ['Produkt', 'Ilość', 'Stan', 'Miejsce', 'Czas', 'Klient', 'Koszt'] },
  g: { n: 'Który aspekt logistyki?', c: {
    'Koncepcyjno-funkcjonalny': ['Systemowa koncepcja zarządzania', 'Zintegrowane zarządzanie przepływami'],
    'Przedmiotowo-strukturalny': ['Fizyczny przepływ towarów', 'Kompleks czynności realizacji'],
    'Efektywnościowy': ['Pożądany poziom obsługi klienta', 'Racjonalizacja kosztów'],
  } },
  s: { n: 'Składniki zasady 7R (właściwy…)', y: ['Produkt', 'Ilość', 'Stan', 'Miejsce', 'Czas', 'Klient', 'Koszt'], x: ['Dostawca', 'Kolor', 'Marka', 'Magazynier'] },
  sc: [
    ['Towar dotarł na czas i w dobrej ilości, ale do złego odbiorcy. Które „R” złamano?', 'Właściwy klient', ['Właściwy czas', 'Właściwa ilość', 'Właściwy stan']],
    ['Patrzysz na logistykę jako fizyczny przepływ towarów i czynności. To aspekt…', 'Przedmiotowo-strukturalny', ['Koncepcyjno-funkcjonalny', 'Efektywnościowy', 'Marketingowy']],
  ],
});

Q({
  id: 12, w: 2, t: 'Logistyka zaopatrzenia',
  q: 'Opisać krótko misję logistyki zaopatrzenia.',
  a: [
    'Misją logistyki zaopatrzenia jest **optymalizacja transferu surowców, materiałów i podzespołów** wpływających do przedsiębiorstwa (ewentualnie wraz z przepływem przez **ogniwa zasilające**), tak by zagwarantować **ciągłość produkcji** przy **minimalnych łącznych kosztach zakupu i magazynowania**.',
    'To **pierwsze ogniwo** łańcucha – **przed logistyką produkcji i dystrybucji** – łączy **rynek dostawców** poprzez **magazyn surowców** z **procesem produkcji**.',
    'Istotą jest **równowaga** (plik 1): nie zatrzymać linii z **braku materiału**, ale też nie **zamrażać kapitału obrotowego** w nadmiernych zapasach.'
  ],
  x: [
    '• Misja i cel: logistyka zaopatrzenia odpowiada za optymalizację transferu surowców, materiałów i podzespołów wpływających do danego podmiotu gospodarczego, ewentualnie wraz z ich przepływem przez ogniwa zasilające.',
    '• Pozycja w procesie: na ogólnym schemacie stanowi pierwsze kluczowe ogniwo (zaraz przed logistyką produkcji i logistyką dystrybucji), łączące rynek dostawców poprzez magazyn surowców bezpośrednio z procesem produkcji.',
    '## Uzupełnienie (plik 1)',
    'Misją jest zagwarantowanie ciągłości produkcji przez terminowe dostarczanie surowców przy minimalizacji łącznych kosztów zakupu i magazynowania. Istotą jest równowaga: nie dopuścić do zatrzymania linii z braku materiału, ale też nie zamrażać kapitału obrotowego w nadmiernych zapasach.'
  ],
  k: ['Optymalizacja transferu surowców i podzespołów', 'Ogniwa zasilające', 'Ciągłość produkcji', 'Minimalne koszty zakupu i magazynowania', 'Pierwsze ogniwo łańcucha', 'Dostawcy → magazyn surowców → produkcja', 'Równowaga: brak vs nadmiar zapasu'],
  m: 'Zaopatrzenie = BRAMKA WEJŚCIOWA fabryki: Dostawca → Magazyn surowców → Produkcja. Waga: pusta półka (linia staje) kontra pełna półka (zamrożona kasa).',
  f: [
    ['Misja logistyki zaopatrzenia', 'optymalizacja transferu surowców, materiałów i podzespołów wpływających do firmy'],
    ['Pozycja zaopatrzenia', 'pierwsze ogniwo – przed logistyką produkcji i dystrybucji'],
    ['Nadmierne zapasy', 'zamrażają kapitał obrotowy (plik 1)'],
    ['Brak materiału', 'zatrzymuje linię produkcyjną (plik 1)'],
  ],
  tf: [
    ['Logistyka zaopatrzenia jest ostatnim ogniwem, po dystrybucji', false, 'To PIERWSZE ogniwo: zaopatrzenie → produkcja → dystrybucja'],
    ['Zaopatrzenie łączy rynek dostawców przez magazyn surowców z produkcją', true],
    ['Celem zaopatrzenia jest utrzymywanie jak największych zapasów', false, 'Celem jest równowaga – bez braków, ale bez zamrażania kapitału w zapasach'],
    ['Misja obejmuje optymalizację transferu podzespołów', true],
  ],
  o: [
    { n: 'Kolejność ogniw logistyki', i: ['Logistyka zaopatrzenia', 'Logistyka produkcji', 'Logistyka dystrybucji'] },
    { n: 'Przepływ w zaopatrzeniu', i: ['Rynek dostawców', 'Magazyn surowców', 'Proces produkcji'] },
  ],
  g: { n: 'Który biegun ryzyka?', c: {
    'Za mało zapasu': ['Zatrzymanie linii', 'Brak materiału'],
    'Za dużo zapasu': ['Zamrożony kapitał obrotowy', 'Wysokie koszty magazynowania'],
  } },
  sc: [
    ['Linia stoi, bo zabrakło blach od dostawcy. Która logistyka zawiodła?', 'Logistyka zaopatrzenia', ['Logistyka dystrybucji', 'Logistyka produkcji', 'Controlling strategiczny']],
  ],
});

Q({
  id: 13, w: 2, t: 'Controlling strategiczny', gen: 'evm',
  q: 'Wyjaśnić pojęcie controllingu strategicznego i wymienić jego zadania.',
  a: [
    '**Controlling strategiczny** to **długofalowy podsystem wsparcia zarządzania strategicznego** – procesu **informacyjno-decyzyjnego** (wspomaganego planowaniem, organizacją i kontrolą), który rozstrzyga o kluczowych problemach firmy, jej **przetrwaniu i rozwoju**, z uwzględnieniem **otoczenia** i **węzłowych czynników potencjału wytwórczego**.',
    'Zadania i cechy:',
    '• **długi horyzont** planów – min. **3–5 lat** (makro: 5–10 lat), cel strategiczny wynika z **misji**;',
    '• **koncentracja na otoczeniu** (szanse i zagrożenia, otoczenie bliższe i dalsze) i **stałe diagnozowanie zmian** (rynkowych, demograficznych, ekonomicznych);',
    '• **pełna otwartość na informacje** – akceptacja częściowej nieprzewidywalności otoczenia;',
    '• **zadania kontrolno-operacyjne** – cele strategiczne → **taktyczne (1–5 lat)** → **operacyjne (do roku)**, nadzór nad wartością firmy (**EVA**), monitoring odchyleń;',
    '• monitoring projektów metodą **EVM**: **CV = BCWP − ACWP**, **SV = BCWP − BCWS**, **CPI = BCWP / ACWP**, **SPI = BCWP / BCWS**.',
    '(Plik 1: także **benchmarking** konkurencji i **wczesne ostrzeganie** przed utratą płynności lub pozycji.)'
  ],
  x: [
    'Controlling strategiczny to długofalowy podsystem wsparcia zarządzania strategicznego, czyli procesu informacyjno-decyzyjnego (wspomaganego funkcjami planowania, organizacji i kontroli), którego celem jest rozstrzyganie o kluczowych problemach działalności przedsiębiorstwa, o jego przetrwaniu i rozwoju, ze szczególnym uwzględnieniem oddziaływań otoczenia i węzłowych czynników własnego potencjału wytwórczego.',
    '• Długi horyzont planów: wspieranie tworzenia planów długofalowych i rozwoju (minimum 3–5 lat, w ujęciu makroekonomicznym do 5–10 lat) o wyznaczonym celu strategicznym, wynikającym z misji firmy.',
    '• Koncentracja na otoczeniu: ciągłe monitorowanie i analiza szans oraz zagrożeń płynących z otoczenia bliższego i dalszego.',
    '• Stałe diagnozowanie zmian: ciągłe badanie uwarunkowań rynkowych, demograficznych oraz ekonomicznych.',
    '• Pełna otwartość na informacje: zarządzanie w warunkach akceptacji częściowej nieprzewidywalności otoczenia – stały dostęp i wysoka tolerancja dla zróżnicowanych informacji.',
    '• Zadania kontrolno-operacyjne: formułowanie celów strategicznych (najwyższe kierownictwo), kaskadowanie ich na cele taktyczne (średni szczebel, 1–5 lat) i operacyjne (najniższy szczebel, do roku), nadzór nad systemem zarządzania wartością firmy (EVA) oraz bieżące monitorowanie odchyleń.',
    '## Metoda EVM (Earned Value Method)',
    'Technika wartości wypracowanej do monitorowania realizacji projektów – współzależne zaawansowanie robót i poniesione koszty:',
    '◦ Odchylenie kosztowe: CV = BCWP − ACWP (BCWP – budżetowy koszt pracy wykonanej, ACWP – rzeczywisty koszt pracy wykonanej).',
    '◦ Odchylenie harmonogramowe: SV = BCWP − BCWS (BCWS – budżetowy koszt pracy planowanej).',
    '◦ Wskaźniki efektywności: CPI = BCWP / ACWP oraz SPI = BCWP / BCWS.',
    '## Uzupełnienie (plik 1)',
    'Controlling strategiczny bada szanse i zagrożenia w otoczeniu oraz silne i słabe strony firmy; zamiast bieżących rozliczeń księgowych buduje trwałą wartość firmy, analizuje konkurencję (benchmarking) i wcześnie ostrzega przed utratą płynności lub pozycji rynkowej.'
  ],
  k: ['Długofalowy podsystem wsparcia zarządzania', 'Przetrwanie i rozwój firmy', 'Horyzont min. 3–5 lat', 'Szanse i zagrożenia z otoczenia', 'Stałe diagnozowanie zmian', 'Otwartość na informacje', 'Cele: strategiczne → taktyczne → operacyjne', 'EVA – wartość firmy', 'EVM: CV, SV, CPI, SPI'],
  m: 'Controlling strategiczny = LORNETKA (3–5 lat, otoczenie) + KASKADA celów (strategia → taktyka 1–5 lat → operacja do roku) + LICZNIK EVM. W EVM zawsze zaczynasz od BCWP (wartość wypracowana). Koszty → ACWP (Actual), harmonogram → BCWS (Schedule). Różnica = odchylenie (CV, SV), iloraz = wskaźnik (CPI, SPI).',
  f: [
    ['CV (odchylenie kosztowe)', 'CV = BCWP − ACWP'],
    ['SV (odchylenie harmonogramowe)', 'SV = BCWP − BCWS'],
    ['CPI', 'CPI = BCWP / ACWP – efektywność kosztowa'],
    ['SPI', 'SPI = BCWP / BCWS – efektywność harmonogramu'],
    ['BCWP', 'budżetowy koszt pracy wykonanej (wartość wypracowana)'],
    ['ACWP', 'rzeczywisty koszt pracy wykonanej'],
    ['BCWS', 'budżetowy koszt pracy planowanej'],
    ['EVA', 'wartość firmy – nadzór nad systemem zarządzania wartością'],
    ['Cele taktyczne', 'średni szczebel zarządzania, horyzont 1–5 lat'],
    ['Cele operacyjne', 'najniższy szczebel, horyzont do roku'],
    ['EVM', 'metoda wartości wypracowanej – zaawansowanie robót vs poniesione koszty'],
  ],
  c: [
    ['CV = BCWP − ___', 'ACWP', ['BCWS', 'SPI', 'EVA']],
    ['SV = BCWP − ___', 'BCWS', ['ACWP', 'CPI', 'CV']],
    ['CPI = BCWP / ___', 'ACWP', ['BCWS', 'SV', 'EVA']],
    ['SPI = BCWP / ___', 'BCWS', ['ACWP', 'CV', 'CPI']],
    ['Horyzont controllingu strategicznego to minimum ___', '3–5 lat', ['1 rok', '6 miesięcy', '1 kwartał']],
    ['Cele operacyjne mają horyzont ___', 'do roku', ['1–5 lat', '5–10 lat', 'powyżej 10 lat']],
  ],
  tf: [
    ['Controlling strategiczny ma horyzont minimum 3–5 lat', true],
    ['CV = BCWP − ACWP', true],
    ['SPI = BCWP / ACWP', false, 'SPI = BCWP / BCWS; iloraz BCWP / ACWP to CPI'],
    ['Controlling strategiczny wymaga pełnej otwartości na informacje', true],
    ['Cele taktyczne ustala najniższy szczebel na okres do roku', false, 'Taktyczne: średni szczebel, 1–5 lat; operacyjne: najniższy, do roku'],
    ['BCWS to budżetowy koszt pracy planowanej', true],
    ['Controlling strategiczny koncentruje się na otoczeniu firmy', true],
  ],
  o: { n: 'Kaskadowanie celów', i: ['Cele strategiczne', 'Cele taktyczne (1–5 lat)', 'Cele operacyjne (do roku)'] },
  g: { n: 'Który wzór EVM?', c: {
    'Odchylenia (różnica)': ['CV = BCWP − ACWP', 'SV = BCWP − BCWS'],
    'Wskaźniki (iloraz)': ['CPI = BCWP / ACWP', 'SPI = BCWP / BCWS'],
  } },
  s: { n: 'Zadania i cechy controllingu strategicznego', y: ['Długi horyzont planów', 'Koncentracja na otoczeniu', 'Stałe diagnozowanie zmian', 'Otwartość na informacje', 'Kaskadowanie celów', 'Nadzór nad EVA'], x: ['Naliczanie płac', 'Sterowanie PLC', 'Bieżące księgowanie faktur'] },
  sc: [
    ['Projekt: BCWP = 80, ACWP = 100. CV wynosi…', '−20 (przekroczenie kosztów)', ['+20 (oszczędność)', '0,8', '1,25']],
    ['Projekt: BCWP = 90, BCWS = 100. SPI wynosi…', '0,9 (opóźnienie)', ['1,1 (przed czasem)', '−10', '0,1']],
  ],
});

Q({
  id: 14, w: 2, t: 'Strategie logistyczne',
  q: 'Klasyfikacja strategii logistycznych – proszę wymienić 5 strategii i opisać dwie z nich.',
  a: [
    'Pięć strategii logistycznych: **opóźniania**, **konsolidacji**, **racjonalizacji**, **zróżnicowanej dystrybucji** i **mieszana**.',
    '• **Strategia opóźniania** – przesunięcie nadania **ostatecznego kształtu produktu** (lub zmiany lokalizacji zapasów) na **jeden z ostatnich etapów** produkcji i dystrybucji; np. producent kuchenek **maluje je w centrum dystrybucyjnym** → mniejsze zapasy i kolory dopasowane do sygnałów ze sklepów.',
    '• **Strategia konsolidacji** – **łączenie działań** dla **korzyści skali**: łączenie ładunków (niższe koszty jednostkowe transportu), **mniej magazynów** przy tym samym poziomie obsługi i niższych zapasach.',
    '• **Racjonalizacji** – nie „sprzedajemy wszystko wszystkim”: analiza asortymentu, klientów i kosztów (**zasada 80/20**).',
    '• **Zróżnicowanej dystrybucji** – różny **poziom obsługi** dla różnych klientów (wielcy – bezpośrednio, mniejsi – przez centra regionalne, mali – przez sieć detaliczną).',
    '• **Mieszana** – strategie **wielowariantowe** są często **tańsze** niż czyste.'
  ],
  x: [
    '## Strategia opóźniania',
    'Sprowadza się do opóźniania ostatecznego kształtu produktu do jednego z ostatnich etapów w procesie produkcji i dystrybucji lub opóźniania zmian w lokalizacji zapasów. Przykład: producent kuchenek przesuwa malowanie z fabryki do centrum dystrybucyjnego – zmniejsza to zapasy i pozwala lepiej dostosować kolory do sygnałów ze sklepów.',
    '## Strategia konsolidacji',
    'Łączenie działań dla uzyskania korzyści skali. W transporcie pozwala łączyć ładunki i obniżać koszty jednostkowe, a w magazynowaniu – zmniejszyć liczbę magazynów, dając ten sam poziom obsługi rynku przy niższym poziomie całkowitych zapasów.',
    '## Strategia racjonalizacji',
    'Firma nie powinna stosować zasady „sprzedajemy wszystko wszystkim”. Wymaga stałej analizy asortymentu, klientów i kosztów (pomocna zasada 80/20): ile dany produkt generuje kosztów, a ile dany klient przynosi wpływów.',
    '## Strategia zróżnicowanej dystrybucji',
    'Nie wszystkie produkty powinny być dostarczane przy takim samym poziomie obsługi, gdyż różni klienci wymagają różnych cech produktu i form sprzedaży (np. wielcy klienci zaopatrywani bezpośrednio, mniejsi przez regionalne centra, a mali przez sieć detaliczną).',
    '## Strategia mieszana',
    'Logistyczne strategie wielowariantowe (mieszane) są często tańsze. Strategie czyste dają korzyści skali i są tanie w zarządzaniu, ale strategie mieszane wielokrotnie przynoszą lepsze rezultaty kosztowe.',
    '## Uzupełnienie (plik 1 – inna klasyfikacja)',
    'Minimalizacja kosztów (ekonomia skali, duże partie, tani transport masowy), minimalizacja czasu (JIT, elastyczność, eliminacja zapasów buforowych), dyferencjacja obsługi, outsourcing (3PL/4PL), budowanie odporności łańcucha dostaw.'
  ],
  k: ['Opóźniania', 'Konsolidacji', 'Racjonalizacji', 'Zróżnicowanej dystrybucji', 'Mieszana', 'Opóźnianie: malowanie w centrum dystrybucyjnym', 'Konsolidacja: korzyści skali, mniej magazynów', 'Racjonalizacja: zasada 80/20'],
  m: '„O-K-R-Z-M” = „OKRZyk Magazyniera”: Opóźniania (maluj kuchenki na końcu), Konsolidacji (łącz ładunki), Racjonalizacji (80/20), Zróżnicowanej dystrybucji (VIP-y bezpośrednio), Mieszana (miks wychodzi taniej).',
  nx: ['Minimalizacja', 'Outsourcing', 'Dyferencjacja', 'Odporność'],
  f: [
    ['Strategia opóźniania', 'ostateczny kształt produktu na jednym z ostatnich etapów (np. malowanie kuchenek w centrum dystrybucyjnym)'],
    ['Strategia konsolidacji', 'łączenie działań dla korzyści skali – łączenie ładunków, mniej magazynów'],
    ['Strategia racjonalizacji', 'nie „wszystko wszystkim” – analiza asortymentu, klientów i kosztów (80/20)'],
    ['Strategia zróżnicowanej dystrybucji', 'różny poziom obsługi dla różnych klientów i form sprzedaży'],
    ['Strategia mieszana', 'strategie wielowariantowe – często tańsze niż czyste'],
  ],
  c: [
    ['Strategia racjonalizacji korzysta z zasady ___', '80/20', ['50/50', '7R', '3-2-1']],
  ],
  tf: [
    ['Strategia opóźniania przesuwa nadanie ostatecznego kształtu produktu na koniec procesu', true],
    ['Konsolidacja zwiększa liczbę magazynów', false, 'Konsolidacja pozwala ZMNIEJSZYĆ liczbę magazynów przy tym samym poziomie obsługi'],
    ['Racjonalizacja wykorzystuje zasadę 80/20', true],
    ['Strategie mieszane są zawsze droższe od czystych', false, 'Strategie mieszane (wielowariantowe) są CZĘSTO TAŃSZE'],
    ['Zróżnicowana dystrybucja zakłada jeden poziom obsługi dla wszystkich', false, 'Różni klienci wymagają RÓŻNEGO poziomu obsługi i form sprzedaży'],
  ],
  g: { n: 'Która strategia logistyczna?', c: {
    'Opóźniania': ['Malowanie kuchenek w centrum dystrybucyjnym', 'Ostateczny kształt produktu na końcu'],
    'Konsolidacji': ['Łączenie ładunków', 'Mniej magazynów, niższe zapasy'],
    'Racjonalizacji': ['Zasada 80/20', 'Nie „wszystko wszystkim”'],
    'Zróżnicowanej dystrybucji': ['Wielcy klienci bezpośrednio', 'Mali przez sieć detaliczną'],
    'Mieszana': ['Strategie wielowariantowe', 'Często tańsza od czystej'],
  } },
  s: { n: '5 strategii logistycznych', y: ['Opóźniania', 'Konsolidacji', 'Racjonalizacji', 'Zróżnicowanej dystrybucji', 'Mieszana'], x: ['Prostych reguł', 'Doskonalenia firmy', 'Innowacji', 'Hoshin Kanri'] },
  sc: [
    ['Producent przenosi malowanie kuchenek z fabryki do centrum dystrybucyjnego. Strategia:', 'Opóźniania', ['Konsolidacji', 'Racjonalizacji', 'Mieszana']],
    ['Firma łączy małe przesyłki w pełne ciężarówki i zamyka 2 z 5 magazynów. Strategia:', 'Konsolidacji', ['Opóźniania', 'Zróżnicowanej dystrybucji', 'Racjonalizacji']],
    ['20% klientów daje 80% wpływów – firma przycina ofertę. Strategia:', 'Racjonalizacji', ['Konsolidacji', 'Mieszana', 'Opóźniania']],
  ],
});

Q({
  id: 15, w: 2, t: 'Strategie wg Obłoja',
  q: 'Rodzaje strategii (wg Krzysztofa Obłoja).',
  a: [
    'Wg prof. K. Obłoja **„strategia to zbiór kluczowych wyborów w czasie i przestrzeni”**. Wyróżnia trzy rodzaje strategii:',
    '• **Strategia prostych reguł** (Eisenhardt i Sull, HBR) – dla **start-upów, firm rodzinnych i nowych firm** do poziomu **SME**; zamiast złożonych mechanizmów **proste reguły** jako elastyczne drogowskazy (koncentracja na ważnych wyzwaniach i odbiorcach, kontrola kosztów, misja i wizja jako ramy, nauka na błędach, potencjał ludzi).',
    '• **Strategia doskonalenia firmy** – dla firm o **dojrzałej pozycji**, które muszą rosnąć **szybciej niż branża**; chroni przed **rutyną** i **niepotrzebną złożonością** (silosy, skomplikowane cenniki, zbyt szeroka oferta); **1–3 cele strategiczne**, **KCS** (kluczowe czynniki sukcesu), kaskadowanie celów, optymalizacja i centralizacja procesów, **outsourcing** nierentownych obszarów.',
    '• **Strategia innowacji (rozwoju)** – gdy firma **wpada w rutynę**, a efekt skali utrudnia zmianę; utrzymanie i budowa **długofalowej przewagi** przez innowacje **produktowe, procesowe** i transformację **modeli biznesowych**; średnio ok. **1% rocznego przychodu** (np. KGHM, PKN ORLEN 2030+).'
  ],
  x: [
    'Definicja prof. Krzysztofa Obłoja: „Strategia to zbiór kluczowych wyborów w czasie i przestrzeni”. Na poziomie operacyjno-doświadczalnym rodzaje strategii biznesowych dzieli się na trzy podejścia:',
    '## Strategia prostych reguł (Strategy as simple rules)',
    'Opisana m.in. przez K. Eisenhardt i D. Sulla w Harvard Business Review. Dotyczy nowo powstałych firm, rodzinnych interesów oraz start-upów, aż do osiągnięcia poziomu średniego przedsiębiorstwa (SME). Polega na maksymalnym uproszczeniu zarządzania – zamiast złożonych mechanizmów stosuje się proste reguły będące elastycznymi drogowskazami, co pozwala szybko wykorzystywać okazje z otoczenia. Opiera się na: koncentracji na istotnych wyzwaniach i ważnych odbiorcach, kontroli kosztów, misji i wizji jako ramach, nauce na błędach (pamiętanie porażek, kasowanie nieudanych eksperymentów) oraz wykorzystaniu potencjału ludzi.',
    '## Strategia doskonalenia firmy',
    'Stosowana, gdy firma ma ugruntowaną, dojrzałą pozycję, lecz musi walczyć o utrzymanie tempa wzrostu szybszego niż branża. Zapobiega „niebezpieczeństwu rutyny” oraz „niepotrzebnej złożoności” (silosy, zbyt skomplikowane cenniki, zbyt szerokie oferty). Opiera się na wyznaczeniu od 1 do maksymalnie 3 celów strategicznych, określeniu Kluczowych Czynników Sukcesu (KCS), kaskadowaniu celów, optymalizacji i centralizacji procesów oraz outsourcingu nierentownych obszarów.',
    '## Strategia innowacji (rozwoju firmy)',
    'Wdrażana, gdy firma wpada w rutynę, a efekt skali utrudnia zmianę. Celem jest utrzymanie przewag konkurencyjnych i budowa długofalowej przewagi przez innowacje produktowe, procesowe i transformację modeli biznesowych. Średnie i duże firmy przeznaczają na to średnio ok. 1% rocznego przychodu (np. KGHM Polska Miedź S.A. czy PKN ORLEN w horyzoncie 2030+).',
    '## Uzupełnienie (plik 1)',
    'Strategie przewagi konkurencyjnej: dominacja kosztowa (najniższe ceny dzięki skali), zróżnicowanie (unikalna wartość, za którą klient dopłaci), koncentracja na niszy (wąski segment rynku).'
  ],
  k: ['Zbiór kluczowych wyborów w czasie i przestrzeni', 'Prostych reguł – start-upy do SME', 'Eisenhardt i Sull (HBR)', 'Doskonalenia – dojrzała firma, rośnij szybciej niż branża', '1–3 cele, KCS', 'Innowacji – wyjście z rutyny', 'Innowacje produktowe, procesowe, modele biznesowe', 'Ok. 1% przychodu'],
  m: 'Cykl życia firmy = 3 strategie Obłoja: DZIECKO (start-up) → proste reguły; DOROSŁY (dojrzała pozycja) → doskonalenie (1–3 cele, KCS); KRYZYS WIEKU ŚREDNIEGO (rutyna) → innowacje (~1% przychodu). Definicja: wybory w CZASIE i PRZESTRZENI.',
  nx: ['Dominacja', 'nisz', 'Zróżnicowanie'],
  f: [
    ['Strategia prostych reguł', 'proste reguły jako elastyczne drogowskazy – start-upy, firmy rodzinne, do poziomu SME'],
    ['Strategia doskonalenia firmy', 'dojrzała firma walczy o wzrost szybszy niż branża: 1–3 cele, KCS, kaskadowanie'],
    ['Strategia innowacji', 'wyjście z rutyny przez innowacje produktowe, procesowe i nowe modele biznesowe'],
    ['KCS', 'Kluczowe Czynniki Sukcesu (strategia doskonalenia)'],
    ['Definicja strategii (Obłój)', 'zbiór kluczowych wyborów w czasie i przestrzeni'],
    ['Niepotrzebna złożoność', 'silosy, skomplikowane cenniki, zbyt szeroka oferta – zapobiega jej strategia doskonalenia'],
  ],
  c: [
    ['Wg Obłoja strategia to zbiór kluczowych wyborów w czasie i ___', 'przestrzeni', ['budżecie', 'hierarchii', 'procesie']],
    ['Strategia doskonalenia zakłada od 1 do maksymalnie ___ celów strategicznych', '3', ['5', '10', '7']],
    ['Na innowacje średnie i duże firmy przeznaczają ok. ___ rocznego przychodu', '1%', ['10%', '25%', '0,01%']],
    ['Strategię prostych reguł opisali Eisenhardt i ___', 'Sull', ['Porter', 'Drucker', 'Deming']],
  ],
  tf: [
    ['Strategia prostych reguł dotyczy start-upów i firm rodzinnych', true],
    ['Strategia doskonalenia jest dla nowo powstałych firm', false, 'Doskonalenie – dla firm o UGRUNTOWANEJ, dojrzałej pozycji'],
    ['Strategię innowacji wdraża się, gdy firma wpada w rutynę', true],
    ['Strategia doskonalenia chroni przed niepotrzebną złożonością', true],
    ['Wg Obłoja strategia to zbiór kluczowych wyborów w czasie i przestrzeni', true],
  ],
  o: { n: 'Strategie w cyklu życia firmy', i: ['Strategia prostych reguł', 'Strategia doskonalenia firmy', 'Strategia innowacji'] },
  g: { n: 'Która strategia Obłoja?', c: {
    'Prostych reguł': ['Start-upy i firmy rodzinne', 'Eisenhardt i Sull', 'Nauka na błędach', 'Kontrola kosztów'],
    'Doskonalenia': ['1–3 cele strategiczne', 'KCS', 'Centralizacja procesów', 'Outsourcing nierentownych obszarów'],
    'Innowacji': ['Firma wpadła w rutynę', 'Nowe modele biznesowe', 'Ok. 1% rocznego przychodu', 'KGHM, PKN ORLEN 2030+'],
  } },
  s: { n: 'Rodzaje strategii wg Obłoja', y: ['Prostych reguł', 'Doskonalenia firmy', 'Innowacji (rozwoju)'], x: ['Opóźniania', 'Konsolidacji', 'Racjonalizacji', 'Mieszana'] },
  sc: [
    ['Rodzinna firma z 12 osobami działa według kilku prostych drogowskazów. Strategia:', 'Prostych reguł', ['Doskonalenia firmy', 'Innowacji', 'Konsolidacji']],
    ['Dojrzały lider rynku ustala 2 cele strategiczne i KCS, by rosnąć szybciej niż branża. Strategia:', 'Doskonalenia firmy', ['Prostych reguł', 'Innowacji', 'Opóźniania']],
    ['Koncern przeznacza 1% przychodu na nowe modele biznesowe, by wyjść z rutyny. Strategia:', 'Innowacji', ['Doskonalenia firmy', 'Prostych reguł', 'Racjonalizacji']],
  ],
});

Q({
  id: 16, w: 2, t: 'Wdrożenie strategii',
  q: 'Etapy wdrożenia strategii w firmie.',
  a: [
    'Wdrożenie strategii to ustrukturyzowany **proces informacyjno-decyzyjny**:',
    '1. **Sformułowanie i analiza** – określenie **misji** (niepowtarzalny cel wyróżniający firmę), **wizji** (obraz przyszłości), **domeny działania**, celów strategicznych i dotychczasowej strategii.',
    '2. **Planowanie** – na podstawie badania **mikro- i makrootoczenia** plany na najbliższy okres i dalsze lata (**kroki milowe**).',
    '3. **Wdrażanie i kaskadowanie** – przełożenie celów strategicznych na **taktyczne i operacyjne**, powiązanie z planami sprzedaży i produkcji, **alokacja zasobów** finansowych i ludzkich, systemy motywacyjne (**zarządzanie przez cele**); identyfikacja **6 obszarów zmian**: **Załoga, Systemy info-decyzyjne, Struktura, Strategia, Dzielone wartości i kultura, Technologia**.',
    '4. **Podjęcie decyzji i kontrola** – system **sprawozdawczości**, monitoring **odchyleń budżetowych i terminowych**, cykliczna kontrola wyników.'
  ],
  x: [
    'Wg ujęcia etapowego zarządzania strategicznego wdrożenie wymaga przejścia przez fazy:',
    '• Analiza: określenie obecnej misji, wizji, domeny działania, celów strategicznych oraz dotychczasowej strategii.',
    '• Planowanie: na podstawie przebadania mikro- i makrootoczenia nakreślane są plany przyszłości firmy na najbliższy okres i dalsze lata.',
    '• Wdrożenie i kaskadowanie (etap zarządzania i kontroli): przełożenie celów strategicznych na operacyjne, alokacja zasobów finansowych i ludzkich (obszary zmian: Załoga, Systemy info-decyzyjne, Struktura, Strategia, Dzielone wartości i kultura, Technologia) oraz uruchomienie systemów motywacyjnych opartych na zarządzaniu przez cele.',
    '## Proces informacyjno-decyzyjny – kroki',
    '1. Sformułowanie i analiza: dekompozycja misji (podstawowego, niepowtarzalnego celu wyróżniającego firmę), wizji (koncepcji przyszłości – czym firma będzie się zajmować) oraz domeny działania i celów strategicznych.',
    '2. Planowanie (analiza sytuacji): na podstawie badania mikro- i makrootoczenia sformułowanie planów na najbliższy okres i dalsze lata (kroki milowe).',
    '3. Wdrażanie strategii (kolejność działań i harmonogram): ścisłe zarządzanie i kontrola – przełożenie celów strategicznych na taktyczne i operacyjne oraz powiązanie ich z ilościowymi planami sprzedaży i produkcji.',
    '4. Identyfikacja obszarów zmian: modyfikacja 6 powiązanych obszarów wewnętrznych – Załoga, Systemy info-decyzyjne, Struktura organizacyjna, Strategia, Dzielone wartości i kultura, Technologia.',
    '5. Podjęcie decyzji i kontrola: rygorystyczny system sprawozdawczości, monitorowanie odchyleń budżetowych i terminowych, cykliczna kontrola wyników.',
    '## Uzupełnienie (plik 1)',
    'Operacjonalizacja (wizja → cele cząstkowe i KPI), alokacja zasobów (budżety, ludzie, maszyny), implementacja operacyjna i zarządzanie zmianą, monitoring i kontrola strategiczna.'
  ],
  k: ['1. Analiza: misja, wizja, domena', '2. Planowanie: mikro- i makrootoczenie', 'Kroki milowe', '3. Kaskadowanie na cele taktyczne i operacyjne', 'Alokacja zasobów', 'Zarządzanie przez cele', '6 obszarów zmian', '4. Kontrola: sprawozdawczość, odchylenia'],
  m: '„A-P-W-K” = „Albo Plan Wdrożysz, albo Kontrola cię zje”: Analiza → Planowanie → Wdrażanie (kaskada) → Kontrola. 6 obszarów zmian: „Załoga Siedzi w Starym Samochodzie, Dzieląc Termos” = Załoga, Systemy info-decyzyjne, Struktura, Strategia, Dzielone wartości, Technologia.',
  f: [
    ['Misja', 'podstawowy, niepowtarzalny cel wyróżniający firmę'],
    ['Wizja', 'koncepcja przyszłości – obraz tego, czym firma będzie się zajmować'],
    ['Planowanie', 'plany na najbliższy okres i dalsze lata na podstawie badania mikro- i makrootoczenia'],
    ['Wdrażanie i kaskadowanie', 'cele strategiczne → taktyczne i operacyjne, powiązane z planami sprzedaży i produkcji'],
    ['Podjęcie decyzji i kontrola', 'sprawozdawczość, monitoring odchyleń budżetowych i terminowych'],
  ],
  tf: [
    ['Planowanie opiera się na badaniu mikro- i makrootoczenia', true],
    ['Kontrola jest pierwszym etapem wdrożenia strategii', false, 'Kolejność: analiza → planowanie → wdrażanie → kontrola'],
    ['Wdrażanie obejmuje kaskadowanie celów na taktyczne i operacyjne', true],
    ['Misja to obraz przyszłości firmy', false, 'To WIZJA; misja = podstawowy, niepowtarzalny cel wyróżniający firmę'],
    ['Jednym z 6 obszarów zmian są dzielone wartości i kultura', true],
  ],
  o: { n: 'Etapy wdrożenia strategii', i: ['Sformułowanie i analiza', 'Planowanie', 'Wdrażanie i kaskadowanie', 'Podjęcie decyzji i kontrola'] },
  g: { n: 'Który etap wdrożenia?', c: {
    'Analiza': ['Misja i wizja', 'Domena działania'],
    'Planowanie': ['Mikro- i makrootoczenie', 'Kroki milowe'],
    'Wdrażanie': ['Kaskadowanie celów', 'Alokacja zasobów', 'Zarządzanie przez cele'],
    'Kontrola': ['Sprawozdawczość', 'Odchylenia budżetowe i terminowe'],
  } },
  s: { n: '6 obszarów zmian przy wdrażaniu', y: ['Załoga', 'Systemy info-decyzyjne', 'Struktura organizacyjna', 'Strategia', 'Dzielone wartości i kultura', 'Technologia'], x: ['Cena', 'Promocja', 'Lokalizacja sklepu', 'Kampania reklamowa'] },
  sc: [
    ['Zarząd rozpisuje cele strategiczne na cele działów i wiąże je z planem produkcji. Etap:', 'Wdrażanie i kaskadowanie', ['Analiza', 'Planowanie', 'Kontrola']],
    ['Controller co miesiąc raportuje odchylenia budżetowe i terminowe. Etap:', 'Podjęcie decyzji i kontrola', ['Planowanie', 'Analiza', 'Wdrażanie']],
  ],
});
