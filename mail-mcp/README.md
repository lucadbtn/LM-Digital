# web.de-Postfach für Claude Desktop

Ein kleiner lokaler MCP-Server, über den Claude dein web.de-Postfach per IMAP lesen
und Entwürfe anlegen kann. **Er kann nicht senden.** Entwürfe landen im Ordner
„Entwürfe“. Du prüfst sie in web.de und schickst sie selbst ab.

Tools: `list_folders`, `list_emails`, `search_emails`, `read_email`, `create_draft`.
Beim Lesen werden Mails nicht als gelesen markiert.

## Einrichtung

### 1. IMAP in web.de aktivieren
Einstellungen → POP3/IMAP Abruf → „POP3- und IMAP-Zugriff erlauben“ einschalten.

### 2. Passwort
- **Ohne** Zwei-Faktor-Anmeldung: dein normales web.de-Passwort.
- **Mit** Zwei-Faktor-Anmeldung: in den web.de-Sicherheitseinstellungen ein
  App-Passwort erzeugen und dieses verwenden.

### 3. uv installieren
`uv` lädt die nötige Python-Bibliothek automatisch, du musst Python nicht selbst einrichten.

- **Mac:** im Terminal `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **Windows:** in PowerShell `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`

Danach den vollständigen Pfad herausfinden. Claude Desktop kennt deinen PATH oft nicht:
- Mac: `which uv`, z. B. `/Users/DEINNAME/.local/bin/uv`
- Windows: `where.exe uv`, z. B. `C:\Users\DEINNAME\.local\bin\uv.exe`

### 4. Datei ablegen
`webde_mcp.py` an einen festen Ort kopieren, z. B.
- Mac: `/Users/DEINNAME/mcp/webde_mcp.py`
- Windows: `C:\Users\DEINNAME\mcp\webde_mcp.py`

### 5. In Claude Desktop eintragen
Claude Desktop → Einstellungen → Entwickler → „Konfiguration bearbeiten“ öffnet
`claude_desktop_config.json`. Dort ergänzen (Pfade und Zugangsdaten anpassen):

```json
{
  "mcpServers": {
    "webde": {
      "command": "/Users/DEINNAME/.local/bin/uv",
      "args": ["run", "--script", "/Users/DEINNAME/mcp/webde_mcp.py"],
      "env": {
        "WEBDE_EMAIL": "deine.adresse@web.de",
        "WEBDE_PASSWORD": "dein-passwort-oder-app-passwort"
      }
    }
  }
}
```

Unter Windows Backslashes doppelt schreiben, z. B.
`"C:\\Users\\DEINNAME\\.local\\bin\\uv.exe"`.

Steht in der Datei schon ein `"mcpServers"`-Block, füge nur den `"webde": {…}`-Teil
dort hinzu.

### 6. Claude Desktop komplett beenden und neu starten
Danach sollte „webde“ unter den Tools auftauchen. Zum Testen:
„Zeig mir meine 5 neuesten Mails.“

## Beispiele
- „Fasse meine ungelesenen Mails von heute zusammen.“
- „Such Mails von jürgen@… seit 2026-09-01.“
- „Schreib einen Antwortentwurf auf UID 1234: freundlich zusagen, Termin nächste Woche vorschlagen.“

## Sicherheit
- Das Passwort steht im Klartext in `claude_desktop_config.json` auf deinem Rechner.
  Ein App-Passwort ist besser, weil du es jederzeit einzeln widerrufen kannst.
- Der Server läuft nur lokal und verbindet sich ausschließlich mit `imap.web.de:993` (SSL).
- Mail-Inhalte gehen beim Lesen an Claude. Mails, die nicht an Claude gehen sollen,
  lässt du Claude nicht lesen.

## Fehlersuche
- **Login schlägt fehl:** Ist IMAP aktiviert? Mit Zwei-Faktor-Anmeldung das App-Passwort verwenden.
- **Server taucht nicht auf:** absolute Pfade prüfen; Logs unter
  Mac `~/Library/Logs/Claude/mcp-server-webde.log`,
  Windows `%APPDATA%\Claude\logs\mcp-server-webde.log`.
