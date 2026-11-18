// ======================================================================
// 03 STATE UPDATES - counters, toggles, objects and arrays in state.
// Key rule: NEVER modify state directly (tab[i]++, obj.x = 1, push).
// Always build a NEW array/object and pass it to setX(...).
// ======================================================================
import { useState } from 'react';

//@ STATE-01 | counter + / - / reset | useState
export function StanLicznik() {
  const [licznik, setLicznik] = useState(0);

  return (
    <div>
      <h4>Licznik: {licznik}</h4>
      <button type="button" className="btn btn-primary me-1" onClick={() => setLicznik(licznik + 1)}>+</button>
      <button type="button" className="btn btn-primary me-1" onClick={() => setLicznik(licznik - 1)}>-</button>
      <button type="button" className="btn btn-secondary" onClick={() => setLicznik(0)}>Zeruj</button>
    </div>
  );
}

//@ STATE-02 | functional update setX(prev => ...) (safe in timers / many updates) | useState
export function StanFunkcyjny() {
  const [punkty, setPunkty] = useState(0);

  function dodajTrzy() {
    setPunkty((p) => p + 1);   // with setPunkty(punkty + 1) three times you'd get only +1
    setPunkty((p) => p + 1);
    setPunkty((p) => p + 1);
  }

  return (
    <div>
      <p>Punkty: {punkty}</p>
      <button type="button" className="btn btn-primary" onClick={dodajTrzy}>+3</button>
    </div>
  );
}

//@ STATE-03 | toggle boolean (show / hide, on / off) | useState
export function StanPrzelacz() {
  const [widoczny, setWidoczny] = useState(false);

  return (
    <div>
      <button type="button" className="btn btn-info mb-2" onClick={() => setWidoczny(!widoczny)}>
        {widoczny ? 'Ukryj' : 'Pokaż'}
      </button>
      {widoczny && <p>Tajna treść</p>}
    </div>
  );
}

//@ STATE-04 | increment a field of ONE object in an array by id (25.01 Pobierz) | useState
export function StanObiektWTablicy() {
  const [zdjecia, setZdjecia] = useState([
    { id: 0, alt: 'Mak', downloads: 35 },
    { id: 1, alt: 'Bratek', downloads: 43 },
  ]);

  function pobierz(id) {
    setZdjecia(zdjecia.map((z) => (z.id === id ? { ...z, downloads: z.downloads + 1 } : z)));
  }

  return (
    <ul>
      {zdjecia.map((z) => (
        <li key={z.id}>
          {z.alt} - Pobrań: {z.downloads}{' '}
          <button type="button" className="btn btn-success btn-sm" onClick={() => pobierz(z.id)}>Pobierz</button>
        </li>
      ))}
    </ul>
  );
}

