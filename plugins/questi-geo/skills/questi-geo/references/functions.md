# Functions and Construction Code

## Plot, Not Annotation

Use 작도 > 함수 dropdown > `y = f(x)` or `x = g(y)` to open the function editor
in Properties. Enter a real expression and optional domain/range, then use the
editor's create/apply control. `작도 > 수식` is only a placed formula label.

For example, create `x^2 - 1` with `-2 <= x <= 2` and optionally `-1 <= y <= 3`.
Ranges are world coordinates, not canvas pixels. For `x = g(y)`, y is the input
domain and x is the output range. Blank ranges are unbounded; finite viewport
sampling is not a saved mathematical restriction. Use inequalities for open or
closed boundaries; check how disconnected intervals render.

Wait until Create is enabled and inspect the committed graph after clicking it.
Do not immediately Escape through a still-open draft and assume it was saved.
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
range fields. Change drafts, fix validation errors, then Apply. Python-style
`**` and implicit multiplication such as `ax^2` are normalized mathematical
syntax; arbitrary Python code is not executed.

Creation fields expose names for the expression, input domain (including its
axis), and output range. Select a field by that name, not by input order. In
multi-function mode the definition fields also include a row number.
An automatically linked equation label follows committed expression/parameter
changes and undo/redo. Custom text annotations remain independent. After Apply,
compare the curve, its automatic label, and Property Code; a draft is not a
committed definition. Reopen the downloaded GGB in a separate tab to check all
three again when round-trip fidelity matters.

Changing a point-defined graph into an equation changes its definition and may
ask for confirmation. Explain that loss of point-based control before accepting;
do not silently flatten mathematical relationships to make editing easier.
Parametric curves have a separate editor; do not overwrite x(t), y(t), or the
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
