import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [tekst, setTekst] = useState('');

  function zatwierdz(e) {
    e.preventDefault();
    console.log(tekst);
  }

  return (
    <div className="container">
      <h1>Tytuł</h1>
      <form onSubmit={zatwierdz}>
        <div className="form-group mb-3">
          <label htmlFor="tekst">Etykieta:</label>
          <input
            type="text"
            className="form-control"
            id="tekst"
            value={tekst}
            onChange={(e) => setTekst(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Zatwierdź</button>
      </form>
    </div>
  );
}

export default App;
