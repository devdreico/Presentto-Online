#!/usr/bin/env node
/** Verifica que los 8 links de Mercado Pago estén configurados. */
import { readFileSync } from 'node:fs';

const raw = readFileSync(new URL('../src/data/payments.ts', import.meta.url), 'utf8');
const plans = ['presencia', 'crecimiento', 'sistemas', 'empresa'];
const missing = [];

for (const plan of plans) {
  for (const cycle of ['mensual', 'anual']) {
    const re = new RegExp(`${plan}:\\s*\\{[^}]*${cycle}:\\s*'([^']*)'`);
    const match = raw.match(re);
    if (!match || !match[1]) missing.push(`${plan}/${cycle}`);
  }
}

if (missing.length === 0) {
  console.log('Pagos: 8/8 links configurados.');
  process.exit(0);
}

console.log(`Pagos: faltan ${missing.length}/8 links por configurar en src/data/payments.ts`);
for (const item of missing) console.log(`  - ${item}`);
console.log('La UI usará "Solicitar link de pago" hasta que se completen.');
console.log('El modelo es self-serve: sin los 8 links no se puede cobrar desde el sitio.');
process.exit(1);
