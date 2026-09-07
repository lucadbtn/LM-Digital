import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "LuMa Digital macht professionelle Websites, SEO und Online-Marketing für kleine und mittlere Unternehmen zugänglich.",
};

const values = [
  { title: "Fairness", desc: "Feste Preise, klare Angebote – keine versteckten Kosten oder endlosen Stundenzettel." },
  { title: "Transparenz", desc: "Sie wissen jederzeit, woran wir arbeiten und warum." },
  { title: "Qualität", desc: "Technisch sauber, schnell und langfristig wartbar statt schnell zusammengeklickt." },
  { title: "Tempo", desc: "Kurze Wege, klare Prozesse – vom Erstgespräch bis zum Livegang." },
];

export default function UeberUnsPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <Eyebrow>Über uns</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Gute Websites sollten kein Luxus sein
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 font-sans text-lg leading-relaxed text-ink-soft">
            <p>
              LuMa Digital ist entstanden aus einer einfachen Beobachtung:
              viele kleine und mittlere Unternehmen scheuen den Schritt zu
              einer professionellen Website — nicht, weil sie den Wert nicht
              sehen, sondern weil klassische Agenturpreise außer Reichweite
              liegen.
            </p>
            <p>
              Wir kombinieren moderne Web-Technologie mit schlanken
              Prozessen, um Websites, SEO und Online-Marketing zu einem
              Preis anzubieten, der für Handwerksbetriebe, Dienstleister und
              lokale Unternehmen tatsächlich kalkulierbar ist — ohne bei
              Qualität oder Sichtbarkeit Kompromisse einzugehen.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-vellum-raised/60">
        <Container className="py-16">
          <Eyebrow>Unsere Grundsätze</Eyebrow>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-l-2 border-steel pl-6">
                <h2 className="font-display text-lg font-bold text-ink">{v.title}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Lernen Sie uns im Erstgespräch kennen
          </h2>
          <Button href="/kontakt" variant="primary" className="bg-signal text-vellum hover:bg-vellum hover:text-ink">
            Kontakt aufnehmen
          </Button>
        </Container>
      </section>
    </>
  );
}
