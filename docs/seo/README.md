# Flujo de SEO con sub-agentes

Cómo se multiplica el CTR y las posiciones de `www.presentto.online` (español neutro, alcance mundial).

## Comando maestro

```
/seo-round            # ronda estándar
/seo-round solo-ctr   # solo tests de title/description
/seo-round contenido  # ronda con redacción de la siguiente guía
```

El comando (`.opencode/commands/seo-round.md`) orquesta en orden:

```
seo-keyword-miner  →  seo-cluster-architect  →  (seo-content-brief ∥ snippet-ctr-optimizer)
        →  seo-schema-auditor  →  seo-qa
```

## Sub-agentes (`.opencode/agents/`)

| Agente | Entrada | Salida | Bash permitido |
| --- | --- | --- | --- |
| `seo-keyword-miner` | `gsc.json` + `keywords.json` | términos nuevos (≥150, dedup, intent/funnel/geo) | `seo:gsc`, `seo:check` |
| `seo-cluster-architect` | `keywords.json`, `clusters.json` | clústeres sin canibalización + huecos priorizados | `seo:check` |
| `seo-content-brief` | clústeres `planned` | `src/data/seo/briefs/<id>.json` (y páginas si se pide) | `seo:check` |
| `snippet-ctr-optimizer` | `gsc.json`, `snippet-tests.json` | variantes ≤60/≤160 con hipótesis medible | `seo:check` |
| `seo-schema-auditor` | `dist/`, `schemas.ts` | auditoría JSON-LD/canonical/robots/OG | `seo:check`, `node scripts/seo/*` |
| `seo-qa` | validador + git diff | APROBADO / BLOQUEADO (solo lectura) | `seo:check`, `seo:gsc`, `check` |

**Ningún sub-agente ejecuta `npm run build` ni `npm run check`**: lo hace el agente principal antes de
auditar/validar (`npm run check && npm run build && npm run seo:check`).

## Datos (`src/data/seo/`)

| Archivo | Quién lo escribe | Qué contiene |
| --- | --- | --- |
| `keywords.json` | `seo-keyword-miner` (siembra: `npm run seo:seed`, solo la primera vez) | ≥150 términos: `term, intent, geo, cluster, funnel, priority, source` |
| `clusters.json` | `seo-cluster-architect` | 1 keyword primaria y 1 `targetPage` por clúster; `status: published\|planned` |
| `snippet-tests.json` | `snippet-ctr-optimizer` | variantes de title/description con hipótesis y `status` |
| `gsc.json` | `npm run seo:gsc` (export de Search Console) | consultas, páginas, `opportunities` (CTR bajo con impresiones) |
| `briefs/` | `seo-content-brief` | briefs de contenido listos para redactar |

## Scripts

```bash
npm run seo:check   # validador (esquemas, canibalización, ≤60/≤160, H1, canonical, llms.txt, sitemap)
npm run seo:gsc     # importa el export .zip/.csv de Search Console → src/data/seo/gsc.json
npm run seo:seed    # regenera la siembra inicial de keywords (NO usar tras curar a mano)
```

## Documentación relacionada

- `docs/seo/kpis.md` — metas, línea base y recordatorios de medición.
- `docs/seo/offsite.md` — checklist manual: Google Business Profile, citas, backlinks, señales locales.
