// Dumps every vocab word + example sentence per language to JSON.
// Usage: node tools/export_texts.js > tools/texts.json
const fs = require('fs'), path = require('path'), vm = require('vm');
const jsDir = path.join(__dirname, '..', 'js');
const out = {};
for (const f of fs.readdirSync(jsDir)) {
  const m = f.match(/^data(?:-([a-z]{2}))?\.js$/);
  if (!m) continue;
  const code = fs.readFileSync(path.join(jsDir, f), 'utf8') +
    '\n;try{window.__V = (typeof VOCAB!=="undefined")?VOCAB:null}catch(e){}';
  const ctx = { window: { LANG_DATA: {} }, console };
  ctx.window.window = ctx.window;
  try { vm.runInNewContext(code, ctx, { filename: f }); } catch (e) { console.error('skip', f, e.message); continue; }
  let sets = {};
  if (m[1]) { if (ctx.window.LANG_DATA[m[1]]) sets[m[1]] = ctx.window.LANG_DATA[m[1]].VOCAB; }
  else sets.no = ctx.window.__V || (ctx.window.LANG_DATA.no && ctx.window.LANG_DATA.no.VOCAB);
  for (const [lang, V] of Object.entries(sets)) {
    const texts = new Set();
    for (const lvl of Object.values(V || {})) for (const w of lvl) {
      if (w.no) texts.add(w.no.trim());
      if (w.ex_no) texts.add(w.ex_no.trim());
    }
    out[lang] = [...texts];
  }
}
console.log(JSON.stringify(out));
