// @vitest-environment node
// esbuild needs the node environment (it breaks under jsdom), so this check lives in its own file.
// Every component block, split into logic + JSX the way the snippets/viewer paste it, must form ONE valid App.
import { describe, it, expect } from 'vitest';
import { transformWithEsbuild } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { parseBlocks } from '../viewer/parseBlocks.js';

const dir = path.resolve(__dirname, '../2_BUILDING_BLOCKS');
const allBlocks = fs.readdirSync(dir).filter((f) => f.endsWith('.jsx')).sort()
  .flatMap((f) => parseBlocks(fs.readFileSync(path.join(dir, f), 'utf8')));

it('component blocks are split (only JS helpers / child components stay whole)', () => {
  const whole = allBlocks.filter((b) => b.logic === null).map((b) => b.id.split('-')[0]);
  expect(new Set(whole)).toEqual(new Set(['JS', 'COMP']));
});

describe('logic + JSX pasted into ONE App compiles', () => {
  for (const b of allBlocks.filter((x) => x.logic !== null)) {
    it(b.id, async () => {
      expect(b.jsx.length).toBeGreaterThan(0);
      expect(b.logic).not.toMatch(/^return\b/m);            // a top-level return would replace the whole App
      const app = `function App() {\n${b.logic}\nreturn (\n<>\n${b.jsx}\n</>\n);\n}\nexport default App;`;
      await expect(transformWithEsbuild(app, 'App.jsx', { jsx: 'automatic' })).resolves.toBeTruthy();
    });
  }
});