//@ STATE-05 | add an item to an array (spread, new id) | useState
export function StanDodaj() {
  const [zadania, setZadania] = useState([{ id: 1, tekst: 'Zakupy' }]);
  const [nowe, setNowe] = useState('');

  function dodaj(e) {
    e.preventDefault();
    if (nowe.trim() === '') {
      return;
    }
    setZadania([...zadania, { id: Date.now(), tekst: nowe }]);
    setNowe('');
  }

  return (
    <form onSubmit={dodaj}>
      <div className="form-group mb-2">
        <label htmlFor="nowe">Nowe zadanie:</label>
        <input type="text" className="form-control" id="nowe" value={nowe} onChange={(e) => setNowe(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary mb-2">Dodaj</button>
      <ul>
        {zadania.map((z) => <li key={z.id}>{z.tekst}</li>)}
      </ul>
    </form>
  );
}

//@ STATE-06 | remove an item from an array (filter by id) | useState
export function StanUsun() {
  const [osoby, setOsoby] = useState([
    { id: 1, imie: 'Anna' },
    { id: 2, imie: 'Jan' },
    { id: 3, imie: 'Ola' },
  ]);

  function usun(id) {
    setOsoby(osoby.filter((o) => o.id !== id));
  }

  return (
    <ul className="list-group">
      {osoby.map((o) => (
        <li key={o.id} className="list-group-item d-flex justify-content-between">
          {o.imie}
          <button type="button" className="btn btn-danger btn-sm" onClick={() => usun(o.id)}>Usuń</button>
        </li>
      ))}
    </ul>
  );
}

//@ STATE-07 | toggle a boolean field of one item (done / not done) | useState
export function StanOdhacz() {
  const [lista, setLista] = useState([
    { id: 1, tekst: 'Nauczyć się React', zrobione: false },
    { id: 2, tekst: 'Zdać INF.04', zrobione: false },
  ]);

  function przelacz(id) {
    setLista(lista.map((el) => (el.id === id ? { ...el, zrobione: !el.zrobione } : el)));
  }

  return (
    <ul>
      {lista.map((el) => (
        <li key={el.id} onClick={() => przelacz(el.id)} style={{ cursor: 'pointer', textDecoration: el.zrobione ? 'line-through' : 'none' }}>
          {el.tekst}
        </li>
      ))}
    </ul>
  );
}

//@ STATE-08 | update one field of an object in state (spread) | useState
export function StanObiekt() {
  const [osoba, setOsoba] = useState({ imie: 'Jan', wiek: 18 });

  function postarz() {
    setOsoba({ ...osoba, wiek: osoba.wiek + 1 });
  }

  return (
    <div>
      <p>{osoba.imie}, wiek: {osoba.wiek}</p>
      <button type="button" className="btn btn-primary" onClick={postarz}>Urodziny</button>
    </div>
  );
}

//@ STATE-09 | change value at index in array of numbers (copy, change, set) | useState
export function StanIndeks() {
  const [glosy, setGlosy] = useState([0, 0, 0]);
  const kandydaci = ['A', 'B', 'C'];

  function glosuj(i) {
    const kopia = [...glosy];
    kopia[i] = kopia[i] + 1;
    setGlosy(kopia);
  }

  return (
    <div>
      {kandydaci.map((k, i) => (
        <button key={k} type="button" className="btn btn-outline-primary me-1" onClick={() => glosuj(i)}>
          {k}: {glosy[i]}
        </button>
      ))}
    </div>
  );
}

//@ STATE-10 | derived value: compute from state in render, don't store it | useState
export function StanWyliczony() {
  const [ilosc, setIlosc] = useState(1);
  const cena = 19.99;
  const razem = ilosc * cena;              // no extra useState needed

  return (
    <div className="form-group">
      <label htmlFor="ilosc">Ilość:</label>
      <input type="number" className="form-control" id="ilosc" min="1" value={ilosc} onChange={(e) => setIlosc(Number(e.target.value))} />
      <p>Do zapłaty: {razem.toFixed(2)} zł</p>
    </div>
  );
}

//@ STATE-11 | several checkboxes -> array of selected values | useState
export function StanWieleCheckbox() {
  const dodatki = ['ser', 'szynka', 'pieczarki', 'oliwki'];
  const [wybrane, setWybrane] = useState([]);

  function zmien(dodatek, zaznaczony) {
    if (zaznaczony) {
      setWybrane([...wybrane, dodatek]);
    } else {
      setWybrane(wybrane.filter((d) => d !== dodatek));
    }
  }

  return (
    <div>
      {dodatki.map((d) => (
        <div key={d} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={'dodatek-' + d}
            checked={wybrane.includes(d)}
            onChange={(e) => zmien(d, e.target.checked)}
          />
          <label className="form-check-label" htmlFor={'dodatek-' + d}>{d}</label>
        </div>
      ))}
      <p>Wybrane: {wybrane.join(', ')}</p>
    </div>
  );
}

//@ STATE-12 | object of category flags -> one handler for many switches | useState
export function StanFlagiKategorii() {
  const [filtry, setFiltry] = useState({ 1: true, 2: true, 3: true });   // category number -> on/off
  const nazwy = { 1: 'Kwiaty', 2: 'Zwierzęta', 3: 'Samochody' };

  function zmienFiltr(kat) {
    setFiltry({ ...filtry, [kat]: !filtry[kat] });
  }

  return (
    <div>
      {Object.keys(nazwy).map((kat) => (
        <div key={kat} className="form-check form-switch form-check-inline">
          <input className="form-check-input" type="checkbox" id={'kat' + kat} checked={filtry[kat]} onChange={() => zmienFiltr(kat)} />
          <label className="form-check-label" htmlFor={'kat' + kat}>{nazwy[kat]}</label>
        </div>
      ))}
      <p>{JSON.stringify(filtry)}</p>
    </div>
  );
}
