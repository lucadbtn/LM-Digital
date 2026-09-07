import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Referenzen",
  description: "Beispielprojekte und Branchen, für die LuMa Digital Websites umsetzt.",
};

const examples = [
  { branche: "Handwerksbetrieb", typ: "Business-Website", ziel: "Mehr Anfragen über Google, klare Leistungsübersicht" },
  { branche: "Restaurant", typ: "Onepager", ziel: "Speisekarte, Reservierung, Google-Auffindbarkeit" },
  { branche: "Steuerberatung", typ: "Business-Website", ziel: "Vertrauensbildung, Terminbuchung, Mandantenportal-Link" },
  { branche: "Einzelhandel", typ: "Onlineshop", ziel: "Sichtbarkeit vor Ort und Verkauf über den Shop" },
  { branche: "B2B-Dienstleister", typ: "Business-Website", ziel: "Leadgenerierung über Landingpages und SEO" },
  { branche: "Fitnessstudio", typ: "Onepager + Buchung", ziel: "Mitgliedschaften und Probetraining online buchbar" },
];

export default function ReferenzenPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <Eyebrow>Referenzen</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Für diese Branchen bauen wir Websites
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-soft">
            LuMa Digital ist ein junges Studio — konkrete Kundenprojekte
            veröffentlichen wir hier, sobald sie live sind. Bis dahin ein
            Überblick, für welche Branchen und Anforderungen unsere Pakete
            gedacht sind.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-vellum-raised/60">
        <Container className="py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((e) => (
              <div key={e.branche} className="flex flex-col gap-3 border border-line bg-vellum p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  Beispiel
                </span>
                <h2 className="font-display text-lg font-bold text-ink">{e.branche}</h2>
                <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  {e.typ}
                </div>
                <p className="font-sans text-sm leading-relaxed text-ink-soft">{e.ziel}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ihr Projekt könnte das nächste Beispiel sein
          </h2>
          <Button href="/kontakt" variant="primary" className="bg-signal text-vellum hover:bg-vellum hover:text-ink">
            Projekt besprechen
          </Button>
        </Container>
      </section>
    </>
  );
}
