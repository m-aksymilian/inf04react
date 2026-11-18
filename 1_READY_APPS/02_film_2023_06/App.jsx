// INF.04-03-23.06-SG / INF.04-01-23.06-SD "Formularz filmu" - React.js + Bootstrap
// Copy to src/App.jsx + App.css (body padding MUST be in a CSS file - key checks it).
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [tytul, setTytul] = useState('');
  const [rodzaj, setRodzaj] = useState('');

  function dodajFilm(e) {
    e.preventDefault();
    console.log(`tytul: ${tytul}; rodzaj: ${rodzaj}`);
  }

  return (
    <form onSubmit={dodajFilm}>
      <div className="form-group mb-3">
        <label htmlFor="tytulFilmu">Tytuł filmu</label>
        <input
          type="text"
          className="form-control"
          id="tytulFilmu"
          value={tytul}
          onChange={(e) => setTytul(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="rodzajFilmu">Rodzaj</label>
        <select
          className="form-control form-select"
          id="rodzajFilmu"
          value={rodzaj}
          onChange={(e) => setRodzaj(e.target.value)}
        >
          <option value=""></option>
          <option value="1">Komedia</option>
          <option value="2">Obyczajowy</option>
          <option value="3">Sensacyjny</option>
          <option value="4">Horror</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Dodaj</button>
    </form>
  );
}

export default App;
