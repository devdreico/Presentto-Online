/**
 * Slug canónico de cliente (versión Node del script de alta).
 * Mantener en sincronía con src/lib/slug.ts.
 */
export function slugify(input) {
  return (
    input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, ' y ')
      .replace(/[^a-z0-9-]+/g, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40)
      .replace(/-+$/g, '') || 'cliente'
  );
}

/** Teléfono E.164 sin "+". Acepta 3001234567 o +57 300 123 4567. */
export function normalizePhone(input) {
  const digits = String(input).replace(/\D/g, '');
  if (digits.length === 10) return `57${digits}`;
  if (digits.length === 12 && digits.startsWith('57')) return digits;
  if (digits.length === 11 && digits.startsWith('0')) return `57${digits.slice(1)}`;
  throw new Error(`Teléfono inválido: ${input}. Usa 10 dígitos (3001234567) o E.164 (573001234567).`);
}

/** Email sintético interno para Supabase Auth. */
export function phoneToEmail(phone) {
  return `${phone}@auth.presentto.online`;
}
