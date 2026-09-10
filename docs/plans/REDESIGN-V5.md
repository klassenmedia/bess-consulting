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
  2. articles.json: Astro escapt per Default; set:html nur dort, wo bewusst
     Markup nötig ist, und dann gegen eine feste Allowlist geprüft.
  3. PUBLIC_INDEXABLE: strikter Vergleich === 'true', Default noindex.
  4. [slug]: getStaticPaths erzeugt nur bekannte Slugs; kein dynamisches Routing
     zur Laufzeit, da output static.
  5. Dependencies: package-lock.json committen, npm audit vor Deploy.
  6. Header via .htaccess: CSP, X-Frame-Options DENY, X-Content-Type-Options,
     Referrer-Policy, Permissions-Policy.

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
