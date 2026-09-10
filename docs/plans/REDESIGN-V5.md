# BESS Consulting — Redesign V5 (Conversion-Umbau)

Stand: 10.09.2026 · Ausgangsbasis: ChatGPT-Entwurf V4 (Astro 7 / Tailwind 4)

## Befund V4

Technisch sauber, redaktionell erwachsen. Schwach im Auftritt:

1. CSS aus fünf angehängten Override-Blöcken gewachsen — ein dunkles Acid-Theme
   liegt unter drei Türkis-Layern begraben. Ergebnis: blass, ohne Rhythmus.
2. Hero-Mockup ist erfundenes Fake-UI (SaaS-Optik), kein Aussagewert für Energieaudit.
3. `industrial.webp` liegt ungenutzt im Ordner — Startseite hat nur ein Porträt.
4. FAQ-Sektion 1485 px hoch, 15 zugeklappte Zeilen am Stück = höchste und
   langweiligste Sektion der Seite.
5. `motion` als Dependency installiert, `window.Motion` = false → wirkungslos.
6. Kein einziger Beweis: keine Zahl, keine Qualifikation, keine Einordnung.

## Ziel V5

Gleiche Substanz (Texte, Astro-Struktur, Rechtstexte, Blog), neuer Auftritt und
Conversion-Aufbau. Vorbild-Muster: "Trust & Authority" — Credentials sichtbar,
Metriken, dunkler Anker, konservative Akzente.

## Sektionsreihenfolge V5

1. Hero — Botschaft + Pflicht-Anlass (EnEfG/EDL-G) statt Fake-UI
2. Trust-Leiste — DIN EN 16247-1, BAFA-Listung, Standort, Ansprechpartner
3. Was Sie in der Hand haben (3 Ergebnisse) — bleibt, entstaubt
4. DUNKLER ANKER: Industriebild + Kernaussage + Betrachtungsfelder
5. Ablauf 4 Schritte — bleibt
6. Amortisationsrechner (interaktiv) — ersetzt Deko-Mockup
7. Waldemar Brauer — bleibt, stärker gerahmt
8. FAQ — 6 sichtbar + Rest ausklappbar, zweispaltig
9. Wissen/Blog-Teaser — bleibt
10. Kontakt — als echter Abschluss mit Erwartungs-Liste

## Threat Model (Pflichtblock)

Statische Seite ohne Backend, ohne Formular, ohne Datenbank. Trotzdem:

(a) Angreifer-Szenarien
  - XSS über eingebettete Inhalte (Blog-JSON, Schema.org-JSON-LD)
  - Clickjacking / Framing der Seite für Phishing im Namen von BESS
  - Supply-Chain über npm-Dependencies (Astro, Tailwind, motion, fontsource)
  - Manipulierte Rechner-Eingaben (DOM-Injection über Zahlenfelder)
  - Ungewollte Indexierung des Entwurfsstands

(b) Untrusted Inputs
  1. Rechner-Eingaben des Besuchers (Verbrauch kWh, Strompreis ct)
  2. Inhalte aus src/content/articles.json (redaktionell, aber via JSON eingespielt)
  3. Umgebungsvariable PUBLIC_INDEXABLE
  4. URL-Parameter /blog/[slug]
  5. npm-Dependencies (transitiv)

(c) Worst Case
  Fremder Inhalt wird im Namen von BESS ausgeliefert (Reputationsschaden beim
  Ingenieurbüro), oder der Entwurf mit unfertigen Rechtstexten geht in den Index
  und erzeugt Abmahnrisiko.

(d) Gegenmaßnahme pro Input
  1. Rechner: Number-Parsing mit Clamping auf plausible Bereiche, Ausgabe
     ausschliesslich über textContent — nie innerHTML. Keine eval, kein Function().
  2. articles.json: Astro escapt per Default. Alle set:html-Quellen (JSON-LD,
     SVG-Pfade, FAQ-Antworten, Artikeltext) sind ausschliesslich
     autorenkontrollierte Build-Zeit-Konstanten — keine Laufzeit-Eingabe fliesst
     ein. ES GIBT KEINE SANITIZER-ALLOWLIST. Sobald articles.json von Dritten
     oder aus einem CMS befüllt wird, muss vor dem Rendern in [slug].astro ein
     sanitize-html-Durchlauf ergänzt werden (allowedTags p/ul/li/a/strong/em,
     allowedAttributes a: href/rel). Bis dahin gilt: Redaktion nur durch
     KlassenMedia.
  3. PUBLIC_INDEXABLE: strikter Vergleich === 'true', Default noindex.
  4. [slug]: getStaticPaths erzeugt nur bekannte Slugs; kein dynamisches Routing
     zur Laufzeit, da output static.
  5. Dependencies: package-lock.json committen, npm audit vor Deploy.
  6. Header via .htaccess: CSP, X-Frame-Options DENY, X-Content-Type-Options,
     Referrer-Policy, Permissions-Policy, X-Robots-Tag, Options -Indexes,
     Dot-File-Sperre. Ergänzend public/robots.txt mit Disallow.
  7. Externe Links in articles.json tragen rel="noopener noreferrer".

