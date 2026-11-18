// ======================================================================
// 06 JS HELPERS - plain functions (no React). Paste the function INSIDE App
// (above return) or above App. Everything below "// --- demo" is only for the viewer.
// ======================================================================
import { useState } from 'react';

//@ JS-01 | random integer from min to max (both inclusive) | -
function losuj(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// --- demo
export function DemoLosuj() {
  const [wynik, setWynik] = useState(losuj(1, 6));
  return <button type="button" className="btn btn-primary" onClick={() => setWynik(losuj(1, 6))}>Rzut: {wynik}</button>;
}

//@ JS-02 | random element of an array | -
function losowyElement(tablica) {
  return tablica[Math.floor(Math.random() * tablica.length)];
}
// --- demo
export function DemoLosowyElement() {
  const owoce = ['jabłko', 'gruszka', 'śliwka', 'banan'];
  const [owoc, setOwoc] = useState(owoce[0]);
  return <button type="button" className="btn btn-primary" onClick={() => setOwoc(losowyElement(owoce))}>{owoc}</button>;
}

//@ JS-03 | shuffle array (Fisher-Yates, returns a NEW array) | -
function tasuj(tablica) {
  const kopia = [...tablica];
  for (let i = kopia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopia[i], kopia[j]] = [kopia[j], kopia[i]];
  }
  return kopia;
}
// --- demo
export function DemoTasuj() {
  const [karty, setKarty] = useState([1, 2, 3, 4, 5]);
  return <button type="button" className="btn btn-primary" onClick={() => setKarty(tasuj(karty))}>{karty.join(' ')}</button>;
}

//@ JS-04 | n different random numbers (lotto) | -
function losujBezPowtorzen(ile, min, max) {
  const wynik = [];
  while (wynik.length < ile) {
    const liczba = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!wynik.includes(liczba)) {
      wynik.push(liczba);           // push is fine on a LOCAL array (not state)
    }
  }
  return wynik;
}
// --- demo
export function DemoLotto() {
  const [liczby, setLiczby] = useState(losujBezPowtorzen(6, 1, 49));
  return <button type="button" className="btn btn-primary" onClick={() => setLiczby(losujBezPowtorzen(6, 1, 49))}>{liczby.join(', ')}</button>;
}

//@ JS-05 | password generator (letters, digits, special chars) (26.06 topic) | -
function generujHaslo(dlugosc, zCyframi, zeZnakami) {
  let znaki = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (zCyframi) {
    znaki += '0123456789';
  }
  if (zeZnakami) {
    znaki += '!@#$%^&*()_+-=';
  }
  let haslo = '';
  for (let i = 0; i < dlugosc; i++) {
    haslo += znaki[Math.floor(Math.random() * znaki.length)];
  }
  return haslo;
}
// --- demo
export function DemoHaslo() {
  const [haslo, setHaslo] = useState(generujHaslo(12, true, true));
  return <button type="button" className="btn btn-primary" onClick={() => setHaslo(generujHaslo(12, true, true))}>{haslo}</button>;
}

//@ JS-06 | number formatting: toFixed, toLocaleString, price in zł | -
function formatujCene(kwota) {
  return kwota.toFixed(2).replace('.', ',') + ' zł';
}
// --- demo
export function DemoFormat() {
  const x = 1234567.891;
  return (
    <ul>
      <li>toFixed(2): {x.toFixed(2)}</li>
      <li>toLocaleString pl: {x.toLocaleString('pl-PL', { maximumFractionDigits: 2 })}</li>
      <li>formatujCene: {formatujCene(19.9)}</li>
      <li>Math.round(x*100)/100: {Math.round(x * 100) / 100}</li>
    </ul>
  );
}

//@ JS-07 | number checks: empty / NaN / integer / range for input strings | -
function poprawnaLiczba(tekst, min, max) {
  if (tekst.trim() === '') {
    return false;
  }
  const n = Number(tekst);
  return Number.isInteger(n) && n >= min && n <= max;
}
// --- demo
export function DemoPoprawnaLiczba() {
  return (
    <ul>
      {['5', '0', '3.5', 'abc', '', '10'].map((t) => (
        <li key={t}>"{t}" (1-10): {String(poprawnaLiczba(t, 1, 10))}</li>
      ))}
    </ul>
  );
}

//@ JS-08 | string basics: trim, case, includes, split, join, replace, slice, padStart | -
function inicjaly(imieNazwisko) {
  return imieNazwisko
    .trim()
    .split(' ')
    .filter((s) => s !== '')
    .map((s) => s[0].toUpperCase())
    .join('.');
}
// --- demo
export function DemoNapisy() {
  const t = '  Jan Kowalski  ';
  return (
    <ul>
      <li>trim: "{t.trim()}"</li>
      <li>upper / lower: {t.trim().toUpperCase()} / {t.trim().toLowerCase()}</li>
      <li>includes "Kow": {String(t.includes('Kow'))}</li>
      <li>split: {JSON.stringify(t.trim().split(' '))}</li>
      <li>replaceAll: {'a-b-c'.replaceAll('-', '+')}</li>
      <li>slice(0, 3): {t.trim().slice(0, 3)}</li>
      <li>padStart: {String(7).padStart(3, '0')}</li>
      <li>inicjaly: {inicjaly(t)}</li>
    </ul>
  );
}

