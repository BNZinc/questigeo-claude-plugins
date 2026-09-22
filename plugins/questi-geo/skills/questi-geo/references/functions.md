# Functions and Construction Code

## Plot, Not Annotation

Use 작도 > 함수 dropdown > `y=f(x)` or `x=g(y)` to open the **함수 그리기 /
Draw a function** dialog. `작도 > 수식` is only a placed formula label, not a graph.

1. The dialog shows a rendered **기본 수식 / Formula template** and **최종 수식 /
   Final equation**. These previews are not text fields. Click the pencil
   button **수식 편집 / Edit formula** to reveal **함수 수식 / Function
   expression**, then enter the right-hand side, such as `a*x^2+b*x+c` or `sin(x)`.
2. Edit the named coefficient fields (`a`, `b`, `c`, etc.) and **x 범위 / x range**
   and **y 범위 / y range**. Inspect the final expression after substitution.
3. Click the enabled **확인 / Confirm** button. This closes the dialog and shows
   a draft curve; it has not created an object yet. Click once on the canvas to
   commit the graph. The click confirms creation; it does **not** translate the
   equation to the clicked point. Formula and ranges determine world coordinates.
4. Verify selection mode returns, the graph is selected, and its definition is
   present in Property Code. Escape before the canvas click cancels the draft.

For example, create `x^2 - 1` with `-2 <= x <= 2` and optionally `-1 <= y <= 3`.
Ranges are world coordinates, not canvas pixels. For `x = g(y)`, y is the input
domain and x is the output range. Blank ranges are unbounded; finite viewport
sampling is not a saved mathematical restriction. Use inequalities for open or
closed boundaries; check how disconnected intervals render.

Invalid expressions, coefficients or ranges disable confirmation. Correct the
named field and inspect the error; do not repeatedly click a disabled button or
treat a preview as a committed/exportable object. If the curve is offscreen,
use View > Fit to screen and inspect its definition before creating a duplicate.
Graphs can automatically create an equation label and finite-domain endpoint
points. When reproducing an illustration that lacks these decorations, inspect
them separately. In the tested editor, deleting an automatically created endpoint
or equation label leaves its function intact. Verify the graph after each deletion;
do not generalize this to defining points of a circle or other dependent geometry.
Changing the function later may regenerate decorations, so clean up after the
mathematical definition is final. Open/closed endpoints are meaningful on many
graphs and must be preserved when present in the source.

The function menu also offers quick/point-defined parabola, right-facing
parabola, hyperbola, cubic/quartic, root, reciprocal, trigonometric, exponential,
logarithmic, and normal distribution graphs. A submenu distinguishes quick
dragging from point-defined variants. Do not substitute a generic curve for an
exact formula unless approximation is acceptable to the user.

## Coefficients and Ranges

Select a supported graph and use the Properties function editor. It exposes an
expression template (for example `a*x^2 + b*x + c`), numeric parameters, and x/y
range fields. Use the **Edit formula** pencil to reveal the text field.
Valid edits apply automatically; there is no separate Apply button for this
editor. An invalid/incomplete draft keeps the last valid graph unchanged until
corrected or reverted. Python-style
`**` and implicit multiplication such as `ax^2` are normalized mathematical
syntax; arbitrary Python code is not executed.

Select fields by their visible accessible name, not by input order. In this
dialog and Properties editor the range names use their coordinate axes (`x
range`, `y range`), even for `x=g(y)`.
An automatically linked equation label follows committed expression/parameter
changes and undo/redo. Custom text annotations remain independent. After editing,
compare the curve, its automatic label, and Property Code; a draft is not a
committed definition. Reopen the downloaded GGB in a separate tab to check all
three again when round-trip fidelity matters.

Changing a point-defined graph into an equation changes its definition and may
ask for confirmation. Explain that loss of point-based control before accepting;
do not silently flatten mathematical relationships to make editing easier.
Quick drag-created graphs can also expose editable formulas, coefficients and
ranges in Properties. Their initial expression reflects the dragged bounds;
replace it with the requested formula when exact values matter. A hyperbola
has its own orientation, a/b, h/k and branch-range editor, not a single y=f(x)
polynomial. Parametric curves have a separate editor; do not overwrite x(t), y(t), or the
parameter interval with an unrelated polynomial form.

## Property Code

Open the right drawer and choose 속성 코드. It shows dependency-ordered,
read-only declarations for the current live drawing, for example:

```text
A = (0, 0)
c1 = Circle(A, 3)
```

Each code block selects/focuses its actual model object. Group accordions retain
group membership, and member commands enter internal group editing. Some helper
commands target their owning object. Code is not an arbitrary GGB command input
console, nor necessarily the verbatim original file. Copying it does not execute
it. Use it to inspect exact live coordinates/definitions and cross-check the
canvas; do not try to type new declarations into read-only blocks.

Grouping preserves selection membership, not every mathematical constraint.
Exports express supported relationships explicitly; unsupported objects can
fall back to geometric/sampled representations. Do not claim that an inferred
circle touching a line exports as a true tangent construction.
