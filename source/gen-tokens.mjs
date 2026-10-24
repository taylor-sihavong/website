import fs from 'node:fs';
const DS = process.argv[2];
const t = JSON.parse(fs.readFileSync(DS + '/project/tokens.json', 'utf8'));
const themes = t.color.themes.map(x => x.id);
const first = themes[0];
const cv = (v) => typeof v === 'string' && /^\{.+\}$/.test(v) ? `var(--${v.slice(1, -1)})` : v;
const pick = (tok, th) => typeof tok.value === 'string' ? tok.value : (tok.value[th] ?? tok.value[first]);
const has = (tok, th) => typeof tok.value !== 'string' && tok.value[th] !== undefined;
let css = `/* ${t.name} design system v${t.version}: tokens.css, generated from tokens.json */\n`;
// first theme
css += `:root, [data-theme="${first}"] {\n`;
for (const tok of t.color.tokens) css += `  --${tok.name}: ${cv(pick(tok, first))};\n`;
for (const tok of (t.shadow?.tokens || [])) css += `  --${tok.name}: ${cv(pick(tok, first))};\n`;
css += `}\n`;
for (const th of themes.slice(1)) {
  css += `[data-theme="${th}"] {\n`;
  for (const tok of t.color.tokens) {
    const alias = typeof pick(tok, th) === 'string' && /^\{.+\}$/.test(pick(tok, th));
    if (has(tok, th) || alias) css += `  --${tok.name}: ${cv(pick(tok, th))};\n`;
  }
  for (const tok of (t.shadow?.tokens || [])) if (has(tok, th)) css += `  --${tok.name}: ${cv(pick(tok, th))};\n`;
  css += `}\n`;
}
css += `:root {\n`;
for (const k of Object.keys(t)) {
  if (['name','version','meta','color','type','shadow'].includes(k)) continue;
  for (const tok of (t[k].tokens || [])) css += `  --${tok.name}: ${tok.value};\n`;
}
for (const [k, v] of Object.entries(t.type.families)) css += `  --font-${k}: ${v};\n`;
css += `}\n`;
for (const g of t.type.groups) for (const s of g.styles) {
  const fam = s.family || g.family;
  css += `.${s.name} { font-family: var(--font-${fam}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : ''}${s.fontStyle ? ` font-style: ${s.fontStyle};` : ''} }\n`;
}
fs.writeFileSync('tokens.css', css);
console.log(css.split('\n').length, 'lines');
