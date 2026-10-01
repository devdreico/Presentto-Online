#!/usr/bin/env node
// Genera una siembra inicial de src/data/seo/keywords.json (≥150 términos).
// Después de esta siembra, el archivo lo amplían y curan los sub-agentes
// (`seo-keyword-miner` añade; `seo-cluster-architect` agrupa; el validador comprueba).
// Uso: npm run seo:seed   (sobrescribe la siembra: NO ejecutar tras curar a mano)

import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.cwd(), 'src/data/seo/keywords.json');
const keywords = [];
const seen = new Set();

function add(term, opts) {
  const geo = opts.geo ?? 'CO';
  const key = `${term.trim().toLowerCase()}|${geo}`;
  if (seen.has(key)) return;
  seen.add(key);
  keywords.push({
    term: term.trim(),
    intent: opts.intent,
    geo,
    cluster: opts.cluster,
    funnel: opts.funnel,
    priority: opts.priority,
    source: opts.source ?? 'seed',
  });
}

// ---------------------------------------------------------------- 1. Ciudades
const ciudades = [
  { slug: 'funza', nombre: 'Funza', cluster: 'ciudad-funza' },
  { slug: 'mosquera', nombre: 'Mosquera', cluster: 'ciudad-mosquera' },
  { slug: 'madrid', nombre: 'Madrid', cluster: 'ciudad-madrid' },
  { slug: 'facatativa', nombre: 'Facatativá', cluster: 'ciudad-facatativa' },
];
const plantillasCiudad = [
  ['página web en {c}', 'commercial', 'mofu', 1],
  ['web para negocio en {c}', 'commercial', 'mofu', 1],
  ['diseño web en {c}', 'commercial', 'mofu', 2],
  ['página web para mi negocio en {c}', 'transactional', 'bofu', 1],
  ['cuánto cuesta una página web en {c}', 'commercial', 'mofu', 1],
  ['agencia web en {c}', 'commercial', 'mofu', 2],
  ['hacer página web en {c}', 'transactional', 'bofu', 2],
  ['aparecer en google maps en {c}', 'informational', 'tofu', 2],
  ['ficha de google en {c}', 'informational', 'tofu', 3],
  ['correo profesional en {c}', 'commercial', 'mofu', 3],
  ['{c} cerca de mí', 'commercial', 'mofu', 3],
  ['diseño de páginas web {c} Cundinamarca', 'commercial', 'mofu', 2],
];
for (const c of ciudades) {
  for (const [tpl, intent, funnel, priority] of plantillasCiudad) {
    add(tpl.replace('{c}', c.nombre), { intent, funnel, priority, cluster: c.cluster });
  }
}

// ------------------------------------------------------------------ 2. Rubros
const rubros = [
  ['restaurantes', 'rubro-restaurantes'],
  ['cafés', 'rubro-restaurantes'],
  ['clínicas y consultorios', 'rubro-clinicas'],
  ['dentistas', 'rubro-clinicas'],
  ['peluquerías y barberías', 'rubro-peluquerias'],
  ['talleres mecánicos', 'rubro-talleres'],
  ['ferreterías', 'rubro-comercios'],
  ['tiendas y comercios', 'rubro-comercios'],
  ['abogados', 'rubro-profesionales'],
  ['contadores', 'rubro-profesionales'],
];
const plantillasRubro = [
  ['página web para {r}', 'commercial', 'mofu', 1],
  ['web para {r}', 'commercial', 'mofu', 1],
  ['cuánto cuesta una web para {r}', 'commercial', 'mofu', 2],
  ['cómo tener web mi {r}', 'informational', 'tofu', 2],
  ['{r} cerca de mí', 'commercial', 'mofu', 2],
  ['mejores {r} en mi ciudad', 'commercial', 'mofu', 3],
];
for (const [r, cluster] of rubros) {
  for (const [tpl, intent, funnel, priority] of plantillasRubro) {
    add(tpl.replace('{r}', r), { intent, funnel, priority, cluster });
  }
}

