// Smoke test of 2_BUILDING_BLOCKS: every block parses, has a demo component, and renders without errors.
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import fs from 'node:fs';
import path from 'node:path';
import { parseBlocks } from '../viewer/parseBlocks.js';

const dir = path.resolve(__dirname, '../../2_BUILDING_BLOCKS');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.jsx')).sort();
const modules = import.meta.glob('../../2_BUILDING_BLOCKS/*.jsx', { eager: true });

beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
  globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ test: 1 }) }));
});

const allBlocks = files.flatMap((f) => parseBlocks(fs.readFileSync(path.join(dir, f), 'utf8')));

it('block IDs are unique across all files', () => {
  const ids = allBlocks.map((b) => b.id);
  expect(ids.length).toBeGreaterThan(80);
  expect(new Set(ids).size).toBe(ids.length);
});

it('README phrase table points only at existing block IDs', () => {
  const readme = fs.readFileSync(path.resolve(__dirname, '../../README.md'), 'utf8');
  const ids = new Set(allBlocks.map((b) => b.id));
  const used = [...readme.matchAll(/\b([A-Z]{2,5}-\d{2})\b/g)].map((m) => m[1]);
  expect(used.length).toBeGreaterThan(30);
  expect(used.filter((id) => !ids.has(id))).toEqual([]);
});

it('no numbered ids in paste-ready code (imie2, haslo2...)', () => {
  const bad = allBlocks.filter((b) => /(id|htmlFor)="[a-zA-Z]+\d"/.test(b.code)).map((b) => b.id);
  expect(bad).toEqual([]);
});

it('no direct DOM APIs in code lines (comments may warn about them)', () => {
  for (const b of allBlocks) {
    const codeOnly = b.code.split('\n').map((l) => l.replace(/\/\/.*$/, '')).join('\n');
    expect(codeOnly, b.id).not.toMatch(/\b(document|window)\./);
  }
});

for (const file of files) {
  const source = fs.readFileSync(path.join(dir, file), 'utf8');
  const blocks = parseBlocks(source);
  const mod = modules[`../../2_BUILDING_BLOCKS/${file}`];

  describe(file, () => {
    it('has blocks, no DOM queries, no class=/for=', () => {
      expect(blocks.length).toBeGreaterThan(0);
      expect(source).not.toMatch(/getElementById|querySelector/);
      expect(source).not.toMatch(/\sclass=|\sfor=|onclick=/);
    });
    for (const b of blocks) {
      it(`${b.id} renders (${b.component})`, () => {
        expect(b.component, 'block has an exported component').toBeTruthy();
        expect(b.code).not.toMatch(/^export /m);
        const Demo = mod[b.component];
        expect(typeof Demo).toBe('function');
        const { container } = render(<Demo />);
        expect(container.innerHTML.length).toBeGreaterThan(0);
      });
    }
  });
}
