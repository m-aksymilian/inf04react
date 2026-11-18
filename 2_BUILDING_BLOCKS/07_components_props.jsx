// ======================================================================
// 07 COMPONENTS & PROPS - for PRACTICE / non-exam tasks.
// WARNING: every INF.04 key so far says "Aplikacja składa się z jednego
// komponentu" -> at the exam keep everything in App. Use these only if the
// sheet explicitly asks for more components.
// ======================================================================
import { useState } from 'react';

//@ COMP-01 | child component with props (destructuring) | -
function Karta({ tytul, opis }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{tytul}</h5>
        <p className="card-text">{opis}</p>
      </div>
    </div>
  );
}
// --- demo
export function DemoKarta() {
  return <Karta tytul="React" opis="Biblioteka do budowania UI" />;
}

//@ COMP-02 | list of child components from an array (key on the component) | -
function Pozycja({ nazwa, cena }) {
  return <li className="list-group-item">{nazwa} - {cena.toFixed(2)} zł</li>;
}
// --- demo
export function DemoPozycje() {
  const produkty = [
    { id: 1, nazwa: 'Chleb', cena: 4.5 },
    { id: 2, nazwa: 'Mleko', cena: 3.2 },
  ];
  return (
    <ul className="list-group">
      {produkty.map((p) => <Pozycja key={p.id} nazwa={p.nazwa} cena={p.cena} />)}
    </ul>
  );
}

//@ COMP-03 | callback prop: child tells parent (lifting state up) | useState
function PrzyciskLicznika({ etykieta, onKlik }) {
  return <button type="button" className="btn btn-primary me-1" onClick={onKlik}>{etykieta}</button>;
}
// --- demo
export function DemoCallback() {
  const [licznik, setLicznik] = useState(0);
  return (
    <div>
      <p>Licznik w rodzicu: {licznik}</p>
      <PrzyciskLicznika etykieta="+1" onKlik={() => setLicznik(licznik + 1)} />
      <PrzyciskLicznika etykieta="+10" onKlik={() => setLicznik(licznik + 10)} />
    </div>
  );
}

//@ COMP-04 | children prop (wrapper component) | -
function Ramka({ naglowek, children }) {
  return (
    <div className="border rounded p-2 mb-2">
      <strong>{naglowek}</strong>
      <div>{children}</div>
    </div>
  );
}
// --- demo
export function DemoChildren() {
  return (
    <Ramka naglowek="Uwaga">
      <p className="mb-0">Dowolna treść w środku.</p>
    </Ramka>
  );
}

//@ COMP-05 | default prop values + conditional render in child | -
function Powitanie({ imie = 'Gościu', vip = false }) {
  return <p>Witaj, {imie}! {vip && <span className="badge bg-warning text-dark">VIP</span>}</p>;
}
// --- demo
export function DemoDomyslne() {
  return (
    <div>
      <Powitanie />
      <Powitanie imie="Anna" vip={true} />
    </div>
  );
}

//@ COMP-06 | controlled input as child component (value + onChange from parent) | useState
function Pole({ id, etykieta, wartosc, onZmiana, typ = 'text' }) {
  return (
    <div className="form-group mb-2">
      <label htmlFor={id}>{etykieta}</label>
      <input type={typ} className="form-control" id={id} value={wartosc} onChange={(e) => onZmiana(e.target.value)} />
    </div>
  );
}
// --- demo
export function DemoPole() {
  const [miasto, setMiasto] = useState('');
  return (
    <div>
      <Pole id="miastoKlienta" etykieta="Miasto:" wartosc={miasto} onZmiana={setMiasto} />
      <p>Rodzic wie: {miasto}</p>
    </div>
  );
}
