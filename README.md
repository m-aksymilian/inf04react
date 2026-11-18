# INF.04 React toolbox

The React side of my INF.04 toolbox, built the same way as the C++ one (`Desktop\C--`). It is made for **sourcing code fast** while writing the web task, not for reading top to bottom.

| Folder | What | Use it when |
|---|---|---|
| `1_READY_APPS/` | 4 official web tasks solved (22.06, 23.06, 25.01, 26.06) + 6 practice apps; each has a `README.md` with the spec, key checks and screenshots | the task looks like one of them: copy `App.jsx` (+ `App.css`) |
| `2_BUILDING_BLOCKS/` | 87 paste-ready blocks (`//@ ID \| what \| needs`); catalog in its `README.md` | you need one piece (select, switch, +1 in an array, filter…) |
| `3_EXAM_TEMPLATE/egzamin/` | clean Vite 6 + React 19 + Bootstrap 5.3 project | starting the exam project (use `tools\nowy-projekt.bat`) |
| `tools/` | `nowy-projekt`, `spakuj`, `gen-snippets.mjs` | setup / packing / regenerating snippets + catalog |
| `arkusze/` | sheets, grading keys (`klucze/`), materials | checking exact wording |
| `react-tasks.md` | full specs + key checks of all 4 web tasks, cross-year patterns | before the exam |

## Toolbox commands (in this folder)
```
npm run dev      # viewer: run any ready app (?app=...), every block live with Copy logic / Copy JSX buttons,
                 # search by ID, English word or Polish task phrase ("lista rozwijana", "suwak"...)
npm test         # 23 app tests (grading-key checks) + every block renders
node tools/gen-snippets.mjs   # after editing blocks: rebuilds .vscode snippets + 2_BUILDING_BLOCKS/README.md
```
On a new PC: run `npm install`, then `npm --prefix tests install --legacy-peer-deps` (the tests use React from the root).

---

## Exam day – steps
1. **Read the sheet** and write down: the folder names (`web` / `webowa`, `testy` / `dokumentacja`…), the exact texts, the classes, the password of the materials archive.
2. **Create the folders + project** (offline, no `npm install`):
   ```
   tools\nowy-projekt.bat <numer> -Web webowa -Konsola konsolowa -Dokumentacja dokumentacja
   cd Desktop\<numer>\webowa\egzamin
   npm run dev            (blocked by PowerShell? -> npm.cmd run dev, or use cmd)
   code .                 (the snippets work only inside this opened folder)
   ```
   If the toolbox is not on the exam PC, use `npm create vite@latest egzamin -- --template react`, then `npm i bootstrap` (needs internet).
3. **Materials**: images go in `public/assets/` → `src="/assets/obraz1.jpg"`. Copy data from `dane.txt` straight into the array (JS-15).
4. **Write `App.jsx`**. Start from the closest ready app or from `inf04app`, then add blocks. Keep **one component**. Each block comes in two parts:
   - `form03` + Tab **above** App's `return` → state + functions
   - `form03j` + Tab **inside** App's `return` → JSX
   - The viewer has the same split as the "Copy logic" / "Copy JSX" buttons.
   - JS helpers (`js05`) go above `return` whole.
   - Other snippets: `us` (useState, setter filled automatically), `fg` (form-group + label + input), `mapli`.
   - After pasting two blocks, check for duplicate names (two `zapisz`, two `id="tytul"`) and rename.
5. **Check against the key** (list below), then take the **screenshots**.
6. **Pack**: `tools\spakuj.bat Desktop\<numer>\webowa`. It creates `web.zip` without node_modules and copies the changed `App.jsx` / `App.css` next to it. Check that the zip opens. Then delete the project folder (or add `-UsunProjekt`), so only the zip + the source files remain.
7. **egzamin** document: OS, IDEs, languages, frameworks/libraries (React, Bootstrap). A skeleton is made in `dokumentacja\egzamin.txt`. 2022–2025 asked for an office document with signed screenshots; 2026 asked for a plain text file. **Follow the sheet.**

## Grader checklist (from every key)
**0 points for the whole web part if:** not React/Angular · DOM methods (`document.getElementById`, `querySelector`) · events as strings (`onclick="f()"`).

- [ ] `import 'bootstrap/dist/css/bootstrap.css';`
- [ ] **One component** (`App`), no extra components
- [ ] `className`, `htmlFor`, every tag closed (`<input />`, `<img />`, `<br />`)
- [ ] Every input has a `<label htmlFor="x">` with a meaningful `id="x"` (not `input1`, not `exampleInputEmail1`)
- [ ] `<div className="form-group">` around each field (+ `mb-3` / `m-4` for real spacing) and `className="form-control"` on inputs
- [ ] Lists come from `.map` with `key`, never hard-coded; counts from `.length`
- [ ] Event handlers: `onSubmit={f}` on the form + `e.preventDefault()`, or `onClick={f}` / `onClick={() => f(x)}`
- [ ] Exact texts, button classes (`btn btn-primary` / `btn-success`), the initial state as in the illustration
- [ ] The CSS rule the sheet asks for is **in the CSS file** if it says so (23.06: `body { padding: 20px; }`)
- [ ] Readable code: one statement per line, indentation, spaces around operators, meaningful names
- [ ] Runs without errors (F12 console clean, apart from your `console.log` output)

