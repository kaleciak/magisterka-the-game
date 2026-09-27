'use strict';
/* ODPOWIEDZI USTNE (P01–P20): jak powiedzieć to przed komisją.
   say – wzorcowa wypowiedź zdanie po zdaniu: [rola, zdanie z **kluczowymi pojęciami**]
         role: def (definicja), list (wyliczenie), det (rozwinięcie), ex (przykład), end (domknięcie)
   fu  – pytania dodatkowe komisji: [pytanie, dobra odpowiedź, odpowiedź pułapka]
   err – typowe błędy do „Łowcy błędów”: [poprawny fragment zdania, błędna podmiana] */
const ORAL = {};

ORAL[1] = {
  say: [
    ['def', 'Współczesne przetwórstwo metali nieżelaznych – stopów **Al, Mg, Ti i Cu** – dąży do **integracji procesów**, mniejszej **energochłonności** i uzyskania unikalnej **mikrostruktury**.'],
    ['list', 'Najważniejsze przykłady to **Twin-Roll Casting**, **Superplastic Forming**, **hydroformowanie** oraz formowanie ze **stanu półciekłego**, czyli thixoforming i rheocasting.'],
    ['det', 'W **TRC** ciekły metal krzepnie między **dwoma chłodzonymi walcami** i od razu jest walcowany, więc odlewanie i walcowanie to **jeden ciągły proces**, a szybkie chłodzenie ogranicza **segregację**.'],
    ['det', 'W **SPF** wykorzystujemy **superplastyczność**: blachę o ziarnie **poniżej 10 µm** dociskamy do matrycy **gazem obojętnym** w temperaturze **powyżej 0,5 Tm**.'],
    ['det', '**Hydroformowanie** kształtuje rury i blachy **cieczą pod bardzo wysokim ciśnieniem**, która działa jak **stempel**, a thixoforming wykorzystuje **tiksotropię** stopu w stanie półciekłym.'],
    ['end', 'Uzupełniająco można wymienić też **formowanie wybuchowe**.'],
  ],
  fu: [
    ['Na czym polega zaleta strukturalna TRC?', 'Bardzo szybkie chłodzenie ogranicza segregację chemiczną, rozdrabnia strukturę i zwiększa rozpuszczalność składników w roztworze stałym, więc rosną właściwości mechaniczne.', 'Wolne chłodzenie pozwala ziarnom urosnąć, dzięki czemu taśma jest bardziej plastyczna.'],
    ['Jakie warunki są potrzebne do superplastycznego formowania?', 'Stabilne, bardzo drobne ziarno poniżej 10 µm, temperatura powyżej 0,5 Tm i bardzo mała prędkość odkształcenia; blachę dociska gaz obojętny, np. argon.', 'Gruboziarnisty materiał, temperatura pokojowa i duża prędkość odkształcenia pod stemplem.'],
    ['Co to jest tiksotropia?', 'Materiał w spoczynku zachowuje się jak ciało stałe, a pod wpływem sił ścinających jego lepkość spada i płynie jak ciecz – wykorzystuje to thixoforming.', 'To wzrost lepkości materiału pod wpływem ścinania, co utrudnia wypełnianie matrycy.'],
  ],
  err: [['dwoma chłodzonymi walcami', 'dwoma podgrzewanymi stemplami'], ['poniżej 10 µm', 'powyżej 100 µm'], ['gazem obojętnym', 'olejem hydraulicznym'], ['powyżej 0,5 Tm', 'poniżej 0,1 Tm'], ['segregację', 'przewodność cieplną'], ['cieczą pod bardzo wysokim ciśnieniem', 'gazem w próżni'], ['tiksotropię', 'kruchość']],
};

ORAL[2] = {
  say: [
    ['def', 'Różnice między skalą **laboratoryjną** a **przemysłową** dotyczą czterech aspektów: **masy i przewodności cieplnej**, **kontroli atmosfery**, **ekonomii** oraz **automatyzacji**.'],
    ['det', 'W laboratorium **małe próbki** nagrzewają się i stygną **szybko i jednorodnie**, a w przemyśle **kilkutonowe wlewki** dają duże **gradienty temperatur**, czyli **segregację chemiczną** i naprężenia termiczne.'],
    ['det', 'W laboratorium łatwo o **wysoką próżnię** albo czysty argon czy hel, a w przemyśle stosuje się **atmosfery kontrolowane**, **żużle ochronne** i odgazowanie **VD/VOD**.'],
    ['det', 'Ekonomicznie w laboratorium liczy się **koszt jednostkowy eksperymentu**, a w przemyśle **koszt energii**, **czas cyklu** i **uzysk**, czyli minimum odpadu.'],
    ['det', 'Laboratorium steruje procesem **ręcznie** i elastycznie, a przemysł jest ściśle **zautomatyzowany systemami SCADA i MES**, więc zmiana parametrów grozi **stratami na dużą skalę**.'],
  ],
  fu: [
    ['Dlaczego duży wlewek jest problemem?', 'Duża masa daje ogromne gradienty temperatur, a to prowadzi do segregacji chemicznej, naprężeń termicznych i niejednorodnej mikrostruktury.', 'Duży wlewek stygnie szybciej i równomierniej niż mała próbka.'],
    ['Jak chroni się metal przed atmosferą w przemyśle?', 'Stosuje się atmosfery kontrolowane, żużle ochronne albo próżniowe odgazowanie VD/VOD, bo wysoka próżnia w dużej skali jest bardzo droga.', 'W przemyśle standardem jest wysoka próżnia w małych komorach, tak jak w laboratorium.'],
    ['Co optymalizuje przemysł, a co laboratorium?', 'Laboratorium – koszt jednostkowy eksperymentu; przemysł – koszty energii, czas cyklu, logistykę surowców i uzysk.', 'Laboratorium optymalizuje uzysk i czas cyklu, a przemysł koszt pojedynczej próbki.'],
  ],
  err: [['szybko i jednorodnie', 'wolno i niejednorodnie'], ['żużle ochronne', 'gazy szlachetne w komorze'], ['czas cyklu', 'koszt pojedynczej próbki'], ['ręcznie', 'w pełni automatycznie'], ['VD/VOD', 'EDS/WDS'], ['wysoką próżnię', 'żużel ochronny']],
};

