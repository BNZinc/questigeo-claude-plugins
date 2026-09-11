# Files, Library, and Access

## Free and Signed-In Workflows

| Workflow | Access |
| --- | --- |
| Construct/edit a drawing, open a local GGB | No Questi sign-in needed |
| Local GGB download or image export | No Questi sign-in needed |
| Public library, preview, download, open as a copy | No Questi sign-in needed |
| Personal library and database save | Questi account/sign-in required |
| AI image-to-GGB conversion | Questi sign-in and sufficient credits required |

The plugin itself has no separate OAuth flow and collects no credentials.
Use the site's `Questi 로그인·회원가입` control when needed. Let the user handle
credentials/MFA and required consent. Authenticated embedding is supported, but
query-string `userId`/`user_id` alone does not grant access.

## Open a File or Trace a Reference

1. Use header 열기 > the local file option, whose description mentions GGB and
   drawing over an image. Select the intended file using the host's supported
   file-upload controls.
2. A `.ggb` imports editable geometry. Check warnings, missing objects, clipping,
   labels, dashes, and aspect against the reference. Import is tolerant of
   malformed/unsupported GGB content, not a promise of exact full compatibility.
3. An image selected through **local file open** becomes a tracing image, not an
   AI conversion request. Select it to move it, adjust bounds/opacity in the
   image properties, then construct real points/lines/curves over it. If image
   hit-testing competes with drawing, activate the intended tool explicitly.
4. Before final export, hide the reference using image visibility if the user
   wants only the constructed diagram. Keep the original unless asked to remove
   it. Confirm the result without relying on the reference pixels underneath.

Avoid dropping/pasting an image onto the canvas when only manual tracing is
requested: image drop/paste can launch the paid conversion workflow. Local file
Open is the unambiguous tracing route. A dropped GGB uses the import workflow.

## Public Library

Open header 열기 > library, or navigate to `/ko?library=1` / `/en?library=1`
in a separate tab if the current drawing must be preserved. Select 공개 그림 목록
(Public drawings). Guests default there; signed-in users may start in their
personal library. Search by title, preview a card, then open in editor or use
the GGB/PNG download buttons. Public drawings open as copies, never as the
original author's save target. Do not publish, overwrite, or enumerate private
drawings merely to complete a public-library task.

## AI Image Conversion

Use 열기 > 이미지 → GeoGebra or the matching canvas button only when requested.
Read the current price and batch count in the dialog; do not hardcode credits
from this guide. Include optional problem text when authorized and useful.
Confirm the intended crop, then submit only after cost approval. Observe the
queued/in-progress state and resulting library item. If the submission result is
uncertain, check the existing job instead of submitting it again. A login gate
is a legitimate requirement, not an error to bypass.

## Export and Evidence

- Header 파일 저장 exports GGB. Guests download directly; a signed-in or embedded
  context may show a save dialog. Local saving is separate from database saving.
  Do not opt into a remote overwrite by default.
- 파일 > 이미지 인쇄 includes fitting the print area to the current view/content,
  selecting an area, and normal/high-quality PNG output. Confirm the chosen
  region contains all intended labels and marks. High-quality export can use a
  bounded fallback resolution; report failures instead of claiming success.
- Header 캡쳐 copies the rendered image to the clipboard. A clipboard action is
  not proof that a PNG file was downloaded. Preserve unrelated clipboard content
  when the host supports that.
- A GGB export can include `geogebra.xml`, `postgeo.json`, and `construction.txt`.
  The snapshot preserves application-specific information; native GeoGebra may
  not reproduce every unsupported relation identically.
- Verify the browser download, its filename, and nonempty artifact when the
  host exposes them. Reopening in a separate document is a useful round-trip
  check. Describe visual matching as approximate unless coordinates and
  mathematical constraints were actually verified.
- Compare every polygon edge, computed corner, fill, and equation label after
  reopening, not just object counts. Older native snapshots with intact ordered
  polygon ownership can recover omitted edge/corner indices; incomplete or
  unrelated geometry is not guessed into a relationship.
- Compare text sizes as well as contents. Native snapshots preserve saved
  typography; external GGB import applies the site's Korean exam-style defaults.
  Do not disable those defaults merely to compensate for a native round-trip
  defect. Preserve a PNG before reopening as visual evidence and report any
  differences rather than claiming pixel identity without comparison.
