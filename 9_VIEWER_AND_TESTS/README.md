# 9_VIEWER_AND_TESTS – the toolbox's own app and tests (not needed at the exam)

| What | Where | Run (from the repo root) |
|---|---|---|
| **Viewer**: runs every ready app; shows every block live with Copy logic / Copy JSX buttons and a search | `index.html`, `viewer/`, `public/assets/` (all images), `vite.config.js` | `npm run dev` |
| **Tests**: the grading-key checks of every app; every block renders and its logic + JSX compile as one App; README block IDs exist | `tests/` | `npm test` |

`viewer/parseBlocks.js` is the `//@` block parser. `4_TOOLS/gen-snippets.mjs` uses it too.
`node_modules` lives in the repo root (the apps in `1_READY_APPS` import React/Bootstrap from there).