## Definition of Done

- [ ] Build grün (npm run build)
- [ ] Kein Secret im Diff (gitleaks)
- [ ] npm audit sauber oder Findings dokumentiert
- [ ] Kontrast 4.5:1, Fokus sichtbar, reduced-motion respektiert
- [ ] 375 / 768 / 1024 / 1440 px geprüft
- [ ] Security-Review-Pass (Subagent security-reviewer) mit FREIGABE
- [ ] Diese Plan-Datei aktualisiert

## Offen (von BESS zu bestätigen)

- Trust-Leiste: BAFA-Listung? Berufserfahrung in Jahren? Anzahl Audits?
- Rechner: realistische Bandbreite Einsparpotenzial für Auslieferungsstand
- Endgültige Domain + freigegebene Rechtstexte vor Indexierung

---

## Kurskorrektur 10.09.2026 — Blue Ocean 2026

Beim Durchsuchen des Rechners gefunden: ein Design-Brief (April 2024) und eine
Blue-Ocean-Strategie (April 2026) in ~/Downloads. Kein GitHub-Repo, nur eine
Netlify-Site. Der Kunde hat entschieden: **Blue Ocean 2026 gilt**, der 2024er
Stand wird ignoriert.

Beide Dokumente liegen jetzt unter docs/strategie/.

### Was das für die Seite ändert

Positionierungs-Statement (verbindlich):

> „BESS Consulting ist der einzige Energieauditor, der produzierende KMU und
> Handwerksbetriebe nicht nur berät — sondern so lange begleitet, bis die
> Einsparungen in der Kasse ankommen."

Kern: **Nicht Bericht. Ergebnis.**

ERRC-Vorgaben, die direkt auf die Startseite durchschlagen:

| | Konsequenz für V5 |
|---|---|
| Eliminate: Zertifikats-Logos, bundesweite Präsenz, ISO-vs-DIN-Debatte | DIN EN 16247-1 raus aus der Trust-Leiste (Hygienefaktor, kein Argument) |
| Reduce: Norm-Sprache, Fokus auf reine Pflichtaudits | Pflicht-Karte bleibt, aber nicht mehr als Hauptbotschaft |
| Raise: W. Brauer als Person, **konkrete EUR-Zahlen**, BAFA-Begleitung | Zahlen in den Hero, Förderung als Standard-Bestandteil |
| Create: 36-Monate-Modell, Blitzaudit, Branchenmodule | Neue Sektionen — das ist der eigentliche Blue Ocean |

### Angebotsstruktur (aus der Strategie)

1. **Energie-Blitzaudit** — 16 h, 10-Seiten-Aktionsplan, 3 Wochen, ab 2.500 €.
   Top-3-Maßnahmen mit Payback unter 12 Monaten. Einstiegsprodukt.
2. **Audit + 36 Monate Begleitung** — ca. 7.000 € brutto, nach BAFA ab ca.
   1.400–3.500 € Eigenanteil. Quartalsberichte, Fördermittelkoordination.
   Kernprodukt.
3. **Branchenmodule** — Lackierei, KFZ, Metallbau/CNC, Lebensmittel.

### Zielgruppen und Ansprache (wörtlich aus der Strategie)

- GF produzierender KMU, 50–250 MA (Primär)
- Handwerksmeister/Inhaber, 10–50 MA (Wachstum) — „Ihr Kompressor läuft 24/7…"
- Unternehmen mit Investitionsplanung (Trigger) — Förderantrag VOR Beauftragung

### Belegte Zahlen (nur diese verwenden)

- 40+ Audits, European Energy Manager (aus der Wettbewerbstabelle)
- über 60 % der Audit-Empfehlungen werden nicht umgesetzt (Branchenproblem)
- Umsetzungsrate unter 40 %
- 40 % der Nicht-Kunden nennen Bürokratie als Haupthindernis
- bis zu 55 % Investitionsförderung
- BAFA-Förderung: 80 % beim Blitzaudit-Argument für Handwerk

NICHT verwenden (stammen aus dem verworfenen 2024-Brief): 90+ Projekte,
20–35 % Einsparung, 50.000-€-Garantie, DACH+Mazedonien, Preise 4.900/17.900 €.

### Rechner-Anpassung

Statt „angenommene Veränderung %" jetzt am Handwerks-Argument ausgerichtet:
Druckluft/Kompressor als konkreter Einstieg. Weiterhin ohne Einsparversprechen —
die Strategie verlangt konkrete Zahlen, aber eine Garantie ist nicht belegt.

### Offen (mit Waldemar zu klären)

- Sind „40+ Audits" und „European Energy Manager" für die Website freigegeben?
- Preise 2.500 € / 7.000 € öffentlich nennen? (Strategie sagt ja — Raise: konkrete EUR-Zahlen)
- BAFA-Förderquoten: aktueller Stand vor Veröffentlichung prüfen
- Branchenmodule: welche starten zuerst?

---

## Security-Review 10.09.2026 — Findings und Behebung

Subagent `security-reviewer` gegen Commit 9f25f57. Urteil: **BLOCKIERT**.

