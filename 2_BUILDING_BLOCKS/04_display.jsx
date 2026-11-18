// ======================================================================
// 04 DISPLAY - conditional rendering, className, inline style, CSS file,
// Bootstrap grid, images (public/ vs src/), template strings.
// ======================================================================
import { useState } from 'react';

//@ VIEW-01 | conditional: && (show or nothing) and ternary (A or B) | useState
export function WidokWarunek() {
  const [zalogowany, setZalogowany] = useState(false);

  return (
    <div>
      {zalogowany && <p className="text-success">Witaj!</p>}
      <p>{zalogowany ? 'Jesteś zalogowany' : 'Zaloguj się'}</p>
      <button type="button" className="btn btn-primary" onClick={() => setZalogowany(!zalogowany)}>Przełącz</button>
    </div>
  );
}

//@ VIEW-02 | if / else before return (several cases -> one variable) | -
export function WidokIfElse() {
  const punkty = 72;
  let ocena;
  if (punkty >= 90) {
    ocena = 'celujący';
  } else if (punkty >= 75) {
    ocena = 'bardzo dobry';
  } else if (punkty >= 50) {
    ocena = 'dobry';
  } else {
    ocena = 'niedostateczny';
  }

  return <p>{punkty} pkt - {ocena}</p>;
}

//@ VIEW-03 | className chosen by condition (Bootstrap text / bg colours) | useState
export function WidokKlasa() {
  const [liczba, setLiczba] = useState(5);

  return (
    <div>
      <p className={liczba >= 0 ? 'text-success' : 'text-danger'}>{liczba}</p>
      <p className={`p-2 ${liczba % 2 === 0 ? 'bg-info' : 'bg-warning'}`}>parzysta? {liczba % 2 === 0 ? 'tak' : 'nie'}</p>
      <button type="button" className="btn btn-sm btn-secondary" onClick={() => setLiczba(liczba - 3)}>-3</button>
    </div>
  );
}

//@ VIEW-04 | inline style object (camelCase, number = px) | -
export function WidokStyl() {
  const styl = { backgroundColor: 'SteelBlue', color: 'white', padding: 10, borderRadius: 8, fontSize: '1.2rem' };

  return (
    <div>
      <div style={styl}>Styl z obiektu</div>
      <div style={{ marginTop: 5, textAlign: 'center' }}>Styl wpisany w JSX</div>
    </div>
  );
}

//@ VIEW-05 | rules in App.css (key checks CSS FILE, e.g. body padding, img margin) | import './App.css'
export function WidokPlikCss() {
  // App.css:
  //   body { padding: 20px; }
  //   img  { margin: 5px; border-radius: 10px; }
  //   .wyrozniony { font-weight: bold; color: darkred; }
  // App.jsx (top):  import './App.css';
  //   <p className="wyrozniony">...</p>
  // (the viewer has no App.css, so this demo fakes the look with Bootstrap classes)
  return <p className="fw-bold text-danger">wyrozniony</p>;
}

//@ VIEW-06 | Bootstrap grid: row + columns (responsive, 3 per row) | -
export function WidokSiatka() {
  const elementy = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="container">
      <div className="row">
        {elementy.map((el) => (
          <div key={el} className="col-12 col-md-4 border p-2 text-center">{el}</div>
        ))}
      </div>
    </div>
  );
}

//@ VIEW-07 | images: public/assets (string path) vs src/assets (import) | -
export function WidokObrazy() {
  // 1) file in egzamin/public/assets/obraz1.jpg -> path from the site root, no import:
  const plik = 'obraz1.jpg';
  // 2) file in egzamin/src/assets/logo.png -> import at the top of App.jsx:
  //    import logo from './assets/logo.png';   then  <img src={logo} alt="logo" />
  return (
    <div>
      <img src="/assets/obraz1.jpg" alt="Mak" className="rounded" width="100" style={{ margin: 5 }} />
      <img src={'/assets/' + plik} alt="ten sam z zmiennej" className="rounded" width="100" style={{ margin: 5 }} />
      <img src={`/assets/${plik}`} alt="template string" className="rounded" width="100" style={{ margin: 5 }} />
    </div>
  );
}

//@ VIEW-08 | image chosen from state (e.g. dice kosc1..6.png) | useState
export function WidokObrazZeStanu() {
  const [oczka, setOczka] = useState(1);

  return (
    <div>
      <img src={`/assets/kosc${oczka}.png`} alt={'kostka ' + oczka} width="60" />
      <button type="button" className="btn btn-primary ms-2" onClick={() => setOczka((oczka % 6) + 1)}>Następna</button>
    </div>
  );
}

//@ VIEW-09 | Bootstrap alert / badge / card | -
export function WidokBootstrap() {
  return (
    <div>
      <div className="alert alert-success">Zapisano!</div>
      <span className="badge bg-primary me-1">Nowość</span>
      <span className="badge bg-danger">-20%</span>
      <div className="card mt-2" style={{ width: '12rem' }}>
        <div className="card-body">
          <h5 className="card-title">Tytuł karty</h5>
          <p className="card-text">Treść karty.</p>
        </div>
      </div>
    </div>
  );
}

//@ VIEW-10 | text from template string with variables + special chars ({' '}, &gt;) | -
export function WidokTekst() {
  const tytul = 'Vinci';
  const rodzaj = 1;

  return (
    <div>
      <p>{`tytul: ${tytul}; rodzaj: ${rodzaj}`}</p>
      <p>Adres:{' '}<b>{tytul}</b> &gt; 0 &amp; &copy;</p>
    </div>
  );
}

//@ VIEW-11 | show / hide with hidden attribute or d-none (element stays in DOM) | useState
export function WidokUkryj() {
  const [ukryty, setUkryty] = useState(false);

  return (
    <div>
      <p className={ukryty ? 'd-none' : ''}>Ukrywany przez d-none</p>
      <p hidden={ukryty}>Ukrywany przez hidden</p>
      <button type="button" className="btn btn-secondary" onClick={() => setUkryty(!ukryty)}>Przełącz</button>
    </div>
  );
}

//@ VIEW-12 | Fragment <>...</> (return several elements without extra div) | -
export function WidokFragment() {
  return (
    <>
      <h5>Nagłówek</h5>
      <p>Akapit obok, bez dodatkowego diva.</p>
    </>
  );
}

//@ VIEW-13 | progress bar from a number (width in %) | useState
export function WidokPasek() {
  const [procent, setProcent] = useState(40);

  return (
    <div>
      <div className="progress mb-2">
        <div className="progress-bar" style={{ width: procent + '%' }}>{procent}%</div>
      </div>
      <button type="button" className="btn btn-sm btn-primary" onClick={() => setProcent(Math.min(100, procent + 10))}>+10%</button>
    </div>
  );
}
