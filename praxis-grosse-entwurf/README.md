# Praxis Grosse – Website-Entwurf

Konzeptentwurf für eine neue Website von [physio-grosse.de](https://physio-grosse.de), der die Vorschläge aus dem Audit umsetzt. Es ist eine statische Website: kein WordPress, keine Plugins, keine Datenbank. Alle Inhalte stammen von der bestehenden Website. Sie sind gekürzt, korrigiert und neu gegliedert.

**Das ist ein Entwurf.** Jede Seite trägt `noindex` und einen Hinweisbalken. Offene Angaben stehen in `content.py` und `build.py` als `[[...]]` bzw. `<mark class="tbd">`. Mit `MARKIERUNGEN = True` in `build.py` erscheinen sie gelb markiert; derzeit ist der Schalter aus, damit die Vorschau sauber aussieht. Leere Angaben (z. B. Preise) fallen dann einfach weg.

## Ansehen

```bash
cd praxis-grosse-entwurf/site && python3 -m http.server 8000
```

Dann <http://localhost:8000> öffnen.

## Neu bauen

```bash
cd praxis-grosse-entwurf && python3 build.py
```

Texte, Leistungen, Öffnungszeiten und FAQ stehen in `content.py`. Seitenvorlagen, Schema.org-Daten, Sitemap und Weiterleitungen erzeugt `build.py`. Platzhalter schreibt man als `[[...]]`, sie erscheinen gelb markiert.

## Seiten (48)

| Seite | Datei |
|---|---|
| Start | `index.html` |
| Leistungsübersicht + 3 Bereichsseiten | `leistungen/index.html`, `physiotherapie.html`, `ergaenzende-behandlungen.html`, `kurse-training.html` |
| 34 Leistungsseiten (neu: Osteopathie) | `leistungen/<leistung>.html` |
| Praxis, Team, Karriere | `praxis.html`, `team.html`, `karriere.html` |
| Termin (Rückruf-Formular), Kontakt & Anfahrt, Häufige Fragen | `termin.html`, `kontakt.html`, `fragen.html` |
| Impressum, Datenschutz, 404 | `impressum.html`, `datenschutz.html`, `404.html` |
| Technik | `sitemap.xml`, `robots.txt`, `.htaccess` |

## Welche Audit-Punkte umgesetzt sind

| Audit-Punkt | Umsetzung im Entwurf |
|---|---|
| Keine H1, keine Meta-Descriptions, Titel ohne Ort | Genau eine H1 pro Seite, jede Seite mit eigener Description, Titel mit Leistung und „Ispringen“ |
| Alt-Texte fehlen, Dateinamen `IMG_1234` | Beschreibende Alt-Texte, sprechende Dateinamen (`manuelle-therapie-1280.webp`) |
| Widersprüchliche Telefonzeiten | Eine Quelle (`content.py`), Widerspruch gelb markiert, bis die Praxis ihn klärt |
| Nur `Organization`-Schema | `Physiotherapy` (LocalBusiness) mit Adresse und Öffnungszeiten, `Service` pro Leistung, `FAQPage`, `BreadcrumbList` |
| Dünne Leistungsseiten | Gleicher Aufbau überall: Etikett (Bezahlart), Motto, Text, Kasten „Auf einen Blick“ (Bezahlung, Verordnung, Dauer, Behandlerin), Gegenanzeigen, passende Leistungen |
| Keine FAQ | Eigene Seite mit 10 Fragen (Rezept, 28-Tage-Frist, Zuzahlung, Parken …), Auszug auf der Startseite und der Therapie-Seite |
| Termin nur per Telefon | Rückruf-Formular (fragt bewusst keine Beschwerden ab), Telefonstatus „Jetzt erreichbar“, Leiste „Anrufen / Termin“ am Handy |
| Keine Karte | Google-Karte erst nach Klick (DSGVO), dazu Routenlink |
| Freemail-Adresse | Platzhalter `info@physio-grosse.de` |
| Keine Bewertungen | Platzhalter für echte Google-Bewertungen |
| Osteopathie ohne eigene Seite | Neue Seite `leistungen/osteopathie.html` (Inhalt von der Praxis zu ergänzen) |
| Keine Karriereseite | `karriere.html` mit echten Vorteilen aus den Team-Texten |
| Kaputte Altlinks, 404 | `.htaccess` mit 301-Weiterleitungen aller alten WordPress-URLs, eigene 404-Seite |
| `neu.physio-grosse.de` erreichbar | Weiterleitung per `.htaccess` (sobald die Subdomain auf denselben Webspace zeigt; sonst abschalten) |
| Benutzername `wp-admin` öffentlich | Entfällt ohne WordPress; alte Pfade (`wp-json`, `xmlrpc.php` …) liefern 410 |
| Caching aus, 1,8 MB Startseite | Startseite am Handy ca. 235 KB in 10 Anfragen statt ca. 1,8 MB in 39 (gemessen mit Playwright, unkomprimiert), WebP in 2 Größen, Lazy Loading, Cache-Header |
| Barrierefreiheit per Overlay-Plugin | Barrierefrei gebaut: Schrift Atkinson Hyperlegible (für Menschen mit Sehschwäche entwickelt), 18 px Grundschrift, Fokusrahmen, Skip-Link, Schalter „Größere Schrift“, reduzierte Bewegung |
| Google Fonts | Schriften lokal eingebunden, keine Verbindung zu Google |

## Gestaltung (Version 2)

Version 1 sah zu sehr nach generierter Website aus. Version 2 nimmt die Gestaltung aus der Praxis selbst:

- **Schriften von der Praxiswand:** Der rote Schriftzug „glücklich“ im Trainingsraum ist eine Pinsel-Schreibschrift, daneben steht eine humanistische Sans. Entsprechend: Yellowtail für einzelne Worte und die Mottos der Leistungen („Alles in Bewegung“, „Vom Au zum Ahhhh“), Alegreya Sans für alles andere. Beide Schriften liegen lokal, SIL Open Font License.
- **Die Logo-Figur** (rote Pinselstrich-Figur) als Bildelement, freigestellt aus dem Original-Logo.
- **Große Fotos statt Karten.** Das Team-Foto füllt die Startseite, die Leistungsseiten öffnen mit einem breiten Behandlungsfoto.
- **Die Stimme der Praxis:** Ihre eigenen, schrägen Überschriften stehen wieder groß. Der Startseiten-Spruch („Mit einem Lachen geht alles leichter“) stammt aus ihren Texten.
- **Die echte Geschichte vorn:** Gewinn bei „Das goldene Ei“ 1995, Eröffnung 1996, Umzug 2007, Osteopathie-Master 2014.
- **Lokale Details statt Floskeln:** Parken gegenüber vom Blumenladen, Einfahrt rechts neben dem Eingang, Bahnhof Ispringen.
- **Bezahlart als Text mit Farbpunkt** statt Etiketten: Rot = mit Rezept, Pflaume = ohne Rezept, Petrol = Kurs.
- Bewusst weggelassen: Schreibmaschinenschrift, Großbuchstaben-Zeilen, Pillen-Buttons, Chips, nummerierte Abschnitte.

## Offen: Das muss die Praxis liefern oder bestätigen

Mit `MARKIERUNGEN = True` werden alle Stellen im Entwurf gelb markiert. Die wichtigsten:

1. **Telefonzeiten** vereinheitlichen (8–18 Uhr oder Mo/Fr 8–17, Di–Do 8–19 Uhr?)
2. **Freies Training freitags:** 8–9 Uhr (Kontaktseite) oder 8–14:30 Uhr (Terminseite)?
3. **Preise** aller Selbstzahler-Leistungen und Kurse, **Kurszeiten**
4. **Osteopathie:** Beschreibung, Dauer, Preis
5. **E-Mail-Adresse** auf eigener Domain einrichten
6. **Absageregel** für Termine
7. **Kurse nach § 20 SGB V zertifiziert?** Nur dann Hinweis auf Kassenzuschuss
8. **Team:** Schreibweise „Silke Schorschke/Schorscke“; Tine Wild fehlt in der Liste der 16; Einzelporträts mit Schwerpunkten wären stark
9. **Echte Google-Bewertungen**, Fotograf*in für den Bildnachweis
10. **Feiertage/Urlaub** für Öffnungszeiten und Telefonstatus

## Vor dem Livegang rechtlich prüfen lassen

Das ist keine Rechtsberatung. Die folgenden Punkte sind mir im alten Impressum und in den Texten aufgefallen:

- **Impressum:** Verweise auf das TMG durch das DDG ersetzt (seit 14.05.2024 in Kraft). Den Hinweis auf die EU-Plattform zur Online-Streitbeilegung entfernt (Plattform am 20.07.2025 eingestellt, VO (EU) 2024/3228). „Zuständige Kammer: Stuttgart“ ist für Physiotherapeutinnen fraglich, weil es keine Kammer gibt. Berufsbezeichnung korrigieren.
- **Osteopathie:** In Deutschland braucht man für die eigenständige Ausübung in der Regel eine Heilpraktikererlaubnis (voll oder sektoral). Rechtsgrundlage im Impressum angeben.
- **Heilmittelwerbegesetz:** Wirkversprechen aus den alten Texten wurden entschärft (z. B. „heilende Wirkung“ bei Fango, Wirkung der Bindegewebsmassage bei Asthma oder Menstruationsbeschwerden). Jede Leistungsseite trägt den Hinweis, dass es kein Heilungsversprechen gibt.
- **FAQ-Angaben** (28-Tage-Frist, 14 Tage bei dringlichem Behandlungsbedarf: Heilmittel-Richtlinie des G-BA, § 15; Zuzahlung 10 % + 10 € je Verordnung: § 32 i. V. m. § 61 SGB V) fachlich gegenlesen.
- **Datenschutzerklärung** neu schreiben. Die Seite enthält nur eine Gliederung der Inhalte.
- **Rückruf-Formular:** braucht einen echten Versand (z. B. PHP-Mailer beim Hoster oder einen DSGVO-konformen Formulardienst mit AV-Vertrag), verschlüsselt übertragen.

## Livegang-Checkliste

- [ ] In `build.py` `KONZEPT = False` setzen (entfernt `noindex`, Hinweisbalken und `Disallow` in `robots.txt`), dann neu bauen
- [ ] `site/` inklusive `.htaccess` auf den Webspace laden (Apache)
- [ ] Weiterleitungen stichprobenartig testen, z. B. `/angebot/klassisches-ta/manuelle-therapie/` → `/leistungen/manuelle-therapie.html`
- [ ] Google Search Console: neue Sitemap einreichen, Seitenindexierung beobachten
- [ ] Google-Unternehmensprofil mit denselben Daten (Öffnungszeiten, Telefon, Kategorie „Physiotherapeut“) abgleichen
- [ ] Logo als SVG anfordern (derzeit PNG mit 271 px Breite)
