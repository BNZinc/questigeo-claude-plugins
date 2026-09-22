# Image-Only Request Examples

These are ordinary user requests with a problem image attached, not prompts
that supply a solution or drawing recipe.

| Attached source | User request | Expected scope |
| --- | --- | --- |
| A full problem image containing a diagram | 위 그림을 QuestiGeo로 그려줘. | Reproduce that diagram using editable objects, then deliver matching PNG and GGB downloads. |
| The same kind of problem image | 위 그림의 GGB를 만들어줘. | Reproduce the pictured construction and deliver an editable GGB; inspect the resulting drawing. Respect the requested output scope. |
| A problem image with curves, labels or shaded regions | Recreate the diagram in this image in Questi Geo. | Preserve the actual curves, incidence, labels, fills and proportions; do not substitute a demonstration triangle. |

Read the image already attached to the conversation. A hosted browser that
blocks local file import can still construct from what the model sees in the
attachment; uploading the source into the editor is not required. Do not demand
a public image URL or invoke paid conversion merely to understand the source.
If the attachment itself is unreadable, ask for a readable copy.

Use the problem statement to interpret labels or stated relationships. Drawing
the diagram is not a request to solve the exercise or reproduce its answer choices.
For a printed solid, reproduce its shown 2D projection without claiming native
3D constraints. If several diagrams make the target ambiguous, ask which one.

Follow [reproduce.md](reproduce.md) to construct and compare. Guidance and normal
export behavior belong in the skill, not in a long user prompt. No unsolicited
recording is needed for these examples, and a video alone is not the result.
