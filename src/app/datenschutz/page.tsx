import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <Container className="max-w-3xl py-20">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        Datenschutzerklärung
      </h1>
      <div className="mt-4 border-l-2 border-signal bg-vellum-raised/60 p-4 font-sans text-sm text-ink-soft">
        Diese Vorlage deckt typische Punkte einer DSGVO-Datenschutzerklärung
        ab, ersetzt aber keine rechtliche Prüfung. Bitte vor Veröffentlichung
        von einer fachkundigen Stelle (z. B. Datenschutzbeauftragte/r oder
        Rechtsberatung) prüfen und mit den tatsächlichen Angaben füllen.
      </div>

      <div className="mt-10 space-y-8 font-sans text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-lg font-bold">1. Verantwortlicher</h2>
          <p className="mt-2">
            [Firmenname]
            <br />
            [Anschrift]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">2. Hosting</h2>
          <p className="mt-2">
            Diese Website wird bei [Hosting-Anbieter eintragen] gehostet.
            Der Anbieter verarbeitet dabei automatisch Server-Logfiles, u. a.
            IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite und
            verwendeter Browser, zur Sicherstellung eines störungsfreien
            Betriebs (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">3. Kontaktformular</h2>
          <p className="mt-2">
            Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir
            die von Ihnen angegebenen Daten (Name, E-Mail, ggf. Telefon,
            Unternehmen, Nachricht) ausschließlich zur Bearbeitung Ihrer
            Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Eine Weitergabe an
            Dritte erfolgt nicht.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">4. Cookies &amp; Tracking</h2>
          <p className="mt-2">
            [Hier eintragen, ob und welche Cookies, Analyse- oder
            Marketing-Tools (z. B. Google Analytics, Meta-Pixel)
            eingesetzt werden. Sofern nicht technisch notwendig, ist vor dem
            Einsatz eine Einwilligung über ein Cookie-Consent-Tool
            einzuholen.]
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">
            5. Rechte der betroffenen Person
          </h2>
          <p className="mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und
            Widerspruch gegen die Verarbeitung Ihrer personenbezogenen
            Daten sowie das Recht auf Beschwerde bei einer
            Aufsichtsbehörde.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold">
            6. Speicherdauer
          </h2>
          <p className="mt-2">
            Personenbezogene Daten werden nur so lange gespeichert, wie es
            für die genannten Zwecke erforderlich ist oder gesetzliche
            Aufbewahrungspflichten bestehen.
          </p>
        </section>
      </div>
    </Container>
  );
}
