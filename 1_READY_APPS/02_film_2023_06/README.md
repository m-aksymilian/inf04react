# 02 – INF.04-03-23.06-SG / INF.04-01-23.06-SD "Formularz filmu"

Sheets: `arkusze/inf_04_2023_06_03_SG_kolor.pdf`, `arkusze/inf_04_2023_06_01_SD.pdf` · Key: `arkusze/klucze/INF_04_2023_06_03_SG_zo.xlsx`
Run: `npm run dev` → `?app=02_film_2023_06` · Exam: copy `App.jsx` + `App.css` to `src/`.
Folders that year: `konsola`, `web`, `dokumentacja`.

## Task
- One form:
  - text input **"Tytuł filmu"**
  - select **"Rodzaj"** with 5 options: empty `""`, Komedia `1`, Obyczajowy `2`, Sensacyjny `3`, Horror `4`
  - button **"Dodaj"** (`btn btn-primary`)
  - Both fields are empty at start.
- **`body { padding: 20px; }` in the CSS FILE.** The key checks the file, not an inline style.
- On click/submit, `console.log` **`tytul: <tytuł>; rodzaj: <value>`**, e.g. `tytul: Vinci; rodzaj: 1`. Use `preventDefault`.

## Key checks
- [ ] One component: form + input + select + "Dodaj"
- [ ] Labels: `htmlFor` + meaningful ids (not `exampleInputEmail1`); `form-group` / `form-control` on both fields (+ `form-select` for the arrow)
- [ ] `body { padding: 20px; }` in `App.css`, imported in App.jsx
- [ ] Select: 5 options, the first empty, values 1–4
- [ ] Handler exists; runs without errors; fields start empty
- [ ] Console: `tytul: ...; rodzaj: ...` with the **value**, not the text

## Screenshots
web1 = filled form, web2 = console output (whole screen, taskbar + IDE visible).

## Blocks used
FORM-03 (select with fixed options), FORM-14 (log in this format), VIEW-05 (rule in a CSS file).
