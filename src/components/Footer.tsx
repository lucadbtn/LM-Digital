import Link from "next/link";
import { Logo } from "./Logo";
import { Container, CornerTicks } from "./ui";

const columns = [
  {
    title: "Leistungen",
    links: [
      { href: "/leistungen", label: "Websites" },
      { href: "/leistungen", label: "SEO" },
      { href: "/leistungen", label: "Online-Marketing" },
      { href: "/leistungen", label: "Wartung & Support" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/referenzen", label: "Referenzen" },
      { href: "/preise", label: "Preise" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line-dark bg-ink text-vellum">
      <CornerTicks dark />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark tagline />
          <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-vellum/60">
            Faire, moderne Websites für B2B &amp; B2C — ohne Agentur-Overhead.
            Geplant, gebaut und betreut aus einer Hand.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-vellum/45">
              {col.title}
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-vellum/80 transition-colors hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-line-dark">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 font-mono text-xs text-vellum/40 md:flex-row">
          <span>© {new Date().getFullYear()} LuMa Digital. Alle Rechte vorbehalten.</span>
          <span>Websites · SEO · Online-Marketing</span>
        </Container>
      </div>
    </footer>
  );
}
