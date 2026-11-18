# 3_EXAM_TEMPLATE – clean exam project

`egzamin/` is an empty Vite 6 + React 19 + Bootstrap 5.3 project:
- `src/App.jsx`: one component with a form and `onSubmit` + `preventDefault`;
- `src/App.css`: empty;
- `public/assets/`: for the images;
- no default Vite `index.css` (it would break the Bootstrap look).

You normally don't copy it by hand: `4_TOOLS\nowy-projekt.bat <numer>` copies it into the exam folder **together with node_modules**, so it runs offline with no `npm install`.

## Without the tool (needs internet)
```
npm create vite@latest egzamin -- --template react
cd egzamin
npm i bootstrap
```
Then delete `import './index.css'` from `src/main.jsx` and clear `App.css`.
