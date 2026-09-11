import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { projectLandmarks } from '../plugins/questi-geo/skills/questi-geo/scripts/landmarks.mjs';

const source = { x: 100, y: 80, width: 400, height: 300 };
const target = { x: 200, y: 160, width: 600, height: 600 };
const plan = { mode: 'image', source, target, points: { A: [100, 80], B: [500, 380] } };

test('image calibration centers a uniform fit without stretching', () => {
  const result = projectLandmarks(plan);
  assert.deepEqual(result.points, { A: [200, 235], B: [800, 685] });
  assert.equal(result.transform.sx, result.transform.sy);
});

test('portrait targets letterbox and retain relative landmarks', () => {
  const result = projectLandmarks({ ...plan, target: { x: 0, y: 0, width: 200, height: 80 } });
  const [a, b] = Object.values(result.points);
  assert(Math.abs((b[0] - a[0]) / (b[1] - a[1]) - 4 / 3) < 1e-12);
  assert(Math.abs(a[0] - (200 - b[0])) < 1e-12);
});

test('world coordinates reverse Y and preserve independent units', () => {
  const result = projectLandmarks({ mode: 'world', origin: [600, 400], units: [20, 30], points: { P: [-8, 0], A: [0, 4] } });
  assert.deepEqual(result.points, { P: [440, 400], A: [600, 280] });
});

test('mapping does not silently round or clip offscreen landmarks', () => {
  const result = projectLandmarks({ mode: 'world', origin: [0, 0], units: [1, 1], points: { P: [-1.25, 2.75] } });
  assert.deepEqual(result.points.P, [-1.25, -2.75]);
});

test('rejects invalid or degenerate calibration inputs', () => {
  for (const input of [null, {}, { ...plan, source: { ...source, width: 0 } }, { ...plan, target: { ...target, height: -1 } }, { ...plan, points: {} }, { ...plan, points: { A: ['1', 2] } }, { ...plan, points: { A: [Infinity, 2] } }, { mode: 'world', origin: [0, 0], units: [0, 1], points: { A: [0, 0] } }]) {
    assert.throws(() => projectLandmarks(input));
  }
});

test('CLI accepts caller JSON and reports invalid input', () => {
  const script = fileURLToPath(new URL('../plugins/questi-geo/skills/questi-geo/scripts/landmarks.mjs', import.meta.url));
  const ok = spawnSync(process.execPath, [script], { input: JSON.stringify(plan), encoding: 'utf8' });
  assert.equal(ok.status, 0);
  assert.deepEqual(JSON.parse(ok.stdout), projectLandmarks(plan));
  const bad = spawnSync(process.execPath, [script], { input: '{', encoding: 'utf8' });
  assert.equal(bad.status, 1);
  assert.equal(bad.stdout, '');
});
