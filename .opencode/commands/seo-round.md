---
description: Ronda completa de SEO con sub-agentes (miner → architect → brief/ctr → schema-auditor → qa). Ejecuta $ARGUMENTS con "solo-ctr", "contenido" o vacío para la ronda estándar.
---

Ronda de SEO de Presentto. Orquesta los sub-agentes en este orden y no saltes pasos.

Estado del validador ahora:
!`npm run seo:check`

Banco de keywords actual:
!`node -e "const k=require('./src/data/seo/keywords.json').keywords;const c=require('./src/data/seo/clusters.json').clusters;const s=require('./src/data/seo/snippet-tests.json').tests;console.log('keywords:',k.length,'| clusters:',c.length,'(planned:',c.filter(x=>x.status==='planned').length+') | tests:',s.filter(t=>t.status==='pending').length,'pending| gsc:',require('./src/data/seo/gsc.json').totals.impressions,'impresiones')"`

Contexto: @src/data/seo/clusters.json @src/data/seo/snippet-tests.json

Modo pedido: $ARGUMENTS (vacío = ronda estándar)

Ejecuta con la herramienta Task, uno por fase y con este orden:

1. **Fase 1 — `seo-keyword-miner`**: amplía/curalas keywords (≥150), mete quick wins de `gsc.json` y reporta queries sin clúster.
2. **Fase 2 — `seo-cluster-architect`**: resuelve keywords huérfanas, canibalizaciones y crea los clústeres `planned` propuestos. Exige 0 errores de `npm run seo:check` antes de seguir.
3. **Fase 3 (en paralelo, dos tareas a la vez)**:
   - `seo-content-brief` → 1 brief nuevo en `src/data/seo/briefs/` para el clúster planned de mayor prioridad (o redacción si el usuario lo pidió con `contenido`).
   - `snippet-ctr-optimizer` → hasta 5 tests `pending` para páginas en posiciones 4-15 de `gsc.json`; solo aplica en código variantes ya aprobadas.
   - En modo `solo-ctr` omite `seo-content-brief`.
4. **Fase 4 — `seo-schema-auditor`**: audita JSON-LD/canonical/robots/OG de `dist/`. Si `dist/` es viejo, primero tú (agente principal) ejecutas `npm run build`, luego audita.
5. **Fase 5 — `seo-qa`**: veredicto APROBADO/BLOQUEADO. Si sale BLOQUEADO, corrige tú el bloqueo y repite solo `seo-qa`.

Límites: ningún sub-agente ejecuta `npm run build`/`npm run check`; tú validas con `npm run check && npm run build && npm run seo:check` al final. No toques `src/styles/global.css`, no añadas FAQPage ni hreflang, no inventes cifras/clientes/personas.

Cierra con: resumen de cambios por archivo, estado de los KPIs (ver `docs/seo/kpis.md`) y siguiente ronda sugerida.