ORAL[3] = {
  say: [
    ['def', '**Mikroskopia optyczna** i **skaningowa** to podstawowe narzędzia analizy mikrostruktury metali i stopów.'],
    ['det', '**Mikroskop optyczny** wykorzystuje **światło widzialne**, powiększa do około **1000–1500 razy** przy rozdzielczości około **0,2 µm** i wymaga **zgładu**, czyli szlifowania, polerowania i trawienia.'],
    ['det', 'W mikroskopie optycznym oceniamy **wielkość i kształt ziarna według ASTM**, strukturę po obróbce plastycznej, **czystość hutniczą**, czyli wtrącenia niemetaliczne, oraz **grubość warstw wierzchnich**.'],
    ['det', '**SEM** wykorzystuje **wiązkę elektronów w próżni**, daje powiększenia **powyżej 100 000 razy**, rozdzielczość rzędu **nanometrów** i ogromną **głębię ostrości**.'],
    ['det', 'Dzięki temu SEM służy do **fraktografii**, czyli badania przełomów ciągliwych, kruchych i zmęczeniowych, z przystawkami **EDS/WDS** bada **skład chemiczny**, a przez **EBSD** – orientację i teksturę.'],
  ],
  fu: [
    ['Jak przygotowuje się próbkę do mikroskopu optycznego?', 'Wykonuje się zgład metalograficzny: szlifowanie, polerowanie i trawienie chemiczne lub elektrochemiczne.', 'Próbkę napyla się złotem i umieszcza w próżni.'],
    ['Do czego służy EBSD?', 'Do analizy orientacji krystalograficznej i tekstury w mikroskopie skaningowym.', 'Do mikroanalizy składu chemicznego w mikroobszarach.'],
    ['Dlaczego przełomy bada się w SEM, a nie w mikroskopie optycznym?', 'Bo SEM ma ogromną głębię ostrości i daje obraz 3D powierzchni przy bardzo dużych powiększeniach.', 'Bo SEM wykorzystuje światło widzialne o większej rozdzielczości.'],
  ],
  err: [['1000–1500 razy', '100 000 razy'], ['0,2 µm', '0,2 nm'], ['w próżni', 'w powietrzu'], ['EBSD', 'EDS'], ['fraktografii', 'dylatometrii'], ['czystość hutniczą', 'twardość']],
};

ORAL[4] = {
  say: [
    ['def', 'Własności metali są **bezpośrednią funkcją struktury**, czyli ułożenia ziaren i blokowania ruchu **dyslokacji**, a strukturę kształtujemy na **trzech etapach** produkcji.'],
    ['det', 'Na **etapie ciekłym** stosujemy **modyfikację**, np. **TiB₂** dla stopów Al, która zamienia **kryształy słupkowe na równoosiowe**, a szybkością chłodzenia sterujemy rozstawem ramion dendrytów **DAS**.'],
    ['det', 'W **obróbce plastycznej na zimno** rośnie gęstość dyslokacji, czyli **umocnienie przez zgniot**, a **na gorąco** zachodzi **zdrowienie i rekrystalizacja dynamiczna**, które dają drobne, równoosiowe ziarno.'],
    ['det', 'Drobne ziarno jest korzystne zgodnie z zależnością **Halla-Petcha**: im **mniejsze ziarno**, tym **wyższa granica plastyczności**.'],
    ['det', 'W **obróbce cieplnej** wydzielenia ze **starzenia** stopów Al i Ti blokują dyslokacje, **hartowanie** stali daje **martenzyt**, a **odpuszczanie** przywraca ciągliwość.'],
  ],
  fu: [
    ['Co mówi zależność Halla-Petcha?', 'σy = σ0 + ky·d^(-1/2): im mniejsze ziarno, tym wyższa granica plastyczności.', 'Im większe ziarno, tym wyższa granica plastyczności.'],
    ['Czym różni się odkształcenie na zimno od odkształcenia na gorąco?', 'Na zimno rośnie gęstość dyslokacji i metal umacnia się zgniotem; na gorąco zachodzi zdrowienie i rekrystalizacja dynamiczna, która odnawia drobne ziarno.', 'Na zimno zachodzi rekrystalizacja, a na gorąco umocnienie zgniotem.'],
    ['Po co odpuszcza się stal po hartowaniu?', 'Hartowanie daje twardy martenzyt, a odpuszczanie przywraca ciągliwość.', 'Żeby jeszcze bardziej zwiększyć twardość martenzytu.'],
  ],
  err: [['słupkowe na równoosiowe', 'równoosiowe na słupkowe'], ['wyższa granica plastyczności', 'niższa granica plastyczności'], ['martenzyt', 'perlit'], ['umocnienie przez zgniot', 'zmiękczenie przez wyżarzanie'], ['TiB₂', 'Fe₃C'], ['przywraca ciągliwość', 'zwiększa kruchość']],
};

