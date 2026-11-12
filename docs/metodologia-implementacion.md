# Metodología de implementación y sistema

Complemento operativo de `docs/servicio-administracion.md`.

---

## 1. Ecosistema

| Pieza | Dominio | Responsabilidad | Estado |
|---|---|---|---|
| Sitio comercial | `www.presentto.online` | Captación, oferta, precios, soporte, login | Este repo |
| Acceso de clientes | `www.presentto.online/cuenta/` | Autenticación y redirección única | Este repo |
| Dashboard de cliente | `dashboard.presentto.online/{slug}` | Operación, entregables y métricas | Proyecto independiente |
| Auth y perfiles | Supabase `us-east-1` | Usuarios, PIN, slug, estado del plan | Este repo lo aprovisiona |
| Leads y checkout | Formspree | Asesoría gratuita y datos previos al pago | Sin cambios |
| Pagos | Mercado Pago | 8 links: 4 planes × mensual/anual | Manual |

Regla: **este repo nunca implementa lógica de negocio del dashboard.** Solo autentica y entrega la URL.

## 2. Contrato de identidad

- **Teléfono** normalizado a E.164 sin `+` (ej. `573001234567`). Es el identificador visible.
- **PIN** de 6 dígitos. Contraseña de Supabase Auth.
- **Email sintético** interno: `{telefono}@auth.presentto.online`. El cliente no lo ve.
- **Slug**: derivado del nombre del negocio. `Don Carnes` → `doncarnes`. Reglas: minúsculas, sin acentos, sin espacios, solo `[a-z0-9-]`, único, sin guiones al inicio o final.
- **URL de dashboard**: `https://dashboard.presentto.online/{slug}/`.
- El slug **no es un secreto ni una autenticación**. El dashboard debe validar su propia sesión contra el mismo proyecto Supabase.

### Flujo de acceso

1. Cliente entra a `/cuenta/`.
2. Ingresa teléfono y PIN.
3. Supabase Auth valida.
4. Se lee `profiles` (fila propia, RLS).
5. Si `active = true`: botón "Abrir mi dashboard" y redirección a `dashboard.presentto.online/{slug}/`.
6. Si `active = false`: mensaje de plan vencido + WhatsApp.
7. Opción "Entrar como invitado": vuelve al sitio, sin sesión.

## 3. Aprovisionamiento de clientes

Script: `npm run client:create -- --name "Don Carnes" --phone 3001234567 --pin 482913 --plan presencia`

Pasos que ejecuta:

1. Normaliza teléfono y construye el email sintético.
2. Deriva el slug y resuelve colisiones con sufijo `-2`, `-3`.
3. Crea el usuario en Supabase Auth con `email_confirm`.
4. Inserta el perfil con plan, fechas y `active = true`.
5. Si falla la inserción, elimina el usuario para no dejar huérfanos.
6. Imprime teléfono, PIN, slug y URL del dashboard. Nunca imprime la service role key.

Rotación de PIN: `npm run client:pin -- --phone 3001234567 --pin 913482`.

Baja: poner `active = false` y `plan_expires_at`. No se borra el usuario ni el histórico.

## 4. Despliegue

### 4.1 Vercel (único host)

- Build: `npm run build`.
- Output: `dist`.
- Redirects: `vercel.json` es la fuente de verdad. `public/_redirects` se conserva como respaldo para Cloudflare, no lo lee Vercel.
- Headers y CSP: `vercel.json`.
- Variables: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_DASHBOARD_URL`, `PUBLIC_GOOGLE_SITE_VERIFICATION`, `PUBLIC_BING_SITE_VERIFICATION`.

### 4.2 Supabase

Ver `docs/supabase-setup.md`. Resumen:

1. Proyecto en `us-east-1`.
2. Ejecutar `supabase/migrations/0001_profiles.sql`.
3. Auth: confirmación de email desactivada, mínimo de contraseña 6, límites de intentos.
4. Redirect URL: `https://www.presentto.online/cuenta/`.
5. Crear el primer cliente con el script.

### 4.3 Orden de publicación

1. Migración y variables en preview.
2. `/cuenta/` en preview con un cliente de prueba.
3. Verificación de login, redirección y bloqueo por `active`.
4. Publicación del sitio comercial.
5. Aviso a clientes legacy antes de cualquier cambio de precio.

## 5. Onboarding de 30 días

| Día | Entregable | Responsable |
|---|---|---|
| 0 | Diagnóstico, accesos, inventario digital | Presentto |
| 1–3 | Plan de 30 días y setup técnico | Presentto |
| 3–10 | Web, ficha de Google, analítica, correo | Presentto |
| 10 | Revisión con el cliente | Ambos |
| 10–15 | Ajustes y correcciones | Presentto |
| 15 | Inducción IA (45 min) y entrega de credenciales | Ambos |
| 15–30 | Operación normal, primeros cambios y monitoreo | Presentto |
| 30 | Reporte inicial y plan del siguiente mes | Presentto |

## 6. Definition of Done (sitio comercial)

- `npm run check` sin errores.
- `npm run build` sin errores.
- `npm run seo:check` sin advertencias nuevas.
- Cero menciones a MVO, subdominio como producto o precios anteriores en `src/`.
- Precios solo en `src/data/service.ts`.
- 15 clientes visibles sin tipo de plan.
- `/cuenta/` con `noindex`.
- Login probado con teléfono + PIN reales de prueba.
- Redirección a dashboard con y sin sesión.
- CSP permite `*.supabase.co` y Formspree.
- Lighthouse ≥ 95/100 en servicios, precios y cuenta.
- Revisión móvil 360 px, teclado y `prefers-reduced-motion`.

## 7. Seguridad

- PIN de 6 dígitos: limitar intentos, no revelar si el teléfono existe, monitorear fuerza bruta.
- `active` corta el acceso, pero no borra datos.
- RLS activo: el cliente solo lee su fila.
- Service role solo en scripts locales y variables de servidor. Nunca en `PUBLIC_*`.
- El dashboard externo debe exigir su propia sesión; el slug no protege nada.
- Datos personales: teléfono y nombre del negocio. Actualizar `/privacidad/` con Supabase como encargado.
- Retención: mantener perfiles mientras exista relación comercial; 24 meses después de la baja.

## 8. Runbook de incidencias

| Síntoma | Causa probable | Acción |
|---|---|---|
| Login falla en silencio | CSP sin `*.supabase.co` | Corregir header en `vercel.json` |
| "Credenciales inválidas" con datos correctos | Teléfono sin normalizar | Revisar `phone` en `profiles` |
| Redirección 404 | Slug sin deploy en dashboard | Verificar host y slug; mostrar fallback |
| Cliente sin acceso tras pagar | `active = false` o perfil ausente | Ejecutar alta o reactivar |
| PIN olvidado | — | `client:pin` |

## 9. Sistema multifuncional del sitio

Componentes previstos para la implementación:

1. **Diagnóstico digital interactivo** (7 preguntas): devuelve madurez y plan sugerido, sin pedir datos.
2. **Comparador de planes** con anclaje de valor y cálculo anual.
3. **Muestra de clientes** con 15 sitios reales, sin plan ni métricas inventadas.
4. **Acceso de clientes** con login y fallback de invitado.
5. **Soporte** con SLA, canales y definición de cambio.
6. **Contenido educativo** reescrito hacia administración y presencia digital.

Estas piezas se construyen en las fases 2–6 del plan aprobado.
