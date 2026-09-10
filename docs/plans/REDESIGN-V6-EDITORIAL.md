# Redesign V6 — Editorial, Raumtiefe, Motion

Stand: 10.09.2026 · Auftrag: visuelles Redesign auf Agentur-Niveau,
Content und Marken-CI unverändert.

## Unverrückbar

1. **Kein Copywriting ändern.** Alle Texte bleiben wörtlich. Auch Reihenfolge und
   Aussagen bleiben, nur die Darstellung ändert sich.
2. **Marken-CI bleibt**: Logo, Türkis (#1d7f95), Blattgrün (#7cc242), Petrol (#0e2a33).

## Zu entfernende Muster (Ist-Analyse)

| Muster | Fundstellen | Ersatz |
|---|---|---|
| Eyebrow-Kapseln über Überschriften | 5 | Editorial-Zeilennummern, an der Grundlinie ausgerichtet |
| Karten mit 1px-Rahmen | 9 | Flächen ohne Rahmen, getrennt durch Raum und Kontrast |
| 3-Spalten-Grids | 2 | Asymmetrische Raster mit versetzten Spaltenbreiten |
| Runde Icon-Kreise | 7 | Typografische Ziffern, überlappend gesetzt |

## Neue Mittel

**Raumtiefe**
- Mehrschichtige Parallax-Ebenen mit unterschiedlichen Geschwindigkeiten
- 3D-Tilt auf Schlüsselelementen bei Mausbewegung (perspective + preserve-3d)
- Z-Index-Staffelung: Typografie überlappt Bildebenen statt danebenzustehen

**Motion**
- GSAP ScrollTrigger für gestaffelte Reveals (npm-Paket, kein CDN — die CSP
  bleibt bei `script-src 'self'`)
- Lenis für weiches Scrollen, über GSAP-Ticker angetrieben (eine Schleife)
- Easing durchgängig `cubic-bezier(.16, 1, .3, 1)`, keine linearen Übergänge
- Magnetische Buttons, die dem Cursor folgen

**Editorial-Layout**
- Hero-Typografie bildschirmfüllend, bewusst über den Satzspiegel hinaus
- Asymmetrische Raster, gebrochene Spaltenbreiten
- Vertikale Schriftzüge und Zahlen als grafische Elemente

## Threat Model

Unverändert gegenüber V5 (statische Seite, kein Backend). Neu hinzu:

(a) Angreifer-Szenario: Fremdcode über neue Abhängigkeiten (GSAP, Lenis)
(b) Untrusted Input: keiner neu — beide Bibliotheken verarbeiten nur DOM-Werte
(c) Worst Case: kompromittiertes npm-Paket liefert Schadcode aus
(d) Gegenmaßnahme: feste Versionen im Lockfile, `npm audit` vor jedem Deploy,
    Bündelung durch Astro statt CDN-Einbindung, CSP bleibt `script-src 'self'`

## Definition of Done

- [ ] Kein Text geändert (Diff prüfen)
- [ ] Alle vier verbotenen Muster entfernt
- [ ] Motion respektiert `prefers-reduced-motion`
- [ ] Kontraste weiter ≥ 4.5:1
- [ ] 375 / 768 / 1024 / 1440 px geprüft
- [ ] Build grün, npm audit sauber
- [ ] Security-Review mit Urteil FREIGABE

## Umsetzung — 10.09.2026

### Entfernte Muster (gemessen im Browser)

| Muster | vorher | nachher |
|---|---|---|
| Kapsel-Badges | inline-flex mit Strich davor | `display: block`, kein Hintergrund, kein Radius |
| Karten mit 1px-Rahmen | 9 Stellen | `border: none`, `radius: 0`, kein Schatten |
| Runde Icon-Boxen | 7 Kreise | freistehende SVG bzw. typografische Ziffern |
| Gleichförmige 3-Spalten | 2 Raster | Versatz 0 / 57,6 / 115,2 px |

### Neue Mittel

- **Lenis + GSAP ScrollTrigger** als npm-Pakete gebündelt — die CSP bleibt bei
  `script-src 'self'`, kein CDN. Verifiziert: keine Verstöße unter echtem Header.
- **Zeilenmasken**: 9 Überschriften schieben sich gestaffelt aus der Maske
- **Parallax**: Industriebild und Pflicht-Karte mit eigenen Geschwindigkeiten
- **3D-Tilt** auf der Pflicht-Karte, Trägheit über `gsap.quickTo`
- **Magnetische Buttons**: 2 Haupt-CTAs folgen dem Cursor
- **Easing** durchgängig `cubic-bezier(.16, 1, .3, 1)`

### Layout

- Hero: asymmetrisches Raster (735 zu 517 px), Karte überlappt die Typografie
  durch negativen Rand, H1 bei 92 px mit −5 px Laufweite
- Angebote als Preistafel mit Trennlinien statt Kartenstapel; das Kernprodukt
  hebt sich durch eine dunkle Fläche ab, nicht durch einen Rahmen
- Ergebnisse mit gestaffelten Höhen statt gleicher Spalten
- Garantie als Flächenbruch mit Mega-Ziffer
- FAQ als Zeilen, Aufklapper als rotierendes Plus statt Kreis-Icon

### Geprüft

- **Kein Wort geändert** — Wortmengen-Vergleich gegen HEAD: 0 entfernt, 0 neu
- Kontraste: Multi-Site-Ziffer auf #6b939e (3,34:1), Garantie-Siegel auf
  #4a7d22 (4,94:1) korrigiert; alle übrigen ≥ 4,5:1
- Mobil 375 px: kein Überlauf, alles einspaltig
- Keine Konsolenfehler unter strenger CSP
- npm audit sauber, gitleaks sauber
