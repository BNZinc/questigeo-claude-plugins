# Reproduce a Problem Diagram

Use this for an actual user-provided problem, not the bundled triangle exercise.
The deliverable is editable drawing objects plus the requested export, not the
reference image left underneath an otherwise empty canvas.

## Read the Source Before Drawing

- Inspect the image at readable resolution, or render the relevant PDF page with
  the host's document tools. A contact sheet identifies a candidate; inspect that
  candidate itself before extracting small labels, subscripts, or dashed edges.
- If asked to choose any problem in a directory, choose a legible representative
  example and name it. Do not substitute the bundled sample or pick a trivial
  example and call that evidence that arbitrary problems work.
- Identify the drawing's bounds separately from question prose, choices, page
  borders, highlights, and handwritten solutions. Only reproduce those extras
  when requested. Keep source files local; do not bundle them into the plugin.
- Build a short inventory: solid strokes, dashed/hidden edges, circles/arcs,
  function branches, intersections, fills, arrowheads, and every label. Record
  the absence of edges too: completing a partial lattice changes the problem.
- Read given coordinates/equations/relationships from the problem. Distinguish
  stated constraints, derived values, and visual estimates. Do not assume a
  near-touching curve is tangent, or solve unrelated parts of the problem.

## Choose a Construction Strategy

**Exact when defined.** Use given/derived equations and shared points where the
editor supports them. For example a line through P tangent to a circle should
meet the center-to-line distance condition, not be placed by eye. A circle can
use three exactly representable points on its circumference and the three-point
circle tool. Check its displayed equation afterward. Ordinary drag-circle
equations and point coordinates are read-only; do not waste attempts typing into
them. If exact native construction is unavailable, disclose the approximation
instead of inventing a command-input API. Numeric placement alone does not
create a persistent tangent constraint.

**Visual when underdetermined.** Preserve topology and proportions, not invented
metric relationships. Choose prominent anchors (vertices, center, extrema, axis
origin), map all of them with a common scale, and reuse the same endpoints.
For grids or repeated shapes, infer shared rows/columns from the visible regular
structure and inspect any missing spans separately. Do not trace every noisy
pixel of a scanned straight line.

**Trace when useful.** Open the image through the local-file option, adjust its
opacity, and construct editable objects over it. Hide the reference to verify
the actual result. This is free manual work, not paid image-to-GGB conversion.
Never silently switch to conversion because manual reproduction is difficult.

## Calibrate, Then Operate the UI

1. Choose an unobstructed canvas rectangle with space for labels. Observe the
   screenshot's pixel dimensions, browser zoom, frame bounds, and drawer. Use
   the same coordinate frame for measurement and clicks; image intrinsic pixels
   can differ from a displayed preview or browser CSS pixels.
2. For an image, fit its diagram bounds with one uniform scale and centered
   margins. Do not independently stretch width and height. For world geometry,
   locate the visible origin and measure X/Y unit lengths separately. The Y
   direction is inverted on screen. Preserve anisotropy only when intentional.
   The optional [landmark helper](../scripts/landmarks.mjs) calculates these
   transforms; see [calibration.md](calibration.md). It does not drive the browser.
3. Build one representative object and inspect its equation/placement. Correct
   calibration before repeating the rest. Screen rounding can affect exact
   coordinates; integer-screen anchor choices can sometimes avoid this.
4. Use native lines/circles/polygons or equation graphs as appropriate. See
   [editor.md](editor.md) and [functions.md](functions.md). Scope ribbon locators
   when the floating palette exposes a control with the same accessible name.
5. Check that each Create/Apply actually commits before changing tools. Inspect
   the canvas and object list at meaningful milestones, not just a draft preview.
6. After pan, zoom, fit, resize, iframe change, or Property Code focus, obtain a
   fresh screenshot and recompute remaining click positions. A coordinates
   table is valid only for the viewport in which it was measured.

## Finish the Illustration

- Place labels after geometry stabilizes. Equation annotations support LaTeX
  such as `C_{1}` and `l_{2}`; they are not plotted functions. Choose font size
  and label gaps relative to the diagram, not question-body font size.
- Compare line thickness, dash pattern, fill opacity, and arrow ends with the
  reference. Large default endpoint dots and automatic equation captions may be
  absent in the original; clean up only verified auxiliary decorations.
- Avoid unexplained extra objects: a 2D projection may need hidden dashed edges,
  whereas a line graph may need open/closed endpoint markers. Do not add axes
  to an uncoordinated geometry diagram or erase axes that are part of a graph.
- Group only after finishing individual styles. Group membership is not proof
  that tangency, perpendicularity, or other dependencies will survive dragging.
  State whether the result is visual, numerically exact, or truly constrained.

## Compare and Correct

Inspect the source diagram and an export of the result at comparable sizes with
the reference hidden and selection handles dismissed. Check:

| Dimension | Observable check |
| --- | --- |
| Coverage | All curves, strokes, regions, and labels accounted for; no invented edges |
| Topology | Same crossings, touching points, gaps, branch count, and inside/outside regions |
| Metric | Given coordinates/equations, slopes, ratios, and endpoints checked numerically |
| Appearance | Aspect ratio, label/subscript readability, thickness, dashes, fills, arrows |
| Deliverable | Nonempty PNG/GGB, editable objects, reopen without missing geometry |

Fix the largest discrepancy first, then compare again. An aggregate image score
does not excuse one missing edge or misplaced tangency. Do not declare all
arbitrary problems supported after a few examples. Report unreadable source
details, approximate portions, unsupported constructions, and untested cases.

For skill development, keep the real input identity and results in repository
test evidence, outside the distributable skill. Test contrasting diagram types
and a fresh unseen input when available; distinguish self-testing from independent
agent evaluation. Packaging tests alone are not drawing-performance tests.
