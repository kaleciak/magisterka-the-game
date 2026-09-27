'use strict';
/* ŚWIAT 5 · DOJO TOYOTY · P21–P26 */

Q({
  id: 21, w: 4, t: 'TPS – Dom Toyoty',
  q: 'TPS (Toyota Production System – System Produkcyjny Toyoty).',
  a: [
    '**TPS** to zintegrowany model ukierunkowany na **maksymalizację wartości i całkowitą eliminację strat (muda)**, przedstawiany jako **Dom Toyoty**:',
    '• **Dach** – cel: **The Best: Quality, Cost, Safety, Delivery, Moral (QCSDM)**.',
    '• **Centrum** – **LUDZIE i praca grupowa**, realizujący **ciągłe doskonalenie (Kaizen)**.',
    '• **Dwa filary** – **Just-in-Time** (Pull/Kanban, One-Piece-Flow, Takt Time, SMED, Heijunka) i **Jidoka** (automatyczne przerywanie, Poka-Yoke, Andon, wbudowana kontrola jakości, 5 Why / Ishikawa).',
    '• **Fundamenty** – kultura **5S**, **zarządzanie wizualne**, **standaryzacja**, a u podstaw **wartość i eliminacja strat**.',
    '(Plik 1: TPS eliminuje **Muda** – marnotrawstwo, **Muri** – przeciążenie i **Mura** – zmienność.)'
  ],
  x: [
    'TPS (Toyota Production System) to zintegrowany model ukierunkowany jako całość na maksymalizację wartości i całkowitą eliminację strat (muda). Najwyższym celem operacyjnym (dach domu) jest standard The Best: Quality, Cost, Safety, Delivery, Moral (QCSDM). Konstrukcja opiera się na zaangażowaniu LUDZI i pracy grupowej (centrum domu) realizujących ciągłe doskonalenie (Kaizen). Filarami TPS są Just-in-Time (JiT) oraz Jidoka, a fundamentami: kultura 5S, zarządzanie wizualne oraz standaryzacja.',
    '## Dom Toyoty (diagram)',
    '• Dach: Toyota Production System – The Best: Quality, Cost, Safety, Delivery, Moral (QCSDM).',
    '• Centrum: LUDZIE – praca grupowa – ciągłe doskonalenie.',
    '• Filar JIT: System Pull / Kanban, One-Piece-Flow, Takt Time, SMED, Heijunka.',
    '• Filar Jidoka: automatyczne przerywanie, Poka-Yoke, Andon, wbudowana kontrola jakości, 5 Why? / diagram Ishikawy.',
    '• Fundament: 5S, zarządzanie wizualne; poniżej standaryzacja; u podstaw – wartość i eliminacja strat.',
    '## Uzupełnienie (plik 1)',
    'TPS to filozofia bezwzględnej eliminacji marnotrawstwa (Muda), przeciążenia (Muri) i zmienności (Mura).'
  ],
  k: ['Maksymalizacja wartości, eliminacja strat (muda)', 'Dach: QCSDM', 'Centrum: ludzie, praca grupowa, Kaizen', 'Filar: Just-in-Time', 'Filar: Jidoka', 'Fundament: 5S', 'Zarządzanie wizualne', 'Standaryzacja', 'Muda, Muri, Mura'],
  m: 'Zbuduj DOM od dołu: podłoga „wartość i eliminacja strat” → Standaryzacja → 5S + zarządzanie wizualne → FILARY: lewy JIT, prawy Jidoka → w środku LUDZIE (Kaizen) → DACH QCSDM (Quality, Cost, Safety, Delivery, Moral = „Kiedy Szef Dostarcza Morale”).',
  nx: ['Kanban', 'Pull', 'SMED', 'Takt', 'Andon', 'One-Piece', 'Poka', 'Heijunka', '5 Why', 'Ishikawa', 'Automatyczne przerywanie'],
  f: [
    ['QCSDM', 'Quality, Cost, Safety, Delivery, Moral – dach Domu Toyoty (The Best)'],
    ['Kaizen', 'ciągłe doskonalenie – centrum domu (ludzie, praca grupowa)'],
    ['Filary TPS', 'Just-in-Time (lewy) i Jidoka (prawy)'],
    ['Fundamenty TPS', '5S, zarządzanie wizualne, standaryzacja'],
    ['Muda', 'marnotrawstwo, strata'],
    ['Muri', 'przeciążenie'],
    ['Mura', 'zmienność, nierównomierność'],
  ],
  c: [
    ['Dach Domu Toyoty: The Best – ___', 'QCSDM', ['PDCA', 'DMAIC', 'OTIF']],
    ['Lewy filar Domu Toyoty to ___', 'Just-in-Time', ['Jidoka', 'Kaizen', '5S']],
    ['Prawy filar Domu Toyoty to ___', 'Jidoka', ['Just-in-Time', 'Heijunka', 'Standaryzacja']],
  ],
  tf: [
    ['Filarami TPS są Just-in-Time i Jidoka', true],
    ['Dachem Domu Toyoty jest 5S', false, 'Dach = QCSDM (The Best); 5S to fundament'],
    ['W centrum domu są ludzie i praca grupowa', true],
    ['Heijunka jest elementem filaru Jidoka', false, 'Heijunka należy do filaru JUST-IN-TIME'],
    ['Standaryzacja jest fundamentem TPS', true],
    ['Muri oznacza marnotrawstwo', false, 'Muri = przeciążenie; marnotrawstwo to Muda'],
  ],
  o: { n: 'Dom Toyoty od podstawy do dachu', i: ['Wartość i eliminacja strat', 'Standaryzacja', '5S i zarządzanie wizualne', 'Filary JIT i Jidoka + Ludzie', 'Dach: QCSDM'] },
  g: { n: 'Gdzie w Domu Toyoty?', c: {
    'Dach': ['QCSDM – The Best', 'Quality, Cost, Safety'],
    'Centrum': ['Ludzie', 'Praca grupowa', 'Ciągłe doskonalenie (Kaizen)'],
    'Filar JIT': ['System Pull / Kanban', 'One-Piece-Flow', 'Takt Time', 'SMED', 'Heijunka'],
    'Filar Jidoka': ['Automatyczne przerywanie', 'Poka-Yoke', 'Andon', '5 Why / Ishikawa'],
    'Fundament': ['5S', 'Zarządzanie wizualne', 'Standaryzacja', 'Wartość i eliminacja strat'],
  } },
  sc: [
    ['Operator dźwiga za ciężkie detale i jest przeciążony. Który wróg TPS (plik 1)?', 'Muri', ['Muda', 'Mura', 'Kaizen']],
    ['Gdzie w Domu Toyoty znajduje się Kaizen?', 'W centrum (ludzie, praca grupowa)', ['W dachu', 'W filarze Jidoka', 'W fundamencie']],
  ],
});

