import type { Metadata } from "next";
import { Container, Eyebrow, Button, CornerTicks } from "@/components/ui";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Transparente Festpreise für Websites, SEO und Online-Marketing von LuMa Digital.",
};

const tiers = [
  {
    name: "Starter",
    price: "990 €",
    unit: "einmalig",
    desc: "Für Selbstständige und kleine Betriebe, die eine professionelle Visitenkarte im Netz brauchen.",
    features: [
      "Onepager mit bis zu 5 Abschnitten",
      "Responsives Design für alle Geräte",
      "Kontaktformular",
      "Google Business Profil Einrichtung",
      "Basis-SEO (Struktur & Ladezeit)",
    ],
  },
  {
    name: "Business",
    price: "2.490 €",
    unit: "einmalig",
    desc: "Für Unternehmen mit mehreren Leistungen, Standorten oder einem wachsenden Angebot.",
    features: [
      "Bis zu 5 Unterseiten",
      "Individuelles Design nach Ihrer Marke",
      "Erweitertes On-Page-SEO",
      "Blog- bzw. News-Bereich",
      "Anbindung an Google Analytics",
      "60 Minuten Einweisung ins CMS",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "ab 4.990 €",
    unit: "individuell",
    desc: "Für Unternehmen mit Onlineshop, individuellen Funktionen oder mehreren Sprachen.",
    features: [
      "Unbegrenzte Unterseiten",
      "Onlineshop oder individuelle Funktionen",
      "Mehrsprachigkeit möglich",
      "Vollständiges SEO-Setup",
      "Priorisierte Umsetzung",
    ],
  },
];

const addons = [
  { name: "SEO-Betreuung", price: "ab 199 €/Monat", desc: "Laufende Optimierung, Reporting und Content-Empfehlungen." },
  { name: "Online-Marketing", price: "ab 349 €/Monat", desc: "Google & Social Ads, inkl. Kampagnenmanagement (zzgl. Werbebudget)." },
  { name: "Wartungspaket", price: "ab 39 €/Monat", desc: "Hosting, Updates, Backups und kleine Änderungen." },
];

export default function PreisePage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <Eyebrow>Preise</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Feste Pakete. Keine Überraschungen.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-soft">
            Sie wissen vor Projektstart genau, was Sie zahlen. Alle Preise
            verstehen sich zzgl. gesetzlicher MwSt.; das passende Paket
            besprechen wir im kostenlosen Erstgespräch.
          </p>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col border p-8 ${
                  tier.highlight ? "border-ink bg-ink text-vellum" : "border-line"
                }`}
              >
                {tier.highlight && <CornerTicks dark />}
                <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
                  {tier.name}
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold">{tier.price}</span>
                  <span className="font-mono text-xs opacity-60">{tier.unit}</span>
                </div>
                <p
                  className={`mt-4 font-sans text-sm leading-relaxed ${
                    tier.highlight ? "text-vellum/75" : "text-ink-soft"
                  }`}
                >
                  {tier.desc}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`border-l-2 pl-3 font-sans text-sm ${
                        tier.highlight ? "border-signal" : "border-steel/40"
                      }`}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/kontakt"
                  variant={tier.highlight ? "primary" : "secondary"}
                  className={`mt-8 ${tier.highlight ? "bg-signal hover:bg-vellum hover:text-ink" : ""}`}
                >
                  Anfragen
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-vellum-raised/60">
        <Container className="py-16">
          <Eyebrow>Laufende Betreuung</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Optionale Add-ons
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {addons.map((a) => (
              <div key={a.name} className="border border-line bg-vellum p-6">
                <h3 className="font-display text-lg font-bold text-ink">{a.name}</h3>
                <div className="mt-1 font-mono text-sm text-steel">{a.price}</div>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-sans text-xs text-ink-soft">
            Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.
            Der endgültige Umfang und Preis richtet sich nach Ihren
            individuellen Anforderungen und wird im Angebot festgehalten.
          </p>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Nicht sicher, welches Paket passt?
          </h2>
          <Button href="/kontakt" variant="primary" className="bg-signal text-vellum hover:bg-vellum hover:text-ink">
            Kostenlos beraten lassen
          </Button>
        </Container>
      </section>
    </>
  );
}
