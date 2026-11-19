# Übergabe: neue Website Praxis Grosse

Diese Website ist ein **vollständiger, eigenständiger Neubau** (statisches HTML/CSS/JS,
kein WordPress). Sie wurde aus den echten Texten und Fotos der bestehenden Seite
physio-grosse.de aufgebaut und behebt die im Audit gefundenen Probleme (SEO, Recht,
Barrierefreiheit, UX, Technik). Nichts Inhaltliches wurde erfunden — wo ich etwas nicht
sicher wusste, steht das unten **explizit und sichtbar markiert**, statt stillschweigend
geraten.

## Wie die Seite aufgebaut ist

```
website/
  index.html, praxis.html, team.html, angebot.html,
  therapie.html, training-praevention.html,
  kontakt.html, termin.html, impressum.html, datenschutz.html   ← fertige, eigenständige Dateien
  assets/css/style.css        ← Designsystem
  assets/js/main.js           ← Navigation, FAQ, Karten-Einwilligung, Formular-Hinweis
  assets/img/praxis/*.jpg     ← echte Fotos der Praxis (vom bestehenden Server übernommen)
  robots.txt, sitemap.xml
  content/*.html              ← Quelltext je Seite (nur Inhalt, ohne Kopf/Fuß)
  build.py                    ← baut aus content/ + Kopf/Fuß-Vorlage die fertigen .html-Dateien
```

**Zum Deployment reichen die fertigen `.html`-Dateien plus `assets/`, `robots.txt`
und `sitemap.xml`** — einfach auf den Webspace hochladen, kein Server-seitiges
Build nötig. `build.py` braucht nur, wer später am Text etwas ändern will
(Datei in `content/` bearbeiten, dann `python3 build.py` erneut ausführen).

## ⚠️ Bitte vor Veröffentlichung prüfen — das sind meine Annahmen

### 1. Öffnungszeiten (wichtigster Punkt)
Die alte Seite hatte **drei widersprüchliche Versionen** der Öffnungszeiten
(Kontaktseite, Footer, Terminseite). Ich habe mich **für die Version der alten
Kontaktseite** entschieden (als vollständigste, dediziert beschriftete Quelle) und
diese überall einheitlich übernommen — in Footer, Kontaktseite, Terminseite und im
Schema.org-Markup (`index.html`). **Bitte mit der Praxis gegenchecken, ob diese
Zeiten wirklich aktuell stimmen**, bevor die Seite live geht:

| Tag | Übernommen |
|---|---|
| Mo | 07:00–20:30 |
| Di | 07:30–19:00 |
| Mi | 07:30–20:00 |
| Do | 08:00–19:00 |
| Fr | 07:00–18:00 |

Für die *telefonische Terminvereinbarung* habe ich einheitlich Mo–Fr 08:00–18:00 Uhr
übernommen (so stand es auf der alten Kontaktseite). Die alte Terminvereinbarungs-Seite
nannte hierfür leicht andere Werte (z. B. Fr nur bis 17:00) — **bitte auch das bestätigen.**

### 2. Impressum — Zuständige Aufsichtsbehörde
Physiotherapeut:innen haben keine Kammer. Ich habe die fehlerhafte Angabe
„Zuständige Kammer: Stuttgart" entfernt, aber **bewusst keine Behörde erfunden** —
auf `impressum.html` steht an der Stelle ein sichtbarer Platzhalter. Für Ispringen
(Enzkreis, Baden-Württemberg) ist vermutlich das **Regierungspräsidium Karlsruhe**
zuständig, das müsste die Praxis aber anhand ihrer Berufserlaubnis-Urkunde bestätigen.

