# LM Digital — Website

Statische Website für LM Digital: Home, Über uns, Leistungen, Kontakt,
Impressum und Datenschutz, inklusive Cookie-Consent-Banner. Reines HTML/CSS/JS,
kein Build-Schritt nötig.

## Lokal ansehen

Einfach `index.html` im Browser öffnen, oder mit einem lokalen Server
(empfohlen, damit relative Pfade sich wie im Live-Betrieb verhalten):

```bash
python3 -m http.server 8080
# dann im Browser: http://localhost:8080
```

## Struktur

```
index.html          Home
ueber-uns.html       Über uns
leistungen.html      Leistungen
kontakt.html         Kontakt (mit Formular)
impressum.html       Impressum
datenschutz.html      Datenschutzerklärung
assets/css/style.css  Design-System (Farben, Typografie, Komponenten)
assets/js/main.js     Mobile-Nav, Cookie-Banner, Formular-Handling
assets/fonts/         Self-gehostete Webfonts (SIL Open Font License)
assets/img/           Logo, Favicon, Hero-Grafik (SVG)
```

## ⚠️ Vor dem Live-Gang unbedingt ausfüllen

Alle Stellen mit `[eckigen Klammern]` bzw. orange hervorgehobenem Text sind
Platzhalter. Diese Liste vor der Veröffentlichung abarbeiten:

### Impressum (`impressum.html`) — rechtlich verpflichtend
- Firmenname / Name, Rechtsform
- Anschrift (Straße, PLZ, Ort, Land)
- Vertretungsberechtigte Person
- Telefonnummer
- Registereintrag (falls vorhanden) oder Absatz entfernen
- Umsatzsteuer-ID oder Hinweis auf Kleinunternehmerregelung
- Bildnachweise, falls nicht selbst erstellte Fotos/Grafiken verwendet werden

**Empfehlung:** die ausgefüllten Angaben von einer Steuerberatung oder
Rechtsberatung gegenprüfen lassen — ein fehlerhaftes Impressum kann
abgemahnt werden.

### Datenschutzerklärung (`datenschutz.html`)
- Name des Hosting-Anbieters (z. B. Netlify, Vercel, IONOS, …)
- Name des Formular-Dienstleisters, sobald das Kontaktformular angebunden ist
  (siehe unten) — inkl. Hinweis, ob ein Auftragsverarbeitungsvertrag (AVV)
  abgeschlossen wurde
- Zuständige Datenschutz-Aufsichtsbehörde (abhängig vom Bundessitz)
- Veröffentlichungsdatum
- Sobald ein Statistik-/Analyse-Tool eingebunden wird: eigenen Abschnitt mit
  Name, Zweck, Rechtsgrundlage und Speicherdauer ergänzen

### Kontaktdaten (Footer aller Seiten + `kontakt.html`)
- Telefonnummer
- Adresse
- Die E-Mail-Adresse `kontakt@lm-digital.de` geht davon aus, dass die Domain
  `lm-digital.de` verwendet wird — bei einer anderen Domain bitte in allen
  Dateien austauschen (Suchen &amp; Ersetzen über alle `.html`-Dateien)

### Kontaktformular (`kontakt.html`)
Das Formular ist rein clientseitig aufgebaut und sendet aktuell **nirgendwo**
hin. Vor dem Live-Gang muss ein echter Formular-Endpunkt eingetragen werden,
zum Beispiel mit [Formspree](https://formspree.io/) (kostenloser Tarif
reicht für den Start) oder einem vergleichbaren Dienst:

```html
<form class="form" data-contact-form action="https://formspree.io/f/DEINE-ID" method="POST" novalidate>
```

Die Zeile mit `REPLACE_ME` in `kontakt.html` entsprechend ersetzen. Bis
dahin zeigt das Formular Besucher:innen einen freundlichen Hinweis, sich
per E-Mail zu melden, anstatt eine Anfrage stillschweigend zu verlieren.

### Über uns (`ueber-uns.html`)
- Team-/Portraitfoto einfügen
- Name, Rolle und kurze Bio der Gründungsperson(en)

### Favicon (optional, aber empfohlen)
Aktuell wird ein SVG-Favicon (`assets/img/logo-mark.svg`) genutzt, das in
allen modernen Browsern funktioniert. Für ältere Browser und
Apple-Homescreen-Icons empfiehlt sich zusätzlich ein PNG-Set (z. B. über
[realfavicongenerator.net](https://realfavicongenerator.net/) aus der SVG
erzeugt).

## Cookie-Banner

- Es werden **keine** Tracking- oder Analyse-Skripte geladen. Der Banner
  fragt zwar eine „Statistik"-Kategorie ab, aktuell passiert dabei aber
  nichts außer dem Speichern der Einwilligung in `localStorage`
  (`lmd_cookie_consent`).
- Soll später ein Analyse-Tool (z. B. ein datenschutzfreundliches Tool wie
  Plausible oder Matomo) ergänzt werden: In `assets/js/main.js` auf das
  Event `lmd:consent` hören und das Skript nur laden, wenn
  `event.detail.statistics === true` ist. Beispiel:

  ```js
  document.addEventListener('lmd:consent', function (e) {
    if (e.detail.statistics) {
      // Analyse-Skript hier laden
    }
  });
  ```
- Nutzer:innen können ihre Auswahl jederzeit über den Link
  „Cookie-Einstellungen" im Footer ändern.
- Datenschutztext in `datenschutz.html` entsprechend erweitern, sobald ein
  Tool eingebunden wird.

## Design-System

Farben, Schriftgrößen und Abstände liegen als CSS-Variablen am Anfang von
`assets/css/style.css` (`:root`). Wer Farben oder Schriftarten später
anpassen möchte, sollte dort ansetzen statt einzelne Werte in den
HTML-Dateien zu überschreiben.

Verwendete Schriften (self-gehostet, SIL Open Font License — freie
kommerzielle Nutzung ohne Zuordnung erforderlich):
- [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) — Überschriften
- [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) — Fließtext
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — Labels, Tags, Code-artige Akzente

## Deployment

Die Seite besteht nur aus statischen Dateien und lässt sich direkt auf
jedem Static-Hosting deployen (z. B. Netlify, Vercel, GitHub Pages, IONOS
Webspace). Es ist kein Build-Prozess notwendig — einfach den gesamten
Ordnerinhalt hochladen.
