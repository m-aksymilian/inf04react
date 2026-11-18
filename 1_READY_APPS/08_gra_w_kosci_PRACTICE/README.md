# 08 – PRACTICE "Gra w kości" (INF.04-01-26.01 mobile task in React)

Not an official web task. It trains an **array of objects in state**, **random numbers**, **clicking an image to toggle a flag**, and a **sum with a loop**.
Run: `npm run dev` → `?app=08_gra_w_kosci_PRACTICE`.
Files: `App.jsx` + `App.css`. Images `kosc0.png..kosc6.png` go in `public/assets/` (from zad1.7z, password `@Kosc6`).

## Task
- 5 dice, each showing `kosc0.png` (not thrown) at start. The sum is 0.
- **RZUT** → every *available* die gets a random value 1–6.
- Clicking a die toggles whether it takes part in the next throw. A locked die gets an `opacity` class.
- The paragraph shows the sum of all dice, computed with a loop.

## Checks
- [ ] Start: 5 × kosc0, sum 0
- [ ] A locked die keeps its value after RZUT
- [ ] Sum = total of the shown dice

## Blocks used
JS-01 (random), STATE-07 (toggle a flag in an item), STATE-04 (map update), LIST-14 (Array.from), VIEW-08 (image from a number).
