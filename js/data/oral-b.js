'use strict';
/* ODPOWIEDZI USTNE (P21–P40). Format jak w oral-a.js. */

ORAL[21] = {
  say: [
    ['def', '**TPS** to zintegrowany model nastawiony na **maksymalizację wartości i całkowitą eliminację strat**, przedstawiany jako **Dom Toyoty**.'],
    ['det', 'Dachem domu jest cel **The Best: Quality, Cost, Safety, Delivery, Moral**, czyli **QCSDM**.'],
    ['det', 'W centrum są **ludzie i praca grupowa**, realizujący **ciągłe doskonalenie – Kaizen**.'],
    ['det', 'Dwa filary to **Just-in-Time** – z Kanbanem, One-Piece-Flow, Takt Time, SMED i Heijunką – oraz **Jidoka** – z automatycznym przerywaniem, Poka-Yoke i Andonem.'],
    ['det', 'Fundamentem są **kultura 5S, zarządzanie wizualne i standaryzacja**, a u podstaw leży **wartość i eliminacja strat**.'],
    ['end', 'Toyota walczy z trzema „M”: **Muda – marnotrawstwem, Muri – przeciążeniem i Mura – zmiennością**.'],
  ],
  fu: [
    ['Co jest w fundamencie Domu Toyoty?', 'Kultura 5S, zarządzanie wizualne i standaryzacja, a u podstaw wartość i eliminacja strat.', 'Just-in-Time i Jidoka.'],
    ['Czym różni się Muri od Mura?', 'Muri to przeciążenie, a Mura to zmienność, nierównomierność.', 'Muri to marnotrawstwo, a Mura to przeciążenie.'],
    ['Co oznacza skrót QCSDM?', 'Quality, Cost, Safety, Delivery, Moral – cel na dachu Domu Toyoty.', 'Quality Control System for Delivery Management.'],
  ],
  err: [['Kaizen', 'Kanban'], ['oraz **Jidoka**', 'oraz **Heijunka**'], ['standaryzacja', 'kampania marketingowa'], ['Muri – przeciążeniem', 'Muri – marnotrawstwem'], ['ludzie i praca grupowa', 'maszyny i roboty']],
};

ORAL[22] = {
  say: [
    ['def', '**JIT – Just in Time** – to **lewy filar Domu Toyoty**, system, który stawia **klienta na piedestale**.'],
    ['det', 'Firma dostarcza wyroby **dokładnie w takiej ilości**, jakiej chce klient, i **dokładnie w wyznaczonym przez niego czasie**, bez magazynów i nadprodukcji.'],
    ['list', 'JIT wykorzystuje pięć narzędzi: **system Pull z kartami Kanban, One-Piece-Flow, Takt Time, SMED i Heijunkę**.'],
    ['det', '**System Pull** steruje przepływem według **rzeczywistego zużycia**, **One-Piece-Flow** to przepływ jednej sztuki bez zapasów międzyoperacyjnych, a **Takt Time** dopasowuje tempo do **rytmu zamówień klienta**.'],
    ['det', '**SMED** to **szybkie przezbrajanie maszyn**, a **Heijunka** to **poziomowanie** sekwencji i wolumenu produkcji.'],
  ],
  fu: [
    ['Co to jest SMED?', 'Single Minute Exchange of Die – technika szybkiego przezbrajania maszyn, która skraca przestoje.', 'System sterowania przepływem kartami Kanban.'],
    ['Czym różni się system Pull od Push?', 'W Pull produkuje się dopiero na sygnał rzeczywistego zużycia, np. kartę Kanban; w Push produkuje się na zapas według planu.', 'W Pull produkuje się na magazyn, a w Push na zamówienie klienta.'],
    ['Po co jest Takt Time?', 'Żeby dopasować tempo produkcji do rytmu zamówień klienta.', 'Żeby maszyny pracowały z maksymalną prędkością.'],
  ],
  err: [['lewy filar', 'prawy filar'], ['rzeczywistego zużycia', 'prognozy sprzedaży'], ['szybkie przezbrajanie maszyn', 'szybkie przeglądy jakości'], ['poziomowanie', 'przyspieszanie'], ['rytmu zamówień klienta', 'maksymalnej prędkości maszyny']],
};

