import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { DesignShowcase } from "@/components/DesignShowcase";
import {
  EditorialDesktop,
  EditorialMenu,
  EditorialAbout,
  EditorialMobile,
  BoldDesktop,
  BoldSchedule,
  BoldTrainers,
  BoldMobile,
  CorporateDesktop,
  CorporateFeatures,
  CorporateTeam,
  CorporateMobile,
} from "@/components/design-mockups";

export const metadata: Metadata = {
  title: "Design-Beispiele",
  description:
    "Drei unterschiedliche Design-Richtungen von LuMa Digital zum Durchklicken.",
};

const concepts = [
  {
    id: "editorial",
    name: "Editorial",
    desc: "Warm, ruhig und mit Liebe zum Detail. Passt zu Gastronomie, Handwerk und Marken mit Charakter.",
    screens: [
      { label: "Startseite", node: <EditorialDesktop /> },
      { label: "Speisekarte", node: <EditorialMenu /> },
      { label: "Über uns", node: <EditorialAbout /> },
      { label: "Mobile Ansicht", node: <EditorialMobile /> },
    ],
  },
  {
    id: "bold",
    name: "Bold",
    desc: "Dunkel, kontrastreich und mit klarer Kante. Passt zu Fitness, Sport und Marken, die auffallen wollen.",
    screens: [
      { label: "Startseite", node: <BoldDesktop /> },
      { label: "Kurse", node: <BoldSchedule /> },
      { label: "Trainer", node: <BoldTrainers /> },
      { label: "Mobile Ansicht", node: <BoldMobile /> },
    ],
  },
  {
    id: "corporate",
    name: "Corporate",
    desc: "Aufgeräumt, strukturiert und vertrauenswürdig. Passt zu B2B-Dienstleistern und Software-Anbietern.",
    screens: [
      { label: "Startseite", node: <CorporateDesktop /> },
      { label: "Funktionen", node: <CorporateFeatures /> },
      { label: "Team", node: <CorporateTeam /> },
      { label: "Mobile Ansicht", node: <CorporateMobile /> },
    ],
  },
];

export default function BeispielePage() {
  return (
    <>
      <section className="bg-vellum">
        <Container className="py-20 text-center md:py-28">
          <Eyebrow>Design-Beispiele</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Drei Richtungen, ein Ausgangspunkt
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Diese Konzeptseiten sind selbst gestaltete Beispiele, keine
            echten Kundenprojekte. Sie zeigen, wie unterschiedlich eine
            Website je nach Marke aussehen kann. Klicken Sie sich durch.
          </p>
        </Container>
      </section>

      {concepts.map((concept, i) => (
        <section key={concept.id} className={i % 2 === 1 ? "bg-vellum-raised" : "bg-vellum"}>
          <Container className="py-20">
            <Reveal className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-steel-deep">
                  Konzept {i + 1}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {concept.name}
                </h2>
                <p className="mt-3 max-w-sm text-ink-soft">{concept.desc}</p>
              </div>
              <DesignShowcase screens={concept.screens} />
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-center gap-8 py-20 text-center">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Welche Richtung passt zu Ihrer Marke?
          </h2>
          <Button href="/kontakt" variant="inverse">
            Lassen Sie uns sprechen
          </Button>
        </Container>
      </section>
    </>
  );
}
