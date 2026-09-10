# BESS Consulting — Website

Statische Marketingseite für BESS Consulting (Waldemar Brauer, Bruchsal).
Astro + Tailwind CSS, ohne Backend und ohne Node-Laufzeit im Betrieb.

**Positionierung:** Nicht Bericht, sondern Ergebnis. Energieaudit mit
36 Monaten Umsetzungsbegleitung für Handwerk und produzierende KMU.
Grundlage ist die Blue-Ocean-Strategie vom April 2026 unter `docs/strategie/`.

## Entwicklung

```bash
npm ci
npm run dev
```

Läuft auf http://localhost:4321.

## Build

Der Build kennt zwei Ziele, gesteuert über `PUBLIC_BASE`:

```bash
npm run build
```

Baut für die eigene Domain (Base `/`). Ergebnis liegt in `dist/` und wird
bei ALL-INKL in das Webverzeichnis geladen.

```bash
npm run build:pages
```

Baut für die GitHub-Pages-Vorschau unter dem Unterpfad `/bess-consulting/`.
Diesen Build erledigt der Workflow `.github/workflows/pages.yml` automatisch
bei jedem Push auf `main`.

## Vorschau lokal ansehen

```bash
npm run preview
```

## Stand und Freigaben

Der Entwurf steht bewusst auf `noindex` — `public/robots.txt` sperrt zusätzlich
alle Crawler. Vor dem Go-Live:

- Rechtstexte durch BESS freigeben (Impressum und Datenschutz sind Arbeitsfassungen)
- Zahlen bestätigen: „50+ Audits", „European Energy Manager", Preise 2.500 € / 8.500 €
- BAFA-Förderquoten und Eigenanteil-Spanne fachlich prüfen
- `PUBLIC_INDEXABLE=true` setzen, `robots.txt` und `X-Robots-Tag` in `.htaccess` umstellen

Details und offene Punkte: `docs/plans/REDESIGN-V5.md`.

## Sicherheit

`public/.htaccess` setzt CSP, HSTS-Vorbereitung, Framing-Sperre und weitere Header
für den Apache-Betrieb bei ALL-INKL. Die CSP verlangt, dass kein Inline-JavaScript
verwendet wird — Skripte gehören nach `public/site.js`.

Nach jeder Änderung: Security-Review mit dem Subagenten `security-reviewer`.
Letzter Stand siehe `docs/plans/REDESIGN-V5.md`.

---

Umsetzung: [KlassenMedia](https://klassen-media.de)
