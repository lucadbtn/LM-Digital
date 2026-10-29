#!/usr/bin/env python3
"""Erzeugt den statischen Website-Entwurf der Praxis Grosse nach site/.

Aufruf: python3 build.py
Alle Inhalte stehen in content.py; Platzhalter [[...]] werden gelb markiert.
"""
import html
import json
import re
from pathlib import Path

from content import (FAQ, FREIES_TRAINING, KATEGORIEN, LEISTUNGEN, OEFFNUNGSZEITEN, PRAXIS, TEAM,
                     TELEFONZEITEN)

SITE = Path(__file__).parent / "site"
BASE = PRAXIS["base_url"]
# Der Entwurf darf nicht in Suchmaschinen landen. Für den Livegang auf False setzen.
KONZEPT = True

BY_SLUG = {l["slug"]: l for l in LEISTUNGEN}
E = html.escape
TAGE = dict(Mo="Monday", Tu="Tuesday", We="Wednesday", Th="Thursday", Fr="Friday")


def tbd(text):
    """Escaped Text; [[...]] wird als markierter Platzhalter ausgegeben."""
    return re.sub(r"\[\[(.+?)\]\]", r'<mark class="tbd" title="Von der Praxis zu ergänzen">\1</mark>', E(text))


def plain(text):
    return re.sub(r"\s*\[\[.+?\]\]", "", text).strip()


def img(name, alt, rel, cls="", sizes="(min-width: 960px) 50vw, 100vw", eager=False, w=1280, h=853):
    load = 'fetchpriority="high"' if eager else 'loading="lazy" decoding="async"'
    return (f'<img class="{cls}" src="{rel}assets/img/{name}-1280.webp" '
            f'srcset="{rel}assets/img/{name}-640.webp 640w, {rel}assets/img/{name}-1280.webp 1280w" '
            f'sizes="{sizes}" width="{w}" height="{h}" alt="{E(alt)}" {load}>')


def heute_tel():
    return f"Mo–Fr {TELEFONZEITEN[0][:2].lstrip('0')}–{TELEFONZEITEN[1][:2]} Uhr"


# ------------------------------------------------------------------ Schema.org

def schema_praxis():
    return {
        "@context": "https://schema.org",
        "@type": "Physiotherapy",
        "@id": f"{BASE}/#praxis",
        "name": PRAXIS["name"],
        "legalName": "Praxis Michaela Grosse",
        "description": "Praxis für Physiotherapie und Osteopathie in Ispringen bei Pforzheim. Therapie auf Rezept, ergänzende Behandlungen, Kurse und Gerätetraining.",
        "url": f"{BASE}/",
        "logo": f"{BASE}/assets/img/logo-praxis-grosse.png",
        "image": f"{BASE}/assets/img/team-jubel-1280.webp",
        "telephone": "+49 7231 80799",
        "faxNumber": "+49 7231 4259266",
        "address": {"@type": "PostalAddress", "streetAddress": PRAXIS["street"], "postalCode": PRAXIS["zip"],
                    "addressLocality": PRAXIS["city"], "addressRegion": "Baden-Württemberg", "addressCountry": "DE"},
        "areaServed": ["Ispringen", "Pforzheim", "Enzkreis"],
        "foundingDate": str(PRAXIS["since"]),
        "founder": {"@type": "Person", "name": "Michaela Grosse", "jobTitle": "Physiotherapeutin, Osteopathin M.Sc."},
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": f"https://schema.org/{TAGE[k]}", "opens": a, "closes": z}
            for _, k, a, z in OEFFNUNGSZEITEN
        ],
        "sameAs": [PRAXIS["facebook"]],
    }


def schema_breadcrumbs(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": f"{BASE}/{u}"}
                                for i, (n, u) in enumerate(items)]}


# ------------------------------------------------------------------ Layout

NAV = [("Leistungen", "leistungen/index.html"), ("Praxis", "praxis.html"), ("Team", "team.html"),
       ("Fragen", "fragen.html"), ("Kontakt", "kontakt.html")]


def layout(path, title, desc, body, schemas=(), crumbs=None, robots=None):
    depth = path.count("/")
    rel = "../" * depth
    url = f"{BASE}/{'' if path == 'index.html' else path}"
    if robots is None:
        robots = "noindex, nofollow" if KONZEPT else "index, follow"
    schemas = [schema_praxis(), *schemas]
    if crumbs:
        schemas.append(schema_breadcrumbs(crumbs))
    ld = "\n".join(f'<script type="application/ld+json">{json.dumps(s, ensure_ascii=False)}</script>' for s in schemas)

    def aktiv(u):
        return path == u or (u.startswith("leistungen") and path.startswith("leistungen"))
    current = ' aria-current="page"'
    nav = "".join(f'<li><a href="{rel}{u}"{current if aktiv(u) else ""}>{n}</a></li>' for n, u in NAV)
    crumb_html = ""
    if crumbs and len(crumbs) > 1:
        parts = [f'<a href="{rel}{u or "index.html"}">{E(n)}</a>' for n, u in crumbs[:-1]]
        sep = ' <span aria-hidden="true">/</span> '
        crumb_html = f'<nav class="crumbs wrap" aria-label="Brotkrumen">{sep.join(parts)}{sep}<span aria-current="page">{E(crumbs[-1][0])}</span></nav>'

    hours_rows = "".join(f"<tr><th scope=\"row\">{d}</th><td>{a} – {z}</td></tr>" for d, _, a, z in OEFFNUNGSZEITEN)
    konzept = ('<div class="konzept" role="note">Konzeptentwurf – nicht die offizielle Website der Praxis Grosse. '
               'Gelb markierte Stellen muss die Praxis noch liefern oder bestätigen.</div>') if KONZEPT else ""

    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="Praxis Grosse">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{BASE}/assets/img/team-jubel-1280.webp">
<meta name="theme-color" content="#C1223A">
<link rel="preload" href="{rel}assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{rel}assets/fonts/atkinson.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{rel}assets/site.css">
<link rel="icon" href="{rel}assets/img/favicon.svg" type="image/svg+xml">
{ld}
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
{konzept}
<header class="kopf">
  <div class="wrap kopf__innen">
    <a class="marke" href="{rel}index.html" aria-label="Praxis Grosse – zur Startseite">
      <img src="{rel}assets/img/logo-praxis-grosse.png" width="180" height="62" alt="Praxis Grosse">
    </a>
    <nav class="hauptnav" id="hauptnav" aria-label="Hauptnavigation"><ul>{nav}</ul></nav>
    <div class="kopf__aktion">
      <a class="tel" href="tel:{PRAXIS['phone_href']}"><span class="status" data-status aria-live="polite"></span><span class="tel__nr">{PRAXIS['phone_display']}</span></a>
      <a class="knopf knopf--klein" href="{rel}termin.html">Termin anfragen</a>
      <button class="menue" type="button" aria-expanded="false" aria-controls="hauptnav">Menü</button>
    </div>
  </div>
