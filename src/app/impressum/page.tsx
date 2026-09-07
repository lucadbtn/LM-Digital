import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <Container className="max-w-3xl py-20">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        Impressum
      </h1>
      <div className="mt-4 border-l-2 border-signal bg-vellum-raised/60 p-4 font-sans text-sm text-ink-soft">
        Platzhalter-Vorlage nach § 5 TMG / § 18 Abs. 2 MStV. Bitte mit den
        tatsächlichen Unternehmensdaten füllen und rechtlich prüfen lassen,
        bevor die Seite veröffentlicht wird.
      </div>

      <div className="mt-10 space-y-8 font-sans text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-lg font-bold">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2">
            [Vollständiger Name / Firmenname]
            <br />
            [Rechtsform, z. B. Einzelunternehmen / GmbH]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ und Ort]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">Vertreten durch</h2>
          <p className="mt-2">[Name der vertretungsberechtigten Person]</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">Kontakt</h2>
          <p className="mt-2">
            Telefon: [Telefonnummer]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p className="mt-2">
            [USt-IdNr. gemäß § 27 a Umsatzsteuergesetz, falls vorhanden]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">Registereintrag</h2>
          <p className="mt-2">
            [Handelsregister, Registergericht und Registernummer, falls
            vorhanden]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-2">[Name und Anschrift]</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">
            EU-Streitschlichtung
          </h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="underline decoration-signal underline-offset-4"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind
            nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen. [Angabe je nach
            tatsächlicher Bereitschaft anpassen.]
          </p>
        </section>
      </div>
    </Container>
  );
}
