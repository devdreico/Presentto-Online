# Configuración de Supabase — acceso de clientes

Proyecto **`xodvvxtmhaxpthqgkfbe`** · región **us-west-2**.
Compartido por `www.presentto.online` y `dashboard.presentto.online`.

> La región no se puede cambiar sin migrar el proyecto. us-west-2 añade latencia
> (~120–160 ms desde Colombia) solo en el login; no afecta al sitio estático.

---

## 1. Estado actual

| Elemento | Estado |
|---|---|
| Proyecto Supabase | Creado en us-west-2 |
| Integración GitHub | Conectada al repo `devdreico/Presentto-Online` |
| Migración `0001_profiles.sql` | En el repo, pendiente de aplicar por la integración |
| `PUBLIC_SUPABASE_URL` | `https://xodvvxtmhaxpthqgkfbe.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | **Pendiente** (Dashboard → Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Pendiente** (solo local, nunca en Vercel) |

## 2. Integración con GitHub

La integración aplica las migraciones de `supabase/migrations/` cuando se hace push a la rama configurada como producción.

1. Dashboard → Project Settings → Integrations → GitHub.
2. Verificar repositorio: `devdreico/Presentto-Online`.
3. Rama de producción: **`main`**.
4. Directorio de migraciones: **`supabase/migrations`**.
5. Guardar.

Reglas:

- No editar el esquema a mano en el SQL Editor: el cambio se pierde o se desincroniza.
- Todo cambio va en `supabase/migrations/NNNN_descripcion.sql`, idempotente cuando sea posible.
- La migración se aplica al mergear a `main`. Las ramas de preview requieren Supabase Branching (plan pago).
- Tras el merge, verificar en Dashboard → Database → Migrations que `0001_profiles` aparece como aplicada.

## 3. Aplicar la migración

Opción A — por la integración (recomendada):

```bash
git checkout main
git merge feat/administracion-web
git push origin main
```

Opción B — manual, solo si la integración falla:

SQL Editor → pegar `supabase/migrations/0001_profiles.sql` → Run.

Verificación:

```sql
select tablename, rowsecurity from pg_tables where tablename = 'profiles';
select policyname, cmd from pg_policies where tablename = 'profiles';
select * from public.my_access; -- 0 filas sin sesión
```

## 4. Configurar Auth

Authentication → Providers → Email:

- Enable Email provider: **on**.
- Confirm email: **off** (el alta la hace un administrador).
- Secure email change: off.

Authentication → Policies:

- Minimum password length: **6**.
- Leaked password protection: off (los PIN son numéricos; activarlo bloquearía PIN comunes).

Authentication → Rate limits:

- Sign in / sign up: 30 por hora por IP. Revisar tras el primer mes.

Authentication → URL Configuration:

- Site URL: `https://www.presentto.online`
- Redirect URLs:
  - `https://www.presentto.online/cuenta/`
  - `http://localhost:4321/cuenta/`

## 5. Variables de entorno

`.env.local` (local, ignorado por git):

```bash
PUBLIC_SUPABASE_URL=https://xodvvxtmhaxpthqgkfbe.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
PUBLIC_DASHBOARD_URL=https://dashboard.presentto.online
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # solo local, nunca PUBLIC_
```

Vercel → Settings → Environment Variables: solo las tres `PUBLIC_*`.
La service role **no se configura en Vercel**.

## 6. Crear el primer cliente

```bash
npm run client:create -- \
  --name "Don Carnes" \
  --phone 3001234567 \
  --pin 482913 \
  --plan presencia \
  --months 12
```

Salida esperada:

```
Cliente creado
  Negocio:   Don Carnes
  Teléfono:  573001234567
  PIN:       482913
  Plan:      presencia (12 meses)
  Vence:     2027-11-12
  Slug:      doncarnes
  Dashboard: https://dashboard.presentto.online/doncarnes/
```

Probar en `/cuenta/`: teléfono `3001234567` (o `573001234567`) y el PIN.

## 7. Operaciones

| Operación | Comando / acción |
|---|---|
| Alta | `npm run client:create -- --name ... --phone ... --plan ...` (genera PIN si se omite `--pin`) |
| Cambiar PIN | `npm run client:pin -- --phone 3001234567 --pin 913482` |
| Listar | `npm run client:list` |
| Suspender | `update profiles set active = false where phone = '573001234567';` |
| Reactivar | `update profiles set active = true, plan_expires_at = '2027-11-12';` |
| Renombrar negocio | `update profiles set display_name = '...' where slug = '...';` (el slug no cambia) |

## 8. Seguridad

- RLS activo y sin políticas de escritura para clientes.
- `service_role` solo en `.env.local` y en el script local.
- El alta es manual: no hay registro público.
- PIN de 6 dígitos: hash bcrypt de Supabase; no se almacena en claro. El alta rechaza
  secuencias obvias (123456, 000000, repetidos) y, si no se pasa `--pin`, genera uno aleatorio.
- El cliente puede rotar su PIN en `/cuenta/` («Cambiar mi PIN») con la sesión abierta.
- **Configurar rate limits** en Supabase → Authentication → Rate Limits (sign-in con contraseña).
  Con 6 dígitos, el límite por IP es la defensa principal contra fuerza bruta.
- Si el volumen crece, activar CAPTCHA (Turnstile/hCaptcha) en Authentication y enviar
  `options.captchaToken` desde el formulario de `/cuenta/`.
- El dashboard comparte proyecto pero **debe validar sesión**. Hoy `/cuenta/` solo envía el slug:
  un slug conocido no puede dar acceso por sí solo (ver contrato de handoff en el plan).
- Revisar mensualmente Authentication → Users para detectar altas inesperadas.

## 8.1 Handoff al dashboard (mismo origen)

El dashboard se publica aparte, pero se sirve bajo `www.presentto.online/app/*` con un
`rewrite` en `vercel.json` hacia `dashboard.presentto.online`. Consecuencias:

- El navegador ejecuta el dashboard en el origen `www.presentto.online`, así que comparte
  `localStorage` con `/cuenta/`: **la sesión de Supabase ya está disponible y no hay segundo login**.
- El proyecto del dashboard debe compilar con base `/app/` (assets y rutas internas relativas),
  o el proxy devolverá HTML con rutas que apuntan a `www` y romperán los estilos.
- `/cuenta/` redirige a `/app/{slug}/`. El dashboard debe validar la sesión y leer el slug del
  path; **el slug por sí solo nunca debe dar acceso**.
- Si el dashboard se mueve de host, basta cambiar el destino en `vercel.json`.
- En local, `PUBLIC_DASHBOARD_URL` permite apuntar a otro origen; en producción debe quedar vacío.

## 9. Checklist de aceptación

- [ ] Migración aplicada por la integración y visible en Migrations.
- [ ] RLS activo y política de `select` propia.
- [ ] `PUBLIC_SUPABASE_ANON_KEY` en Vercel.
- [ ] Usuario de prueba creado y login correcto.
- [ ] PIN incorrecto falla sin filtrar información.
- [ ] `active = false` bloquea la redirección.
- [ ] CSP permite `https://*.supabase.co`.
- [ ] `/cuenta/` con `noindex`.
