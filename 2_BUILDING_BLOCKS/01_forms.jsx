// ======================================================================
// 01 FORMS - inputs, labels, select, checkbox, radio, submit.
// Each block = one mini component. At the exam paste its STATE lines and its
// FUNCTION into App, and its JSX into App's return. Keep ONE component (App).
// Key rules: label htmlFor = input id (meaningful id), form-group + form-control,
// className not class, every tag closed, onSubmit + e.preventDefault().
// ======================================================================
import { useState, useRef } from 'react';

//@ FORM-01 | text input + label + form-group, console.log on submit | useState
export function FormTekst() {
  const [imie, setImie] = useState('');

  function zapisz(e) {
    e.preventDefault();          // stops the page reload (?imie=... in the URL)
    console.log(imie);
  }

  return (
    <form onSubmit={zapisz}>
      <div className="form-group mb-3">
        <label htmlFor="imie">Imię i nazwisko:</label>
        <input
          type="text"
          className="form-control"
          id="imie"
          value={imie}
          onChange={(e) => setImie(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Zapisz</button>
    </form>
  );
}

//@ FORM-02 | number input -> Number(), check range, index into array (1-based) | useState
export function FormNumer() {
  const kursy = ['Programowanie w C#', 'Angular dla początkujących', 'Kurs Django'];
  const [numer, setNumer] = useState('');

  function zapisz(e) {
    e.preventDefault();
    const n = Number(numer);     // input value is ALWAYS a string
    if (n >= 1 && n <= kursy.length) {
      console.log(kursy[n - 1]);
    } else {
      console.log('Nieprawidłowy numer kursu');
    }
  }

  return (
    <form onSubmit={zapisz}>
      <div className="form-group mb-3">
        <label htmlFor="numer">Numer kursu:</label>
        <input
          type="number"
          className="form-control"
          id="numer"
          value={numer}
          onChange={(e) => setNumer(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Zapisz do kursu</button>
    </form>
  );
}

//@ FORM-03 | select with fixed options (first empty), logs option VALUE | useState
export function FormSelect() {
  const [rodzaj, setRodzaj] = useState('');

  function dodaj(e) {
    e.preventDefault();
    console.log(`rodzaj: ${rodzaj}`);
  }

  return (
    <form onSubmit={dodaj}>
      <div className="form-group mb-3">
        <label htmlFor="rodzaj">Rodzaj</label>
        <select
          className="form-control form-select"
          id="rodzaj"
          value={rodzaj}
          onChange={(e) => setRodzaj(e.target.value)}
        >
          <option value=""></option>
          <option value="1">Komedia</option>
          <option value="2">Obyczajowy</option>
          <option value="3">Sensacyjny</option>
          <option value="4">Horror</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Dodaj</button>
    </form>
  );
}

//@ FORM-04 | select generated from an array with .map | useState
export function FormSelectZTablicy() {
  const miasta = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'];
  const [miasto, setMiasto] = useState(miasta[0]);

  return (
    <div className="form-group mb-3">
      <label htmlFor="miasto">Miasto:</label>
      <select
        className="form-control form-select"
        id="miasto"
        value={miasto}
        onChange={(e) => setMiasto(e.target.value)}
      >
        {miasta.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <p>Wybrano: {miasto}</p>
    </div>
  );
}

//@ FORM-05 | checkbox (checked by default) -> e.target.checked | useState
export function FormCheckbox() {
  const [zgoda, setZgoda] = useState(true);

  return (
    <div className="form-group form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="zgoda"
        checked={zgoda}
        onChange={(e) => setZgoda(e.target.checked)}
      />
      <label className="form-check-label" htmlFor="zgoda">Akceptuję regulamin</label>
      <p>{zgoda ? 'zaznaczony' : 'odznaczony'}</p>
    </div>
  );
}

//@ FORM-06 | checkbox controls disabled of another input (26.06 haslo) | useState
export function FormCheckboxDisabled() {
  const [generuj, setGeneruj] = useState(true);
  const [haslo, setHaslo] = useState('');

  return (
    <div className="form-group mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="generuj"
        checked={generuj}
        onChange={(e) => setGeneruj(e.target.checked)}
      />
      <label className="form-check-label ms-1" htmlFor="generuj">Wygeneruj hasło</label>
      <br />
      <label htmlFor="haslo">Hasło:</label>
      <input
        type="password"
        className="form-control"
        id="haslo"
        disabled={generuj}
        value={haslo}
        onChange={(e) => setHaslo(e.target.value)}
      />
    </div>
  );
}

//@ FORM-07 | switches (form-switch, inline) for several categories (25.01) | useState
export function FormPrzelaczniki() {
  const [kwiaty, setKwiaty] = useState(true);
  const [zwierzeta, setZwierzeta] = useState(true);

  return (
    <div>
      <div className="form-check form-switch form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="kwiaty"
          checked={kwiaty}
          onChange={(e) => setKwiaty(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="kwiaty">Kwiaty</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="zwierzeta"
          checked={zwierzeta}
          onChange={(e) => setZwierzeta(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="zwierzeta">Zwierzęta</label>
      </div>
      <p>kwiaty: {String(kwiaty)}, zwierzęta: {String(zwierzeta)}</p>
    </div>
  );
}

//@ FORM-08 | radio buttons (one value from a group) | useState
export function FormRadio() {
  const [plec, setPlec] = useState('K');

  return (
    <div className="form-group mb-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="plec"
          id="kobieta"
          value="K"
          checked={plec === 'K'}
          onChange={(e) => setPlec(e.target.value)}
        />
        <label className="form-check-label" htmlFor="kobieta">Kobieta</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="plec"
          id="mezczyzna"
          value="M"
          checked={plec === 'M'}
          onChange={(e) => setPlec(e.target.value)}
        />
        <label className="form-check-label" htmlFor="mezczyzna">Mężczyzna</label>
      </div>
      <p>Wybrano: {plec}</p>
    </div>
  );
}

//@ FORM-09 | radio group generated from an array | useState
export function FormRadioZTablicy() {
  const rozmiary = ['S', 'M', 'L', 'XL'];
  const [rozmiar, setRozmiar] = useState('M');

  return (
    <div className="form-group mb-3">
      {rozmiary.map((r) => (
        <div key={r} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="rozmiar"
            id={'rozmiar' + r}
            value={r}
            checked={rozmiar === r}
            onChange={(e) => setRozmiar(e.target.value)}
          />
          <label className="form-check-label" htmlFor={'rozmiar' + r}>{r}</label>
        </div>
      ))}
      <p>Rozmiar: {rozmiar}</p>
    </div>
  );
}

//@ FORM-10 | textarea + character counter | useState
export function FormTextarea() {
  const [opis, setOpis] = useState('');

  return (
    <div className="form-group mb-3">
      <label htmlFor="opis">Opis:</label>
      <textarea
        className="form-control"
        id="opis"
        rows="3"
        maxLength={200}
        value={opis}
        onChange={(e) => setOpis(e.target.value)}
      ></textarea>
      <small className="text-muted">{opis.length}/200</small>
    </div>
  );
}

//@ FORM-11 | ONE object state for many fields, handler uses e.target.name | useState
export function FormObiekt() {
  const [dane, setDane] = useState({ imie: '', email: '', wiek: '' });

  function zmien(e) {
    setDane({ ...dane, [e.target.name]: e.target.value });   // name attr = key in the object
  }

  function wyslij(e) {
    e.preventDefault();
    console.log(dane);
  }

  return (
    <form onSubmit={wyslij}>
      <div className="form-group mb-2">
        <label htmlFor="imieKlienta">Imię:</label>
        <input type="text" className="form-control" id="imieKlienta" name="imie" value={dane.imie} onChange={zmien} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="emailKlienta">E-mail:</label>
        <input type="email" className="form-control" id="emailKlienta" name="email" value={dane.email} onChange={zmien} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="wiekKlienta">Wiek:</label>
        <input type="number" className="form-control" id="wiekKlienta" name="wiek" value={dane.wiek} onChange={zmien} />
      </div>
      <button type="submit" className="btn btn-primary">Wyślij</button>
    </form>
  );
}

//@ FORM-12 | save a SNAPSHOT on submit, show it below the form (26.06) | useState
export function FormZapisane() {
  const [adres, setAdres] = useState('');
  const [zapisane, setZapisane] = useState({ adres: '' });   // initial = what the illustration shows

  function zapisz(e) {
    e.preventDefault();
    setZapisane({ adres: adres });
  }

  return (
    <div>
      <form onSubmit={zapisz}>
        <div className="form-group m-2">
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
        <button type="submit" className="btn btn-primary m-2">Zapisz</button>
      </form>
      <p className="p-2 text-primary lead">Adres: {zapisane.adres}</p>
    </div>
  );
}

//@ FORM-13 | validation: required fields, message on the page | useState
export function FormWalidacja() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [komunikat, setKomunikat] = useState('');

  function zaloguj(e) {
    e.preventDefault();
    if (login.trim() === '' || haslo.trim() === '') {
      setKomunikat('Wypełnij wszystkie pola');
    } else if (haslo.length < 8) {
      setKomunikat('Hasło musi mieć co najmniej 8 znaków');
    } else {
      setKomunikat('Zalogowano: ' + login);
    }
  }

  return (
    <form onSubmit={zaloguj}>
      <div className="form-group mb-2">
        <label htmlFor="login">Login:</label>
        <input type="text" className="form-control" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="hasloLogowania">Hasło:</label>
        <input type="password" className="form-control" id="hasloLogowania" value={haslo} onChange={(e) => setHaslo(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Zaloguj</button>
      <p className="mt-2">{komunikat}</p>
    </form>
  );
}

//@ FORM-14 | clear the form after submit (reset all states) | useState
export function FormCzysc() {
  const [tytul, setTytul] = useState('');
  const [rodzaj, setRodzaj] = useState('');

  function dodaj(e) {
    e.preventDefault();
    console.log(`tytul: ${tytul}; rodzaj: ${rodzaj}`);
    setTytul('');
    setRodzaj('');
  }

  return (
    <form onSubmit={dodaj}>
      <div className="form-group mb-2">
        <label htmlFor="tytul">Tytuł filmu</label>
        <input type="text" className="form-control" id="tytul" value={tytul} onChange={(e) => setTytul(e.target.value)} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="rodzajFilmu">Rodzaj</label>
        <select className="form-control form-select" id="rodzajFilmu" value={rodzaj} onChange={(e) => setRodzaj(e.target.value)}>
          <option value=""></option>
          <option value="1">Komedia</option>
          <option value="2">Horror</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Dodaj</button>
    </form>
  );
}

//@ FORM-15 | button with onClick instead of a form (no submit, no reload) | useState
export function FormPrzycisk() {
  const [tekst, setTekst] = useState('');

  function pokaz() {
    console.log(tekst);
    alert('Wpisano: ' + tekst);
  }

  return (
    <div className="form-group mb-3">
      <label htmlFor="tekst">Tekst:</label>
      <input type="text" className="form-control" id="tekst" value={tekst} onChange={(e) => setTekst(e.target.value)} />
      <button type="button" className="btn btn-primary mt-2" onClick={pokaz}>Pokaż</button>
    </div>
  );
}

//@ FORM-16 | range slider with live value | useState
export function FormSuwak() {
  const [glosnosc, setGlosnosc] = useState(50);

  return (
    <div className="form-group mb-3">
      <label htmlFor="glosnosc" className="form-label">Głośność: {glosnosc}</label>
      <input
        type="range"
        className="form-range"
        id="glosnosc"
        min="0"
        max="100"
        value={glosnosc}
        onChange={(e) => setGlosnosc(Number(e.target.value))}
      />
    </div>
  );
}

//@ FORM-17 | uncontrolled input read with useRef (allowed: "React way", not DOM) | useRef
export function FormRef() {
  const poleRef = useRef(null);

  function pokaz(e) {
    e.preventDefault();
    console.log(poleRef.current.value);
  }

  return (
    <form onSubmit={pokaz}>
      <div className="form-group mb-3">
        <label htmlFor="nazwisko">Nazwisko:</label>
        <input type="text" className="form-control" id="nazwisko" ref={poleRef} />
      </div>
      <button type="submit" className="btn btn-primary">Pokaż</button>
    </form>
  );
}

//@ FORM-18 | date + tel inputs (time / email work the same; type only changes the picker) | useState
export function FormTypyPol() {
  const [data, setData] = useState('');
  const [telefon, setTelefon] = useState('');

  return (
    <div>
      <div className="form-group mb-2">
        <label htmlFor="data">Data wizyty:</label>
        <input type="date" className="form-control" id="data" value={data} onChange={(e) => setData(e.target.value)} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="telefon">Telefon:</label>
        <input type="tel" className="form-control" id="telefon" placeholder="123-456-789" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
      </div>
      <p>data (format RRRR-MM-DD): {data}</p>
    </div>
  );
}
