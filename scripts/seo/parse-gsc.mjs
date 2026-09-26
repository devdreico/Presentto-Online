#!/usr/bin/env node
// Parsea el export de Google Search Console (CSV/ZIP) a src/data/seo/gsc.json.
// Uso:
//   node scripts/seo/parse-gsc.mjs                  (busca el .zip más reciente en la raíz)
//   node scripts/seo/parse-gsc.mjs --zip ruta.zip
//   node scripts/seo/parse-gsc.mjs --dir carpeta/   (CSVs ya extraídos)
// El JSON resultante lo consumen el sub-agente seo-keyword-miner (quick wins de CTR)
// y docs/seo/kpis.md (línea base y evolución).

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const args = process.argv.slice(2);
const argValue = (flag) => {
  const i = args.indexOf(flag);
  return i > -1 ? args[i + 1] : null;
};

const root = process.cwd();
const outPath = path.join(root, 'src/data/seo/gsc.json');

// ---------- CSV ----------
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') field += c;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v.trim() !== ''));
}

const norm = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const pct = (v) => {
  if (!v) return null;
  const n = parseFloat(String(v).replace('%', '').replace(',', '.'));
  return Number.isFinite(n) ? (String(v).includes('%') ? n : n) : null;
};
const num = (v) => {
  if (v === undefined || v === null || v === '') return null;
  const n = parseFloat(String(v).replace(/\s/g, '').replace(/,/g, '.'));
  return Number.isFinite(n) ? n : null;
};

function rowsToObjects(rows) {
  const header = rows[0].map((h) => norm(h).trim());
  return rows.slice(1).map((r) => {
    const o = {};
    header.forEach((h, i) => (o[h] = (r[i] ?? '').trim()));
    return o;
  });
}

function classify(rows) {
  const header = rows[0].map((h) => norm(h)).join('|');
  if (header.includes('fecha')) return 'daily';
  if (header.includes('consulta')) return 'queries';
  if (header.includes('pagina')) return 'pages';
  if (header.includes('pais')) return 'countries';
  if (header.includes('dispositivo')) return 'devices';
  return 'other';
}

function transform(kind, objs) {
  switch (kind) {
    case 'daily':
      return objs.map((o) => {
        const keys = Object.keys(o);
        const d = o[keys[0]];
        return {
          date: d,
          clicks: num(o.clics) ?? 0,
          impressions: num(o.impresiones) ?? 0,
          ctr: pct(o.ctr),
          position: num(o.posicion),
        };
      });
    case 'queries':
      return objs.map((o) => ({
        query: Object.values(o)[0],
        clicks: num(o.clics) ?? 0,
        impressions: num(o.impresiones) ?? 0,
        ctr: pct(o.ctr),
        position: num(o.posicion),
      }));
    case 'pages':
      return objs.map((o) => ({
        page: Object.values(o)[0],
        clicks: num(o.clics) ?? 0,
        impressions: num(o.impresiones) ?? 0,
        ctr: pct(o.ctr),
        position: num(o.posicion),
      }));
    case 'countries':
      return objs.map((o) => ({
        country: Object.values(o)[0],
        clicks: num(o.clics) ?? 0,
        impressions: num(o.impresiones) ?? 0,
        ctr: pct(o.ctr),
        position: num(o.posicion),
      }));
    case 'devices':
      return objs.map((o) => ({
        device: Object.values(o)[0],
        clicks: num(o.clics) ?? 0,
        impressions: num(o.impresiones) ?? 0,
        ctr: pct(o.ctr),
        position: num(o.posicion),
      }));
    default:
      return [];
  }
}

// ---------- ZIP mínimo (sin dependencias) ----------
function readZip(zipPath) {
  const buf = fs.readFileSync(zipPath);
  // End of Central Directory (0x06054b50) — se busca desde el final
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('EOCD no encontrado: no es un ZIP válido');
  const count = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  const entries = [];
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) break;
    const method = buf.readUInt16LE(offset + 10);
    const compSize = buf.readUInt32LE(offset + 20);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const nameBytes = buf.subarray(offset + 46, offset + 46 + nameLen);
    const name = nameBytes.toString('utf8');
    offset += 46 + nameLen + extraLen + commentLen;

    if (name.endsWith('/')) continue;
    const lNameLen = buf.readUInt16LE(localOffset + 26);
    const lExtraLen = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + lNameLen + lExtraLen;
    const data = buf.subarray(dataStart, dataStart + compSize);
    let content;
    if (method === 0) content = data;
    else if (method === 8) content = zlib.inflateRawSync(data);
    else continue;
    entries.push({ name, content: content.toString('utf8') });
  }
  return entries;
}

// ---------- orquestación ----------
function findZip() {
  const forced = argValue('--zip');
  if (forced) return path.resolve(root, forced);
  const files = fs
    .readdirSync(root)
    .filter((f) => f.toLowerCase().endsWith('.zip') && f.includes('Search'))
    .map((f) => ({ f, m: fs.statSync(path.join(root, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  return files.length ? path.join(root, files[0].f) : null;
}

const collected = { daily: [], queries: [], pages: [], countries: [], devices: [] };
let source = '';

const dir = argValue('--dir');
if (dir) {
  const abs = path.resolve(root, dir);
  source = path.relative(root, abs) || abs;
  for (const f of fs.readdirSync(abs).filter((f) => f.toLowerCase().endsWith('.csv'))) {
    const rows = parseCsv(fs.readFileSync(path.join(abs, f), 'utf8'));
    if (rows.length < 2) continue;
    const kind = classify(rows);
    collected[kind] = transform(kind, rowsToObjects(rows));
  }
} else {
  const zip = findZip();
  if (!zip) {
    console.error(
      '[seo:gsc] No encontré export de Search Console. Usa --zip <archivo.zip> o --dir <carpeta> con los CSV.'
    );
    process.exit(1);
  }
  source = path.relative(root, zip) || zip;
  for (const e of readZip(zip)) {
    if (!e.name.toLowerCase().endsWith('.csv')) continue;
    const rows = parseCsv(e.content);
    if (rows.length < 2) continue;
    const kind = classify(rows);
    collected[kind] = transform(kind, rowsToObjects(rows));
  }
}

const sum = (arr, k) => arr.reduce((a, b) => a + (b[k] ?? 0), 0);
const avg = (arr, k, w) => {
  const vals = arr.filter((r) => r[k] != null && r[w]);
  if (!vals.length) return null;
  return Math.round((vals.reduce((a, b) => a + b[k] * b[w], 0) / vals.reduce((a, b) => a + b[w], 0)) * 10) / 10;
};

const payload = {
  generatedAt: new Date().toISOString(),
  source,
  totals: {
    clicks: sum(collected.daily, 'clicks'),
    impressions: sum(collected.daily, 'impressions'),
    ctr: null,
    avgPosition: avg(collected.daily, 'position', 'impressions'),
  },
  ...collected,
  // Quick wins: consultas con impresiones pero CTR bajo para su posición
  opportunities: collected.queries
    .filter((q) => q.impressions >= 5 && (q.ctr ?? 0) < 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25),
};

if (payload.totals.impressions) {
  payload.totals.ctr =
    Math.round((payload.totals.clicks / payload.totals.impressions) * 10000) / 100;
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
console.log(
  `[seo:gsc] ${path.relative(root, outPath)} ← ${source}: ` +
    `${payload.queries.length} consultas · ${payload.pages.length} páginas · ` +
    `${payload.totals.impressions} impresiones · ${payload.totals.ctr ?? '-'}% CTR`
);
