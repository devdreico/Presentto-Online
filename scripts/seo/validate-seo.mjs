#!/usr/bin/env node
// Validador SEO del repositorio — forma parte del flujo de sub-agentes (agente `seo-qa`).
//   npm run seo:check
// Salida: errores (exit 1) y avisos (exit 0). Comprueba:
//   1. Esquema y coherencia de src/data/seo/{keywords,clusters,snippet-tests}.json
//   2. Cannibalización (dos clústeres con la misma keyword primaria / misma página destino)
//   3. src/data/site-index.ts ↔ public/llms.txt sincronizados
//   4. Datos de negocio completos (NAP / GBP / editor) → aviso si faltan
//   5. Si existe dist/: títulos ≤60, descripciones ≤160, un H1 por página, canonical,
//      enlaces internos con trailing slash, y URLs del sitemap presentes

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];
const ok = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const good = (m) => ok.push(m);

const readJson = (rel) => {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    err(`Falta ${rel}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    err(`${rel} no es JSON válido: ${e.message}`);
    return null;
  }
};

const INTENTS = new Set(['informational', 'commercial', 'transactional', 'navigational']);
const FUNNELS = new Set(['tofu', 'mofu', 'bofu']);
const ROUTE_RE = /^\/(?:[a-z0-9-]+\/)*$/;

// ---------------------------------------------------------------- keywords.json
const keywords = readJson('src/data/seo/keywords.json');
if (keywords) {
  if (!Array.isArray(keywords.keywords)) err('keywords.json: falta el array "keywords"');
  else {
    const seen = new Map();
    let bad = 0;
    for (const [i, k] of keywords.keywords.entries()) {
      const at = `keywords[${i}] (${k?.term ?? '?'})`;
      if (!k || typeof k.term !== 'string' || !k.term.trim()) {
        err(`${at}: "term" obligatorio`);
        bad++;
        continue;
      }
      if (!INTENTS.has(k.intent)) err(`${at}: intent inválido → ${k.intent}`);
      if (!FUNNELS.has(k.funnel)) err(`${at}: funnel inválido → ${k.funnel}`);
      if (typeof k.cluster !== 'string' || !k.cluster) err(`${at}: cluster obligatorio`);
      if (typeof k.geo !== 'string' || !k.geo) err(`${at}: geo obligatorio`);
      if (![1, 2, 3].includes(k.priority)) err(`${at}: priority debe ser 1|2|3`);
      const key = `${k.term.trim().toLowerCase()}|${k.geo}`;
      if (seen.has(key)) err(`${at}: duplicada de keywords[${seen.get(key)}]`);
      else seen.set(key, i);
      bad += 0;
    }
    if (!bad) good(`keywords.json: ${keywords.keywords.length} términos con esquema válido`);
    if (keywords.keywords.length < 150)
      warn(
        `keywords.json: solo ${keywords.keywords.length} términos (meta: ≥150). El agente seo-keyword-miner debe ampliarlos.`
      );
  }
}

// --------------------------------------------------------------- clusters.json
const clusters = readJson('src/data/seo/clusters.json');
if (clusters) {
  if (!Array.isArray(clusters.clusters)) err('clusters.json: falta el array "clusters"');
  else {
    const ids = new Set();
    const pages = new Map();
    const primary = new Map();
    for (const [i, c] of clusters.clusters.entries()) {
      const at = `clusters[${i}] (${c?.id ?? '?'})`;
      if (!c?.id) err(`${at}: "id" obligatorio`);
      else if (ids.has(c.id)) err(`${at}: id duplicado`);
      else ids.add(c.id);
      if (!c?.primaryKeyword) err(`${at}: "primaryKeyword" obligatorio`);
      else {
        const p = String(c.primaryKeyword).trim().toLowerCase();
        if (primary.has(p)) err(`${at}: cannibalización — misma keyword primaria que ${primary.get(p)}`);
        else primary.set(p, c.id);
      }
      if (!c?.targetPage) err(`${at}: "targetPage" obligatorio`);
      else if (!ROUTE_RE.test(c.targetPage)) err(`${at}: targetPage inválida → ${c.targetPage}`);
      else {
        if (pages.has(c.targetPage)) warn(`${at}: dos clústeres apuntan a ${c.targetPage}`);
        pages.set(c.targetPage, c.id);
      }
    }
    good(`clusters.json: ${clusters.clusters.length} clústeres revisados`);

    // cada keyword debe apuntar a un clúster existente
    if (keywords?.keywords && Array.isArray(clusters.clusters)) {
      const clusterIds = new Set(clusters.clusters.map((c) => c.id));
      const orphans = keywords.keywords.filter((k) => k?.cluster && !clusterIds.has(k.cluster));
      if (orphans.length)
        err(`keywords sin clúster: ${orphans.slice(0, 5).map((k) => k.term).join(', ')}${orphans.length > 5 ? ` (+${orphans.length - 5})` : ''}`);
      else good('keywords.json → clusters.json: todas las keywords tienen clúster');
    }
  }
}

// ---------------------------------------------------------- snippet-tests.json
const snippets = readJson('src/data/seo/snippet-tests.json');
if (snippets) {
  if (!Array.isArray(snippets.tests)) err('snippet-tests.json: falta el array "tests"');
  else {
    let n = 0;
    for (const [i, t] of snippets.tests.entries()) {
      const at = `tests[${i}] (${t?.page ?? '?'})`;
      if (!t?.page || !ROUTE_RE.test(t.page)) err(`${at}: page inválida`);
      if (!t?.title) err(`${at}: falta title`);
      else if (t.title.length > 60) err(`${at}: title ${t.title.length} > 60 → "${t.title}"`);
      if (!t?.description) err(`${at}: falta description`);
      else if (t.description.length > 160) err(`${at}: description ${t.description.length} > 160`);
      if (!t?.targetQuery) err(`${at}: falta targetQuery (query objetivo del test)`);
      if (!t?.hypothesis) err(`${at}: falta hypothesis`);
      if (!['pending', 'applied', 'shipped', 'reverted'].includes(t?.status ?? 'pending'))
        err(`${at}: status inválido → ${t?.status}`);
      n++;
    }
    good(`snippet-tests.json: ${n} tests de snippet revisados`);
  }
}

// ------------------------------------------------------------ site-index/llms
const siteIndexPath = path.join(root, 'src/data/site-index.ts');
const llmsPath = path.join(root, 'public/llms.txt');
if (fs.existsSync(siteIndexPath) && fs.existsSync(llmsPath)) {
  const src = fs.readFileSync(siteIndexPath, 'utf8');
  const hrefs = [...src.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
  const llms = fs.readFileSync(llmsPath, 'utf8');
  const missing = hrefs.filter((h) => !llms.includes(h));
  if (missing.length) err(`public/llms.txt desactualizado, falta: ${missing.join(', ')}`);
  else good(`site-index.ts ↔ llms.txt: ${hrefs.length} URLs sincronizadas`);
}

// ----------------------------------------------------------- datos del negocio
const bizPath = path.join(root, 'src/data/business.ts');
if (fs.existsSync(bizPath)) {
  const src = fs.readFileSync(bizPath, 'utf8');
  if (/address:\s*null/.test(src))
    warn('business.ts: falta la dirección real (address) — rellenar con el NAP de Google Business Profile');
  if (/gbpUrl:\s*null/.test(src))
    warn('business.ts: falta la URL pública de la ficha de Google Business Profile (gbpUrl → sameAs/hasMap)');
  if (/editor:\s*null/.test(src))
    warn('business.ts: falta la persona responsable editorial (editor → schema Person, E-E-A-T)');
}

// ------------------------------------------------------------------- dist/ QA
const distPath = path.join(root, 'dist');
if (fs.existsSync(distPath)) {
  const pages = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (e.name === '_astro' || e.name === 'assets') continue;
        walk(path.join(d, e.name));
      } else if (e.name === 'index.html' || e.name === '404.html') pages.push(path.join(d, e.name));
    }
  };
  walk(distPath);

  const titles = new Map();
  const descs = new Map();
  let h1Issues = 0;
  let canonicalMissing = 0;
  let badLinks = 0;
  let overTitle = 0;
  let overDesc = 0;

  for (const p of pages) {
    const html = fs.readFileSync(p, 'utf8');
    const rel = '/' + path.relative(distPath, p).replace(/index\.html$/, '').replace(/\\/g, '/');
    if (rel === '/404/' || rel.endsWith('404.html')) continue;
    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
    const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];

    if (title.length > 60) {
      overTitle++;
      err(`dist${rel}: title ${title.length} > 60 → "${title}"`);
    }
    if (desc.length > 160) {
      overDesc++;
      err(`dist${rel}: description ${desc.length} > 160`);
    }
    if (h1s !== 1) {
      h1Issues++;
      err(`dist${rel}: ${h1s} H1 (debe haber exactamente 1)`);
    }
    if (!canonical) {
      canonicalMissing++;
      err(`dist${rel}: sin canonical`);
    }
    if (titles.has(title)) err(`dist${rel}: title duplicado con ${titles.get(title)}`);
    else titles.set(title, rel);
    if (desc && descs.has(desc)) err(`dist${rel}: description duplicada con ${descs.get(desc)}`);
    else if (desc) descs.set(desc, rel);

    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1];
      if (href === '/' || href.startsWith('/_astro') || href.startsWith('/assets')) continue;
      if (path.extname(href)) continue; // archivos: /favicon.ico, /sitemap.xml, /rss.xml...
      if (!href.endsWith('/')) {
        badLinks++;
        if (badLinks <= 5) err(`dist${rel}: enlace interno sin trailing slash → ${href}`);
      }
    }
  }
  if (!overTitle && !overDesc) good(`dist: ${pages.length} páginas con title ≤60 y description ≤160`);
  if (!h1Issues) good('dist: un H1 por página en todas las rutas');
  if (!canonicalMissing) good('dist: canonical presente en todas las rutas indexables');
  if (!badLinks) good('dist: enlaces internos con trailing slash');

  // sitemap vs dist
  const sitemapPath = path.join(distPath, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    const missing = urls.filter((u) => {
      const rel = new URL(u).pathname;
      const file = path.join(distPath, rel, 'index.html');
      return !fs.existsSync(file);
    });
    if (missing.length) err(`sitemap.xml apunta a rutas inexistentes: ${missing.slice(0, 3).join(', ')}`);
    else good(`dist: sitemap.xml con ${urls.length} URLs resueltas`);
  }
} else {
  warn('No existe dist/ — ejecuta `npm run build` para validar títulos, H1 y canonicals renderizados');
}

// -------------------------------------------------------------------- informe
const line = (m) => console.log(`  ${m}`);
console.log('\n[seo:check] Validación SEO');
if (ok.length) {
  console.log(`\n✔ OK (${ok.length})`);
  ok.forEach((m) => line(m));
}
if (warnings.length) {
  console.log(`\n⚠ Avisos (${warnings.length})`);
  warnings.forEach((m) => line(m));
}
if (errors.length) {
  console.log(`\n✖ Errores (${errors.length})`);
  errors.forEach((m) => line(m));
}
console.log('');
process.exit(errors.length ? 1 : 0);
