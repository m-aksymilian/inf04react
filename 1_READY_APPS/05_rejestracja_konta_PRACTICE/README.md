# 05 – PRACTICE "Rejestruj konto" (INF.04-01-21.06 / 22.01 mobile task in React)

Not an official web task. It trains **validation with one message area**.
Run: `npm run dev` → `?app=05_rejestracja_konta_PRACTICE` · Files: `App.jsx` + `App.css`.

## Task
- Heading **"Rejestruj konto"**.
- Fields:
  - **"Podaj e-mail:"** (placeholder "email")
  - **"Podaj hasło:"** (password)
  - **"Powtórz hasło:"** (password)
- Button **"ZATWIERDŹ"**.
- The paragraph under the button shows **"Autor: <numer>"** at start. After the button it shows:
  - no `@` in the e-mail → **"Nieprawidłowy adres e-mail"**
  - the passwords differ → **"Hasła się różnią"**
  - otherwise → **"Witaj <email>"**

## Checks
- [ ] Message area starts with the author
- [ ] All 3 messages are reachable; the order of the checks is e-mail first, then passwords

## Screenshots
Initial state · bad e-mail · different passwords · success.

## Blocks used
FORM-13 (validation message), JS-11 (validators).