</header>
{crumb_html}
<main id="inhalt">
{body}
</main>
<footer class="fuss">
  <div class="wrap fuss__raster">
    <div>
      <p class="fuss__name">Praxis Grosse</p>
      <p>Physiotherapie und Osteopathie<br>{PRAXIS['street']}<br>{PRAXIS['zip']} {PRAXIS['city']}</p>
      <p><a href="tel:{PRAXIS['phone_href']}">Tel. {PRAXIS['phone_display']}</a><br>Fax {PRAXIS['fax_display']}<br>{tbd(PRAXIS['email'])}</p>
    </div>
    <div>
      <p class="fuss__titel">Öffnungszeiten</p>
      <table class="zeiten">{hours_rows}</table>
      <p class="klein">Telefonisch erreichbar {heute_tel()} <mark class="tbd">bitte bestätigen</mark></p>
    </div>
    <div>
      <p class="fuss__titel">Leistungen</p>
      <ul class="fuss__liste">
        {''.join(f'<li><a href="{rel}leistungen/{k["seite"]}.html">{k["titel"]}</a></li>' for k in KATEGORIEN.values())}
        <li><a href="{rel}leistungen/osteopathie.html">Osteopathie</a></li>
        <li><a href="{rel}leistungen/hausbesuche.html">Hausbesuche</a></li>
      </ul>
    </div>
    <div>
      <p class="fuss__titel">Praxis</p>
      <ul class="fuss__liste">
        <li><a href="{rel}team.html">Team</a></li>
        <li><a href="{rel}karriere.html">Karriere</a></li>
        <li><a href="{rel}fragen.html">Häufige Fragen</a></li>
        <li><a href="{rel}kontakt.html">Anfahrt &amp; Parken</a></li>
        <li><a href="{rel}impressum.html">Impressum</a></li>
        <li><a href="{rel}datenschutz.html">Datenschutz</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap fuss__unten">
    <p>© Praxis Michaela Grosse · Seit {PRAXIS['since']} in Ispringen</p>
    <button class="schrift" type="button" data-schrift aria-pressed="false">Größere Schrift</button>
  </div>
</footer>
<nav class="leiste" aria-label="Schnellkontakt">
  <a href="tel:{PRAXIS['phone_href']}">Anrufen</a>
  <a href="{rel}termin.html">Termin anfragen</a>
</nav>
<script src="{rel}assets/site.js" defer></script>
</body>
</html>
"""


def write(path, content):
    p = SITE / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")


# ------------------------------------------------------------------ Bausteine

def karte(l, rel):
    k = KATEGORIEN[l["kat"]]
    return f"""<li class="karte karte--{l['kat']}">
  <a href="{rel}leistungen/{l['slug']}.html">
    {img(l['bild'], l['alt'], rel, 'karte__bild', sizes='(min-width: 960px) 25vw, (min-width: 600px) 45vw, 100vw')}
    <span class="etikett etikett--{l['kat']}">{k['kurz']}</span>
    <span class="karte__titel">{E(l['titel'])}</span>
    <span class="karte__text">{E(l['lead'])}</span>
  </a>
</li>"""


def rezeptkarte(rel):
    return f"""<aside class="rezept" aria-labelledby="rezept-titel">
  <p class="rezept__kopf"><span>Heilmittelverordnung</span><span>Muster 13</span></p>
  <h2 id="rezept-titel" class="rezept__titel">Rezept bekommen? So geht es weiter.</h2>
  <ol class="rezept__felder">
    <li><span class="feld">Anrufen</span><span><a href="tel:{PRAXIS['phone_href']}">{PRAXIS['phone_display']}</a> · {heute_tel()}</span></li>
    <li><span class="feld">Starten</span><span>Erster Termin innerhalb von 28 Tagen nach Ausstellung</span></li>
    <li><span class="feld">Mitbringen</span><span>Verordnung, Handtuch, bequeme Kleidung</span></li>
  </ol>
  <p class="rezept__fuss">Kein Rezept? <a href="{rel}leistungen/ergaenzende-behandlungen.html">Massagen, Osteopathie</a> und <a href="{rel}leistungen/kurse-training.html">Kurse</a> buchen Sie direkt.</p>
</aside>"""


def faq_block(items, open_first=False):
    out = []
    for i, (q, a) in enumerate(items):
        out.append(f'<details class="frage"{" open" if open_first and i == 0 else ""}><summary>{E(q)}</summary><p>{tbd(a)}</p></details>')
    return "\n".join(out)


def schema_faq(items):
    items = [(q, a) for q, a in items if not a.startswith("[[")]
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q,
                            "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in items]}


def zeiten_tabelle():
    rows = "".join(f'<tr><th scope="row">{d}</th><td class="mono">{a} – {z} Uhr</td></tr>' for d, _, a, z in OEFFNUNGSZEITEN)
    return f'<table class="zeiten zeiten--gross"><caption>Öffnungszeiten</caption>{rows}<tr><th scope="row">Sa, So</th><td>geschlossen</td></tr></table>'


def karte_karte():
    q = "Bahnhofstraße 4, 75228 Ispringen"
    return f"""<div class="karte-zustimmung" data-karte data-src="https://maps.google.com/maps?q={E(q.replace(' ', '+'))}&amp;output=embed">
  <p><strong>Karte anzeigen?</strong> Beim Laden der Karte werden Daten an Google übertragen.</p>
  <button class="knopf knopf--hell" type="button">Karte laden</button>
  <p class="klein"><a href="https://www.google.com/maps/dir/?api=1&amp;destination={E(q.replace(' ', '+'))}" rel="noopener">Route in Google Maps öffnen</a></p>
</div>"""


# ------------------------------------------------------------------ Seiten

def seite_start():
    rel = ""
    kat_html = []
    top = {"therapie": ["krankengymnastik", "manuelle-therapie", "manuelle-lymphdrainage", "bobath-therapie", "hausbesuche"],
           "ergaenzung": ["osteopathie", "hot-stone-massage", "sportmassage", "kinesio-tape"],
           "plus": ["rueckenfit", "pilates", "seniorenfit", "personal-training"]}
    for key, k in KATEGORIEN.items():
        n = sum(1 for l in LEISTUNGEN if l["kat"] == key)
        links = "".join(f'<li><a href="leistungen/{s}.html">{E(BY_SLUG[s]["titel"])}</a></li>' for s in top[key])
        kat_html.append(f"""<section class="saeule saeule--{key}" aria-labelledby="s-{key}">
  <p class="etikett etikett--{key}">{k['kurz']}</p>
  <h3 id="s-{key}">{k['titel']}</h3>
  <p>{E(k['intro'].split('. ')[0])}.</p>
  <ul>{links}</ul>
  <a class="pfeil" href="leistungen/{k['seite']}.html">Alle {n} Angebote</a>
