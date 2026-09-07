# LuMa Digital – Website

Next.js-Website für LuMa Digital, als statischer Export gebaut, damit sie auf
klassischem PHP/Apache-Webhosting (Strato Hosting Basic) läuft.

## Entwicklung

```bash
npm install
npm run dev
```

Läuft dann unter [http://localhost:3000](http://localhost:3000).

## Build & Deployment (Strato)

Strato Hosting Basic hat keine Node.js-Laufzeitumgebung, deshalb wird die
Seite als statisches HTML exportiert und das Kontaktformular über ein
PHP-Skript verschickt.

```bash
npm run build
```

Das erzeugt den fertigen Seiteninhalt im Ordner `out/`. Diesen kompletten
Inhalt (inkl. `contact.php`) per FTP in das Webspace-Hauptverzeichnis bei
Strato hochladen.

**Vor dem ersten Livegang unbedingt prüfen:**

- `public/contact.php`: Empfänger-Adresse in `RECIPIENT` anpassen (aktuell
  `kontakt@luma-digital.de` – dieses Postfach muss im Strato-Kundenmenü
  unter „E-Mail“ angelegt sein, sonst laufen Anfragen ins Leere).
- `src/app/kontakt/page.tsx`: Telefonnummer und Sitz eintragen.
- `src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx`: alle
  `[Platzhalter]` durch echte Angaben ersetzen und die Datenschutzerklärung
  rechtlich prüfen lassen.
- `public/logo.svg` (oder `.png`) mit dem echten Logo ergänzen und in
  `src/components/Logo.tsx` einbinden – aktuell wird dort eine
  nachgebaute Annäherung des Emblems gerendert.
- Preise in `src/app/preise/page.tsx` und `src/app/page.tsx` sind
  Platzhalter-Beträge und müssen bestätigt werden.
