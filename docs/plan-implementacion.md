# Plan de implementación — Administración de Presencia Digital

Estado: base lista, sitio público aún sin cambios.
Rama: `feat/administracion-web`.
Proyecto Supabase: `xodvvxtmhaxpthqgkfbe` · `us-west-2` · integración GitHub activa.

---

## 1. Estructura completa

Leyenda: ✅ creado · ◐ actualizar · ✚ nuevo · ✖ eliminar

```
docs/
  servicio-administracion.md          ✅ oferta, planes, SLA, IA
  metodologia-implementacion.md       ✅ ecosistema, onboarding, runbook
  supabase-setup.md                   ✅ configuración y operación
  plan-implementacion.md              ✅ este documento
  seo/estrategia-posicionamiento.md   ◐ nueva oferta
  seo/kpis.md                         ◐ métricas del servicio
  seo/clusters.json                   ◐ clústeres del servicio
  seo/keywords.json                   ◐ keywords del servicio
  seo/snippet-tests.json              ◐ snippets del servicio

supabase/
  config.toml                         ✅ project_id + auth
  migrations/0001_profiles.sql        ✅ tabla, RLS, vista, trigger

scripts/
  create-client.mjs                   ✅ alta, PIN, listado
  check-payments.mjs                  ✅ verificación de 8 links
  lib/slug.mjs                         ✅ slug + teléfono + email
  seo/*                                ◐ validación y seed

src/
  data/
    service.ts                        ✅ 4 planes, pilares, addons, IA
    payments.ts                       ✅ 8 placeholders de Mercado Pago
    clients.ts                        ✅ 15 clientes
    business.ts                       ◐ CTA, slogan, priceRange, WhatsApp
    site-index.ts                     ◐ índice de páginas
  lib/
    supabase.ts                       ✅ cliente de navegador
    slug.ts                           ✅ slug + URL de dashboard
  components/
    ServicePillars.astro              ✚ 4 pilares del servicio
    AiTeam.astro                      ✚ método y flujos de IA
    PlansGrid.astro                   ◐ 4 planes, tabs mensual/anual
    PlanComparison.astro              ✚ tabla comparativa
    SupportChannels.astro             ✚ canales y horarios
    SlaTable.astro                    ✚ SLA por plan
    ClientGrid.astro                  ✚ 15 clientes
    LoginForm.astro                   ✚ teléfono + PIN + invitado
    OnboardingTimeline.astro          ✚ reemplaza SessionTimeline
    Header.astro                      ◐ navegación y CTA
    Footer.astro                      ◐ oferta y enlaces
    FinalCta.astro                    ◐ CTA de diagnóstico
    CityPage.astro                    ◐ copy de servicio
    TrustStrip.astro                  ◐ prueba de confianza
    MvoEconomics.astro                ✖ retirar
    SessionTimeline.astro             ✖ reemplazar
    schemas.ts                        ◐ Service + OfferCatalog
  pages/
    servicios.astro                   ◐ reescritura completa
    precios.astro                     ◐ 4 planes + prepago
    soporte.astro                     ✚ canales, SLA, cambios
    cuenta.astro                      ✚ login y redirección
    contacto.astro                    ◐ diagnóstico gratuito
    index.astro                       ◐ home completo
    terminos.astro                    ◐ reescritura legal
    privacidad.astro                  ◐ Supabase, teléfono, PIN
    preguntas.astro                   ◐ FAQ del servicio
    nosotros.astro                    ◐ posicionamiento
    comparativas/index.astro          ◐ comparativas
    comparativas/web-administrada-vs-agencia.astro ◐
    guias/*.astro                     ◐ 7 guías reescritas
    funza|mosquera|madrid|facatativa ◐ copy
    sitios.astro                      ◐ 15 clientes
    portfolio.astro                   ◐ casos y proceso
    404.astro                         ◐ CTA
  scripts/motion/
    plans.ts                          ◐ tabs mensual/anual
    checkout.ts                       ◐ códigos de plan y links
    forms.ts                          ◐ mensajes de soporte/ventas
  styles/
    components.css                    ◐ tarjetas, soporte, cuenta
public/
  llms.txt                            ✅ nueva oferta
  _headers                            ✅ CSP Supabase
  _redirects                          ✅ nota Vercel
vercel.json                           ✅ CSP Supabase
.env.example                          ✅ URL real de Supabase
```

## 2. Contratos

### Pagos

`src/data/payments.ts` contiene 8 claves: `plan × mensual|anual`.
Mientras estén vacías:

- El botón muestra "Solicitar link de pago" → WhatsApp.
- El schema omite la oferta sin URL.
- `npm run payments:check` reporta el faltante.

### Acceso

- `phone` E.164 sin `+`.
- `slug` derivado del nombre, sin espacios.
- PIN de 6 dígitos.
- `active=false` bloquea; no borra.
- `/cuenta/` solo autentica y redirige a `dashboard.presentto.online/{slug}/`.

