# Execution Access and Troubleshooting

Read this when browser control is missing, a website cannot be opened, or the
user reports that Questi Geo works in one host but not another.

## Distinguish the Execution Environment

- **Questi-hosted browser:** when separately connected `questi_browser_*`
  tools are present, follow [hosted-browser.md](hosted-browser.md). This operates
  the service's browser, not ChatGPT's cloud browser or the user's Chrome.
- **Desktop/browser-extension workflow:** the host may control the user's
  browser or a separate built-in browser. Follow the host's discovery,
  browser-selection, and permission instructions; don't assume a particular
  API name. A working desktop connection does not prove cloud access.
- **ChatGPT Work on the web:** Work uses a separate cloud browser, not the
  user's local Chrome profile or installed extensions. Browser availability
  depends on the plan, workspace, and rollout. Being in Work does not by itself
  prove that this session has a callable browser tool.
- **Claude chat, Cowork and Code:** the public plugin includes a remote MCP
  connection, not a local driver. Complete Questi OAuth in the connector UI.
  Tool names may carry host-specific prefixes. Do not copy Codex-specific
  control calls into Claude or treat web search as editor control.

## Diagnose the Earliest Failed Step

1. Inspect both the session's tools and its advertised browser-control skills.
   Read a supplied browser skill and follow its initialization instructions,
   including any required connection/bootstrap through the host's execution
   tool. The absence of a standalone browser or tool-search API does not rule
   out this supported route. If deferred discovery is available, use its
   documented interface for a focused search. Do not invent names, guess local
   skill paths, install a driver, or infer absence from a partial tool list.
   Ordinary web search does not establish control of a live editor.
2. If control is available, inspect the existing editor or open the requested
   URL without replacing unsaved work. Report the page state or the actual
   access error. Handle a permission request through the host's approval flow;
   do not silently relax permissions or switch the user's account/model.
3. If control remains unavailable after the advertised browser-skill setup and
   any available tool discovery, report that no editor action was attempted and
   no PNG/GGB was created. Distinguish a missing entry point from a failed setup.
   If discovery itself is unavailable, say so rather than claiming to have
   searched all possible integrations.
4. Distinguish tool absence, tool-call errors, denied website access, an editor
   renderer warning, and export/delivery failure. Use renderer troubleshooting
   only after actually accessing the editor. Do not blame the reference image,
   default line color, WebGL, browser extension, or model without evidence.

An observed WebGL initialization warning means that navigation succeeded but
drawing readiness did not. Do not create invisible objects repeatedly, recolor
them as a generic repair, or call a blank PNG a completed export. If the host
provides read-only console diagnostics, report the actual error separately from
the visible warning. The host's graphics support cannot be supplied by this
skill, and an independently redrawn PNG is not a repair of the editor.

Stop retrying when tool absence is established. Explain the verified prerequisite
for this environment rather than promising that switching to Work, reinstalling
the plugin, or starting another chat will fix it. In web Work, local Chrome
extension setup is not a repair for an unavailable cloud browser. If the user
wants to use a supported desktop workflow instead, explain that this changes the
execution environment; it is not proof that their web workflow was repaired.

The public plugin includes the hosted endpoint in `.mcp.json`; a standalone
skill ZIP does not. If only the skill is installed, the host still needs the
authorized Questi connector. Prompt edits cannot grant or repair that access.
Do not silently install a local driver as a substitute for a failed connection.

## Current Official References

- [ChatGPT browser and cloud Work](https://learn.chatgpt.com/docs/browser)
- [Desktop browser-extension setup](https://learn.chatgpt.com/docs/chrome-extension)
- [Skills and MCP server roles](https://developers.openai.com/plugins/concepts/plugins)

Check current host documentation when account availability or setup steps matter.
Do not treat a model's own unsupported-tool claim as proof of the provider's
internal configuration. Record what was observable.
