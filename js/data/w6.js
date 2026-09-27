'use strict';
/* ŚWIAT 7 · LABORATORIUM JAKOŚCI · P33–P38 */

Q({
  id: 33, w: 6, t: 'SPC',
  q: 'Statystyczne sterowanie procesem (SPC) – narzędzia, interpretacja wykresów.',
  a: [
    '**SPC** (Statistical Process Control) służy do **ciągłej oceny stabilności i zdolności** procesu produkcyjnego – odróżnia **zmienność losową** (naturalny szum) od **przyczyn specjalnych** (np. zużycie narzędzia).',
    '**Narzędzia:** **karty kontrolne Shewharta** (wykres z **linią centralną** oraz **UCL/LCL = ±3σ**), **histogramy**, wskaźniki zdolności **Cp i Cpk** (plik 1: Cp – rozrzut względem tolerancji; Cpk – uwzględnia **wycentrowanie**; norma **Cpk ≥ 1,33**).',
    '**Interpretacja:** karta pokazuje rozrzut **średniej (X̄)**, **odchylenia standardowego (s)** lub **rozstępu (R)**. Proces jest **stabilny**, gdy zmienność wynika **wyłącznie z przyczyn losowych**. Punkty **poza UCL/LCL** lub **nienaturalne sekwencje** (np. **trend 6 punktów**, przesunięcia) = **rozregulowanie (przyczyna specjalna)** → natychmiastowa **akcja korygująca**.'
  ],
  x: [
    'SPC (Statistical Process Control) służy do ciągłej oceny stabilności i zdolności procesu produkcyjnego.',
    '• Narzędzia: karty kontrolne Shewharta (wykresy liniowe z linią centralną oraz górnym i dolnym limitem kontrolnym UCL/LCL równym ±3σ), histogramy, wyliczanie wskaźników zdolności procesu (Cp, Cpk).',
    '• Interpretacja wykresów: karta kontrolna służy do zobrazowania rozrzutu takich parametrów jak średnia (X̄), odchylenie standardowe (s) czy rozstęp (R) wokół wartości przeciętnej. Proces jest stabilny, jeśli zmienność wynika wyłącznie z przyczyn losowych. Jeśli punkty przekroczą linie UCL/LCL (strefa +3σ / −3σ) lub ułożą się w nienaturalne sekwencje (np. trendy 6 punktów, przesunięcia), świadczy to o rozregulowaniu procesu (pojawieniu się przyczyny specjalnej) i wymaga natychmiastowego wdrożenia akcji korygujących.',
    '## Uzupełnienie (plik 1)',
    'SPC odróżnia naturalny szum (zmienność losową) od sygnałów zakłóceń (zmienność specjalna, np. zużycie narzędzia). Cp – szerokość rozrzutu względem tolerancji; Cpk – uwzględnia wycentrowanie procesu; norma to Cpk ≥ 1,33.'
  ],
  k: ['Ocena stabilności i zdolności procesu', 'Karty kontrolne Shewharta', 'Linia centralna, UCL/LCL = ±3σ', 'Histogramy', 'Cp, Cpk (Cpk ≥ 1,33)', 'Karty X̄, s, R', 'Stabilny = tylko przyczyny losowe', 'Poza limitem lub trend 6 pkt = przyczyna specjalna', 'Akcja korygująca'],
  m: 'SPC = DETEKTOR: SZUM (losowy – zostaw) kontra SYGNAŁ (specjalny – reaguj). Czerwone flagi: punkt za ±3σ albo „6 w rzędzie” w górę lub w dół. Cp = czy się mieści, Cpk = czy się mieści I jest na środku; magiczna liczba 1,33.',
  f: [
    ['Karta Shewharta', 'wykres z linią centralną oraz limitami UCL/LCL = ±3σ'],
    ['UCL/LCL', 'górny i dolny limit kontrolny = ±3σ'],
    ['Proces stabilny', 'zmienność wynika wyłącznie z przyczyn losowych'],
    ['Przyczyna specjalna', 'punkty poza UCL/LCL lub nienaturalne sekwencje (np. trend 6 punktów)'],
    ['Cp', 'zdolność: szerokość rozrzutu względem tolerancji (plik 1)'],
    ['Cpk', 'zdolność uwzględniająca wycentrowanie procesu, norma ≥ 1,33 (plik 1)'],
    ['Karty X̄, s, R', 'pokazują rozrzut średniej, odchylenia standardowego i rozstępu'],
  ],
  c: [
    ['Limity kontrolne UCL/LCL na karcie Shewharta to ___', '±3σ', ['±1σ', '±6σ', '±2σ']],
    ['Typowa norma zdolności: Cpk ≥ ___', '1,33', ['1,00', '0,67', '3,4']],
    ['Nienaturalna sekwencja to np. trend ___ punktów', '6', ['2', '3', '20']],
  ],
  tf: [
    ['Proces jest stabilny, gdy zmienność wynika tylko z przyczyn losowych', true],
    ['Punkty poza UCL/LCL świadczą o stabilności procesu', false, 'Punkty poza limitami = ROZREGULOWANIE (przyczyna specjalna)'],
    ['Cp uwzględnia wycentrowanie procesu', false, 'Wycentrowanie uwzględnia Cpk; Cp – tylko szerokość rozrzutu względem tolerancji'],
    ['Trend 6 punktów to nienaturalna sekwencja', true],
    ['Karta kontrolna może pokazywać średnią, odchylenie lub rozstęp', true],
    ['Histogram jest jednym z narzędzi SPC', true],
  ],
  g: { n: 'Proces stabilny czy rozregulowany?', c: {
    'Stabilny': ['Tylko przyczyny losowe', 'Punkty losowo wokół linii centralnej'],
    'Rozregulowany': ['Punkt poza UCL', 'Trend 6 punktów', 'Przesunięcie średniej', 'Zużycie narzędzia'],
  } },
  s: { n: 'Narzędzia SPC', y: ['Karta kontrolna Shewharta', 'Histogram', 'Wskaźnik Cp', 'Wskaźnik Cpk'], x: ['Matryca X', 'Catchball', 'Raport A3'] },
  sc: [
    ['Na karcie X̄ sześć kolejnych punktów rośnie. Interpretacja:', 'Przyczyna specjalna – akcja korygująca', ['Proces stabilny', 'Zmienność losowa – nic nie rób', 'Poszerz tolerancję']],
    ['Proces mieści się w tolerancji, ale jest przesunięty do górnej granicy. Który wskaźnik to pokaże?', 'Cpk', ['Cp', 'RPN', 'OEE']],
  ],
});