Q({
  id: 22, w: 4, t: 'JIT – Just in Time',
  q: 'JIT (Just in Time – Dokładnie na czas).',
  a: [
    '**JIT** to filozofia i system – **lewy filar Domu Toyoty** – stawiający **klienta na piedestale**: dostarczamy wyroby **dokładnie w takiej ilości**, jakiej wymaga klient, i **dokładnie w określonym przez niego czasie** (plik 1: bez magazynów i nadprodukcji).',
    'Narzędzia Lean integrowane w JIT:',
    '• **System Pull + karty Kanban** – sterowanie przepływem wg **rzeczywistego zużycia** na kolejnych stanowiskach (system ssący);',
    '• **One-Piece-Flow** – przepływ **jednej sztuki**, eliminacja zapasów międzyoperacyjnych;',
    '• **Takt Time** – tempo produkcji dopasowane do **rytmu zamówień klienta**;',
    '• **SMED** (Single Minute Exchange of Die) – **szybkie przezbrajanie**, krótsze przestoje;',
    '• **Heijunka** – **poziomowanie** sekwencji i wolumenu produkcji.'
  ],
  x: [
    'Filozofia i system stanowiący lewy filar konstrukcji Domu Toyoty. System stawiający klienta na piedestale: przedsiębiorstwo dostarcza wyroby dokładnie w takiej ilości, jakiej wymaga klient, w dokładnie określonym przez niego czasie. JiT integruje narzędzia Lean Manufacturing:',
    '• System Pull i karty Kanban: sterowanie przepływem materiałów na podstawie rzeczywistego zużycia na kolejnych stanowiskach (system ssący).',
    '• One-Piece-Flow: przepływ jednej sztuki w celu eliminacji zapasów międzyoperacyjnych.',
    '• Takt Time: dostosowanie tempa produkcji do czasu i rytmu zamówień klienta.',
    '• SMED (Single Minute Exchange of Die): technologia szybkiego przezbrajania maszyn w celu redukcji czasu przestojów.',
    '• Heijunka: poziomowanie sekwencji i wolumenu produkcji.',
    '## Uzupełnienie (plik 1)',
    'JIT eliminuje magazyny i nadprodukcję – produkujemy dokładnie to, czego klient potrzebuje, w wymaganej liczbie i dokładnie na czas.'
  ],
  k: ['Lewy filar Domu Toyoty', 'Klient na piedestale', 'Dokładnie ilość i czas wg klienta', 'Pull + Kanban', 'One-Piece-Flow', 'Takt Time', 'SMED', 'Heijunka'],
  m: 'JIT = „Pan Oczekuje Towaru Szybko i Harmonijnie”: Pull/Kanban, One-Piece-Flow, Takt Time, SMED, Heijunka. Lewy filar = JIT (L jak „Lewy” i „Logistyka czasu”).',
  nx: ['Muda', 'Jidoka', 'Kaizen', 'QCSDM', '5S', 'Standaryzacja', 'Andon', 'Poka'],
  f: [
    ['System Pull + Kanban', 'sterowanie przepływem na podstawie rzeczywistego zużycia (system ssący)'],
    ['One-Piece-Flow', 'przepływ jednej sztuki – eliminacja zapasów międzyoperacyjnych'],
    ['Takt Time', 'dostosowanie tempa produkcji do rytmu zamówień klienta'],
    ['SMED', 'Single Minute Exchange of Die – szybkie przezbrajanie maszyn'],
    ['Heijunka', 'poziomowanie sekwencji i wolumenu produkcji'],
  ],
  c: [
    ['SMED = Single Minute Exchange of ___', 'Die', ['Data', 'Delivery', 'Design']],
  ],
  tf: [
    ['JIT to prawy filar Domu Toyoty', false, 'JIT to LEWY filar; prawy to Jidoka'],
    ['SMED służy szybkiemu przezbrajaniu maszyn', true],
    ['System Pull steruje przepływem wg rzeczywistego zużycia', true],
    ['Heijunka to poziomowanie sekwencji i wolumenu produkcji', true],
    ['Takt Time to maksymalna prędkość maszyny', false, 'Takt Time = tempo produkcji dopasowane do rytmu zamówień klienta'],
    ['One-Piece-Flow eliminuje zapasy międzyoperacyjne', true],
  ],
  s: { n: 'Narzędzia filaru JIT', y: ['Pull / Kanban', 'One-Piece-Flow', 'Takt Time', 'SMED', 'Heijunka'], x: ['Andon', 'Poka-Yoke', 'Matryca X', 'Automatyczne przerywanie'] },
  g: { n: 'Które narzędzie JIT?', c: {
    'Pull / Kanban': ['Rzeczywiste zużycie', 'System ssący'],
    'One-Piece-Flow': ['Jedna sztuka', 'Brak zapasów międzyoperacyjnych'],
    'Takt Time': ['Rytm zamówień klienta'],
    'SMED': ['Szybkie przezbrojenie', 'Krótsze przestoje'],
    'Heijunka': ['Poziomowanie wolumenu', 'Sekwencja produkcji'],
  } },
  sc: [
    ['Stanowisko produkuje dopiero wtedy, gdy następne przyśle kartę Kanban. To…', 'System Pull', ['System Push', 'Heijunka', 'Andon']],
    ['Przezbrojenie prasy skrócono z 2 h do 8 minut. Narzędzie:', 'SMED', ['Takt Time', 'One-Piece-Flow', 'Poka-Yoke']],
    ['Klient zamawia 480 szt. na 8-godzinną zmianę, więc linia pracuje w rytmie 1 szt./min. To…', 'Takt Time', ['SMED', 'Heijunka', 'Kanban']],
  ],
});

