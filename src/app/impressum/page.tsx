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
      <div className="mt-4 rounded-xl bg-vellum-raised p-4 text-sm text-ink-soft">
        Anschrift und Telefonnummer sind aktuell Platzhalterwerte (Max-
        Mustermann-Straße / Musterhausen) und müssen vor Veröffentlichung
        durch die echten Daten ersetzt werden. USt-IdNr. bitte ebenfalls
        ergänzen, falls vorhanden, und die Angaben rechtlich prüfen lassen.
      </div>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-lg font-bold">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2">
            LuMa Digital GbR
            <br />
            Gesellschaft bürgerlichen Rechts
            <br />
            Max-Mustermann-Straße 1
            <br />
            11111 Musterhausen
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">Vertreten durch</h2>
          <p className="mt-2">Luca Debertin und Maximilian Heidt</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">Kontakt</h2>
          <p className="mt-2">
            Telefon: 1234567890
            <br />
            E-Mail: kontakt@luma-digital.de
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
            Als Gesellschaft bürgerlichen Rechts ist LuMa Digital GbR nicht
            im Handelsregister eingetragen. [Falls ein Eintrag im
            Gesellschaftsregister besteht, hier ergänzen.]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-2">
            Luca Debertin und Maximilian Heidt
            <br />
            Max-Mustermann-Straße 1, 11111 Musterhausen
          </p>
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
              className="underline decoration-steel underline-offset-4"
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