ORAL[5] = {
  say: [
    ['def', '**Skaner 3D** to cyfrowe urządzenie, które **bezdotykowo i nieinwazyjnie** odwzorowuje geometrię obiektu w formacie **CAD**, a wynikiem jest **chmura punktów**.'],
    ['list', 'Metody dzielimy na **kontaktowe** i **bezkontaktowe**, a wśród bezkontaktowych są trzy techniki: **skanowanie laserowe**, **światło strukturalne** i **fotogrametria**.'],
    ['det', 'Skaner **laserowy** analizuje **odbicie wiązki lasera** – punkt odbicia to **najjaśniejszy piksel** obrazu, a przy silnym świetle laser jest **naprzemiennie włączany i wyłączany**.'],
    ['det', 'Przy **świetle strukturalnym** rzucamy na obiekt **siatki lub paski** i liczymy współrzędne z ich zniekształceń metodą **triangulacji optycznej**; to zwykle **najdokładniejsza** metoda.'],
    ['det', '**Fotogrametria** wyznacza kształt ze **zdjęć z różnych perspektyw** na zasadzie **stereoskopii**, jako **lotnicza** – ortofotomapy z dronów – albo **naziemna bliskiego zasięgu**.'],
  ],
  fu: [
    ['Która technika skanowania jest zwykle najdokładniejsza i dlaczego?', 'Światło strukturalne – dzięki triangulacji optycznej ze znanej geometrii projektora i kamery zwykle daje najwyższą rozdzielczość i dokładność.', 'Fotogrametria lotnicza, bo zdjęcia z drona obejmują największy obszar.'],
    ['Co to jest chmura punktów?', 'Zbiór danych przestrzennych – współrzędnych punktów powierzchni – będący wynikiem skanowania 3D.', 'Model bryłowy CAD wykonany ręcznie przez konstruktora.'],
    ['Na czym polega stereoskopia w fotogrametrii?', 'Na wyznaczaniu głębi na podstawie zdjęć tego samego obiektu wykonanych z różnych punktów widzenia.', 'Na pomiarze czasu powrotu impulsu laserowego.'],
  ],
  err: [['najjaśniejszy piksel', 'najciemniejszy piksel'], ['triangulacji optycznej', 'spiekania laserowego'], ['najdokładniejsza', 'najmniej dokładna'], ['bezdotykowo i nieinwazyjnie', 'stykowo i niszcząco'], ['stereoskopii', 'dyfrakcji'], ['chmura punktów', 'zgład metalograficzny']],
};

ORAL[6] = {
  say: [
    ['def', '**Druk 3D** to wytwarzanie **addytywne**, czyli budowanie obiektu **warstwa po warstwie** z modelu cyfrowego, w odróżnieniu od tradycyjnych procesów **subtraktywnych**.'],
    ['list', 'Trzy główne technologie to **FDM/FFF**, **SLA** i **SLS**.'],
    ['det', '**FDM** nakłada **stopiony filament termoplastyczny** o średnicy **1,75 lub 2,85 mm** przez **głowicę** rozgrzaną do **190–260°C**; to najpopularniejsza metoda, ale widać **schodkowanie** warstw.'],
    ['det', '**SLA** utwardza **ciekłą żywicę fotopolimerową światłem UV** w układzie **bottom-up**, z dokładnością około **0,1 mm**, ale wymaga **mycia i doutwardzania UV**.'],
    ['det', '**SLS** spieka **proszek wiązką lasera**, warstwami o grubości **20–150 µm**, a wiązkę odchylają **lustra galwanometryczne**.'],
  ],
  fu: [
    ['Czym różni się wytwarzanie addytywne od subtraktywnego?', 'Addytywne buduje obiekt, dodając kolejne warstwy materiału; subtraktywne usuwa materiał, np. cięciem i szlifowaniem.', 'Addytywne usuwa materiał warstwami, a subtraktywne go dokłada.'],
    ['Dlaczego wydruki FDM mają widoczne linie?', 'Bo materiał nakładany jest warstwami ze stopionego filamentu – to tzw. efekt schodkowania.', 'Bo laser nierówno spieka proszek.'],
    ['Na czym polega post-processing w SLA?', 'Wydruk trzeba umyć i dodatkowo doutwardzić światłem UV.', 'Wydruk trzeba wygrzać w piecu do spiekania proszku.'],
  ],
  err: [['addytywne', 'subtraktywne'], ['światłem UV', 'wiązką elektronów'], ['proszek wiązką lasera', 'żywicę lampą UV'], ['190–260°C', '400–600°C'], ['0,1 mm', '1 cm'], ['lustra galwanometryczne', 'chłodzone walce']],
};

