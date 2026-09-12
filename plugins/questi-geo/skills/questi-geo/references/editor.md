# Editor Operations

Labels below are Korean / English cues. Read the actual interface: translations,
custom shortcuts, and responsive layouts can change the exact accessible name.
Use hover help and the open menu to resolve a tool, not an assumed icon location.

## Navigation Map

| Area | Purpose |
| --- | --- |
| Header: 열기 / Open | Personal/public library, GGB or tracing image, paid image conversion |
| Header: 파일 저장 / Save | GGB file export; guests can download directly, signed-in users may see a save dialog |
| Header: 캡쳐 / Capture | Copy current drawing image; not the PNG file export command |
| 작도 / Draw | 그리기 (point/line/point-defined constructions), 도형 (shapes), 함수 (functions), 텍스트, 수식 |
| 편집 / Edit | Select/copy, whole or partial line/curve movement, bend, split, insert point, erase |
| 서식 / Style | Fill regions, stroke color, angle and equal-length marks, fill seed visibility |
| 보기 / View | Grid and coordinate axes; viewport fit/zoom controls may be alongside the ribbon |
| 파일 / File | Image print/export and drawing reset |
| Right drawer | 속성 / Properties and 속성 코드 / Property Code |
| Floating palette | Select, text, equation, drawing, shapes, functions; category menus open to the side |

The right drawer is opened with `속성 패널 열기`. Its content depends on the
selection/tool. Settings near login is application settings, not object properties.

## Drawing Gestures

- **Line:** 작도 > 그리기 dropdown > 선 그리기. Drag from start to end, then
  release. Two disconnected clicks are not the quick-line gesture.
- **Point:** 그리기 > 점. Click once. It returns to selection. Select the point
  and read its coordinates in Properties relative to the axes. This is a
  read-only output, not an editable numeric field; move it on the canvas.
  A point constrained to an existing object may not move freely in both axes.
- **Triangle:** 도형 > 삼각형 uses a bounding drag for a quick shape. For specific
  vertices use 그리기 > 세 점 삼각형 and click three vertices in order.
- **Point-defined constructions:** the drawing menu also has a circle through
  three points, triangle with circumcircle/incircle, four-point quadrilateral,
  upper/lower semicircle from diameter endpoints, and a three-point arc. An arc
  takes start, through, end; a semicircle takes the two diameter endpoints.
- **Quick shapes:** triangle, rectangle, circle, arc, sector, ellipse, and 2D
  cube/cone/cylinder/sphere projections use a bounding drag. Check the resulting
  aspect/handles; use properties to refine rather than assuming drag pixels are
  exact mathematical units.
- **Text:** 텍스트 넣기, click the position. This creates a default `Text` object
  and returns to selection. Double-click that object to open the text editor,
  replace the contents, and confirm. Alternatively edit its text in Properties.
- **Equation label:** 수식 넣기 opens the math input dialog first. Enter the
  formula, confirm, then click its position. This creates an annotation, not a
  function graph. See functions.md for plotted equations.
  Match typography deliberately: ordinary Text defaults to sans-serif. When
  the reference uses mathematical serif labels, use the existing equation or
  LaTeX/serif controls rather than accepting the default text style. Inspect the
  rendered letters and their size relative to the geometry before exporting.

## Selection, Style, and Relationships

- Escape or 선택 enters selection. Click an object; drag it to move. Drag empty
  canvas to marquee-select. Shift-click toggles objects in a multiple selection.
- Multiple selection is not necessarily a saved group. Right-click the selection
  and choose 그룹화 to persist it. Drag a selected member/selection overlay to move
  together. Do not independently drag every object sharing the same anchor.
- Double-click a **group member** to edit just that member without ungrouping.
  Clicking outside or Escape leaves internal editing. Shared mathematical
  dependencies still update; internal editing does not detach constraints.
- Double-click an ordinary **ungrouped stroke** toggles solid/dashed style.
  It is NOT a universal shortcut: group members enter editing, text opens its
  editor, joint points/parameterized constructions have their own behavior.
  For a group member, enter internal editing and use the Properties line style
  controls, then inspect the dash pattern visually.
