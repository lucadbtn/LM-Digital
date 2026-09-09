import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    title: "Websites",
    desc: "Onepager, Business-Websites und Onlineshops. Schnell, sauber programmiert und auf Google optimiert.",
  },
  {
    title: "SEO",
    desc: "Lokale und überregionale Suchmaschinenoptimierung, damit Kundschaft Sie findet, bevor sie zur Konkurrenz geht.",
  },
  {
    title: "Online-Marketing",
    desc: "Google Ads, Social-Media-Kampagnen und Google Business Profil, zielgerichtet statt mit der Gießkanne.",
  },
  {
    title: "Wartung & Support",
    desc: "Hosting, Updates, Sicherheit und Änderungen laufend betreut. Ein Ansprechpartner, keine Warteschleife.",
  },
];

const reasons = [
  {
    title: "Faire Festpreise",
    desc: "Transparente Pakete statt Stundensätzen, die niemand versteht. Sie wissen vorher, was Sie zahlen.",
  },
  {
    title: "Schnelle Umsetzung",
    desc: "Launch in wenigen Wochen, ohne Abstriche bei Qualität oder Performance.",
  },
  {
    title: "Ein Ansprechpartner",
    desc: "Keine wechselnden Projektleiter. Eine Person kennt Ihr Projekt von Anfang bis Ende.",
  },
  {
    title: "Gebaut für Google",
    desc: "Technisch sauber, schnell ladend und von der ersten Zeile Code an für SEO optimiert.",
  },
];

const process = [
  { step: "1", title: "Analyse & Beratung", desc: "Wir klären Ziele, Zielgruppe und Budget in einem kostenlosen Erstgespräch." },
  { step: "2", title: "Design", desc: "Ein individuelles Design-Konzept, abgestimmt auf Ihre Marke. Kein Baukasten-Look." },
  { step: "3", title: "Entwicklung", desc: "Saubere, schnelle Umsetzung mit modernen Web-Technologien." },
  { step: "4", title: "SEO-Setup", desc: "Technisches SEO, lokale Auffindbarkeit und Google Business Profil von Anfang an." },
  { step: "5", title: "Launch & Betreuung", desc: "Live-Schaltung und laufende Betreuung, damit Ihre Website weiter performt." },
];

export default function Home() {
  return (
    <>
      <section className="bg-vellum">
        <Container className="flex flex-col items-center py-24 text-center md:py-32">
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Websites, die Ihr Unternehmen wirklich voranbringen.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Professionelle Websites, SEO und Online-Marketing für B2B- und
            B2C-Unternehmen. Fair kalkuliert und schnell umgesetzt.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <Button href="/kontakt" variant="primary">
              Beratung anfragen
            </Button>
            <Button href="/leistungen" variant="ghost">
              Leistungen ansehen
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-vellum-raised">
        <Container className="grid grid-cols-1 gap-10 py-14 text-center sm:grid-cols-3">
          {[
            { value: "2 bis 4 Wochen", label: "bis zum Launch" },
            { value: "1", label: "fester Ansprechpartner" },
            { value: "100 %", label: "auf Google optimiert" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-bold text-ink md:text-3xl">{s.value}</div>
              <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
            </div>
          ))}
        </Container>
      </section>

      <section id="leistungen" className="bg-vellum">
        <Container className="py-24">
          <Reveal className="text-center">
            <Eyebrow>Leistungen</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Alles aus einer Hand
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-vellum-raised p-7">
                  <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/leistungen" variant="ghost">
              Alle Leistungen im Detail
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-vellum-raised">
        <Container className="py-24">
          <Reveal className="text-center">
            <Eyebrow>Warum LuMa Digital</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Agenturqualität, ohne Agenturpreis
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <h3 className="font-display text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-vellum">
        <Container className="py-24">
          <Reveal className="text-center">
            <Eyebrow>Ablauf</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Von der Idee bis zum Livegang
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 80}>
                <li>
                  <span className="font-display text-2xl font-light text-steel">{p.step}</span>
                  <h3 className="mt-2 font-display text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-vellum-raised">
        <Container className="py-24 text-center">
          <Reveal>
            <Eyebrow>Design-Beispiele</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Sehen Sie sich mögliche Design-Richtungen an
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              Drei komplett unterschiedliche Stilrichtungen zum Durchklicken,
              damit Sie ein Gefühl dafür bekommen, wie Ihre Website aussehen
              könnte.
            </p>
            <div className="mt-8">
              <Button href="/beispiele" variant="primary">
                Beispiele ansehen
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-center gap-8 py-24 text-center">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Bereit für eine Website, die verkauft?
          </h2>
          <Button href="/kontakt" variant="inverse">
            Beratung anfragen
          </Button>
        </Container>
      </section>
    </>
  );
}
