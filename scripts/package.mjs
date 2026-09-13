import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginFiles } from './plugin-files.mjs';
import { validate } from './validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const { version } = await validate(root);
const destination = path.join(root, 'dist');
await mkdir(destination, { recursive: true });
const archive = path.join(destination, `questi-geo-claude-${version}.zip`);
await rm(archive, { force: true });
execFileSync('zip', ['-q', archive, ...pluginFiles], { cwd: path.join(root, 'plugins/questi-geo') });
const sha256 = createHash('sha256').update(await readFile(archive)).digest('hex');
await writeFile(`${archive}.sha256`, `${sha256}  ${path.basename(archive)}\n`);
console.log(JSON.stringify({ archive, sha256, files: pluginFiles.length }));