Q({
  id: 23, w: 4, t: 'Jidoka',
  q: 'Jidoka.',
  a: [
    '**Jidoka** (autonomizacja) to **prawy filar Domu Toyoty**: **niezwłoczna identyfikacja błędów i anomalii w czasie rzeczywistym** dzięki usprawnieniom technicznym i **automatyzacji połączonej z potencjałem ludzkim** – jakość **wbudowana w proces**.',
    'Techniki Jidoka:',
    '• **Automatyczne przerywanie procesu** – natychmiastowe **zatrzymanie linii** po wykryciu defektu, by **nie przekazać wady dalej**;',
    '• **Poka-Yoke** – proste rozwiązania techniczne **zapobiegające pomyłkom** z rozkojarzenia (np. **niesymetryczne wtyczki USB**);',
    '• **Andon** – **wizualna sygnalizacja** (tablice, kolorowe światła, dźwięki) ostrzegająca o problemach w czasie rzeczywistym;',
    '• **RCA na stanowisku** – **5 Why** i **diagram Ishikawy**.'
  ],
  x: [
    'Prawy filar konstrukcji operacyjnej Domu Toyoty. Polega na niezwłocznej identyfikacji błędów i anomalii w czasie rzeczywistym poprzez usprawnienia technologiczne i automatyzację połączoną z wykorzystaniem potencjału ludzkiego (autonomizacja). Techniki zapewnienia jakości wbudowanej w proces:',
    '• Automatyczne przerywanie procesu: natychmiastowe zatrzymanie linii w momencie wykrycia defektu, aby nie przekazać wady dalej.',
    '• Poka-Yoke: proste rozwiązania techniczne i mechanizmy służące unikaniu błędów i pomyłek wynikających z chwilowego rozkojarzenia lub utraty koncentracji (np. niesymetryczne wtyczki USB).',
    '• Andon: wizualny sposób komunikacji przy użyciu sygnałów (tablice informacyjne, kolorowe światła, dźwięki), ostrzegający operatorów i kierowników o problemach w czasie rzeczywistym, by umożliwić natychmiastowe działania naprawcze.',
    '• Narzędzia RCA wbudowane w proces: analiza przyczyn źródłowych bezpośrednio na stanowisku metodami 5 Why? (5 Dlaczego) oraz diagramu Ishikawy.'
  ],
  k: ['Prawy filar Domu Toyoty', 'Autonomizacja', 'Identyfikacja błędów w czasie rzeczywistym', 'Automatyzacja + potencjał ludzki', 'Automatyczne przerywanie – nie przekazuj wady', 'Poka-Yoke', 'Andon', '5 Why i Ishikawa na stanowisku'],
  m: 'Jidoka = „STOP-ka”: wykryj → STOP (automatyczne przerywanie) → ŚWIATŁO i DŹWIĘK (Andon) → ZNAJDŹ PRZYCZYNĘ (5 Why, Ishikawa) → ZABEZPIECZ (Poka-Yoke – wtyczka, której nie włożysz źle).',
  f: [
    ['Automatyczne przerywanie procesu', 'natychmiastowe zatrzymanie linii po wykryciu defektu'],
    ['Poka-Yoke', 'proste mechanizmy zapobiegające pomyłkom z rozkojarzenia (np. niesymetryczne wtyczki)'],
    ['Andon', 'wizualna lub dźwiękowa sygnalizacja problemów w czasie rzeczywistym'],
    ['Autonomizacja', 'automatyzacja połączona z wykorzystaniem potencjału ludzkiego'],
  ],
  tf: [
    ['Jidoka to prawy filar Domu Toyoty', true],
    ['Jidoka pozwala przekazać wadę dalej, żeby nie zatrzymywać linii', false, 'Linia zatrzymuje się NATYCHMIAST, by NIE przekazać wady dalej'],
    ['Andon wykorzystuje tablice, kolorowe światła i dźwięki', true],
    ['Poka-Yoke to np. niesymetryczna wtyczka USB', true],
    ['Jidoka to pełna automatyzacja bez udziału człowieka', false, 'Autonomizacja = automatyzacja POŁĄCZONA z potencjałem ludzkim'],
  ],
  o: { n: 'Reakcja Jidoka na wadę', i: ['Wykrycie anomalii', 'Automatyczne zatrzymanie linii', 'Sygnał Andon', 'Analiza 5 Why / Ishikawa'] },
  s: { n: 'Techniki filaru Jidoka', y: ['Automatyczne przerywanie', 'Poka-Yoke', 'Andon', '5 Why', 'Diagram Ishikawy'], x: ['Takt Time', 'SMED', 'Heijunka', 'Kanban'] },
  sc: [
    ['Maszyna wykryła wadę, sama się zatrzymała i zapaliła lampkę. Zasada:', 'Jidoka', ['Heijunka', 'Kaizen', 'Takt Time']],
    ['Nad linią zapala się czerwone światło i słychać sygnał wzywający kierownika. To…', 'Andon', ['Kanban', 'Genba', 'Catchball']],
    ['Detalu nie da się włożyć do przyrządu odwrotnie. To…', 'Poka-Yoke', ['Andon', 'SMED', 'Heijunka']],
  ],
});

