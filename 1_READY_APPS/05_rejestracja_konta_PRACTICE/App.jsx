// PRACTICE (not an official web task): "Rejestruj konto" - INF.04-01-21.06 / 22.01 mobile task rewritten for React.
// Pattern: form validation -> one message area that changes text. Copy to src/App.jsx + App.css.
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [haslo, setHaslo] = useState('');
  const [powtorzHaslo, setPowtorzHaslo] = useState('');
  const [komunikat, setKomunikat] = useState('Autor: 00000000000');

  function zatwierdz(e) {
    e.preventDefault();
    if (!email.includes('@')) {
      setKomunikat('Nieprawidłowy adres e-mail');
    } else if (haslo !== powtorzHaslo) {
      setKomunikat('Hasła się różnią');
    } else {
      setKomunikat(`Witaj ${email}`);
    }
  }

  return (
    <div className="container">
      <h1 className="naglowek">Rejestruj konto</h1>
      <form onSubmit={zatwierdz}>
        <div className="form-group mb-3">
          <label htmlFor="email">Podaj e-mail:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="haslo">Podaj hasło:</label>
          <input
            type="password"
            className="form-control"
            id="haslo"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="powtorzHaslo">Powtórz hasło:</label>
          <input
            type="password"
            className="form-control"
            id="powtorzHaslo"
            value={powtorzHaslo}
            onChange={(e) => setPowtorzHaslo(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">ZATWIERDŹ</button>
          <p className="mt-3">{komunikat}</p>
        </div>
      </form>
    </div>
  );
}

export default App;