## Pitfalls
- **PowerShell blocks `npm`** (`npm.ps1 cannot be loaded … execution policy`): use `npm.cmd run dev`, or run it from `cmd`, or `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **Default Vite `index.css`** (dark background, centred `#root`) breaks the Bootstrap look. The template has none. In a fresh `npm create vite` project, delete `import './index.css'` in `main.jsx` and clear `App.css`.
- **Bootstrap 5 has no `form-group`.** It does nothing, but the key looks for it, so write it anyway.
- **Select**: Bootstrap 5 styles it with `form-select`, and the key wants `form-control`. Write `className="form-control form-select"`.
- **Missing `e.preventDefault()`** → the page reloads, the URL gets `?tytul=…`, and the console clears.
- **Number inputs give strings.** Use `Number(x)`: `'1' + 1 === '11'`, and `'' >= 0` is true.
- **Never mutate state.** No `tab[i]++`, no `push` on state. Use `map` / `filter` / spread (STATE-04/05/06).
- **Sort a copy**, `[...tab].sort((a, b) => a - b)`. Without the compare function, numbers sort as strings.
- **`checked` + `onChange`** for checkboxes/radios. `e.target.checked` for a checkbox, not `.value`.
- **Images**: `public/assets/x.jpg` → `src="/assets/x.jpg"` (no import). `src/assets/x.jpg` → `import x from './assets/x.jpg'`.
- **StrictMode** runs effects twice in dev. A `console.log` in `useEffect` showing twice is normal. Timers always need a cleanup (EFF-03).
- **No direct DOM APIs at all.** That means no `document.title = …`, no `window.addEventListener`, no `document.querySelector`. A strict grader can count any of them as "metody DOM", which gives 0 points. Use JSX events (`onClick`, `onChange`, `onKeyDown`) and state instead.
- **Polish characters**: save files as UTF-8 (VS Code default).

## Git (seen in the 26.01 sheets – do it only if the sheet asks)
```
cd egzamin
git init
git config user.name "<numer zdającego>"
git config user.email "egzamin@poczta.pl"
git add .                         (the template's .gitignore skips node_modules, dist, .vscode)
git commit -m "Szkielet aplikacji"
... work ...
git add .                         (again: also picks up NEW files, e.g. images; "commit -am" would miss them)
git commit -m "Obsługa formularza"    (at least 2 commits)
git log                           (screenshot it if asked)
```
`spakuj` keeps `.git` inside `web.zip`.

## Screenshots
- The **whole screen** with the **taskbar visible** and the **IDE/terminal visible** next to the app. One screenshot per interaction.
- Names: `web1`, `web2`, … (or what the sheet says), saved in the documentation folder.
- Console output: open F12 → Console **before** clicking, so the log is visible in the shot.
- `Win + Shift + S`, or `PrtSc` → paste into Paint → save as PNG/JPG.

---

## Task phrase → block
| Sheet says… | Block(s) |
|---|---|
| "pole edycyjne", "etykieta", "formularz" | FORM-01, `fg` snippet |
| "pole numeryczne", "numer kursu" | FORM-02 |
| "lista rozwijana", "select", "opcje o wartościach" | FORM-03, FORM-04 |
| "pole wyboru / checkbox zaznaczone domyślnie" | FORM-05 |
| "pole … nieaktywne, gdy zaznaczone" (`disabled`) | FORM-06 |
| "przełączniki", "switch", "kategorie" | FORM-07, STATE-12 |
| "przyciski opcji", "radio", "jedna z" | FORM-08, FORM-09 |
| "pole tekstowe wielowierszowe" | FORM-10 |
| "po kliknięciu wyświetl pod formularzem" | FORM-12, VIEW-01 |
| "sprawdź poprawność", "komunikat" | FORM-13, JS-07, JS-11 |
| "wyczyść pola po dodaniu" | FORM-14 |
| "suwak", "zakres" | FORM-16 |
| "wypisz w konsoli w formacie …" | FORM-14, VIEW-10 |
| "lista numerowana / punktowana z tablicy", "liczba elementów" | LIST-01, LIST-02 |
| "tabela z danych" | LIST-03 |
| "bloki obok siebie: obraz, nagłówek, przycisk" | LIST-04, VIEW-06 |
| "wyświetl tylko …", "warunek", "funkcja renderująca" | LIST-05, LIST-06, LIST-11 |
| "wyszukaj", "filtruj po wpisanym tekście" | LIST-10 |
| "posortuj" | LIST-08 |
| "suma / średnia / min / max" | LIST-09 |
| "licznik", "kliknięcie zwiększa o 1" | STATE-01, STATE-02 |
| "zwiększ pole obiektu w tablicy" (pobrania, polubienia) | STATE-04, STATE-09 |
| "dodaj do listy" | STATE-05 |
| "usuń z listy" | STATE-06 |
| "zaznacz jako wykonane", "kliknięcie przełącza" | STATE-07, STATE-03 |
| "kolor zależny od wartości" | VIEW-03 |
| "styl w pliku CSS", "margines, zaokrąglone rogi" | VIEW-05, VIEW-07 |
| "obraz zależny od wyniku" (kostka) | VIEW-08 |
| "zegar", "co sekundę", "odliczanie" | EFF-03, EFF-04 |
| "zapamiętaj po odświeżeniu" | EFF-06, EFF-07 |
| "losuj", "rzut kostką", "lotto" | JS-01, JS-02, JS-04 |
| "wymieszaj" | JS-03 |
| "generuj hasło" | JS-05 |
| "cena z dwoma miejscami po przecinku" | JS-06 |
| "data dzisiejsza", "liczba dni" | JS-12 |
| "dane z pliku dane.txt" | JS-15 |
