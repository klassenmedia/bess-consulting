# BESS Consulting – Entwurf 4

Astro + Tailwind CSS + Motion. Statische Marketingseite für BESS Consulting.

## Entwicklung

Node-Version passend zur installierten Astro-Version (siehe engines in node_modules/astro/package.json). Build geprüft mit Node 24.19.0.

```bash
npm ci
npm run dev
npm run build
```

Der fertige Webspace-Inhalt liegt in `dist/`. Zur lokalen Einzeldatei-Vorschau dient die separat gelieferte BESS-Consulting-Landingpage.html.

## ALL-INKL

Nach Freigabe den INHALT von dist/ ins ausgewählte Domain-Webverzeichnis laden. Vorher bestehende Website sichern und eine Test-Subdomain verwenden. Keine Node-Laufzeit auf dem Webspace erforderlich. Assets benutzen root-relative URLs: Domain oder Subdomain direkt auf dieses Verzeichnis zeigen lassen. Bei Hosting unter einem Unterpfad zuerst Astro base konfigurieren und neu bauen.

## Noch vor Livegang

Der Entwurf ist absichtlich auf noindex gesetzt. Leistungsumfang und Kontaktdaten bestätigen, eigene aktuelle Rechtstexte einbinden, Entwurfshinweis und noindex entfernen. Endgültige Canonical-URL und bestätigte strukturierte Daten ergänzen. Kontaktlinks öffnen E-Mail/Telefon, es gibt kein Backend und kein Formular.

## Assets

Foto: Reza Setiawan, https://unsplash.com/photos/a-large-factory-with-many-pipes-2b0itU3a5-o
Lizenz: https://unsplash.com/license
Als Symbolbild verwendet, nicht als BESS-Referenzprojekt. In WebP konvertiert; monochrome Darstellung über CSS.

Schrift: Manrope Variable via @fontsource-variable/manrope, SIL Open Font License; siehe LICENSE-Manrope.txt.

Drittbibliotheken sind über package-lock.json versioniert. Kein fremdes Seitentemplate kopiert.

Original-Logo: https://bess-consulting.de/wp-content/uploads/2020/11/bess-consulting-logo-1000x394-1.webp

Aktueller Stand: BESS-Visibility-und-Hosting.md. PUBLIC_INDEXABLE=true aktiviert Indexierung und Canonical; vorab Domain und Rechtstexte freigeben.

Version 4: Acht FAQs, kräftigere Schrift, eigene Rechtstextordner. Rechtstexte sind unvollständige Arbeitsfassungen und bleiben noindex. Details: BESS-Rechtscheck-und-Aenderungen.md.

Aktualisierung: Bereitgestelltes Porträt mit Telefon und Tablet im Ansprechpartner-Bereich integriert. Die weiteren drei Bilder bleiben unverändert in den Original-Uploads. Nutzerdatei: b682a1a6-e5ef-4019-a75a-329a16693ae4.jpeg. CSS bestimmt den responsiven Ausschnitt; Bildinhalt nicht retuschiert.


## Wissensbereich – 10.09.2026
Blogübersicht und drei Artikel unter /blog/. Inhalte zentral in src/content/articles.json. 15 FAQ-Antworten auf der Startseite. Redaktionelle Arbeitsfassungen; fachliche Freigabe durch BESS steht aus. BAFA-Förderquoten und aktuelle Industriestrompreis-Antragsdetails müssen vor Veröffentlichung ergänzt und geprüft werden. Entwurf bleibt noindex. Der Ordner dist enthält die statischen Dateien für den Webspace; kein Node-Prozess auf ALL-INKL nötig. Die einzelne HTML-Vorschau bettet Blogartikel als aufklappbare Anhänge ein; im Hosting sind dies eigenständige Seiten.
