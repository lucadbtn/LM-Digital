import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kostenlose Erstberatung von LuMa Digital anfragen.",
};

export default function KontaktPage() {
  return (
    <section className="bg-vellum">
      <Container className="grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        <div>
          <Eyebrow>Kontakt</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Lassen Sie uns sprechen
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">
            Kostenlos, unverbindlich und ohne Verkaufsdruck. Schreiben Sie uns
            kurz, worum es geht. Wir melden uns in der Regel innerhalb eines
            Werktags.
          </p>
          <dl className="mt-10 flex flex-col gap-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-soft">
                E-Mail
              </dt>
              <dd className="mt-1 text-ink">
                <a href="mailto:kontakt@luma-digital.de" className="hover:text-steel-deep">
                  kontakt@luma-digital.de
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-soft">
                Telefon
              </dt>
              <dd className="mt-1 text-ink">
                <a href="tel:1234567890" className="hover:text-steel-deep">
                  1234567890
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-soft">
                Sitz
              </dt>
              <dd className="mt-1 text-ink">11111 Musterhausen</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