ORAL[23] = {
  say: [
    ['def', '**Jidoka**, czyli **autonomizacja**, to **prawy filar Domu Toyoty**: **niezwłoczne wykrywanie błędów i anomalii w czasie rzeczywistym**.'],
    ['det', 'Łączy usprawnienia techniczne i **automatyzację z potencjałem ludzkim**, żeby **jakość była wbudowana w proces**.'],
    ['list', 'Do technik Jidoka należą: **automatyczne przerywanie procesu, Poka-Yoke, Andon** oraz analiza przyczyn metodami **5 Why i Ishikawy**.'],
    ['det', 'Po wykryciu defektu **linia się zatrzymuje**, żeby **nie przekazać wady dalej**, a **Andon** – światła, tablice i dźwięki – alarmuje zespół.'],
    ['ex', '**Poka-Yoke** to proste zabezpieczenia przed pomyłką, na przykład **niesymetryczna wtyczka USB**.'],
  ],
  fu: [
    ['Co to jest Andon?', 'Wizualna i dźwiękowa sygnalizacja – tablice, kolorowe światła, dźwięki – która ostrzega o problemie w czasie rzeczywistym.', 'Karta sterująca przepływem materiału między stanowiskami.'],
    ['Dlaczego linia zatrzymuje się po wykryciu wady?', 'Żeby nie przekazać wady dalej i od razu usunąć przyczynę u źródła.', 'Żeby zwiększyć wskaźnik wydajności OEE.'],
    ['Podaj przykład Poka-Yoke.', 'Niesymetryczna wtyczka USB, której nie da się włożyć odwrotnie.', 'Tablica z harmonogramem zmian produkcyjnych.'],
  ],
  err: [['prawy filar', 'lewy filar'], ['nie przekazać wady dalej', 'nie zatrzymywać produkcji'], ['niesymetryczna wtyczka USB', 'karta Kanban'], ['potencjałem ludzkim', 'wyłącznie robotami']],
};

ORAL[24] = {
  say: [
    ['def', '**CORE – Customer Oriented Results & Excellence** – to **system doskonałości operacyjnej** nastawiony na **klienta** i **maksymalizację jego satysfakcji**.'],
    ['det', 'Opiera się na **mierzalnych wynikach jakościowych i finansowych**, a nie na samym wykonywaniu procedur.'],
    ['list', 'Narzędzia CORE to: **mapowanie strumieni wartości VSM**, **eliminacja przewlekłych strat** i twarde mierniki **Six Sigma**.'],
    ['det', 'CORE wymusza przejście od **reaktywnego usuwania problemów** do **prewencyjnego zarządzania jakością**, przez **standaryzację stanowisk** i **zaangażowanie pracowników**.'],
    ['end', 'W praktyce likwiduje **silosy** i rozlicza stanowiska z **rezultatu dla klienta** – jakości, terminowości **OTIF** i zadowolenia.'],
  ],
  fu: [
    ['Z czego CORE rozlicza stanowiska?', 'Z rezultatu dla klienta – jakości, terminowości OTIF i zadowolenia odbiorcy – a nie z samego wykonania procedury.', 'Z liczby wykonanych procedur i przepracowanych godzin.'],
    ['Na czym opiera się CORE?', 'Na mapowaniu strumieni wartości (VSM), eliminacji przewlekłych strat i miernikach Six Sigma, przy standaryzacji stanowisk i zaangażowaniu ludzi.', 'Na rozbudowie działów kontroli i reagowaniu na reklamacje.'],
  ],
  err: [['prewencyjnego zarządzania jakością', 'reaktywnego gaszenia pożarów'], ['Six Sigma', 'Hoshin Kanri'], ['silosy', 'standardy'], ['mierzalnych wynikach', 'dobrych intencjach']],
};

ORAL[25] = {
  say: [
    ['def', '**QRQC – Quick Response Quality Control** – to metodyka **szybkiego rozwiązywania problemów jakościowych**, która wywodzi się z koncernu **VALEO**.'],
    ['det', 'Stosuje się ją **od najniższego szczebla**, żeby problem rozwiązać **natychmiast, na miejscu** – według pliku pierwszego w ciągu **24 godzin**.'],
    ['det', 'Pierwszą zasadą jest **cykl PDCA**, czyli pętla Deminga: **Plan, Do, Check, Act**.'],
    ['det', 'Drugą zasadą jest **San Gen Shugi – trzy realia**: **Genba**, czyli idź na **miejsce**, **Genbutsu** – zbadaj **wadliwy produkt**, i **Genjitsu** – opieraj się na **faktach i danych**.'],
    ['end', 'Problemy dzielimy na **drobne** – 5S i Poka-Yoke, **średnie** – QRQC, 8D, raport A3 – i **duże**, rozwiązywane na poziomie **Hoshin Kanri**.'],
  ],
  fu: [
    ['Co oznacza Genbutsu?', 'Realny obiekt – trzeba zbadać fizyczny, wadliwy produkt i realne informacje.', 'Realne miejsce – trzeba iść na halę.'],
    ['Z jakiej firmy wywodzi się QRQC?', 'Z koncernu motoryzacyjnego VALEO.', 'Z Toyoty – jako element Domu Toyoty.'],
    ['Jak rozwiązuje się duży problem według QRQC?', 'Przenosi się go na poziom Hoshin Kanri, czyli całej organizacji.', 'Rozwiązuje go operator na stanowisku przez 5S.'],
  ],
  err: [['od najniższego szczebla', 'wyłącznie na poziomie zarządu'], ['wadliwy produkt', 'raport w biurze'], ['faktach i danych', 'przypuszczeniach'], ['VALEO', 'Boeinga'], ['poziomie **Hoshin Kanri**', 'poziomie **5S**']],
};

