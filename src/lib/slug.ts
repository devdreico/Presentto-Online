/**
 * Slug canónico de cliente.
 * Mantener en sincronía con scripts/lib/slug.mjs.
 *
 * Regla: minúsculas, sin acentos, sin espacios. Los guiones solo se conservan
 * si el nombre ya los trae.
 * Casos: "Don Carnes" → "doncarnes"; "Korall BS" → "korallbs";
 * "Korall-BS" → "korall-bs"; "Café & Pan S.A.S." → "cafeypansas".
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

/** URL única del dashboard del cliente. */
export function dashboardUrl(slug: string): string {
  const base =
    (import.meta.env.PUBLIC_DASHBOARD_URL as string | undefined)?.replace(/\/+$/, '') ||
    'https://dashboard.presentto.online';
  return `${base}/${slug}/`;
}
