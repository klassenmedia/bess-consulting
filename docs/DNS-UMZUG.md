# DNS und Mail: Ist-Stand und Umzugs-Checkliste

Abgefragt am 10.09.2026 für bess-consulting.de.

## Ist-Zustand

| Dienst | Wo | Beleg |
|---|---|---|
| **Mail** | Microsoft 365 / Exchange Online | MX: `bessconsulting-de01b.mail.protection.outlook.com` |
| **Website** | 45.90.4.80 (RIPE-Bereich, Niederlande) | A-Record |
| Domain-Verifizierung | Microsoft | TXT `MS=ms29953947` |
| Google Search Console | verifiziert | TXT `google-site-verification=ooIqKFu...` |

### Mail-Sicherheit

- **SPF:** `v=spf1 include:spf.protection.outlook.com -all` — korrekt, hard fail
- **DKIM:** beide Selektoren gesetzt (`selector1`/`selector2` → `dkim.mail.microsoft`)
- **DMARC:** **fehlt**

## Empfehlung: DMARC ergänzen

Fehlt aktuell. Ohne DMARC gibt es keine Anweisung, was mit Mails geschehen soll,
die SPF und DKIM nicht bestehen — und keine Reports über Missbrauch der Domain.

Vorsichtiger Einstieg (nur beobachten, nichts blockieren):

```
Typ:  TXT
Name: _dmarc
Wert: v=DMARC1; p=none; rua=mailto:w.brauer@bess-consulting.de
```

Nach einigen Wochen Auswertung auf `p=quarantine`, später `p=reject` hochstufen.
**Entscheidung liegt bei Waldemar Brauer** — DNS-Einträge nicht ohne Absprache ändern.

## Falls die Website zu ALL-INKL umzieht

Website und Mail sind unabhängig. Die Website kann umziehen, die Mail bleibt bei
Microsoft. Wichtig ist nur, dass die folgenden Einträge beim Wechsel des
DNS-Anbieters **unverändert mitgenommen** werden:

| Typ | Name | Wert | Zweck |
|---|---|---|---|
| MX | @ | `bessconsulting-de01b.mail.protection.outlook.com` (Prio 0) | Mailempfang |
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` | Versandberechtigung |
| TXT | @ | `MS=ms29953947` | Microsoft-Domainprüfung |
| TXT | @ | `google-site-verification=ooIqKFu_U4Ciko-BvEJkCkKh6pewM2HVwxd6KAviJhA` | Search Console |
| CNAME | autodiscover | `autodiscover.outlook.com` | Outlook-Einrichtung |
| CNAME | selector1._domainkey | `selector1-bessconsulting-de01b._domainkey.bessconsulting.r-v1.dkim.mail.microsoft` | DKIM |
| CNAME | selector2._domainkey | `selector2-bessconsulting-de01b._domainkey.bessconsulting.r-v1.dkim.mail.microsoft` | DKIM |

**Nur der A-Record ändert sich** auf die ALL-INKL-Server-IP.

### Ablauf ohne Ausfall

1. Alle DNS-Einträge dokumentieren (siehe Tabelle oben, vor dem Wechsel erneut abfragen)
2. TTL der Einträge einen Tag vorher auf 300 Sekunden senken
3. Website auf ALL-INKL hochladen und über eine Testadresse prüfen
4. Erst dann den A-Record umstellen, MX und TXT unverändert lassen
5. Nach der Umstellung: Mailempfang und -versand testen, `dig MX` gegenprüfen
6. TTL wieder auf Normalwert erhöhen

## Mail zu ALL-INKL umziehen — davon wird abgeraten

Technisch möglich, aber:

- **Funktionsverlust:** Exchange bietet Kalender- und Kontaktsynchronisation,
  Teams und OneDrive. ALL-INKL bietet IMAP. Der Calendly-Kalender greift
  vermutlich auf den Microsoft-Kalender zu.
- **Migrationsrisiko:** Bestandsmails, Kalender und Kontakte müssen übertragen,
  alle Endgeräte neu eingerichtet werden. Während der Umstellung droht
  Mailverlust.
- **Kein Kostenvorteil:** Microsoft 365 Business Basic liegt bei etwa 6 € im
  Monat. Der Migrationsaufwand übersteigt die Ersparnis deutlich.
- **Fremde Daten:** Es ist Waldemars geschäftliche Korrespondenz mit Kundendaten.

**Vor jeder Überlegung zu klären:** Wer ist Administrator des
Microsoft-365-Tenants? Ist das ein Dritter, wird jede Änderung von dessen
Mitwirkung abhängig.
