# Estrategia de posicionamiento — Presentto Online

Fecha de revisión: 2026-10-01.

## Modelo de negocio (fuente única de verdad)

Presentto vende **Administración de Presencia Digital**: la agencia todo en 1 para crecer
digitalmente. Administra web, dominio, correo, ficha de Google, analítica y sistemas; construye
lo que falta y aplica flujos de IA. Cuatro planes desde $100.000 COP/mes con IVA incluido.
Detalle completo en `docs/servicio-administracion.md`.

El SEO no es el producto: es una consecuencia técnica de operar bien cada apartado digital.
**Mensaje de marca**: "La agencia todo en 1 para crecer digitalmente."

> Revisión 2026-11-12: se retira el modelo MVO y la venta de webs por proyecto. Los clientes
> legacy conservan sus condiciones 12 meses y no aparecen en la oferta pública.

## Objetivo de posicionamiento (realista, 6–12 meses)

1. **Indexación** de todas las páginas en < 2 semanas tras publicar (sitemap + Search Console).
2. **CTR > 3%** promedio en las queries de marca ("presentto", "presentto online", "presenttación digital").
3. **3–5 consultas de demo por semana** vía WhatsApp desde tráfico orgánico y guías.
4. Primeras posiciones en queries de cola larga de nicho local ("página web para restaurantes en Funza", etc.).
5. Nunca prometer "primera página garantizada" ni vender reseñas falsas.

## Qué se corrige del trabajo anterior

- Se eliminó el posicionamiento de "agencia de SEO local" en titles, FAQs, schema y guías.
- Se reescribió el hub `/guias/seo-local/` como `/guias/que-es-presencia-digital/` + 4 guías reorientadas (ficha de Google, Maps, reseñas, web vs anuncios). Redirects 301 desde todas las URLs viejas.
- `keywords.json`, `clusters.json`, `snippet-tests.json` y `seed-keywords.mjs` se reorientan a intenciones del nuevo servicio: administración web, mantenimiento de páginas web, presencia digital para empresas, sistemas web y automatizaciones con IA. Las guías de precio de web se conservan como contenido TOFU con CTA a diagnóstico.
- `business.ts`: slogan real, areaServed Colombia, sin promesas de SEO.
- Copy de ciudades reorientado a "presencia digital" con testimonios de datos locales reales (DANE).

## Cómo seguirá creciendo el posicionamiento (pipeline realista)

1. **Medir**: export de Search Console → `npm run seo:gsc` (consultas reales, oportunidades por CTR).
2. **Curar**: `seo-keyword-miner` añade términos con intención real, no inventa volumen.
3. **Agrupar**: `seo-cluster-architect` mantiene 1 keyword primaria por página (sin canibalización).
4. **Publicar**: nuevas guías por rubro (`/guias/pagina-web-para-*/`, planned en clusters.json) redactadas con casos reales de clientes.
5. **Optimizar snippets**: `snippet-ctr-optimizer` itera titles/metas con hipótesis medibles en Search Console.
6. **Auditar**: `seo-schema-auditor` + `seo-qa` antes de cada publicación (`npm run check && npm run build && npm run seo:check`).

## Reglas de oro (para no repetir el error)

- SEO es el medio, no la promesa. Nunca titular "SEO local" como producto.
- Toda guía debe responder una duda real del negocio del cliente, no de la disciplina SEO.
- NAP (nombre, dirección, teléfono) solo con datos verificables; nunca inventar ficha o reseñas.
- Sin "primera página garantizada" ni testimonios falsos.