ORAL[7] = {
  say: [
    ['def', 'Według Arystotelesa wyróżniamy cztery rodzaje wiedzy, które odpowiadają na pytania: **co, dlaczego, jak i kto**.'],
    ['det', '**Know-what** to wiedza bliskoznaczna z **informacją** – twarde **fakty i liczby**, na przykład liczba mieszkańców Nowego Jorku; można ją przesłać **danymi i bitami**.'],
    ['det', '**Know-why** **wyjaśnia rzeczywistość** przez **zasady i prawa uniwersalne**, jak prawa ruchu; w zarządzaniu obejmuje też decyzje, **czego nie robić**.'],
    ['det', '**Know-how** to **umiejętności** ludzi i zespołów, sprawność robienia czegoś, w przemyśle – wiedza **nieopisana patentami i licencjami**, potrzebna przy **transferze technologii**.'],
    ['det', '**Know-who** to wiedza o tym, **kto posiada wiedzę**, oraz **kompetencje społeczne** do współpracy z **ekspertami zewnętrznymi**.'],
    ['end', 'Z pragmatyki życiowej dochodzą jeszcze **know-where, know-if, know-when, know-between i know-which**.'],
  ],
  fu: [
    ['Czym know-how różni się od know-what?', 'Know-what to fakty i dane, które da się przesłać bitami; know-how to umiejętności i sprawność działania, często nieopisane w patentach.', 'Know-how to fakty i liczby, a know-what to umiejętności praktyczne.'],
    ['Co to jest know-which?', 'Umiejętność wyboru spośród skończonej liczby alternatyw.', 'Umiejętność wyboru właściwego momentu działania.'],
    ['Dlaczego know-who jest dziś tak ważna?', 'Bo nowe produkty powstają z wiedzy wielu dziedzin, więc trzeba wiedzieć, kto ma kompetencje, i umieć współpracować z ekspertami.', 'Bo zastępuje wiedzę techniczną w procesie produkcji.'],
  ],
  err: [['informacją', 'umiejętnością'], ['nieopisana patentami i licencjami', 'w całości opisana patentami'], ['czego nie robić', 'ile to kosztuje'], ['ekspertami zewnętrznymi', 'maszynami produkcyjnymi'], ['wyjaśnia rzeczywistość', 'podaje wyłącznie liczby']],
};

ORAL[8] = {
  say: [
    ['def', 'Proces twórczy przebiega w **pięciu etapach**, w ściśle określonej kolejności.'],
    ['det', 'Najpierw następuje **wyszukiwanie lub intuicyjne rozpoznanie problemu**, a potem **przygotowanie**, czyli skupienie na problemie, **zbieranie informacji** i stawianie **roboczych hipotez**.'],
    ['det', 'Trzeci etap to **inkubacja** – **odprężenie**, w którym **podświadomość** układa fakty w nowe wzory, choć człowiek wydaje się bezczynny.'],
    ['det', 'Czwarty etap to **zrozumienie lub olśnienie** – pomysł pojawia się w **najmniej oczekiwanej chwili** i trzeba go **szybko zanotować**.'],
    ['det', 'Na końcu jest **weryfikacja i zastosowanie**, czyli udowodnienie **eksperymentem lub logicznym rozumowaniem**, że pomysł rozwiązuje problem.'],
    ['end', 'W klasycznym modelu **Wallasa** te etapy nazywamy: **preparacja, inkubacja, iluminacja i weryfikacja**.'],
  ],
  fu: [
    ['Co dzieje się w fazie inkubacji?', 'Po zebraniu informacji następuje odprężenie, a podświadomość przetwarza materiał i układa fakty w nowe wzory.', 'Człowiek intensywnie i świadomie zbiera dane oraz stawia hipotezy.'],
    ['Dlaczego pomysł z fazy olśnienia trzeba zanotować?', 'Bo pojawia się nagle, w nieoczekiwanej chwili, i świadoma część umysłu może o nim szybko zapomnieć.', 'Bo trzeba go od razu zgłosić do urzędu patentowego.'],
    ['Jak nazywają się etapy w modelu Wallasa?', 'Preparacja, inkubacja, iluminacja i weryfikacja.', 'Preparacja, iluminacja, inkubacja i weryfikacja.'],
  ],
  err: [['pięciu etapach', 'trzech etapach'], ['podświadomość', 'świadoma analiza'], ['szybko zanotować', 'natychmiast zapomnieć'], ['eksperymentem lub logicznym rozumowaniem', 'intuicją i marzeniem na jawie'], ['inkubacja', 'iluminacja']],
};

ORAL[9] = {
  say: [
    ['def', 'Wielka Piątka to pięcioczynnikowy model osobowości, który obejmuje: **neurotyczność, ekstrawersję, otwartość na doświadczenie, ugodowość i sumienność**.'],
    ['det', '**Sumienność** opisuje **zorganizowanie, wytrwałość, odpowiedzialność i motywację** do działania; takie osoby są **skrupulatne i systematyczne**.'],
    ['ex', 'W inżynierii produkcji osoby sumienne świetnie sprawdzają się w **kontroli jakości, auditach i zarządzaniu procesami**.'],
    ['det', '**Otwartość na doświadczenie** to **poszukiwanie nowości, kreatywność, wyobraźnia i ciekawość intelektualna**.'],
    ['ex', 'Osoby otwarte łatwo **adaptują się do zmian** i chętnie **wdrażają innowacje technologiczne**.'],
  ],
  fu: [
    ['Co oznacza niska neurotyczność?', 'Stabilność emocjonalną – odporność na stres i trafne decyzje pod presją.', 'Nadmierną wrażliwość na stres i częste wahania nastroju.'],
    ['Gdzie w fabryce najlepiej sprawdzi się osoba sumienna?', 'W kontroli jakości, auditach i zarządzaniu procesami, bo jest skrupulatna i systematyczna.', 'W dziale marketingu, bo jest ekstrawertyczna i towarzyska.'],
    ['Czy inteligencja jest wymiarem Wielkiej Piątki?', 'Nie – wymiary to neurotyczność, ekstrawersja, otwartość na doświadczenie, ugodowość i sumienność.', 'Tak – inteligencja zastępuje w modelu otwartość na doświadczenie.'],
  ],
  err: [['skrupulatne i systematyczne', 'impulsywne i chaotyczne'], ['adaptują się do zmian', 'unikają zmian'], ['kontroli jakości, auditach', 'kampaniach reklamowych'], ['ugodowość', 'inteligencję']],
};

