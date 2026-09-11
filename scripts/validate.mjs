import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { realpathSync } from 'node:fs';
import { lstat, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginFiles, repository } from './plugin-files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

async function collect(directory, relative = '', files = {}) {
  for (const name of await readdir(path.join(directory, relative))) {
    const key = relative ? `${relative}/${name}` : name;
    const absolute = path.join(directory, key);
    const stat = await lstat(absolute);
    assert(!stat.isSymbolicLink(), `Symlink is not allowed: ${key}`);
    if (stat.isDirectory()) await collect(directory, key, files);
    else {
      assert(stat.isFile(), `Not a regular file: ${key}`);
      files[key] = await readFile(absolute);
    }
  }
  return files;
}

export async function validate(directory = root) {
  const files = await collect(path.join(directory, 'plugins/questi-geo'));
  assert.deepEqual(Object.keys(files).sort(), [...pluginFiles].sort(), 'Unexpected or missing distributable file');
  const manifest = JSON.parse(files['.claude-plugin/plugin.json']);
  const marketplace = JSON.parse(await readFile(path.join(directory, '.claude-plugin/marketplace.json')));
  const release = JSON.parse(await readFile(path.join(directory, 'source-release.json')));
  const pkg = JSON.parse(await readFile(path.join(directory, 'package.json')));
  assert.equal(manifest.name, 'questi-geo');
  assert.equal(manifest.author.name, 'BnZ');
  assert.equal(manifest.repository, repository);
  assert.equal(manifest.skills, './skills/');
  assert.equal(manifest.version, pkg.version);
  assert.equal(manifest.version, release.version);
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.match(release.sourceCommit, /^[0-9a-f]{40}$/);
  assert.equal(marketplace.name, 'questigeo-claude-plugins');
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].name, manifest.name);
  assert.equal(marketplace.plugins[0].source, './plugins/questi-geo');
  assert.deepEqual(Object.keys(release.sha256).sort(), [...pluginFiles].sort());
  for (const [name, bytes] of Object.entries(files)) {
    assert(bytes.length > 0, `Empty file: ${name}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), release.sha256[name], `Unreviewed file change: ${name}`);
    if (name.endsWith('.png')) continue;
    const text = bytes.toString('utf8');
    assert(!/\/Users\/|\/home\/|localhost:\d|sk-[A-Za-z0-9_-]{20,}|-----BEGIN .*PRIVATE KEY-----|\[TODO:/.test(text), `Private data or placeholder: ${name}`);
    if (!name.endsWith('.md')) continue;
    for (const match of text.matchAll(/\]\(([^\s)]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(match[1])) continue;
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(name), match[1].split('#')[0]));
      assert(files[target], `Missing linked file: ${name} -> ${target}`);
    }
  }
  return { version: manifest.version, count: Object.keys(files).length };
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validate().then(result => console.log(`Validated ${result.count} plugin files at ${result.version}`))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}
