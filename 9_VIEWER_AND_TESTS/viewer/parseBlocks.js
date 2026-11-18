// split a block file into blocks: "//@ ID | description | needs" ... up to the next //@ or "// ===" line
export function parseBlocks(source) {
  const blocks = [];
  let current = null;
  for (const line of source.split(/\r?\n/)) {
    const header = line.match(/^\/\/@\s*([A-Z]+-\d+)\s*\|\s*([^|]*?)\s*(?:\|\s*(.*?)\s*)?$/);
    if (header) {
      current = { id: header[1], description: header[2], needs: header[3] || '', lines: [] };
      blocks.push(current);
    } else if (/^\/\/ ={3,}/.test(line)) {
      current = null;
    } else if (current) {
      current.lines.push(line);
    }
  }
  for (const block of blocks) {
    const demoAt = block.lines.findIndex((l) => /^\s*\/\/ -+ demo/i.test(l));
    const codeLines = demoAt >= 0 ? block.lines.slice(0, demoAt) : block.lines;
    block.code = codeLines.join('\n').replace(/^export /gm, '').trim();
    const component = block.lines.join('\n').match(/export function (\w+)/);
    block.component = component ? component[1] : null;
    const parts = splitComponent(block.code);
    block.logic = parts ? parts.logic : null;
    block.jsx = parts ? parts.jsx : null;
  }
  return blocks;
}

const dedent = (lines, n) => lines.map((l) => l.slice(Math.min(n, l.length - l.trimStart().length)));

// "function FormSelect() { <logic>  return (<jsx>); }" -> { logic, jsx } so it can be pasted INTO App
// (state + functions above App's return, JSX inside it). Returns null for plain helpers / child components
// (lowercase name, or a component that takes props).
export function splitComponent(code) {
  const lines = code.split('\n');
  if (!/^function [A-Z]\w*\(\) \{$/.test(lines[0]) || lines[lines.length - 1] !== '}') {
    return null;
  }
  const body = lines.slice(1, -1);
  let r = body.length - 1;
  while (r >= 0 && !/^ {2}return\b/.test(body[r])) {
    r--;
  }
  if (r < 0) {
    return null;
  }
  const logic = dedent(body.slice(0, r), 2).join('\n').trim();
  let jsx;
  if (body[r] === '  return (') {
    const end = body.lastIndexOf('  );');
    jsx = dedent(body.slice(r + 1, end), 4).join('\n');
  } else {
    jsx = body.slice(r).join('\n').replace(/^\s*return\s*/, '').replace(/;\s*$/, '');
  }
  return { logic, jsx: jsx.trim() };
}