### 3. Impressum — Streitschlichtung
Ich habe den veralteten Link zur EU-OS-Plattform entfernt (Plattform wurde Juli 2025
eingestellt) und den Standard-Opt-out-Satz eingesetzt („Wir nehmen nicht teil").
**Falls die Praxis doch an einem Schlichtungsverfahren teilnehmen möchte**, muss der
Absatz entsprechend geändert werden (dann mit Namen/Anschrift der Schlichtungsstelle).

### 4. Rechtliche Prüfung: „Physiotherapie und Osteopathie"
Dieser Begriff wurde unverändert aus der bestehenden Website übernommen — das ist die
reale Positionierung der Praxis, und Michaela Grosse hat laut der alten Team-Seite
einen echten Osteopathie-M.Sc.-Abschluss (DIU Dresden, 2014). **Ich habe hier nichts
geändert**, weise aber wie im Audit besprochen darauf hin: Ob Osteopathie als
eigenständige Leistung (ohne Heilpraktikererlaubnis) so beworben werden darf, sollte
anwaltlich geprüft werden.

### 5. Kontaktformular (termin.html)
Das Formular ist fertig gestaltet, **sendet aber noch keine echten Daten** — es gibt
noch keinen Versandweg (Server-Skript, E-Mail-Dienst o. Ä.). Aktuell zeigt es beim
Absenden nur einen Hinweis, dass die Praxis besser direkt angerufen werden soll.
**Vor Go-Live:** entweder an einen Formular-Dienst (z. B. serverseitiges PHP-Skript
des Hosters) anbinden, oder das Formular vorerst entfernen, bis es aktiv ist.

### 6. Datenschutzerklärung
Enthält noch **drei mit `[eckigen Klammern]` markierte Platzhalter**, die vom
tatsächlichen Hosting-Anbieter und eingesetzten Werkzeugen abhängen:
- Name/Anschrift des Hosting-Anbieters
- Versandweg des Kontaktformulars, sobald es aktiv ist
- Hinweis auf Statistik-/Analyse-Tools, falls später eines eingesetzt wird

### 7. Kursinhalte: keine Preise, Zeiten oder Kassenleistungen erfunden
Die Kurstexte (Pilates, Yoga, Seniorenfit, …) sind **1:1 aus den echten Originaltexten**
übernommen und nur sprachlich bereinigt (Tippfehler korrigiert, konsistente
Sie-Anrede). Konkrete Kurszeiten, Preise und Kassenzuschüsse habe ich **nirgends
hinzuerfunden** — die FAQ auf der Startseite verweist bei diesen Fragen bewusst aufs
Telefonat. Das wäre der naheliegende nächste Ausbaustritt, sobald die Praxis diese
Angaben liefert.

### 8. Google Maps
Die Karte auf `kontakt.html` lädt **nicht automatisch**, sondern erst nach Klick auf
„Karte laden & Google zustimmen" (datenschutzfreundlich, keine Drittanbieter-Daten vor
Einwilligung). Das ersetzt den bisherigen Cookie-Banner für diesen einen Anwendungsfall.
Falls später weitere Dienste (Analyse, Marketing) dazukommen, braucht es wieder einen
echten Cookie-Consent-Baustein.

## Was zusätzlich behoben wurde (aus dem Audit)

- Einheitliche Meta-Descriptions & H1 auf jeder Seite, Schema.org-Markup (`PhysicalTherapy`)
- Kein freigegebener Admin-Benutzername (keine WordPress-REST-API, kein Login überhaupt)
- Ortsbezug „Ispringen" in Titeln/Überschriften ergänzt
- Alt-Texte für alle Bilder
- Mobiler Call-Button (sticky), klar sichtbarer CTA im Hero
- FAQ-Bereich für die häufigsten Patientenfragen
- Kein Barrierefreiheits-Overlay-Plugin mehr — stattdessen echte Maßnahmen:
  Tastaturfokus sichtbar, Skip-Link, kontrastreiche Farben, `prefers-reduced-motion`
  respektiert, Formularlabels, semantisches HTML
- Deutlich schlankerer Code (kein jQuery/Elementor/Isotope-Ballast)
- Keine Tippfehler aus der alten Seite übernommen

## Nächste Schritte

1. Punkte 1–6 oben mit der Praxis klären.
2. Hosting einrichten, Dateien hochladen (bisherige Domain `physio-grosse.de` kann
   bestehen bleiben — alle internen Links sind relativ).
3. Testkopie `neu.physio-grosse.de` (falls noch vorhanden) abschalten oder umleiten.
4. 301-Weiterleitungen von alten URLs (z. B. `/angebot/klassisches-ta/manuelle-therapie/`)
   auf die neuen Ankerlinks (z. B. `/therapie.html#manuelle-therapie`) einrichten,
   damit vorhandene Google-Rankings nicht verloren gehen.
