'use strict';
/* ŚWIAT 2 · GŁOWA INŻYNIERA · P07–P10 */

Q({
  id: 7, w: 1, t: 'Rodzaje wiedzy know-x',
  q: 'Wymienić i opisać 4 rodzaje wiedzy (know-x) wg Arystotelesa.',
  a: [
    'Cztery rodzaje wiedzy odpowiadają na pytania **co? dlaczego? jak? kto?**:',
    '• **know-what (wiedzieć co)** – bliskoznaczna z **informacją**: twarde **fakty** i uporządkowane wartości liczbowe (np. liczba mieszkańców Nowego Jorku, składniki naleśnika, miejsce bitwy pod Waterloo); można ją przesłać **danymi i bitami**.',
    '• **know-why (wiedzieć dlaczego)** – **wyjaśnia rzeczywistość**: **zasady i prawa uniwersalne** (np. prawa ruchu); kluczowa w przemyśle **chemicznym i elektronicznym** (przyspiesza postęp, pozwala unikać błędów); w zarządzaniu obejmuje też decyzje, **czego nie robić**.',
    '• **know-how (wiedzieć jak)** – **umiejętności ludzi i zespołów**, zdolność i sprawność robienia czegoś; nie jest wiedzą typowo praktyczną; w przemyśle to umiejętności **nieopisane patentami i licencjami**, niezbędne przy **transferze technologii**.',
    '• **know-who (wiedzieć kto)** – wiedza o **posiadaczach wiedzy** i o tym, co wiedzą, a także **kompetencje społeczne**: współpraca i komunikacja z **ekspertami zewnętrznymi** (nowe produkty łączą wiedzę z wielu dziedzin).',
    'Odmiany z pragmatyki życiowej: **know-where, know-if, know-when, know-between, know-which**.'
  ],
  x: [
    '## Know-what (wiedzieć co)',
    'Bliskoznaczna z informacją. Dotyczy twardych faktów oraz uporządkowanych i wyjaśnionych wartości liczbowych, np. liczba mieszkańców Nowego Jorku, składniki naleśnika, miejsce bitwy pod Waterloo. Może być bezpośrednio przesyłana za pomocą danych i bitów.',
    '## Know-why (wiedzieć dlaczego)',
    'Wiedza, która wyjaśnia rzeczywistość. Odnosi się bezpośrednio do zasad i praw uniwersalnych (np. praw ruchu). Niezwykle istotna w niektórych obszarach, np. w przemyśle chemicznym i elektronicznym, gdzie dostęp do niej przyspiesza postęp i pozwala unikać błędów. W zarządzaniu obejmuje także decyzje o tym, czego nie robić i jakich działań nie wykonywać.',
    '## Know-how (wiedzieć jak)',
    'Odnosi się do umiejętności ludzi i zespołów, czyli do zdolności i sprawności robienia czegoś. Nie można klasyfikować jej jako typowo praktycznej. Wywodzi się z sektora przemysłowego, gdzie oznacza specyficzne umiejętności i zdolności nieopisane za pomocą patentów i licencji, lecz niezbędne w momencie transferu technologii.',
    '## Know-who (wiedzieć kto)',
    'Określa posiadaczy wiedzy i opisuje wiedzę, którą posiadają. Dotyczy także społecznych zdolności współpracy i komunikacji z ekspertami zewnętrznymi. Kompetencje społeczne i umiejętności komunikacji wchodzą w ramy know-who, co nadaje jej kluczowe znaczenie – nowe produkty coraz częściej powstają na podstawie wiedzy z wielu różnych obszarów, dziedzin i dyscyplin.',
    '## Odmiany wiedzy wynikające z pragmatyki życiowej',
    '• Know-where (wiedzieć gdzie): umiejętność wyboru właściwego miejsca działania.',
    '• Know-if (wiedzieć, co się stanie, gdy): tworzenie wariantów wydarzeń, zapobiegliwość i dalekowzroczność strategiczna.',
    '• Know-when (wiedzieć kiedy): wybór właściwego momentu, tempa i planowania, w tym wiedza, kiedy powstrzymać się od decyzji.',
    '• Know-between (wiedzieć, jaka jest relacja pomiędzy): rozpoznawanie relacji i wczesne dostrzeganie trendów dzięki korelacji zjawisk.',
    '• Know-which (wiedzieć który): dokonywanie wyboru spośród skończonej liczby alternatyw.'
  ],
  k: ['know-what – fakty, informacja', 'Przesyłana danymi i bitami', 'know-why – zasady i prawa', 'Czego nie robić', 'know-how – umiejętności', 'Nieopisane patentami, transfer technologii', 'know-who – kto co wie', 'Kompetencje społeczne, eksperci'],
  m: 'CO? DLACZEGO? JAK? KTO? = encyklopedia (fakty, bity) → podręcznik fizyki (prawa ruchu) → mistrz w warsztacie (niespisane w patencie) → książka telefoniczna ekspertów. Bonusowe pytajniki: GDZIE, CO JEŚLI, KIEDY, POMIĘDZY, KTÓRY.',
  f: [
    ['know-what', 'fakty i wartości liczbowe; bliskoznaczna z informacją; przesyłana danymi i bitami'],
    ['know-why', 'zasady i prawa uniwersalne wyjaśniające rzeczywistość (np. prawa ruchu)'],
    ['know-how', 'umiejętności ludzi i zespołów – zdolność i sprawność robienia czegoś'],
    ['know-who', 'kto posiada wiedzę i jaką; współpraca i komunikacja z ekspertami'],
    ['know-where', 'umiejętność wyboru właściwego miejsca działania'],
    ['know-if', 'tworzenie wariantów wydarzeń – zapobiegliwość i dalekowzroczność'],
    ['know-when', 'wybór właściwego momentu i tempa, także kiedy powstrzymać się od decyzji'],
    ['know-between', 'rozpoznawanie relacji i wczesne dostrzeganie trendów przez korelację zjawisk'],
    ['know-which', 'wybór spośród skończonej liczby alternatyw'],
  ],
  c: [
    ['know-what jest bliskoznaczna z ___', 'informacją', ['umiejętnością', 'intuicją', 'kompetencją społeczną']],
    ['know-how w przemyśle to umiejętności nieopisane ___', 'patentami i licencjami', ['w encyklopedii', 'w bazie danych', 'w cenniku']],
  ],
  tf: [
    ['know-what jest bliskoznaczna z informacją', true],
    ['know-how można w pełni opisać patentem i licencją', false, 'know-how to umiejętności NIEOPISANE patentami i licencjami, niezbędne przy transferze technologii'],
    ['know-why obejmuje w zarządzaniu także decyzje, czego nie robić', true],
    ['know-who dotyczy też komunikacji z ekspertami zewnętrznymi', true],
    ['know-when to wybór spośród skończonej liczby alternatyw', false, 'To know-which; know-when = wybór właściwego momentu i tempa'],
    ['know-between to wczesne dostrzeganie trendów przez korelację zjawisk', true],
    ['know-what można przesłać za pomocą danych i bitów', true],
  ],
  g: [
    { n: 'Który rodzaj wiedzy?', c: {
      'know-what': ['Liczba mieszkańców Nowego Jorku', 'Składniki naleśnika', 'Miejsce bitwy pod Waterloo', 'Przesyłana bitami'],
      'know-why': ['Prawa ruchu', 'Przemysł chemiczny i elektroniczny', 'Czego nie robić'],
      'know-how': ['Sprawność robienia czegoś', 'Nieopisana patentem', 'Transfer technologii'],
      'know-who': ['Kto posiada wiedzę', 'Kontakt z ekspertami zewnętrznymi', 'Kompetencje społeczne'],
    } },
    { n: 'Podstawowa (Arystoteles) czy pragmatyczna?', c: {
      '4 podstawowe': ['know-what', 'know-why', 'know-how', 'know-who'],
      'Pragmatyczne': ['know-where', 'know-if', 'know-when', 'know-between', 'know-which'],
    } },
  ],
  s: { n: '4 rodzaje wiedzy wg Arystotelesa', y: ['know-what', 'know-why', 'know-how', 'know-who'], x: ['know-where', 'know-when', 'know-if', 'know-which'] },
  sc: [
    ['Kolega wie, do którego eksperta zadzwonić z problemem korozji. To wiedza…', 'know-who', ['know-how', 'know-what', 'know-why']],
    ['Rozumiesz, DLACZEGO stop pęka – znasz prawo fizyczne. To…', 'know-why', ['know-what', 'know-how', 'know-which']],
    ['Wybierasz najlepszą z 3 ofert dostawców. To pragmatyczna odmiana…', 'know-which', ['know-when', 'know-where', 'know-if']],
    ['Planujesz warianty: „co się stanie, gdy dostawca upadnie”. To…', 'know-if', ['know-between', 'know-when', 'know-what']],
  ],
});