Q({
  id: 34, w: 6, t: 'RCA – przyczyny źródłowe',
  q: 'Metody analizy przyczyn źródłowych (RCA – Root Cause Analysis).',
  a: [
    '**RCA** to systematyczne podejście inżynierii jakości do **trwałego eliminowania problemów** (**3. poziom** zarządzania jakością) – usuwamy **źródło**, a nie tylko objawy. Metody:',
    '• **Diagram Ishikawy** (przyczynowo-skutkowy, „rybia ość”) – od jasnego **stwierdzenia skutku** do wszystkich możliwych przyczyn w kategoriach: **Człowiek, Metoda, Materiał, Maszyna, Zarządzanie** (plik 1: wariant 5M+E – także pomiar i środowisko).',
    '• **5 Why** – **sekwencyjne pytanie „Dlaczego?”** aż do głębokiej **przyczyny systemowej**.',
    '• **5W2H** – **7 pytań do opisu wady** przed szukaniem przyczyn: **What, Who, Where, When, Why, How, How many**.',
    '(Plik 1: także **raport 8D** – 8-etapowa, zespołowa procedura rozwiązywania problemów.)'
  ],
  x: [
    'RCA to systematyczne podejście stosowane w inżynierii jakości w celu trwałego eliminowania problemów (na 3. poziomie zarządzania jakością).',
    '• Diagram Ishikawy (diagram przyczynowo-skutkowy): analiza rozpoczyna się od jasnego stwierdzenia skutku (problemu, np. awarii, braku) i prowadzi do identyfikacji wszystkich możliwych przyczyn, pogrupowanych w klasyczne kategorie (Człowiek, Metoda, Materiał, Maszyna, Zarządzanie). Pozwala graficznie uporządkować złożone powiązania.',
    '• Metoda 5 Why? (5 Dlaczego): sekwencyjne zadawanie pytania „Dlaczego?”, aby dotrzeć do głębokiej przyczyny systemowej.',
    '• Metoda 5W2H (siedem pytań do opisu wady): przed szukaniem przyczyn wada musi zostać precyzyjnie opisana – What? (co dokładnie się stało, opis niezgodności, partia), Who? (kto jest zaangażowany), Where? (gdzie), When? (kiedy – dokładny czas), Why? (dlaczego stanowi problem), How? (w jaki sposób i w jakiej sytuacji wystąpił błąd), How many? (mierzalna skala i wolumen wad).',
    '## Uzupełnienie (plik 1)',
    'Ishikawa w wariancie 5M+E: człowiek, maszyna, materiał, metoda, pomiar, środowisko. Raport 8D – 8-etapowa, interdyscyplinarna procedura zespołowego rozwiązywania i dokumentowania problemów jakościowych.'
  ],
  k: ['Trwałe eliminowanie problemów', '3. poziom zarządzania jakością', 'Diagram Ishikawy – od skutku do przyczyn', 'Człowiek, Metoda, Materiał, Maszyna, Zarządzanie', '5 Why – przyczyna systemowa', '5W2H – 7 pytań o wadę', 'Raport 8D (plik 1)'],
  m: 'Najpierw OPISZ wadę (5W2H: What-Who-Where-When-Why-How-How many), potem RYBA (Ishikawa: Człowiek, Metoda, Materiał, Maszyna, Zarządzanie – 4×M + Z), potem KOPARKA (5× „dlaczego?” aż do korzenia).',
  f: [
    ['Diagram Ishikawy', 'od stwierdzenia skutku do przyczyn w kategoriach: człowiek, metoda, materiał, maszyna, zarządzanie'],
    ['5 Why', 'sekwencyjne pytanie „dlaczego?” aż do głębokiej przyczyny systemowej'],
    ['5W2H', '7 pytań do opisu wady: What, Who, Where, When, Why, How, How many'],
    ['How many? (5W2H)', 'mierzalna skala i wolumen wad'],
    ['RCA', 'systematyczne, trwałe eliminowanie problemów – 3. poziom zarządzania jakością'],
    ['Raport 8D', '8-etapowa zespołowa procedura rozwiązywania problemów (plik 1)'],
  ],
  c: [
    ['5W2H to ___ pytań do opisu wady', '7', ['5', '2', '10']],
    ['RCA to ___ poziom zarządzania jakością', '3.', ['1.', '2.', '5.']],
  ],
  tf: [
    ['RCA służy trwałemu eliminowaniu problemów', true],
    ['5W2H stosuje się dopiero po znalezieniu przyczyny', false, 'Wadę opisuje się 5W2H PRZED szukaniem przyczyn'],
    ['Zarządzanie to jedna z kategorii Ishikawy w materiałach', true],
    ['W 5 Why pytanie „Dlaczego?” zadaje się tylko raz', false, 'Pytanie zadaje się SEKWENCYJNIE, aż do przyczyny systemowej'],
    ['RCA to 3. poziom zarządzania jakością', true],
  ],
  o: { n: '5W2H – kolejność pytań', i: ['What?', 'Who?', 'Where?', 'When?', 'Why?', 'How?', 'How many?'] },
  g: { n: 'Która metoda RCA?', c: {
    'Ishikawa': ['Rybia ość', 'Kategorie przyczyn', 'Od skutku do przyczyn'],
    '5 Why': ['Sekwencja pytań „dlaczego?”', 'Przyczyna systemowa'],
    '5W2H': ['What, Who, Where…', 'How many? – skala wad', 'Opis wady przed analizą'],
  } },
  s: [
    { n: 'Kategorie diagramu Ishikawy', y: ['Człowiek', 'Metoda', 'Materiał', 'Maszyna', 'Zarządzanie'], x: ['Marketing', 'Marża', 'Motywacja', 'Magazyn'] },
    { n: 'Metody RCA', y: ['Diagram Ishikawy', '5 Why', '5W2H', 'Raport 8D'], x: ['Matryca X', 'Catchball', 'Heijunka'] },
  ],
  sc: [
    ['Przed analizą przyczyn opisujesz: co, kto, gdzie, kiedy, dlaczego, jak i ile. Metoda:', '5W2H', ['5 Why', 'Diagram Ishikawy', 'FMEA']],
    ['Rysujesz „rybią ość” z kategoriami człowiek, metoda, materiał, maszyna, zarządzanie. Metoda:', 'Diagram Ishikawy', ['5 Why', '5W2H', 'Karta Shewharta']],
  ],
});

