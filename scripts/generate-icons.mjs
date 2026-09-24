import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const root = process.cwd();
const iconSrc = path.join(root, 'public/assets/img/Presentto-Icono-Fondo-Transparente.webp');
const publicDir = path.join(root, 'public');

// PNG icons for manifest / apple-touch
const sizes = [192, 512];
for (const size of sizes) {
  const out = path.join(publicDir, `assets/img/icon-${size}.png`);
  await sharp(iconSrc).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out);
  console.log('wrote', out);
}

// favicon.ico with embedded PNGs (16, 32, 48) — valid for modern browsers
function icoFromPngs(pngEntries) {
  const count = pngEntries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  const datas = [];
  let offset = 6 + count * 16;

  for (const { size, buf } of pngEntries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    datas.push(buf);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...datas]);
}

const icoSizes = [16, 32, 48];
const pngEntries = [];
for (const size of icoSizes) {
  const buf = await sharp(iconSrc)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  pngEntries.push({ size, buf });
}
const icoPath = path.join(publicDir, 'favicon.ico');
fs.writeFileSync(icoPath, icoFromPngs(pngEntries));
console.log('wrote', icoPath, fs.statSync(icoPath).size, 'bytes');
