# 06 – PRACTICE "Wizyta u weterynarza" (INF.04-02-24.01 mobile task in React)

Not an official web task. It trains **one control changing another** and a **summary line**.
Run: `npm run dev` → `?app=06_wizyta_weterynarz_PRACTICE` · Files: `App.jsx` + `App.css`.

## Task
- Heading **"Wizyta u weterynarza"**.
- Fields:
  - text with placeholder "Imię i nazwisko właściciela..."
  - a list (select with `size`) of species, each with a max age: Pies 18, Kot 20, Świnka morska 9
  - slider **"Ile ma lat?"** with its value shown next to it; its **max follows the chosen species**
  - text "Cel wizyty"
  - time input **"Czas wizyty"** (16:00 at start)
- **OK** → paragraph `właściciel, gatunek, wiek, cel, czas` (joined with ", ").

## Checks
- [ ] Choosing a species changes the slider max (and clamps the current value)
- [ ] The slider value is shown live
- [ ] The summary contains all 5 fields joined with commas
- [ ] The two placeholder-only fields have no visible label (like the mobile original). In a web exam, also add `<label htmlFor>` (it can be `className="visually-hidden"`), because every web key checks labels.

## Blocks used
FORM-04 (select from array), FORM-16 (range), FORM-18 (time/date inputs), LIST-07 (find).
