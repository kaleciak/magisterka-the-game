// Ładuje pliki danych gry w kontekście Node (dla walidacji i testów).
const fs = require('fs'), path = require('path'), vm = require('vm');
module.exports = function load(extra = []) {
  const ctx = { console, Math, JSON };
  vm.createContext(ctx);
  const root = path.join(__dirname, '..');
  const files = ['js/data/_core.js', ...[0,1,2,3,4,5,6,7].map(i => `js/data/w${i}.js`), ...extra];
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8') + '\n;this.WORLDS=typeof WORLDS!=="undefined"?WORLDS:this.WORLDS;this.QUESTIONS=typeof QUESTIONS!=="undefined"?QUESTIONS:this.QUESTIONS;', ctx, { filename: f });
  return ctx;
};
