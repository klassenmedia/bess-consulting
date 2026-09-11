# Umsetzung des Website-Reviews von Waldemar Brauer

Review-Stand: 10.09.2026 · Umgesetzt: 11.09.2026

## Nachgeprüft, bevor übernommen

Zwei Hauptbefunde habe ich gegen Primärquellen verifiziert:

**Novelle nicht „beschlossen"** — bestätigt. Kabinettsbeschluss 24.06.2026,
Bundesrats-Stellungnahme 10.07.2026, parlamentarisches Verfahren läuft, Bundestag
hat nicht verabschiedet. Meine Formulierung war irreführend.

**„Energieeffizienz-Experte (BAFA)"** — bestätigt. Die Expertenliste führt die
**dena**, nicht das BAFA; die Akkreditierung wechselte zum 01.07.2023 vom BAFA zur
dena. Das BAFA führt die Energieauditorenliste nach § 8b EDL-G. Das sind zwei
verschiedene Verzeichnisse.

**Multi-Site-Rechnung** — teilweise. Die Sechs stammt aus dem BAFA-Beispiel und
ist dort korrekt (Clusterbildung plus Ausgrenzung), nicht aus √12. Der Einwand
bleibt trotzdem berechtigt: Wer die auf der Seite erklärte Wurzelregel anwendet,
kommt auf vier. Überschrift deshalb entschärft.

**Alt-Text am Industriebild** — Einwand trifft nicht zu. Das Bild trägt bewusst
`alt=""` plus `aria-hidden="true"`, weil es rein dekorativ ist. Das ist die
korrekte Auszeichnung; ein beschreibender Alt-Text wäre hier falsch.

## Umgesetzt

| Nr. | Punkt | Umsetzung |
|---|---|---|
| 2.01 | „Novelle beschlossen" | „Novelle im Verfahren" plus Erläuterung und Datumsstempel; FAQ und Blogartikel angeglichen |
| 2.03 | Qualifikationsbezeichnung | „Energieeffizienz-Experte für Förderprogramme des Bundes" |
| 2.04 | Multi-Site-Überschrift | „Zwölf Standorte. Sechs Begehungen." — „Werke" und „Audits" ersetzt |
| 2.05 | Ausgegrenzte Standorte | „werden nicht begangen. Ihr Verbrauch bleibt im Bericht ausgewiesen." |
| 2.06 | Verbund vs. Partner | „verbundene vollständig, Partnerunternehmen anteilig" |
| 2.08 | Bußgeld-FAQ | rechtliche Wertungen gestrichen, Verweis aufs BAFA-Merkblatt, Hinweis „ersetzt keine Rechtsberatung" |
| 2.09 | Studienbeleg | Institut ausgeschrieben, Erhebungsart und Kennzahl benannt |
| 2.10 | Mazedonien | Nordmazedonien, in Seite und Meta vereinheitlicht |
| 2.11 | Normfassung | „DIN EN 16247-1, Ausgabe November 2022" im Angebot |
| 2.12 | Meta-Tags | „Abwärmeberatung" entfernt, solange das Angebot fehlt |
| 3.01 | „Zwei Wege" bei drei Karten | „Drei Wege", CTA angepasst |
| 3.02 | Garantie unbestimmt | ein Bedingungssatz mit allen drei Zahlen; Badge um „Amortisation" ergänzt |
| 3.04 | Preisstaffel offen | „bis 5 GWh: 4.800 €, 5 bis 20 GWh: 5.800 €, darüber individuelles Angebot" |
| 3.05 | Begleitung unbegrenzt | Fixpreis ohne „ca."; Kontingente benannt (4 h je Quartal, ein Vor-Ort-Termin, zwei Förderanträge, jährliche Fortschreibung § 9 EnEfG) |
| 3.06 | „Dranbleiben" für alle | Standardaudit: Rückfragen bis drei Monate nach Abschluss; Begleitung nur im Paket |
| 3.07 | „Kernprodukt" | „Audit mit Begleitung besprechen" |
| 3.08 | Amortisation abgewertet | „Bewertung nach Kapitalwertmethode gemäß BAFA-Vorgabe" |
| 4.02 | Typografie | Geviertstrich zu Halbgeviertstrich (17 Stellen), „KFZ" zu „Kfz" |
| 4.06 | Umsetzungsplan § 9 | als Nutzen im Audit-Angebot und in der Begleitung |
| 5.01 | Calendly-Consent | Zwei-Klick-Lösung gebaut; verifiziert: vor dem Klick null iframes und null Netzwerkanfragen. Datenschutzerklärung auf Art. 6 Abs. 1 lit. a umgestellt |

