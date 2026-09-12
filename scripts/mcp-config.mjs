import assert from 'node:assert/strict';

export const hostedEndpoint = 'https://questigeo-browser.koreacentral.cloudapp.azure.com/mcp';

export function validateMcp(manifest, files) {
  assert.equal(manifest.mcpServers, './.mcp.json', 'Hosted MCP manifest binding is required');
  assert.deepEqual(JSON.parse(files['.mcp.json']), {
    mcpServers: { 'questi-geo-browser': { type: 'http', url: hostedEndpoint } },
  }, 'Only the reviewed HTTPS MCP endpoint is permitted, without credentials or local commands');
  for (const key of ['hooks', 'agents', 'commands', 'dependencies', 'userConfig']) {
    assert(!(key in manifest), `Unexpected executable or credential configuration: ${key}`);
  }
}