Q({
  id: 35, w: 6, t: 'FMEA', gen: 'rpn',
  q: 'Metody oceny ryzyka jakościowego: FMEA procesowa i projektowa.',
  a: [
    '**FMEA** (Failure Mode and Effects Analysis) to **prewencyjna metoda analizy ryzyka jakościowego** – kluczowe zadanie w cyklu rozwoju produktu.',
    '• **DFMEA** (wyrobu, konstrukcji) – w **fazie 2 APQP**, przed sfinalizowaniem projektu: poznanie silnych i słabych stron produktu już przy projektowaniu → konstrukcja optymalna pod kątem **niezawodności, żywotności** i unikania trybów awarii.',
    '• **PFMEA** (procesu) – w **fazie 3 APQP**: przy projektowaniu procesów **przed produkcją seryjną** oraz w jej trakcie (doskonalenie procesów niestabilnych); skupia się na błędach **maszyn, metod i człowieka**.',
    '**Charakterystyki:** **KC** (kluczowa – wpływa na dopasowanie, montaż, żywotność), **SC** (znacząca – ocena **5–8**, specjalne kontrole, Plan Kontroli), **CC** (krytyczna – wymagania regulacyjne: bezpieczeństwo, prawo, środowisko; ocena **9–10**, rygorystyczne kontrole).',
    '(Plik 1: ocena w skali **1–10**: **S** – znaczenie, **O** – częstość, **D** – wykrywalność; **RPN = S × O × D** lub nowszy **Action Priority**.)'
  ],
  x: [
    'FMEA (Failure Mode and Effects Analysis) to prewencyjna metoda analizy ryzyka jakościowego, stanowiąca kluczowe zadanie w cyklu rozwoju produktu.',
    '• DFMEA (Design / wyrobu / konstrukcji): przeprowadzana w fazie 2 APQP przed sfinalizowaniem projektu. Ma na celu poznanie silnych i słabych stron produktu już w fazie projektowania – optymalna konstrukcja pod kątem niezawodności, żywotności i unikania trybów awarii.',
    '• PFMEA (procesu): przeprowadzana w fazie 3 APQP. Stosowana w początkowej fazie projektowania procesów technologicznych przed uruchomieniem produkcji seryjnej oraz w trakcie produkcji seryjnej, aby doskonalić procesy niestabilne. Skupia się na błędach maszyn, metod i człowieka.',
    '## Identyfikacja charakterystyk i ocena ryzyka',
    '• Key Characteristic (KC): wymiar części, materiału lub procesu, którego zmiana wpływa na dopasowanie wyrobu, montaż lub żywotność.',
    '• Significant Characteristic (SC – znacząca): wymiar obserwowany na niższych poziomach montażu. W FMEA SC związane z przyczyną i skutkiem awarii ocenia się w zakresie od 5 do 8. Wyjście poza limit specyfikacji prowadzi do defektów, stąd specjalne kontrole i ujęcie w Planie Kontroli.',
    '• Critical Characteristic (CC – krytyczna): cecha podawana ze względu na wymagania regulacyjne (bezpieczeństwo, prawo, ochrona środowiska). W FMEA CC ocenia się w zakresie 9–10. Niezgodność grozi warunkami niebezpiecznymi dla użytkowników oraz dotkliwymi konsekwencjami prawnymi i finansowymi, dlatego wymaga bezwzględnych, rygorystycznych kontroli.',
    '## Uzupełnienie (plik 1)',
    'Ryzyko ocenia się w skali 1–10 w trzech kryteriach: znaczenie (Severity – S), częstość (Occurrence – O), wykrywalność (Detection – D). Iloczyn RPN = S × O × D (lub nowszy wskaźnik Action Priority) wyznacza priorytety działań przed uruchomieniem produkcji.'
  ],
  k: ['Prewencyjna analiza ryzyka', 'DFMEA – konstrukcja, faza 2 APQP', 'PFMEA – proces, faza 3 APQP', 'Błędy maszyn, metod, człowieka', 'KC – kluczowa', 'SC – znacząca, 5–8', 'CC – krytyczna, 9–10', 'RPN = S × O × D (plik 1)'],
  m: 'D = Design (faza 2), P = Process (faza 3) – „najpierw rysunek, potem linia”. Charakterystyki: KC (Kluczowa – montaż, żywotność), SC 5–8 (Special control, Plan Kontroli), CC 9–10 (Critical – prawo, bezpieczeństwo). S×O×D = Straszne × Częste × Dostrzegalne.',
  f: [
    ['DFMEA', 'FMEA konstrukcji – faza 2 APQP, przed sfinalizowaniem projektu'],
    ['PFMEA', 'FMEA procesu – faza 3 APQP, błędy maszyn, metod i człowieka'],
    ['KC (Key Characteristic)', 'cecha, której zmiana wpływa na dopasowanie, montaż lub żywotność'],
    ['SC (Significant Characteristic)', 'cecha znacząca oceniana 5–8, wymaga specjalnych kontroli i Planu Kontroli'],
    ['CC (Critical Characteristic)', 'cecha krytyczna (bezpieczeństwo, prawo, środowisko) oceniana 9–10'],
    ['RPN', 'S × O × D – priorytet działań (plik 1)'],
    ['Severity (S)', 'znaczenie skutku wady (plik 1)'],
    ['Occurrence (O)', 'częstość występowania (plik 1)'],
    ['Detection (D)', 'wykrywalność (plik 1)'],
  ],
  c: [
    ['DFMEA przeprowadza się w fazie ___ APQP', '2', ['1', '3', '5']],
    ['PFMEA przeprowadza się w fazie ___ APQP', '3', ['1', '2', '4']],
    ['Charakterystyki znaczące (SC) ocenia się w zakresie ___', '5–8', ['1–4', '9–10', '1–10']],
    ['Charakterystyki krytyczne (CC) ocenia się w zakresie ___', '9–10', ['5–8', '1–3', '6–7']],
    ['RPN = S × O × ___', 'D', ['P', 'R', 'C']],
  ],
  tf: [
    ['FMEA to metoda prewencyjna', true],
    ['PFMEA bada ryzyko w konstrukcji wyrobu', false, 'PFMEA = PROCES (faza 3 APQP); konstrukcja to DFMEA'],
    ['Cechy krytyczne CC wynikają z wymagań regulacyjnych', true],
    ['SC ocenia się w zakresie 9–10', false, 'SC: 5–8; CC: 9–10'],
    ['PFMEA stosuje się także w trakcie produkcji seryjnej', true],
    ['RPN = S × O × D', true],
  ],
  g: [
    { n: 'DFMEA czy PFMEA?', c: {
      'DFMEA': ['Faza 2 APQP', 'Konstrukcja wyrobu', 'Niezawodność i żywotność produktu', 'Przed sfinalizowaniem projektu'],
      'PFMEA': ['Faza 3 APQP', 'Proces technologiczny', 'Błędy maszyn, metod i człowieka', 'Doskonalenie procesów niestabilnych'],
    } },
    { n: 'KC, SC czy CC?', c: {
      'KC': ['Wpływ na dopasowanie i montaż', 'Wpływ na żywotność'],
      'SC': ['Ocena 5–8', 'Plan Kontroli', 'Niższe poziomy montażu'],
      'CC': ['Ocena 9–10', 'Bezpieczeństwo, prawo, środowisko', 'Rygorystyczne kontrole'],
    } },
  ],
  s: { n: 'Kryteria oceny ryzyka FMEA (plik 1)', y: ['Znaczenie (S)', 'Częstość (O)', 'Wykrywalność (D)'], x: ['Cena (C)', 'Popularność (P)', 'Marża (M)'] },
  sc: [
    ['Wymiar mocowania pasa bezpieczeństwa wynika z przepisów prawa. To charakterystyka…', 'CC – krytyczna (9–10)', ['SC – znacząca (5–8)', 'KC – kluczowa', 'Nieistotna']],
    ['Analizujesz ryzyko wad nowego projektu wyrobu przed jego zamrożeniem. To…', 'DFMEA', ['PFMEA', 'SPC', '8D']],
    ['Proces zgrzewania jest niestabilny – analizujesz błędy maszyn, metod i ludzi. To…', 'PFMEA', ['DFMEA', 'Hoshin Kanri', 'EVM']],
  ],
});