ORAL[26] = {
  say: [
    ['def', '**Hoshin Kanri**, czyli **zarządzanie przez cele** albo **kaskadowanie strategii**, to system, który **łączy cele długofalowe** fabryki z **codzienną pracą operacyjną**.'],
    ['det', 'Zarządza się w kontekście **otoczenia**, dlatego kadra musi je **w pełni rozumieć**.'],
    ['det', 'Cele uzgadnia się w procesie **Catchball** – w **dialogu góra–dół**, w obie strony.'],
    ['det', 'Narzędziem wizualnym jest **Matryca X**, która wiąże **KPI działów** – marketingu, finansów, produkcji, HR i B+R – z **projektami operacyjnymi** i **planami zakupów**.'],
  ],
  fu: [
    ['Na czym polega Catchball?', 'Na uzgadnianiu celów w dialogu góra–dół: cele wracają od niższych szczebli z uwagami, aż wszyscy uznają je za realne.', 'Na jednorazowym narzuceniu celów przez zarząd.'],
    ['Co łączy Matryca X?', 'KPI działów z projektami operacyjnymi i planami zakupów materiałowych.', 'Kolejne etapy przepływu jednej sztuki na linii.'],
  ],
  err: [['dialogu góra–dół', 'poleceniu z góry'], ['codzienną pracą operacyjną', 'wyłącznie budżetem rocznym'], ['KPI działów', 'kolory produktów'], ['Matryca X', 'Karta Shewharta']],
};

ORAL[27] = {
  say: [
    ['def', '**Przemysł 4.0** to przekształcenie tradycyjnej automatyzacji w system **bardziej połączony, otwarty i elastyczny**, czyli **Smart Factory**, oparty na **Internecie Rzeczy**.'],
    ['list', 'Ma cztery założenia: **wzajemne połączenie urządzeń, transparentność informacji, wsparcie technologiczne i decentralizację decyzji**.'],
    ['det', 'Dzięki **połączeniu** maszyny komunikują się ze sobą i z człowiekiem, **transparentność** pozwala wcześniej wykrywać problemy, a przy **decentralizacji** urządzenia **same podejmują decyzje** na podstawie danych.'],
    ['det', 'Kluczowe filary to: **wirtualizacja i symulacja, czyli cyfrowy bliźniak, modułowość, interoperacyjność, decentralizacja, zarządzanie w czasie rzeczywistym i orientacja na usługi**.'],
    ['end', 'Umożliwiają to technologie **CPS, IIoT, chmura, Big Data i sztuczna inteligencja**, a efektem jest m.in. **Predictive Maintenance**.'],
  ],
  fu: [
    ['Co oznacza decentralizacja decyzji?', 'Autonomiczne urządzenia same podejmują określone decyzje na podstawie danych wejściowych, bez ingerencji operatora.', 'Wszystkie decyzje zapadają centralnie w zarządzie firmy.'],
    ['Czym jest transparentność informacji w Przemyśle 4.0?', 'Dostępem do jak największej ilości informacji, dzięki któremu operatorzy lepiej decydują i wcześniej wykrywają problemy.', 'Publikowaniem danych finansowych firmy na giełdzie.'],
    ['Wymień filary Przemysłu 4.0.', 'Wirtualizacja i symulacja, modułowość, interoperacyjność, decentralizacja, zarządzanie w czasie rzeczywistym i orientacja na usługi.', 'Kanban, Poka-Yoke, Heijunka i 5S.'],
  ],
  err: [['otwarty i elastyczny', 'zamknięty i sztywny'], ['same podejmują decyzje', 'czekają na decyzję zarządu'], ['interoperacyjność', 'centralizacja'], ['Predictive Maintenance', 'produkcja na magazyn']],
};

ORAL[28] = {
  say: [
    ['def', '**Cyfrowy bliźniak** to **filar Przemysłu 4.0** – **wirtualna replika** fizycznego obiektu, maszyny albo całego procesu.'],
    ['det', 'Jest **sprzężony z obiektem stałą wymianą danych** przez **czujniki IoT**, więc odzwierciedla jego stan na bieżąco.'],
    ['det', 'Dzięki **realistycznym symulacjom** możemy **przewidywać zachowanie** systemu, np. **symulować uszkodzenia i kolizje** w motoryzacji.'],
    ['det', 'To pozwala **uniknąć kosztów prób niszczących** na prawdziwych samochodach czy samolotach.'],
    ['end', 'Bliźniak służy też do **weryfikacji przepływów logistycznych i layoutu fabryki**, a według pliku pierwszego – do testów zmian **bez zatrzymywania produkcji**.'],
  ],
  fu: [
    ['Czym bliźniak różni się od zwykłego modelu CAD?', 'Jest sprzężony z fizycznym obiektem stałą wymianą danych z czujników IoT, więc pokazuje jego aktualny stan.', 'Niczym – to po prostu statyczny rysunek 2D.'],
    ['Jaka jest główna korzyść z symulacji na bliźniaku?', 'Przewidywanie zachowań, np. kolizji, bez kosztownych prób niszczących na fizycznych obiektach.', 'Całkowite zastąpienie czujników na maszynach.'],
  ],
  err: [['czujniki IoT', 'notatki operatora'], ['prób niszczących', 'szkoleń BHP'], ['layoutu fabryki', 'cennika produktów'], ['wirtualna replika', 'papierowa kopia']],
};

