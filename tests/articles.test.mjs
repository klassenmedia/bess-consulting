// Erzwingt die Annahme aus dem Threat Model: articles.json enthält nur
// autorenkontrolliertes Markup aus einer festen Allowlist. Läuft im Build mit,
// damit ein CMS-Import oder eine fremde Redaktion nicht still durchrutscht.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const artikel = JSON.parse(
  readFileSync(new URL('../src/content/articles.json', import.meta.url), 'utf8'),
);

const ERLAUBTE_TAGS = new Set(['p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'br']);
const ERLAUBTE_ATTRIBUTE = new Set(['href', 'rel']);

function sammleMarkup(eintrag) {
  return eintrag.sections.map(([, html]) => html).join('\n');
}

test('nur erlaubte Tags im Artikel-Markup', () => {
  for (const eintrag of artikel) {
    const gefunden = [...sammleMarkup(eintrag).matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g)];
    for (const [, tag] of gefunden) {
      assert.ok(
        ERLAUBTE_TAGS.has(tag.toLowerCase()),
        `${eintrag.slug}: Tag <${tag}> steht nicht auf der Allowlist`,
      );
    }
  }
});

test('keine Attribute ausserhalb der Allowlist, keine Event-Handler', () => {
  for (const eintrag of artikel) {
    const markup = sammleMarkup(eintrag);
    const attribute = [...markup.matchAll(/\s([a-zA-Z-]+)\s*=/g)];
    for (const [, attr] of attribute) {
      assert.ok(
        ERLAUBTE_ATTRIBUTE.has(attr.toLowerCase()),
        `${eintrag.slug}: Attribut "${attr}" ist nicht erlaubt`,
      );
    }
    assert.doesNotMatch(markup, /\son[a-z]+\s*=/i, `${eintrag.slug}: Event-Handler gefunden`);
    assert.doesNotMatch(markup, /javascript:/i, `${eintrag.slug}: javascript:-URL gefunden`);
    assert.doesNotMatch(markup, /<script|<iframe|<object|<embed|srcdoc/i, `${eintrag.slug}: gefährliches Element`);
  }
});

test('externe Links tragen rel="noopener noreferrer"', () => {
  for (const eintrag of artikel) {
    const links = [...sammleMarkup(eintrag).matchAll(/<a\s+([^>]*)>/g)];
    for (const [, attribute] of links) {
      if (!/href="https?:\/\//.test(attribute)) continue;
      assert.match(
        attribute,
        /rel="noopener noreferrer"/,
        `${eintrag.slug}: externer Link ohne rel-Attribut`,
      );
    }
  }
});

test('Pflichtfelder je Artikel vorhanden', () => {
  for (const eintrag of artikel) {
    for (const feld of ['slug', 'category', 'title', 'description', 'intro', 'sections']) {
      assert.ok(eintrag[feld], `Artikel ohne "${feld}"`);
    }
    assert.match(eintrag.slug, /^[a-z0-9-]+$/, `Slug "${eintrag.slug}" enthält unerwartete Zeichen`);
  }
});
