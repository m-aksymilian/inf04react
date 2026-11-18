// PRACTICE (not an official web task): "Nadaj Przesyłkę" - INF.04-01-23.06 desktop task rewritten for React.
// Patterns: radio group, button that reads the radio and swaps image + price, text validation with 3 messages.
// Copy to src/App.jsx + App.css. Images pocztowka.png, list.png, paczka.png -> public/assets/.
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const przesylki = {
    pocztowka: { obraz: 'pocztowka.png', cena: '1 zł' },
    list: { obraz: 'list.png', cena: '1,5 zł' },
    paczka: { obraz: 'paczka.png', cena: '10 zł' },
  };

  const [rodzaj, setRodzaj] = useState('pocztowka');
  const [ulica, setUlica] = useState('');
  const [kodPocztowy, setKodPocztowy] = useState('');
  const [miasto, setMiasto] = useState('');
  const [obraz, setObraz] = useState('pocztowka.png');
  const [cena, setCena] = useState('');
  const [komunikat, setKomunikat] = useState('');

  function sprawdzCene() {
    setObraz(przesylki[rodzaj].obraz);
    setCena(przesylki[rodzaj].cena);
  }

  function czySameCyfry(tekst) {
    for (const znak of tekst) {
      if (znak < '0' || znak > '9') {
        return false;
      }
    }
    return true;
  }

  function zatwierdz() {
    if (kodPocztowy.length !== 5) {
      setKomunikat('Nieprawidłowa liczba cyfr w kodzie pocztowym');
    } else if (!czySameCyfry(kodPocztowy)) {
      setKomunikat('Kod pocztowy powinien się składać z samych cyfr');
    } else {
      setKomunikat('Dane przesyłki zostały wprowadzone');
    }
  }

  return (
    <div className="container">
      <h1>Nadaj Przesyłkę - 00000000000</h1>
      <div className="row">
        <div className="col">
          <fieldset className="border p-2 mb-3">
            <legend className="fs-6">Rodzaj przesyłki</legend>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="rodzaj" id="pocztowka"
                checked={rodzaj === 'pocztowka'} onChange={() => setRodzaj('pocztowka')} />
              <label className="form-check-label" htmlFor="pocztowka">Pocztówka</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="rodzaj" id="list"
                checked={rodzaj === 'list'} onChange={() => setRodzaj('list')} />
              <label className="form-check-label" htmlFor="list">List</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="rodzaj" id="paczka"
                checked={rodzaj === 'paczka'} onChange={() => setRodzaj('paczka')} />
              <label className="form-check-label" htmlFor="paczka">Paczka</label>
            </div>
          </fieldset>
          <button type="button" className="btn btn-primary mb-3" onClick={sprawdzCene}>Sprawdź Cenę</button>
          <div>
            <img src={`/assets/${obraz}`} alt="Rodzaj przesyłki" />
          </div>
          <p className="cena">Cena: {cena}</p>
        </div>

        <div className="col">
          <fieldset className="border p-2 mb-3">
            <legend className="fs-6">Dane adresowe</legend>
            <div className="form-group mb-2">
              <label htmlFor="ulica">Ulica z numerem</label>
              <input type="text" className="form-control" id="ulica" value={ulica}
                onChange={(e) => setUlica(e.target.value)} />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="kodPocztowy">Kod pocztowy</label>
              <input type="text" className="form-control" id="kodPocztowy" value={kodPocztowy}
                onChange={(e) => setKodPocztowy(e.target.value)} />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="miasto">Miasto</label>
              <input type="text" className="form-control" id="miasto" value={miasto}
                onChange={(e) => setMiasto(e.target.value)} />
            </div>
          </fieldset>
          <button type="button" className="btn btn-success" onClick={zatwierdz}>Zatwierdź</button>
          <p className="mt-3">{komunikat}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
