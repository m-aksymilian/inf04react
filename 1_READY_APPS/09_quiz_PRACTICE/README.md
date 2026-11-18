# 09 – PRACTICE "Quiz" (góry) (INF.04-02-26.01 mobile task in React)

Not an official web task. It trains an **array of question objects**, an **index in state**, a **radio group cleared on "next"**, wrap-around and a score.
Run: `npm run dev` → `?app=09_quiz_PRACTICE`.
Files: `App.jsx` + `App.css`. Images `zad1..zad3.jpg` go in `public/assets/` (zad2.7z, password `?Quiz5`). Questions: `pytania.txt`.

## Task
- Image + question + 3 radio answers, built from the current question object.
- **DALEJ**:
  - +1 point if the chosen answer is correct;
  - `console.log("Punkty: N")`;
  - go to the next question, and after the last one back to the first;
  - clear the radio choice.

## Checks
- [ ] Each question shows the right image and answers
- [ ] The score counts only correct answers; the console line has the exact format
- [ ] Wraps around after question 3; no radio is selected after DALEJ

## Blocks used
FORM-09 (radio from array), STATE-02 (score), LIST-02 (map with index).