## 3. Fases

| Fase | Alcance | Archivos | Días | Aceptación |
|---|---|---|---|---|
| 1 | Datos y CTA | `business.ts`, `site-index.ts` | 0.5 | Precios solo en `service.ts`; build limpio |
| 2 | Servicios | `servicios.astro`, `ServicePillars`, `AiTeam`, `ClientGrid`, `OnboardingTimeline`, `schemas.ts` | 1 | Sin MVO; 15 clientes; schema válido |
| 3 | Precios | `precios.astro`, `PlansGrid`, `PlanComparison`, `checkout.ts`, `plans.ts` | 1 | 4 planes; tabs mensual/anual; placeholders funcionando |
| 4 | Soporte y contacto | `soporte.astro`, `contacto.astro`, `SupportChannels`, `SlaTable`, `forms.ts` | 1 | Canales y SLA visibles; Formspree intacto |
| 5 | Cuenta | `cuenta.astro`, `LoginForm`, `supabase.ts`, `slug.ts` | 1 | Login real, redirección, invitado, `noindex` |
| 6 | Propagación | home, header, footer, ciudades, legales, portfolio, sitios, 404 | 1 | Cero menciones a MVO en `src/` |
| 7 | SEO y contenido | guías, keywords, clusters, snippets, redirects, sitemap | 1 | `seo:check` limpio; 301 aplicados |
| 8 | QA y deploy | pruebas y publicación | 0.5 | check, build, Playwright, Lighthouse ≥95 |

Total: 7 días efectivos.

## 4. Orden de despliegue

1. Mergear la migración a `main` para que Supabase cree `profiles`.
2. Configurar `PUBLIC_SUPABASE_ANON_KEY` en Vercel.
3. Publicar `/cuenta/` en preview y crear un cliente de prueba.
4. Verificar login, PIN incorrecto, `active=false` e invitado.
5. Publicar el sitio comercial completo.
6. Comunicar a clientes legacy antes de cualquier cambio de precio.

## 5. Pendientes externos

| Pendiente | Responsable | Bloquea |
|---|---|---|
| `PUBLIC_SUPABASE_ANON_KEY` | Andrei | Fase 5 |
| `SUPABASE_SERVICE_ROLE_KEY` local | Andrei | Alta de clientes |
| 8 links de Mercado Pago | Andrei | Fase 3 (no bloquea el resto) |
| Confirmar rama `main` en la integración Supabase | Andrei | Migración |
| Definir si el dashboard comparte proyecto Supabase | Andrei | Contrato del dashboard |

## 6. Riesgos

| Riesgo | Mitigación |
|---|---|
| Región us-west-2 añade latencia al login | Aceptable; solo afecta autenticación |
| La integración aplica SQL en producción | Migraciones idempotentes y revisadas antes del merge |
| PIN de 6 dígitos | Rate limit, sin registro público, bloqueo por `active` |
| Slug público | El dashboard debe exigir su propia sesión |
| 8 links vacíos | Fallback a WhatsApp y `payments:check` |
| Guías contradicen la oferta | Reescritura en Fase 7, sin cambiar URLs |

## 7. Estado de implementación (2026-11-12)

### Completado en la rama `feat/administracion-web`

- Oferta pública reescrita: portada, servicios, precios, soporte, cuenta, contacto, ciudades,
  portafolio, sitios, nosotros, preguntas, términos, privacidad, 404, guías y comparativas.
- 4 planes con precios y setup definitivos; tabs mensual/anual; comparativa y SLA.
- 15 clientes reales sin revelar tipo de plan (`src/data/clients.ts`).
- Acceso de clientes con teléfono + PIN y redirección a `dashboard.presentto.online/{slug}/`.
- Migración `supabase/migrations/0001_profiles.sql` + vista `my_access` con RLS.
- Scripts `client:create`, `client:pin`, `client:list` y `payments:check`.
- Redirects 301 de `/mvo/`, `/planes/`, `/sesion-1/` y `/sesiones/` en `vercel.json` y `public/_redirects`.
- `npm run check`, `npm run build` y `npm run seo:check` en verde.

### Pendiente para publicar

1. `PUBLIC_SUPABASE_ANON_KEY` en Vercel (sin ella `/cuenta/` solo muestra el aviso).
2. `SUPABASE_SERVICE_ROLE_KEY` local para dar de alta clientes reales.
3. Confirmar que la integración GitHub de Supabase apunta a `main` y mergear la migración.
4. Pegar los 8 links de Mercado Pago en `src/data/payments.ts`.
5. Acordar el contrato de sesión con el dashboard externo (hoy solo se envía el slug).
6. Comunicar el cambio de precios a clientes legacy antes del despliegue.
