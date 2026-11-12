#!/usr/bin/env node
/**
 * QA de salida: revisa el HTML construido en dist/ antes de publicar.
 *   npm run qa        (requiere `npm run build` previo)
 *
 * Comprueba:
 *   1. Enlaces internos que apuntan a archivos inexistentes.
 *   2. Canonical coherente con la ruta del archivo.
 *   3. Rastros de la oferta retirada (MVO, Presenttación, precios viejos).
 *   4. El sitemap no incluye páginas noindex (/cuenta/, /404/).
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const SITE = 'https://www.presentto.online';

if (!fs.existsSync(dist)) {
  console.error('[qa] falta dist/. Ejecuta `npm run build` primero.');
  process.exit(1);
}

const errors = [];
const ok = [];

/** Todas las páginas HTML construidas. */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = walk(dist);
const rel = (file) => path.relative(dist, file).replace(/\\/g, '/');

/** ¿La URL interna existe como archivo o como carpeta con index.html? */
function resolves(url) {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!clean || clean === '/') return fs.existsSync(path.join(dist, 'index.html'));
  const target = path.join(dist, clean);
  if (fs.existsSync(target)) {
    return fs.statSync(target).isDirectory()
      ? fs.existsSync(path.join(target, 'index.html'))
      : true;
  }
  return fs.existsSync(`${target}.html`);
}

const broken = new Map();

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const page = rel(file);

  // 1. Enlaces internos
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1];
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http') ||
      href.startsWith('data:')
    )
      continue;
    if (!href.startsWith('/')) continue;
    if (resolves(href)) continue;
    broken.set(href, [...(broken.get(href) ?? []), page]);
  }

  // 2. Canonical (se omite 404, que se sirve como 404.html)
  if (page !== '404.html') {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const route =
      page === 'index.html' ? '/' : `/${page.replace(/\/index\.html$/, '/')}`;
    const expected = `${SITE}${route}`;
    if (!canonical) errors.push(`${page}: sin canonical`);
    else if (canonical !== expected)
      errors.push(`${page}: canonical ${canonical} ≠ ${expected}`);
  }

  // 3. Rastros de la oferta anterior
  const legacy = [
    ['MVO', /\bMVO\b/],
    ['Presenttación', /Presenttación/],
    ['$15.000', /\$15\.000/],
    ['$40.000', /\$40\.000/],
  ];
  for (const [label, re] of legacy) {
    if (re.test(html)) errors.push(`${page}: contiene «${label}»`);
  }
}

for (const [href, from] of broken) {
  errors.push(`enlace roto ${href} (desde ${from.slice(0, 3).join(', ')})`);
}
if (broken.size === 0) ok.push(`${pages.length} páginas sin enlaces internos rotos`);

// 4. Sitemap
const sitemap = path.join(dist, 'sitemap.xml');
if (fs.existsSync(sitemap)) {
  const xml = fs.readFileSync(sitemap, 'utf8');
  if (xml.includes('/cuenta/')) errors.push('sitemap incluye /cuenta/ (noindex)');
  if (xml.includes('/404')) errors.push('sitemap incluye /404');
  if (!xml.includes('/precios/')) errors.push('sitemap no incluye /precios/');
  ok.push('sitemap sin páginas noindex');
} else {
  errors.push('falta dist/sitemap.xml');
}

console.log('\n[qa] Revisión del HTML construido');
for (const line of ok) console.log(`  ✔ ${line}`);
if (errors.length) {
  console.log(`\n✖ Errores (${errors.length})`);
  for (const line of errors) console.log(`  - ${line}`);
  process.exit(1);
}
console.log('\n✔ QA sin errores\n');
