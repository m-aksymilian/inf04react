// Behaviour tests of every ready app = the "obowiązkowo w działaniu" checks from the grading keys.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fs from 'node:fs';
import path from 'node:path';

import Kursy from '../../1_READY_APPS/01_kursy_2022_06/App.jsx';
import Film from '../../1_READY_APPS/02_film_2023_06/App.jsx';
import Galeria from '../../1_READY_APPS/03_galeria_2025_01/App.jsx';
import Hasla from '../../1_READY_APPS/04_menedzer_hasel_2026_06/App.jsx';
import Rejestracja from '../../1_READY_APPS/05_rejestracja_konta_PRACTICE/App.jsx';
import Weterynarz from '../../1_READY_APPS/06_wizyta_weterynarz_PRACTICE/App.jsx';
import Przesylka from '../../1_READY_APPS/07_nadaj_przesylke_PRACTICE/App.jsx';
import Kosci from '../../1_READY_APPS/08_gra_w_kosci_PRACTICE/App.jsx';
import Quiz from '../../1_READY_APPS/09_quiz_PRACTICE/App.jsx';
import Notatki from '../../1_READY_APPS/10_notatki_PRACTICE/App.jsx';

let log;
beforeEach(() => {
  log = vi.spyOn(console, 'log').mockImplementation(() => {});
});
const logged = () => log.mock.calls.map((c) => c.join(' '));

describe('static rules from every key (all App.jsx files)', () => {
  const root = path.resolve(__dirname, '../../1_READY_APPS');
  for (const dir of fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'App.jsx')))) {
    const src = fs.readFileSync(path.join(root, dir, 'App.jsx'), 'utf8');
    it(`${dir}: no DOM methods, no class=/for=, bootstrap imported, one component`, () => {
      expect(src).not.toMatch(/getElementById|querySelector|document\./);
      expect(src).not.toMatch(/\sclass=|\sfor=|onclick=/);
      expect(src).toContain("import 'bootstrap/dist/css/bootstrap.css';");
      expect(src.match(/^function \w+\(\)|^export default function/gm)).toHaveLength(1);
    });
  }
});

describe('01 kursy 2022', () => {
  it('h2 with array length, ol with all courses, empty fields', () => {
    render(<Kursy />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveProperty('textContent', 'Liczba kursów: 3');
    expect(screen.getAllByRole('listitem').map((li) => li.textContent))
      .toEqual(['Programowanie w C#', 'Angular dla początkujących', 'Kurs Django']);
    expect(screen.getByLabelText('Imię i nazwisko:').value).toBe('');
    expect(screen.getByLabelText('Numer kursu:').value).toBe('');
  });
  it('valid number -> name + course, invalid -> message', async () => {
    const user = userEvent.setup();
    render(<Kursy />);
    await user.type(screen.getByLabelText('Imię i nazwisko:'), 'Jan Twardowski');
    await user.type(screen.getByLabelText('Numer kursu:'), '1');
    await user.click(screen.getByRole('button', { name: 'Zapisz do kursu' }));
    expect(logged()).toEqual(['Jan Twardowski', 'Programowanie w C#']);
    for (const bad of ['4', '0']) {
      log.mockClear();
      await user.clear(screen.getByLabelText('Numer kursu:'));
      await user.type(screen.getByLabelText('Numer kursu:'), bad);
      await user.click(screen.getByRole('button', { name: 'Zapisz do kursu' }));
      expect(logged()).toEqual(['Jan Twardowski', 'Nieprawidłowy numer kursu']);
    }
  });
});

describe('02 film 2023', () => {
  it('5 options (empty + 1..4), empty start, console format', async () => {
    const user = userEvent.setup();
    render(<Film />);
    const select = screen.getByLabelText('Rodzaj');
    expect([...select.options].map((o) => [o.value, o.text]))
      .toEqual([['', ''], ['1', 'Komedia'], ['2', 'Obyczajowy'], ['3', 'Sensacyjny'], ['4', 'Horror']]);
    expect(select.value).toBe('');
    await user.type(screen.getByLabelText('Tytuł filmu'), 'Vinci');
    await user.selectOptions(select, '1');
    await user.click(screen.getByRole('button', { name: 'Dodaj' }));
    expect(logged()).toEqual(['tytul: Vinci; rodzaj: 1']);
  });
  it('body padding is in the CSS file', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../../1_READY_APPS/02_film_2023_06/App.css'), 'utf8');
    expect(css.replace(/\s/g, '')).toContain('body{padding:20px;}');
  });
});

