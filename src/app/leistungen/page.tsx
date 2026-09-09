import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Websites, SEO, Online-Marketing und Wartung: die Leistungen von LuMa Digital im Überblick.",
};

const groups = [
  {
    title: "Websites",
    lead: "Individuell gestaltet, technisch sauber umgesetzt, schnell online.",
    items: [
      "Onepager für Selbstständige und kleine Betriebe",
      "Business-Websites mit mehreren Unterseiten",
      "Onlineshops mit Zahlungsanbindung",
      "Landingpages für Kampagnen und Produkte",
    ],
  },
  {
    title: "SEO",
    lead: "Damit Ihre Website nicht nur existiert, sondern gefunden wird.",
    items: [
      "Lokale SEO und Google Business Profil",
      "Technisches SEO für Ladezeit, Struktur und Indexierung",
      "Onpage-Optimierung bestehender Inhalte",
      "Content-Empfehlungen für relevante Suchbegriffe",
    ],
  },
  {
    title: "Online-Marketing",
    lead: "Zielgerichtete Kampagnen statt Streuverlust.",
    items: [
      "Google Ads für Search und lokale Kampagnen",
      "Social-Media-Ads für Meta und Instagram",
      "Kampagnen-Tracking und Reporting",
      "Beratung zu Budget und Zielgruppe",
    ],
  },
  {
    title: "Wartung & Support",
    lead: "Eine Website ist nie wirklich fertig. Wir bleiben dran.",
    items: [
      "Hosting und technische Betreuung",
      "Regelmäßige Updates und Sicherheits-Checks",
      "Inhaltliche Änderungen auf Zuruf",
      "Ein fester Ansprechpartner, keine Ticket-Warteschlange",
    ],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <section className="bg-vellum">
        <Container className="py-20 text-center md:py-28">
          <Eyebrow>Leistungen</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Website, SEO und Marketing aus einer Hand
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Alles, was Ihr Unternehmen online sichtbar und erfolgreich macht,
            koordiniert, konsistent und fair kalkuliert.
          </p>
        </Container>
      </section>

      {groups.map((g, i) => (
        <section key={g.title} className={i % 2 === 1 ? "bg-vellum-raised" : "bg-vellum"}>
          <Container className="py-20">
            <Reveal className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {g.title}
                </h2>
                <p className="mt-3 max-w-md text-ink-soft">{g.lead}</p>
              </div>
              <ul className="grid content-start gap-4 sm:grid-cols-2">
                {g.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-center gap-8 py-20 text-center">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Welche Leistungen passen zu Ihrem Vorhaben?
          </h2>
          <Button href="/kontakt" variant="inverse">
            Kostenlos beraten lassen
          </Button>
        </Container>
      </section>
    </>
  );
}
