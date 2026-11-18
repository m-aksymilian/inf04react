// PRACTICE (not an official web task): "Gra w kości" - INF.04-01-26.01 mobile task rewritten for React.
// Patterns: array of objects in state, random numbers, click on image toggles a flag (opacity), sum with a loop.
// Copy to src/App.jsx + App.css. Images kosc0.png..kosc6.png -> public/assets/ (zad1.7z, password @Kosc6).
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const liczbaKosci = 5;

  // each die: number of dots (0 = not thrown yet) and whether it takes part in the next throw
  const [kosci, setKosci] = useState(
    Array.from({ length: liczbaKosci }, () => ({ oczka: 0, dostepna: true }))
  );

  function losujOczka() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rzut() {
    setKosci(kosci.map((kosc) => (kosc.dostepna ? { ...kosc, oczka: losujOczka() } : kosc)));
  }

  function przelaczKosc(indeks) {
    setKosci(kosci.map((kosc, i) => (i === indeks ? { ...kosc, dostepna: !kosc.dostepna } : kosc)));
  }

  let suma = 0;
  for (const kosc of kosci) {
    suma += kosc.oczka;
  }

  return (
    <div className="gra">
      <div>
        {kosci.map((kosc, indeks) => (
          <img
            key={indeks}
            src={`/assets/kosc${kosc.oczka}.png`}
            alt={`Kość ${indeks + 1}: ${kosc.oczka}`}
            className={kosc.dostepna ? 'kosc' : 'kosc niedostepna'}
            onClick={() => przelaczKosc(indeks)}
          />
        ))}
      </div>
      <button type="button" className="btn btn-dark przycisk" onClick={rzut}>RZUT</button>
      <p className="wynik">{suma}</p>
    </div>
  );
}

export default App;