</section>""")

    body = f"""
<section class="held wrap">
  <div class="held__text">
    <p class="dach">Praxis Grosse · Ispringen bei Pforzheim · seit {PRAXIS['since']}</p>
    <h1>Physiotherapie und Osteopathie in Ispringen</h1>
    <p class="lead">Therapie auf Rezept, ergänzende Behandlungen und Training unter einem Dach. Mit 16 Frauen, die dranbleiben – damit Sie es auch tun.</p>
    <div class="knoepfe">
      <a class="knopf" href="tel:{PRAXIS['phone_href']}">Anrufen: {PRAXIS['phone_display']}</a>
      <a class="knopf knopf--hell" href="termin.html">Rückruf anfragen</a>
    </div>
    <p class="hinweis" data-status-text>Telefonisch erreichbar {heute_tel()}.</p>
  </div>
  {rezeptkarte(rel)}
</section>

<figure class="buehne">
  {img('team-jubel', 'Das Team der Praxis Grosse reißt im Trainingsraum jubelnd die Arme hoch', rel, sizes='100vw', w=1280, h=853)}
  <figcaption class="wrap">Das Team der Praxis Grosse im Trainingstherapieraum</figcaption>
</figure>

<section class="wrap abschnitt" aria-labelledby="angebot">
  <h2 id="angebot" class="abschnitt__titel">Was wir für Sie tun</h2>
  <p class="abschnitt__lead">Unser Angebot hat drei Teile. Das Etikett zeigt Ihnen überall auf der Website, wie eine Leistung bezahlt wird.</p>
  <div class="saeulen">{''.join(kat_html)}</div>
</section>

<section class="band" aria-labelledby="gut">
  <div class="wrap">
    <h2 id="gut" class="abschnitt__titel">Gut zu wissen, bevor Sie kommen</h2>
    <dl class="fakten">
      <div><dt>Früh und spät</dt><dd>Montags behandeln wir bis 20:30 Uhr, mittwochs bis 20 Uhr – ab 7 Uhr morgens.</dd></div>
      <div><dt>Parken</dt><dd>4 Praxisparkplätze im Hof, weitere in der Bahnhofstraße. Bahnhof Ispringen liegt um die Ecke.</dd></div>
      <div><dt>Eine Stufe</dt><dd>Die Praxis ist barrierearm. Am Eingang ist eine kleine Stufe – rufen Sie an, wir helfen.</dd></div>
      <div><dt>Hausbesuche</dt><dd>Mit Verordnung kommen wir zu Ihnen nach Hause oder ins Pflegeheim.</dd></div>
    </dl>
    <p><a class="pfeil" href="kontakt.html">Anfahrt, Parken und Öffnungszeiten</a></p>
  </div>
</section>

<section class="wrap abschnitt geteilt" aria-labelledby="osteo">
  <div>
    <p class="etikett etikett--ergaenzung">Selbstzahler</p>
    <h2 id="osteo">Osteopathie bei Michaela Grosse</h2>
    <p>Die Praxisinhaberin ist Physiotherapeutin seit Anfang der 1990er Jahre und Osteopathin mit Masterabschluss (M.Sc., Dresden International University). Viele Krankenkassen bezuschussen Osteopathie – fragen Sie bei Ihrer Kasse nach.</p>
    <a class="pfeil" href="leistungen/osteopathie.html">Mehr zur Osteopathie</a>
  </div>
  {img('massage-bein', 'Therapeutin behandelt mit beiden Händen das Bein eines Patienten', rel, 'rund', w=630, h=430)}
</section>

<section class="wrap abschnitt geteilt geteilt--umgekehrt" aria-labelledby="team-t">
  {img('team-haende', 'Viele Hände des Teams bilden auf dem Boden einen Kreis', rel, 'rund', w=1024, h=576)}
  <div>
    <h2 id="team-t">16 Frauen, ein Team</h2>
    <p>Physiotherapeutinnen, Trainerinnen und Praxisorganisation, zwischen Anfang 40 und Mitte 60. Mehrere sind seit über 15 Jahren dabei, zusammen haben sie mehr als 35 Zusatzqualifikationen. Einmal pro Woche trainiert das ganze Team gemeinsam.</p>
    <a class="pfeil" href="team.html">Das Team kennenlernen</a>
  </div>
</section>

<section class="band band--hell" aria-labelledby="stimmen">
  <div class="wrap">
    <h2 id="stimmen" class="abschnitt__titel">Das sagen Patientinnen und Patienten</h2>
    <div class="platzhalter">
      <p><strong>Platzhalter für echte Google-Bewertungen.</strong> Hier 3 aktuelle Bewertungen mit Namenskürzel und Datum einbinden und auf das Google-Unternehmensprofil verlinken. Keine erfundenen oder gekauften Bewertungen verwenden.</p>
    </div>
  </div>
</section>

<section class="wrap abschnitt schmal" aria-labelledby="fragen-t">
  <h2 id="fragen-t" class="abschnitt__titel">Häufige Fragen</h2>
  {faq_block(FAQ[:4], open_first=True)}
  <p><a class="pfeil" href="fragen.html">Alle Fragen und Antworten</a></p>
</section>
"""
    write("index.html", layout(
        "index.html",
        "Physiotherapie & Osteopathie in Ispringen | Praxis Grosse",
        "Praxis Grosse in Ispringen bei Pforzheim: Physiotherapie auf Rezept, Osteopathie, Massagen, Kurse und Gerätetraining. Telefon 07231 80799 – Termine Mo–Fr.",
        body))


def seite_leistungen():
    rel = "../"
    teile = []
    for key, k in KATEGORIEN.items():
        items = "".join(karte(l, rel) for l in LEISTUNGEN if l["kat"] == key)
        teile.append(f"""<section class="abschnitt" aria-labelledby="k-{key}">
  <div class="kat-kopf kat-kopf--{key}">
    <p class="etikett etikett--{key}">{k['kurz']}</p>
    <h2 id="k-{key}"><a href="{k['seite']}.html">{k['titel']}</a></h2>
    <p>{E(k['bezahlung'].split('[[')[0])}</p>
  </div>
  <ul class="karten">{items}</ul>
