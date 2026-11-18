# 01 – INF.04-02-22.06-SG "Zapisy na kursy"

Sheet: `arkusze/inf_04_2022_06_02_SG_kolor.pdf` · Key: `arkusze/klucze/INF_04_2022_06_02_SG_zo.xlsx`
Run: `npm run dev` → `?app=01_kursy_2022_06` · Exam: copy `App.jsx` to `src/App.jsx` (no CSS file needed).
Folders that year: `konsola`, `web`, `testy` (screenshots + egzamin go to **testy**).

## Task
- Array in the component: `["Programowanie w C#", "Angular dla początkujących", "Kurs Django"]` (it "may change"). Everything has to follow the array.
- `<h2>` **"Liczba kursów: N"**, where N = `kursy.length`.
- `<ol>` generated from the array.
- A form:
  - text input **"Imię i nazwisko:"**
  - number input **"Numer kursu:"**
  - button **"Zapisz do kursu"** (`btn btn-primary`).
  - The fields are empty at start.
- On submit (`onSubmit` + `preventDefault`), `console.log`:
  1. the name;
  2. the course for number 1..N, otherwise **"Nieprawidłowy numer kursu"**.

## Key checks
- [ ] One component, with the `kursy` array declared in it
- [ ] `label htmlFor` = input `id`; `form-group` + `form-control`; `className`; closed tags
- [ ] `h2` uses `kursy.length`
- [ ] `<ol>` uses `.map` (works for any length)
- [ ] `onSubmit` handler reads the values from state
- [ ] `btn btn-primary`
- [ ] The console shows the name and the course, or the message for 0, 4, -1 and an empty field

## Screenshots (web1, web2…)
1. Initial state
2. Filled form
3. Console after a **valid** number
4. Console after an **invalid** number

## Blocks used
LIST-01 (length + ol), FORM-01 (text + submit), FORM-02 (number → Number → index).
