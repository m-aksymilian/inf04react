# INF.04 – React (web app) tasks: full requirements

Every web task that has appeared in official INF.04 exams so far, taken from the CKE sheets and their official
grading keys (`arkusze/klucze/`). Exact strings to type are in **"quotes"**; keep the Polish characters.
Sheets: `arkusze/`. Keys: `arkusze/klucze/` (`_zo` = "zasady oceniania"). Materials: `arkusze/materialy/`.

| # | Exam code | Task | Sheet | Key |
|---|---|---|---|---|
| 1 | INF.04-02-22.06-SG | Zapisy na kursy (form + list + console) | `arkusze/inf_04_2022_06_02_SG_kolor.pdf` | `arkusze/klucze/INF_04_2022_06_02_SG_zo.xlsx` |
| 2 | INF.04-03-23.06-SG (and INF.04-01-23.06-SD, identical web part) | Formularz filmu (form + select + console) | `arkusze/inf_04_2023_06_03_SG_kolor.pdf`, `arkusze/inf_04_2023_06_01_SD.pdf` | `arkusze/klucze/INF_04_2023_06_03_SG_zo.xlsx` |
| 3 | INF.04-01-25.01-SG | Kategorie zdjęć (gallery, switches, counters) | `arkusze/inf_04_2025_01_01_SG.pdf` | `arkusze/klucze/inf_04_2025_01_01_SG_zo.pdf` |
| 4 | INF.04-01-26.06-SG | Menedżer haseł (form, checkbox→disabled, summary) | `arkusze/inf_04_2026_06_01_SG.pdf` | `arkusze/klucze/INF_04_2026_06_01_SG_zo.pdf` |

The 2025-01 sheet was a 404 on praktycznyegzamin.pl. It was taken from the TEB Wrocław solutions repo
(github.com/Technikum-TEB-Edukacja-we-Wroclawiu/INF.04-rozwiazania, `_arkusze/2025-01/`), along with all four keys.

---

## Rules common to ALL web tasks (from every grading key)

**Result 3 = 0 points** (the whole web part) if any of these is true:
- the app is not written in React/Angular,
- it uses DOM methods (`document.getElementById`, `querySelector`, …),
- an event is attached as a string, e.g. `onclick="fun()"`, instead of `onClick={fun}`.

**Always checked in the code:**
- **Exactly one component.** Every key says "Aplikacja składa się z jednego komponentu", so put everything in `App`.
- **Bootstrap import:** `import 'bootstrap/dist/css/bootstrap.css';`
- **JSX attributes:** `className`, not `class`; `htmlFor`, not `for`; every tag closed (`<input ... />`, `<img ... />`, `<br />`).
- **Labels:** every input has a `<label htmlFor="x">` tied to `id="x"`. Ids must be meaningful (`imieNazwisko`, `tytul`). `exampleInputEmail1`, `input1` and `x` are not accepted.
- **Form layout:** `<div className="form-group">` + `<input className="form-control">`. Bootstrap 5 ignores `form-group`, but the key looks for it, so write it anyway and add `mb-3` / `m-4` for real spacing.
- **Initial state:** form fields are empty (or exactly as the illustration shows).
- **Arrays:** lists are generated with a loop (`.map`) and must work for any array length. Never hard-code `<li>` elements.
- **Readable code:** one statement per line, spaces around operators, consistent braces, indentation, meaningful Polish/English names. "Dopuszcza się literówki", so small typos in displayed texts are tolerated (2023 key), but copy the texts exactly anyway.

**Deliverables** (folder names change every year, so copy them from the sheet):
```
<numer zdającego>\
    konsola | konsolowa\        konsola.zip + modified source + .exe
    web | webowa\               web.zip (whole project folder) + modified source files copied OUT of the zip
    dokumentacja | testy\       screenshots konsola1.., web1.. + file "egzamin"
```
- After zipping, leave only the archive, the modified source files and the executable (if any) in the subfolder. 2022, 2023 and 2025 state this explicitly.
- **Screenshots:**
  - Show the WHOLE screen with the taskbar visible.
  - Show the running app together with the IDE/terminal ("widoczne jest środowisko").
  - Take one screenshot per interaction.
  - Name them `web1`, `web2`, … (2023 SD also mentions `konsola.jpg` / `web.jpg`).
