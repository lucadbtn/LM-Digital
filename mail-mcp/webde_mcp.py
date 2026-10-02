# /// script
# requires-python = ">=3.10"
# dependencies = ["mcp>=1.2"]
# ///
"""MCP-Server für ein web.de-Postfach über IMAP.

Kann Mails auflisten, durchsuchen, lesen und Entwürfe im Ordner "Entwürfe"
ablegen. Er kann bewusst NICHT senden – abgeschickt wird nur von dir selbst.

Zugangsdaten kommen aus den Umgebungsvariablen WEBDE_EMAIL und WEBDE_PASSWORD.
"""

from __future__ import annotations

import base64
import email
import imaplib
import os
import re
import time
from contextlib import contextmanager
from email import policy
from email.message import EmailMessage
from email.utils import formatdate, make_msgid, getaddresses

from mcp.server.fastmcp import FastMCP

IMAP_HOST = os.environ.get("WEBDE_IMAP_HOST", "imap.web.de")
IMAP_PORT = int(os.environ.get("WEBDE_IMAP_PORT", "993"))
DRAFT_FALLBACK_NAMES = ("Entwürfe", "Drafts", "Entwurf")

mcp = FastMCP("webde-mail")


# --- IMAP-Ordnernamen (modified UTF-7, RFC 3501) ---------------------------

def _decode_mutf7(name: str) -> str:
    def repl(m: re.Match) -> str:
        chunk = m.group(1)
        if chunk == "":
            return "&"
        b64 = chunk.replace(",", "/")
        b64 += "=" * (-len(b64) % 4)
        return base64.b64decode(b64).decode("utf-16-be")

    return re.sub(r"&([^-]*)-", repl, name)


def _encode_mutf7(name: str) -> str:
    out, buf = [], []

    def flush() -> None:
        if buf:
            raw = "".join(buf).encode("utf-16-be")
            out.append("&" + base64.b64encode(raw).decode().rstrip("=").replace("/", ",") + "-")
            buf.clear()

    for ch in name:
        if 0x20 <= ord(ch) <= 0x7E:
            flush()
            out.append("&-" if ch == "&" else ch)
        else:
            buf.append(ch)
    flush()
    return "".join(out)


def _quote(mailbox: str) -> str:
    return '"' + _encode_mutf7(mailbox).replace("\\", "\\\\").replace('"', '\\"') + '"'


# --- Verbindung -------------------------------------------------------------

@contextmanager
def _imap():
    user = os.environ.get("WEBDE_EMAIL")
    password = os.environ.get("WEBDE_PASSWORD")
    if not user or not password:
        raise RuntimeError("WEBDE_EMAIL und WEBDE_PASSWORD müssen gesetzt sein.")
    conn = imaplib.IMAP4_SSL(IMAP_HOST, IMAP_PORT, timeout=30)
    try:
        conn.login(user, password)
        yield conn
    finally:
        try:
            conn.logout()
        except Exception:
            pass


def _check(typ: str, data, what: str):
    if typ != "OK":
        raise RuntimeError(f"IMAP-Fehler bei {what}: {data!r}")
    return data


def _list_folders(conn) -> list[tuple[str, str]]:
    """Liefert (Name, Flags) für alle Ordner."""
    data = _check(*conn.list(), "LIST")
    result = []
    for line in data:
        if not line:
            continue
        text = line.decode() if isinstance(line, bytes) else str(line)
        m = re.match(r'\((?P<flags>[^)]*)\) (?:"[^"]*"|NIL) (?P<name>.+)$', text)
        if not m:
            continue
        name = m.group("name").strip()
        if name.startswith('"') and name.endswith('"'):
            name = name[1:-1].replace('\\"', '"').replace("\\\\", "\\")
        result.append((_decode_mutf7(name), m.group("flags")))
    return result


def _drafts_folder(conn) -> str:
    folders = _list_folders(conn)
    for name, flags in folders:
        if "\\Drafts" in flags:
            return name
    names = {n.lower(): n for n, _ in folders}
    for candidate in DRAFT_FALLBACK_NAMES:
        if candidate.lower() in names:
            return names[candidate.lower()]
    raise RuntimeError("Kein Entwürfe-Ordner gefunden. Ordner: " + ", ".join(n for n, _ in folders))


def _select(conn, folder: str, readonly: bool = True) -> None:
    _check(*conn.select(_quote(folder), readonly=readonly), f"SELECT {folder}")


