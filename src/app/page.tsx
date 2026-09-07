import { Container, Eyebrow, Button, SpecStat, CornerTicks } from "@/components/ui";
import { Colonnade } from "@/components/Colonnade";
import Link from "next/link";

const services = [
  {
    n: "Websites",
    title: "Websites",
    desc: "Onepager, Business-Websites und Onlineshops – schnell, sauber programmiert und auf Google optimiert.",
  },
  {
    n: "SEO",
    title: "SEO",
    desc: "Lokale und überregionale Suchmaschinenoptimierung, damit Kundschaft Sie findet, bevor sie zur Konkurrenz geht.",
  },
  {
    n: "Marketing",
    title: "Online-Marketing",
    desc: "Google Ads, Social-Media-Kampagnen und Google Business Profil – zielgerichtet statt Gießkanne.",
  },
  {
    n: "Support",
    title: "Wartung & Support",
    desc: "Hosting, Updates, Sicherheit und Änderungen laufend betreut – ein Ansprechpartner, keine Warteschleife.",
  },
];

const reasons = [
  {
    title: "Faire Festpreise",
    desc: "Transparente Pakete statt Stundensätzen, die niemand versteht. Sie wissen vorher, was Sie zahlen.",
  },
  {
    title: "Schnelle Umsetzung",
    desc: "Launch in Wochen statt Monaten – ohne Abstriche bei Qualität oder Performance.",
  },
  {
    title: "Ein Ansprechpartner",
    desc: "Keine wechselnden Projektleiter. Eine Person kennt Ihr Projekt von Anfang bis Ende.",
  },
  {
    title: "Gebaut für Google",
    desc: "Technisch sauber, schnell ladend und SEO-optimiert von der ersten Zeile Code an.",
  },
];

const process = [
  { step: "01", title: "Analyse & Beratung", desc: "Wir klären Ziele, Zielgruppe und Budget in einem kostenlosen Erstgespräch." },
  { step: "02", title: "Design", desc: "Ein individuelles Design-Konzept, abgestimmt auf Ihre Marke – kein Baukasten-Look." },
  { step: "03", title: "Entwicklung", desc: "Saubere, schnelle Umsetzung mit modernen Web-Technologien." },
  { step: "04", title: "SEO-Setup", desc: "Technisches SEO, lokale Auffindbarkeit und Google Business Profil von Anfang an." },
  { step: "05", title: "Launch & Betreuung", desc: "Live-Schaltung und laufende Betreuung, damit Ihre Website weiter performt." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Colonnade className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full md:h-56" />
        <Container className="relative py-20 md:py-28">
          <Eyebrow>Websites · SEO · Online-Marketing</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Professionelle Websites, die sich jedes Unternehmen leisten kann.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-soft">
            LuMa Digital baut moderne, schnelle Websites für B2B- und
            B2C-Unternehmen – inklusive SEO und Online-Marketing. Fair
            kalkuliert, ohne Agentur-Overhead.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/kontakt" variant="primary">
              Kostenlose Erstberatung
            </Button>
            <Button href="/preise" variant="secondary">
              Preise ansehen
            </Button>
          </div>
          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3">
            <SpecStat value="ab 990 €" label="Einstiegspreis" />
            <SpecStat value="2–4 Wo." label="Bis zum Launch" />
            <SpecStat value="1" label="Fester Ansprechpartner" />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-vellum-raised/60">
        <Container className="py-8">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            Gebaut für Handwerk, Gastronomie, Einzelhandel und B2B-Dienstleister
          </p>
        </Container>
      </section>

      <section id="leistungen" className="border-b border-line">
        <Container className="py-20">
          <Eyebrow>Leistungen</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Alles aus einer Hand
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="flex flex-col gap-4 bg-vellum p-7">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  {s.n}
                </span>
                <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/leistungen" variant="ghost">
              Alle Leistungen im Detail →
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-20">
          <Eyebrow>Warum LuMa Digital</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Agentur-Qualität, ohne Agentur-Preis
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="border-l-2 border-steel pl-6">
                <h3 className="font-display text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">{r.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-vellum-raised/60">
        <Container className="py-20">
          <Eyebrow>Ablauf</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Von der Idee bis zum Livegang
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-5">
            {process.map((p) => (
              <li key={p.step} className="relative">
                <span className="font-mono text-sm text-steel">{p.step}</span>
                <h3 className="mt-2 font-display text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Preise</Eyebrow>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Transparent kalkuliert
              </h2>
            </div>
            <Link
              href="/preise"
              className="font-sans text-sm font-semibold text-steel-deep underline decoration-signal decoration-2 underline-offset-4"
            >
              Alle Pakete im Detail →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: "ab 990 €", desc: "Onepager für Selbstständige & kleine Betriebe." },
              { name: "Business", price: "ab 2.490 €", desc: "Bis zu 5 Unterseiten, ideal für KMU.", highlight: true },
              { name: "Premium", price: "ab 4.990 €", desc: "Individuelles Design, Shop & erweiterte Funktionen." },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`relative border p-7 ${
                  tier.highlight ? "border-ink bg-ink text-vellum" : "border-line"
                }`}
              >
                {tier.highlight && <CornerTicks dark />}
                <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
                  {tier.name}
                </div>
                <div className="mt-3 font-display text-2xl font-bold">{tier.price}</div>
                <p
                  className={`mt-3 font-sans text-sm leading-relaxed ${
                    tier.highlight ? "text-vellum/75" : "text-ink-soft"
                  }`}
                >
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-vellum">
        <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Bereit für eine Website, die verkauft?
          </h2>
          <Button href="/kontakt" variant="primary" className="bg-signal text-vellum hover:bg-vellum hover:text-ink">
            Kostenlose Erstberatung
          </Button>
        </Container>
      </section>
    </>
  );
}
