import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Websites, SEO, Online-Marketing und Wartung – die Leistungen von LuMa Digital im Überblick.",
};

const groups = [
  {
    n: "01",
    title: "Websites",
    lead: "Individuell gestaltet, technisch sauber umgesetzt, schnell online.",
    items: [
      "Onepager für Selbstständige & kleine Betriebe",
      "Business-Websites mit mehreren Unterseiten",
      "Onlineshops mit Zahlungsanbindung",
      "Landingpages für Kampagnen und Produkte",
    ],
  },
  {
    n: "02",
    title: "SEO",
    lead: "Damit Ihre Website nicht nur existiert, sondern gefunden wird.",
    items: [
      "Lokale SEO & Google Business Profil",
      "Technisches SEO (Ladezeit, Struktur, Indexierung)",
      "Onpage-Optimierung bestehender Inhalte",
      "Content-Empfehlungen für relevante Suchbegriffe",
    ],
  },
  {
    n: "03",
    title: "Online-Marketing",
    lead: "Zielgerichtete Kampagnen statt Streuverlust.",
    items: [
      "Google Ads (Search & lokale Kampagnen)",
      "Social-Media-Ads für Meta & Instagram",
      "Kampagnen-Tracking & Reporting",
      "Beratung zu Budget & Zielgruppe",
    ],
  },
  {
    n: "04",
    title: "Wartung & Support",
    lead: "Eine Website ist nie wirklich fertig – wir bleiben dran.",
    items: [
      "Hosting & technische Betreuung",
      "Regelmäßige Updates & Sicherheits-Checks",
      "Inhaltliche Änderungen auf Zuruf",
      "Ein fester Ansprechpartner, keine Ticket-Warteschlange",
    ],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <Eyebrow>Leistungen</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Website, SEO und Marketing – ohne drei Dienstleister jonglieren zu müssen
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-soft">
            Alles, was Ihr Unternehmen online sichtbar und erfolgreich macht,
            kommt bei uns aus einer Hand — koordiniert, konsistent und fair
            kalkuliert.
          </p>
        </Container>
      </section>

      {groups.map((g, i) => (
        <section key={g.n} className={i % 2 === 1 ? "border-b border-line bg-vellum-raised/60" : "border-b border-line"}>
          <Container className="grid gap-10 py-16 md:grid-cols-[auto_1fr] md:gap-16">
            <div className="font-mono text-sm text-steel">{g.n}</div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                {g.title}
              </h2>
              <p className="mt-3 max-w-lg font-sans text-ink-soft">{g.lead}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-3 border-l-2 border-steel/40 pl-4 font-sans text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Welche Leistungen passen zu Ihrem Vorhaben?
          </h2>
          <Button href="/kontakt" variant="primary" className="bg-signal text-vellum hover:bg-vellum hover:text-ink">
            Kostenlos beraten lassen
          </Button>
        </Container>
      </section>
    </>
  );
}
