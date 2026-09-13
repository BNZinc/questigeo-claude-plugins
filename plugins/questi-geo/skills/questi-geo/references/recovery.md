# Inspect And Recover

Use this after an incorrect gesture, a failed tool call, or a result that does
not match the intended geometry. A successful click is not proof of a successful
construction. Keep the original reference and the user's existing work intact.

## Recover One Attempt

1. Inspect the current screenshot and a fresh accessibility snapshot. Identify
   the selected tool, any open dialog, selected objects and what actually changed.
   A timeout can occur after an action changed the page; do not repeat it blindly.
2. If nothing was committed, cancel the mode with Escape. A menu/dialog can consume
   the first Escape. If a wrong object was committed, undo that attempt using the
   visible history controls, or select only that object and delete it. Point-based
   construction may have committed more than one history entry: inspect after
   each undo. Escape alone does not remove those entries.
3. Check that the failed attempt is gone and earlier correct work remains. Read
   the relevant tool's hover hint or editor guide before trying a different
   gesture. Do not stack replacements over failed shapes or use a replacement
   bitmap, SVG, code injection, or off-site renderer to conceal a failure.
4. If the same step fails twice despite reinspection, change the approach using
   another supported editor workflow, or report the specific limitation. An
   authentication, permission or security denial is not a retryable drawing error.

## Common Decision Points

- **Fill a face:** use Style > Fill Region, not parallel thick strokes. Region
  follows cells enclosed by current strokes; Whole polygon follows a native
  polygon. A native circle or polygon can also expose its own fill properties.
  A correctly chosen gray swatch can still look too pale because of opacity.
  Inspect the actual face and opacity, not only the palette. See editor.md.
- **Wrong drag target:** a selected group's bounding box scales or moves the
  group. It is not a vertex editor. Double-click the intended member and verify
  selection before moving a point. Use the point-defined construction tools when
  arbitrary vertex placement is needed.
- **No visible line:** first inspect mode, canvas bounds, selected color/opacity,
  and renderer warnings. Re-activate a one-shot line tool for each stroke. Do not
  create repeated copies until a line happens to appear.
- **Extra dots or edges:** deselect and inspect; use the visible Property Code
  and history to distinguish a real object from a handle or fill seed. Do not
  delete a point just because it is small: it may define another object. Use the
  existing seed-visibility control for a fill seed rather than deleting the fill.
- **Stale target or hidden control:** get a fresh snapshot and use a visible ref.
  Open the relevant tab, menu or sidebar first. Never click hidden-panel coordinates
  through the canvas, and recalibrate after zoom, pan or layout changes.
- **Missing download:** check the actual error and exports list. Image capture is
  not image print. Reopen the print menu after setting the region, then select a
  quality. Do not automatically repeat a save with an uncertain outcome.

## Completion Check

Deselect, leave construction mode, and compare the drawing against the reference:
shape count, connected endpoints, proportions, fill/opacity, line style and every
label. Inspect Property Code for unwanted attempts when the picture is ambiguous.
Distinguish an approximation from a mathematically constrained construction.

Export both formats after the last correction. Check real download results, not
filenames mentioned in a response. File structure checks do not prove visual or
mathematical correctness, nor that a prior export includes subsequent edits.
Report missing outputs or remaining defects explicitly; do not label assisted or
partial work as an unassisted exact reconstruction.
