// Składa grę w jeden plik HTML (CSS i JS wbudowane).
//   node tools/build.js                 → dist/magisterka.html (pełny dokument, działa offline po dwukliku)
//   node tools/build.js --artifact OUT  → wersja bez szkieletu <html>/<head>/<body> (do publikacji jako Artifact)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// manifest i ikony istnieją tylko przy hostingu całego katalogu (GitHub Pages) – wersje jednoplikowe ich nie mają
html = html.replace(/^.*data-pwa.*\n/gm, '');
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, (_, f) => `<style>\n${fs.readFileSync(path.join(root, f), 'utf8')}\n</style>`);
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (_, f) => {
  const src = fs.readFileSync(path.join(root, f), 'utf8');
  if (/<\/script/i.test(src)) throw new Error('Plik zawiera </script>: ' + f);
  return `<script>/* ${f} */\n${src}\n</script>`;
});
const ai = process.argv.indexOf('--artifact');
if (ai > 0) {
  const out = process.argv[ai + 1] || path.join(root, 'dist', 'artifact-page.html');
  const body = html
    .replace(/<!doctype html>\s*/i, '')
    .replace(/<html[^>]*>\s*/i, '').replace(/<\/html>\s*/i, '')
    .replace(/<head>\s*/i, '').replace(/<\/head>\s*/i, '')
    .replace(/<body>\s*/i, '').replace(/<\/body>\s*/i, '')
    .replace(/<meta charset="utf-8">\s*/i, '')
    .replace(/<meta name="viewport"[^>]*>\s*/i, '');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, body);
  console.log('Artifact:', out, (body.length / 1024).toFixed(0) + ' KB');
} else {
  require('./pwa');
  const out = path.join(root, 'dist', 'magisterka.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('Zbudowano:', out, (html.length / 1024).toFixed(0) + ' KB');
}
