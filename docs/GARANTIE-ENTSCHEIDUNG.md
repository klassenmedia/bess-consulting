# Einsparpotenzial-Garantie für den Energie-Quickcheck

Entscheidungsvorlage für das Gespräch mit Waldemar Brauer · Stand 10.09.2026

## WICHTIG: Amortisationszeit als Kriterium überdenken

Nachtrag nach Auswertung des BAFA-Leitfadens (Stand 01.09.2026):

> „Daher ist die Amortisationszeit als Kriterium für Wirtschaftlichkeit von
> Energieeffizienzvorhaben ungeeignet."

Der Leitfaden verlangt stattdessen **Kapitalwert und interne Verzinsung**, weil
die Amortisationsrechnung die Lebensdauer der Investition ausblendet. Eine
Garantie, die auf „Amortisation unter einem Jahr" abstellt, widerspricht damit
der Methodik, nach der Waldemar Brauer arbeiten muss — und wäre für Fachleute
angreifbar.

Zwei Auswege:

1. **Auf den Kapitalwert abstellen:** „Maßnahmen mit positivem Kapitalwert
   innerhalb von zwölf Monaten" — fachlich sauber, aber erklärungsbedürftig.
2. **Die Amortisation als Kundensprache behalten, aber im Bericht korrekt
   rechnen:** In der Werbung „zahlt sich im ersten Jahr", im Audit
   Kapitalwertmethode. Zulässig, solange die Zusage sich auf ein Ergebnis
   bezieht, das mit der richtigen Methode ermittelt wurde.

Variante 2 ist praxisnäher, Variante 1 ehrlicher. Das gehört mit auf die
Tagesordnung des Gesprächs.

## Worum es geht

Der Quickcheck soll mit einer Garantie beworben werden: Einsparpotenzial und
Amortisation unter einem Jahr. Bevor das auf die Website kommt, muss festgelegt
sein, **worauf** sich die Garantie bezieht und **was passiert, wenn sie nicht
eintritt**. Beides ist rechtlich bindend, sobald es öffentlich steht.

## Das Problem mit dem Wort „Garantie"

Eine Garantie im Sinne des § 443 BGB ist eine einseitige Zusage, für einen
bestimmten Erfolg einzustehen. Wer sie gibt, haftet dafür — unabhängig von
Verschulden. Werbung mit einer Garantie, die im Streitfall nicht gehalten wird,
ist zusätzlich nach § 5 UWG als irreführende geschäftliche Handlung angreifbar.

Entscheidend ist die Abgrenzung:

| Bezug der Zusage | Wer trägt das Risiko | Bewertung |
|---|---|---|
| **Das Auditergebnis** — wir finden Maßnahmen mit kurzer Amortisation | Waldemar Brauer, aber kalkulierbar | belastbar |
| **Die tatsächliche Einsparung** nach Umsetzung | hängt an Umsetzung, Betriebszeiten, Energiepreisen | nicht belastbar |

Die zweite Variante lässt sich nicht seriös garantieren, weil sie von Faktoren
abhängt, die außerhalb des Einflusses des Auditors liegen. Genau das sagt die
Website derzeit selbst.

## Die drei Varianten

### A) Rückerstattungs-Garantie (stärkstes Argument, höchstes Risiko)

> „Finden wir im Quickcheck keine Maßnahme, deren berechnete Amortisation unter
> zwölf Monaten liegt, erstatten wir das Honorar vollständig."

- **Zusage bezieht sich auf:** das Ergebnis des Quickchecks
- **Rechtsfolge:** Honorarrückerstattung
- **Risiko:** Waldemar arbeitet umsonst, wenn ein Betrieb bereits optimiert ist
- **Vorteil:** nimmt dem Kunden das gesamte Risiko, sehr starkes Verkaufsargument
- **Zu klären:** Gilt das bei jedem Betrieb? Braucht es eine Mindestgröße oder
  einen Mindestverbrauch als Voraussetzung (analog zur alten 500.000-€-Klausel
  aus dem Brief von 2024)?

### B) Fund-Zusage (empfohlen als Einstieg)

> „Der Quickcheck endet mit mindestens drei Maßnahmen, deren berechnete
> Amortisation unter zwölf Monaten liegt. Andernfalls stellen wir ihn nicht in
> Rechnung."