ORAL[29] = {
  say: [
    ['def', 'Systemy **ERP, MES i SCADA** tworzą kolejne warstwy zarządzania produkcją.'],
    ['det', '**ERP** to **poziom czwarty**, aplikacje biznesowe: planowanie zasobów, globalne planowanie produkcji, **finanse, księgowość i kadry**.'],
    ['det', '**MES** to **poziom trzeci** – **realizacja produkcji** i **łącznik czasu rzeczywistego między ERP a halą**, od zamówienia do dostarczenia wyrobu.'],
    ['det', '**SCADA** to **poziom drugi** – **nadzór i wizualizacja**: zbieranie danych, sterowanie, **alarmowanie i archiwizacja**; jest **nadrzędna nad panelami HMI**.'],
    ['det', '**Integracja wertykalna** łączy ERP, MES i SCADA i likwiduje **lukę informacyjną**, na którą skarży się **52% firm**; wykorzystuje protokoły jak **Modbus, PROFINET czy OPC UA**.'],
    ['list', 'Sześć najczęstszych funkcji MES to: **genealogia produkcji, analiza wydajności OEE, akwizycja danych, zarządzanie jakością, harmonogramowanie i obieg dokumentów**.'],
  ],
  fu: [
    ['Czym różni się SCADA od HMI?', 'HMI prezentuje dane konkretnej maszyny i przyjmuje nastawy; SCADA jest systemem nadrzędnym, działa na większą skalę i w pełni archiwizuje dane.', 'HMI jest nadrzędny nad SCADA i archiwizuje dane całego zakładu.'],
    ['Dlaczego samo ERP nie wystarcza?', 'Bo bazuje na arbitralnych, godzinowych kosztach maszyn i nie widzi faktycznych odpadów – potrzebna jest integracja z MES i SCADA.', 'Bo ERP steruje zaworami w czasie rzeczywistym i jest przeciążone.'],
    ['Na czym polega genealogia produkcji w MES?', 'Na śledzeniu partii: od jakiego dostawcy był surowiec i który operator zmienił recepturę.', 'Na planowaniu kampanii marketingowej dla nowego produktu.'],
  ],
  err: [['poziom czwarty', 'poziom pierwszy'], ['52% firm', '2% firm'], ['nadrzędna nad panelami HMI', 'podrzędna wobec paneli HMI'], ['finanse, księgowość i kadry', 'sterowanie zaworami'], ['OPC UA', 'PDCA']],
};

ORAL[30] = {
  say: [
    ['def', '**Elastyczne systemy produkcyjne** to przejście od **sztywnej automatyzacji** do systemu **otwartego, połączonego i elastycznego**.'],
    ['det', '**Masowa personalizacja** to produkcja szerokiej gamy wyrobów **na indywidualne zamówienie klienta** przy **kosztach zbliżonych do seryjnych**.'],
    ['det', 'Opiera się na systemie **PLM**, np. Enovia, który zarządza **całym cyklem życia produktu** od koncepcji po recykling i daje **jedną wersję prawdy**.'],
    ['det', 'Drugi filar to **PDM**, który **wersjonuje dane** o produkcie według procedury: **wyszukaj, wyrejestruj, edytuj, zarejestruj nową wersję**.'],
    ['end', 'Według pliku pierwszego pomagają w tym też **FMS**, czyli obrabiarki CNC z automatycznym transportem, **modułowość wyrobów** i **SMED**.'],
  ],
  fu: [
    ['Czym różni się PLM od PDM?', 'PLM zarządza całym cyklem życia produktu i daje jedną wersję prawdy; PDM zarządza danymi i wersjami plików, np. rev 1, rev 2.', 'PDM obejmuje cały cykl życia produktu, a PLM tylko wersje rysunków.'],
    ['Jak wygląda procedura pracy w PDM?', 'Wyszukanie pliku, wyrejestrowanie go, edycja u użytkownika i zarejestrowanie nowej wersji.', 'Wydruk, podpis kierownika i archiwizacja w segregatorze.'],
  ],
  err: [['kosztach zbliżonych do seryjnych', 'kosztach produkcji jednostkowej'], ['jedną wersję prawdy', 'wiele niezależnych wersji'], ['całym cyklem życia produktu', 'wyłącznie sprzedażą produktu'], ['sztywnej automatyzacji', 'pracy ręcznej']],
};