Q({
  id: 36, w: 6, t: 'Metrologia CMM',
  q: 'Zaawansowane techniki pomiarowe i metrologia współrzędnościowa (CMM).',
  a: [
    '**Metrologia współrzędnościowa (CMM)** polega na precyzyjnym wyznaczaniu **współrzędnych X, Y, Z** punktów na powierzchni obiektu; oprogramowanie buduje **matematyczny obraz geometrii** i porównuje go z **dokumentacją lub modelem CAD**.',
    '• **Systemy stykowe** (stacjonarne CMM) – głowica z **rubinową końcówką** dotyka detalu **impulsowo** (punkt po punkcie) lub w **skanowaniu ciągłym**; **najwyższa dokładność** (często **poniżej 1 µm**).',
    '• **Systemy bezstykowe** (skanery laserowe, światło strukturalne, fotogrametria) – **miliony punktów** (gęsta chmura), **dużo szybciej**, pomiar materiałów **elastycznych**, nieco mniejsza dokładność.',
    '**Bazowanie (alignment) – reguła 3-2-1:** **płaszczyzna** bazowa blokuje **3** stopnie swobody, **linia/oś** – kolejne **2**, **punkt** – ostatni, **6.** (początek układu X = Y = Z = 0).',
    'Zastosowanie: wymiary liniowe i **tolerancje geometryczne GD&T** – kształtu (płaskość, okrągłość, walcowość), kierunku (równoległość, prostopadłość), położenia (pozycja, współosiowość); raporty liczbowe lub **kolorowe mapy odchyłek 3D**. (Plik 1: także **ramiona pomiarowe** i **tomografia CT** – wady wewnętrzne.)'
  ],
  x: [
    'Metrologia współrzędnościowa (CMM – Coordinate Measuring Machine) to dziedzina metrologii przemysłowej polegająca na precyzyjnym określaniu przestrzennych współrzędnych (X, Y, Z) punktów leżących na powierzchni obiektu. Oprogramowanie buduje z nich matematyczny obraz geometrii detalu i porównuje go z wymaganiami dokumentacji technicznej lub nominalnym modelem CAD.',
    '## Podstawowe rodzaje systemów współrzędnościowych',
    '• Systemy stykowe (stacjonarne maszyny CMM): fizyczna głowica pomiarowa z rubinową końcówką (trzpieniem) dotyka powierzchni detalu. Działa impulsowo (punkt po punkcie) lub w trybie skanowania ciągłego. Najwyższa dokładność (często poniżej 1 µm).',
    '• Systemy bezstykowe (optyczne i laserowe): skanery laserowe, światło strukturalne lub fotogrametria. Rejestrują miliony współrzędnych w postaci gęstej chmury punktów. Znacznie szybsze, pozwalają mierzyć materiały elastyczne, zazwyczaj z nieco mniejszą dokładnością niż stykowe.',
    '## Bazowanie pomiarowe (alignment) – reguła 3-2-1',
    'Aby ocenić odchyłki wymiarowe, kształtu i położenia, obiekt musi zostać prawidłowo usytuowany w przestrzeni pomiarowej programu (bazowanie, wiązanie stopni swobody):',
    '• Płaszczyzna bazowa (baza główna): blokuje 3 stopnie swobody (obrót wokół dwóch osi i przesunięcie wzdłuż jednej). Najczęściej na najgładszej, stabilnej powierzchni płaskiej.',
    '• Linia / oś bazowa (baza pomocnicza): blokuje kolejne 2 stopnie swobody (obrót wokół ostatniej osi i przesunięcie). Np. prosta przez dwa punkty lub oś symetrii dwóch otworów.',
    '• Punkt bazowy (początek układu): blokuje ostatni, 6. stopień swobody (przesunięcie wzdłuż ostatniej osi) – punkt zerowy X = 0, Y = 0, Z = 0.',
    '## Zastosowanie w kontroli jakości',
    'Kontrola wymiarów liniowych (odległości, średnice otworów, rozstawy) i weryfikacja tolerancji geometrycznych (GD&T): odchyłki kształtu (płaskość, okrągłość, walcowość), kierunku (równoległość, prostopadłość) oraz położenia (pozycja, współosiowość). Wyniki – raporty liczbowe lub kolorowe mapy odchyłek 3D.',
    '## Uzupełnienie (plik 1)',
    'Metrologia współrzędnościowa obejmuje też ramiona pomiarowe i tomografię komputerową (CT), która w jednym skanie bada geometrię zewnętrzną i wady wewnętrzne (pory, pęknięcia).'
  ],
  k: ['Współrzędne X, Y, Z', 'Porównanie z CAD / dokumentacją', 'Stykowe – rubinowa końcówka, poniżej 1 µm', 'Bezstykowe – chmura punktów, szybciej', 'Bazowanie 3-2-1', 'Płaszczyzna 3, linia 2, punkt 1 stopień', 'GD&T: kształt, kierunek, położenie', 'Mapy odchyłek 3D'],
  m: 'Reguła 3-2-1 = „STÓŁ – LINIJKA – PINEZKA”: połóż detal na stole (płaszczyzna blokuje 3), dosuń do linijki (linia – 2), wbij pinezkę w róg (punkt – 1) → 6 stopni swobody zablokowanych. Stykowa = dokładna i wolna (rubin), bezstykowa = szybka chmura punktów.',
  f: [
    ['CMM', 'wyznaczanie współrzędnych X, Y, Z punktów powierzchni i porównanie z modelem CAD'],
    ['System stykowy CMM', 'głowica z rubinową końcówką, impulsowo lub skanowanie ciągłe; najwyższa dokładność'],
    ['System bezstykowy', 'skanery laserowe, światło strukturalne, fotogrametria – gęsta chmura punktów'],
    ['Płaszczyzna bazowa', 'blokuje 3 stopnie swobody (2 obroty, 1 przesunięcie)'],
    ['Linia / oś bazowa', 'blokuje kolejne 2 stopnie swobody'],
    ['Punkt bazowy', 'blokuje ostatni, 6. stopień swobody – początek układu X = Y = Z = 0'],
    ['GD&T', 'tolerancje geometryczne: kształtu, kierunku i położenia'],
    ['Tomografia CT', 'geometria zewnętrzna i wady wewnętrzne w jednym skanie (plik 1)'],
  ],
  c: [
    ['Reguła bazowania CMM: ___', '3-2-1', ['1-2-3', '5-4-3', '6-0-0']],
    ['Dokładność stykowych CMM to często poniżej ___', '1 µm', ['1 mm', '0,1 mm', '10 µm']],
    ['Płaszczyzna bazowa blokuje ___ stopnie swobody', '3', ['1', '2', '6']],
  ],
  tf: [
    ['Systemy stykowe są zwykle dokładniejsze niż bezstykowe', true],
    ['Punkt bazowy blokuje 3 stopnie swobody', false, 'Punkt bazowy blokuje OSTATNI, 6. stopień; płaszczyzna blokuje 3'],
    ['Okrągłość to odchyłka kształtu', true],
    ['Współosiowość to odchyłka kierunku', false, 'Współosiowość to odchyłka POŁOŻENIA'],
    ['Systemy bezstykowe pozwalają mierzyć materiały elastyczne', true],
  ],
  o: { n: 'Bazowanie 3-2-1', i: ['Płaszczyzna bazowa (3 stopnie)', 'Linia / oś bazowa (2 stopnie)', 'Punkt bazowy (1 stopień)'] },
  g: [
    { n: 'Stykowy czy bezstykowy?', c: {
      'Stykowy': ['Rubinowa końcówka', 'Punkt po punkcie', 'Dokładność poniżej 1 µm', 'Stacjonarna maszyna CMM'],
      'Bezstykowy': ['Miliony punktów – chmura', 'Materiały elastyczne', 'Znacznie szybszy', 'Światło strukturalne lub laser'],
    } },
    { n: 'Rodzaj odchyłki GD&T', c: {
      'Kształt': ['Płaskość', 'Okrągłość', 'Walcowość'],
      'Kierunek': ['Równoległość', 'Prostopadłość'],
      'Położenie': ['Pozycja', 'Współosiowość'],
    } },
  ],
  sc: [
    ['Musisz zmierzyć miękką uszczelkę, nie odkształcając jej. Wybierasz…', 'System bezstykowy (optyczny)', ['Stykową CMM z rubinem', 'Suwmiarkę', 'Twardościomierz']],
    ['Po płaszczyźnie i osi bazowej definiujesz punkt X = Y = Z = 0. Ile stopni swobody on blokuje?', '1 (ostatni, 6.)', ['2', '3', '6']],
  ],
});

