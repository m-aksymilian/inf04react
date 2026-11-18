# 04 – INF.04-01-26.06-SG "Menedżer haseł"

Sheet: `5_ARKUSZE/inf_04_2026_06_01_SG.pdf` · Key: `5_ARKUSZE/klucze/INF_04_2026_06_01_SG_zo.pdf`
Run: `npm run dev` → `?app=04_menedzer_hasel_2026_06`.
Exam: copy `App.jsx` to `src/`; no CSS file. **Put your number in the h1.**
Materials: `Web1.7z` (password **`*LoGiny&H@sla8`**) holds `szablon.html` (copy here: `szablon.txt`), which you convert to JSX.
Folders that year: `konsolowa`, `webowa`, `dokumentacja`. **egzamin** = a plain text file.

## Task
**Block 1**
- `<h1>` **"Menedżer haseł - wykonał <numer>"**
- A form; every field in `form-group m-4`:
  - **"Adres WWW:"**: text, placeholder **"Adres strony WWW"**
  - **"Login:"**: text, placeholder **"Twój login"**
  - checkbox **"Wygeneruj hasło"**, **checked** at start
  - **"Hasło:"**: `type="password"`, **disabled while the checkbox is checked**
  - **"Zapisz"** (`btn btn-primary`)

**Block 2**: 3 paragraphs, each `p-2`; the first is also `text-primary lead`.
- **"Adres: …"**
- **"Login: …"**
- **"Hasło automatycznie generowane"** if the checkbox was checked, otherwise **"Hasło: …"**
- At start: "Adres:", "Login:", "Hasło automatycznie generowane". So keep a separate *saved* state and copy the form into it on submit.

## Key checks
- [ ] One component; 3 edit fields + checkbox + Zapisz + 3 paragraphs; a placeholder; password `type="password"`
- [ ] `btn btn-primary`; first paragraph `lead text-primary`
- [ ] `form-group m-4` + `label htmlFor` + `form-control`; `className`; closed tags
- [ ] `disabled={generujHaslo}`
- [ ] `onSubmit` handler
- [ ] Start: checkbox checked, password disabled; toggling enables/disables it
- [ ] Checked → address, login, "Hasło automatycznie generowane"; unchecked → "Hasło: <hasło>"

## Screenshots
1. Initial state
2. Interaction with the checkbox **checked**
3. Interaction with the checkbox **unchecked**

## Blocks used
FORM-06 (checkbox → disabled), FORM-12 (snapshot on submit), VIEW-01 (ternary text).
