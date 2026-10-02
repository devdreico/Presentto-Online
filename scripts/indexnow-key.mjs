#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const key = process.env.INDEXNOW_KEY || crypto.randomBytes(16).toString('hex');
const file = path.resolve('public', `${key}.txt`);
fs.writeFileSync(file, key, 'utf8');
console.log(`[indexnow-key] clave creada en public/${key}.txt`);
console.log(`Define INDEXNOW_KEY=${key} en tu entorno de deploy y ejecuta npm run indexnow después de build.`);