ORAL[10] = {
  say: [
    ['def', '**Pracownicy wiedzy** to osoby, dla których głównym narzędziem pracy jest **kapitał intelektualny**.'],
    ['list', 'Przykładowe role to: **Kontroler, Pomocnik, Uczący się, Konsolidator, Łącznik i Organizator**.'],
    ['det', '**Kontroler** **monitoruje wyniki organizacji** na podstawie **surowych informacji** – analizuje, zbiera i rozpowszechnia dane.'],
    ['det', '**Organizator** zajmuje się **planowaniem działań** osobistych lub organizacyjnych, na przykład tworzy **listy spraw** i **harmonogramy**.'],
    ['det', 'Warto odróżnić **Konsolidatora**, który **łączy informacje z różnych źródeł** w nową informację, od **Łącznika**, który buduje **relacje z ludźmi** wykonującymi ten sam rodzaj pracy.'],
    ['end', 'Role te opisali m.in. **Davenport i Prusak**, **Nonaka i Takeuchi**, Moore i Rugullies oraz Geisler.'],
  ],
  fu: [
    ['Czym zajmuje się Pomocnik?', 'Przekazuje informacje, aby uczyć innych i pomagać im rozwiązywać napotkane problemy.', 'Tworzy harmonogramy i listy spraw do załatwienia.'],
    ['Kim jest Uczący się?', 'Osobą, która wykorzystuje informacje i praktyczne przypadki, by doskonalić własne umiejętności i kompetencje.', 'Osobą, która monitoruje wyniki organizacji na podstawie surowych danych.'],
    ['Czym różni się Konsolidator od Łącznika?', 'Konsolidator miesza informacje z różnych źródeł i tworzy nową informację; Łącznik tworzy relacje z ludźmi, by dzielić się informacjami i wspierać nawzajem.', 'Konsolidator buduje sieć kontaktów, a Łącznik scala dane z różnych baz.'],
  ],
  err: [['monitoruje wyniki organizacji', 'uczy nowych pracowników'], ['listy spraw', 'kampanie reklamowe'], ['łączy informacje z różnych źródeł', 'nadzoruje linię produkcyjną'], ['relacje z ludźmi', 'bazy danych'], ['kapitał intelektualny', 'kapitał obrotowy']],
};

ORAL[11] = {
  say: [
    ['def', '**Logistyka** to proces **przepływu fizycznego dóbr materialnych** – surowców, materiałów i wyrobów gotowych – w przedsiębiorstwie i **między przedsiębiorstwami**, wraz z **przepływem informacji**.'],
    ['det', 'To także **zintegrowana, systemowa koncepcja zarządzania** tymi przepływami, której ideą jest ich **koordynacja w celu minimalizacji kosztów**.'],
    ['list', 'Logistykę opisujemy w trzech aspektach: **koncepcyjno-funkcjonalnym**, **przedmiotowo-strukturalnym** i **efektywnościowym**.'],
    ['det', 'Aspekt **efektywnościowy** oznacza zapewnienie klientom **pożądanego poziomu obsługi** przy **racjonalnych kosztach**.'],
    ['end', 'Jej fundamentem jest zasada **7R**: właściwy **produkt, ilość, stan, miejsce, czas, klient i koszt**.'],
  ],
  fu: [
    ['Na czym polega aspekt przedmiotowo-strukturalny?', 'Logistykę widzimy jako fizyczny proces przepływów towarowych i kompleks czynności związanych z ich realizacją.', 'Logistykę widzimy jako koncepcję zarządzania przepływami.'],
    ['Wymień zasadę 7R.', 'Właściwy produkt, właściwa ilość, właściwy stan, właściwe miejsce, właściwy czas, właściwy klient i właściwy koszt.', 'Właściwy produkt, cena, promocja, dystrybucja, ludzie, procesy i dostawca.'],
    ['Czy logistyka dotyczy tylko towarów?', 'Nie – obejmuje także przepływ towarzyszących im informacji.', 'Tak – informacje są przedmiotem wyłącznie systemów IT, nie logistyki.'],
  ],
  err: [['między przedsiębiorstwami', 'wyłącznie w jednym dziale'], ['minimalizacji kosztów', 'maksymalizacji zapasów'], ['pożądanego poziomu obsługi', 'najniższej ceny sprzedaży'], ['przepływem informacji', 'przepływem gotówki']],
};

ORAL[12] = {
  say: [
    ['def', 'Misją **logistyki zaopatrzenia** jest **optymalizacja transferu surowców, materiałów i podzespołów** wpływających do przedsiębiorstwa, także przez **ogniwa zasilające**.'],
    ['det', 'To **pierwsze ogniwo** łańcucha – przed **logistyką produkcji i dystrybucji** – które łączy **rynek dostawców** przez **magazyn surowców** z **procesem produkcji**.'],
    ['det', 'W praktyce chodzi o **ciągłość produkcji** przy **minimalnych łącznych kosztach zakupu i magazynowania**.'],
    ['end', 'Istotą jest **równowaga**: nie dopuścić do zatrzymania linii z **braku materiału**, ale też nie zamrażać **kapitału obrotowego** w nadmiernych zapasach.'],
  ],
  fu: [
    ['Gdzie w łańcuchu logistycznym jest zaopatrzenie?', 'Na początku – przed logistyką produkcji i dystrybucji; łączy rynek dostawców przez magazyn surowców z produkcją.', 'Na końcu – po dystrybucji, przy kontakcie z klientem.'],
    ['Co grozi przy zbyt dużych zapasach?', 'Zamrożenie kapitału obrotowego i wysokie koszty magazynowania.', 'Zatrzymanie linii produkcyjnej z braku materiału.'],
  ],
  err: [['pierwsze ogniwo', 'ostatnie ogniwo'], ['ciągłość produkcji', 'maksymalne zapasy'], ['kapitału obrotowego', 'kapitału intelektualnego'], ['rynek dostawców', 'rynek klientów']],
};

