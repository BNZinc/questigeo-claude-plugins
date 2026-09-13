import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginFiles, repository } from './plugin-files.mjs';
import { validateMcp } from './mcp-config.mjs';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));

export async function prepareSync(source, ref = 'HEAD') {
  const revision = execFileSync('git', ['rev-parse', '--verify', `${ref}^{commit}`], { cwd: source, encoding: 'utf8' }).trim();
  const files = {};
  // Read only committed, explicitly approved plugin paths, never a directory copy.
  for (const name of pluginFiles) {
    const relative = `plugins/questi-geo/${name}`;
    const entry = execFileSync('git', ['ls-tree', revision, '--', relative], { cwd: source, encoding: 'utf8' });
    if (!/^100644 blob /.test(entry)) throw new Error(`Missing or unsafe source file: ${name}`);
    files[name] = execFileSync('git', ['show', `${revision}:${relative}`], { cwd: source, maxBuffer: 1024 * 1024 });
  }
  const manifest = JSON.parse(files['.claude-plugin/plugin.json'].toString('utf8'));
  if (manifest.name !== 'questi-geo' || !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    throw new Error('Unexpected source plugin identity or version');
  }
  manifest.repository = repository;
  validateMcp(manifest, files);
  files['.claude-plugin/plugin.json'] = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
  return {
    files,
    record: {
      version: manifest.version,
      sourceCommit: revision,
      sha256: Object.fromEntries(Object.entries(files).map(([name, data]) => [name, createHash('sha256').update(data).digest('hex')])),
    },
  };
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const positional = args.filter(arg => arg !== '--check');
  if (positional.length < 1 || positional.length > 2) {
    throw new Error('Usage: npm run sync -- <editor-checkout> [commit-or-ref] [--check]');
  }
  const { files, record } = await prepareSync(path.resolve(positional[0]), positional[1]);
  const outputs = Object.entries(files).map(([name, data]) => [`plugins/questi-geo/${name}`, data]);
  outputs.push(['source-release.json', Buffer.from(`${JSON.stringify(record, null, 2)}\n`)]);
  for (const [name, data] of outputs) {
    const destination = path.join(root, name);
    for (let parent = destination; parent !== root; parent = path.dirname(parent)) {
      const stat = await lstat(parent).catch(error => { if (error.code !== 'ENOENT') throw error; });
      if (stat?.isSymbolicLink()) throw new Error(`Refusing symlink destination: ${name}`);
    }
    if (check) {
      if (!(await readFile(destination)).equals(data)) throw new Error(`Source differs: ${name}`);
    } else {
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, data);
    }
  }
  console.log(`${check ? 'Verified' : 'Synced'} ${Object.keys(files).length} approved plugin files at ${record.version}`);
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