- Start/end arrow controls are independent toggles. Both can be enabled.
- Change the selected object's thickness/color/text size in Properties. Global
  style controls affect the whole drawing; do not use them for one object.
  A numeric value such as `2.5px` is clickable: click it, enter the value, then
  Enter to commit. Global line/text sliders are relative multipliers, so they
  do not make differently styled objects have the same absolute thickness/size.
- For fills and angle/equality marks, use the workflows below.
- Undo/redo are available in the header. Prefer these over deleting unrelated
  objects when correcting a mistaken gesture. Inspect after undo: point-defined
  tools may commit points before the composite. Escape leaves committed objects
  in place; it is not a reset. Do not keep a failed triangle and draw another on
  top of it. Double-clicking a solid line twice toggles it back to solid; confirm
  the selected target and visible dash pattern instead of repeating blindly.

## Fills and Interior Strokes

In 서식 > 영역 채우기, choose the target in Properties before clicking:

- **영역 / Region** is a flood fill bounded by the current strokes. Adding a
  crossing stroke can split it, leaving only the cell containing its seed
  colored. Finish the boundaries first and fill last, or Shift-click the other
  cells to keep them in the same fill. Shift-click inside a grouped fill can
  remove a cell from that group; inspect the result rather than clicking twice.
- **도형 전체 / Whole polygon** colors a completed native polygon or an imported
  polygon fill. Interior strokes do not cut this surface, and it follows its
  defining polygon when moved. It does not infer a polygon from unrelated lines;
  use Region for a face assembled from separate strokes or for curved boundaries.
  This fill is drawn beneath strokes. Choose a swatch and click the polygon to
  recolor it; the no-color swatch clears the fill without removing its outline.

For Region, **선까지 덮기 / Cover strokes** is a separate choice. On paints over
interior strokes and starts an opaque fill; off keeps lines visible. Select an
existing region to edit its opacity. Choose opacity deliberately for layered
planes; pale colors are not a substitute for inspecting the alpha setting.
The palette changes the next paint action, not every existing face. Swatches
expose their hexadecimal color and pressed state; scope repeated colors to the
visible palette/group. A transparent fill can still be selectable.

## Angle Marks and Partial Dashes

For an angle marker, activate 서식 > 각 표시 and select the two supporting lines,
then choose the intended angular region if prompted. Properties offers 일반각 /
직각 (ordinary/right angle), size, and styling. A square right-angle mark in a
projected illustration is a visual annotation, not proof the projected lines
are perpendicular. Use a separate equation label for a specified angle such as
`30^\\circ`; do not mistake a computed screen-plane angle for the problem's value.

For equal-length marks select the required two lines and inspect the mark style.
For only part of a stroke to be dashed, use 편집 > 선 자르기 at the boundary,
return to selection, and verify that the intended subsegment is independently
selectable before changing its line style. **점 넣기** and **선 자르기** are not
interchangeable. Do not rely on double-clicking a polygon edge/group member to
style a single piece: it can enter group editing or affect the original edge.
If the object does not split as expected, undo and use separate native segments
when that preserves the intended mathematical relationships.

Some hosts expose a pressed icon as a button, others as a checkbox/toggle in
their accessibility tree. Use the current tree and selected state, not a fixed
role assumption. After Create, Apply, or palette changes, inspect the canvas
before repeating the action.

## Viewport and Coordinates

- Space + drag pans. Ctrl/Cmd + wheel zooms the viewport around the cursor;
  explicit zoom controls are often safer across hosts and embedded windows.
- **Plain wheel is not viewport zoom:** over an object it can change its size,
  and over a group it can scale the group. Do not use it to navigate blindly.
- Grid follows the visible area unless its bounds were explicitly fixed.
  Coordinate axes have their own ranges, origin, tick interval, and X/Y unit
  pixel scales. Changing the viewport is different from changing the axes or
  graph ranges. Never infer that X and Y units have equal screen lengths after
  a GGB import; preserve intentional anisotropic scaling.
- Fit-to-content changes the view, not the mathematical definition. Reobserve
  before the next canvas click. Scroll over the drawer when navigating its
  content rather than over the canvas.
- Property Code selection can pan the view even when a command is a label or
  helper point. Recalibrate after using it; earlier click positions are stale.
  Close the drawer before the final framing check if it obscures part of the axes.
- In an iframe, operate its document and calculate coordinates in that frame.
  Do not reload with invented identity parameters to solve a viewport issue.
