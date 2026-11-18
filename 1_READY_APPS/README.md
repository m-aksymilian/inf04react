# 1_READY_APPS – solved web tasks (React + Bootstrap)

Find the task that looks most like yours and copy its `App.jsx` (+ `App.css`) into `src/` of the exam project.
Each folder has a **README** (task, key checklist, screenshots to take, blocks used).
See one running: `npm run dev` in the repo root → click it in the viewer (or open `?app=<folder>`).

| Folder | Exam | The task in one line | Look here when your task has… |
|---|---|---|---|
| [01_kursy_2022_06](01_kursy_2022_06/) | 22.06 | array → `<ol>` + count, form logs name + course by number | list from an array, number input, `console.log` output |
| [02_film_2023_06](02_film_2023_06/) | 23.06 | form with select (values 1–4) → `console.log("tytul: …; rodzaj: …")` | `<select>` with values, CSS rule in a **file** |
| [03_galeria_2025_01](03_galeria_2025_01/) | 25.01 | photo cards, 3 category switches filter, "Pobierz" +1 | cards from objects, **switches**, filter, **+1 in an object in the array** |
| [04_menedzer_hasel_2026_06](04_menedzer_hasel_2026_06/) | 26.06 | form, checkbox disables the password, summary below | checkbox → `disabled`, text shown after submit |
| [05_rejestracja_konta_PRACTICE](05_rejestracja_konta_PRACTICE/) | practice | e-mail + 2 passwords, one message line | validation with several messages |
| [06_wizyta_weterynarz_PRACTICE](06_wizyta_weterynarz_PRACTICE/) | practice | choosing a species changes the slider's max | one control changes another, range, time input |
| [07_nadaj_przesylke_PRACTICE](07_nadaj_przesylke_PRACTICE/) | practice | radio → image + price after a button, postal code | radio buttons, image from state |
| [08_gra_w_kosci_PRACTICE](08_gra_w_kosci_PRACTICE/) | practice | 5 dice, click locks one, RZUT, sum | random numbers, array of objects, click on image |
| [09_quiz_PRACTICE](09_quiz_PRACTICE/) | practice | questions with radio answers, score, next | index in state, radio cleared, wrap-around |
| [10_notatki_PRACTICE](10_notatki_PRACTICE/) | practice | list of notes + form that adds one | adding to an array from a form |

"PRACTICE" = a mobile/desktop sheet rewritten in React (no official web task like it yet).
Every app follows the key's rules: **one component**, Bootstrap import, `className` / `htmlFor`, `.map` with `key`. They are checked by `npm test`.
