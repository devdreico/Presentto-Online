import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const chunk = resolve(dist, 'sitemap-0.xml');
const index = resolve(dist, 'sitemap-index.xml');
const main = resolve(dist, 'sitemap.xml');

if (!existsSync(chunk) || !existsSync(index)) {
  console.error('[sitemap] missing dist/sitemap-0.xml or sitemap-index.xml');
  process.exit(1);
}

// Main sitemap = full urlset (all canonical URLs), not the index.
copyFileSync(chunk, main);

const xml = readFileSync(main, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const withLastmod = [...xml.matchAll(/<lastmod>/g)].length;

console.log(
  `[sitemap] main dist/sitemap.xml <- sitemap-0.xml (${urls.length} URLs, ${withLastmod} with lastmod)`
);
console.log(`[sitemap] index kept: dist/sitemap-index.xml`);