</section>""")
    body = f"""<div class="wrap">
<header class="seitenkopf">
  <h1>Leistungen der Praxis Grosse</h1>
  <p class="lead">{len(LEISTUNGEN)} Angebote in drei Bereichen: Therapie auf Rezept, ergänzende Behandlungen ohne Rezept sowie Kurse und Training.</p>
</header>
{''.join(teile)}
</div>"""
    write("leistungen/index.html", layout(
        "leistungen/index.html", "Leistungen: Physiotherapie, Massage, Kurse | Praxis Grosse Ispringen",
        "Alle Leistungen der Praxis Grosse in Ispringen: Krankengymnastik, Manuelle Therapie, Lymphdrainage, Osteopathie, Massagen, Pilates, Yoga, Rückenfit und mehr.",
        body, crumbs=[("Start", ""), ("Leistungen", "leistungen/")]))

    for key, k in KATEGORIEN.items():
        items = "".join(karte(l, rel) for l in LEISTUNGEN if l["kat"] == key)
        extra = ""
        if key == "plus":
            rows = "".join(f'<tr><th scope="row">{d}</th><td class="mono">{tbd(z)}</td></tr>' for d, z in FREIES_TRAINING)
            extra = f'<section class="abschnitt schmal"><h2>Freies Training</h2><p>Mit Ihrem Trainingsplan trainieren Sie zu diesen Zeiten selbstständig an den Geräten:</p><table class="zeiten zeiten--gross">{rows}</table></section>'
        if key == "therapie":
            extra = f'<section class="abschnitt schmal"><h2>Fragen zum Rezept</h2>{faq_block(FAQ[:3])}</section>'
        body = f"""<div class="wrap">
<header class="seitenkopf seitenkopf--{key}">
  <p class="etikett etikett--{key}">{k['kurz']}</p>
  <h1>{k['h1']}</h1>
  <p class="lead">{E(k['intro'])}</p>
  <p class="bezahlt"><strong>Bezahlung:</strong> {tbd(k['bezahlung'])}</p>
</header>
<ul class="karten">{items}</ul>
{extra}
</div>"""
        schemas = [schema_faq(FAQ[:3])] if key == "therapie" else []
        write(f"leistungen/{k['seite']}.html", layout(
            f"leistungen/{k['seite']}.html", f"{k['h1']} | Praxis Grosse", k["desc"], body, schemas=schemas,
            crumbs=[("Start", ""), ("Leistungen", "leistungen/"), (k["titel"], f"leistungen/{k['seite']}.html")]))


def seite_leistung(l):
    rel = "../"
    k = KATEGORIEN[l["kat"]]
    path = f"leistungen/{l['slug']}.html"
    absaetze = "".join(f"<p>{tbd(t)}</p>" for t in l["text"])
    bezahlung = ("Mit Verordnung: Kasse übernimmt die Kosten bis auf die gesetzliche Zuzahlung."
                 if l["kat"] == "therapie" else "Selbstzahler-Leistung, kein Rezept nötig.")
    fakten = [("Bezahlung", bezahlung)] + l.get("fakten", [])
    fakten_html = "".join(f"<div><dt>{E(a)}</dt><dd>{tbd(b)}</dd></div>" for a, b in fakten)
    nicht = ""
    if l.get("nicht"):
        nicht = ('<section class="achtung" aria-labelledby="nicht"><h2 id="nicht">Nicht geeignet bei</h2><ul>'
                 + "".join(f"<li>{E(n)}</li>" for n in l["nicht"])
                 + "</ul><p class=\"klein\">Im Zweifel sprechen wir das vor der Behandlung mit Ihnen durch.</p></section>")
    verwandt = "".join(karte(BY_SLUG[s], rel) for s in l.get("verwandt", []))
    ort = "" if "Ispringen" in l["titel"] else " in Ispringen"
    body = f"""<article class="wrap leistung">
  <header class="leistung__kopf">
    <p class="etikett etikett--{l['kat']}">{k['kurz']}</p>
    <h1>{E(l['titel'])}<span class="ort">{ort}</span></h1>
    <p class="motto">„{E(l['motto'])}“</p>
  </header>
  <div class="leistung__raster">
    <div class="leistung__text">
      {img(l['bild'], l['alt'], rel, 'rund', sizes='(min-width: 960px) 60vw, 100vw', eager=True)}
      <p class="lead">{E(l['lead'])}</p>
      {absaetze}
      {nicht}
      <p class="hwg klein">Hinweis: Wir geben kein Heilungsversprechen. Wie eine Behandlung wirkt, ist von Mensch zu Mensch verschieden.</p>
    </div>
    <aside class="leistung__info" aria-label="Auf einen Blick">
      <h2>Auf einen Blick</h2>
      <dl>{fakten_html}</dl>
      <a class="knopf knopf--voll" href="{rel}termin.html?anliegen={l['slug']}">Termin anfragen</a>
      <a class="knopf knopf--hell knopf--voll" href="tel:{PRAXIS['phone_href']}">{PRAXIS['phone_display']}</a>
      <p class="klein">Telefonisch {heute_tel()}</p>
    </aside>
  </div>
  <section class="abschnitt" aria-labelledby="mehr">
    <h2 id="mehr">Passt auch dazu</h2>
    <ul class="karten karten--drei">{verwandt}</ul>
  </section>
</article>"""
    service = {"@context": "https://schema.org", "@type": "Service", "name": l["titel"],
               "description": l["lead"], "url": f"{BASE}/{path}", "provider": {"@id": f"{BASE}/#praxis"},
               "areaServed": "Ispringen", "category": k["titel"]}
    titel = f"{l['titel']}{ort} | Praxis Grosse"
    if len(titel) > 62:
        titel = f"{l['titel']}{ort}"
    desc = f"{l['lead']} Praxis Grosse, Bahnhofstraße 4, Ispringen. Termin: 07231 80799."
    write(path, layout(path, titel, desc, body, schemas=[service],
                       crumbs=[("Start", ""), ("Leistungen", "leistungen/"), (k["titel"], f"leistungen/{k['seite']}.html"), (l["titel"], path)]))


def seite_praxis():
    body = f"""<div class="wrap">
<header class="seitenkopf">
  <h1>Unsere Praxis in Ispringen</h1>
  <p class="lead">Das ganze Untergeschoss in der Bahnhofstraße 4: fünf Behandlungsräume, ein Trainingstherapieraum und ein Gerätetherapieraum. Weitere Behandlungsräume liegen im Buchenweg 37.</p>