Q({
  id: 8, w: 1, t: 'Etapy procesu twórczego',
  q: 'Wymienić we właściwej kolejności etapy procesu twórczego.',
  a: [
    'Etapy procesu twórczego (w kolejności):',
    '1. **Wyszukiwanie lub intuicyjne rozpoznanie problemu**.',
    '2. **Przygotowanie do rozwiązania (preparacja)** – skupienie na problemie, **zbieranie informacji**, formułowanie **roboczych hipotez**.',
    '3. **Inkubacja rozwiązania** – **odprężenie** i **podświadome** przemyśliwanie materiału; człowiek wydaje się bezczynny, marzy na jawie, a podświadomość układa fakty w nowe wzory.',
    '4. **Zrozumienie lub olśnienie (iluminacja)** – nowy pomysł w najmniej oczekiwanej chwili (jedzenie, spacer, zasypianie); trzeba go **szybko zanotować**.',
    '5. **Weryfikacja i zastosowanie** – udowodnienie **eksperymentem lub logicznym rozumowaniem**, że pomysł rozwiązuje problem.',
    'W klasycznym ujęciu **G. Wallasa** (plik 1) są 4 etapy: **preparacja → inkubacja → iluminacja → weryfikacja**.'
  ],
  x: [
    '1. Wyszukiwanie lub intuicyjne rozpoznawanie problemów.',
    '2. Przygotowanie do rozwiązania: człowiek skupia się na problemie, pogrąża się w nim, zbiera informacje, które mogą mieć z nim związek, oraz formułuje robocze hipotezy.',
    '3. Inkubacja rozwiązania: po zgromadzeniu informacji następuje odprężenie i podświadome przemyśliwanie nad zebranym materiałem. W tej mało poznanej, lecz istotnej fazie człowiek często wydaje się bezczynny lub marzy na jawie, podczas gdy jego podświadomość układa fakty w nowe wzory.',
    '4. Zrozumienie lub olśnienie: pojawia się często w najmniej oczekiwanej chwili (w czasie jedzenia, spaceru lub przy zasypianiu). Pojawia się nowy pomysł rozwiązania problemu, który należy szybko zanotować, by świadoma część umysłu o nim nie zapomniała.',
    '5. Weryfikacja i zastosowanie: człowiek stara się udowodnić za pomocą eksperymentu lub logicznego rozumowania, że nowy pomysł może rozwiązać dany problem.',
    '## Uzupełnienie (plik 1) – model Grahama Wallasa',
    'Preparacja (świadome zbieranie danych, definicja problemu) → Inkubacja (nieświadome „dojrzewanie”) → Iluminacja (olśnienie, „eureka!”) → Weryfikacja (sprawdzenie i wdrożenie).'
  ],
  k: ['1. Rozpoznanie problemu', '2. Przygotowanie – informacje, hipotezy', '3. Inkubacja – podświadomość', '4. Olśnienie – szybko zanotuj', '5. Weryfikacja i zastosowanie', 'Wallas: preparacja, inkubacja, iluminacja, weryfikacja'],
  m: '„Raz Przyszedł Inżynier, Olśnił, Wdrożył”: Rozpoznanie → Przygotowanie → Inkubacja → Olśnienie → Weryfikacja. (Wallas bez pierwszego kroku: P-I-I-W.)',
  f: [
    ['Rozpoznanie problemu', 'pierwszy etap – wyszukiwanie lub intuicyjne rozpoznawanie problemów'],
    ['Przygotowanie', 'skupienie na problemie, zbieranie informacji, robocze hipotezy'],
    ['Inkubacja', 'odprężenie i podświadome przemyśliwanie zebranego materiału'],
    ['Olśnienie', 'nagły pomysł w najmniej oczekiwanej chwili – trzeba go szybko zanotować'],
    ['Weryfikacja i zastosowanie', 'udowodnienie eksperymentem lub logiką, że pomysł rozwiązuje problem'],
  ],
  c: [
    ['Rozpoznanie → przygotowanie → ___ → olśnienie → weryfikacja', 'inkubacja', ['iluminacja', 'implementacja', 'integracja']],
    ['Pomysł z fazy olśnienia należy szybko ___', 'zanotować', ['zapomnieć', 'opatentować', 'sprzedać']],
  ],
  tf: [
    ['Olśnienie następuje przed inkubacją', false, 'Kolejność: przygotowanie → INKUBACJA → olśnienie → weryfikacja'],
    ['W inkubacji człowiek często wydaje się bezczynny', true],
    ['Pomysł z fazy olśnienia należy szybko zanotować', true],
    ['Pierwszym etapem jest wyszukiwanie lub intuicyjne rozpoznanie problemu', true],
    ['W fazie przygotowania formułuje się robocze hipotezy', true],
    ['Weryfikacja polega na marzeniu na jawie', false, 'Weryfikacja = dowód eksperymentem lub logicznym rozumowaniem'],
  ],
  o: [
    { n: 'Etapy procesu twórczego', i: ['Rozpoznanie problemu', 'Przygotowanie', 'Inkubacja', 'Olśnienie', 'Weryfikacja i zastosowanie'] },
    { n: 'Etapy wg Wallasa (plik 1)', i: ['Preparacja', 'Inkubacja', 'Iluminacja', 'Weryfikacja'] },
  ],
  g: { n: 'Który etap?', c: {
    'Przygotowanie': ['Zbieranie informacji', 'Robocze hipotezy'],
    'Inkubacja': ['Odprężenie', 'Marzenie na jawie', 'Podświadomość układa fakty'],
    'Olśnienie': ['Pomysł przy zasypianiu', 'Szybko zanotuj'],
    'Weryfikacja': ['Eksperyment', 'Logiczny dowód'],
  } },
  sc: [
    ['Nagle przy zasypianiu wpadasz na rozwiązanie. Etap:', 'Olśnienie', ['Inkubacja', 'Przygotowanie', 'Weryfikacja']],
    ['Zebrałeś dane i… idziesz na spacer, nie myśląc o problemie. Etap:', 'Inkubacja', ['Olśnienie', 'Weryfikacja', 'Rozpoznanie problemu']],
    ['Robisz eksperyment, by udowodnić, że pomysł działa. Etap:', 'Weryfikacja i zastosowanie', ['Przygotowanie', 'Inkubacja', 'Olśnienie']],
  ],
});

