// INF.04-01-26.06-SG "Menedżer haseł" - React.js + Bootstrap
// Copy to src/App.jsx. No CSS file needed (only Bootstrap classes). Put YOUR number in the h1.
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // form fields
  const [adres, setAdres] = useState('');
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [generujHaslo, setGenerujHaslo] = useState(true);

  // block 2 - data saved after "Zapisz"
  const [zapisane, setZapisane] = useState({ adres: '', login: '', haslo: '', generujHaslo: true });

  function zapisz(e) {
    e.preventDefault();
    setZapisane({ adres: adres, login: login, haslo: haslo, generujHaslo: generujHaslo });
  }

  return (
    <div className="container">
      <h1>Menedżer haseł - wykonał 00000000000</h1>

      <form onSubmit={zapisz}>
        <div className="form-group m-4">
          <label htmlFor="adres">Adres WWW:</label>
          <input
            type="text"
            className="form-control"
            id="adres"
            placeholder="Adres strony WWW"
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
          />
        </div>
        <div className="form-group m-4">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            className="form-control"
            id="login"
            placeholder="Twój login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-group m-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="generujHaslo"
            checked={generujHaslo}
            onChange={(e) => setGenerujHaslo(e.target.checked)}
          />
          <label className="form-check-label ms-1" htmlFor="generujHaslo">Wygeneruj hasło</label>
          <br />
          <label htmlFor="haslo">Hasło:</label>
          <input
            type="password"
            className="form-control"
            id="haslo"
            disabled={generujHaslo}
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary m-2">Zapisz</button>
      </form>

      <p className="p-2 text-primary lead">Adres: {zapisane.adres}</p>
      <p className="p-2">Login: {zapisane.login}</p>
      <p className="p-2">
        {zapisane.generujHaslo ? 'Hasło automatycznie generowane' : `Hasło: ${zapisane.haslo}`}
      </p>
    </div>
  );
}

export default App;
