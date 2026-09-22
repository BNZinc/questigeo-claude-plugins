# Questi Geo for Claude

Draw, edit, and export mathematical diagrams in [Questi Geo](https://geo.questi.kr/).
Published by **BnZ**. Plugin version: **1.0.5**.

This plugin bundles drawing instructions and an authenticated remote MCP
connection to Questi Geo's own cloud browser. Claude operates the real editor
with clicks, drags, screenshots and visible input fields, without relying on
local computer-use tools or browser extensions.

Drawing tasks finish with **matching PNG and editable GGB downloads**. The hosted
tools return real HTTPS links with a one-hour expiry, not paths on your device.
If the host actually downloads and verifies the files locally, it can also give
their local paths. A process video, canvas preview, or clipboard copy is not a
substitute. Recording is an optional extra when requested.

The editor and both exports must represent the same final geometry. An
independently redrawn image or patched archive is not an export. Failed exports
must be reported, and failed construction attempts must be undone or edited
before retrying. Visual reproduction is not proof of exact mathematical
constraints. The hosted browser cannot upload or reopen downloaded GGB files;
Claude must identify round-trip verification as untested in that mode.

## Equation Input in 1.0.5

Choose Draw > Functions > y=f(x) or x=g(y), then use the Edit formula pencil.
Enter the expression, named coefficients and x/y ranges, confirm, and click
the canvas once to commit. Subsequent valid edits in Properties apply
automatically. Formula labels are annotations, not plotted graphs. The shared
function guide covers invalid drafts, placement cancellation and verification.

## Requirements

- Connect the bundled `questi-geo-browser` connector through Questi OAuth.
  Enter credentials only on the Questi login page, never in a conversation.
- Remote endpoint: `https://questigeo-browser.koreacentral.cloudapp.azure.com/mcp`.
  The manifest contains no access key, client secret or local executable.
- Claude must expose the connected tools to the conversation. Installation
  alone is not proof of successful authentication or tool access.
- The hosted editor remains signed out: private library, paid image conversion,
  arbitrary websites and local uploads are blocked. It cannot see your personal
  browser, existing documents or local files.
- The website still supports ordinary drawing and downloads without login when
  you use it directly. Local computer use remains an explicit alternative, not
  an automatic fallback after a connector error.
- The optional landmark calculator requires Node.js 22 or newer. It maps a
  supplied coordinate plan locally; it does not upload images or control a browser.

## Install in Claude Code

```text
/plugin marketplace add BNZinc/questigeo-claude-plugins
/plugin install questi-geo@questigeo-claude-plugins
```

Example prompts:

- Recreate this math diagram in Questi Geo. Export matching PNG and editable GGB files, verify they match, and provide both downloads. Report any failed export without creating replacement files.
- Draw one triangle with a dashed altitude in Questi Geo's cloud browser. Inspect the final canvas, export PNG and GGB, and provide both download links. State any unverified geometric constraints.
- Plot y=x^2-1 for -2<=x<=2 in Questi Geo. Export matching PNG and GGB files and provide both downloads; identify any unverified or failed output.

You can invoke the skill explicitly with `/questi-geo:questi-geo`.
Use `/mcp` to complete the Questi connector authentication if prompted. Claude
chat and Cowork can use a remote connector too; use their connector authentication
UI. A bare skill ZIP does not include the MCP configuration.

## Session and File Limits

The service allows concurrent drawings on one Questi account, six new drawings
per account per hour, and three simultaneous browsers across the service. Reuse the returned
browserId. Sessions close after 30 idle minutes or 60 total minutes. Export PNG
and GGB before closing. Existing exports remain accessible until their original
one-hour expiry, including after the browser closes.

Export links are bearer links: anyone with the link can download that file until
it expires. Share only as requested. The preview is read-only; embedded display
depends on the Claude surface. A preview link is a fallback, not a drawing file.

For updates, refresh this marketplace and update the plugin:

```text
/plugin marketplace update questigeo-claude-plugins
/plugin update questi-geo@questigeo-claude-plugins
```

This repository is an independent distribution source. Its existence does not
imply listing in Anthropic's official directory or an Anthropic Verified badge.

## What Is Included

- `plugins/questi-geo/.claude-plugin/plugin.json`: Claude plugin identity.
- `plugins/questi-geo/.mcp.json`: allowlisted remote browser MCP connection.
- `plugins/questi-geo/skills/questi-geo/`: the shared, self-contained drawing skill.
- `.claude-plugin/marketplace.json`: the public installation catalog.
- `source-release.json`: reviewed source revision and distributed file hashes.

Only approved plugin files are distributed. Website source code, account data,
private problem images, GGB downloads, and test recordings are not included.

## Maintain and Validate

The drawing instructions are maintained with the Questi Geo editor. To import
an approved committed release from an authorized editor checkout:

```sh
npm run sync -- /path/to/editor-checkout <commit-or-ref>
npm run check
npm test
npm run package
claude plugin validate plugins/questi-geo
claude plugin validate .claude-plugin/marketplace.json
```

The sync command reads only an explicit file allowlist from Git, not uncommitted
files or entire directories. It adds this public repository URL to the Claude
manifest. Review the diff before committing and pushing; the command never
pushes or publishes automatically. Keep the root package version and this
README in step with the plugin version. CI validates every pushed update.

## Support and Policies

- [Customer support](https://questi.kr/support)
- Email: support@questi.im
- [Privacy policy](https://woozy-quicksand-79f.notion.site/1433b20d197380f58579e764c71b893d)
- [Terms of service](https://woozy-quicksand-79f.notion.site/1433b20d1973803eb6c0de8c8e2d33e2)

The package has no embedded credentials, automatic hooks, or local background
services. The remote service stores connection state and temporary drawing
artifacts under Questi's policies. Connecting it grants only the disclosed cloud
drawing scope, not permission to spend credits or access private library data.
