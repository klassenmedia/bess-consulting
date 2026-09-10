// Prüft die Eingabe-Normalisierung des Größenordnungs-Rechners.
// Die Funktion liegt in public/site.js in einer IIFE — für den Test wird sie
// aus der Quelldatei extrahiert, damit Test und Auslieferung nicht auseinanderlaufen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const quelle = readFileSync(new URL('../public/site.js', import.meta.url), 'utf8');
const treffer = quelle.match(/function clamp\(raw, max\)[\s\S]*?\n {2}\}/);
assert.ok(treffer, 'clamp() nicht in public/site.js gefunden — Test anpassen');

// eslint-disable-next-line no-new-func
const clamp = new Function(`${treffer[0]}; return clamp;`)();

const MAX = 500_000_000;

test('deutsche Schreibweise wird korrekt gelesen', () => {
  assert.equal(clamp('1.000.000', MAX), 1_000_000, 'Tausenderpunkte');
  assert.equal(clamp('1.234', MAX), 1234);
  assert.equal(clamp('750000', MAX), 750_000, 'ohne Trenner');
  assert.equal(clamp('1.500,50', MAX), 1500.5, 'Punkt und Komma gemischt');
  assert.equal(clamp('18,5', MAX), 18.5, 'Dezimalkomma');
  assert.equal(clamp('0,5', MAX), 0.5);
  assert.equal(clamp('5 000', MAX), 5000, 'Leerzeichen als Trenner');
});

test('unbrauchbare Eingaben ergeben 0 statt Teilwerten', () => {
  for (const eingabe of ['12abc', '1,5,5', '', '.', 'Infinity', 'NaN', '1e5', 'abc', '--3']) {
    assert.equal(clamp(eingabe, MAX), 0, `"${eingabe}" muss 0 ergeben`);
  }
});

test('Markup wird nie zu einer Zahl', () => {
  for (const angriff of [
    '<img src=x onerror=alert(1)>',
    '</dd><script>alert(1)</script>',
    'javascript:alert(1)',
    '<a href="https://phish.example">x</a>',
  ]) {
    assert.equal(clamp(angriff, MAX), 0, `"${angriff}" muss 0 ergeben`);
  }
});

test('Negativwerte und Überschreitungen werden geklemmt', () => {
  assert.equal(clamp('-5', MAX), 0);
  assert.equal(clamp('-1.000.000', MAX), 0);
  assert.equal(clamp('999999999', MAX), MAX, 'auf Maximum gedeckelt');
  assert.equal(clamp('9e99', MAX), 0, 'Exponentialschreibweise ist keine Eingabe');
  assert.equal(clamp('100', 100), 100, 'Grenzwert selbst bleibt erhalten');
});

test('Ergebnis ist immer eine endliche, nicht negative Zahl', () => {
  const eingaben = ['1.000.000', '12abc', '', '-5', '9e99', 'NaN', '<b>1</b>', '0,5', '.'];
  for (const eingabe of eingaben) {
    const wert = clamp(eingabe, MAX);
    assert.ok(Number.isFinite(wert), `${eingabe}: endlich`);
    assert.ok(wert >= 0 && wert <= MAX, `${eingabe}: im erlaubten Bereich`);
  }
});
