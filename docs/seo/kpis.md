# KPIs de SEO — Presentto

Fuente de verdad de métricas y recordatorios de medición. Se actualiza cada ronda con `npm run seo:gsc`
(re-importa el export de [Search Console](https://search.google.com/search-console)) y se revisa con la
cabecera "Estado de KPIs" que entrega el sub-agente `seo-qa`.

## Línea base (25 sep 2026)

Datos del export `presentto.online-Performance-on-Search-2026-09-25.zip` → `src/data/seo/gsc.json`
(90 días, ventana 27 jun – 25 sep 2026):

| Métrica | Valor | Nota |
| --- | --- | --- |
| Impresiones | **57** | casi todo tráfico de marca/typos |
| Clics | 20 | |
| CTR | 35,09 % | engañoso: sesgado a marca (posición 2,6) |
| Posición media | 2,6 | solo consultas de marca/typos |
| Consultas no-brand en top-10 | **0** | aquí está todo el trabajo |
| Páginas con impresiones | 4 | home, cookies, términos + dominio sin www |

Problemas detectados en la línea base:
1. No hay tráfico de términos genéricos ("seo local", "cuánto cuesta una página web", etc.).
2. La propiedad `presentto.online` (sin www) muestra impresiones propias → confirmar en GSC que
   `https://www.presentto.online/` es la propiedad principal y que las no-www redirigen 301.
3. `/cookies.html` y `/terminos.html` aparecen con impresiones (URLs legacy) → sus 301 ya existen
   en `public/_redirects`; verificar consolidación en GSC tras 4 semanas.

## Metas

| # | Métrica | Base | 30 días | 60 días | 90 días | 12 meses |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Impresiones / 28 días | 19 | 150 | 700 | **1.500** | **25.000** |
| 2 | Queries no-brand en posiciones 1-10 | 0 | 10 | 25 | **40-60** | **300+** |
| 3 | CTR en posiciones 1-3 | — | 15 % | 20 % | **> 25 %** | > 25 % |
| 4 | Páginas indexadas (cobertura) | 25 | 25 | 30 | 30 | 50+ |
| 5 | Keywords en `keywords.json` con página publicada | ~20 % | 30 % | 50 % | 70 % | 90 % |

Reglas de lectura:
- **Impresiones** siempre en ventana móvil de 28 días (evita estacionalidad semanal).
- **Queries no-brand**: excluye todo lo que contenga "presentto", "present", typos de marca y
  "presentación/presentoit" (ver `src/data/seo/gsc.json → queries`).
- **CTR** solo se evalúa por tramo de posición: el CTR global mezcla marca y no-brand, no sirve.
- Nunca se celebra subida de impresiones sin revisar posición media de esas mismas queries.

## Recordatorios

| Cuándo | Qué hacer | Con qué |
| --- | --- | --- |
| Cada 7 días | Reimportar export de GSC | `npm run seo:gsc` |
| Cada 14 días | Revisar `opportunities` (impresiones con CTR < 5 %) | `src/data/seo/gsc.json` |
| Cada 30 días | Ronda completa de agentes | `/seo-round` |
| Cada 30 días | Aplicar/revertir tests de snippet con ≥ 4 semanas de datos | `snippet-ctr-optimizer` |
| Cada 90 días | Comparar tabla de metas 1-3 y recalcular prioridades | `docs/seo/kpis.md` |
| Tras cada deploy | Validar build + validador | `npm run check && npm run build && npm run seo:check` |

## Registro de evolución

| Fecha | Impresiones/28d | Clics/28d | Queries no-brand top-10 | CTR pos 1-3 | Notas |
| --- | --- | --- | --- | --- | --- |
| 2026-09-25 | 19 (≈57/90d) | 20 | 0 | — | línea base |
| | | | | | |

## Umbrales de alerta

- Impresiones/28d < 100 tras 30 días de la línea base → revisar indexación y `sitemap.xml`.
- Una página pierde toda impresión tras rediseño → comprobar 301 y canonical (ronda `seo-schema-auditor`).
- CTR pos 1-3 < 15 % tras 90 días → ronda urgente de `snippet-ctr-optimizer`.
- Cualquier consulta con impresiones y URL legacy `.html` → verificar redirección.