Q({
  id: 24, w: 4, t: 'System CORE',
  q: 'System CORE (Customer Oriented Results & Excellence).',
  a: [
    '**CORE** to **system doskonałości operacyjnej**, którego nadrzędnym celem jest **orientacja na klienta** i **maksymalizacja jego satysfakcji** przez ustrukturyzowane, **mierzalne wyniki jakościowe i finansowe**.',
    'Działa w oparciu o **mapowanie strumieni wartości (VSM)**, **eliminację przewlekłych strat** i twarde mierniki procesowe **Six Sigma**. Wymusza przejście od **reaktywnego usuwania problemów** do **prewencyjnego zarządzania jakością**, opierając się na **standaryzacji stanowisk** i **zaangażowaniu pracowników**.',
    '(Plik 1: likwiduje **silosy** – stanowiska rozlicza się z **rezultatu** (jakość, terminowość **OTIF**, zadowolenie odbiorcy), a nie z samego „wykonania procedury”.)'
  ],
  x: [
    'System doskonałości operacyjnej, którego nadrzędnym celem jest orientacja na klienta i maksymalizacja satysfakcji poprzez ustrukturyzowane, mierzalne wyniki jakościowe i finansowe. Działa w oparciu o mapowanie strumieni wartości (VSM), eliminację przewlekłych odpadów i strat produkcyjnych oraz wdrażanie twardych mierników procesowych Six Sigma. CORE nakłada na organizację obowiązek przejścia od reaktywnego usuwania problemów do prewencyjnego zarządzania jakością, opierając się na standaryzacji stanowisk i zaangażowaniu pracowników.',
    '## Uzupełnienie (plik 1)',
    'CORE likwiduje silosy organizacyjne – każdy proces i stanowisko rozliczane są nie z samego faktu wykonania procedury, ale z ostatecznego rezultatu mierzonego jakością, terminowością (OTIF) i zadowoleniem odbiorcy.'
  ],
  k: ['System doskonałości operacyjnej', 'Orientacja na klienta, satysfakcja', 'Mierzalne wyniki jakościowe i finansowe', 'VSM – strumień wartości', 'Eliminacja przewlekłych strat', 'Mierniki Six Sigma', 'Od reakcji do prewencji', 'Standaryzacja stanowisk, zaangażowanie', 'Rezultat: jakość, OTIF'],
  m: 'CORE = RDZEŃ to KLIENT. Narzędzia „V-E-S”: VSM, Eliminacja strat, Six Sigma. Zmiana myślenia: ze STRAŻAKA (reaktywnie) na LEKARZA PROFILAKTYKA (prewencja).',
  f: [
    ['CORE', 'system doskonałości operacyjnej zorientowany na klienta i mierzalne wyniki'],
    ['VSM', 'mapowanie strumieni wartości – podstawa CORE'],
    ['Kierunek zmiany w CORE', 'od reaktywnego usuwania problemów do prewencyjnego zarządzania jakością'],
    ['OTIF', 'terminowość (On Time In Full) – miara rezultatu w CORE (plik 1)'],
  ],
  c: [
    ['CORE działa w oparciu o mapowanie strumieni wartości, czyli ___', 'VSM', ['SMED', 'FMEA', 'OEE']],
    ['Terminowość w CORE mierzy się wskaźnikiem ___ (plik 1)', 'OTIF', ['OEE', 'RPN', 'CPI']],
  ],
  tf: [
    ['CORE przechodzi od reaktywnego do prewencyjnego zarządzania jakością', true],
    ['CORE rozlicza stanowiska z samego wykonania procedury', false, 'Rozlicza z REZULTATU dla klienta (jakość, OTIF, satysfakcja)'],
    ['CORE wykorzystuje mapowanie strumieni wartości (VSM)', true],
    ['CORE stosuje twarde mierniki procesowe Six Sigma', true],
  ],
  s: { n: 'Na czym opiera się CORE?', y: ['VSM', 'Eliminacja przewlekłych strat', 'Mierniki Six Sigma', 'Standaryzacja stanowisk', 'Zaangażowanie pracowników'], x: ['Rozliczanie z wykonania procedury', 'Reaktywne gaszenie pożarów', 'Silosy działów'] },
  sc: [
    ['Dział rozlicza się z OTIF i satysfakcji klienta, a proces zmapowano metodą VSM. To system…', 'CORE', ['QRQC', 'Hoshin Kanri', 'SPC']],
  ],
});

