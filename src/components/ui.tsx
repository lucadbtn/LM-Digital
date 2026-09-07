import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-steel-deep">
      <span className="h-px w-6 bg-signal" />
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-sans text-sm font-semibold tracking-wide transition-colors duration-150";
  const variants: Record<string, string> = {
    primary: "bg-ink text-vellum hover:bg-signal",
    secondary:
      "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-vellum",
    ghost: "text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function CornerTicks({ dark = false }: { dark?: boolean }) {
  const color = dark ? "border-vellum/25" : "border-ink/20";
  return (
    <>
      <span className={`pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t ${color}`} />
      <span className={`pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t ${color}`} />
      <span className={`pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l ${color}`} />
      <span className={`pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r ${color}`} />
    </>
  );
}

export function SpecStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-4">
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
        {label}
      </div>
    </div>
  );
}
