// PRACTICE (not an official web task): "Notatki" - INF.04-02-26.06 mobile task rewritten for React.
// Patterns: list rendered from a state array, form that ADDS a new object to the array.
// Copy to src/App.jsx + App.css.
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [notatki, setNotatki] = useState([
    { id: 1, tytul: 'Zakupy', tresc: 'Chleb, mleko, masło', wazna: true },
  ]);
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');

  function dodajNotatke(e) {
    e.preventDefault();
    const nowaNotatka = { id: Date.now(), tytul: tytul, tresc: tresc, wazna: false };
    setNotatki([...notatki, nowaNotatka]);
    setTytul('');
    setTresc('');
  }

  return (
    <div className="aplikacja">
      <h1 className="niebieski">Notatki</h1>
      <ul className="list-group mb-3">
        {notatki.map((notatka) => (
          <li className="list-group-item" key={notatka.id}>
            <strong>{notatka.tytul}</strong>: {notatka.tresc}
          </li>
        ))}
      </ul>

      <h2 className="niebieski fs-4">Dodanie notatki</h2>
      <form onSubmit={dodajNotatke}>
        <div className="form-group mb-2">
          <label htmlFor="tytul">Tytuł notatki: </label>
          <input type="text" className="form-control" id="tytul" value={tytul}
            onChange={(e) => setTytul(e.target.value)} />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="tresc">Treść notatki: </label>
          <input type="text" className="form-control" id="tresc" value={tresc}
            onChange={(e) => setTresc(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-light niebieski">DODAJ</button>
      </form>
    </div>
  );
}

export default App;
