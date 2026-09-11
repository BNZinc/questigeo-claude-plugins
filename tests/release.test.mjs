import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { prepareSync } from '../scripts/sync-from-source.mjs';
import { validate } from '../scripts/validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const git = (cwd, args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

async function fixture(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'questigeo-release-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const name of ['plugins', '.claude-plugin', 'source-release.json', 'package.json', 'scripts']) {
    await cp(path.join(root, name), path.join(directory, name), { recursive: true });
  }
  return directory;
}

async function rehash(directory, name) {
  const filename = path.join(directory, 'source-release.json');
  const release = JSON.parse(await readFile(filename));
  const bytes = await readFile(path.join(directory, 'plugins/questi-geo', name));
  release.sha256[name] = createHash('sha256').update(bytes).digest('hex');
  await writeFile(filename, JSON.stringify(release));
}

test('release is complete, self-contained, and matches its provenance hashes', async () => {
  assert.equal((await validate()).count, 11);
});

test('unreviewed file content and accidental private files are rejected', async t => {
  const directory = await fixture(t);
  const file = path.join(directory, 'plugins/questi-geo/skills/questi-geo/SKILL.md');
  await writeFile(file, `${await readFile(file, 'utf8')}\nUnexpected change\n`);
  await assert.rejects(validate(directory), /Unreviewed file change/);
  await cp(path.join(root, 'plugins/questi-geo/skills/questi-geo/SKILL.md'), file);
  await writeFile(path.join(directory, 'plugins/questi-geo/.env'), 'PRIVATE=fixture');
  await assert.rejects(validate(directory), /Unexpected or missing/);
});

test('broken links and private paths fail even if hashes are recomputed', async t => {
  const directory = await fixture(t);
  const name = 'skills/questi-geo/references/editor.md';
  const file = path.join(directory, 'plugins/questi-geo', name);
  await writeFile(file, '[Missing](missing.md)');
  await rehash(directory, name);
  await assert.rejects(validate(directory), /Missing linked file/);
  await writeFile(file, 'Never distribute /Users/example/private.ggb');
  await rehash(directory, name);
  await assert.rejects(validate(directory), /Private data or placeholder/);
});

test('release does not accept version drift or symbolic links', async t => {
  const directory = await fixture(t);
  const file = path.join(directory, 'package.json');
  const pkg = JSON.parse(await readFile(file));
  pkg.version = '9.0.0';
  await writeFile(file, JSON.stringify(pkg));
  await assert.rejects(validate(directory));
  await cp(path.join(root, 'package.json'), file);
  await symlink(file, path.join(directory, 'plugins/questi-geo/link.json'));
  await assert.rejects(validate(directory), /Symlink is not allowed/);
});

test('sync copies only committed allowlisted paths and has a repeatable check mode', async t => {
  const source = await fixture(t);
  git(source, ['init', '--quiet']);
  git(source, ['add', 'plugins']);
  git(source, ['-c', 'user.name=Test Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'fixture']);
  const first = await prepareSync(source);
  await writeFile(path.join(source, 'plugins/questi-geo/skills/questi-geo/SKILL.md'), 'uncommitted change');
  await writeFile(path.join(source, 'plugins/questi-geo/private.ggb'), 'private fixture');
  assert.deepEqual(await prepareSync(source), first);
  const destination = await fixture(t);
  const cli = path.join(destination, 'scripts/sync-from-source.mjs');
  const run = (...args) => spawnSync(process.execPath, [cli, source, ...args], { encoding: 'utf8', timeout: 10000 });
  assert.equal(run().status, 0);
  assert.equal(run('--check').status, 0);
  assert(!(await readdir(path.join(destination, 'plugins/questi-geo'))).includes('private.ggb'));
  await writeFile(path.join(destination, 'plugins/questi-geo/skills/questi-geo/SKILL.md'), 'changed output');
  const changed = run('--check');
  assert.equal(changed.status, 1);
  assert.match(changed.stderr, /Source differs/);
});

test('sync refuses a linked output directory instead of writing outside its checkout', async t => {
  const source = await fixture(t);
  git(source, ['init', '--quiet']);
  git(source, ['add', 'plugins']);
  git(source, ['-c', 'user.name=Test Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'fixture']);
  const destination = await fixture(t);
  await rm(path.join(destination, 'plugins'), { recursive: true });
  const outside = path.join(destination, 'outside');
  await mkdir(outside);
  await symlink(outside, path.join(destination, 'plugins'));
  const result = spawnSync(process.execPath, [path.join(destination, 'scripts/sync-from-source.mjs'), source], { encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Refusing symlink/);
  assert.deepEqual(await readdir(outside), []);
});
