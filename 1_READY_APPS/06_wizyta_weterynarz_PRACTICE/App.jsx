// PRACTICE (not an official web task): "Wizyta u weterynarza" - INF.04-02-24.01 mobile task rewritten for React.
// Patterns: list choice changes another control (slider max), range slider bound to text, time input,
// summary of all fields joined with commas. Copy to src/App.jsx + App.css.
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const gatunki = [
    { nazwa: 'Pies', maksymalnyWiek: 18 },
    { nazwa: 'Kot', maksymalnyWiek: 20 },
    { nazwa: 'Świnka morska', maksymalnyWiek: 9 },
  ];

  const [wlasciciel, setWlasciciel] = useState('');
  const [gatunek, setGatunek] = useState('');
  const [maksymalnyWiek, setMaksymalnyWiek] = useState(20);
  const [wiek, setWiek] = useState(0);
  const [celWizyty, setCelWizyty] = useState('');
  const [czas, setCzas] = useState('16:00');
  const [podsumowanie, setPodsumowanie] = useState('');

  function wybierzGatunek(nazwa) {
    setGatunek(nazwa);
    const wybrany = gatunki.find((g) => g.nazwa === nazwa);
    setMaksymalnyWiek(wybrany.maksymalnyWiek);
    if (wiek > wybrany.maksymalnyWiek) {
      setWiek(wybrany.maksymalnyWiek);
    }
  }

  function zatwierdz(e) {
    e.preventDefault();
    setPodsumowanie(`${wlasciciel}, ${gatunek}, ${wiek}, ${celWizyty}, ${czas}`);
  }

  return (
    <div className="aplikacja">
      <h1 className="tytul">Wizyta u weterynarza</h1>
      <form onSubmit={zatwierdz}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            id="wlasciciel"
            placeholder="Imię i nazwisko właściciela..."
            value={wlasciciel}
            onChange={(e) => setWlasciciel(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="gatunek">Gatunek</label>
          <select
            className="form-control"
            id="gatunek"
            size={gatunki.length}
            value={gatunek}
            onChange={(e) => wybierzGatunek(e.target.value)}
          >
            {gatunki.map((g) => (
              <option key={g.nazwa} value={g.nazwa}>{g.nazwa}</option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3 d-flex align-items-center gap-2">
          <label htmlFor="wiek" className="text-nowrap">Ile ma lat?</label>
          <span>{wiek}</span>
          <input
            type="range"
            className="form-range"
            id="wiek"
            min="0"
            max={maksymalnyWiek}
            step="1"
            value={wiek}
            onChange={(e) => setWiek(Number(e.target.value))}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            id="celWizyty"
            placeholder="Cel wizyty"
            value={celWizyty}
            onChange={(e) => setCelWizyty(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="czas">Czas wizyty</label>
          <input
            type="time"
            className="form-control"
            id="czas"
            value={czas}
            onChange={(e) => setCzas(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">OK</button>
      </form>
      <p className="mt-3">{podsumowanie}</p>
    </div>
  );
}

export default App;
