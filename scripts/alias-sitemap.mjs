import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const index = resolve(dist, 'sitemap-index.xml');
const alias = resolve(dist, 'sitemap.xml');

if (!existsSync(index)) {
  console.error('[sitemap] missing dist/sitemap-index.xml');
  process.exit(1);
}

copyFileSync(index, alias);
console.log('[sitemap] alias dist/sitemap.xml <- sitemap-index.xml');
