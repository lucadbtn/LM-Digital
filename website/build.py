#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Baut die statischen HTML-Seiten der Praxis-Grosse-Website aus
Kopf-/Fuß-Vorlage + Seiteninhalt (content/*.html).
Ausgabe: fertige, eigenständige .html-Dateien im Projektordner
(kein Build-Schritt beim Hosting-Anbieter nötig).

Aufruf:  python3 build.py
"""
import os, re, json

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.join(ROOT, "content")

SITE_NAME = "Praxis Grosse"
BASE_URL = "https://physio-grosse.de"  # Zieldomain (unveraendert)
PHONE_DISPLAY = "07231 / 807 99"
PHONE_TEL = "+4972318079 9".replace(" ", "")
FAX = "07231 / 42 59 266"
EMAIL = "praxis.grosse@web.de"
ADDR_STREET = "Bahnhofstraße 4"
ADDR_CITY = "75228 Ispringen"

NAV = [
    ("index.html", "Start"),
    ("praxis.html", "Praxis"),
    ("team.html", "Team"),
    ("DROPDOWN_ANGEBOT", "Unser Angebot"),
    ("kontakt.html", "Kontakt"),
]

ANGEBOT_DROPDOWN = [
    ("angebot.html", "Übersicht Angebot"),
    ("therapie.html", "Therapie (Rezept)"),
    ("training-praevention.html", "Training & Prävention"),
]

ARC_ICON = """<svg class="pillar-arc" viewBox="0 0 52 52" fill="none" aria-hidden="true">
<path d="M6 40 A28 28 0 0 1 46 40" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="6" cy="40" r="2.6" fill="currentColor"/><circle cx="46" cy="40" r="2.6" fill="currentColor"/>
</svg>"""

CHEVRON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
PHONE_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
MAIL_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18v12H3V6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m3 7 9 6 9-6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
PIN_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>'
CLOCK_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3.3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
MENU_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'
FB_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.6c0-.3.3-.6.6-.6H14Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>'

def brand_mark():
    return """<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
<circle cx="20" cy="20" r="19" stroke="var(--red)" stroke-width="1.4"/>
<path d="M11 28c2-10 6-16 9-16s7 6 9 16" stroke="var(--red)" stroke-width="2.1" stroke-linecap="round"/>
<circle cx="11" cy="28" r="1.8" fill="var(--red)"/><circle cx="29" cy="28" r="1.8" fill="var(--red)"/>
</svg>"""

def header(active):
    items = []
    for href, label in NAV:
        if href == "DROPDOWN_ANGEBOT":
            sub = "".join(f'<li><a href="{h}">{l}</a></li>' for h, l in ANGEBOT_DROPDOWN)
            cur = ' aria-expanded="false"'
            items.append(f'''<li class="has-dropdown">
              <button class="dropdown-toggle" type="button"{cur}>Unser Angebot {CHEVRON}</button>
              <ul class="dropdown">{sub}</ul>
            </li>''')
        else:
            cur = ' aria-current="page"' if href == active else ''
            items.append(f'<li><a href="{href}"{cur}>{label}</a></li>')
    nav_items = "\n".join(items)
    return f"""<a class="skip-link" href="#main">Zum Inhalt springen</a>
<header class="site-header">
  <div class="container">
    <a class="brand" href="index.html">
      {brand_mark()}
      <span class="brand-word">Praxis Grosse<span>Physiotherapie &amp; Osteopathie · Ispringen</span></span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Hauptnavigation">
      <ul>
        {nav_items}
      </ul>
    </nav>
    <div class="header-cta">
      <a class="btn btn-ghost btn-sm" href="tel:{PHONE_TEL}">{PHONE_ICON} Anrufen</a>
      <a class="btn btn-primary btn-sm" href="termin.html">Termin anfragen</a>
      <button class="nav-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="site-nav">{MENU_ICON}</button>
    </div>
  </div>
</header>
<div class="nav-scrim"></div>
<div class="mobile-callbar">
  <div class="row">
    <a href="tel:{PHONE_TEL}">{PHONE_ICON} Anrufen</a>
    <a href="termin.html">{CLOCK_ICON} Termin anfragen</a>
  </div>
</div>"""

def footer():
    return f"""<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        {brand_mark()}
        <div class="brand-word" style="margin-top:.6rem;">Praxis Grosse</div>
        <p>Physiotherapie &amp; Osteopathie in Ispringen — Therapie, Training und Prävention unter einem Dach. Seit 1996.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/praxis.michaelagrosse/" target="_blank" rel="noopener" aria-label="Praxis Grosse auf Facebook (öffnet in neuem Tab)">{FB_ICON}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="praxis.html">Die Praxis</a></li>
          <li><a href="team.html">Unser Team</a></li>
          <li><a href="angebot.html">Unser Angebot</a></li>
          <li><a href="therapie.html">Therapie (Rezept)</a></li>
          <li><a href="training-praevention.html">Training &amp; Prävention</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <ul>
          <li><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></li>
          <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li><a href="kontakt.html">Anfahrt &amp; Lageplan</a></li>
          <li><a href="termin.html">Termin anfragen</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Öffnungszeiten</h4>
        <ul class="footer-hours">
          <li><span>Mo</span><span>07:00&ndash;20:30</span></li>
          <li><span>Di</span><span>07:30&ndash;19:00</span></li>
          <li><span>Mi</span><span>07:30&ndash;20:00</span></li>
          <li><span>Do</span><span>08:00&ndash;19:00</span></li>
          <li><span>Fr</span><span>07:00&ndash;18:00</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year></span> Praxis Michaela Grosse</span>
      <div class="footer-legal-links">
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
        <a href="kontakt.html">Kontakt</a>
      </div>
    </div>
  </div>
</footer>"""

PAGE_META = {
    "index.html": dict(
        title="Physiotherapie & Osteopathie in Ispringen",
        desc="Praxis Grosse in Ispringen bei Pforzheim: Physiotherapie, Osteopathie, Training und Prävention mit 16 Therapeutinnen. Termine unter 07231 / 807 99.",
    ),
    "praxis.html": dict(
        title="Die Praxis in der Bahnhofstraße",
        desc="Fünf Behandlungsräume, ein Trainingstherapieraum und ein Gerätetherapieraum in Ispringen. Lernen Sie die Räume und das Konzept der Praxis Grosse kennen.",
    ),
    "team.html": dict(
        title="Unser Team — 16 Therapeutinnen in Ispringen",
        desc="Von Michaela Grosses Praxisgründung 1996 bis heute: Lernen Sie das 16-köpfige Team der Praxis Grosse und seine Spezialisierungen kennen.",
    ),
    "angebot.html": dict(
        title="Unser Angebot im Überblick",
        desc="Therapie auf Rezept, Trainingskurse und Prävention: der komplette Überblick über alle Leistungen der Praxis Grosse in Ispringen.",
    ),
    "therapie.html": dict(
        title="Therapie auf Rezept — Klassisches Therapieangebot",
        desc="Manuelle Therapie, Krankengymnastik, Lymphdrainage und mehr: alle ärztlich verordnungsfähigen Therapien der Praxis Grosse in Ispringen im Überblick.",
    ),
    "training-praevention.html": dict(
        title="Training & Prävention — Gesundheits-PLUS",
        desc="Pilates, Yoga, Seniorenfit, Personal Training und mehr: alle Kurse und Zusatzangebote der Praxis Grosse für Training und Prävention in Ispringen.",
    ),
    "kontakt.html": dict(
        title="Kontakt & Anfahrt",
        desc="Praxis Grosse, Bahnhofstraße 4, 75228 Ispringen. Telefon 07231 / 807 99. Öffnungszeiten, Anfahrt und Parkmöglichkeiten auf einen Blick.",
    ),
    "termin.html": dict(
        title="Termin anfragen",
        desc="So vereinbaren Sie einen Termin in der Praxis Grosse: telefonische Erreichbarkeit, Terminanfrage-Formular und Hinweise zum Rezept.",
    ),
    "impressum.html": dict(
        title="Impressum",
        desc="Impressum der Praxis Michaela Grosse, Bahnhofstraße 4, 75228 Ispringen — Angaben gemäß § 5 DDG.",
    ),
    "datenschutz.html": dict(
        title="Datenschutzerklärung",
        desc="Datenschutzerklärung der Praxis Michaela Grosse: Informationen zur Verarbeitung personenbezogener Daten auf physio-grosse.de.",
    ),
}

JSONLD = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PhysicalTherapy",
  "name": "Praxis Grosse – Physiotherapie und Osteopathie",
  "image": "https://physio-grosse.de/assets/img/praxis/hero-shoes.jpg",
  "url": "https://physio-grosse.de/",
  "telephone": "+4972318079 9",
  "email": "praxis.grosse@web.de",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bahnhofstraße 4",
    "addressLocality": "Ispringen",
    "postalCode": "75228",
    "addressRegion": "Baden-Württemberg",
    "addressCountry": "DE"
  },
  "openingHoursSpecification": [
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"07:00","closes":"20:30"},
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"07:30","closes":"19:00"},
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"07:30","closes":"20:00"},
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"08:00","closes":"19:00"},
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"07:00","closes":"18:00"}
  ],
  "sameAs": ["https://www.facebook.com/praxis.michaelagrosse/"]
}
</script>"""

TEMPLATE = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | Praxis Grosse Ispringen</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{base}/{path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Praxis Grosse">
<meta property="og:title" content="{title} | Praxis Grosse Ispringen">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{base}/{path}">
<meta property="og:image" content="{base}/assets/img/praxis/hero-shoes.jpg">
<meta property="og:locale" content="de_DE">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/style.css">
{jsonld}
</head>
<body>
{header}
<main id="main">
{content}
</main>
{footer}
<script src="assets/js/main.js" defer></script>
<script>document.querySelectorAll('[data-year]').forEach(function(e){{e.textContent=new Date().getFullYear();}});</script>
</body>
</html>
"""

ICON_TOKENS = {
    "{PHONE_ICON_PLACEHOLDER}": PHONE_ICON,
    "{PIN_PLACEHOLDER}": PIN_ICON,
    "{MAIL_PLACEHOLDER}": MAIL_ICON,
    "{CLOCK_PLACEHOLDER}": CLOCK_ICON,
    "{PLUS}": PLUS_ICON,
    "{ARROW}": ARROW,
    "{CHEVRON}": CHEVRON,
}

def inject_icons(content):
    for token, svg in ICON_TOKENS.items():
        content = content.replace(token, svg)
    return content

def build():
    for fname, meta in PAGE_META.items():
        frag_path = os.path.join(CONTENT, fname)
        if not os.path.exists(frag_path):
            print("FEHLT:", frag_path); continue
        with open(frag_path, encoding="utf-8") as f:
            content = f.read()
        content = inject_icons(content)
        html = TEMPLATE.format(
            title=meta["title"], desc=meta["desc"], base=BASE_URL, path=fname,
            jsonld=JSONLD if fname == "index.html" else "",
            header=header(fname), content=content, footer=footer(),
        )
        out_path = os.path.join(ROOT, fname)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print("gebaut:", fname)

if __name__ == "__main__":
    build()