Q({
  id: 25, w: 4, t: 'QRQC',
  q: 'QRQC (Quick Response Quality Control – szybka reakcja kontroli jakości) – zasady.',
  a: [
    '**QRQC** to metodyka **szybkiego, reaktywnego rozwiązywania problemów jakościowych** wywodząca się z koncernu **VALEO**; stosowana **od najniższego szczebla**, by problemy rozwiązywać **natychmiast, na miejscu** (plik 1: reakcja do **24 h**). Zasady:',
    '• **Cykl PDCA** (pętla Deminga: Plan-Do-Check-Act) – prawidłowe zdefiniowanie problemu i działania;',
    '• **San Gen Shugi (3 realia)**: **Genba** – idź do **realnego miejsca**; **Genbutsu** – zbadaj **realny obiekt** (wadliwy produkt); **Genjitsu** – analizuj **fakty i dane**, nie przypuszczenia.',
    'Klasyfikacja problemów: **drobne** (na stanowisku: **5S, Poka-Yoke**), **średnie** (**QRQC, 8D, raporty A3**), **duże** (**Hoshin Kanri**, cała organizacja).'
  ],
  x: [
    'QRQC to zaawansowana metodyka reaktywnego rozwiązywania problemów jakościowych, wywodząca się z koncernu motoryzacyjnego VALEO. Stosuje się ją od najniższego szczebla hierarchii, aby problemy rozwiązywać natychmiast, na miejscu. Zasady:',
    '• Cykl PDCA: prawidłowe zdefiniowanie problemu i działania według pętli Deminga (Plan-Do-Check-Act).',
    '• Zasada San Gen Shugi (3 realia):',
    '◦ Genba (realne miejsce): idź fizycznie do miejsca, w którym wystąpił problem.',
    '◦ Genbutsu (realny obiekt): zbadaj rzeczywisty, fizyczny wadliwy produkt i przejrzyj realne informacje.',
    '◦ Genjitsu (fakty i dane): analizuj sytuację wyłącznie na podstawie twardych danych i rzeczywistych faktów, a nie przypuszczeń.',
    'Klasyfikacja problemów: drobne (rozwiązywane na stanowisku przez 5S / Poka-Yoke), średnie (metody QRQC, 8D lub raporty A3) oraz duże (poziom Hoshin Kanri / całej organizacji).',
    '## Uzupełnienie (plik 1)',
    'Reakcja na wady jakościowe do 24 h, bezpośrednio w miejscu ich wystąpienia (zapis także jako Gemba / Gembutsu).'
  ],
  k: ['Szybkie rozwiązywanie problemów jakości', 'Wywodzi się z VALEO', 'Od najniższego szczebla, na miejscu', 'Cykl PDCA', 'San Gen Shugi – 3 realia', 'Genba – miejsce', 'Genbutsu – obiekt', 'Genjitsu – fakty i dane', 'Problemy: drobne, średnie, duże'],
  m: '3G: GENBA = GDZIE (idź na halę), GENBUTSU = CO (weź „butsu” – rzecz – do ręki), GENJITSU = FAKTY („jitsu” = „jest tak”, a nie „wydaje mi się”). Waga problemu: mały → 5S / Poka-Yoke, średni → QRQC / 8D / A3, duży → Hoshin Kanri.',
  f: [
    ['Genba', 'realne miejsce – idź fizycznie tam, gdzie wystąpił problem'],
    ['Genbutsu', 'realny obiekt – zbadaj fizyczny wadliwy produkt'],
    ['Genjitsu', 'fakty i dane – analiza twardych danych, nie przypuszczeń'],
    ['San Gen Shugi', 'zasada 3 realiów w QRQC'],
    ['VALEO', 'koncern motoryzacyjny, z którego wywodzi się QRQC'],
  ],
  c: [
    ['QRQC wywodzi się z koncernu ___', 'VALEO', ['Toyota', 'Boeing', 'Siemens']],
    ['Problemy średnie rozwiązuje się m.in. metodą 8D lub raportem ___', 'A3', ['A4', 'X', 'OEE']],
  ],
  tf: [
    ['QRQC wywodzi się z koncernu VALEO', true],
    ['QRQC stosuje się tylko na poziomie zarządu', false, 'QRQC stosuje się OD NAJNIŻSZEGO szczebla – problemy rozwiązuje się na miejscu'],
    ['Genbutsu oznacza realne miejsce', false, 'Genbutsu = realny OBIEKT; realne miejsce to Genba'],
    ['Problemy średnie rozwiązuje się m.in. przez 8D lub raport A3', true],
    ['Duże problemy przechodzą na poziom Hoshin Kanri', true],
    ['QRQC wykorzystuje cykl PDCA', true],
  ],
  o: [
    { n: 'San Gen Shugi – kolejność', i: ['Genba – realne miejsce', 'Genbutsu – realny obiekt', 'Genjitsu – fakty i dane'] },
    { n: 'Cykl PDCA (pętla Deminga)', i: ['Plan', 'Do', 'Check', 'Act'] },
  ],
  g: { n: 'Jak duży problem → jakie narzędzie?', c: {
    'Drobny (stanowisko)': ['5S', 'Poka-Yoke'],
    'Średni': ['QRQC', '8D', 'Raport A3'],
    'Duży (organizacja)': ['Hoshin Kanri'],
  } },
  sc: [
    ['Wada! Idziesz na halę, bierzesz wadliwy detal do ręki i patrzysz na zmierzone dane. Zasada:', 'San Gen Shugi (3G)', ['Catchball', 'DMAIC', 'Heijunka']],
    ['Problem dotyczy całej organizacji. Właściwy poziom rozwiązania:', 'Hoshin Kanri', ['5S na stanowisku', 'Poka-Yoke', 'Raport A3']],
  ],
});

