// Toolbox viewer (NOT exam code). `npm run dev` in the repo root opens it.
//   /                 -> index: ready apps + searchable list of building blocks
//   /?app=<folder>    -> runs one ready app exactly like in an exam project (only its own CSS loads)
//   /?blocks=<file>   -> live demo + copyable code of every block in one 2_BUILDING_BLOCKS file
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { parseBlocks } from './parseBlocks.js';

const apps = import.meta.glob('../1_READY_APPS/*/App.jsx');
const appSources = import.meta.glob('../1_READY_APPS/*/App.jsx', { query: '?raw', import: 'default', eager: true });
const blockModules = import.meta.glob('../2_BUILDING_BLOCKS/*.jsx');
const blockSources = import.meta.glob('../2_BUILDING_BLOCKS/*.jsx', { query: '?raw', import: 'default', eager: true });

import readme from '../README.md?raw';

const folderOf = (path) => path.split('/').slice(-2, -1)[0];
const fileOf = (path) => path.split('/').pop().replace('.jsx', '');

// Polish task phrases from the README table "| "lista rozwijana", ... | FORM-03, FORM-04 |" -> per block ID
const phrasesById = {};
for (const line of readme.split(/\r?\n/)) {
  const row = line.match(/^\|\s*(.*?"[^|]*?)\s*\|\s*([A-Z]+-\d+(?:\s*,\s*[A-Z]+-\d+)*)/);
  if (row) {
    for (const id of row[2].split(/\s*,\s*/)) {
      phrasesById[id] = (phrasesById[id] || '') + ' ' + row[1];
    }
  }
}


function appTitle(path) {
  const first = appSources[path].split('\n')[0];
  return first.replace(/^\/\/\s*/, '');
}

function Index() {
  const [filter, setFilter] = useState('');
  const f = filter.toLowerCase();
  return (
    <div className="container py-4">
      <h1 className="h3">INF.04 React toolbox</h1>
      <p className="text-muted">Click an app to run it. Search blocks by ID, word or Polish task phrase.</p>

      <h2 className="h5 mt-4">1. Ready apps</h2>
      <ul className="list-group mb-4">
        {Object.keys(apps).sort().map((path) => (
          <a key={path} className="list-group-item list-group-item-action" href={`?app=${folderOf(path)}`}>
            <strong>{folderOf(path)}</strong> <span className="text-muted small">{appTitle(path)}</span>
          </a>
        ))}
      </ul>

      <h2 className="h5">2. Building blocks</h2>
      <input className="form-control mb-3" placeholder="search: select, checkbox, map, licznik, filtr..."
        value={filter} onChange={(e) => setFilter(e.target.value)} autoFocus />
      {Object.keys(blockSources).sort().map((path) => {
        const blocks = parseBlocks(blockSources[path]).filter((b) =>
          !f || (b.id + ' ' + b.description + ' ' + (phrasesById[b.id] || '') + ' ' + b.code).toLowerCase().includes(f));
        if (blocks.length === 0) return null;
        return (
          <div key={path} className="mb-3">
            <a className="fw-bold" href={`?blocks=${fileOf(path)}`}>{fileOf(path)}</a>
            <ul className="small mb-0">
              {blocks.map((b) => (
                <li key={b.id}>
                  <a href={`?blocks=${fileOf(path)}#${b.id}`}><code>{b.id}</code></a> {b.description}
                  {phrasesById[b.id] && <span className="text-muted"> –{phrasesById[b.id]}</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }
  return (
    <button type="button" className="btn btn-sm btn-outline-secondary ms-1" onClick={copy}>
      {copied ? 'Copied' : label}
    </button>
  );
}

function BlocksPage({ file }) {
  const path = `../2_BUILDING_BLOCKS/${file}.jsx`;
  const [module, setModule] = useState(null);
  useEffect(() => {
    blockModules[path]?.().then(setModule);
  }, [path]);
  useEffect(() => {
    if (module && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [module]);
  if (!blockSources[path]) return <p className="p-4">Unknown file {file}</p>;
  const blocks = parseBlocks(blockSources[path]);
  return (
    <div className="container py-4">
      <a href="/">&larr; index</a>
      <h1 className="h4 mt-2">{file}</h1>
      {blocks.map((b) => {
        const Demo = module && b.component ? module[b.component] : null;
        return (
          <div key={b.id} id={b.id} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span><code>{b.id}</code> {b.description} {b.needs && <span className="text-muted small">({b.needs})</span>}</span>
              <span className="text-nowrap">
                {b.logic !== null && <CopyButton text={b.logic} label="Copy logic" />}
                {b.jsx !== null && <CopyButton text={b.jsx} label="Copy JSX" />}
                <CopyButton text={b.code} label={b.logic !== null ? 'Copy all' : 'Copy'} />
              </span>
            </div>
            {b.logic !== null && (
              <div className="small text-muted px-3 pt-2">
                Into App: <b>logic</b> (state + functions) above <code>return</code>, <b>JSX</b> inside the return.
                {' '}Snippets: <code>{b.id.replace('-', '').toLowerCase()}</code> / <code>{b.id.replace('-', '').toLowerCase()}j</code>
              </div>
            )}
            <div className="row g-0">
              <div className="col-lg-7">
                <pre className="m-0 p-3 bg-light small" style={{ maxHeight: 480, overflow: 'auto' }}>{b.code}</pre>
              </div>
              <div className="col-lg-5 p-3 border-start">
                <div className="text-muted small mb-2">live demo</div>
                {Demo ? <Demo /> : <span className="text-muted small">(no demo)</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AppPage({ folder }) {
  const path = `../1_READY_APPS/${folder}/App.jsx`;
  const [App, setApp] = useState(null);
  useEffect(() => {
    apps[path]?.().then((m) => setApp(() => m.default));
  }, [path]);
  if (!apps[path]) return <p>Unknown app {folder}</p>;
  return (
    <>
      {App && <App />}
      <a href="/" style={{ position: 'fixed', right: 8, bottom: 8, fontSize: 12, opacity: 0.6, color: 'gray' }}>
        &larr; toolbox
      </a>
    </>
  );
}

function render(page) {
  createRoot(document.getElementById('root')).render(<StrictMode>{page}</StrictMode>);
}

const params = new URLSearchParams(location.search);
if (params.get('app')) {
  render(<AppPage folder={params.get('app')} />);   // no viewer CSS: the app looks exactly as in the exam
} else {
  import('bootstrap/dist/css/bootstrap.css').then(() =>
    render(params.get('blocks') ? <BlocksPage file={params.get('blocks')} /> : <Index />));
}
