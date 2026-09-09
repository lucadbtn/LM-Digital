import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Referenzen",
  description: "Beispielprojekte und Branchen, für die LuMa Digital Websites umsetzt.",
};

const examples = [
  { branche: "Handwerksbetrieb", typ: "Business-Website", ziel: "Mehr Anfragen über Google und eine klare Leistungsübersicht" },
  { branche: "Restaurant", typ: "Onepager", ziel: "Speisekarte, Reservierung und Google-Auffindbarkeit" },
  { branche: "Steuerberatung", typ: "Business-Website", ziel: "Vertrauensbildung, Terminbuchung und ein Mandantenportal-Link" },
  { branche: "Einzelhandel", typ: "Onlineshop", ziel: "Sichtbarkeit vor Ort und Verkauf über den Shop" },
  { branche: "B2B-Dienstleister", typ: "Business-Website", ziel: "Leadgenerierung über Landingpages und SEO" },
  { branche: "Fitnessstudio", typ: "Onepager mit Buchung", ziel: "Mitgliedschaften und Probetraining online buchbar" },
];

export default function ReferenzenPage() {
  return (
    <>
      <section className="bg-vellum">
        <Container className="py-20 text-center md:py-28">
          <Eyebrow>Referenzen</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Für diese Branchen bauen wir Websites
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            LuMa Digital ist ein junges Studio. Konkrete Kundenprojekte
            veröffentlichen wir hier, sobald sie live sind. Bis dahin ein
            Überblick, für welche Branchen und Anforderungen unsere Pakete
            gedacht sind.
          </p>
        </Container>
      </section>

      <section className="bg-vellum-raised">
        <Container className="py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((e, i) => (
              <Reveal key={e.branche} delay={i * 60}>
                <div className="h-full rounded-2xl bg-vellum p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-steel-deep">
                    Beispiel
                  </span>
                  <h2 className="mt-2 font-display text-lg font-bold text-ink">{e.branche}</h2>
                  <div className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
                    {e.typ}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{e.ziel}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-center gap-8 py-20 text-center">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ihr Projekt könnte das nächste Beispiel sein
          </h2>
          <Button href="/kontakt" variant="inverse">
            Projekt besprechen
          </Button>
        </Container>
      </section>
    </>
  );
}
