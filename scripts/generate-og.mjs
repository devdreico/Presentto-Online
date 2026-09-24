import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const W = 1200;
const H = 630;
const root = process.cwd();
const logo = path.join(root, 'public/assets/img/Presentto-Nombre-Fondo-Transparente.webp');
const out = path.join(root, 'public/assets/img/og-presentto.webp');

const meta = await sharp(logo).metadata();
const targetW = 720;
const targetH = Math.round(meta.height * (targetW / meta.width));
const logoBuf = await sharp(logo).resize(targetW, targetH).png().toBuffer();

const svg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="100%" stop-color="#121a33"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="0" y="0" width="12" height="${H}" fill="#ff6b35"/>
  <rect x="72" y="470" width="180" height="6" rx="3" fill="#ff6b35"/>
  <text x="72" y="540" font-family="Montserrat, Arial, sans-serif" font-size="36" font-weight="700" fill="#ffffff">Demo gratis · Web desde $40.000 COP</text>
  <text x="72" y="585" font-family="Montserrat, Arial, sans-serif" font-size="24" font-weight="500" fill="#9aa6c2">SEO local · Sabana Occidental · presentto.online</text>
</svg>`);

await sharp(svg)
  .composite([{ input: logoBuf, top: 160, left: 240 }])
  .webp({ quality: 85 })
  .toFile(out);

console.log('wrote', out, fs.statSync(out).size, 'bytes');