describe('03 galeria 2025', () => {
  it('all switches on and 12 photos at start; switch filters; Pobierz +1', async () => {
    const user = userEvent.setup();
    render(<Galeria />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Kategorie zdjęć');
    for (const name of ['Kwiaty', 'Zwierzęta', 'Samochody']) expect(screen.getByLabelText(name).checked).toBe(true);
    expect(screen.getAllByRole('img')).toHaveLength(12);

    await user.click(screen.getByLabelText('Zwierzęta'));
    expect(screen.getAllByRole('img').map((i) => i.alt)).toEqual(['Mak', 'Bukiet', 'Audi', 'Róża', 'Garbus']);
    await user.click(screen.getByLabelText('Kwiaty'));
    expect(screen.getAllByRole('img').map((i) => i.alt)).toEqual(['Audi', 'Garbus']);

    const garbus = screen.getByAltText('Garbus').parentElement;
    expect(within(garbus).getByRole('heading', { level: 4 }).textContent).toBe('Pobrań: 321');
    for (let i = 0; i < 12; i++) await user.click(within(garbus).getByRole('button', { name: 'Pobierz' }));
    expect(within(garbus).getByRole('heading', { level: 4 }).textContent).toBe('Pobrań: 333');
    expect(within(garbus).getByRole('button').className).toBe('btn btn-success');

    await user.click(screen.getByLabelText('Zwierzęta'));
    await user.click(screen.getByLabelText('Kwiaty'));
    expect(screen.getAllByRole('img')).toHaveLength(12);
    expect(screen.getByAltText('Garbus').getAttribute('src')).toBe('/assets/obraz12.jpg');
  });
});

describe('04 menedżer haseł 2026', () => {
  it('initial state matches illustration 1', () => {
    render(<Hasla />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/^Menedżer haseł - wykonał \d+$/);
    expect(screen.getByLabelText('Adres WWW:').placeholder).toBe('Adres strony WWW');
    expect(screen.getByLabelText('Login:').placeholder).toBe('Twój login');
    expect(screen.getByLabelText('Wygeneruj hasło').checked).toBe(true);
    expect(screen.getByLabelText('Hasło:').disabled).toBe(true);
    expect(screen.getByLabelText('Hasło:').type).toBe('password');
    const paragraphs = document.querySelectorAll('p');
    expect([...paragraphs].map((p) => p.textContent.trim())).toEqual(['Adres:', 'Login:', 'Hasło automatycznie generowane']);
    expect(paragraphs[0].className).toContain('text-primary');
    expect(paragraphs[0].className).toContain('lead');
    expect([...paragraphs].every((p) => p.className.includes('p-2'))).toBe(true);
  });
  it('checkbox toggles password field; both submit variants', async () => {
    const user = userEvent.setup();
    render(<Hasla />);
    await user.type(screen.getByLabelText('Adres WWW:'), 'poczta.pl');
    await user.type(screen.getByLabelText('Login:'), 'Tomek');
    await user.click(screen.getByRole('button', { name: 'Zapisz' }));
    expect(screen.getByText('Adres: poczta.pl')).toBeTruthy();
    expect(screen.getByText('Login: Tomek')).toBeTruthy();
    expect(screen.getByText('Hasło automatycznie generowane')).toBeTruthy();

    await user.click(screen.getByLabelText('Wygeneruj hasło'));
    expect(screen.getByLabelText('Hasło:').disabled).toBe(false);
    await user.type(screen.getByLabelText('Hasło:'), 'sYt@kU*&');
    // nothing changes before submit
    expect(screen.getByText('Hasło automatycznie generowane')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Zapisz' }));
    expect(screen.getByText('Hasło: sYt@kU*&')).toBeTruthy();

    await user.click(screen.getByLabelText('Wygeneruj hasło'));
    expect(screen.getByLabelText('Hasło:').disabled).toBe(true);
  });
});

describe('05 rejestracja (practice)', () => {
  it('author at start, 3 messages', async () => {
    const user = userEvent.setup();
    render(<Rejestracja />);
    expect(screen.getByText(/^Autor/)).toBeTruthy();
    const ok = screen.getByRole('button', { name: 'ZATWIERDŹ' });
    await user.type(screen.getByLabelText('Podaj e-mail:'), 'janek.pl');
    await user.click(ok);
    expect(screen.getByText('Nieprawidłowy adres e-mail')).toBeTruthy();
    await user.clear(screen.getByLabelText('Podaj e-mail:'));
    await user.type(screen.getByLabelText('Podaj e-mail:'), 'jan@poczta.pl');
    await user.type(screen.getByLabelText('Podaj hasło:'), 'abc');
    await user.type(screen.getByLabelText('Powtórz hasło:'), 'abd');
    await user.click(ok);
    expect(screen.getByText('Hasła się różnią')).toBeTruthy();
    await user.clear(screen.getByLabelText('Powtórz hasło:'));
    await user.type(screen.getByLabelText('Powtórz hasło:'), 'abc');
    await user.click(ok);
    expect(screen.getByText('Witaj jan@poczta.pl')).toBeTruthy();
  });
});

describe('06 weterynarz (practice)', () => {
  it('species sets slider max, summary joined with commas', async () => {
    const user = userEvent.setup();
    render(<Weterynarz />);
    const suwak = screen.getByLabelText('Ile ma lat?');
    expect(suwak.value).toBe('0');
    expect(screen.getByLabelText('Czas wizyty').value).toBe('16:00');
    await user.selectOptions(screen.getByLabelText('Gatunek'), 'Pies');
    expect(suwak.max).toBe('18');
    await user.selectOptions(screen.getByLabelText('Gatunek'), 'Świnka morska');
    expect(suwak.max).toBe('9');
    await user.type(screen.getByPlaceholderText('Imię i nazwisko właściciela...'), 'Jan Kowalski');
    await user.type(screen.getByPlaceholderText('Cel wizyty'), 'szczepienie');
    await user.click(screen.getByRole('button', { name: 'OK' }));
    expect(screen.getByText('Jan Kowalski, Świnka morska, 0, szczepienie, 16:00')).toBeTruthy();
  });
});

describe('07 nadaj przesyłkę (practice)', () => {
  it('price only after button, postal code messages', async () => {
    const user = userEvent.setup();
    render(<Przesylka />);
    expect(screen.getByLabelText('Pocztówka').checked).toBe(true);
    expect(screen.getByRole('img').getAttribute('src')).toBe('/assets/pocztowka.png');
    await user.click(screen.getByLabelText('List'));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/assets/pocztowka.png');
    await user.click(screen.getByRole('button', { name: 'Sprawdź Cenę' }));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/assets/list.png');
    expect(screen.getByText('Cena: 1,5 zł')).toBeTruthy();

    const kod = screen.getByLabelText('Kod pocztowy');
    const zatwierdz = screen.getByRole('button', { name: 'Zatwierdź' });
    const cases = [
      ['1234', 'Nieprawidłowa liczba cyfr w kodzie pocztowym'],
      ['12a45', 'Kod pocztowy powinien się składać z samych cyfr'],
      ['12345', 'Dane przesyłki zostały wprowadzone'],
    ];
    for (const [value, message] of cases) {
      await user.clear(kod);
      await user.type(kod, value);
      await user.click(zatwierdz);
      expect(screen.getByText(message)).toBeTruthy();
    }
  });
});

describe('08 kości (practice)', () => {
  it('kosc0 at start, sum 0; locked die keeps value; sum = total', async () => {
    const user = userEvent.setup();
    render(<Kosci />);
    const imgs = () => screen.getAllByRole('img');
    expect(imgs().map((i) => i.getAttribute('src'))).toEqual(Array(5).fill('/assets/kosc0.png'));
    expect(screen.getByText('0')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'RZUT' }));
    const first = imgs()[0].getAttribute('src');
    expect(first).toMatch(/kosc[1-6]\.png/);
    await user.click(imgs()[0]);
    expect(imgs()[0].className).toContain('niedostepna');
    for (let i = 0; i < 10; i++) await user.click(screen.getByRole('button', { name: 'RZUT' }));
    expect(imgs()[0].getAttribute('src')).toBe(first);
    const total = imgs().reduce((s, i) => s + Number(i.getAttribute('src').match(/kosc(\d)/)[1]), 0);
    expect(document.querySelector('.wynik').textContent).toBe(String(total));
  });
});

