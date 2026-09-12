# Questi-Hosted Browser

Use this only when the session actually exposes authorized `questi_browser_*`
tools. The separately running MCP service supplies an isolated browser. This
skill alone does not provision that service. Public plugin 1.0.4 connects to the
stable Questi-hosted service using Questi login, not an operator access key.

## Operate the Browser

1. Call `questi_browser_start` once without arguments for a new drawing. Save its
   `browserId` and pass it to EVERY later tool, including screenshots and downloads.
   Start without an ID creates another empty browser; a new MCP connection does
   not mean a new drawing. Do not invent IDs or reuse another user's ID.
2. Menus and input fields have refs in `questi_browser_snapshot`. Use only fresh
   refs. Geometry lives in WebGL: use screenshots and coordinate mouse tools.
3. Coordinates are viewport CSS pixels at 1440 x 1000 with device scale 1. Do not
   subtract the toolbar height: the mouse driver expects full-page coordinates.
4. Draw through the editor UI. Quick line (`그리기: 선`) is a drag, not two clicks.
   It is one-shot: activate it again before each segment. Native shape tools have
   their own gestures; inspect the menu and hover hints rather than guessing.
5. Inspect after each construction. Escape returns to selection. Do not use
   native host computer use, another browser, JavaScript, shell, internal
   stores, or off-site geometry generation as a fallback for this workflow.

When available, `questi_browser_guide` exposes the maintained editor, recovery,
functions and export guides directly through MCP. Read the relevant topic instead
of guessing an unfamiliar gesture. Action responses distinguish dispatched input
from verified geometry and include visible UI state; a failed action returns fresh
observation when possible. Neither a tool success nor a changed screenshot proves
that the intended construction is correct. No failed drawing action is retried or
undone automatically.

Call `questi_browser_preview` once after starting when it is available. Hosts
that support its embedded UI can display a live read-only view. If the host only
shows the returned preview link, provide that link; do not claim an embedded
view is working or block drawing on it. Use screenshots for your own inspection.

If the user requests a process recording, set `recordVideo: true` on the initial
`questi_browser_start` without a browserId. The browser itself records a continuous
video; this option cannot be changed on an existing session. After closing,
`questi_browser_downloads` lists it separately from the
required PNG/GGB. Recording is optional, has size/lifetime limits, and never
substitutes for either drawing export.

Reference interpretation, relationships and mathematical correctness still
follow reproduce.md and editor.md. A browser tool does not guarantee an accurate
reconstruction. Confirm intersections, labels, line styles and proportions.

## Finish With Actual Files

- Header `파일 저장` downloads the editable GGB directly in the fresh editor.
- `파일` > `이미지 인쇄` > `내용에 맞추기` sets the print area. Inspect its bounds,
  reopen `이미지 인쇄`, then choose `기본 품질` or the requested high-quality option.
  The `캡처` action copies the clipboard; it does not download PNG.
- Use visible menu items. A snapshot can include controls inside an `aria-hidden`
  closed sidebar; do not click their refs or coordinates through the canvas.
  Open the sidebar before using its controls, or use the visible print menu.
- Call `questi_browser_downloads`. Return the PNG and GGB links exactly as listed,
  including expiry information. These are server downloads, not files already
  stored on the user's device. Empty results are not success: check export state
  and download errors. Never fabricate a path, filename, or attachment.
- `questi_browser_take_screenshot` is for inspection, not a replacement export.
  This hosted service cannot create a ZIP or reopen local GGB files through an upload.
  State that round-trip verification is untested rather than claiming it passed.
- After delivering both files, call `questi_browser_close` with that browserId
  to release resources. Do not close while unsaved work remains.

## Public Beta Limits

Only the configured Questi Geo origin is accessible. Each `browserId` has an
isolated browser and no preexisting login. Private library, paid image conversion,
local uploads, other websites, and access to the user's local browser are blocked.
Do not ask for passwords in chat, add `userId`, or switch accounts to bypass this.
On an authorization error, use the host's reconnect UI and sign in with Questi.
OAuth connections survive service restart; live drawing browsers do not. Existing
export links remain available until their one-hour expiry. Never claim the files
have been saved on the user's computer merely because the server exported them.
There is one active browser per Questi account, six new drawings per hour and
three shared concurrent browsers. Reuse browserId; do not create accounts or
connections to bypass limits. Sessions end after 30 idle minutes or 60 total
minutes. Save PNG and GGB before closing. Expiring links are bearer links: anyone
with the link can download it. Do not distribute them beyond the user's request.
