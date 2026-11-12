/**
 * Slug canónico de cliente.
 * Mantener en sincronía con scripts/lib/slug.mjs.
 *
 * Regla: minúsculas, sin acentos, sin espacios. Los guiones solo se conservan
 * si el nombre ya los trae.
 * Casos: "Don Carnes" → "doncarnes"; "Korall BS" → "korallbs";
 * "Korall-BS" → "korall-bs"; "Café & Pan S.A.S." → "cafeypansas".
 * El subdominio existente manda: si el sitio ya vive en korall-bs.presentto.online,
 * el perfil usa ese slug aunque el nombre se escriba sin guion.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' y ')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/g, '') || 'cliente';
}

/** Teléfono E.164 sin "+". Acepta 10 dígitos o +57. Mantener en sincronía con scripts/lib/slug.mjs. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return `57${digits}`;
  if (digits.length === 12 && digits.startsWith('57')) return digits;
  if (digits.length === 11 && digits.startsWith('0')) return `57${digits.slice(1)}`;
  return '';
}

/**
 * URL del dashboard del cliente.
 * Por defecto vive en el mismo origen (`/app/`), proxificado a su despliegue
 * con un rewrite de Vercel: así comparte la sesión de Supabase y no hay un
 * segundo login. PUBLIC_DASHBOARD_URL solo se usa para apuntar a otro origen
 * en desarrollo.
 */
export function dashboardUrl(slug: string): string {
  const base = (import.meta.env.PUBLIC_DASHBOARD_URL as string | undefined)?.replace(/\/+$/, '');
  return `${base || '/app'}/${slug}/`;
}
