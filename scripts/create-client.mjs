#!/usr/bin/env node
/**
 * Alta y mantenimiento de clientes en Supabase.
 *
 * Requiere .env.local con:
 *   PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 *
 * Uso:
 *   npm run client:create -- --name "Don Carnes" --phone 3001234567 --pin 482913 --plan presencia
 *   npm run client:pin    -- --phone 3001234567 --pin 913482
 */
import { randomInt } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { normalizePhone, phoneToEmail, slugify } from './lib/slug.mjs';

/** Carga .env.local sin dependencias externas (Node 18 compatible). */
function loadLocalEnv() {
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    for (const line of raw.split('\n')) {
      const clean = line.trim();
      if (!clean || clean.startsWith('#')) continue;
      const eq = clean.indexOf('=');
      if (eq === -1) continue;
      const key = clean.slice(0, eq).trim();
      const value = clean.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env.local es opcional: en CI las variables vienen del entorno.
  }
}

loadLocalEnv();

const PLANS = ['presencia', 'crecimiento', 'sistemas', 'empresa'];

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) out[key] = true;
    else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function requireEnv() {
  const url = process.env.PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      'Faltan PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.\n' +
        'Copia .env.example a .env.local y ejecuta con: npm run client:create -- ...'
    );
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

const WEAK_PINS = new Set([
  '000000', '111111', '222222', '333333', '444444', '555555',
  '666666', '777777', '888888', '999999', '123456', '654321',
  '121212', '112233', '123123', '456789', '987654', '159753',
]);

/** PIN de 6 dígitos que no sea repetitivo ni una secuencia obvia. */
function validPin(pin) {
  return typeof pin === 'string' && /^\d{6}$/.test(pin) && !WEAK_PINS.has(pin);
}

/** PIN aleatorio criptográfico, sin secuencias obvias. */
function randomPin() {
  for (;;) {
    const pin = String(randomInt(0, 1_000_000)).padStart(6, '0');
    if (validPin(pin)) return pin;
  }
}

async function uniqueSlug(admin, base) {
  const root = slugify(base);
  const { data, error } = await admin.from('profiles').select('slug').like('slug', `${root}%`);
  if (error) throw error;
  const taken = new Set((data ?? []).map((r) => r.slug));
  if (!taken.has(root)) return root;
  for (let i = 2; i < 100; i++) {
    const candidate = `${root}-${i}`;
    if (!taken.has(candidate)) return candidate;
  }
  throw new Error(`No se pudo generar un slug único para "${base}"`);
}

async function createClient_(admin, args) {
  const name = String(args.name ?? '').trim();
  const plan = String(args.plan ?? '').trim().toLowerCase();
  const pin = args.pin ? String(args.pin) : randomPin();

  if (!name) throw new Error('Falta --name "Nombre del negocio"');
  if (!validPin(pin))
    throw new Error('PIN inválido: usa 6 dígitos y evita secuencias obvias (123456, 000000…).');
  if (!PLANS.includes(plan)) throw new Error(`Plan inválido. Usa: ${PLANS.join(', ')}`);

  const phone = normalizePhone(args.phone);
  const email = phoneToEmail(phone);
  const slug = args.slug ? slugify(String(args.slug)) : await uniqueSlug(admin, name);

  const { data: existing } = await admin
    .from('profiles')
    .select('id, slug')
    .or(`phone.eq.${phone},slug.eq.${slug}`)
    .maybeSingle();

  if (existing) {
    throw new Error(`Ya existe un cliente con ese teléfono o slug (slug: ${existing.slug}).`);
  }

  const { data: userData, error: userError } = await admin.auth.admin.createUser({
    email,
    password: pin,
    email_confirm: true,
    user_metadata: { display_name: name, phone, slug },
  });

  if (userError || !userData.user) {
    throw new Error(`No se pudo crear el usuario: ${userError?.message ?? 'desconocido'}`);
  }

  const months = Number(args.months ?? 12);
  if (!Number.isInteger(months) || months < 1 || months > 36) {
    throw new Error('--months debe ser un entero entre 1 y 36 (por defecto 12)');
  }

  const today = new Date();
  const expires = new Date(today);
  expires.setMonth(expires.getMonth() + months);

  const { error: profileError } = await admin.from('profiles').insert({
    id: userData.user.id,
    phone,
    slug,
    display_name: name,
    active: true,
    plan_code: plan,
    plan_started_at: today.toISOString().slice(0, 10),
    plan_expires_at: expires.toISOString().slice(0, 10),
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(userData.user.id);
    throw new Error(`Perfil no creado, usuario revertido: ${profileError.message}`);
  }

  const dashboard = `${(process.env.PUBLIC_DASHBOARD_URL || 'https://dashboard.presentto.online').replace(/\/+$/, '')}/${slug}/`;

  console.log('\nCliente creado');
  console.log(`  Negocio:   ${name}`);
  console.log(`  Teléfono:  ${phone}`);
  console.log(`  PIN:       ${pin}`);
  console.log(`  Plan:      ${plan} (${months} meses)`);
  console.log(`  Vence:     ${expires.toISOString().slice(0, 10)}`);
  console.log(`  Slug:      ${slug}`);
  console.log(`  Dashboard: ${dashboard}`);
  console.log('\nEntrega estas credenciales al cliente y pídele cambiar el PIN al primer ingreso.\n');
}

async function rotatePin(admin, args) {
  const phone = normalizePhone(args.phone);
  const pin = String(args.pin ?? '');
  if (!validPin(pin))
    throw new Error('PIN inválido: usa 6 dígitos y evita secuencias obvias (123456, 000000…).');

  const { data: profile, error } = await admin
    .from('profiles')
    .select('id, display_name')
    .eq('phone', phone)
    .maybeSingle();

  if (error) throw error;
  if (!profile) throw new Error('No existe un cliente con ese teléfono');

  const { error: updateError } = await admin.auth.admin.updateUserById(profile.id, {
    password: pin,
  });
  if (updateError) throw updateError;

  console.log(`PIN actualizado para ${profile.display_name} (${phone}).`);
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);
  const admin = requireEnv();

  if (command === 'create') return createClient_(admin, args);
  if (command === 'pin') return rotatePin(admin, args);
  if (command === 'list') {
    const { data, error } = await admin
      .from('profiles')
      .select('display_name, phone, slug, active, plan_code, plan_expires_at')
      .order('display_name');
    if (error) throw error;
    console.table(data);
    return;
  }

  console.log('Comandos: create | pin | list');
  console.log('Ejemplo: npm run client:create -- --name "Don Carnes" --phone 3001234567 --plan presencia');
  console.log('Si omites --pin, se genera uno aleatorio y se imprime al final.');
}

main().catch((err) => {
  console.error(`\nError: ${err.message}\n`);
  process.exit(1);
});
