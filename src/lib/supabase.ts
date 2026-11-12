import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

/**
 * Cliente de navegador. Devuelve null si faltan variables de entorno,
 * para que /cuenta/ pueda mostrar un aviso en vez de romper el build.
 */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  client ??= createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