## Bewusst nicht umgesetzt — Entscheidung liegt bei Waldemar

**2.02 Zweispaltige Pflichten-Box (heute / nach Novelle).** Sinnvoll, aber die
Hero-Karte wird dadurch deutlich voller. Vorschlag: erst umbauen, wenn die
Novelle verkündet ist — dann ersetzt die neue Spalte die alte.

**2.03 BAFA-Listeneintrag.** Die Zeile nennt jetzt die korrekte
dena-Bezeichnung. Ob zusätzlich „Energieauditor, gelistet beim BAFA nach
§ 8b EDL-G" ergänzt wird, muss Waldemar bestätigen — er wollte die Nummer selbst
nicht veröffentlichen, die Listung als solche wäre aber ein Vertrauensmerkmal.

**3.03 Quickcheck-Preis.** Steht weiter auf „auf Anfrage", weil Waldemar im
Telefonat keinen genannt hat. Der Reviewer hat recht, dass Reibung beim
Einstiegsangebot schlecht ist — die Zahl muss von Waldemar kommen.

**3.03 EnergizeBW-Details.** Förderquote und Höchstbetrag stehen nicht in den
vorliegenden Unterlagen. Zu prüfen ist auch, ob Nicht-KMU überhaupt berechtigt
sind — sonst gehört der Hinweis nur zum Quickcheck, nicht zum Pflichtaudit.

**3.09 Zwei Einstiege (Pflicht / Kosten senken).** Guter Vorschlag, aber ein
Umbau der Seitenstruktur. Erst nach Freigabe der Inhalte.

**4.01 „wir" vs. „ich".** Waldemar hat im Telefonat ausdrücklich gesagt:
„Schreib ruhig wir" — er hat eine Teilzeitkraft und Subunternehmer. Bleibt, bis
er es anders entscheidet.

**4.03 Nutzenblock umschreiben, 4.04 Referenzen.** Referenzen sind der stärkste
fehlende Vertrauensanker, brauchen aber Kundenfreigaben. Ohne Material nicht
umsetzbar.

**4.05 EffiFox-Block.** Waldemar wollte die App im Telefonat bewusst nicht
öffentlich zeigen („ich will nicht, dass jemand die reverse engineered"). Vor
einer Erwähnung mit ihm klären, wie viel gezeigt werden darf.

**4.07 FAQ in den Blog verschieben.** Sinnvoll für die Pflege, aber ein größerer
Umbau. Vorerst bleiben sechs Fragen sichtbar, zwanzig ausklappbar.

**5.02 Launch-Checkliste.** Domain, noindex, Sitemap, Canonical, Impressum:
steht bereits in `docs/plans/REDESIGN-V5.md` und `docs/DNS-UMZUG.md`.

**5.04 Festnetznummer.** Ist bereits eingebaut (+49 7257 9251838), Mobil
zusätzlich im Impressum.

## Offene Frage an Waldemar

Die Leistungskontingente der 48-Monate-Begleitung (4 h je Quartal, ein
Vor-Ort-Termin, zwei Förderanträge) sind **Vorschläge des Reviewers**, die ich
übernommen habe, um das offene Leistungsversprechen zu schließen. Sie müssen
kalkulatorisch bestätigt werden, bevor die Seite live geht — sonst steht dort
eine Zusage, die nicht trägt.
