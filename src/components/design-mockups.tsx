// Abstract, self-built mockups (no photos, no real client data) used to
// illustrate three different visual directions on the /beispiele page.

export function EditorialDesktop() {
  return (
    <div className="aspect-[16/10] bg-[#efece4] p-6 text-[#2b2620] sm:p-10">
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg italic">Café Nordlicht</span>
        <div className="hidden gap-6 text-xs tracking-wide sm:flex">
          <span>Speisekarte</span>
          <span>Über uns</span>
          <span>Reservieren</span>
        </div>
      </div>
      <div className="mt-10 max-w-md sm:mt-16">
        <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
          Frühstück, das ankommt.
        </h3>
        <p className="mt-4 text-sm text-[#2b2620]/70">
          Frisch, regional und mit Ruhe genossen, mitten in der Stadt.
        </p>
        <span className="mt-6 inline-block rounded-full bg-[#2f6b5e] px-5 py-2 text-xs font-medium text-white">
          Tisch reservieren
        </span>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-14">
        <div className="aspect-square rounded-lg bg-[#d9cfb8]" />
        <div className="aspect-square rounded-lg bg-[#c7b79a]" />
        <div className="aspect-square rounded-lg bg-[#2f6b5e]/80" />
      </div>
    </div>
  );
}

export function EditorialMobile() {
  return (
    <div className="flex justify-center bg-[#efece4] py-8">
      <div className="w-40 rounded-[1.75rem] bg-white/40 p-3 text-[#2b2620] shadow-inner">
        <div className="text-center font-serif text-sm italic">Café Nordlicht</div>
        <h3 className="mt-6 text-center font-serif text-xl leading-tight">
          Frühstück, das ankommt.
        </h3>
        <div className="mx-auto mt-4 h-16 w-full rounded-lg bg-[#d9cfb8]" />
        <span className="mx-auto mt-4 block w-fit rounded-full bg-[#2f6b5e] px-4 py-1.5 text-[10px] font-medium text-white">
          Tisch reservieren
        </span>
      </div>
    </div>
  );
}

export function BoldDesktop() {
  return (
    <div className="aspect-[16/10] bg-[#121212] p-6 text-white sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold uppercase tracking-tight">Pulse</span>
        <div className="hidden gap-6 text-xs uppercase tracking-wide text-white/60 sm:flex">
          <span>Kurse</span>
          <span>Trainer</span>
          <span>Preise</span>
        </div>
      </div>
      <h3 className="mt-10 max-w-lg text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:mt-16 sm:text-5xl">
        Stärke.
        <br />
        Jeden Tag.
      </h3>
      <span className="mt-6 inline-block rounded-full bg-[#e8a33d] px-5 py-2 text-xs font-bold uppercase text-[#121212]">
        Jetzt starten
      </span>
      <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-14">
        {["12", "48", "6"].map((n) => (
          <div key={n} className="rounded-lg bg-white/5 p-4">
            <div className="text-2xl font-extrabold text-[#e8a33d]">{n}</div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-white/50">
              Wochenkurse
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoldMobile() {
  return (
    <div className="flex justify-center bg-[#121212] py-8">
      <div className="w-40 rounded-[1.75rem] bg-white/5 p-3 text-white">
        <div className="text-center text-sm font-extrabold uppercase tracking-tight">
          Pulse
        </div>
        <h3 className="mt-6 text-center text-xl font-extrabold uppercase leading-tight">
          Stärke. Jeden Tag.
        </h3>
        <span className="mx-auto mt-4 block w-fit rounded-full bg-[#e8a33d] px-4 py-1.5 text-[10px] font-bold uppercase text-[#121212]">
          Jetzt starten
        </span>
        <div className="mt-4 h-16 w-full rounded-lg bg-white/10" />
      </div>
    </div>
  );
}

export function CorporateDesktop() {
  return (
    <div className="aspect-[16/10] bg-[#eef1f6] p-6 text-[#1c2733] sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold tracking-tight">Nova Systems</span>
        <div className="hidden gap-6 text-xs text-[#1c2733]/60 sm:flex">
          <span>Produkt</span>
          <span>Lösungen</span>
          <span>Preise</span>
        </div>
        <span className="hidden rounded-full bg-[#3d4ea6] px-4 py-1.5 text-xs font-medium text-white sm:inline-block">
          Demo buchen
        </span>
      </div>
      <div className="mt-10 max-w-md sm:mt-14">
        <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
          Software, die mit Ihrem Team mitwächst.
        </h3>
        <p className="mt-3 text-sm text-[#1c2733]/60">
          Eine Plattform für Planung, Zusammenarbeit und Reporting.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-12">
        {["Planung", "Team", "Reports"].map((label) => (
          <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="h-6 w-6 rounded bg-[#3d4ea6]/15" />
            <div className="mt-3 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CorporateMobile() {
  return (
    <div className="flex justify-center bg-[#eef1f6] py-8">
      <div className="w-40 rounded-[1.75rem] bg-white/60 p-3 text-[#1c2733] shadow-inner">
        <div className="text-center text-sm font-semibold tracking-tight">
          Nova Systems
        </div>
        <h3 className="mt-6 text-center text-lg font-semibold leading-tight">
          Software, die mitwächst.
        </h3>
        <div className="mt-4 flex flex-col gap-2">
          {["Planung", "Team", "Reports"].map((label) => (
            <div key={label} className="rounded-md bg-white p-2 text-[10px] font-medium shadow-sm">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
