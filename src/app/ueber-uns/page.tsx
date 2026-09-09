import type { Metadata } from "next";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "LuMa Digital macht professionelle Websites, SEO und Online-Marketing für kleine und mittlere Unternehmen zugänglich.",
};

const values = [
  { title: "Fairness", desc: "Feste Preise und klare Angebote. Keine versteckten Kosten oder endlosen Stundenzettel." },
  { title: "Transparenz", desc: "Sie wissen jederzeit, woran wir arbeiten und warum." },
  { title: "Qualität", desc: "Technisch sauber, schnell und langfristig wartbar statt schnell zusammengeklickt." },
  { title: "Tempo", desc: "Kurze Wege und klare Prozesse, vom Erstgespräch bis zum Livegang." },
];

export default function UeberUnsPage() {
  return (
    <>
      <section className="bg-vellum">
        <Container className="py-20 text-center md:py-28">
          <Eyebrow>Über uns</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Gute Websites sollten kein Luxus sein
          </h1>
          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              LuMa Digital ist entstanden aus einer einfachen Beobachtung:
              Viele kleine und mittlere Unternehmen scheuen den Schritt zu
              einer professionellen Website. Nicht, weil sie den Wert nicht
              sehen, sondern weil klassische Agenturpreise außer Reichweite
              liegen.
            </p>
            <p>
              Wir kombinieren moderne Web-Technologie mit schlanken
              Prozessen, um Websites, SEO und Online-Marketing zu einem
              Preis anzubieten, der für Handwerksbetriebe, Dienstleister und
              lokale Unternehmen tatsächlich kalkulierbar ist, ohne bei
              Qualität oder Sichtbarkeit Kompromisse einzugehen.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-vellum-raised">
        <Container className="py-20">
          <Reveal className="text-center">
            <Eyebrow>Unsere Grundsätze</Eyebrow>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-x-12 gap-y-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <h2 className="font-display text-lg font-bold text-ink">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-center gap-8 py-20 text-center">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Lernen Sie uns im Erstgespräch kennen
          </h2>
          <Button href="/kontakt" variant="inverse">
            Kontakt aufnehmen
          </Button>
        </Container>
      </section>
    </>
  );
}
