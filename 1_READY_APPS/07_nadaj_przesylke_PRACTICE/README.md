# 07 – PRACTICE "Nadaj Przesyłkę" (INF.04-01-23.06 desktop task in React)

Not an official web task. It trains **radio + button that swaps an image and a price**, and **3-message validation**.
Run: `npm run dev` → `?app=07_nadaj_przesylke_PRACTICE` · Files: `App.jsx` + `App.css`; images `pocztowka.png`, `list.png`, `paczka.png` go in `public/assets/`.

## Task
- `<h1>` **"Nadaj Przesyłkę - <numer>"**.
- Left column:
  - radio group **Pocztówka / List / Paczka** (Pocztówka at start)
  - button **"Sprawdź Cenę"**, image, **"Cena: …"**
  - Prices: 1 zł / 1,5 zł / 10 zł.
  - The image and price change **only after the button**, not when the radio changes.
- Right column:
  - fields "Ulica z numerem", "Kod pocztowy", "Miasto"
  - button **"Zatwierdź"**, which shows:
    - not 5 characters → **"Nieprawidłowa liczba cyfr w kodzie pocztowym"**
    - not only digits → **"Kod pocztowy powinien się składać z samych cyfr"**
    - otherwise → **"Dane przesyłki zostały wprowadzone"**

## Checks
- [ ] The price is empty at start; the image shows the postcard
- [ ] Changing the radio alone does nothing; the button updates the image and price
- [ ] All 3 postal-code messages

## Blocks used
FORM-08 (radio), VIEW-08 (image from state), JS-07 / JS-11 (digit checks).
