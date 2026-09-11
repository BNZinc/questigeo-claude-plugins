import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function number(value, name, positive = false) {
  if (!Number.isFinite(value) || (positive && value <= 0)) {
    throw new Error(`${name} must be ${positive ? 'positive and ' : ''}finite`);
  }
  return value;
}

function point(value, name) {
  if (!Array.isArray(value) || value.length !== 2) throw new Error(`${name} must be [x,y]`);
  return value.map((v, i) => number(v, `${name}[${i}]`));
}

function rect(value, name) {
  if (!value || typeof value !== 'object') throw new Error(`${name} is required`);
  return {
    x: number(value.x, `${name}.x`), y: number(value.y, `${name}.y`),
    width: number(value.width, `${name}.width`, true),
    height: number(value.height, `${name}.height`, true),
  };
}

export function projectLandmarks(input) {
  if (!input || typeof input !== 'object') throw new Error('Expected a JSON object');
  let sx, sy, tx, ty;
  if (input.mode === 'image') {
    const source = rect(input.source, 'source');
    const target = rect(input.target, 'target');
    sx = sy = Math.min(target.width / source.width, target.height / source.height);
    tx = target.x + (target.width - source.width * sx) / 2 - source.x * sx;
    ty = target.y + (target.height - source.height * sy) / 2 - source.y * sy;
  } else if (input.mode === 'world') {
    [tx, ty] = point(input.origin, 'origin');
    sx = number(input.units?.[0], 'units[0]', true);
    sy = -number(input.units?.[1], 'units[1]', true);
  } else {
    throw new Error('mode must be image or world');
  }
  [sx, sy, tx, ty].forEach(v => number(v, 'transform'));
  if (!input.points || Array.isArray(input.points) || typeof input.points !== 'object' || !Object.keys(input.points).length) {
    throw new Error('points must be a nonempty object of named [x,y] pairs');
  }
  const points = Object.fromEntries(Object.entries(input.points).map(([name, value]) => {
    const [x, y] = point(value, name);
    return [name, [number(sx * x + tx, `${name}.screenX`), number(sy * y + ty, `${name}.screenY`)]];
  }));
  return { transform: { sx, sy, tx, ty }, points };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    // Read only the caller's plan. No image upload, browser actions, or file writes.
    const input = process.argv[2]
      ? await readFile(process.argv[2], 'utf8')
      : await new Promise((res, rej) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', chunk => { data += chunk; });
        process.stdin.on('end', () => res(data));
        process.stdin.on('error', rej);
      });
    console.log(JSON.stringify(projectLandmarks(JSON.parse(input)), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
