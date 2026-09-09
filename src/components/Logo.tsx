type LogoProps = {
  className?: string;
  mark?: boolean;
  wordmark?: boolean;
  tagline?: boolean;
  dark?: boolean;
};

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer
  return <img src="/logo-mark.png" alt="" className={`object-contain ${className}`} />;
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
              className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${
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
