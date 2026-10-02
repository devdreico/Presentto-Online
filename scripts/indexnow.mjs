#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const host = process.env.INDEXNOW_HOST || 'www.presentto.online';
const key = process.env.INDEXNOW_KEY;
const base = `https://${host}`;

if (!key) {
  console.log('[indexnow] INDEXNOW_KEY no definido; omitiendo envío.');
  process.exit(0);
}

const sitemapPath = path.resolve('dist/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('[indexnow] falta dist/sitemap.xml; ejecuta npm run build primero.');
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter(Boolean);
if (urls.length === 0) {
  console.error('[indexnow] no se encontraron URLs en sitemap.xml');
  process.exit(1);
}

const payload = {
  host,
  key,
  keyLocation: `${base}/${key}.txt`,
  urlList: urls,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.error(`[indexnow] error HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}

console.log(`[indexnow] ${urls.length} URLs enviadas correctamente.`);
