-- Presentto — perfiles de acceso de clientes
-- Ejecutar en el proyecto Supabase (us-west-2) antes de dar de alta clientes.
-- No crea usuarios de Auth: eso lo hace scripts/create-client.mjs con service role.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  phone text not null unique,
  slug text not null unique,
  display_name text not null,
  active boolean not null default true,
  plan_code text,
  plan_started_at date,
  plan_expires_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_phone_format check (phone ~ '^[0-9]{10,15}$'),
  constraint profiles_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint profiles_plan_check check (
    plan_code is null
    or plan_code in ('presencia', 'crecimiento', 'sistemas', 'empresa')
  )
);

comment on table public.profiles is
  'Acceso de clientes a /cuenta/ y redirección a dashboard.presentto.online/{slug}/.';
comment on column public.profiles.phone is 'E.164 sin +. Ej: 573001234567';
comment on column public.profiles.slug is 'Derivado del nombre del negocio. Único, minúsculas, sin espacios.';
comment on column public.profiles.active is 'false suspende el acceso sin borrar datos.';

create index if not exists profiles_slug_idx on public.profiles (slug);
create index if not exists profiles_active_idx on public.profiles (active);

-- updated_at automático
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;

create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

-- RLS: el cliente solo puede leer su propia fila.
alter table public.profiles enable row level security;
alter table public.profiles force row level security;

drop policy if exists "profiles_select_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

-- Sin políticas de insert/update/delete: el alta y los cambios se hacen con
-- service role (scripts locales) o desde el panel de Supabase.
-- Ajustar los grants por defecto de Supabase (ALL para anon/authenticated).
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;

-- Vista de conveniencia: evita exponer columnas internas al front.
-- security_invoker hace que se aplique la RLS del usuario que consulta.
create or replace view public.my_access
with (security_invoker = true)
as
select
  p.slug,
  p.display_name,
  p.active,
  p.plan_code,
  p.plan_expires_at
from public.profiles p
where p.id = auth.uid();

comment on view public.my_access is
  'Datos mínimos que /cuenta/ necesita tras el login.';

grant select on public.my_access to authenticated;

-- Comprobación rápida tras ejecutar:
-- select tablename, rowsecurity from pg_tables where tablename = 'profiles';
-- select policyname, cmd from pg_policies where tablename = 'profiles';
