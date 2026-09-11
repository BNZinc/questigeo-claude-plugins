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

## Export and Local Delivery

Complete drawing tasks with two files from the same final state: a clean PNG
capture and an editable GGB. Use the user's requested output directory; otherwise
use the host's accessible local output/download directory. Do not overwrite an
existing source or unrelated file. Prefer matching descriptive basenames, using
a unique suffix when needed.

### Export Through the Editor

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
- Hide tracing references unless requested in the result, dismiss selection
  handles, and verify the export bounds. Export the PNG and GGB after the final
  correction; if the drawing changes afterward, replace the pair with fresh
  exports. Do not substitute the original input image, a video frame, or an
  older download for the completed drawing.

### Recover Without Changing the Drawing

- Do not infer a failed GGB export from a non-working ChatGPT attachment. First
  check whether the browser downloaded a valid archive. Reattach those same bytes
  with an explicit download link; package them in ZIP if `.ggb` preview is unsupported.
- If no PNG arrives, inspect the print menu and any visible error. On older site
  builds, reopening Image print after choosing a region clears that region rather
  than opening the menu. Do not assume the region or quality command was applied.
  Reobserve the frame and use the print-area panel's download when available.
- A download-event timeout does not prove export failure: a browser may save the
  file without forwarding that event to the host tool. Before retrying, inspect
  the browser's download status and its known output directory using available
  file tools. Match a newly created file to this action's timestamp, type and
  contents, not a similarly named old file. The browser output directory and the
  agent's scratch directory may differ. Copying the unchanged downloaded bytes
  to the host's attachment directory is allowed; recreating the picture is not.
- For an actual PNG failure, keep the document unchanged, verify bounds, and try
  standard quality once. Wait for the download to finish. If it still fails,
  deliver the valid GGB as partial completion and state that PNG is missing.
  Never generate replacement pixels or modify the archive outside the editor.
- Exporting requests a browser download; it cannot confirm that the host exposed
  the file to the user. Check the downloaded artifact separately from site status.

### Verify and Deliver the Files

1. Use the host's supported download controls to wait for each new download and
   save it to the chosen location. A click or success toast is not sufficient.
   Where supported, register the download listener before clicking the export
   control. Resolve the actual saved filenames, including browser-added suffixes;
   do not assume a default Downloads path or reuse a temporary blob URL.
2. Verify that both files exist, have nonzero size, and are the expected formats
   using available file tools. Open the saved PNG and check the actual drawing,
   labels, dashes, and unclipped bounds. Check that the GGB is a readable archive
   containing `geogebra.xml`, not HTML/error text renamed with a `.ggb` extension.
   Reopen that saved GGB in a separate document when supported. Compare it against
   both the final editor and the saved PNG: shapes and their positions, auxiliary
   lines/dashes, labels, fills, and unexpected leftover attempts. Helper objects
   may legitimately increase the object count; do not deduplicate by count or
   coordinate proximity. Never replace the user's canvas for this check.
   If they disagree, correct the source drawing in the editor and export both
   again. A PNG-only cosmetic fix is not a valid repair. State any verification
   that could not be performed rather than claiming a verified matching pair.
3. In a local host, give separate labeled, clickable PNG and GGB links using
   their verified absolute local paths. In ChatGPT Work/cloud hosts, use the
   host-supported file attachment/download links (explicitly label them "Download
   PNG" and "Download GGB") and also attach a ZIP containing those unchanged files.
   Check ZIP member bytes or hashes against the two verified files. Do not merely
   mention an internal path or rely on a `.ggb` preview card. Identify cloud paths
   as cloud storage, not files already saved to the user's computer.
   Show the PNG as an inline
   preview if the host supports it, but keep its file link as well. Briefly note
   approximations or warnings. A recording, if requested, is a supplementary
   third artifact, not the primary result.
4. If either export fails, report partial completion, identify the missing file,
   and still provide any verified successful file. If downloads exist only in a
   remote/sandbox host, identify that location honestly and expose its supported
   download links; do not claim they are on the user's computer. If local saving
   is unavailable, say the local-delivery requirement is not yet met.

### Round-Trip Checks

- Describe visual matching as approximate unless coordinates and mathematical
  constraints were actually verified.
- Compare every polygon edge, computed corner, fill, and equation label after
  reopening, not just object counts. Older native snapshots with intact ordered
  polygon ownership can recover omitted edge/corner indices; incomplete or
  unrelated geometry is not guessed into a relationship.
- Compare text sizes as well as contents. Native snapshots preserve saved
  typography; external GGB import applies the site's Korean exam-style defaults.
  Do not disable those defaults merely to compensate for a native round-trip
  defect. Preserve a PNG before reopening as visual evidence and report any
  differences rather than claiming pixel identity without comparison.