def _fetch_messages(conn, uids: list[bytes], headers_only: bool) -> list[tuple[str, email.message.EmailMessage, str]]:
    if not uids:
        return []
    part = "BODY.PEEK[HEADER]" if headers_only else "BODY.PEEK[]"  # PEEK: nicht als gelesen markieren
    data = _check(*conn.uid("FETCH", b",".join(uids), f"(UID FLAGS {part})"), "FETCH")
    out = []
    for item in data:
        if not isinstance(item, tuple):
            continue
        meta = item[0].decode(errors="replace")
        uid = re.search(r"UID (\d+)", meta)
        flags = re.search(r"FLAGS \(([^)]*)\)", meta)
        msg = email.message_from_bytes(item[1], policy=policy.default)
        out.append((uid.group(1) if uid else "?", msg, flags.group(1) if flags else ""))
    return out


def _summary(uid: str, msg, flags: str) -> str:
    unread = "" if "\\Seen" in flags else " [ungelesen]"
    return (
        f"UID {uid}{unread}\n"
        f"  Von:     {msg.get('From', '')}\n"
        f"  Betreff: {msg.get('Subject', '')}\n"
        f"  Datum:   {msg.get('Date', '')}"
    )


def _body_text(msg) -> str:
    part = msg.get_body(preferencelist=("plain", "html"))
    if part is None:
        return ""
    try:
        text = part.get_content()
    except Exception:
        payload = part.get_payload(decode=True) or b""
        text = payload.decode(part.get_content_charset() or "utf-8", errors="replace")
    if part.get_content_type() == "text/html":
        text = re.sub(r"(?is)<(script|style).*?</\1>", "", text)
        text = re.sub(r"(?i)<br\s*/?>|</p>|</div>|</tr>", "\n", text)
        text = re.sub(r"<[^>]+>", "", text)
        import html as _html
        text = _html.unescape(text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def _attachments(msg) -> list[str]:
    return [p.get_filename() or "(ohne Namen)" for p in msg.iter_attachments()]


# --- Tools ------------------------------------------------------------------

@mcp.tool()
def list_folders() -> str:
    """Listet alle Ordner des web.de-Postfachs."""
    with _imap() as conn:
        return "\n".join(name for name, _ in _list_folders(conn))


@mcp.tool()
def list_emails(folder: str = "INBOX", limit: int = 20, unread_only: bool = False) -> str:
    """Listet die neuesten Mails eines Ordners (Standard: Posteingang), neueste zuerst."""
    with _imap() as conn:
        _select(conn, folder)
        data = _check(*conn.uid("SEARCH", "UNSEEN" if unread_only else "ALL"), "SEARCH")
        uids = data[0].split()[-max(1, min(limit, 100)):][::-1]
        msgs = _fetch_messages(conn, uids, headers_only=True)
        msgs.sort(key=lambda m: int(m[0]) if m[0].isdigit() else 0, reverse=True)
        return "\n\n".join(_summary(*m) for m in msgs) or "Keine Mails gefunden."


@mcp.tool()
def search_emails(
    text: str = "",
    from_: str = "",
    subject: str = "",
    since: str = "",
    unread_only: bool = False,
    folder: str = "INBOX",
    limit: int = 20,
) -> str:
    """Durchsucht einen Ordner. since im Format JJJJ-MM-TT. Alle Kriterien werden UND-verknüpft."""
    criteria: list[str] = []
    literals: list[tuple[str, str]] = []
    for key, value in (("TEXT", text), ("FROM", from_), ("SUBJECT", subject)):
        if value:
            literals.append((key, value))
    if since:
        criteria += ["SINCE", time.strftime("%d-%b-%Y", time.strptime(since, "%Y-%m-%d"))]
    if unread_only:
        criteria.append("UNSEEN")

    with _imap() as conn:
        _select(conn, folder)
        # ASCII-Begriffe quotiert; der erste Begriff mit Umlauten o. Ä. geht als
        # IMAP-Literal ans Ende (imaplib erlaubt nur ein Literal pro Befehl).
        literal_value = None
        for key, value in literals:
            if value.isascii() or literal_value is not None:
                criteria += [key, '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"']
            else:
                literal_key, literal_value = key, value
        if literal_value is not None:
            criteria.append(literal_key)
            conn.literal = literal_value.encode("utf-8")
        if not criteria:
            criteria = ["ALL"]
        args = [c.encode("utf-8") for c in criteria]
        if literal_value is not None or not all(v.isascii() for _, v in literals):
            data = _check(*conn.uid("SEARCH", "CHARSET", "UTF-8", *args), "SEARCH")
        else:
            data = _check(*conn.uid("SEARCH", *args), "SEARCH")
        uids = data[0].split()[-max(1, min(limit, 100)):][::-1]
        msgs = _fetch_messages(conn, uids, headers_only=True)
        msgs.sort(key=lambda m: int(m[0]) if m[0].isdigit() else 0, reverse=True)
        return "\n\n".join(_summary(*m) for m in msgs) or "Keine Treffer."


@mcp.tool()
def read_email(uid: str, folder: str = "INBOX", max_chars: int = 20000) -> str:
    """Liest eine Mail vollständig (Kopfzeilen, Text, Anhangsnamen). Markiert sie nicht als gelesen."""
    with _imap() as conn:
        _select(conn, folder)
        msgs = _fetch_messages(conn, [uid.encode()], headers_only=False)
        if not msgs:
            return f"Keine Mail mit UID {uid} in {folder}."
        _, msg, flags = msgs[0]
        body = _body_text(msg)
        if len(body) > max_chars:
            body = body[:max_chars] + "\n\n[… gekürzt]"
        lines = [
            _summary(uid, msg, flags),
            f"  An:      {msg.get('To', '')}",
        ]
        if msg.get("Cc"):
            lines.append(f"  Cc:      {msg.get('Cc')}")
        atts = _attachments(msg)
        if atts:
            lines.append("  Anhänge: " + ", ".join(atts))
        return "\n".join(lines) + "\n\n" + body


@mcp.tool()
def create_draft(
    body: str,
    to: str = "",
    subject: str = "",
    cc: str = "",
    reply_to_uid: str = "",
    reply_folder: str = "INBOX",
) -> str:
    """Legt einen Entwurf im web.de-Ordner "Entwürfe" ab. Sendet NICHTS.

    Für eine Antwort reply_to_uid angeben: Empfänger, Betreff ("Re: …") und
    Thread-Verknüpfung werden dann aus der Original-Mail übernommen, sofern
    to/subject leer sind. Das Original wird unter dem Text zitiert.
    """
    sender = os.environ.get("WEBDE_EMAIL", "")
    draft = EmailMessage()
    full_body = body

    with _imap() as conn:
        if reply_to_uid:
            _select(conn, reply_folder)
            msgs = _fetch_messages(conn, [reply_to_uid.encode()], headers_only=False)
            if not msgs:
                return f"Keine Mail mit UID {reply_to_uid} in {reply_folder}."
            orig = msgs[0][1]
            if not to:
                to = str(orig.get("Reply-To") or orig.get("From") or "")
            if not subject:
                s = str(orig.get("Subject", ""))
                subject = s if s.lower().startswith(("re:", "aw:")) else f"Re: {s}"
            if orig.get("Message-ID"):
                draft["In-Reply-To"] = orig["Message-ID"]
                refs = str(orig.get("References", "")).split()
                draft["References"] = " ".join(refs + [str(orig["Message-ID"])])
            quoted = "\n".join("> " + l for l in _body_text(orig).splitlines())
            full_body = f"{body}\n\nAm {orig.get('Date', '')} schrieb {orig.get('From', '')}:\n{quoted}"

        if not to:
            return "Kein Empfänger: 'to' angeben oder 'reply_to_uid' nutzen."
        if not getaddresses([to]) or "@" not in to:
            return f"Ungültiger Empfänger: {to}"

        draft["From"] = sender
        draft["To"] = to
        if cc:
            draft["Cc"] = cc
        draft["Subject"] = subject
        draft["Date"] = formatdate(localtime=True)
        draft["Message-ID"] = make_msgid(domain=sender.split("@")[-1] or "web.de")
        draft.set_content(full_body, cte="quoted-printable")

        folder = _drafts_folder(conn)
        _check(
            *conn.append(_quote(folder), "(\\Draft \\Seen)", imaplib.Time2Internaldate(time.time()),
                         draft.as_bytes(policy=policy.SMTP)),
            "APPEND",
        )
        return f"Entwurf an {to} mit Betreff \"{subject}\" in \"{folder}\" abgelegt. Bitte in web.de prüfen und selbst senden."


if __name__ == "__main__":
    mcp.run()