Q({
  id: 26, w: 4, t: 'Hoshin Kanri',
  q: 'Hoshin Kanri.',
  a: [
    '**Hoshin Kanri** (zarządzanie przez cele, **kaskadowanie strategii**) to system planowania i zarządzania, który spójnie **integruje cele długofalowe** fabryki z **codzienną pracą operacyjną**.',
    'Zarządzanie odbywa się w kontekście **otoczenia**, które kadra musi w pełni rozumieć. Narzędzia: **Catchball** (proces **uzgadniania celów** góra–dół) i **Matryca X** (narzędzie wizualne), wiążąca **KPI działów** (Marketing, Finanse, Produkcja, HR, B+R) z **projektami operacyjnymi** i **planami zakupów materiałowych**.'
  ],
  x: [
    'Hoshin Kanri (zarządzanie przez cele / kaskadowanie strategii) to system planowania i zarządzania, który w spójny sposób integruje cele długofalowe fabryki z codzienną pracą operacyjną. Proces planowania przedstawia ujednolicona matryca zależności.',
    'Menedżerowanie odbywa się w kontekście określonego otoczenia, co wymaga od kadry kierowniczej pełnego zrozumienia tego kontekstu. Hoshin Kanri wykorzystuje proces uzgodnień celów (Catchball) i narzędzia wizualne (Matryca X), wiążąc twarde wskaźniki (KPI) departamentów (Marketing, Finanse, Produkcja, HR, B+R) z projektami operacyjnymi i planami zakupów materiałowych.',
    '## Uzupełnienie (plik 1)',
    'Catchball to dwukierunkowy dialog góra–dół uzgadniający realność celów; do regularnego monitoringu postępów służą tablice wskaźników.'
  ],
  k: ['Zarządzanie przez cele', 'Kaskadowanie strategii', 'Cele długofalowe ↔ praca codzienna', 'Zrozumienie otoczenia', 'Catchball – uzgadnianie celów', 'Matryca X', 'KPI działów ↔ projekty i zakupy'],
  m: 'Hoshin = KOMPAS, Kanri = zarządzanie. Kaskada z góry w dół. „Rzuć piłkę” (Catchball) – cele odbijają się góra ↔ dół aż do zgody. „Postaw X” (Matryca X) – krzyżyk łączy KPI działów, projekty i zakupy.',
  f: [
    ['Catchball', 'proces uzgadniania celów – dialog góra–dół w obu kierunkach'],
    ['Matryca X', 'narzędzie wizualne wiążące KPI działów z projektami operacyjnymi i planami zakupów'],
    ['Hoshin Kanri', 'kaskadowanie strategii: cele długofalowe ↔ codzienna praca operacyjna'],
  ],
  tf: [
    ['Catchball to jednokierunkowe narzucanie celów z góry', false, 'Catchball = UZGADNIANIE celów w dialogu góra–dół (w obie strony)'],
    ['Matryca X łączy KPI działów z projektami operacyjnymi', true],
    ['Hoshin Kanri integruje cele długofalowe z codzienną pracą', true],
    ['Hoshin Kanri to inaczej zarządzanie przez cele', true],
  ],
  s: [
    { n: 'Narzędzia Hoshin Kanri', y: ['Catchball', 'Matryca X', 'KPI działów'], x: ['Andon', 'SMED', 'Poka-Yoke'] },
    { n: 'Działy, których KPI wiąże Matryca X', y: ['Marketing', 'Finanse', 'Produkcja', 'HR', 'B+R'], x: ['Genba', 'Andon', 'Kanban'] },
  ],
  sc: [
    ['Cele zarządu wracają od kierowników z uwagami i są ponownie uzgadniane. To…', 'Catchball', ['Matryca X', 'Andon', 'Genba']],
    ['Jedna tabela łączy cele strategiczne, KPI działów, projekty i zakupy. To…', 'Matryca X', ['Diagram Ishikawy', 'Karta Shewharta', 'Kanban']],
  ],
});