// --------------------------------------------------- 3. Productos y servicios
const generico = [
  ['qué es la presencia digital', 'presencia-digital-pilar', 'informational', 'tofu', 1],
  ['cómo tener presencia digital', 'presencia-digital-pilar', 'informational', 'tofu', 2],
  ['qué necesita un negocio en internet', 'presencia-digital-pilar', 'informational', 'tofu', 2],
  ['presencia digital para pymes', 'presencia-digital-pilar', 'informational', 'tofu', 2],
  ['diferencia entre web y red social', 'presencia-digital-pilar', 'informational', 'tofu', 3],
  ['guía de presencia digital 2026', 'presencia-digital-pilar', 'informational', 'tofu', 1],
  ['cómo llevar mi negocio a internet', 'presencia-digital-pilar', 'informational', 'tofu', 2],
  ['checklist para tener web', 'presencia-digital-pilar', 'informational', 'tofu', 2],
  ['errores al crear una web', 'presencia-digital-pilar', 'informational', 'tofu', 3],
  ['cuánto tarda hacer una web', 'presencia-digital-pilar', 'informational', 'tofu', 2],
  ['google business profile optimización', 'ficha-de-google', 'informational', 'tofu', 1],
  ['optimizar ficha de google', 'ficha-de-google', 'informational', 'tofu', 1],
  ['cómo verificar google business profile', 'ficha-de-google', 'informational', 'tofu', 2],
  ['categorías de google business profile', 'ficha-de-google', 'informational', 'tofu', 2],
  ['zonas de servicio google business profile', 'ficha-de-google', 'informational', 'tofu', 3],
  ['mejorar posición en google business', 'ficha-de-google', 'informational', 'tofu', 2],
  ['aparecer en google maps', 'aparecer-google-maps', 'informational', 'tofu', 1],
  ['cómo aparecer primero en google maps', 'aparecer-google-maps', 'informational', 'tofu', 1],
  ['aparecer en el pack local de google', 'aparecer-google-maps', 'informational', 'tofu', 2],
  ['posicionamiento en google maps', 'aparecer-google-maps', 'commercial', 'mofu', 2],
  ['mapa de google para mi negocio', 'aparecer-google-maps', 'informational', 'tofu', 3],
  ['reseñas de google cómo pedirlas', 'resenas-de-google', 'informational', 'tofu', 1],
  ['cómo responder reseñas negativas google', 'resenas-de-google', 'informational', 'tofu', 1],
  ['pedir reseñas sin que te penalice google', 'resenas-de-google', 'informational', 'tofu', 2],
  ['plantillas para pedir reseñas', 'resenas-de-google', 'informational', 'tofu', 2],
  ['reseñas falsas cómo denunciarlas', 'resenas-de-google', 'informational', 'tofu', 3],
  ['web propia vs google ads', 'web-vs-anuncios', 'commercial', 'mofu', 1],
  ['web o anuncios de google para mi negocio', 'web-vs-anuncios', 'commercial', 'mofu', 1],
  ['cuál es mejor web u google ads', 'web-vs-anuncios', 'commercial', 'mofu', 2],
  ['costo de google ads por clic colombia', 'web-vs-anuncios', 'commercial', 'mofu', 2],
  ['precio de página web en colombia', 'precio-pagina-web', 'commercial', 'mofu', 1],
  ['cuánto cuesta una página web', 'precio-pagina-web', 'commercial', 'mofu', 1],
  ['cuánto cuesta hacer una página web en colombia 2026', 'precio-pagina-web', 'commercial', 'mofu', 1],
  ['precio de página web para negocios', 'precio-pagina-web', 'commercial', 'mofu', 2],
  ['cuánto cuesta una tienda en línea', 'precio-pagina-web', 'commercial', 'mofu', 2],
  ['presupuesto página web corporativa', 'precio-pagina-web', 'commercial', 'mofu', 3],
  ['web administrada vs agencia', 'web-vs-agencia', 'commercial', 'mofu', 1],
  ['contratar agencia o hacer la web yo mismo', 'web-vs-agencia', 'commercial', 'mofu', 1],
  ['agencia web vs freelance', 'web-vs-agencia', 'commercial', 'mofu', 2],
  ['cuánto cuesta contratar una agencia de marketing', 'web-vs-agencia', 'commercial', 'mofu', 2],
  ['comparativa páginas web', 'comparativas-hub', 'commercial', 'mofu', 2],
  ['comparar servicios de diseño web', 'comparativas-hub', 'commercial', 'mofu', 3],
  ['web administrada', 'servicios-presentto', 'commercial', 'mofu', 1],
  ['web con dominio incluido', 'servicios-presentto', 'transactional', 'bofu', 1],
  ['servicio de diseño web', 'servicios-presentto', 'commercial', 'mofu', 1],
  ['dominio y correo profesional incluidos', 'servicios-presentto', 'commercial', 'mofu', 3],
  ['planes de página web', 'planes-precios', 'transactional', 'bofu', 1],
  ['precio de web administrada', 'planes-precios', 'transactional', 'bofu', 1],
  ['plan web mensual barato', 'planes-precios', 'transactional', 'bofu', 2],
  ['web administrada desde 40000', 'planes-precios', 'transactional', 'bofu', 2],
  ['demo web gratis', 'contacto-demo', 'transactional', 'bofu', 1],
  ['hacer mi página web gratis', 'contacto-demo', 'transactional', 'bofu', 2],
  ['pedir presupuesto de página web', 'contacto-demo', 'transactional', 'bofu', 1],
  ['preguntas frecuentes de web administrada', 'faq-presentto', 'informational', 'tofu', 2],
  ['dudas sobre crear una web', 'faq-presentto', 'informational', 'tofu', 3],
  ['portafolio de desarrollo web', 'portfolio-presentto', 'navigational', 'mofu', 3],
  ['sitios publicados con presentto', 'sitios-publicados', 'navigational', 'mofu', 3],
  ['quiénes son presentto', 'nosotros-presentto', 'navigational', 'mofu', 3],
  ['guías de presencia digital', 'guias-hub', 'informational', 'tofu', 3],
];
for (const [term, cluster, intent, funnel, priority] of generico) {
  add(term, { intent, funnel, priority, cluster });
}

