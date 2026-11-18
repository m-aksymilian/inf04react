// ======================================================================
// 05 EFFECTS & TIMERS - useEffect on start / on change, setInterval with
// cleanup, setTimeout, localStorage, fetch from public/.
// Note: StrictMode runs effects twice in dev -> always return a cleanup.
// ======================================================================
import { useState, useEffect } from 'react';

//@ EFF-01 | run once at start (empty deps []) | useEffect
export function EfektStart() {
  const [start, setStart] = useState('');

  useEffect(() => {
    setStart(new Date().toLocaleTimeString());
    console.log('komponent uruchomiony');
  }, []);

  return <p>Start o: {start}</p>;
}

//@ EFF-02 | run when a value changes (deps [x]) - e.g. log every change | useState, useEffect
export function EfektZmiana() {
  const [licznik, setLicznik] = useState(0);

  useEffect(() => {
    console.log(`Kliknięto ${licznik} razy`);
    // RISKY AT THE EXAM: document.title = ... touches the DOM directly.
    // The keys give 0 points for "metody DOM", so skip it unless the sheet asks for it.
  }, [licznik]);

  return <button type="button" className="btn btn-primary" onClick={() => setLicznik(licznik + 1)}>Kliknij ({licznik})</button>;
}

//@ EFF-03 | clock: setInterval every second + clearInterval cleanup | useState, useEffect
export function EfektZegar() {
  const [czas, setCzas] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setCzas(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <h4>{czas.toLocaleTimeString('pl-PL')}</h4>;
}

//@ EFF-04 | countdown with start / stop / reset (one setTimeout per second) | useState, useEffect
export function EfektStoper() {
  const [sekundy, setSekundy] = useState(10);
  const [dziala, setDziala] = useState(false);

  useEffect(() => {
    if (!dziala || sekundy === 0) {
      return;                        // stopped, or finished at 0
    }
    const id = setTimeout(() => setSekundy(sekundy - 1), 1000);
    return () => clearTimeout(id);
  }, [dziala, sekundy]);             // runs again after every tick

  return (
    <div>
      <h4>{sekundy} s</h4>
      {sekundy === 0 && <p className="text-danger">Koniec czasu!</p>}
      <button type="button" className="btn btn-success me-1" onClick={() => setDziala(true)}>Start</button>
      <button type="button" className="btn btn-warning me-1" onClick={() => setDziala(false)}>Stop</button>
      <button type="button" className="btn btn-secondary" onClick={() => { setDziala(false); setSekundy(10); }}>Reset</button>
    </div>
  );
}

//@ EFF-05 | setTimeout: message that disappears after 2 s | useState, useEffect
export function EfektKomunikat() {
  const [komunikat, setKomunikat] = useState('');

  useEffect(() => {
    if (komunikat === '') {
      return;
    }
    const id = setTimeout(() => setKomunikat(''), 2000);
    return () => clearTimeout(id);
  }, [komunikat]);

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setKomunikat('Zapisano!')}>Zapisz</button>
      {komunikat && <div className="alert alert-success mt-2">{komunikat}</div>}
    </div>
  );
}

//@ EFF-06 | localStorage: load at start (lazy init) + save on change | useState, useEffect
export function EfektLocalStorage() {
  const [notatka, setNotatka] = useState(() => localStorage.getItem('notatka') || '');

  useEffect(() => {
    localStorage.setItem('notatka', notatka);
  }, [notatka]);

  return (
    <div className="form-group">
      <label htmlFor="notatka">Notatka (zostaje po F5):</label>
      <input type="text" className="form-control" id="notatka" value={notatka} onChange={(e) => setNotatka(e.target.value)} />
    </div>
  );
}

//@ EFF-07 | localStorage with an array (JSON.stringify / JSON.parse) | useState, useEffect
export function EfektLocalStorageTablica() {
  const [lista, setLista] = useState(() => JSON.parse(localStorage.getItem('lista') || '[]'));

  useEffect(() => {
    localStorage.setItem('lista', JSON.stringify(lista));
  }, [lista]);

  return (
    <div>
      <button type="button" className="btn btn-primary me-1" onClick={() => setLista([...lista, lista.length + 1])}>Dodaj</button>
      <button type="button" className="btn btn-secondary" onClick={() => setLista([])}>Wyczyść</button>
      <p>{lista.join(', ')}</p>
    </div>
  );
}

//@ EFF-08 | fetch a JSON file from public/ at start (e.g. public/dane.json) | useState, useEffect
export function EfektFetch() {
  const [dane, setDane] = useState(null);
  const [blad, setBlad] = useState('');

  useEffect(() => {
    fetch('/dane.json')                       // file must be in egzamin/public/dane.json
      .then((res) => {
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return res.json();
      })
      .then((json) => setDane(json))
      .catch((err) => setBlad('Nie udało się wczytać: ' + err.message));
  }, []);

  // no early "return" here: pasted into App it would replace the WHOLE page
  return (
    <div>
      {blad !== '' && <p className="text-danger small">{blad}</p>}
      {blad === '' && dane === null && <p>Wczytywanie...</p>}
      {dane !== null && <pre>{JSON.stringify(dane, null, 2)}</pre>}
    </div>
  );
}

//@ EFF-09 | keyboard the React way: onKeyDown on an input (e.g. Enter adds) | useState
export function EfektKlawisz() {
  const [klawisz, setKlawisz] = useState('-');
  const [tekst, setTekst] = useState('');
  const [lista, setLista] = useState([]);

  function naKlawisz(e) {
    setKlawisz(e.key);
    if (e.key === 'Enter' && tekst.trim() !== '') {
      setLista([...lista, tekst]);
      setTekst('');
    }
  }
  // RISKY AT THE EXAM: window.addEventListener('keydown', ...) is a direct DOM API.
  // The keys give 0 points for "metody DOM", so use onKeyDown={...} in JSX instead.

  return (
    <div className="form-group">
      <label htmlFor="wpis">Wpisz i naciśnij Enter:</label>
      <input type="text" className="form-control" id="wpis" value={tekst}
        onChange={(e) => setTekst(e.target.value)} onKeyDown={naKlawisz} />
      <p>Ostatni klawisz: <b>{klawisz}</b> · {lista.join(', ')}</p>
    </div>
  );
}
