# 4_TOOLS – scripts for exam day

Double-click a `.bat`, or run it with arguments from a terminal. The `.ps1` files hold the code; each `.bat` just starts its `.ps1` without the PowerShell execution-policy problem.

| Tool | When | What it does |
|---|---|---|
| `nowy-projekt.bat <numer> [-Web webowa] [-Konsola konsolowa] [-Dokumentacja dokumentacja] [-Cel D:\]` | **start of the exam** | creates `<numer>\` with the folders. It copies the template + this repo's `node_modules` (offline) + the VS Code snippets into `<web>\egzamin`, and writes `egzamin.txt` |
| `spakuj.bat <web folder> [-Zip web.zip] [-UsunProjekt]` | **end** | `web.zip` without node_modules/dist/.vite/.vscode (keeps `.git`), copies the changed `App.jsx` / `App.css` next to it, checks the zip. `-UsunProjekt` deletes the project afterwards, but refuses while `npm run dev` is running |
| `gen-snippets.mjs` | at home, after editing blocks: `node 4_TOOLS/gen-snippets.mjs` | rebuilds `.vscode/inf04_react.code-snippets` (`form03` = logic, `form03j` = JSX) and `2_BUILDING_BLOCKS/README.md` |

Folder names differ between sheets (`web` / `webowa`, `testy` / `dokumentacja`). Always pass what the sheet says.