</header>
<section class="abschnitt geteilt">
  <div>
    <h2>Therapie, Training, Prävention</h2>
    <p>Michaela Grosse hat ihre Praxis 1996 gegründet, seit 2007 ist sie in der Bahnhofstraße. Ihr Konzept: Wer zu uns zur Therapie kommt, soll danach fit bleiben können. Deshalb gibt es neben der klassischen Physiotherapie ergänzende Behandlungen und mit Gesundheits-PLUS Kurse und Gerätetraining.</p>
    <p>Die Räume sind hell und großzügig. In vier Behandlungsräumen steht ein Schlingentisch, im großen Trainingstherapieraum üben wir Gangschule, Gleichgewicht und Koordination.</p>
  </div>
  {img('empfang', 'Empfangstresen der Praxis Grosse, eine Mitarbeiterin begrüßt eine Patientin', '', 'rund')}
</section>
<section class="abschnitt">
  <h2>Ausstattung</h2>
  <ul class="liste-raster">
    <li>Technogym-Geräte und Kinesis-Stationen</li>
    <li>Zertifizierte Ausstattung für Krankengymnastik am Gerät</li>
    <li>Vier Schlingentische</li>
    <li>TRX, Kettlebells, Bosu, Sprossenwand</li>
    <li>Praxisauto und mobile Liege für Hausbesuche</li>
    <li>4 Parkplätze im Hof</li>
  </ul>
</section>
<section class="abschnitt galerie" aria-label="Bilder aus der Praxis">
  {img('functional-training', 'Trainingsraum mit Sprossenwand, TRX-Gurten und Kettlebells', '', 'rund', sizes='(min-width: 960px) 33vw, 100vw')}
  {img('kinesis', 'Gerätetherapieraum mit Kinesis-Station', '', 'rund', sizes='(min-width: 960px) 33vw, 100vw')}
  {img('schlingentisch', 'Behandlungsraum mit Schlingentisch', '', 'rund', sizes='(min-width: 960px) 33vw, 100vw')}
</section>
<section class="abschnitt geteilt">
  <div>
    <h2>Barrierearm</h2>
    <p>Die Praxis ist barrierearm, am Eingang gibt es nur eine kleine Stufe. Brauchen Sie dabei Hilfe, rufen Sie vor Ihrem Termin an – wir holen Sie am Eingang ab.</p>
    <a class="pfeil" href="kontakt.html">Anfahrt und Parken</a>
  </div>
  {img('eingang', 'Füße in Sportschuhen auf der Stufe am Praxiseingang', '', 'rund')}
</section>
</div>"""
    write("praxis.html", layout("praxis.html", "Die Praxis: Räume & Ausstattung | Praxis Grosse Ispringen",
                                "Physiotherapiepraxis in Ispringen mit fünf Behandlungsräumen, Trainings- und Gerätetherapieraum. Barrierearm, mit Parkplätzen im Hof.",
                                body, crumbs=[("Start", ""), ("Praxis", "praxis.html")]))


def seite_team():
    namen = "".join(f"<li>{tbd(n)}</li>" for n in TEAM)
    body = f"""<div class="wrap">
<header class="seitenkopf">
  <h1>Das Team der Praxis Grosse</h1>
  <p class="lead">16 Frauen zwischen Anfang 40 und Mitte 60: Physiotherapeutinnen, Trainerinnen und Kauffrauen. Erkennen werden Sie jede an ihrem Lachen.</p>
</header>
{img('team-gruppe', 'Gruppenbild des Teams in schwarzen Poloshirts vor dem Schriftzug „glücklich“', '', 'rund', sizes='100vw', eager=True, w=1024, h=683)}
<section class="abschnitt geteilt">
  <div>
    <h2>Michaela Grosse, Praxisinhaberin</h2>
    <p>Staatlich anerkannte Physiotherapeutin seit Anfang der 1990er Jahre, Ausbildung in Mannheim. 1996 eröffnete sie ihre Praxis in der Ispringer Schulstraße, 2007 folgte der Umzug in die Bahnhofstraße. Fortbildungen unter anderem in Bobath-Therapie, Fußreflexzonen-Therapie und Krankengymnastik am Gerät; 2014 Master of Science in Osteopathie an der Dresden International University.</p>
    <p>Das Startkapital für die Praxis gewann sie 1995 als Kandidatin der TV-Show „Das goldene Ei“ – eigentlich war sie nur als Zuschauerin mitgekommen.</p>
  </div>
  {img('team-duo', 'Zwei Teammitglieder stehen lachend nebeneinander, eine hält eine Yogamatte', '', 'rund', w=1024, h=683)}
</section>
<section class="abschnitt">
  <h2>Wer Sie behandelt und betreut</h2>
  <ul class="namen">{namen}</ul>
  <p>Am Telefon und am Empfang erreichen Sie Nicola Kunzmann, Tine Wild <mark class="tbd">im Teamverzeichnis ergänzen?</mark> und Stefanie Karcher.</p>
  <div class="platzhalter"><p><strong>Empfehlung:</strong> Einzelporträts mit Name, Rolle und 2–3 Schwerpunkten (z. B. „Kristin Saager – Schwindeltherapie, Manuelle Therapie“). Das hilft Patientinnen bei der Wahl und Google beim Verständnis der Fachkompetenz.</p></div>
</section>
<section class="abschnitt galerie" aria-label="Teamfotos">
  {img('team-trio-2', 'Drei Teammitglieder lachen gemeinsam', '', 'rund', sizes='(min-width: 960px) 33vw, 100vw', w=1024, h=683)}
  {img('team-trio-3', 'Drei Teammitglieder stehen Arm in Arm', '', 'rund', sizes='(min-width: 960px) 33vw, 100vw', w=1024, h=683)}
  {img('team-trio-4', 'Drei Teammitglieder vor dem roten Wandschriftzug', '', 'rund', sizes='(min-width: 960px) 33vw, 100vw', w=1024, h=683)}
</section>
<section class="abschnitt schmal">
  <h2>Was uns verbindet</h2>
  <p>Mehrere Therapeutinnen sind seit über 15 Jahren im Team. Zusammen bringen sie mehr als 35 Zusatzqualifikationen mit, regelmäßige Fortbildungen gehören dazu. Einmal pro Woche trainiert das Team gemeinsam mit Personal Trainerin Axana Bosch.</p>
  <p><a class="pfeil" href="karriere.html">Bei uns arbeiten</a></p>