Q({
  id: 37, w: 6, t: 'ISO 9001 i normy branżowe',
  q: 'Systemy zarządzania jakością zgodne z ISO 9001 i normami branżowymi.',
  a: [
    '**ISO 9001:2015** – międzynarodowa, **uniwersalna podstawa systemów zarządzania jakością (SZJ)**: **podejście procesowe**, cykl **PDCA** (Planuj-Wykonaj-Sprawdź-Działaj), **zadowolenie klienta** (plik 1: także myślenie oparte na ryzyku).',
    'Normy branżowe:',
    '• **Motoryzacja – IATF 16949:2016** (IATF + ISO) – zastąpiła normy krajowe: **QS-9000** (USA, Wielka Trójka), **VDA 6.1** (Niemcy), **EAQF** (Francja), **AVSQ** (Włochy).',
    '• **Lotnictwo, kosmos, obronność – AS/EN 9100** (11 firm lotniczych, m.in. Boeing, pod egidą **IAQG**): bezpieczeństwo, niezawodność, **zarządzanie konfiguracją**, procesy specjalne; **AS9145** – lotnicze **APQP i PPAP**.',
    '• **Obronność – AQAP** (NATO): m.in. zarządzanie ryzykiem, rządowy przedstawiciel jakości **GQAR**, konfiguracja, pomiary wg **ISO 10012**; np. AQAP **2110** (projektowanie i produkcja), **2120** (produkcja), **2130** (badania).',
    '• **Kolej – IRIS / ISO/TS 22163**: ISO 9001 + **RAMS (EN 50126)**, geometria torów (EN 13803), bezpieczeństwo zderzeniowe (PN-EN 15227).'
  ],
  x: [
    '## ISO 9001:2015',
    'Międzynarodowy standard – uniwersalna podstawa budowania systemów zarządzania jakością (SZJ) we wszystkich organizacjach. Opiera się na podejściu procesowym, cyklu PDCA (Planuj-Wykonaj-Sprawdź-Działaj) oraz zadowoleniu klienta.',
    '## Przemysł motoryzacyjny – IATF 16949:2016',
    'Wprowadzony przez Międzynarodową Grupę Zadaniową ds. Motoryzacji (IATF) we współpracy z ISO. Ujednolicił i zastąpił starsze normy regionalne i krajowe:',
    '◦ QS-9000 (USA): opracowana przez „Wielką Trójkę” (Ford, Chrysler, GM); wymagania ISO 9001, wymagania sektorowe i specyficzne wymagania klientów.',
    '◦ VDA 6.1 (Niemcy): standard niemieckiego stowarzyszenia przemysłu motoryzacyjnego (VDA).',
    '◦ EAQF (Francja): francuski standard jakości Peugeot Citroën i Renault.',
    '◦ AVSQ (Włochy): włoski standard stosowany głównie przez Fiata.',
    '• Korzyści z IATF 16949: poprawa jakości (ciągłe doskonalenie), wzrost efektywności (eliminacja marnotrawstwa), zgodność z przepisami i wymaganiami koncernów, lepsze zarządzanie ryzykiem, wzrost konkurencyjności, lepsza komunikacja w łańcuchu dostaw.',
    '## Przemysł lotniczy, kosmiczny i obronny – AS/EN 9100 / AS9145',
    'Standard opracowany przez 11 wiodących firm lotniczych (m.in. Boeing, GE, Pratt & Whitney, Lockheed Martin) pod egidą IAQG. Uzupełnia ISO 9001 o wymagania: bezpieczeństwo, niezawodność, zarządzanie konfiguracją, procesy specjalne, walidacja procesów, weryfikacja zakupów, kontrola oprogramowania. AS9145 – ramy zarządzania nowymi uruchomieniami przez lotnicze APQP i PPAP.',
    '## Standardy Zapewnienia Jakości NATO – AQAP',
    'Publikacje standaryzacyjne NATO dla przemysłu obronnego i zbrojeniowego przy umowach dla wojska. Rozszerzają ISO 9001 o: zarządzanie ryzykiem, wspomaganie nadzoru przez rządowego przedstawiciela jakości GQAR, zarządzanie konfiguracją, planowanie jakości, nieuszkadzalność/obsługiwalność, nadzór nad pomiarami wg ISO 10012. Dzielą się na kontraktowe (AQAP 2110 – projektowanie i produkcja, AQAP 2120 – produkcja, AQAP 2130 – badania) oraz wytyczne dla auditorów i GQAR (np. AQAP 2000, 2009, 2070).',
    '## Przemysł kolejowy – IRIS / ISO/TS 22163',
    'Standard dla przemysłu kolejowego (tabor, sygnalizacja, systemy IT) – odpowiedź na brak regulacji porównywalnych z lotnictwem. Opiera się na ISO 9001, dodając wymagania RAMS (niezawodność, dostępność, utrzymanie, bezpieczeństwo wg EN 50126), geometrii torów (EN 13803) i bezpieczeństwa zderzeniowego (PN-EN 15227), zapewniając ujednoliconą ocenę w całym łańcuchu dostawców.',
    '## Uzupełnienie (plik 1)',
    'ISO 9001 opiera się też na myśleniu opartym na ryzyku; IATF 16949 akcentuje bezwzględne zapobieganie brakom.'
  ],
  k: ['ISO 9001:2015 – uniwersalna podstawa SZJ', 'Podejście procesowe, PDCA, klient', 'IATF 16949 – motoryzacja', 'Zastąpiła QS-9000, VDA 6.1, EAQF, AVSQ', 'AS/EN 9100 – lotnictwo (IAQG)', 'AS9145 – APQP i PPAP', 'AQAP – NATO, GQAR', 'IRIS / ISO/TS 22163 – kolej, RAMS'],
  m: 'Branże jak pojazdy: AUTO = IATF 16949 (dawniej USA-QS, Niemcy-VDA, Francja-EAQF, Włochy-AVSQ), SAMOLOT = AS 9100 (AS jak Air-Space), CZOŁG = AQAP (A jak Armia, NATO, GQAR), POCIĄG = IRIS (RAMS). Podstawa wszystkiego: ISO 9001 + PDCA.',
  nx: ['Poka', 'DMAIC', 'Six'],
  f: [
    ['ISO 9001:2015', 'uniwersalna podstawa SZJ: podejście procesowe, PDCA, zadowolenie klienta'],
    ['IATF 16949:2016', 'norma motoryzacyjna – zastąpiła QS-9000, VDA 6.1, EAQF i AVSQ'],
    ['QS-9000', 'dawna norma USA opracowana przez Wielką Trójkę (Ford, Chrysler, GM)'],
    ['VDA 6.1', 'dawny standard niemieckiego stowarzyszenia przemysłu motoryzacyjnego'],
    ['EAQF', 'dawny francuski standard Peugeot Citroën i Renault'],
    ['AVSQ', 'dawny włoski standard stosowany głównie przez Fiata'],
    ['AS/EN 9100', 'norma lotnicza, kosmiczna i obronna – IAQG, 11 firm lotniczych'],
    ['AS9145', 'lotnicze APQP i PPAP dla nowych uruchomień'],
    ['AQAP', 'standardy zapewnienia jakości NATO dla przemysłu obronnego'],
    ['GQAR', 'rządowy przedstawiciel jakości (AQAP)'],
    ['AQAP 2110', 'AQAP dla projektowania i produkcji'],
    ['AQAP 2120', 'AQAP dla produkcji'],
    ['AQAP 2130', 'AQAP dla badań'],
    ['IRIS / ISO/TS 22163', 'norma kolejowa: ISO 9001 + RAMS, geometria torów, bezpieczeństwo zderzeniowe'],
    ['RAMS', 'niezawodność, dostępność, utrzymanie, bezpieczeństwo (EN 50126)'],
    ['ISO 10012', 'norma nadzoru nad pomiarami przywołana w AQAP'],
  ],
  c: [
    ['IATF 16949 zastąpiła m.in. amerykańską normę ___', 'QS-9000', ['VDA 6.1', 'AS9100', 'AQAP 2110']],
    ['RAMS w IRIS opiera się na normie ___', 'EN 50126', ['EN 13803', 'ISO 10012', 'PN-EN 15227']],
    ['Lotnicze APQP i PPAP wprowadza norma ___', 'AS9145', ['AS9100', 'IATF 16949', 'AQAP 2130']],
    ['AQAP dla produkcji to AQAP ___', '2120', ['2110', '2130', '2070']],
    ['AS9100 powstała pod egidą ___', 'IAQG', ['IATF', 'NATO', 'VDA']],
  ],
  tf: [
    ['IATF 16949 zastąpiła QS-9000, VDA 6.1, EAQF i AVSQ', true],
    ['AS9100 to norma kolejowa', false, 'AS/EN 9100 – lotnictwo, kosmos, obronność; kolej to IRIS (ISO/TS 22163)'],
    ['AQAP to standardy NATO', true],
    ['EAQF to norma włoska stosowana przez Fiata', false, 'EAQF – Francja (Peugeot Citroën, Renault); Fiat – AVSQ'],
    ['ISO 9001 opiera się na podejściu procesowym i cyklu PDCA', true],
    ['GQAR to rządowy przedstawiciel jakości w AQAP', true],
  ],
  o: { n: 'Cykl PDCA', i: ['Planuj (Plan)', 'Wykonaj (Do)', 'Sprawdź (Check)', 'Działaj (Act)'] },
  g: [
    { n: 'Norma → branża', c: {
      'Motoryzacja': ['IATF 16949', 'QS-9000', 'VDA 6.1', 'EAQF', 'AVSQ'],
      'Lotnictwo': ['AS/EN 9100', 'AS9145', 'IAQG'],
      'Obronność': ['AQAP', 'GQAR', 'AQAP 2110'],
      'Kolej': ['IRIS', 'ISO/TS 22163', 'RAMS (EN 50126)'],
    } },
    { n: 'Dawna norma motoryzacyjna → kraj', c: {
      'USA': ['QS-9000', 'Ford, Chrysler, GM'],
      'Niemcy': ['VDA 6.1'],
      'Francja': ['EAQF', 'Peugeot Citroën i Renault'],
      'Włochy': ['AVSQ', 'Fiat'],
    } },
  ],
  sc: [
    ['Dostawca foteli dla fabryki samochodów musi mieć certyfikat…', 'IATF 16949', ['AS9100', 'AQAP 2120', 'IRIS']],
    ['Producent wózków tramwajowych wdraża RAMS wg EN 50126. Norma:', 'IRIS (ISO/TS 22163)', ['AS9100', 'IATF 16949', 'AQAP']],
    ['Kontrakt dla wojska wymaga nadzoru przedstawiciela GQAR. Norma:', 'AQAP', ['IRIS', 'IATF 16949', 'AS9145']],
  ],
});