describe('09 quiz (practice)', () => {
  it('scores, advances, wraps, clears radio', async () => {
    const user = userEvent.setup();
    render(<Quiz />);
    expect(screen.getByText('Które to schronisko?')).toBeTruthy();
    await user.click(screen.getByLabelText('Na Wielkiej Raczy.'));
    await user.click(screen.getByRole('button', { name: 'DALEJ' }));
    expect(screen.getByText('Zwierzę na zdjęciu to')).toBeTruthy();
    expect(screen.getAllByRole('radio').some((r) => r.checked)).toBe(false);
    await user.click(screen.getByLabelText('wilk.'));
    await user.click(screen.getByRole('button', { name: 'DALEJ' }));
    await user.click(screen.getByLabelText('Tatry.'));
    await user.click(screen.getByRole('button', { name: 'DALEJ' }));
    expect(screen.getByText('Które to schronisko?')).toBeTruthy();
    expect(logged()).toEqual(['Punkty: 1', 'Punkty: 1', 'Punkty: 2']);
  });
});

describe('10 notatki (practice)', () => {
  it('one note at start, DODAJ appends', async () => {
    const user = userEvent.setup();
    render(<Notatki />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    await user.type(screen.getByLabelText('Tytuł notatki:'), 'Egzamin');
    await user.type(screen.getByLabelText('Treść notatki:'), 'INF.04 w czerwcu');
    await user.click(screen.getByRole('button', { name: 'DODAJ' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')[1].textContent).toBe('Egzamin: INF.04 w czerwcu');
  });
});
