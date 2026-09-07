import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kostenlose Erstberatung von LuMa Digital anfragen.",
};

export default function KontaktPage() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:py-24">
        <div>
          <Eyebrow>Kontakt</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Lassen Sie uns sprechen
          </h1>
          <p className="mt-6 max-w-sm font-sans text-lg leading-relaxed text-ink-soft">
            Kostenlos, unverbindlich, ohne Verkaufsdruck. Schreiben Sie uns
            kurz, worum es geht — wir melden uns in der Regel innerhalb
            eines Werktags.
          </p>
          <dl className="mt-10 flex flex-col gap-4 font-sans text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                E-Mail
              </dt>
              <dd className="mt-1 text-ink">[E-Mail-Adresse eintragen]</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Telefon
              </dt>
              <dd className="mt-1 text-ink">[Telefonnummer eintragen]</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Sitz
              </dt>
              <dd className="mt-1 text-ink">[Ort eintragen]</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
