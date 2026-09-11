# Manual Reproduction Exercise

Reference: [triangle-reference.svg](../assets/triangle-reference.svg).
It is an original test drawing, not a screenshot of a customer's document.

Prompt: "Recreate this triangle with a dashed altitude and labels in Questi Geo,
without image-to-GGB conversion. Save a PNG capture and an editable GGB locally,
then give me both file paths."

Expected structure: triangle ABC, horizontal AB, C above and closer to A than B,
perpendicular dashed altitude CD to AB, D between A and B; four labels.
Pixel-perfect matching is not required; exact metric constraints are not asserted.

1. Inspect a blank editor. Hide axes/grid for a textbook-style diagram if needed.
2. Use three quick-line drags to form AB, BC, CA. Reuse the same visible endpoint
   locations. The visual exercise does not claim independent strokes are a
   constrained triangle. For a relationship-preserving variant use the
   three-point triangle tool and inspect dependencies instead.
3. Draw CD with the quick-line tool. Escape to selection, double-click its
   ungrouped stroke once away from intersections, and confirm visible dashes.
   If the triangle or altitude is wrong, undo/edit that attempt before retrying.
   Do not leave earlier triangles or solid duplicates underneath the final one.
4. Add a text object near each vertex, double-click the default `Text` label,
   replace it with A/B/C/D and confirm. Verify selection mode before choosing
   the text tool again.
5. Inspect the finished canvas and Property Code. Optionally group the strokes
   using multiple selection and confirm that double-click selects one member
   rather than changing its dash style. Check for exactly the intended triangle
   outline and altitude, not a pile of failed attempts; construction helpers are
   legitimate and must not be removed just to reach a fixed object count.
6. Follow [local-file delivery](files-and-access.md#export-and-local-delivery):
   export a PNG and GGB, verify both saved files, inspect the PNG, and give both
   absolute paths. When supported, reopen the GGB in a separate blank document
   and compare all strokes/labels/dashes to the saved PNG. A screenshot, recording,
   or independently redrawn PNG fails this exercise. In ChatGPT Work, attach both
   download links plus a ZIP of their unchanged bytes.

Record which actions were performed, the URL/build used, screenshot, artifact
path, and which steps were not tested. Do not report this as an independent
Claude run unless Claude actually performed it.
