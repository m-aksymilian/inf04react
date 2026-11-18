// PRACTICE (not an official web task): "Quiz" (góry) - INF.04-02-26.01 mobile task rewritten for React.
// Patterns: array of question objects, index in state, radio group cleared on "next", wrap-around, score.
// Copy to src/App.jsx + App.css. Images zad1.jpg..zad3.jpg -> public/assets/ (zad2.7z, password ?Quiz5).
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  // copied from pytania.txt
  const pytania = [
    {
      tresc: 'Które to schronisko?',
      odpowiedzi: ['Na Rysiance.', 'Na Wielkiej Raczy.', 'Na Wielkiej Rycerzowej.'],
      poprawna: 'Na Wielkiej Raczy.',
      obraz: 'zad1.jpg',
    },
    {
      tresc: 'Zwierzę na zdjęciu to',
      odpowiedzi: ['owczarek.', 'wilk.', 'kozica.'],
      poprawna: 'owczarek.',
      obraz: 'zad2.jpg',
    },
    {
      tresc: 'W oddali są widoczne',
      odpowiedzi: ['Himalaje.', 'Alpy.', 'Tatry.'],
      poprawna: 'Tatry.',
      obraz: 'zad3.jpg',
    },
  ];

  const [numerPytania, setNumerPytania] = useState(0);
  const [wybranaOdpowiedz, setWybranaOdpowiedz] = useState('');
  const [punkty, setPunkty] = useState(0);

  const pytanie = pytania[numerPytania];

  function dalej() {
    let nowePunkty = punkty;
    if (wybranaOdpowiedz === pytanie.poprawna) {
      nowePunkty = punkty + 1;
      setPunkty(nowePunkty);
    }
    console.log(`Punkty: ${nowePunkty}`);

    if (numerPytania + 1 < pytania.length) {
      setNumerPytania(numerPytania + 1);
    } else {
      setNumerPytania(0);
    }
    setWybranaOdpowiedz('');
  }

  return (
    <div className="quiz">
      <img src={`/assets/${pytanie.obraz}`} alt={pytanie.tresc} />
      <p className="pytanie">{pytanie.tresc}</p>
      <div className="odpowiedzi">
        {pytanie.odpowiedzi.map((odpowiedz, indeks) => (
          <div className="form-check" key={odpowiedz}>
            <input
              className="form-check-input"
              type="radio"
              name="odpowiedz"
              id={`odpowiedz${indeks}`}
              checked={wybranaOdpowiedz === odpowiedz}
              onChange={() => setWybranaOdpowiedz(odpowiedz)}
            />
            <label className="form-check-label" htmlFor={`odpowiedz${indeks}`}>{odpowiedz}</label>
          </div>
        ))}
      </div>
      <div>
        <button type="button" className="btn btn-light" onClick={dalej}>DALEJ</button>
      </div>
    </div>
  );
}

export default App;