ORAL[13] = {
  say: [
    ['def', '**Controlling strategiczny** to **długofalowy podsystem wsparcia zarządzania strategicznego**, który pomaga rozstrzygać o **przetrwaniu i rozwoju** firmy z uwzględnieniem **otoczenia**.'],
    ['det', 'Wspiera plany o horyzoncie **minimum 3–5 lat**, **monitoruje szanse i zagrożenia** z otoczenia i **stale diagnozuje zmiany** rynkowe, demograficzne i ekonomiczne.'],
    ['det', 'Wymaga **pełnej otwartości na informacje**, bo zakłada częściową nieprzewidywalność otoczenia.'],
    ['det', 'Jego zadaniem jest **kaskadowanie celów**: strategiczne, potem **taktyczne na 1–5 lat** i **operacyjne do roku**, a także nadzór nad **wartością firmy EVA** i monitoring odchyleń.'],
    ['det', 'Do kontroli projektów używa metody **EVM**: **CV = BCWP − ACWP**, **SV = BCWP − BCWS**, a wskaźniki to **CPI = BCWP/ACWP** i **SPI = BCWP/BCWS**.'],
  ],
  fu: [
    ['Co oznacza ujemne CV?', 'Że rzeczywisty koszt pracy wykonanej (ACWP) jest wyższy od budżetowego (BCWP), czyli przekroczyliśmy koszty.', 'Że projekt wyprzedza harmonogram.'],
    ['Czym różni się CPI od SPI?', 'CPI = BCWP/ACWP mierzy efektywność kosztową, a SPI = BCWP/BCWS – efektywność harmonogramu.', 'CPI mierzy opóźnienia, a SPI przekroczenie kosztów.'],
    ['Jaki horyzont ma controlling strategiczny?', 'Minimum 3–5 lat, w ujęciu makroekonomicznym nawet 5–10 lat.', 'Zwykle jeden miesiąc, bo opiera się na bieżących rozliczeniach księgowych.'],
  ],
  err: [['3–5 lat', '3–5 miesięcy'], ['CV = BCWP − ACWP', 'CV = BCWP − BCWS'], ['operacyjne do roku', 'operacyjne na 10 lat'], ['szanse i zagrożenia', 'faktury i paragony'], ['SPI = BCWP/BCWS', 'SPI = BCWP/ACWP']],
};

ORAL[14] = {
  say: [
    ['def', 'Wyróżniamy pięć strategii logistycznych: **opóźniania, konsolidacji, racjonalizacji, zróżnicowanej dystrybucji i mieszaną**.'],
    ['det', '**Strategia opóźniania** przesuwa nadanie **ostatecznego kształtu produktu** na **jeden z ostatnich etapów**, np. producent **maluje kuchenki w centrum dystrybucyjnym**, więc ma mniejsze zapasy i kolory dopasowane do sklepów.'],
    ['det', '**Strategia konsolidacji** **łączy działania dla korzyści skali**: łączymy ładunki, obniżamy koszty jednostkowe i możemy mieć **mniej magazynów** przy tym samym poziomie obsługi.'],
    ['det', 'Racjonalizacja odrzuca zasadę „**wszystko wszystkim**” i opiera się na analizie **80/20**, a zróżnicowana dystrybucja daje **różny poziom obsługi** różnym klientom.'],
    ['end', 'Strategia **mieszana**, wielowariantowa, jest często **tańsza** niż strategie czyste.'],
  ],
  fu: [
    ['Podaj przykład strategii opóźniania.', 'Producent kuchenek przenosi malowanie z fabryki do centrum dystrybucyjnego i maluje je dopiero pod zamówienia ze sklepów.', 'Firma łączy małe przesyłki w pełne ciężarówki.'],
    ['Na czym polega strategia racjonalizacji?', 'Firma nie sprzedaje wszystkiego wszystkim – analizuje asortyment, klientów i koszty, np. zasadą 80/20.', 'Firma zwiększa liczbę magazynów, by skrócić czas dostaw.'],
    ['Dlaczego strategia mieszana bywa lepsza?', 'Bo strategie wielowariantowe często dają niższe koszty niż czyste, choć czyste są prostsze w zarządzaniu.', 'Bo zawsze wymaga mniejszej liczby produktów w ofercie.'],
  ],
  err: [['jeden z ostatnich etapów', 'pierwszy etap'], ['mniej magazynów', 'więcej magazynów'], ['80/20', '50/50'], ['tańsza', 'droższa'], ['korzyści skali', 'korzyści podatkowych']],
};

