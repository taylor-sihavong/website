import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as C from './content.mjs';

const DS = process.argv[2];
const MODE = process.argv[3] || 'dist';           // 'dist' (separate css, local photo) | 'preview' (inline css, photo hotlinked)
const PHOTO = process.argv[4] === 'none' ? '' : (process.argv[4] || 'images/taylor-sihavong.jpg');
globalThis.window = globalThis; window.React = React;
(0, eval)(fs.readFileSync(DS + '/project/components/bundle.js', 'utf8'));
const T = window.TaylorDS; const h = React.createElement;

const run = (r, k) => {
  if (typeof r === 'string') return r;
  if (r.i) return h('em', { key: k }, r.i);
  const external = /^https?:/.test(r.h);
  return h(T.TextLink, { key: k, href: r.h, external }, r.l);
};
const runs = (rs) => rs.map(run);
const paras = (list, cls) => list.map((rs, i) => h('p', { key: i, className: cls || 'text-body' }, ...runs(rs)));
// Dated list: years hang in the left margin on wide screens, and follow the text in parentheses on phones.
const ledger = (list) => h('ul', { className: 'ts-z-title ledger text-small' }, list.map((e, i) => {
  const repeat = i > 0 && list[i - 1].year === e.year;
  const text = [];
  if (e.org) text.push(h('span', { className: 'ledger__org', key: 'o' }, e.org), h('span', { className: 'ts-sr-only', key: 'os' }, ': '));
  text.push(...runs(e.runs).map((n, k) => typeof n === 'string' ? n : React.cloneElement(n, { key: 'r' + k })));
  if (e.venue) text.push(' ', h('span', { className: 'ts-sr-only', key: 'vs' }, ', '), h('em', { className: 'ledger__venue', key: 'v' }, e.venue));
  return h('li', { key: i },
    h('span', { className: 'ledger__text' }, ...text),
    h('span', { className: 'ledger__year' + (repeat ? ' ledger__year--repeat' : '') }, e.year));
}));

const page = h('div', null,
  h(T.SkipLink, null),
  h('header', { className: 'ts-page site-header' }, h(T.Wordmark, { href: './', name: 'Taylor Naomi Sihavong' })),
  h('main', { id: 'main', className: 'ts-page' },
    h('h1', { className: 'ts-sr-only' }, 'Taylor Naomi Sihavong'),
    h('div', { className: 'ts-grid intro' },
      h('div', { className: 'intro-photo' }, h(T.Figure, { src: PHOTO, alt: 'Portrait of Taylor Naomi Sihavong', signature: true })),
      h('div', { className: 'intro-text' },
        h('p', { className: 'text-lede' }, ...runs(C.intro[0])),
        h('p', { className: 'text-body' }, ...runs(C.intro[1])),
        h('p', { className: 'text-body' }, ...runs(C.intro[2])))),
    h(T.Section, { number: '01', title: 'Previously', id: 'previously' }, h('div', { className: 'ts-z-reading prose' }, paras(C.previous, 'text-small'))),
    h(T.Section, { number: '02', title: 'Talks', id: 'talks' }, ledger(C.talks)),
    h(T.Section, { number: '03', title: 'Press', id: 'press' }, ledger(C.features)),
    h(T.Section, { number: '04', title: 'Awards', id: 'awards' }, ledger(C.awards)),
    h(T.Section, { number: '05', title: C.more.title, id: 'more' }, h('div', { className: 'ts-z-reading prose' }, paras(C.more.paragraphs, 'text-small')))
  ),
  h(T.SiteFooter, { signoff: true, links: [
    { label: 'Email', href: 'mailto:taylor.sihavong@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taylor-sihavong-394b18112/', external: true }] })
);
const body = renderToStaticMarkup(page);

const tokens = JSON.parse(fs.readFileSync(DS + '/project/tokens.json', 'utf8'));
const val = (name) => { let v = tokens.color.tokens.find(t => t.name === name).value; v = typeof v === 'string' ? v : v.light; return /^\{/.test(v) ? val(v.slice(1, -1)) : v; };
const sky = val('tag-sky'), butter = val('decor-butter'), ink = val('ink'), paper = val('paper');
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="17" cy="17" r="13" fill="${butter}"/><circle cx="14" cy="14" r="13" fill="${ink}"/><g fill="${paper}" font-family="'Zen Maru Gothic','Hiragino Maru Gothic ProN','Hiragino Sans','Yu Gothic',sans-serif" font-weight="700" font-size="12" text-anchor="middle"><text x="14" y="12">直</text><text x="14" y="24">美</text></g></svg>`;

const css = fs.readFileSync('tokens.css', 'utf8') + '\n' + fs.readFileSync(DS + '/project/components/bundle.css', 'utf8') + '\n' + fs.readFileSync('site.css', 'utf8');
const esc = (s) => s.replace(/"/g, '&quot;');
const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${C.meta.title}</title>
<meta name="description" content="${esc(C.meta.description)}">
<meta name="theme-color" content="${paper}">
<meta property="og:type" content="website">
<meta property="og:title" content="${C.meta.title}">
<meta property="og:description" content="${esc(C.meta.description)}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,700;1,400&family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700&text=%E7%9B%B4%E7%BE%8E&display=swap">
${MODE === 'preview' ? `<style>\n${css}\n</style>` : '<link rel="stylesheet" href="styles.css">'}
<script>(function(){var el=document.documentElement;if(!window.matchMedia)return;var mq=matchMedia("(prefers-contrast: more)");function s(){if(mq.matches)el.setAttribute("data-theme","contrast");else if(el.getAttribute("data-theme")==="contrast")el.setAttribute("data-theme","light")}s();if(mq.addEventListener)mq.addEventListener("change",s)})();</script>`;
const html = `<!doctype html>\n<html lang="en" data-theme="light">\n<head>\n${head}\n</head>\n<body>\n${body}\n</body>\n</html>\n`;
const out = MODE === 'preview' ? 'preview' : 'dist';
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(`${out}/index.html`, html);
fs.writeFileSync(`${out}/favicon.svg`, favicon);
if (MODE !== 'preview') fs.writeFileSync(`${out}/styles.css`, css);
console.log(MODE, html.length, 'bytes');
