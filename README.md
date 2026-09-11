# Questi Geo for Claude

Draw, edit, and export mathematical diagrams in [Questi Geo](https://geo.questi.kr/).
Published by **BnZ**. Plugin version: **1.0.1**.

This skills-only plugin teaches Claude how to use the existing browser editor:
reproduce diagrams from problem images, construct geometry, edit equations and
ranges, preserve groups, import GGB files, and verify exported drawings.

## Requirements

- Claude must have browser or computer-use tools capable of interacting with the
  editor and its canvas. This plugin does not install a browser driver or MCP
  server. Without those tools, Claude can explain a construction but cannot
  perform it on the website.
- Drawing and local GGB/image downloads do not require a Questi account.
- Private library actions and image-to-GGB conversion require Questi sign-in.
  Conversion may spend credits and must be confirmed before submission.
- The optional landmark calculator requires Node.js 22 or newer. It maps a
  supplied coordinate plan locally; it does not upload images or control a browser.

## Install in Claude Code

```text
/plugin marketplace add BNZinc/questigeo-claude-plugins
/plugin install questi-geo@questigeo-claude-plugins
```

Example prompts:

- Recreate this math diagram in Questi Geo and download the GGB.
- Draw a triangle with a dashed altitude in Questi Geo.
- Plot y=x^2-1 for -2<=x<=2 in Questi Geo, then change its quadratic coefficient.

You can invoke the skill explicitly with `/questi-geo:questi-geo`.
Follow your host's browser setup and permission prompts. Installing the skill
does not grant browser access or permission to spend conversion credits.

For updates, refresh this marketplace and update the plugin:

```text
/plugin marketplace update questigeo-claude-plugins
/plugin update questi-geo@questigeo-claude-plugins
```

This repository is an independent distribution source. Its existence does not
imply listing in Anthropic's official directory or an Anthropic Verified badge.

## What Is Included

- `plugins/questi-geo/.claude-plugin/plugin.json`: Claude plugin identity.
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

The plugin itself has no analytics, credentials, automatic hooks, or background
services. Website activity remains subject to Questi's policies and the host's
browser permissions.