</section>
</div>"""
    write("team.html", layout("team.html", "Team: 16 Therapeutinnen & Trainerinnen | Praxis Grosse Ispringen",
                              "Lernen Sie das Team der Praxis Grosse kennen: Physiotherapeutinnen, Trainerinnen und Praxisinhaberin Michaela Grosse, Osteopathin M.Sc.",
                              body, crumbs=[("Start", ""), ("Team", "team.html")]))


def seite_termin():
    optionen = "".join(f'<option value="{l["slug"]}">{E(l["titel"])}</option>' for l in LEISTUNGEN)
    body = f"""<div class="wrap">
<header class="seitenkopf">
  <h1>Termin vereinbaren</h1>
  <p class="lead">Am schnellsten geht es telefonisch. Oder Sie hinterlassen Ihre Nummer und wir rufen Sie zurück.</p>
</header>
<div class="geteilt geteilt--oben">
  <section aria-labelledby="tel-t">
    <h2 id="tel-t">Anrufen</h2>
    <p class="riesig"><a href="tel:{PRAXIS['phone_href']}">{PRAXIS['phone_display']}</a></p>
    <p class="hinweis" data-status-text>Telefonisch erreichbar {heute_tel()}.</p>
    <p><mark class="tbd">Telefonzeiten vereinheitlichen: Die alte Website nennt an einer Stelle 8–18 Uhr, an anderer Stelle Mo/Fr 8–17 und Di–Do 8–19 Uhr.</mark></p>
    {rezeptkarte('')}
  </section>
  <section aria-labelledby="form-t">
    <h2 id="form-t">Rückruf anfragen</h2>
    <form class="formular" data-formular action="#" method="post" novalidate>
      <p class="klein">Pflichtfelder sind mit * markiert. Bitte schreiben Sie keine ausführlichen Gesundheitsangaben – die besprechen wir am Telefon.</p>
      <label for="f-name">Name *</label>
      <input id="f-name" name="name" autocomplete="name" required>
      <label for="f-tel">Telefonnummer *</label>
      <input id="f-tel" name="telefon" type="tel" autocomplete="tel" inputmode="tel" required>
      <label for="f-art">Worum geht es? *</label>
      <select id="f-art" name="art" required>
        <option value="">Bitte wählen</option>
        <option>Ich habe ein Rezept</option>
        <option>Hausbesuch mit Rezept</option>
        <option>Selbstzahler-Behandlung</option>
        <option>Kurs oder Training</option>
        <option>Etwas anderes</option>
      </select>
      <label for="f-leistung">Leistung (optional)</label>
      <select id="f-leistung" name="leistung"><option value="">Weiß ich noch nicht</option>{optionen}</select>
      <fieldset>
        <legend>Wann können wir Sie am besten erreichen?</legend>
        <label class="wahl"><input type="checkbox" name="zeit" value="vormittags"> vormittags</label>
        <label class="wahl"><input type="checkbox" name="zeit" value="mittags"> mittags</label>
        <label class="wahl"><input type="checkbox" name="zeit" value="nachmittags"> nachmittags</label>
      </fieldset>
      <label class="wahl"><input type="checkbox" name="einwilligung" required> <span>Ich bin einverstanden, dass die Praxis meine Angaben zur Bearbeitung meiner Anfrage verwendet. Details in der <a href="datenschutz.html">Datenschutzerklärung</a>. *</span></label>
      <button class="knopf" type="submit">Rückruf anfragen</button>
      <p class="formular__meldung" data-meldung role="status" aria-live="polite"></p>
    </form>
  </section>
</div>
</div>"""
    write("termin.html", layout("termin.html", "Termin vereinbaren | Praxis Grosse Ispringen – 07231 80799",
                                "Termin bei der Praxis Grosse in Ispringen vereinbaren: telefonisch unter 07231 80799 oder per Rückrufanfrage online.",
                                body, crumbs=[("Start", ""), ("Termin", "termin.html")]))


def seite_kontakt():
    body = f"""<div class="wrap">
<header class="seitenkopf">
  <h1>Kontakt und Anfahrt</h1>
  <p class="lead">Praxis Grosse, {PRAXIS['street']}, {PRAXIS['zip']} {PRAXIS['city']} – direkt am Bahnhof Ispringen.</p>
</header>
<div class="geteilt geteilt--oben">
  <section>
    <h2>So erreichen Sie uns</h2>
    <address class="adresse">
      Praxis Michaela Grosse<br>Praxis für Physiotherapie und Osteopathie<br>
      {PRAXIS['street']}<br>{PRAXIS['zip']} {PRAXIS['city']}<br><br>
      Telefon <a href="tel:{PRAXIS['phone_href']}">{PRAXIS['phone_display']}</a><br>
      Fax {PRAXIS['fax_display']}<br>
      E-Mail {tbd(PRAXIS['email'])}
    </address>
    {zeiten_tabelle()}
    <p class="klein">Telefonisch erreichbar {heute_tel()} <mark class="tbd">bitte bestätigen</mark>. Feiertage: <mark class="tbd">ergänzen</mark></p>
  </section>
  <section>
    <h2>Karte</h2>
    {karte_karte()}
  </section>
</div>
<div class="geteilt abschnitt">
  <section>
    <h2>Mit dem Auto</h2>
    <ul>
      <li><strong>4 Praxisparkplätze</strong> im Hof hinter dem Haus – Einfahrt rechts neben dem Praxiseingang</li>
      <li>Gegenüber dem Blumenladen, max. 30 Minuten</li>
      <li>Bahnhofstraße mit Parkscheibe, 1–2 Stunden</li>
      <li>Eisenbahnstraße, ohne Zeitbegrenzung</li>
    </ul>
  </section>
  <section>
    <h2>Mit Bus und Bahn</h2>
    <p>Haltestelle <strong>Ispringen Bahnhof</strong>. Fahrpläne beim <a href="https://www.vpe.de" rel="noopener">Verkehrsverbund Pforzheim-Enzkreis (VPE)</a> und beim <a href="https://www.kvv.de" rel="noopener">Karlsruher Verkehrsverbund (KVV)</a>.</p>
  </section>
</div>
</div>"""
    write("kontakt.html", layout("kontakt.html", "Kontakt, Anfahrt & Öffnungszeiten | Praxis Grosse Ispringen",
                                 "Praxis Grosse, Bahnhofstraße 4, 75228 Ispringen. Öffnungszeiten Mo–Fr ab 7 Uhr, Parkplätze im Hof, Haltestelle Ispringen Bahnhof. Tel. 07231 80799.",
                                 body, crumbs=[("Start", ""), ("Kontakt", "kontakt.html")]))


def seite_fragen():
    body = f"""<div class="wrap schmal">