Q({
  id: 9, w: 1, t: 'Wielka Piątka',
  q: 'Wymienić 5 podstawowych wymiarów osobowości wg teorii Wielkiej Piątki. Proszę krótko omówić dwie z tych cech.',
  a: [
    'Pięcioczynnikowy model osobowości (**Wielka Piątka**) obejmuje: **Neurotyczność, Ekstrawersję, Otwartość na doświadczenie, Ugodowość i Sumienność**.',
    '• **Sumienność** – stopień **zorganizowania, wytrwałości, odpowiedzialności i motywacji** w działaniach ukierunkowanych na cel; osoby **skrupulatne i systematyczne** – w inżynierii produkcji świetnie sprawdzają się w **kontroli jakości, auditach i zarządzaniu procesami**.',
    '• **Otwartość na doświadczenie** – skłonność do poszukiwania **nowych doświadczeń**, **kreatywność, wyobraźnia, ciekawość intelektualna**; takie osoby łatwo **adaptują się do zmian** i chętnie **wdrażają innowacje technologiczne**.',
    '(Plik 1: niska **Neurotyczność** = stabilność emocjonalna, odporność na stres i trafne decyzje pod presją.)'
  ],
  x: [
    'Pięcioczynnikowy model osobowości obejmuje wymiary: Neurotyczność, Ekstrawersja, Otwartość na doświadczenie, Ugodowość oraz Sumienność.',
    '## Sumienność',
    'Opisuje stopień zorganizowania, wytrwałości, odpowiedzialności i motywacji w działaniach ukierunkowanych na cel. Osoby o wysokiej sumienności są skrupulatne i systematyczne. W inżynierii produkcji doskonale sprawdzają się w obszarach kontroli jakości, auditów i zarządzania procesami.',
    '## Otwartość na doświadczenie',
    'Tendencja do poszukiwania nowych doświadczeń, kreatywność, wyobraźnia oraz ciekawość intelektualna. Osoby z wysokim wskaźnikiem tej cechy łatwo adaptują się do zmian i chętnie wdrażają innowacje technologiczne.',
    '## Uzupełnienie (plik 1)',
    'Angielski skrót OCEAN. Niska neurotyczność (stabilność emocjonalna) zapewnia odporność na stres i trafne decyzje pod presją czasu.'
  ],
  k: ['Neurotyczność', 'Ekstrawersja', 'Otwartość na doświadczenie', 'Ugodowość', 'Sumienność', 'Sumienność: zorganizowanie, odpowiedzialność', 'Kontrola jakości, audity, procesy', 'Otwartość: kreatywność, ciekawość', 'Adaptacja do zmian, innowacje'],
  m: '„NEO-US” = Neo (z Matriksa) leci do US: Neurotyczność, Ekstrawersja, Otwartość + Ugodowość, Sumienność (po angielsku OCEAN). Omów S = „Skrupulatny Systematyczny Szef jakości” i O = „Odkrywca Otwarty na innowacje”.',
  f: [
    ['Sumienność', 'zorganizowanie, wytrwałość, odpowiedzialność i motywacja w działaniach ku celowi'],
    ['Otwartość na doświadczenie', 'poszukiwanie nowych doświadczeń, kreatywność, wyobraźnia, ciekawość intelektualna'],
    ['Niska neurotyczność', 'stabilność emocjonalna – odporność na stres (plik 1)'],
    ['Wielka Piątka', 'Neurotyczność, Ekstrawersja, Otwartość, Ugodowość, Sumienność'],
  ],
  c: [
    ['Osoby o wysokiej sumienności są skrupulatne i ___', 'systematyczne', ['impulsywne', 'towarzyskie', 'ugodowe']],
  ],
  tf: [
    ['Sumienne osoby dobrze sprawdzają się w kontroli jakości i auditach', true],
    ['Osoby otwarte na doświadczenie źle znoszą zmiany', false, 'Osoby otwarte ŁATWO adaptują się do zmian i chętnie wdrażają innowacje'],
    ['Inteligencja jest jednym z wymiarów Wielkiej Piątki', false, 'Wymiary: Neurotyczność, Ekstrawersja, Otwartość, Ugodowość, Sumienność'],
    ['Ugodowość należy do Wielkiej Piątki', true],
    ['Niska neurotyczność oznacza stabilność emocjonalną', true],
    ['Sumienność obejmuje wytrwałość i motywację w dążeniu do celu', true],
  ],
  o: { n: 'Wymiary w kolejności z materiałów (NEO-US)', i: ['Neurotyczność', 'Ekstrawersja', 'Otwartość na doświadczenie', 'Ugodowość', 'Sumienność'] },
  g: { n: 'Sumienność czy Otwartość?', c: {
    'Sumienność': ['Zorganizowanie', 'Wytrwałość', 'Skrupulatność i systematyczność', 'Kontrola jakości i audity'],
    'Otwartość': ['Kreatywność', 'Wyobraźnia', 'Ciekawość intelektualna', 'Łatwa adaptacja do zmian', 'Wdrażanie innowacji'],
  } },
  s: { n: 'Wymiary Wielkiej Piątki', y: ['Neurotyczność', 'Ekstrawersja', 'Otwartość na doświadczenie', 'Ugodowość', 'Sumienność'], x: ['Inteligencja', 'Asertywność', 'Empatia', 'Perfekcjonizm'] },
  sc: [
    ['Inżynier z pasją testuje każdą nową technologię i szybko adaptuje się do zmian. Wysoka…', 'Otwartość na doświadczenie', ['Sumienność', 'Ugodowość', 'Neurotyczność']],
    ['Audytorka jest skrupulatna, systematyczna i wytrwała. Wysoka…', 'Sumienność', ['Ekstrawersja', 'Otwartość na doświadczenie', 'Neurotyczność']],
  ],
});