Q({
  id: 38, w: 6, t: 'Zero Defektów, Six Sigma, Lean',
  q: '„Zero Defektów” i metody doskonalenia: Six Sigma, Lean Quality.',
  a: [
    '**Zero Defektów** – filozofia (**Philip Crosby**): jedynym akceptowalnym standardem jest **brak jakichkolwiek wad**, a podstawą jest **profilaktyka i planowanie**; akcentuje to też **Trylogia Jakości J. Jurana**: **planowanie → kontrola → poprawa jakości** (plik 1: „dobrze za pierwszym razem”).',
    '**Lean (Dom Toyoty)** – ciągłe doskonalenie przez **eliminację strat**; narzędzie **5S**: **Sortowanie, Systematyka, Sprzątanie, Standaryzacja, Samodyscyplina** (plik 1: **Poka-Yoke** fizycznie uniemożliwia błąd).',
    '**Six Sigma** – **redukcja zmienności** procesu pętlą **DMAIC** (Define-Measure-Analyze-Improve-Control; plik 1: cel **3,4 DPMO**). **VOC** (głos klienta) tłumaczy potrzeby na mierzalne **CTQ**; **drzewko CTQ** ustala limity **USL/LSL** i definicję defektu (CTQ = mierzalne wyjście **Y**); **CQA** szuka problemów, analizując **diagram przepływu** procesu (wejścia dostawcy / wyjścia dla klienta).'
  ],
  x: [
    '## Zero Defektów',
    'Filozofia (popularyzowana przez Philipa Crosby’ego), która zakłada, że jedynym akceptowalnym standardem jakościowym jest brak jakichkolwiek wad, a podstawą sukcesu jest profilaktyka i planowanie; silnie akcentuje to również Joseph Juran w Trylogii Jakości (planowanie jakości → kontrola jakości → poprawa jakości).',
    '## Metody doskonalenia Lean i Domu Toyoty',
    'Dążą do ciągłego doskonalenia przez eliminację strat. Wykorzystują Metodę 5S (1. Sortowanie, 2. Systematyka, 3. Sprzątanie, 4. Standaryzacja, 5. Samodyscyplina) jako narzędzie budowania zaangażowania pracowników i organizacji wydajnych stanowisk.',
    '## Six Sigma i koncepcja CTQ / CQA',
    'Metodologia redukcji zmienności procesu za pomocą pętli DMAIC. Kluczowe jest przełożenie wymagań klienta na mierzalne parametry jakościowe:',
    '• Voice of Customer (VOC – głos klienta): narzędzia (wywiady, grupy fokusowe, badania) tłumaczące subiektywne potrzeby klienta na mierzalne wartości krytyczne dla procesu – Critical to Quality (CTQ).',
    '• Drzewko CTQ: przekłada potrzeby na twarde limity specyfikacji (USL / LSL) i definiuje, co jest usterką (defektem). CTQ jest zawsze mierzalną wielkością wyjściową Y procesu. Przykład: VOC „Chciałbym więcej zarabiać” → miernik CTQ: wartość 1 h pracy netto → cel/specyfikacja: > 100 PLN/h.',
    '• Analiza CQA (Critical-to-Quality Analysis): odnajdywanie problemów w procesie przez studiowanie jego diagramu przepływu – analiza parametrów, w których wejścia (od dostawcy) i wyjścia (dla klienta) determinują kolejne czynności; pozwala określić charakterystyki krytyczne niezbędne do pełnego zadowolenia klienta.',
    '## Uzupełnienie (plik 1)',
    'Zero Defektów = kultura jakości i poprawność za pierwszym razem. Six Sigma dąży do maks. 3,4 błędu na milion możliwości (DPMO) cyklem DMAIC (Define-Measure-Analyze-Improve-Control). Lean Quality stosuje Poka-Yoke – rozwiązania fizycznie uniemożliwiające błąd.'
  ],
  k: ['Zero Defektów – Crosby, brak wad', 'Profilaktyka i planowanie', 'Trylogia Jurana: planowanie → kontrola → poprawa', 'Lean – eliminacja strat', '5S: Sortowanie … Samodyscyplina', 'Six Sigma – redukcja zmienności, DMAIC', 'VOC → CTQ (USL/LSL)', 'CQA – diagram przepływu', '3,4 DPMO (plik 1)'],
  m: 'ZD = Crosby „zero błędów” + Juran „P-K-P” (Planuj, Kontroluj, Popraw). 5S = Sortuj, Systematyzuj, Sprzątaj, Standaryzuj, Samodyscyplinuj się. Six Sigma = DMAIC („Dobry Mechanik Analizuje I Czyści”) + VOC → CTQ („chcę więcej zarabiać” → powyżej 100 zł/h).',
  nx: ['PDCA'],
  f: [
    ['Zero Defektów', 'filozofia Crosby’ego: jedyny akceptowalny standard to brak wad; profilaktyka i planowanie'],
    ['Trylogia Jakości Jurana', 'planowanie jakości → kontrola jakości → poprawa jakości'],
    ['5S', 'Sortowanie, Systematyka, Sprzątanie, Standaryzacja, Samodyscyplina'],
    ['VOC', 'Voice of Customer – narzędzia tłumaczące potrzeby klienta na CTQ'],
    ['CTQ', 'Critical to Quality – mierzalna wielkość wyjściowa Y procesu'],
    ['Drzewko CTQ', 'przekłada potrzeby na limity USL/LSL i definiuje defekt'],
    ['CQA', 'Critical-to-Quality Analysis – szukanie problemów przez analizę diagramu przepływu'],
    ['DMAIC', 'Define-Measure-Analyze-Improve-Control – pętla Six Sigma'],
    ['Six Sigma', 'redukcja zmienności procesu; cel 3,4 DPMO (plik 1)'],
    ['Poka-Yoke', 'rozwiązanie fizycznie uniemożliwiające błąd (plik 1)'],
  ],
  c: [
    ['Six Sigma: maks. ___ błędu na milion możliwości (plik 1)', '3,4', ['1,33', '34', '0,34']],
    ['Filozofię Zero Defektów popularyzował ___', 'Philip Crosby', ['Joseph Juran', 'Taiichi Ohno', 'Walter Shewhart']],
    ['CTQ jest zawsze mierzalną wielkością wyjściową ___ procesu', 'Y', ['X', 'Z', 'N']],
  ],
  tf: [
    ['Zero Defektów popularyzował Philip Crosby', true],
    ['Trylogia Jurana: planowanie → kontrola → poprawa jakości', true],
    ['Pierwsze S w 5S to Samodyscyplina', false, 'Kolejność: Sortowanie, Systematyka, Sprzątanie, Standaryzacja, Samodyscyplina (ostatnia)'],
    ['VOC tłumaczy potrzeby klienta na mierzalne CTQ', true],
    ['CQA polega na analizie diagramu przepływu procesu', true],
    ['Six Sigma zwiększa zmienność procesu', false, 'Six Sigma REDUKUJE zmienność procesu (DMAIC)'],
  ],
  o: [
    { n: 'Metoda 5S', i: ['Sortowanie', 'Systematyka', 'Sprzątanie', 'Standaryzacja', 'Samodyscyplina'] },
    { n: 'Cykl DMAIC', i: ['Define', 'Measure', 'Analyze', 'Improve', 'Control'] },
    { n: 'Trylogia Jakości Jurana', i: ['Planowanie jakości', 'Kontrola jakości', 'Poprawa jakości'] },
    { n: 'Od głosu klienta do specyfikacji', i: ['VOC – głos klienta', 'CTQ – miernik', 'Specyfikacja (USL/LSL)'] },
  ],
  g: { n: 'Zero Defektów, Lean czy Six Sigma?', c: {
    'Zero Defektów': ['Philip Crosby', 'Brak jakichkolwiek wad', 'Trylogia Jurana'],
    'Lean': ['5S', 'Eliminacja strat', 'Poka-Yoke'],
    'Six Sigma': ['DMAIC', 'VOC → CTQ', 'Drzewko CTQ', 'CQA', '3,4 DPMO'],
  } },
  sc: [
    ['Klient: „chciałbym więcej zarabiać” → miernik: wartość 1 h pracy netto → cel: powyżej 100 zł/h. To przykład…', 'VOC → CTQ', ['5S', 'Trylogia Jurana', 'PDCA']],
    ['Wtyczkę da się włożyć tylko w jeden sposób. To (plik 1)…', 'Poka-Yoke', ['DMAIC', 'Kaizen', 'Andon']],
  ],
});