// ------------------------------------------- 4. Alcance global (español LATAM)
const globalSeo = [
  ['página web administrada', 'servicios-presentto', 'commercial', 'mofu', 1],
  ['diseño web para pymes', 'servicios-presentto', 'commercial', 'mofu', 1],
  ['empresa de diseño web colombia', 'servicios-presentto', 'commercial', 'mofu', 2],
  ['presupuesto para página web', 'servicios-presentto', 'commercial', 'mofu', 3],
  ['presencia digital para pymes', 'rubro-profesionales', 'commercial', 'mofu', 2],
  ['marketing digital para pequeños negocios', 'rubro-profesionales', 'informational', 'tofu', 2],
  ['cómo empezar mi negocio en internet', 'presencia-digital-pilar', 'informational', 'tofu', 1],
  ['cuánto cuesta una web administrada', 'precio-pagina-web', 'commercial', 'mofu', 2],
  ['web para tiendas en línea', 'rubro-comercios', 'informational', 'tofu', 2],
  ['cómo mejorar mi página web', 'presencia-digital-pilar', 'informational', 'tofu', 2],
];
const paises = [
  ['MX', 'México'],
  ['ES', 'España'],
  ['AR', 'Argentina'],
  ['CL', 'Chile'],
  ['PE', 'Perú'],
];
for (const [term, cluster, intent, funnel, priority] of globalSeo) {
  add(term, { intent, funnel, priority, cluster, geo: 'global' });
  const [code, nombre] = paises[keywords.length % paises.length];
  add(`${term} ${nombre}`, { intent, funnel, priority: Math.min(3, priority + 1), cluster, geo: code });
}

// --------------------------------------------------------- 5. Cola larga / GSC
const larga = [
  ['presentto online', 'nosotros-presentto', 'navigational', 'tofu', 3],
  ['presentto web administrada', 'nosotros-presentto', 'navigational', 'tofu', 3],
  ['presenttación digital', 'planes-precios', 'navigational', 'bofu', 3],
  ['presentto.funza', 'ciudad-funza', 'navigational', 'bofu', 3],
  ['página web barata pero profesional', 'precio-pagina-web', 'commercial', 'mofu', 2],
  ['web profesional para negocio local barato', 'precio-pagina-web', 'commercial', 'mofu', 2],
  ['necesito una página web para mi restaurante', 'rubro-restaurantes', 'transactional', 'bofu', 1],
  ['quiero aparecer en google maps', 'aparecer-google-maps', 'transactional', 'bofu', 1],
  ['mi negocio no aparece en google', 'aparecer-google-maps', 'informational', 'tofu', 1],
  ['cómo hacer que mi negocio aparezca en google', 'aparecer-google-maps', 'informational', 'tofu', 1],
  ['ficha de google gratis', 'ficha-de-google', 'informational', 'tofu', 2],
  ['cuánto cuesta una web mensual', 'precio-pagina-web', 'commercial', 'mofu', 2],
  ['vale la pena una web propia', 'web-vs-anuncios', 'informational', 'tofu', 2],
  ['cuándo contratar una web administrada', 'web-vs-agencia', 'commercial', 'mofu', 2],
  ['web administrada qué es', 'web-vs-agencia', 'informational', 'tofu', 2],
  ['plantilla o web a medida para mi negocio', 'web-vs-agencia', 'commercial', 'mofu', 2],
  ['cuánto cuesta dominio y hosting en colombia', 'precio-pagina-web', 'commercial', 'mofu', 3],
  ['diferencia entre página web y landing page', 'precio-pagina-web', 'informational', 'tofu', 3],
  ['cómo pedir presupuesto de web', 'contacto-demo', 'transactional', 'bofu', 2],
  ['empresa de diseño web en cundinamarca', 'ciudad-funza', 'commercial', 'mofu', 2],
];
for (const [term, cluster, intent, funnel, priority] of larga) {
  add(term, { intent, funnel, priority, cluster });
}

// --------------------------------------------------------------- persistencia
const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  generator: 'scripts/seo/seed-keywords.mjs',
  note:
    'Siembra inicial. Ampliar y curar con los sub-agentes seo-keyword-miner y seo-cluster-architect. ' +
    'No ejecutar seo:seed tras curar a mano (sobrescribe).',
  keywords,
};

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n');
console.log(`[seo:seed] ${keywords.length} términos → ${path.relative(process.cwd(), out)}`);
