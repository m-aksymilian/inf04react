# 10 – PRACTICE "Notatki" (INF.04-02-26.06 mobile task in React)

Not an official web task. It trains a **list from a state array** and a **form that ADDS an object to it**.
Run: `npm run dev` → `?app=10_notatki_PRACTICE` · Files: `App.jsx` + `App.css`.

## Task
- Heading **"Notatki"**.
- A list of notes (`tytuł: treść`). There is one note at start: "Zakupy: Chleb, mleko, masło".
- Heading **"Dodanie notatki"**, then fields "Tytuł notatki:" and "Treść notatki:", then button **DODAJ**.
- DODAJ appends a new note (new object, spread) and clears the fields.

## Checks
- [ ] One note at start
- [ ] DODAJ appends to the end of the list without mutating the array; the fields are cleared

## Blocks used
STATE-05 (add to array), LIST-02 / LIST-03 (render list), FORM-14 (clear after submit).