ORAL[15] = {
  say: [
    ['def', 'Według prof. Obłoja **strategia to zbiór kluczowych wyborów w czasie i przestrzeni**, a jej rodzaje to **strategia prostych reguł, doskonalenia firmy i innowacji**.'],
    ['det', '**Strategia prostych reguł**, opisana przez **Eisenhardt i Sulla**, dotyczy **start-upów i firm rodzinnych** do poziomu SME – zamiast złożonych mechanizmów stosuje się **proste reguły** jako elastyczne drogowskazy.'],
    ['det', '**Strategię doskonalenia** stosuje firma o **dojrzałej pozycji**, która musi rosnąć **szybciej niż branża**; wyznacza **1–3 cele strategiczne** i **kluczowe czynniki sukcesu**, walcząc z **rutyną i niepotrzebną złożonością**.'],
    ['det', '**Strategia innowacji** jest potrzebna, gdy firma **wpada w rutynę**; buduje przewagę przez innowacje **produktowe, procesowe i nowe modele biznesowe**.'],
    ['ex', 'Duże firmy przeznaczają na to średnio około **1% rocznego przychodu**, jak **KGHM** czy **PKN ORLEN**.'],
  ],
  fu: [
    ['Jak prof. Obłój definiuje strategię?', 'Strategia to zbiór kluczowych wyborów w czasie i przestrzeni.', 'Strategia to plan finansowy firmy na najbliższy rok.'],
    ['Na czym opiera się strategia prostych reguł?', 'Na koncentracji na ważnych wyzwaniach i odbiorcach, kontroli kosztów, misji i wizji jako ramach, nauce na błędach i potencjale ludzi.', 'Na rozbudowanych procedurach, silosach i szerokiej ofercie.'],
    ['Czemu zapobiega strategia doskonalenia?', 'Niebezpieczeństwu rutyny i niepotrzebnej złożoności, np. silosom, skomplikowanym cennikom i zbyt szerokiej ofercie.', 'Zbyt szybkiemu wzrostowi start-upu.'],
  ],
  err: [['w czasie i przestrzeni', 'w budżecie i hierarchii'], ['start-upów i firm rodzinnych', 'dojrzałych koncernów'], ['1–3 cele strategiczne', '20 celów strategicznych'], ['1% rocznego przychodu', '50% rocznego przychodu'], ['szybciej niż branża', 'wolniej niż branża']],
};

ORAL[16] = {
  say: [
    ['def', 'Wdrożenie strategii to **ustrukturyzowany proces informacyjno-decyzyjny**, złożony z **czterech etapów**.'],
    ['det', 'Najpierw **analiza**: określamy **misję**, **wizję**, domenę działania i cele strategiczne.'],
    ['det', 'Potem **planowanie**: na podstawie badania **mikro- i makrootoczenia** tworzymy plany i **kroki milowe**.'],
    ['det', 'Trzeci etap to **wdrażanie i kaskadowanie**: cele strategiczne przekładamy na **taktyczne i operacyjne**, alokujemy zasoby i identyfikujemy **sześć obszarów zmian** – załogę, systemy, strukturę, strategię, wartości i technologię.'],
    ['det', 'Na końcu **podjęcie decyzji i kontrola**: **sprawozdawczość**, monitoring **odchyleń budżetowych i terminowych** i cykliczna kontrola wyników.'],
  ],
  fu: [
    ['Czym różni się misja od wizji?', 'Misja to podstawowy, niepowtarzalny cel wyróżniający firmę; wizja to obraz przyszłości – czym firma będzie się zajmować.', 'Misja to obraz przyszłości firmy, a wizja to jej bieżący budżet.'],
    ['Wymień obszary zmian przy wdrażaniu strategii.', 'Załoga, systemy info-decyzyjne, struktura organizacyjna, strategia, dzielone wartości i kultura oraz technologia.', 'Cena, produkt, promocja i dystrybucja.'],
    ['Na czym polega kaskadowanie celów?', 'Cele strategiczne przekłada się na cele taktyczne i operacyjne i wiąże z planami sprzedaży i produkcji.', 'Cele operacyjne łączy się w jeden cel strategiczny na końcu roku.'],
  ],
  err: [['czterech etapów', 'siedmiu etapów'], ['mikro- i makrootoczenia', 'wyłącznie budżetu działu'], ['taktyczne i operacyjne', 'wyłącznie strategiczne'], ['odchyleń budżetowych i terminowych', 'nastrojów pracowników']],
};

ORAL[17] = {
  say: [
    ['def', '**Segmentacja** to strategiczny **podział rynku** na mniejsze, **jednorodne grupy klientów** o podobnych potrzebach, zachowaniach lub cechach.'],
    ['det', 'Jej celem jest precyzyjne **dopasowanie oferty**, optymalizacja marketingu, **obniżenie kosztów**, większa **lojalność** klientów i planowanie produkcji **bez niedoborów i nadmiarów**.'],
    ['list', 'Kryteria segmentacji to: **geograficzne, demograficzne, psychograficzne i behawioralne**.'],
    ['det', 'Kryteria **demograficzne** to np. wiek, płeć, wykształcenie, zawód i dochód; **psychograficzne** – klasa społeczna, **styl życia** i osobowość; **behawioralne** – okazje zakupu i **status użytkownika**.'],
    ['end', 'Ryzykiem segmentacji jest jej **koszt** i możliwe **błędy**, które dają źle doprecyzowaną ofertę.'],
  ],
  fu: [
    ['Do którego kryterium należy styl życia?', 'Do psychograficznego – razem z klasą społeczną i osobowością.', 'Do behawioralnego – razem ze statusem użytkownika.'],
    ['Jakie są cele segmentacji?', 'Dopasowanie oferty, optymalizacja marketingu, niższe koszty, lojalność klientów i planowanie produkcji bez niedoborów i nadmiarów.', 'Ujednolicenie oferty dla wszystkich klientów i zwiększenie zapasów.'],
    ['Jakie są wady segmentacji?', 'Znaczny koszt procesu i ryzyko błędów, przez które oferta jest źle doprecyzowana.', 'Nie ma wad – segmentacja jest darmowa i zawsze trafna.'],
  ],
  err: [['jednorodne grupy klientów', 'losowe grupy klientów'], ['styl życia', 'dochód'], ['status użytkownika', 'wiek'], ['bez niedoborów i nadmiarów', 'z dużymi nadmiarami']],
};