- **Zusage bezieht sich auf:** die Anzahl und Qualität der gefundenen Maßnahmen
- **Rechtsfolge:** keine Rechnungsstellung
- **Risiko:** deutlich geringer, weil auf das Auditergebnis begrenzt
- **Vorteil:** ehrlich, prüfbar, kein Widerspruch zu den bestehenden Vorbehalten

### C) Formulierung ohne Garantiebegriff

> „In sechzehn Stunden finden wir die Maßnahmen mit der kürzesten Amortisation.
> Erfahrungsgemäß liegen die ersten drei unter zwölf Monaten."

- Keine bindende Zusage, sondern Erfahrungswert
- **Voraussetzung:** Der Erfahrungswert muss belegbar sein (Referenzprojekte)
- Schwächstes Argument, aber kein Haftungsrisiko

## Notwendige Klarstellungen bei allen Varianten

Unabhängig von der gewählten Variante gehört auf die Seite:

1. **Bezug auf die Berechnung, nicht auf die Realität.** Formulierung immer
   „berechnete Amortisation" statt „Amortisation". Was tatsächlich eintritt,
   hängt von Umsetzung und Betriebsführung ab.
2. **Voraussetzungen benennen.** Welche Mindestangaben, welche Datenlage, welche
   Betriebsgröße? Ein Betrieb, der bereits ein Audit hinter sich hat, ist ein
   anderer Fall als einer ohne jede Vorarbeit.
3. **Frist für die Geltendmachung.** Bis wann kann der Kunde sich auf die
   Garantie berufen?
4. **Abgrenzung zur Umsetzung.** Die Garantie betrifft den Quickcheck, nicht das
   Kernprodukt mit 48 Monaten Begleitung.

## Was auf der Website angepasst werden muss

Sobald die Variante feststeht:

| Stelle | heute | dann |
|---|---|---|
| Angebot Quickcheck (`index.astro`) | „Die drei Maßnahmen mit der kürzesten Amortisation" | Garantie-Formulierung plus Voraussetzungen |
| FAQ „Ist eine bestimmte Einsparung garantiert?" | „Eine pauschale Einspargarantie wäre vor der Analyse nicht belastbar." | abgrenzen: Garantie gilt für den Quickcheck-Fund, nicht für die spätere tatsächliche Einsparung |
| Trust-Leiste | „48 Monate / 40+ Audits / Förderung / Branchenkenntnis" | ggf. Garantie als vierter Punkt |
| Rechner-Disclaimer | bleibt unverändert | bleibt unverändert |

**Wichtig:** Die FAQ-Antwort darf nicht ersatzlos gestrichen werden. Sie schützt
vor Ansprüchen auf tatsächliche Einsparungen. Sie muss so umformuliert werden,
dass beide Aussagen nebeneinander stehen können — Garantie auf den Fund,
Vorbehalt auf die Wirkung.

## Empfehlung

Variante **B** als Start. Sie ist ehrlich, kalkulierbar und trotzdem ein starkes
Argument gegenüber TÜV und DEKRA, die keinerlei Zusage machen. Wenn sich nach
zehn bis zwanzig Quickchecks zeigt, dass praktisch immer etwas gefunden wird,
lässt sich auf Variante A hochstufen.

## Offene Fragen an Waldemar

1. Aus wie vielen Quickchecks oder vergleichbaren Kurzanalysen liegt Erfahrung vor?
2. Gab es je einen Betrieb, in dem sich nichts unter zwölf Monaten fand?
3. Soll die Garantie an Voraussetzungen geknüpft sein (Mindestverbrauch,
   Betriebsgröße, Datenlage)?
4. Rückerstattung des Honorars oder Verzicht auf die Rechnungsstellung?
5. Ist der Versicherungsschutz (Berufshaftpflicht) mit einer Garantiezusage
   vereinbar? Rückfrage beim Versicherer empfohlen.


## Nachtrag: Frage 6 an Waldemar

Nach welcher Methode rechnet er heute im Quickcheck — Amortisation oder
Kapitalwert? Der BAFA-Leitfaden verlangt für das Vollaudit ausdrücklich
Kapitalwert und interne Verzinsung und bezeichnet die Amortisationszeit als
ungeeignetes Kriterium. Die Garantie sollte auf derselben Methode beruhen wie
der Bericht.