//@ JS-09 | capitalize first letter / reverse / palindrome | -
function wielkaPierwsza(tekst) {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
}

function odwroc(tekst) {
  return tekst.split('').reverse().join('');
}

function czyPalindrom(tekst) {
  const czysty = tekst.toLowerCase().replaceAll(' ', '');
  return czysty === odwroc(czysty);
}
// --- demo
export function DemoNapisy2() {
  return <p>{wielkaPierwsza('kRAKÓW')}, {odwroc('React')}, kajak: {String(czyPalindrom('Kajak'))}</p>;
}

//@ JS-10 | count characters: vowels, digits, uppercase in a string | -
function policzZnaki(tekst) {
  let samogloski = 0;
  let cyfry = 0;
  let wielkie = 0;
  for (const znak of tekst) {
    if ('aeiouyąęóAEIOUYĄĘÓ'.includes(znak)) {
      samogloski++;
    }
    if (znak >= '0' && znak <= '9') {
      cyfry++;
    }
    if (znak !== znak.toLowerCase()) {
      wielkie++;
    }
  }
  return { samogloski, cyfry, wielkie };
}
// --- demo
export function DemoPoliczZnaki() {
  return <p>{JSON.stringify(policzZnaki('Ala ma 2 Koty'))}</p>;
}

//@ JS-11 | simple validators: email, password strength, postal code, PESEL length | -
function poprawnyEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function silneHaslo(haslo) {
  return haslo.length >= 8 && /[A-Z]/.test(haslo) && /[a-z]/.test(haslo) && /[0-9]/.test(haslo);
}

function poprawnyKodPocztowy(kod) {
  return /^\d{2}-\d{3}$/.test(kod);
}

function poprawnyPeselFormat(pesel) {
  return /^\d{11}$/.test(pesel);
}
// --- demo
export function DemoWalidatory() {
  return (
    <ul>
      <li>a@b.pl: {String(poprawnyEmail('a@b.pl'))}, ab.pl: {String(poprawnyEmail('ab.pl'))}</li>
      <li>Haslo123: {String(silneHaslo('Haslo123'))}, haslo: {String(silneHaslo('haslo'))}</li>
      <li>50-001: {String(poprawnyKodPocztowy('50-001'))}</li>
      <li>12345678901: {String(poprawnyPeselFormat('12345678901'))}</li>
    </ul>
  );
}

//@ JS-12 | dates: today as RRRR-MM-DD, Polish format, days between two dates | -
function dzisiaj() {
  // LOCAL date (toISOString() is UTC -> yesterday's date just after midnight in Poland)
  const d = new Date();
  const miesiac = String(d.getMonth() + 1).padStart(2, '0');
  const dzien = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${miesiac}-${dzien}`;
}

function dniMiedzy(data1, data2) {
  const ms = new Date(data2) - new Date(data1);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}
// --- demo
export function DemoDaty() {
  return (
    <ul>
      <li>dzisiaj(): {dzisiaj()}</li>
      <li>pl-PL: {new Date().toLocaleDateString('pl-PL')}</li>
      <li>dniMiedzy 2026-06-01..2026-06-15: {dniMiedzy('2026-06-01', '2026-06-15')}</li>
    </ul>
  );
}

//@ JS-13 | count occurrences in array -> object { value: count } | -
function policzWystapienia(tablica) {
  const wynik = {};
  for (const el of tablica) {
    wynik[el] = (wynik[el] || 0) + 1;
  }
  return wynik;
}
// --- demo
export function DemoWystapienia() {
  return <p>{JSON.stringify(policzWystapienia([1, 3, 1, 6, 6, 6]))}</p>;
}

//@ JS-14 | math helpers: BMI, percent, even/odd, prime, factorial | -
function bmi(wagaKg, wzrostCm) {
  const m = wzrostCm / 100;
  return wagaKg / (m * m);
}

function czyPierwsza(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function silnia(n) {
  let wynik = 1;
  for (let i = 2; i <= n; i++) {
    wynik *= i;
  }
  return wynik;
}
// --- demo
export function DemoMatma() {
  return (
    <ul>
      <li>BMI 70 kg / 175 cm: {bmi(70, 175).toFixed(1)}</li>
      <li>15% z 200: {(200 * 15) / 100}</li>
      <li>7 parzysta: {String(7 % 2 === 0)}</li>
      <li>pierwsze do 30: {Array.from({ length: 30 }, (_, i) => i).filter(czyPierwsza).join(' ')}</li>
      <li>5! = {silnia(5)}</li>
    </ul>
  );
}

//@ JS-15 | copy data from dane.txt: object literal array (fix quotes / commas) | -
const zdjeciaZPliku = [
  // dane.txt objects pasted as-is; keys without quotes are fine in JS
  { id: 0, alt: 'Mak', filename: 'obraz1.jpg', category: 1, downloads: 35 },
  { id: 1, alt: 'Bratek', filename: 'obraz2.jpg', category: 1, downloads: 43 },
];
// --- demo
export function DemoDaneZPliku() {
  return <p>{zdjeciaZPliku.length} obiekty, pierwszy: {zdjeciaZPliku[0].alt}</p>;
}