| Schwere | Finding | Status |
|---|---|---|
| HOCH | `script-src 'self'` blockiert Astros Inline-Script — Navigation, FAQ, Rechner und Reveals wären nach dem Deploy tot. Im Browser mit echtem Header reproduziert. | behoben: Script nach `public/site.js` ausgelagert, kein Inline-JS mehr |
| MITTEL | `font-src 'self'` blockiert das als data-URI eingebettete Manrope-Subset auf allen Seiten | behoben: `font-src 'self' data:` |
| NIEDRIG | Plan behauptete eine set:html-Allowlist, die es nicht gibt | behoben: Ist-Zustand im Threat Model korrigiert |
| NIEDRIG | Externe Links ohne `rel="noopener noreferrer"` | behoben: 7 Links in articles.json ergänzt |
| NIEDRIG | Keine robots.txt, noindex hing allein am Meta-Tag | behoben: robots.txt + X-Robots-Tag |
| NIEDRIG | Ungenutzte Dependency `motion`, tote `global.v4-backup.css` | behoben: deinstalliert und gelöscht |
| NIEDRIG | Kein `Options -Indexes`, keine Dot-File-Sperre | behoben |

Als sauber bestätigt: Rechner-Härtung (17 Grenzfälle, kein NaN/Infinity/Absturz,
Ausgabe nur über textContent), Heading-Hierarchie ohne Sprünge auf allen Seiten,
aria-Attribute, noindex-Logik fail-safe über alle 8 Seiten, gitleaks und semgrep
ohne Fund, npm audit 0 Schwachstellen, keine Third-Party-Requests.

Offener Punkt aus dem Review: keine Testsuite. Für eine statische Seite ohne
Endpoints vertretbar, aber der Grund, warum das CSP-Finding erst im Review auffiel.
Vor dem Deploy ist die Seite mit gesetztem CSP-Header erneut zu verifizieren.

---

## Re-Review 10.09.2026 — FREIGABE

Zweiter Durchlauf gegen db3da0c. Die beiden Sicherheitsfindings sind unabhängig
verifiziert behoben: null CSP-Verstöße auf allen acht Seiten bei ausgeliefertem
echtem Header, Navigation, FAQ, Rechner und Reveals funktionieren dabei
nachweislich. Rechner-Härtung in der externen Datei gleichwertig (16 Grenzfälle,
nur Text-Nodes). Urteil: **FREIGABE**.

Neue Funde aus dem Re-Review, alle behoben:

| Schwere | Finding | Status |
|---|---|---|
| MITTEL | Vertrauliches Strategiedokument im Repo, Sichtbarkeit ungeklärt | Repo ist privat, docs/strategie/VERTRAULICH.md hält die Regel und den Bereinigungsweg fest; docs/ landet nicht im Build (geprüft) |
| MITTEL | Rechner las deutsche Tausenderpunkte falsch: 1.000.000 kWh → 0 € statt 180.000 € | behoben, Ursache war doppelt (clamp + type=number) |
| NIEDRIG | Sektionsnummer 02 doppelt vergeben | behoben, jetzt 01–06 |
| NIEDRIG | Preise ohne USt-Kennzeichnung, Förderzusage im Werbetext | behoben: „zzgl. USt.", BAFA-Anteil als unverbindliches Rechenbeispiel |
| NIEDRIG | set:html ohne erzwungene Allowlist | behoben: tests/articles.test.mjs bricht den Build bei unerwarteten Tags ab |

### Testsuite (neu)

`npm test` läuft bei jedem Build mit (`build` ruft `test` vor `astro build`).

- `tests/clamp.test.mjs` — Eingabe-Normalisierung des Rechners: deutsche
  Schreibweise, Teilwerte, Markup-Injection, Clamping, Wertebereich.
- `tests/articles.test.mjs` — erzwingt die Tag- und Attribut-Allowlist für
  articles.json plus rel-Attribut auf externen Links.

Damit ist die Annahme aus Threat Model (d)2 nicht mehr nur dokumentiert,
sondern durchgesetzt.

### Bewusst offen

- Kein Test gegen echtes ALL-INKL-Apache. `Options -Indexes`, Dot-File-Sperre,
  `RequestHeader unset Accept-Encoding` und `ErrorDocument` sind erst nach dem
  ersten Upload real prüfbar. Vor dem Livegang gegen die Testsubdomain verifizieren.
- Nur Chrome getestet, kein Cross-Browser-Durchlauf.
- semgrep parst keine .astro-Dateien; index.astro wurde manuell geprüft.

## Stand 10.09.2026 — Repo und Vorschau

- GitHub: `klassenmedia/bess-consulting`, **privat**, Branch main.
- GitHub Pages **nicht aktiv**: Free-Plan unterstützt Pages für private Repos nicht.
  Der Workflow `.github/workflows/pages.yml` liegt einsatzbereit im Repo.
- Vorschau läuft lokal über `npm run dev` (siehe PRAESENTATION.md).
- Astro-Base über `PUBLIC_BASE` steuerbar: `/` für die eigene Domain,
  `/bess-consulting/` für eine Pages-Vorschau. Pfade laufen über src/lib/url.ts.