<header class="seitenkopf">
  <h1>Häufige Fragen zur Physiotherapie</h1>
  <p class="lead">Rezept, Zuzahlung, erster Termin, Parken: die Antworten auf das, was wir am Telefon am häufigsten gefragt werden.</p>
</header>
{faq_block(FAQ, open_first=True)}
<p class="klein">Stand der gesetzlichen Angaben: Heilmittel-Richtlinie des G-BA und SGB V. <mark class="tbd">Vor Livegang fachlich prüfen</mark></p>
<p><a class="knopf" href="termin.html">Termin anfragen</a></p>
</div>"""
    write("fragen.html", layout("fragen.html", "Häufige Fragen: Rezept, Zuzahlung, Termin | Praxis Grosse",
                                "Brauche ich ein Rezept? Was kostet die Zuzahlung? Was bringe ich mit? Antworten auf häufige Fragen zur Physiotherapie in der Praxis Grosse, Ispringen.",
                                body, schemas=[schema_faq(FAQ)], crumbs=[("Start", ""), ("Häufige Fragen", "fragen.html")]))


def seite_karriere():
    body = f"""<div class="wrap">
<header class="seitenkopf">
  <h1>Arbeiten in der Praxis Grosse</h1>
  <p class="lead">Ein Team, in dem viele seit über 15 Jahren bleiben. Wir suchen Verstärkung, die das genauso machen möchte.</p>
</header>
<div class="geteilt geteilt--oben">
  <section>
    <h2>Offene Stellen</h2>
    <div class="platzhalter"><p><strong>Platzhalter:</strong> aktuelle Stellen mit Umfang, Startdatum und Ansprechpartnerin eintragen, z. B. „Physiotherapeut*in (m/w/d), Teil- oder Vollzeit“. Für Google for Jobs je Stelle Schema.org-Markup „JobPosting“ ergänzen.</p></div>
    <h2>Was Sie bei uns erwartet</h2>
    <ul>
      <li>Ein festes, herzliches Team mit langer Betriebszugehörigkeit</li>
      <li>Regelmäßige interne und externe Fortbildungen</li>
      <li>Wöchentliches Teamtraining mit Personal Trainerin</li>
      <li>Große, helle Räume und moderne Geräte</li>
      <li>Betriebsausflug und Weihnachtsfeier</li>
      <li><mark class="tbd">Gehalt, Arbeitszeiten, Fortbildungsbudget ergänzen</mark></li>
    </ul>
    <p>Bewerbung an {tbd(PRAXIS['email'])} oder einfach anrufen: <a href="tel:{PRAXIS['phone_href']}">{PRAXIS['phone_display']}</a>.</p>
  </section>
  {img('team-trio-5', 'Drei Teammitglieder lachen vor dem Wandschriftzug', '', 'rund', w=1024, h=683)}
</div>
</div>"""
    write("karriere.html", layout("karriere.html", "Jobs: Physiotherapeut*in in Ispringen | Praxis Grosse",
                                  "Physiotherapeut*in gesucht: Arbeiten im langjährigen Team der Praxis Grosse in Ispringen bei Pforzheim. Fortbildungen, Teamtraining, moderne Räume.",
                                  body, crumbs=[("Start", ""), ("Karriere", "karriere.html")]))


def seite_impressum():
    body = f"""<div class="wrap schmal recht">
<h1>Impressum</h1>
<div class="platzhalter"><p><strong>Vor Livegang rechtlich prüfen lassen.</strong> Gegenüber dem alten Impressum angepasst: Verweise auf das TMG durch das Digitale-Dienste-Gesetz (DDG) ersetzt; den Hinweis auf die EU-Plattform zur Online-Streitbeilegung entfernt, weil die Plattform 2025 eingestellt wurde. Offene Punkte sind gelb markiert.</p></div>
<h2>Angaben gemäß § 5 DDG</h2>
<p>Praxis Michaela Grosse<br>Praxis für Physiotherapie und Osteopathie<br>{PRAXIS['street']}<br>{PRAXIS['zip']} {PRAXIS['city']}</p>
<h2>Kontakt</h2>
<p>Telefon {PRAXIS['phone_display']}<br>Fax {PRAXIS['fax_display']}<br>E-Mail {tbd(PRAXIS['email'])}</p>
<h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
<p>Berufsbezeichnung: Physiotherapeutin, verliehen in Deutschland <mark class="tbd">altes Impressum: „Staatl. geprüfter Physiotherapeut“ – korrigieren</mark></p>
<p>Berufsrechtliche Regelung: Gesetz über die Berufe in der Physiotherapie (Masseur- und Physiotherapeutengesetz – MPhG), einsehbar unter <a href="https://www.gesetze-im-internet.de/mphg/">gesetze-im-internet.de/mphg</a>.</p>
<p><mark class="tbd">Altes Impressum nennt „Zuständige Kammer: Stuttgart“ – für Physiotherapeutinnen gibt es keine Kammer; klären und ggf. die zuständige Aufsichtsbehörde (Gesundheitsamt) angeben.</mark></p>
<p><mark class="tbd">Osteopathie: Rechtsgrundlage der Ausübung (z. B. Heilpraktikererlaubnis, sektoral oder voll) und zuständige Behörde angeben.</mark></p>
<h2>Steuernummer</h2>
<p>Finanzamt Pforzheim, Steuernummer 41069/57706</p>
<h2>Berufshaftpflichtversicherung</h2>
<p>SV SparkassenVersicherung, SV Generalagentur Vogel, Jöhlinger Straße 59, 76327 Pfinztal. Geltungsbereich: Deutschland.</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir nehmen an Streitbeilegungsverfahren vor der Universalschlichtungsstelle des Zentrums für Schlichtung e.&nbsp;V., Straßburger Straße 8, 77694 Kehl am Rhein, teil (<a href="https://www.verbraucher-schlichter.de">verbraucher-schlichter.de</a>). <mark class="tbd">Teilnahme bestätigen</mark></p>
<h2>Hinweis zum Heilmittelwerbegesetz</h2>
<p>Wir geben bei keiner Therapieform ein Heilungsversprechen und garantieren keine Linderung von Beschwerden.</p>
<h2>Verantwortlich für den Inhalt</h2>
<p>Michaela Grosse, Anschrift wie oben</p>
<h2>Bildnachweis</h2>
<p><mark class="tbd">Fotograf*in ergänzen</mark></p>
</div>"""
    write("impressum.html", layout("impressum.html", "Impressum | Praxis Grosse", "Impressum der Praxis Michaela Grosse, Praxis für Physiotherapie und Osteopathie in Ispringen.",
                                   body, crumbs=[("Start", ""), ("Impressum", "impressum.html")], robots="noindex, follow"))


def seite_datenschutz():
    body = """<div class="wrap schmal recht">
