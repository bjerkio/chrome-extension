import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async env => ({
  manifest_version: 3,
  name: 'Bjerk Tools',
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,

  // action: {
  //   default_popup: 'index.html',
  // },

  icons: {
    '16': 'icons/icon16.png',
    '32': 'icons/icon32.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png',
  },

  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },

  permissions: ['declarativeNetRequest'],

  host_permissions: ['*://*/*'],

  author: 'Bjerk AS',
  description: 'Tools for Bjerk employees to make life easier.',
}));
