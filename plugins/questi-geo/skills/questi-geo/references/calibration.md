# Optional Landmark Calculator

Requires Node.js 18+; otherwise use the same arithmetic in the host's calculator.
Run `node scripts/landmarks.mjs plan.json` relative to the installed skill root.
With no file argument, it reads JSON from stdin. It prints a transform and named
screen points, does not read images, and never creates a drawing or controls UI.
Only supply measured/derived values from the current source and canvas.

For a scanned diagram, give its pixel bounds, a free canvas rectangle, and named
source landmarks. The helper centers a uniform fit without distorting aspect.
Both input and output Y increase downward:

```json
{
  "mode": "image",
  "source": {"x": 100, "y": 80, "width": 400, "height": 300},
  "target": {"x": 200, "y": 160, "width": 600, "height": 450},
  "points": {"A": [100, 380], "B": [500, 380], "C": [300, 80]}
}
```

For a known coordinate diagram, give the screen origin and measured pixel units
per mathematical unit. World Y increases upward; screen Y is reversed:

```json
{
  "mode": "world",
  "origin": [600, 400],
  "units": [20, 20],
  "points": {"P": [-8, 0], "A": [0, 4], "B": [0, -1.5]}
}
```

No rounding or viewport clipping is applied. Fractional output may be rounded by
the browser driver; inspect live coordinates when precision matters. Recalculate
after any viewport change. This helper does not verify the inferred geometry,
frame offsets, source readability, or that a projected point is clickable.
