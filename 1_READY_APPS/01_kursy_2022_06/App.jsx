// INF.04-02-22.06-SG "Zapisy na kursy" - React.js + Bootstrap
// Copy to src/App.jsx. No App.css needed. Spec + key: README.md in this folder.
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const kursy = ['Programowanie w C#', 'Angular dla początkujących', 'Kurs Django'];

  const [imieNazwisko, setImieNazwisko] = useState('');
  const [numerKursu, setNumerKursu] = useState('');

  function zapiszDoKursu(e) {
    e.preventDefault();
    console.log(imieNazwisko);

    const numer = Number(numerKursu);
    if (Number.isInteger(numer) && numer >= 1 && numer <= kursy.length) {
      console.log(kursy[numer - 1]);
    } else {
      console.log('Nieprawidłowy numer kursu');
    }
  }

  return (
    <div className="container">
      <h2>Liczba kursów: {kursy.length}</h2>
      <ol>
        {kursy.map((kurs) => (
          <li key={kurs}>{kurs}</li>
        ))}
      </ol>

      <form onSubmit={zapiszDoKursu}>
        <div className="form-group mb-3">
          <label htmlFor="imieNazwisko">Imię i nazwisko:</label>
          <input
            type="text"
            className="form-control"
            id="imieNazwisko"
            value={imieNazwisko}
            onChange={(e) => setImieNazwisko(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="numerKursu">Numer kursu:</label>
          <input
            type="number"
            className="form-control"
            id="numerKursu"
            value={numerKursu}
            onChange={(e) => setNumerKursu(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Zapisz do kursu</button>
      </form>
    </div>
  );
}

export default App;