- **"egzamin" document:**
  - Contents: OS name, IDE names, programming languages (and frameworks/libraries: React, Bootstrap).
  - 2022–2025: an office text-editor document with signed screenshots. 2026: a plain text file.
- **Documentation comment:** in every year it is required in the **console** app only:
  - a function/method header (2022, 2025, 2026) or a class header (2023), with `autor: <numer zdającego>`;
  - the web app has never needed one.

---

## 1. INF.04-02-22.06-SG – "Zapisy na kursy"

**Folders:** `konsola`, `web`, `testy` (screenshots + egzamin go to **testy**).
**Materials:** none.

### Data
- An array of course names in the component:
  `["Programowanie w C#", "Angular dla początkujących", "Kurs Django"]`.
- "The array may change in the future". Everything must follow its contents and length.

### Layout (top → bottom, Bootstrap; Illustration 1b looks like `container`)
1. `<h2>` **"Liczba kursów: <liczba>"**, where `<liczba>` is the array length (`kursy.length`).
2. A numbered list `<ol>` generated automatically from all array elements (`.map` → `<li>`).
3. A form:
   - text input with label **"Imię i nazwisko:"**
   - **number** input (`type="number"`) with label **"Numer kursu:"**
   - button **"Zapisz do kursu"** (`btn btn-primary`)
4. The fields are empty at start.

### Logic
- Submitting the form fires a **submit** event (`onSubmit` on `<form>`, with `e.preventDefault()`), which `console.log`s:
  1. the value typed in the first field (name);
  2. the course name for the typed number (1-based: 1 → first course) if it exists, otherwise **"Nieprawidłowy numer kursu"**.

### Key checks (R.3)
- One component with the declared `kursy` array.
- Labels tied to fields; `form-group` + `form-control`; `className` / `htmlFor`.
- `h2` uses `kursy.length`, and the list references the array.
- `<ol>` prints all elements for any array size, e.g. `kursy.map(kurs => <li key={kurs}>{kurs}</li>)`.
- A submit handler (`onSubmit`) reads the field values in a React way (state or ref).
- Button `btn btn-primary`.
- Run: the name is logged; numbers 1–3 → course name; anything else → the message.

### Screenshots
web1… covering:
- the initial state;
- the filled form;
- the console after submitting with a **valid** number;
- the console after submitting with an **invalid** number.

---

## 2. INF.04-03-23.06-SG / INF.04-01-23.06-SD – "Formularz filmu"

**Folders:** `konsola`, `web`, `dokumentacja`.
**Materials:** none.

### Layout
One form component:
- text input with label **"Tytuł filmu"**
- dropdown `<select>` with label **"Rodzaj"** and exactly 5 options:
  - empty (`value=""`)
  - **Komedia** `value="1"`
  - **Obyczajowy** `value="2"`
  - **Sensacyjny** `value="3"`
  - **Horror** `value="4"`
- button **"Dodaj"** (`btn btn-primary`)
- At start both fields are empty.

### Styling
- **`body { padding: 20px; }` in the app's CSS file.** The key checks that it is in a CSS file (`App.css` / `index.css`), not inline.
- Bootstrap `form-group` + `form-control` on the input **and** on the select (Bootstrap 5: add `form-select` as well to get the arrow).

### Logic
- Clicking "Dodaj" fires an event that writes the form data to the browser console, in React format:
  **`tytul: <tytuł>; rodzaj: <wartość>`**, e.g. `tytul: Vinci; rodzaj: 1`.
  - `rodzaj` is the option **value** (number), not its text.
- Use `e.preventDefault()`: the sheet's screenshot shows the page reloading with `?tytul=&kategoria=` in the URL.

### Key checks (R.3)
- One component with form, input, select and the "Dodaj" button.
- Labels tied to fields; `form-group` / `form-control`; meaningful `for` / `id` (not `exampleInputEmail1`).
- `body { padding: 20px; }` in the CSS file.
- Button `btn btn-primary`.
- Select has 5 options, the first one empty, the rest valued 1–4.
- A submit/click handler exists.
- Runs without errors and the fields start empty.
- Console shows `tytul: ...; rodzaj: ...`.

### Screenshots
`web1`, `web2`… (filled form + console with the output).

---

## 3. INF.04-01-25.01-SG – "Kategorie zdjęć" (gallery)

**Folders:** `konsolowa`, `webowa`, `dokumentacja`.

