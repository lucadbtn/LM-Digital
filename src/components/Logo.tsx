type LogoProps = {
  className?: string;
  mark?: boolean;
  wordmark?: boolean;
  tagline?: boolean;
  dark?: boolean;
};

/**
 * Placeholder recreation of the LuMa Digital mark (colonnade emblem).
 * Swap for the real asset by dropping `public/logo.svg` in and rendering
 * an <img src="/logo.svg"> instead — this stands in until then.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="var(--color-steel)" />
      <g fill="var(--color-vellum)">
        <rect x="22" y="24" width="7" height="46" />
        <rect x="33" y="18" width="7" height="52" />
        <rect x="44" y="30" width="6" height="40" />
        <rect x="58" y="24" width="6" height="46" />
        <rect x="69" y="30" width="6" height="40" />
        <rect x="80" y="24" width="6" height="46" />
      </g>
      <path
        d="M46 30 Q56 14 66 30"
        stroke="var(--color-vellum)"
        strokeWidth="6"
        fill="none"
      />
      <rect x="20" y="70" width="66" height="7" fill="var(--color-vellum)" />
      <rect x="20" y="70" width="7" height="16" fill="var(--color-steel)" />
    </svg>
  );
}

export function Logo({
  className = "",
  mark = true,
  wordmark = true,
  tagline = false,
  dark = false,
}: LogoProps) {
  const textColor = dark ? "text-vellum" : "text-ink";
  const lineColor = dark ? "bg-vellum/40" : "bg-ink/30";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {mark && <LogoMark />}
      {wordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-2">
            <span className={`font-display text-xl font-bold tracking-tight ${textColor}`}>
              LuMa
            </span>
            <span className={`h-4 w-px ${lineColor}`} />
            <span className="font-display text-xl font-bold tracking-tight text-steel">
              DIGITAL
            </span>
          </div>
          {tagline && (
            <span
              className={`mt-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                dark ? "text-vellum/60" : "text-ink-soft"
              }`}
            >
              Websites · SEO · Online-Marketing
            </span>
          )}
        </div>
      )}
    </div>
  );
}
