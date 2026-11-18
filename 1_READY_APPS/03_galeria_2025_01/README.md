# 03 – INF.04-01-25.01-SG "Kategorie zdjęć"

Sheet: `arkusze/inf_04_2025_01_01_SG.pdf` · Key: `arkusze/klucze/inf_04_2025_01_01_SG_zo.pdf`
Run: `npm run dev` → `?app=03_galeria_2025_01`.
Exam: copy `App.jsx` + `App.css` to `src/`. Put the images `obraz1..12.jpg` from `pliki3.zip` (password **`K@tegorie)`**) in `public/assets/`.
Folders that year: `konsolowa`, `webowa`, `dokumentacja`.

## Task
- `<h1>` **"Kategorie zdjęć"**.
- Three inline switches, **on at start**: **Kwiaty**, **Zwierzęta**, **Samochody** (`form-check form-switch form-check-inline`).
- One block per photo, side by side:
  - `<img>`: src from `filename`, alt from `alt`; **margin 5px + rounded corners**
  - `<h4>` **"Pobrań: N"**
  - button **"Pobierz"** (`btn btn-success`)
- Show a photo only if the switch for its `category` (1 kwiaty, 2 zwierzęta, 3 samochody) is on.
- "Pobierz" → `downloads + 1` **in the state array**, for that object only.
- The array comes from `dane.txt` (`dane.txt` in this folder).

## Key checks (very literal)
- [ ] One component: h1, 3 checked switches, img, h4, "Pobierz", the array from dane.txt
- [ ] Bootstrap; img `margin: 5px` + `border-radius` (or `rounded`)
- [ ] `btn btn-success`; at least one `form-check form-switch` with input + label
- [ ] **Loop**: `zdjecia.map(...)` builds the img and h4 from the object fields
- [ ] **Condition** in a render function with `if` + `return` (the key's wording). See LIST-06.
- [ ] `onClick` on the button; `onChange` function(s) on the switches
- [ ] At start everything is on and all 12 photos show; the switches filter; +1 shows and is saved in the array

## Screenshots
1. Initial state
2. A few switch combinations
3. "Pobierz" working (counter changed)

## Blocks used
FORM-07 (switches), LIST-04 (cards), LIST-06 (if + return inside map), STATE-04 (+1 in an object in the array), STATE-12 (flags object), VIEW-07 (public/assets images).