ORAL[31] = {
  say: [
    ['def', 'W Przemyśle 4.0 automatyzacja zmierza w stronę **systemów cyber-fizycznych**.'],
    ['det', '**Druk 3D** i zaawansowane **obrabiarki CNC** łączy się w **elastyczne gniazda produkcyjne**.'],
    ['det', 'Roboty mobilne **AMR i AGV** przewożą komponenty na podstawie **cyfrowych list zadań** pobieranych **w czasie rzeczywistym z MES**.'],
    ['det', 'Panele **HMI** są w **sieci Ethernet**, więc nastawy **PLC** i programy obróbcze ładują się **automatycznie z serwerów** na podstawie **receptur i kodów produktu**.'],
    ['end', 'Według pliku pierwszego ważne są też **coboty** z czujnikami **siły i momentu**, które pracują obok człowieka **bez barier ochronnych**.'],
  ],
  fu: [
    ['Skąd roboty AMR wiedzą, co przewieźć?', 'Pobierają cyfrowe listy zadań w czasie rzeczywistym z systemu MES.', 'Kierowca wózka przekazuje im zadania przez radio.'],
    ['Co daje podłączenie HMI do sieci Ethernet?', 'Automatyczne ładowanie nastaw PLC i programów obróbczych z serwerów na podstawie receptur i kodów produktu.', 'Możliwość oglądania filmów szkoleniowych przez operatora.'],
  ],
  err: [['z MES', 'z działu kadr'], ['automatycznie z serwerów', 'ręcznie z kartki'], ['siły i momentu', 'zapachu'], ['bez barier ochronnych', 'wyłącznie w klatkach']],
};

ORAL[32] = {
  say: [
    ['def', 'Powszechny **dostęp sieciowy**, dane na halach i **chmura** wymagają dziś **szerszego spojrzenia na bezpieczeństwo** systemów **IT i OT**.'],
    ['det', 'Obowiązuje zasada: **„Im więcej drzwi otwieramy, tym więcej zagrożeń i tym więcej drzwi musimy kontrolować”**.'],
    ['list', 'Mechanizmy ochrony to: **szyfrowanie danych** w sieci przemysłowej, **kontrola dostępu** dla zalogowanych użytkowników z uprawnieniami, **cyfrowe certyfikaty** i weryfikacja tożsamości urządzeń oraz **międzynarodowe standardy**.'],
    ['end', 'Według pliku pierwszego zagrożenia to **paraliż linii** i **kradzież danych**, a ochroną jest też **separacja IT od OT** strefami **DMZ** i zasada **Zero Trust**.'],
  ],
  fu: [
    ['Co oznacza zasada Zero Trust?', 'Brak domyślnego zaufania – każde urządzenie i użytkownik musi się uwierzytelnić.', 'Pełne zaufanie do urządzeń w sieci firmowej.'],
    ['Jak weryfikuje się tożsamość urządzeń w sieci?', 'Za pomocą cyfrowych certyfikatów bezpieczeństwa.', 'Po kolorze obudowy urządzenia.'],
  ],
  err: [['szyfrowanie danych', 'udostępnianie haseł'], ['zalogowanych użytkowników', 'wszystkich gości'], ['więcej drzwi musimy kontrolować', 'mniej drzwi musimy kontrolować'], ['Zero Trust', 'Full Trust']],
};

ORAL[33] = {
  say: [
    ['def', '**SPC**, czyli statystyczne sterowanie procesem, służy do **ciągłej oceny stabilności i zdolności** procesu produkcyjnego.'],
    ['list', 'Narzędzia SPC to **karty kontrolne Shewharta**, **histogramy** i wskaźniki zdolności **Cp i Cpk**.'],
    ['det', 'Karta ma **linię centralną** i limity **UCL i LCL równe ±3σ** i pokazuje rozrzut **średniej, odchylenia standardowego lub rozstępu**.'],
    ['det', 'Proces jest **stabilny**, gdy zmienność wynika **tylko z przyczyn losowych**; punkty **poza limitami** albo **nienaturalne sekwencje**, np. **trend 6 punktów**, oznaczają **przyczynę specjalną** i wymagają **akcji korygującej**.'],
    ['end', '**Cp** mierzy szerokość rozrzutu względem tolerancji, a **Cpk** uwzględnia też **wycentrowanie**; zwykle wymaga się **Cpk ≥ 1,33**.'],
  ],
  fu: [
    ['Jak rozpoznać rozregulowanie procesu na karcie kontrolnej?', 'Po punktach poza UCL/LCL albo nienaturalnych sekwencjach, np. trendzie 6 punktów czy przesunięciu średniej.', 'Po tym, że punkty losowo oscylują wokół linii centralnej.'],
    ['Czym różni się Cp od Cpk?', 'Cp porównuje rozrzut z szerokością tolerancji, a Cpk uwzględnia dodatkowo wycentrowanie procesu.', 'Cp uwzględnia wycentrowanie, a Cpk tylko rozrzut.'],
    ['Co oznacza zmienność losowa?', 'Naturalny szum procesu – proces jest stabilny i nie wymaga ingerencji.', 'Sygnał awarii, który wymaga natychmiastowej reakcji.'],
  ],
  err: [['±3σ', '±1σ'], ['trend 6 punktów', 'trend 2 punktów'], ['tylko z przyczyn losowych', 'z przyczyn specjalnych'], ['Cpk ≥ 1,33', 'Cpk ≥ 0,5'], ['wycentrowanie', 'kolor wykresu']],
};

