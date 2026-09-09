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
    <span className="text-sm font-semibold uppercase tracking-wide text-steel-deep">
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
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  className?: string;
}) {
  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-1 font-sans text-base font-medium text-steel-deep transition-colors hover:text-ink ${className}`}
      >
        {children}
        <span aria-hidden="true">›</span>
      </Link>
    );
  }
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 font-sans text-base font-medium transition-colors duration-150";
  const variants: Record<string, string> = {
    primary: "bg-ink text-vellum hover:bg-steel-deep",
    secondary: "bg-vellum-raised text-ink hover:bg-line/60",
    inverse: "bg-vellum text-ink hover:bg-vellum-raised",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function SpecStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-sm text-ink-soft">{label}</div>
    </div>
  );
}
