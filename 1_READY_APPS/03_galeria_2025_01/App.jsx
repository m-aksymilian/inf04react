// INF.04-01-25.01-SG "Kategorie zdjęć" - React.js + Bootstrap
// Copy to src/App.jsx + App.css. Images obraz1..12.jpg -> public/assets/ (from pliki3.zip, password K@tegorie) ).
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  // array copied from dane.txt (category: 1 kwiaty, 2 zwierzęta, 3 samochody)
  const [zdjecia, setZdjecia] = useState([
    { id: 0, alt: 'Mak', filename: 'obraz1.jpg', category: 1, downloads: 35 },
    { id: 1, alt: 'Bukiet', filename: 'obraz2.jpg', category: 1, downloads: 43 },
    { id: 2, alt: 'Dalmatyńczyk', filename: 'obraz3.jpg', category: 2, downloads: 2 },
    { id: 3, alt: 'Świnka morska', filename: 'obraz4.jpg', category: 2, downloads: 53 },
    { id: 4, alt: 'Rotwailer', filename: 'obraz5.jpg', category: 2, downloads: 43 },
    { id: 5, alt: 'Audi', filename: 'obraz6.jpg', category: 3, downloads: 11 },
    { id: 6, alt: 'kotki', filename: 'obraz7.jpg', category: 2, downloads: 22 },
    { id: 7, alt: 'Róża', filename: 'obraz8.jpg', category: 1, downloads: 33 },
    { id: 8, alt: 'Świnka morska', filename: 'obraz9.jpg', category: 2, downloads: 123 },
    { id: 9, alt: 'Foksterier', filename: 'obraz10.jpg', category: 2, downloads: 22 },
    { id: 10, alt: 'Szczeniak', filename: 'obraz11.jpg', category: 2, downloads: 12 },
    { id: 11, alt: 'Garbus', filename: 'obraz12.jpg', category: 3, downloads: 321 },
  ]);

  const [kwiaty, setKwiaty] = useState(true);
  const [zwierzeta, setZwierzeta] = useState(true);
  const [samochody, setSamochody] = useState(true);

  // functions run when a switch changes (key R.3.7)
  function zmienKwiaty() {
    setKwiaty(!kwiaty);
  }

  function zmienZwierzeta() {
    setZwierzeta(!zwierzeta);
  }

  function zmienSamochody() {
    setSamochody(!samochody);
  }

  // "Pobierz": +1 downloads of the clicked photo, saved in the array (key R.3.10)
  function pobierz(id) {
    setZdjecia(zdjecia.map((zdjecie) =>
      zdjecie.id === id ? { ...zdjecie, downloads: zdjecie.downloads + 1 } : zdjecie
    ));
  }

  function czyKategoriaWlaczona(kategoria) {
    if (kategoria === 1) {
      return kwiaty;
    }
    if (kategoria === 2) {
      return zwierzeta;
    }
    if (kategoria === 3) {
      return samochody;
    }
    return false;
  }

  // render function with a condition and return (key R.3.5)
  function wyswietlZdjecie(zdjecie) {
    if (!czyKategoriaWlaczona(zdjecie.category)) {
      return null;
    }
    return (
      <div className="blok" key={zdjecie.id}>
        <img src={`/assets/${zdjecie.filename}`} alt={zdjecie.alt} />
        <h4>Pobrań: {zdjecie.downloads}</h4>
        <button type="button" className="btn btn-success" onClick={() => pobierz(zdjecie.id)}>
          Pobierz
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Kategorie zdjęć</h1>

      <div className="form-check form-switch form-check-inline">
        <input className="form-check-input" type="checkbox" id="kwiaty" checked={kwiaty} onChange={zmienKwiaty} />
        <label className="form-check-label" htmlFor="kwiaty">Kwiaty</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input className="form-check-input" type="checkbox" id="zwierzeta" checked={zwierzeta} onChange={zmienZwierzeta} />
        <label className="form-check-label" htmlFor="zwierzeta">Zwierzęta</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input className="form-check-input" type="checkbox" id="samochody" checked={samochody} onChange={zmienSamochody} />
        <label className="form-check-label" htmlFor="samochody">Samochody</label>
      </div>

      <div className="galeria">
        {zdjecia.map((zdjecie) => wyswietlZdjecie(zdjecie))}
      </div>
    </div>
  );
}

export default App;
