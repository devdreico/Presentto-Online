# Configuración de Supabase — acceso de clientes

Proyecto único para `www.presentto.online` y `dashboard.presentto.online`.
Región: `us-east-1`.

---

## 1. Crear el proyecto

1. [supabase.com/dashboard](https://supabase.com/dashboard) → New project.
2. Nombre: `presentto-clients`.
3. Región: `East US (us-east-1)`.
4. Guardar la contraseña de base de datos en el gestor de secretos.
5. Anotar:
   - `Project URL` → `PUBLIC_SUPABASE_URL`
   - `anon public key` → `PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` (solo local y servidor)

## 2. Ejecutar la migración

SQL Editor → New query → pegar y ejecutar `supabase/migrations/0001_profiles.sql`.

La migración crea:

- Tabla `public.profiles`.
- Restricciones de formato de teléfono y slug.
- RLS con lectura solo de la fila propia.
- Trigger de `updated_at`.
- Índices por slug y teléfono.

Verificación:

```sql
select tablename, rowsecurity from pg_tables where tablename = 'profiles';
select policyname, cmd from pg_policies where tablename = 'profiles';
```

## 3. Configurar Auth

Authentication → Providers → Email:

- Enable Email provider: **on**.
- Confirm email: **off** (el alta la hace un administrador).
- Secure email change: off.

Authentication → Policies:

- Minimum password length: **6**.
- Leaked password protection: off (los PIN son numéricos; activarlo bloquearía PIN comunes).

Authentication → Rate limits:

- Sign in / sign up: 30 por hora por IP (valor razonable; revisar tras el primer mes).
- Token refresh: por defecto.

Authentication → URL Configuration:

- Site URL: `https://www.presentto.online`
- Redirect URLs:
  - `https://www.presentto.online/cuenta/`
  - `http://localhost:4321/cuenta/`

## 4. Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
PUBLIC_DASHBOARD_URL=https://dashboard.presentto.online
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # solo local, nunca PUBLIC_
```

En Vercel → Settings → Environment Variables: solo las tres `PUBLIC_*`.
La service role **no se configura en Vercel**.

## 5. Crear el primer cliente

```bash
npm run client:create -- \
  --name "Don Carnes" \
  --phone 3001234567 \
  --pin 482913 \
  --plan presencia
```

Salida esperada:

```
Cliente creado
  Negocio:  Don Carnes
  Teléfono: 573001234567
  PIN:      482913
  Slug:     doncarnes
  Dashboard: https://dashboard.presentto.online/doncarnes/
```

Probar en `/cuenta/`: teléfono `3001234567` (o `573001234567`) y el PIN.

## 6. Operaciones

| Operación | Comando / acción |
|---|---|
| Alta | `npm run client:create -- --name ... --phone ... --pin ... --plan ...` |
| Cambiar PIN | `npm run client:pin -- --phone 3001234567 --pin 913482` |
| Suspender | `update profiles set active = false where phone = '573001234567';` |
| Reactivar | `update profiles set active = true, plan_expires_at = '2027-11-12';` |
| Renombrar negocio | `update profiles set display_name = '...' where slug = '...';` (el slug no cambia) |
| Ver un cliente | `select * from profiles where phone = '573001234567';` |

## 7. Seguridad

- RLS activo y sin políticas de escritura para clientes.
- `service_role` solo en `.env.local` (añadido a `.gitignore`) y en el script local.
- El alta es manual: no hay registro público.
- PIN de 6 dígitos: Supabase aplica hash y rate limiting; no se almacena en claro.
- El dashboard comparte proyecto pero debe validar sesión. Un slug conocido no da acceso.
- Revisar mensualmente Authentication → Users para detectar altas inesperadas.

## 8. Checklist de aceptación

- [ ] Migración ejecutada sin errores.
- [ ] RLS activo y política de `select` propia.
- [ ] Usuario de prueba creado y login correcto.
- [ ] Login con PIN incorrecto falla sin filtrar información.
- [ ] `active = false` bloquea la redirección.
- [ ] CSP permite `https://*.supabase.co`.
- [ ] Variables `PUBLIC_*` configuradas en Vercel.
- [ ] `noindex` en `/cuenta/`.
