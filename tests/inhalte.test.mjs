// Sichert Zahlen und Zusagen, die beim Kunden landen: Ein Design-Umbau darf sie
// nicht still verändern. Werte nur nach Rücksprache mit Waldemar Brauer anpassen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const startseite = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const artikelText = readFileSync(new URL('../src/content/articles.json', import.meta.url), 'utf8');

test('Preise der drei Angebote', () => {
  for (const preis of ['auf Anfrage', 'ab 4.800 €', '8.500 €']) {
    assert.ok(startseite.includes(preis), `Preis "${preis}" fehlt`);
  }
});

test('Garantie bleibt an Quickcheck, Schwelle und Berechnung gebunden', () => {
  for (const zeile of [
    'Quickcheck · bei Energiekosten ab 200.000 € pro Jahr',
    'rechnerisches Einsparpotenzial pro Jahr, mindestens',
    'berechnete Amortisation der Maßnahmen',
    'Honorar, wenn der Quickcheck das nicht ausweist',
  ]) {
    assert.ok(startseite.includes(zeile), `Garantiezeile "${zeile}" fehlt`);
  }
});

test('Novelle wird nicht als beschlossen dargestellt', () => {
  assert.ok(startseite.includes('Novelle im Verfahren'));
  for (const text of [startseite, artikelText]) {
    assert.doesNotMatch(text, /Novelle[^.]{0,80}beschlossen|beschlossene Novelle/i);
  }
});