Q({
  id: 10, w: 1, t: 'Role pracowników wiedzy',
  q: 'Wymienić przykładowe 5 ról pracowników wiedzy i opisać 2 z nich.',
  a: [
    '**Pracownicy wiedzy** wykorzystują **kapitał intelektualny** jako główne narzędzie pracy. Przykładowe role (wg slajdów: Moore i Rugullies, Davenport i Prusak, Nonaka i Takeuchi, Geisler):',
    '• **Kontroler** – **monitoruje wyniki organizacji** na podstawie **surowych informacji**.',
    '• **Pomocnik** – **przekazuje informacje**, aby **uczyć innych** i **pomagać w rozwiązywaniu problemów**, które napotkali.',
    '• **Uczący się** – używa informacji i **praktycznych przypadków**, aby **doskonalić własne umiejętności i kompetencje**.',
    '• **Konsolidator** – **łączy i miesza informacje z różnych źródeł**, by stworzyć **nową informację**.',
    '• **Łącznik** – tworzy **osobiste lub projektowe relacje** z ludźmi wykonującymi **ten sam rodzaj pracy**, by **dzielić się informacjami** i wspierać nawzajem.',
    '• **Organizator** – zaangażowany w **osobiste lub organizacyjne planowanie działań** (np. **lista spraw**, **harmonogramy**).'
  ],
  x: [
    'Źródło: slajdy z wykładu „Role pracowników wiedzy” (Wydział Metali Nieżelaznych AGH). Tabela: rola – opis – typowe działania – autorzy.',
    '## Kontroler',
    '• Opis: osoby, które monitorują wyniki organizacji na podstawie surowych informacji.',
    '• Typowe działania: analizowanie, rozpowszechnianie informacji, zbieranie informacji, monitoring.',
    '• Autorzy: Moore i Rugullies (2005), Geisler (2007).',
    '## Pomocnik',
    '• Opis: osoby, które przekazują informacje, aby uczyć innych i pomagać w rozwiązywaniu problemów, które napotkali.',
    '• Typowe działania: tworzenie treści, analizowanie, rozpowszechnianie informacji, przekazywanie informacji zwrotnej, wyszukiwanie informacji, uczenie się, tworzenie i rozwijanie sieci kontaktów.',
    '• Autorzy: Davenport i Prusak (1998).',
    '## Uczący się',
    '• Opis: osoby, które używają informacji i praktycznych przypadków, aby doskonalić swoje osobiste umiejętności i kompetencje.',
    '• Typowe działania: zdobywanie i przyswajanie informacji, analizowanie, dyskutowanie z ekspertami w celu znalezienia rozwiązania, wyszukiwanie informacji, uczenie się, wyszukiwanie potrzebnych usług (np. tłumaczenia).',
    '## Konsolidator',
    '• Opis: osoby, które łączą i mieszają informacje pochodzące z różnych źródeł w celu stworzenia nowej informacji.',
    '• Typowe działania: analizowanie, rozpowszechnianie informacji, wyszukiwanie informacji, zbieranie informacji, tworzenie i rozwijanie sieci kontaktów.',
    '• Autorzy: Davenport i Prusak (1998), Nonaka i Takeuchi (1995), Geisler (2007).',
    '## Łącznik',
    '• Opis: osoby, które tworzą osobiste lub związane z projektem relacje z ludźmi zaangażowanymi w ten sam rodzaj pracy, aby dzielić się informacjami i wspierać nawzajem.',
    '• Typowe działania: analizowanie, rozpowszechnianie informacji, dyskutowanie z ekspertami w celu znalezienia rozwiązania, wyszukiwanie informacji, zbieranie informacji, monitoring.',
    '• Autorzy: Davenport i Prusak (1998), Nonaka i Takeuchi (1995), Geisler (2007).',
    '## Organizator',
    '• Opis: osoby, które są zaangażowane w osobiste lub organizacyjne planowanie działań (np. tworzenie listy spraw do załatwienia lub harmonogramów).',
    '• Typowe działania: analizowanie, zbieranie informacji, monitoring, tworzenie i rozwijanie sieci kontaktów.',
    '• Autorzy: Moore i Rugullies (2005).'
  ],
  k: ['Kapitał intelektualny', 'Kontroler – monitoruje wyniki', 'Pomocnik – uczy i pomaga', 'Uczący się – doskonali kompetencje', 'Konsolidator – nowa informacja z wielu źródeł', 'Łącznik – relacje, dzielenie się', 'Organizator – planowanie, harmonogramy'],
  m: '„KO-PUK-ŁO”: KOntroler, Pomocnik, Uczący się, Konsolidator, ŁĄcznik, Organizator. Pułapka: KONSOLIDATOR miesza INFORMACJE (tworzy nową), ŁĄCZNIK łączy LUDZI (relacje). Do omówienia wybierz dwie najprostsze: Kontroler (monitoring) i Organizator (harmonogramy).',
  f: [
    ['Kontroler', 'monitoruje wyniki organizacji na podstawie surowych informacji'],
    ['Pomocnik', 'przekazuje informacje, aby uczyć innych i pomagać rozwiązywać napotkane problemy'],
    ['Uczący się', 'używa informacji i praktycznych przypadków, by doskonalić własne kompetencje'],
    ['Konsolidator', 'łączy i miesza informacje z różnych źródeł, tworząc nową informację'],
    ['Łącznik', 'tworzy relacje z ludźmi wykonującymi ten sam rodzaj pracy, by dzielić się informacjami'],
    ['Organizator', 'planuje działania osobiste lub organizacyjne (listy spraw, harmonogramy)'],
  ],
  c: [
    ['Role Konsolidatora i Łącznika opisali m.in. Davenport i Prusak oraz Nonaka i ___', 'Takeuchi', ['Ishikawa', 'Deming', 'Crosby']],
    ['Rolę Kontrolera i Organizatora opisali m.in. Moore i ___', 'Rugullies', ['Prusak', 'Takeuchi', 'Juran']],
  ],
  tf: [
    ['Konsolidator łączy informacje z różnych źródeł, tworząc nową informację', true],
    ['Łącznik miesza dane z wielu baz, by tworzyć raporty', false, 'Łącznik tworzy RELACJE z ludźmi wykonującymi ten sam rodzaj pracy; mieszanie informacji to Konsolidator'],
    ['Organizator tworzy listy spraw do załatwienia i harmonogramy', true],
    ['Kontroler monitoruje wyniki organizacji na podstawie surowych informacji', true],
    ['Uczący się doskonali własne kompetencje na praktycznych przypadkach', true],
    ['Pomocnik zajmuje się głównie tworzeniem harmonogramów', false, 'Pomocnik przekazuje informacje, by uczyć innych i pomagać rozwiązywać problemy'],
  ],
  g: { n: 'Która rola?', c: {
    'Kontroler': ['Monitoring wyników', 'Surowe informacje'],
    'Pomocnik': ['Tworzenie treści', 'Informacja zwrotna', 'Uczenie innych'],
    'Uczący się': ['Przyswajanie informacji', 'Szukanie usług, np. tłumaczenia'],
    'Konsolidator': ['Mieszanie informacji z wielu źródeł', 'Tworzenie nowej informacji'],
    'Łącznik': ['Relacje projektowe', 'Wzajemne wsparcie'],
    'Organizator': ['Lista spraw do załatwienia', 'Harmonogramy'],
  } },
  s: { n: 'Role pracowników wiedzy (slajd)', y: ['Kontroler', 'Pomocnik', 'Uczący się', 'Konsolidator', 'Łącznik', 'Organizator'], x: ['Magazynier', 'Operator', 'Sprzedawca', 'Audytor zewnętrzny'] },
  sc: [
    ['Specjalistka co tydzień zestawia dane z 5 źródeł i tworzy z nich nową informację. Rola:', 'Konsolidator', ['Łącznik', 'Kontroler', 'Organizator']],
    ['Inżynier utrzymuje sieć kontaktów z innymi technologami, by wymieniać doświadczenia. Rola:', 'Łącznik', ['Konsolidator', 'Pomocnik', 'Uczący się']],
    ['Kierownik śledzi wyniki firmy na podstawie surowych danych. Rola:', 'Kontroler', ['Organizator', 'Pomocnik', 'Konsolidator']],
    ['Pracownik szkoli nowych kolegów i pomaga im rozwiązywać problemy. Rola:', 'Pomocnik', ['Uczący się', 'Łącznik', 'Kontroler']],
  ],
});