ORAL[34] = {
  say: [
    ['def', '**RCA**, czyli analiza przyczyn źródłowych, to systematyczne podejście do **trwałego eliminowania problemów** – usuwamy **źródło, a nie objawy**; to **trzeci poziom** zarządzania jakością.'],
    ['det', 'Zanim zaczniemy szukać przyczyn, wadę opisujemy metodą **5W2H** – **siedmioma pytaniami**: What, Who, Where, When, Why, How i How many.'],
    ['det', '**Diagram Ishikawy** zaczyna od **jasno opisanego skutku** i porządkuje przyczyny w kategoriach: **człowiek, metoda, materiał, maszyna i zarządzanie**.'],
    ['det', 'Metoda **5 Why** polega na **wielokrotnym pytaniu „dlaczego?”**, aż dojdziemy do **przyczyny systemowej**.'],
    ['end', 'Według pliku pierwszego stosuje się też **raport 8D** – zespołową, ośmioetapową procedurę rozwiązywania problemów.'],
  ],
  fu: [
    ['Co opisuje pytanie „How many?” w 5W2H?', 'Mierzalną skalę i wolumen wad.', 'Ile osób pracuje na zmianie.'],
    ['Od czego zaczyna się diagram Ishikawy?', 'Od jasnego stwierdzenia skutku, czyli problemu; potem szuka się jego przyczyn w kategoriach.', 'Od listy pracowników odpowiedzialnych za dział.'],
    ['Po co używa się 5 Why?', 'Żeby przejść od widocznego objawu do głębokiej przyczyny systemowej.', 'Żeby szybko wskazać winnego pracownika.'],
  ],
  err: [['źródło, a nie objawy', 'objawy, a nie źródło'], ['jasno opisanego skutku', 'listy kosztów'], ['maszyna i zarządzanie', 'maszyna i marketing'], ['przyczyny systemowej', 'winnego pracownika'], ['siedmioma pytaniami', 'trzema pytaniami']],
};

ORAL[35] = {
  say: [
    ['def', '**FMEA** to **prewencyjna metoda analizy ryzyka jakościowego**, kluczowa w cyklu rozwoju produktu.'],
    ['det', '**DFMEA**, czyli projektową, wykonujemy w **fazie 2 APQP**, przed sfinalizowaniem projektu, żeby poznać słabe strony **konstrukcji** i zapewnić **niezawodność i żywotność**.'],
    ['det', '**PFMEA**, czyli procesową, wykonujemy w **fazie 3 APQP**, przed produkcją seryjną i w jej trakcie; skupia się na błędach **maszyn, metod i człowieka**.'],
    ['det', 'Oceniamy charakterystyki: **KC** – kluczowe dla montażu i żywotności, **SC** – znaczące, oceniane na **5–8**, i **CC** – krytyczne, wynikające z **przepisów**, oceniane na **9–10**.'],
    ['end', 'Według pliku pierwszego ryzyko liczy się jako **RPN = S × O × D**, czyli znaczenie razy częstość razy wykrywalność.'],
  ],
  fu: [
    ['Czym różni się DFMEA od PFMEA?', 'DFMEA analizuje ryzyko konstrukcji w fazie 2 APQP, a PFMEA ryzyko procesu – błędy maszyn, metod i ludzi – w fazie 3.', 'DFMEA dotyczy procesu, a PFMEA konstrukcji.'],
    ['Co to jest charakterystyka krytyczna CC?', 'Cecha wynikająca z wymagań regulacyjnych – bezpieczeństwa, prawa, środowiska – oceniana na 9–10 i wymagająca rygorystycznych kontroli.', 'Cecha estetyczna, oceniana na 1–2.'],
    ['Jak oblicza się RPN?', 'RPN = S × O × D – znaczenie razy częstość razy wykrywalność, każde w skali 1–10.', 'RPN = S + O + D w skali 1–100.'],
  ],
  err: [['fazie 2 APQP', 'fazie 5 APQP'], ['maszyn, metod i człowieka', 'kolorów i opakowań'], ['9–10', '1–2'], ['prewencyjna', 'reaktywna'], ['RPN = S × O × D', 'RPN = S + O + D']],
};