**Materials:**
- `pliki3.zip` on the desktop, password **`K@tegorie)`** (the `)` is part of it).
- It contains images `obraz1.jpg`…`obraz12.jpg` and `dane.txt`. A copy is in `Desktop\pliki3\`.
- Put the images in **`egzamin/public/assets`** (or `src/assets`).
- Copy the objects from `dane.txt` as array elements. Each object has these fields:
  - `id`
  - `alt`
  - `filename`
  - `category` (1 = kwiaty, 2 = zwierzęta, 3 = samochody)
  - `downloads`

### Layout (Illustration 2: 3 columns of photos, any order)
1. `<h1>` **"Kategorie zdjęć"**.
2. Three **switches** (checkbox), **on by default**, with labels **Kwiaty**, **Zwierzęta**, **Samochody**. They sit inline in one row (`form-check form-switch form-check-inline`).
3. Photo blocks displayed **side by side**. Each block contains:
   - `<img>` (src from `filename`, alt from `alt`)
   - `<h4>` **"Pobrań: <downloads>"**
   - button **"Pobierz"** (`btn btn-success`)

### Styling
- Images: **outer margin 5 px, rounded corners**. Use CSS `margin: 5px; border-radius: …` or the Bootstrap class `rounded`.
- Switch markup (Table 1):
  ```html
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="ctrId">
    <label class="form-check-label" for="ctrId">My label</label>
  </div>
  ```

### Logic
- At start all switches are on, so all photos show.
- Only photos whose category switch is on are shown.
- Clicking "Pobierz" increments that photo's `downloads` by one **in the array of photo objects** (state), and the screen updates immediately.
- Displaying the blocks must use **loops and conditions**. The app must be universal and work for any number of photos.

### Key checks (R.3) – very specific
1. One component with h1, three switches/checkboxes checked, at least one img, h4, the "Pobierz" button, and the array of objects from dane.txt.
2. Bootstrap included. The img has `margin: 5px` and rounded corners (`border-radius` or `rounded`).
3. Button `btn btn-success`. At least one switch is built as `form-check form-switch` (optionally `form-check-inline`) with an input + label pair. `className`, closed tags.
4. A **loop over the gallery** (`zdjecia.map(zdjecie => ...)`) generates the img and the h4 from object fields: `src={...zdjecie.filename}`, `alt={zdjecie.alt}`, `Pobrań: {zdjecie.downloads}`.
5. A **condition** checks the switch / category. For React the key literally says: "funkcja renderująca, w której znajduje się warunek i instrukcja return, która odpowiednio zwraca kod wyświetlający obrazek". So write a render function containing an `if` and a `return` of the image block.
6. A click event on the button is handled in code (`onClick={() => pobierz(...)}`).
7. **At least one function runs when a switch changes** (`onChange={zmienKwiaty}`).
8. Runs without errors, with all switches on and all images shown at start.
9. Photos depend on the switches.
10. The button increments the counter, the change shows on the page, and it is saved in the array for the right object.

### Screenshots
web1…:
- the initial state;
- different switch combinations;
- the "Pobierz" button working.

---

## 4. INF.04-01-26.06-SG – "Menedżer haseł" (newest, June 2026)

**Folders:** `konsolowa`, `webowa`, `dokumentacja`.

**Materials:**
- `Web1.7z` on the desktop, password **`*LoGiny&H@sla8`**.
- It contains `szablon.html` with the Bootstrap form HTML to convert to JSX.
- `znaki.txt` is for the console part.

### Layout (Illustration 1) – one component, two blocks
**Block 1**
- `<h1>` **"Menedżer haseł - wykonał <numer zdającego>"**
- A form, each field in `form-group m-4`:
  - **"Adres WWW:"**: text input, placeholder **"Adres strony WWW"**
  - **"Login:"**: text input, placeholder **"Twój login"**
  - checkbox **"Wygeneruj hasło"**, **checked by default**
  - **"Hasło:"**: `type="password"` (hides characters); **disabled while the checkbox is checked**, enabled when unchecked
  - button **"Zapisz"**, blue → `btn btn-primary`

**Block 2** (filled after submitting the form): three paragraphs, each with padding 0.5 rem = **`p-2`**.
- The 1st paragraph is also blue and "lead": **`text-primary lead`**.
- Texts:
  1. **"Adres: <adres>"**
  2. **"Login: <login>"**
  3. checkbox checked → **"Hasło automatycznie generowane"**; unchecked → **"Hasło: <hasło>"**
- Initial state (Illustration 1): the paragraphs are visible but empty: "Adres:", "Login:", "Hasło automatycznie generowane".
  - So keep a separate "saved" state, initialised to empty strings with the checkbox flag = true.
  - On submit, copy the form values into it.

### Bootstrap utilities given in Table 1
- `m-*` / `p-*` sizes:

  | Size | Value |
  |---|---|
  | 0 | 0 |
  | 1 | .25rem |
  | 2 | .5rem |
  | 3 | 1rem |
  | 4 | 1.5rem |
  | 5 | 3rem |

- Text colours: `text-primary`, `text-success`, `text-danger`.
- Other classes: `text-start`, `text-nowrap`, `lead`, `text-capitalize`.

### Key checks (R.3)
1. One component: h1, form, **three edit fields**, checkbox, "Zapisz" button, **three paragraphs**. At least one field has a `placeholder`. The password field is `type="password"`.
2. Bootstrap included. Button at least `btn btn-primary`. First paragraph at least `lead text-primary`.
3. Labels tied to fields with `htmlFor` + Bootstrap formatting, e.g. `<div className="form-group m-4"><label htmlFor="adres">…</label><input id="adres" className="form-control" … /></div>`. `className`, closed tags.
4. The checkbox state is bound to the password field (`disabled={generujHaslo}`).
5. A submit function is attached with `onSubmit` (or `onClick`).
6. Runs without errors; the initial layout matches Illustration 1 (screenshot).
7. At start the checkbox is checked and the password is disabled. Unchecking enables it; checking again disables it.
8. Checked + address + login + Zapisz → below the button: address, login and "Hasło automatycznie generowane".
9. Unchecked + address + login + password + Zapisz → address, login and the password.

### Screenshots
web1…:
- the initial state;
- an interaction with the checkbox checked;
- an interaction with the checkbox unchecked.

**egzamin** = plain **text file** this year.
**R.4.9:** both projects zipped, and the modified files placed **outside** the archives.

---

## Patterns seen across the 4 tasks (what to expect next)

| Pattern | 2022 | 2023 | 2025 | 2026 |
|---|:-:|:-:|:-:|:-:|
| Form with text input + label/htmlFor + form-group/form-control | ✔ | ✔ | | ✔ |
| Number input / select with values / checkbox / switch | number | select | switch | checkbox |
| `onSubmit` + `preventDefault` | ✔ | ✔ | | ✔ |
| Output to `console.log` in an exact format | ✔ | ✔ | | |
| Output rendered on the page from saved state | | | ✔ | ✔ |
| Array → `.map` (list / cards), works for any length | ✔ | | ✔ | |
| Condition on a switch/checkbox (filter, disabled, ternary text) | | | ✔ | ✔ |
| Immutable update of an object in an array (counter +1) | | | ✔ | |
| CSS file rule required (`body{padding:20px}`, img margin/radius) | | ✔ | ✔ | |
| Materials archive with password (images, data, HTML template) | | | ✔ | ✔ |
| Button class | primary | primary | success | primary |

---

## Practice tasks (mobile/desktop sheets rewritten as React web apps)

These are NOT official web tasks. They are mobile (Android) or desktop sheets solved in React, to train the
patterns a future web task might use. Each folder in `1_READY_APPS/` has a README with the spec and checks.

| Folder | Source sheet | Patterns trained |
|---|---|---|
| `05_rejestracja_konta_PRACTICE` | INF.04-01-21.06 / 22.01 (mobile) | validation, one message area with 3 texts |
| `06_wizyta_weterynarz_PRACTICE` | INF.04-02-24.01 (mobile) | select changes slider max, range, time input, summary joined with ", " |
| `07_nadaj_przesylke_PRACTICE` | INF.04-01-23.06 (desktop) | radio + button swaps image/price, postal-code validation |
| `08_gra_w_kosci_PRACTICE` | INF.04-01-26.01 (mobile) | array of objects in state, random, click image toggles flag, loop sum |
| `09_quiz_PRACTICE` | INF.04-02-26.01 (mobile) | question array, index in state, radio cleared, wrap-around, score |
| `10_notatki_PRACTICE` | INF.04-02-26.06 (mobile) | list from state array, form appends a new object |
