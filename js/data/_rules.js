'use strict';
/* Reguły antydwuznaczności: pary pojęć, których nie wolno zamieniać miejscami
   w zdaniach „prawda/fałsz” ani używać jako wzajemnych dystraktorów
   (bo zamiana dawałaby zdanie prawie prawdziwe). */
const SWAP_RULES = {
  1: { ns: [['SPF (Superplastic Forming)', 'Superplastyczność'], ['Thixoforming / Rheocasting', 'Tiksotropia']] },
  2: { ns: [['VD/VOD', 'Żużle ochronne']] },
  3: { ns: [['SEM', 'EDS/WDS', 'EBSD', 'Fraktografia'], ['OM', 'Zgład metalograficzny', 'Ocena wg ASTM']] },
  5: { ns: [['Światło strukturalne', 'Triangulacja optyczna'], ['Fotogrametria', 'Stereoskopia', 'Fotogrametria lotnicza', 'Fotogrametria naziemna']] },
  6: { ns: [['FDM/FFF', 'Efekt schodkowania', 'Wytwarzanie addytywne'], ['SLA', 'Bottom-up (SLA)', 'Wytwarzanie addytywne'], ['SLS', 'Lustra galwanometryczne', 'Wytwarzanie addytywne']] },
  11: { noswap: ['Idea logistyki'] },
  15: { ns: [['Strategia doskonalenia firmy', 'KCS', 'Niepotrzebna złożoność']] },
  18: { ns: [['Analiza ilościowa rynku', 'Chłonność rynku']] },
  19: { noswap: ['RTB'] },
  23: { ns: [['Automatyczne przerywanie procesu', 'Autonomizacja']] },
  24: { noswap: ['CORE', 'Kierunek zmiany w CORE'] },
  25: { noswap: ['San Gen Shugi'] },
  27: { noswap: ['Smart Factory'] },
  28: { noswapAll: true },
  29: { noswap: ['Definicja MES (MESA)'] },
  30: { ns: [['PLM', 'Enovia'], ['Elastyczny system produkcyjny', 'FMS', 'Masowa personalizacja']] },
  33: { ns: [['Karta Shewharta', 'UCL/LCL', 'Karty X̄, s, R']] },
  34: { noswap: ['RCA'], ns: [['5W2H', 'How many? (5W2H)']] },
  36: { noswap: ['CMM'] },
  37: { ns: [['IRIS / ISO/TS 22163', 'RAMS']] },
  38: { ns: [['Six Sigma', 'DMAIC'], ['CTQ', 'Drzewko CTQ', 'VOC']] },
  39: { ns: [['Poziom III', 'APS'], ['Poziom I', 'MDA/PDA'], ['Poziom II', 'PLMS']] },
  40: { ns: [['Straty szybkości', 'Wydajność (przykład)'], ['Przestoje nieplanowane', 'Dostępność (przykład)'], ['Straty jakości', 'Jakość (przykład)']] },
};
/* Dodatkowe słowa wykluczające dystraktory (pokrewne tematy między pytaniami). */
const NX_EXTRA = {
  5: ['CMM', 'współrzęd'],
  11: ['Optymalizacja transferu', 'Ciągłość produkcji'],
  12: ['Przepływ', 'Koordynacja', 'Aspekt'],
  13: ['Kaskad', 'taktyczne'],
  16: ['Kaskadowanie celów', 'EVA', 'EVM', 'Horyzont'],
  21: ['Standaryzacja stanowisk', 'Klient', 'Dokładnie', 'Lewy filar', 'Prawy filar', 'Autonomizacja', 'Identyfikacja błędów', 'eliminacja strat', 'Lean', '5S'],
  22: ['Dach', 'Centrum', 'Fundament', 'Filar', 'Prawy'],
  23: ['Dach', 'Centrum', 'Fundament', 'Lewy', 'Pull', 'SMED', 'Takt', 'Heijunka', 'One-Piece', 'Klient', '5 Why', 'Ishikaw'],
  24: ['Standaryzacja', 'Six Sigma', 'VSM', 'Lean', 'eliminacja strat'],
  25: ['8D', 'PDCA', '5S', 'Poka', 'Hoshin'],
  27: ['Filar'],
  29: ['MES w czasie', 'Listy zadań', 'HMI w sieci', 'nastaw PLC', 'MES / APS', 'SCADA / PLMS', 'ERP / MRP', 'HMI / MDA', 'czujniki i elementy', 'PLM / PDM'],
  30: ['AMR', 'gniazd', 'Cobot'],
  31: ['FMS', 'CNC', 'elastyczn', 'druk', 'addytywne', 'przyrostow'],
  34: ['Ishikawa', '5 Why', 'Jidoka'],
  36: ['Laser', 'Światło strukturalne', 'Fotogrametria', 'Chmura'],
  39: ['poziom', 'Protokoły', 'MES:'],
  40: ['MES'],
};
for (const q of QUESTIONS) {
  const r = SWAP_RULES[q.id] || {};
  if (NX_EXTRA[q.id]) q.nx = q.nx.concat(NX_EXTRA[q.id]);
  q.ns = r.ns || [];
  q.noswap = r.noswapAll ? q.f.map(f => f[0]) : (r.noswap || []);
}