ORAL[36] = {
  say: [
    ['def', '**Metrologia współrzędnościowa – CMM** – polega na wyznaczaniu **współrzędnych X, Y, Z** punktów powierzchni i porównaniu geometrii z **modelem CAD** lub dokumentacją.'],
    ['det', 'Systemy **stykowe** dotykają detalu **rubinową końcówką**, punkt po punkcie albo skanując, i są **najdokładniejsze**, często **poniżej 1 µm**.'],
    ['det', 'Systemy **bezstykowe** – skanery laserowe, światło strukturalne i fotogrametria – zbierają **miliony punktów**, są **szybsze** i mierzą **materiały elastyczne**, ale nieco mniej dokładnie.'],
    ['det', 'Przed pomiarem wykonuje się **bazowanie według reguły 3-2-1**: **płaszczyzna** blokuje trzy stopnie swobody, **oś** dwa, a **punkt** ostatni, szósty.'],
    ['end', 'CMM weryfikuje wymiary i **tolerancje geometryczne GD&T** – kształtu, kierunku i położenia – a wyniki pokazuje w raportach i na **kolorowych mapach odchyłek**.'],
  ],
  fu: [
    ['Na czym polega reguła 3-2-1?', 'Płaszczyzna bazowa blokuje 3 stopnie swobody, linia bazowa kolejne 2, a punkt bazowy ostatni, szósty – to początek układu współrzędnych.', 'Mierzymy 3 punkty, 2 linie i 1 okrąg na każdym detalu.'],
    ['Kiedy wybrać system bezstykowy?', 'Gdy potrzebny jest szybki pomiar wielu punktów albo mierzymy materiał elastyczny, który styk mógłby odkształcić.', 'Gdy potrzebna jest najwyższa dokładność poniżej 1 µm.'],
    ['Podaj przykłady odchyłek GD&T.', 'Kształtu – płaskość, okrągłość, walcowość; kierunku – równoległość, prostopadłość; położenia – pozycja, współosiowość.', 'Twardość, chropowatość i masa detalu.'],
  ],
  err: [['rubinową końcówką', 'wiązką elektronów'], ['poniżej 1 µm', 'powyżej 1 mm'], ['materiały elastyczne', 'wyłącznie stal hartowaną'], ['reguły 3-2-1', 'reguły 80/20'], ['szybsze', 'wolniejsze']],
};

ORAL[37] = {
  say: [
    ['def', '**ISO 9001:2015** to uniwersalna podstawa **systemów zarządzania jakością**, oparta na **podejściu procesowym**, cyklu **PDCA** i **zadowoleniu klienta**.'],
    ['det', 'W motoryzacji obowiązuje **IATF 16949**, która zastąpiła normy krajowe: amerykańską **QS-9000**, niemiecką **VDA 6.1**, francuską **EAQF** i włoską **AVSQ**.'],
    ['det', 'W lotnictwie, kosmonautyce i obronności działa **AS/EN 9100**, opracowana pod egidą **IAQG**, a **AS9145** wprowadza lotnicze **APQP i PPAP**.'],
    ['det', 'W przemyśle obronnym stosuje się standardy NATO **AQAP**, z nadzorem rządowego przedstawiciela jakości **GQAR**.'],
    ['end', 'W kolejnictwie obowiązuje **IRIS, czyli ISO/TS 22163**, które dodaje do ISO 9001 wymagania **RAMS**.'],
  ],
  fu: [
    ['Jakie normy zastąpiła IATF 16949?', 'Amerykańską QS-9000, niemiecką VDA 6.1, francuską EAQF i włoską AVSQ.', 'ISO 14001, AS9100 i AQAP.'],
    ['Co to jest GQAR?', 'Rządowy przedstawiciel jakości, który nadzoruje wykonawcę w standardach AQAP.', 'Norma jakości dla przemysłu kolejowego.'],
    ['Co oznacza RAMS w normie IRIS?', 'Niezawodność, dostępność, utrzymanie i bezpieczeństwo – według EN 50126.', 'Recykling, analiza, marketing i sprzedaż.'],
  ],
  err: [['QS-9000', 'AS9100'], ['IAQG', 'NATO'], ['GQAR', 'IATF'], ['wymagania **RAMS**', 'wymagania **DMAIC**'], ['podejściu procesowym', 'podejściu marketingowym']],
};

ORAL[38] = {
  say: [
    ['def', '**Zero Defektów** to filozofia **Philipa Crosby’ego**: jedynym akceptowalnym standardem jest **brak jakichkolwiek wad**, a podstawą jest **profilaktyka i planowanie**.'],
    ['det', 'Podobnie akcentuje to **Trylogia Jakości Jurana**: **planowanie, kontrola i poprawa jakości**.'],
    ['det', '**Lean** doskonali proces przez **eliminację strat**, a narzędziem jest **5S: sortowanie, systematyka, sprzątanie, standaryzacja i samodyscyplina**.'],
    ['det', '**Six Sigma** **redukuje zmienność** procesu pętlą **DMAIC**, a według pliku pierwszego dąży do **3,4 błędu na milion możliwości**.'],
    ['det', 'Kluczowe jest przełożenie **głosu klienta – VOC** – na mierzalne **CTQ**: drzewko CTQ ustala **limity USL i LSL** i definiuje defekt.'],
  ],
  fu: [
    ['Podaj przykład przełożenia VOC na CTQ.', 'Klient mówi „chciałbym więcej zarabiać”; miernik CTQ to wartość 1 godziny pracy netto, a specyfikacja – powyżej 100 zł na godzinę.', 'Klient chce szybszej dostawy, więc firma obniża cenę.'],
    ['Rozwiń skrót DMAIC.', 'Define, Measure, Analyze, Improve, Control.', 'Design, Make, Assemble, Inspect, Correct.'],
    ['Na czym polega analiza CQA?', 'Na szukaniu problemów przez analizę diagramu przepływu procesu – wejść od dostawcy i wyjść dla klienta.', 'Na ankietowaniu pracowników o zadowolenie z pracy.'],
  ],
  err: [['Philipa Crosby’ego', 'Waltera Shewharta'], ['3,4 błędu na milion', '34 błędy na tysiąc'], ['redukuje zmienność', 'zwiększa zmienność'], ['planowanie, kontrola i poprawa jakości', 'reklama, sprzedaż i serwis'], ['samodyscyplina', 'sponsoring']],
};