<h1>Datenschutzerklärung</h1>
<div class="platzhalter"><p><strong>Platzhalter.</strong> Die bestehende Datenschutzerklärung muss an die neue Website angepasst werden. Gegenüber der alten Seite entfallen: WordPress-Plugins, Cookie-Banner-Dienst, Kommentarfunktion, Gravatar. Neu bzw. weiterhin zu beschreiben:</p>
<ul>
<li>Verantwortliche Stelle und Kontakt</li>
<li>Hosting und Server-Logfiles (Anbieter, Speicherdauer, Auftragsverarbeitungsvertrag)</li>
<li>Rückruf-Formular: Zweck, Rechtsgrundlage, Speicherdauer, Hinweis auf verschlüsselte Übertragung. Gesundheitsdaten nach Art. 9 DSGVO nur mit ausdrücklicher Einwilligung – deshalb fragt das Formular keine Beschwerden ab.</li>
<li>Google Maps: wird erst nach Klick auf „Karte laden“ eingebunden</li>
<li>Schriften: lokal eingebunden, keine Übertragung an Google</li>
<li>Kein Tracking. Falls später Statistik gewünscht: cookielose Lösung (z. B. Matomo ohne Cookies) beschreiben</li>
<li>Rechte der Betroffenen, Beschwerderecht beim Landesbeauftragten für Datenschutz Baden-Württemberg</li>
</ul></div>
</div>"""
    write("datenschutz.html", layout("datenschutz.html", "Datenschutz | Praxis Grosse", "Datenschutzerklärung der Praxis Grosse in Ispringen.",
                                     body, crumbs=[("Start", ""), ("Datenschutz", "datenschutz.html")], robots="noindex, follow"))


def seite_404():
    body = """<div class="wrap schmal fehlt">
<h1>Diese Seite gibt es nicht (mehr)</h1>
<p class="lead">Vielleicht haben Sie einen alten Link aufgerufen. Hier geht es weiter:</p>
<ul class="liste-raster">
<li><a href="/leistungen/index.html">Alle Leistungen</a></li>
<li><a href="/termin.html">Termin vereinbaren</a></li>
<li><a href="/kontakt.html">Kontakt und Anfahrt</a></li>
<li><a href="/index.html">Zur Startseite</a></li>
</ul>
</div>"""
    write("404.html", layout("404.html", "Seite nicht gefunden | Praxis Grosse", "Diese Seite wurde nicht gefunden.", body, robots="noindex"))


# ------------------------------------------------------------------ Technik

def technik():
    seiten = (["", "leistungen/", "praxis.html", "team.html", "termin.html", "kontakt.html", "fragen.html", "karriere.html"]
              + [f"leistungen/{k['seite']}.html" for k in KATEGORIEN.values()]
              + [f"leistungen/{l['slug']}.html" for l in LEISTUNGEN])
    urls = "\n".join(f"  <url><loc>{BASE}/{s}</loc></url>" for s in seiten)
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n')
    write("robots.txt", ("User-agent: *\nDisallow: /\n" if KONZEPT else "User-agent: *\nAllow: /\n")
          + f"\nSitemap: {BASE}/sitemap.xml\n")

    # 301-Weiterleitungen der alten WordPress-URLs, damit Rankings und Links erhalten bleiben
    alt = {
        "angebot/?": "/leistungen/",
        "klassisches-ta/?": "/leistungen/physiotherapie.html",
        "tp-ergaenzungsangebot/?": "/leistungen/ergaenzende-behandlungen.html",
        "gesundheits-plus/?": "/leistungen/kurse-training.html",
        "angebot/(klassisches-ta|tp-ergaenzungsangebot|gesundheits-plus)/?": "/leistungen/",
        "praxis/?": "/praxis.html",
        "team/?": "/team.html",
        "kontakt/?": "/kontakt.html",
        "terminvereinbarung/?": "/termin.html",
        "impressum/?": "/impressum.html",
        "datenschutz/?": "/datenschutz.html",
        "author/.*": "/",
        "feed/?.*": "/",
        "comments/feed/?": "/",
    }
    regeln = []
    for l in LEISTUNGEN:
        if l["slug"] == "osteopathie":
            continue
        pfad = f"angebot/klassisches-ta/{l['slug']}" if l["kat"] == "therapie" else f"angebot/{l['slug']}"
        regeln.append(f"RewriteRule ^{pfad}/?$ /leistungen/{l['slug']}.html [R=301,L]")
    for a, z in alt.items():
        regeln.append(f"RewriteRule ^{a}$ {z} [R=301,L]")
    write(".htaccess", f"""# Praxis Grosse – Apache-Konfiguration für die statische Website
ErrorDocument 404 /404.html

RewriteEngine On
# Nur eine Adresse: https ohne www, Testumgebung neu. leitet auf die Hauptdomain
RewriteCond %{{HTTPS}} off [OR]
RewriteCond %{{HTTP_HOST}} ^(www|neu)\\. [NC]
RewriteRule ^ https://physio-grosse.de%{{REQUEST_URI}} [R=301,L]

# Alte WordPress-Adressen
RewriteCond %{{QUERY_STRING}} oceanwp_library [OR]
RewriteCond %{{QUERY_STRING}} ^p=\\d+
RewriteRule ^ /? [R=301,L]
RewriteRule ^(wp-admin|wp-login\\.php|xmlrpc\\.php|wp-json)(/.*)?$ - [G,L]
{chr(10).join(regeln)}

# Caching: HTML kurz, Dateien mit festem Namen lange
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 10 minutes"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml
</IfModule>

# Sicherheits-Header
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Content-Security-Policy "default-src 'self'; img-src 'self' data:; frame-src https://maps.google.com https://www.google.com; script-src 'self'; style-src 'self'; font-src 'self'; form-action 'self'; base-uri 'self'; frame-ancestors 'self'"
</IfModule>
""")


def favicon():
    write("assets/img/favicon.svg", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#C1223A"/><text x="16" y="22.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="15" fill="#fff">PG</text></svg>')


def main():
    seite_start()
    seite_leistungen()
    for l in LEISTUNGEN:
        seite_leistung(l)
    seite_praxis()
    seite_team()
    seite_termin()
    seite_kontakt()
    seite_fragen()
    seite_karriere()
    seite_impressum()
    seite_datenschutz()
    seite_404()
    technik()
    favicon()
    print(f"{len(list(SITE.rglob('*.html')))} HTML-Seiten erzeugt in {SITE}")


if __name__ == "__main__":
    main()
