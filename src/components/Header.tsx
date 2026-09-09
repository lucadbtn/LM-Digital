"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { Container } from "./ui";

const links = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/beispiele", label: "Beispiele" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/ueber-uns", label: "Über uns" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-vellum/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="LuMa Digital, Startseite" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/kontakt"
            className="hidden items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-vellum transition-colors hover:bg-steel-deep sm:inline-flex"
          >
            Beratung anfragen
          </Link>
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </Container>
      {open && (
        <nav className="border-t border-line/70 bg-vellum md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/50 py-3 text-sm font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-vellum"
            >
              Beratung anfragen
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