ORAL[39] = {
  say: [
    ['def', 'Strukturę zarządzania produkcją opisuje **piramida automatyzacji** z **czterema warstwami** i poziomem procesu.'],
    ['det', 'Na szczycie, na **poziomie czwartym**, jest **ERP lub MRP II** – planowanie zasobów, **finanse, księgowość, zaopatrzenie i sprzedaż**.'],
    ['det', '**Poziom trzeci** to **MES z APS** – **śledzenie produkcji i materiałów w czasie rzeczywistym**; działają tu też **PLM i PDM**.'],
    ['det', '**Poziom drugi** to **SCADA i PLMS** – **nadzór operatorski**, ekrany synoptyczne, **alarmy i archiwizacja** danych w historianie.'],
    ['det', '**Poziom pierwszy** to **HMI, MDA, PDA i PLC** – **sterowanie w czasie rzeczywistym**, a poziom zero to **czujniki i urządzenia wykonawcze**, np. zawory i silniki.'],
  ],
  fu: [
    ['Na którym poziomie działa APS i do czego służy?', 'Na poziomie trzecim, razem z MES – optymalizuje harmonogram on-line przy złożonych procesach i produkcji na zamówienie.', 'Na poziomie pierwszym – steruje zaworami i silnikami.'],
    ['Co znajduje się na poziomie zero?', 'Fizyczne czujniki, np. temperatury i ciśnienia, oraz urządzenia wykonawcze, np. silniki i zawory.', 'System ERP i moduł finansowy.'],
  ],
  err: [['poziomie czwartym', 'poziomie pierwszym'], ['materiałów w czasie rzeczywistym', 'materiałów raz w miesiącu'], ['alarmy i archiwizacja', 'księgowość i płace'], ['czujniki i urządzenia wykonawcze', 'systemy finansowe']],
};

ORAL[40] = {
  say: [
    ['def', '**OEE** to iloczyn trzech składowych: **Dostępność × Wydajność × Jakość**, a każdą z nich obniżają po dwie z **sześciu podstawowych strat**.'],
    ['det', '**Dostępność** obniżają **przestoje nieplanowane**: **awarie** oraz **ustawienia i regulacje**, czyli przezbrojenia.'],
    ['det', '**Wydajność** obniżają **straty szybkości**: **bieg jałowy i zatrzymania** oraz **zmniejszenie szybkości**.'],
    ['det', '**Jakość** obniżają **straty jakości**: **defekty w procesie** i **straty rozruchowe**.'],
    ['det', 'Na diagramie czas maleje schodkowo: **teoretyczny, planowany, brutto, netto i efektywny czas pracy**.'],
    ['ex', 'Na przykład dostępność 90%, wydajność 80% i jakość 90% dają **OEE = 0,9 × 0,8 × 0,9 = 64,8%**.'],
  ],
  fu: [
    ['Czy przestoje planowane obniżają OEE?', 'Nie – odejmuje się je od czasu teoretycznego, by uzyskać planowany czas produkcji; dostępność obniżają przestoje nieplanowane.', 'Tak – przestoje planowane to główna strata dostępności.'],
    ['Do której składowej należą mikroprzestoje?', 'Do wydajności – to bieg jałowy i zatrzymania.', 'Do jakości – razem z defektami.'],
    ['Jak policzyć jakość w OEE?', 'Liczba dobrych sztuk podzielona przez wszystkie wyprodukowane, np. 108 000 / 120 000 = 90%.', 'Rzeczywisty czas pracy podzielony przez planowany.'],
  ],
  err: [['ustawienia i regulacje', 'defekty w procesie'], ['64,8%', '72%'], ['**straty rozruchowe**', '**awarie**'], ['bieg jałowy i zatrzymania', 'przezbrojenia'], ['Dostępność × Wydajność × Jakość', 'Dostępność + Wydajność + Jakość']],
};

/* dołączenie do pytań */
for (const q of QUESTIONS) {
  const o = ORAL[q.id] || {};
  q.say = o.say || [];
  q.fu = o.fu || [];
  q.err = o.err || [];
}