ORAL[18] = {
  say: [
    ['def', '**Analiza PEST** bada **makrootoczenie** firmy w czterech wymiarach: **polityczno-prawnym, ekonomicznym, społeczno-kulturowym i technologicznym**.'],
    ['det', 'Pozwala wskazać **zewnętrzne szanse i zagrożenia**, na które firma **nie ma bezpośredniego wpływu**, ale musi się do nich **dostosować**.'],
    ['det', 'W materiałach badanie otoczenia obejmuje rynek w wymiarze **podmiotowym, przedmiotowym i przestrzennym**.'],
    ['det', '**Analiza jakościowa** opisuje **nabywców**, **segmenty**, **kanały rynku** i **konkurencję**.'],
    ['det', '**Analiza ilościowa** określa **wielkość i pojemność rynku**, **dynamikę**, **strukturę cen**, **rentowność** i **chłonność**, żeby planować produkcję bez strat.'],
  ],
  fu: [
    ['Podaj przykład czynnika ekonomicznego w PEST.', 'Na przykład inflacja albo zmiana stóp procentowych.', 'Na przykład nowa ustawa o emisjach CO₂.'],
    ['Czym różni się analiza jakościowa od ilościowej?', 'Jakościowa opisuje nabywców, segmenty, kanały i konkurencję; ilościowa mierzy wielkość, dynamikę, ceny, rentowność i chłonność rynku.', 'Jakościowa liczy wielkość rynku, a ilościowa opisuje konkurencję.'],
    ['Czy firma ma wpływ na czynniki PEST?', 'Nie bezpośrednio – to czynniki zewnętrzne, do których firma musi się strategicznie dostosować.', 'Tak – firma kształtuje je swoją polityką cenową.'],
  ],
  err: [['makrootoczenie', 'wnętrze'], ['nie ma bezpośredniego wpływu', 'ma pełną kontrolę'], ['kanały rynku', 'koszty produkcji'], ['chłonność', 'kruchość']],
};

ORAL[19] = {
  say: [
    ['def', '**RTB – Reason To Believe** – to **racjonalne zabezpieczenie i udowodnienie obietnicy marki**.'],
    ['det', 'Dobre RTB jest **wiarygodne, niepodważalne i unikalne**, wyróżnia markę na nasyconym rynku i trzeba je określić **już na etapie myślenia o produkcie**.'],
    ['list', 'Wyróżniamy siedem podejść: **logiczne uzasadnienie, twarde dowody, rekomendacje, konkurencyjność, bezpieczeństwo, historię marki i storytelling**.'],
    ['ex', 'Na przykład **twarde dowody** to wyniki badań, jak „u 90% kobiet zmarszczki się zmniejszyły”, a w przemyśle – **certyfikat, norma ISO czy patent**.'],
    ['end', 'Samo RTB bywa jednak niepewne, dlatego dziś **równolegle buduje się emocjonalną więź** z klientem.'],
  ],
  fu: [
    ['Podaj przykład RTB opartego na historii marki.', 'Na przykład kremy dr Irena Eris, które budują zaufanie na prawie 40 latach obecności na rynku.', 'Na przykład obniżka ceny o 20% w sezonie.'],
    ['Co oznacza konkurencyjność jako podejście RTB?', 'Wykazanie przewagi pozacenowej, np. unikatowego składnika albo jedynego opakowania wielokrotnego użytku.', 'Oferowanie najniższej ceny na rynku.'],
    ['Kiedy trzeba określić RTB?', 'Już na etapie myślenia o produkcie, żeby firma wiedziała, co i dlaczego obiecuje.', 'Dopiero po pierwszych reklamacjach klientów.'],
  ],
  err: [['już na etapie myślenia o produkcie', 'dopiero po wprowadzeniu produktu'], ['niepodważalne', 'tanie'], ['emocjonalną więź', 'rabat cenowy'], ['certyfikat, norma ISO czy patent', 'slogan i jingiel']],
};

ORAL[20] = {
  say: [
    ['def', '**Public Relations** to **planowe i długofalowe budowanie relacji z otoczeniem**.'],
    ['list', 'PR pełni cztery funkcje: **informacyjną, wizerunkową, relacyjną i kryzysową**.'],
    ['det', 'Funkcja **informacyjna** zapewnia **stały, rzetelny i dwukierunkowy przepływ informacji**, a **wizerunkowa**, zwana też harmonizującą, **buduje i chroni reputację**.'],
    ['det', 'Funkcja **relacyjna, czyli łącznikowa**, kształtuje relacje **między pracownikami – to PR wewnętrzny** – oraz z instytucjami zewnętrznymi.'],
    ['det', 'Funkcja **kryzysowa** to zarządzanie komunikacją w **sytuacjach nagłych**, np. sporach prawnych, przez **natychmiastową informację** i **ochronę wartości marki**.'],
  ],
  fu: [
    ['Podaj przykład działania w funkcji kryzysowej.', 'Po awarii lub wycieku firma od razu wydaje jasne oświadczenie, by chronić wartość marki.', 'Firma organizuje coroczny piknik integracyjny dla pracowników.'],
    ['Co to jest PR wewnętrzny?', 'Kształtowanie harmonijnych relacji między pracownikami – element funkcji relacyjnej, czyli łącznikowej.', 'Reklama produktów skierowana do klientów zewnętrznych.'],
  ],
  err: [['dwukierunkowy', 'jednokierunkowy'], ['między pracownikami', 'między konkurentami'], ['sytuacjach nagłych', 'okresach spokoju'], ['długofalowe', 'jednorazowe']],
};
