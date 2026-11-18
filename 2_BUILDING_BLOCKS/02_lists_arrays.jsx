// ======================================================================
// 02 LISTS & ARRAYS - render arrays with .map (key!), filter, find, sort, sum.
// Key rule: lists MUST come from a loop and work for ANY array length.
// Never hard-code <li>. Use array.length for counts.
// ======================================================================
import { useState } from 'react';

//@ LIST-01 | count (length) + numbered list <ol> from array of strings (22.06) | -
export function ListaOl() {
  const kursy = ['Programowanie w C#', 'Angular dla początkujących', 'Kurs Django'];

  return (
    <div>
      <h2>Liczba kursów: {kursy.length}</h2>
      <ol>
        {kursy.map((kurs) => (
          <li key={kurs}>{kurs}</li>
        ))}
      </ol>
    </div>
  );
}

//@ LIST-02 | map with index (number before item, key = index) | -
export function ListaZIndeksem() {
  const produkty = ['Chleb', 'Mleko', 'Masło'];

  return (
    <ul className="list-group">
      {produkty.map((p, i) => (
        <li key={i} className="list-group-item">{i + 1}. {p}</li>
      ))}
    </ul>
  );
}

//@ LIST-03 | array of objects -> table rows | -
export function ListaTabela() {
  const uczniowie = [
    { id: 1, imie: 'Anna', ocena: 5 },
    { id: 2, imie: 'Jan', ocena: 3 },
    { id: 3, imie: 'Ola', ocena: 4 },
  ];

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Lp.</th>
          <th>Imię</th>
          <th>Ocena</th>
        </tr>
      </thead>
      <tbody>
        {uczniowie.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.imie}</td>
            <td>{u.ocena}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//@ LIST-04 | array of objects -> cards side by side (img + h4 + button) (25.01) | - (images in public/assets)
export function ListaKarty() {
  const zdjecia = [
    { id: 0, alt: 'Mak', filename: 'obraz1.jpg', downloads: 35 },
    { id: 1, alt: 'Bratek', filename: 'obraz2.jpg', downloads: 43 },
  ];

  return (
    <div className="d-flex flex-wrap">
      {zdjecia.map((z) => (
        <div key={z.id} className="text-center">
          <img src={'/assets/' + z.filename} alt={z.alt} className="rounded m-1" width="120" />
          <h4>Pobrań: {z.downloads}</h4>
          <button type="button" className="btn btn-success">Pobierz</button>
        </div>
      ))}
    </div>
  );
}

//@ LIST-05 | render only items that pass a condition (filter -> map) | -
export function ListaFiltr() {
  const oceny = [5, 2, 4, 1, 3, 6];
  const zdane = oceny.filter((o) => o >= 2);

  return (
    <p>Zdane oceny ({zdane.length}): {zdane.join(', ')}</p>
  );
}

//@ LIST-06 | condition INSIDE map: function with if + return (25.01 key wording) | useState
export function ListaWarunekWMap() {
  const [pokazParzyste, setPokazParzyste] = useState(true);
  const liczby = [1, 2, 3, 4, 5, 6];

  function rysuj(liczba) {
    if (liczba % 2 === 0 && !pokazParzyste) {
      return null;                     // nothing is rendered for this element
    }
    return <span key={liczba} className="badge bg-primary me-1">{liczba}</span>;
  }

  return (
    <div>
      <button type="button" className="btn btn-sm btn-outline-secondary mb-2" onClick={() => setPokazParzyste(!pokazParzyste)}>
        parzyste: {pokazParzyste ? 'widoczne' : 'ukryte'}
      </button>
      <div>{liczby.map(rysuj)}</div>
    </div>
  );
}

//@ LIST-07 | find one element by id / by name | -
export function ListaFind() {
  const osoby = [
    { id: 1, imie: 'Anna' },
    { id: 2, imie: 'Jan' },
  ];
  const szukana = osoby.find((o) => o.id === 2);          // undefined if not found
  const indeks = osoby.findIndex((o) => o.imie === 'Anna'); // -1 if not found

  return (
    <p>find: {szukana ? szukana.imie : 'brak'}, findIndex: {indeks}</p>
  );
}

//@ LIST-08 | sort a COPY (never sort state in place): numbers, strings, by field | -
export function ListaSort() {
  const liczby = [10, 2, 33, 4];
  const rosnaco = [...liczby].sort((a, b) => a - b);      // without (a,b)=>a-b: "10" < "2"!
  const imiona = ['Żaneta', 'Adam', 'łukasz', 'Ewa'];
  const alfabetycznie = [...imiona].sort((a, b) => a.localeCompare(b, 'pl'));
  const ludzie = [{ imie: 'Jan', wiek: 30 }, { imie: 'Ala', wiek: 20 }];
  const wgWieku = [...ludzie].sort((a, b) => a.wiek - b.wiek);

  return (
    <ul>
      <li>{rosnaco.join(', ')}</li>
      <li>{alfabetycznie.join(', ')}</li>
      <li>{wgWieku.map((l) => l.imie).join(', ')}</li>
    </ul>
  );
}

//@ LIST-09 | sum / average / min / max of an array (reduce, Math) | -
export function ListaStatystyki() {
  const ceny = [12.5, 7, 30, 4.99];
  const suma = ceny.reduce((acc, c) => acc + c, 0);
  const srednia = ceny.length > 0 ? suma / ceny.length : 0;
  const min = Math.min(...ceny);
  const max = Math.max(...ceny);

  return (
    <p>suma: {suma.toFixed(2)}, średnia: {srednia.toFixed(2)}, min: {min}, max: {max}</p>
  );
}

//@ LIST-10 | search box: filter list by typed text (case-insensitive) | useState
export function ListaSzukaj() {
  const miasta = ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań'];
  const [szukaj, setSzukaj] = useState('');
  const wynik = miasta.filter((m) => m.toLowerCase().includes(szukaj.toLowerCase()));

  return (
    <div>
      <div className="form-group mb-2">
        <label htmlFor="szukaj">Szukaj:</label>
        <input type="text" className="form-control" id="szukaj" value={szukaj} onChange={(e) => setSzukaj(e.target.value)} />
      </div>
      <ul>
        {wynik.map((m) => <li key={m}>{m}</li>)}
      </ul>
      {wynik.length === 0 && <p>Brak wyników</p>}
    </div>
  );
}

//@ LIST-11 | group / filter by category select (category numbers like in dane.txt) | useState
export function ListaKategorie() {
  const kategorie = ['', 'kwiaty', 'zwierzęta', 'samochody'];   // index = category number
  const elementy = [
    { id: 1, nazwa: 'Róża', category: 1 },
    { id: 2, nazwa: 'Kot', category: 2 },
    { id: 3, nazwa: 'Fiat', category: 3 },
    { id: 4, nazwa: 'Tulipan', category: 1 },
  ];
  const [wybrana, setWybrana] = useState(0);                     // 0 = all

  return (
    <div>
      <label htmlFor="kategoria">Kategoria:</label>
      <select className="form-control form-select mb-2" id="kategoria" value={wybrana} onChange={(e) => setWybrana(Number(e.target.value))}>
        <option value={0}>wszystkie</option>
        {kategorie.map((k, i) => i > 0 && <option key={i} value={i}>{k}</option>)}
      </select>
      <ul>
        {elementy
          .filter((el) => wybrana === 0 || el.category === wybrana)
          .map((el) => <li key={el.id}>{el.nazwa} ({kategorie[el.category]})</li>)}
      </ul>
    </div>
  );
}

//@ LIST-12 | includes / indexOf / some / every on arrays | -
export function ListaSprawdz() {
  const koszyk = ['jabłko', 'banan'];
  const oceny = [4, 5, 3];

  return (
    <ul>
      <li>includes banan: {String(koszyk.includes('banan'))}</li>
      <li>indexOf gruszka: {koszyk.indexOf('gruszka')}</li>
      <li>some &lt; 3: {String(oceny.some((o) => o < 3))}</li>
      <li>every &gt;= 3: {String(oceny.every((o) => o >= 3))}</li>
    </ul>
  );
}

//@ LIST-13 | nested map (array of arrays -> grid / board) | -
export function ListaZagniezdzona() {
  const plansza = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <table className="table table-bordered w-auto">
      <tbody>
        {plansza.map((wiersz, w) => (
          <tr key={w}>
            {wiersz.map((pole, k) => <td key={k}>{pole}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//@ LIST-14 | array of numbers 1..n generated (Array.from) | -
export function ListaZakres() {
  const n = 5;
  const liczby = Array.from({ length: n }, (_, i) => i + 1);   // [1, 2, 3, 4, 5]

  return <p>{liczby.join(' ')}</p>;
}
