// Abstract, self-built mockups (no photos, no real client data) used to
// illustrate three different visual directions on the /beispiele page.

export function EditorialDesktop() {
  return (
    <div className="h-full bg-[#efece4] p-6 text-[#2b2620] sm:p-10">
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

export function EditorialMenu() {
  const items = [
    ["Rühreitoast", "8,50 €"],
    ["Overnight Oats", "6,00 €"],
    ["Avocado Sourdough", "9,50 €"],
    ["Espresso", "3,00 €"],
    ["Flat White", "4,20 €"],
    ["Zitronentee", "3,50 €"],
  ];
  return (
    <div className="h-full bg-[#efece4] p-6 text-[#2b2620] sm:p-10">
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg italic">Café Nordlicht</span>
        <div className="hidden gap-6 text-xs tracking-wide sm:flex">
          <span className="border-b border-[#2b2620]">Speisekarte</span>
          <span>Über uns</span>
          <span>Reservieren</span>
        </div>
      </div>
      <h3 className="mt-10 font-serif text-3xl sm:mt-14">Speisekarte</h3>
      <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
        {items.map(([name, price]) => (
          <div key={name} className="flex items-baseline justify-between gap-3 border-b border-[#2b2620]/15 pb-2">
            <span>{name}</span>
            <span className="text-[#2b2620]/60">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EditorialAbout() {
  return (
    <div className="h-full bg-[#efece4] p-6 text-[#2b2620] sm:p-10">
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg italic">Café Nordlicht</span>
        <div className="hidden gap-6 text-xs tracking-wide sm:flex">
          <span>Speisekarte</span>
          <span className="border-b border-[#2b2620]">Über uns</span>
          <span>Reservieren</span>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[1fr_1.3fr] gap-8 sm:mt-14">
        <div className="rounded-lg bg-[#c7b79a]" />
        <div>
          <h3 className="font-serif text-2xl leading-snug sm:text-3xl">
            Seit 2019 rösten wir unseren Kaffee selbst.
          </h3>
          <p className="mt-4 text-sm text-[#2b2620]/70">
            Kleine Karte, große Sorgfalt. Wir arbeiten mit Erzeugern aus der
            Region und wechseln die Karte mit den Jahreszeiten.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EditorialMobile() {
  return (
    <div className="h-full flex items-center justify-center bg-[#efece4] p-6 sm:p-10">
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
    <div className="h-full bg-[#121212] p-6 text-white sm:p-10">
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

export function BoldSchedule() {
  const rows = [
    ["Montag", "18:00", "HIIT"],
    ["Dienstag", "07:00", "Yoga"],
    ["Mittwoch", "19:00", "Boxen"],
    ["Donnerstag", "18:00", "Kraft"],
    ["Freitag", "17:00", "HIIT"],
  ];
  return (
    <div className="h-full bg-[#121212] p-6 text-white sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold uppercase tracking-tight">Pulse</span>
        <div className="hidden gap-6 text-xs uppercase tracking-wide text-white/60 sm:flex">
          <span className="text-[#e8a33d]">Kurse</span>
          <span>Trainer</span>
          <span>Preise</span>
        </div>
      </div>
      <h3 className="mt-10 text-3xl font-extrabold uppercase tracking-tight sm:mt-14 sm:text-4xl">
        Kurse
      </h3>
      <div className="mt-8 flex flex-col gap-2">
        {rows.map(([day, time, name]) => (
          <div key={day} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm">
            <span className="w-24 text-white/50">{day}</span>
            <span className="w-16 text-white/50">{time}</span>
            <span className="flex-1 text-right font-bold">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoldTrainers() {
  return (
    <div className="h-full bg-[#121212] p-6 text-white sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold uppercase tracking-tight">Pulse</span>
        <div className="hidden gap-6 text-xs uppercase tracking-wide text-white/60 sm:flex">
          <span>Kurse</span>
          <span className="text-[#e8a33d]">Trainer</span>
          <span>Preise</span>
        </div>
      </div>
      <h3 className="mt-10 text-3xl font-extrabold uppercase tracking-tight sm:mt-14 sm:text-4xl">
        Trainer
      </h3>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {["Jonas", "Lea", "Kim"].map((name) => (
          <div key={name}>
            <div className="aspect-square rounded-lg bg-white/10" />
            <div className="mt-2 text-sm font-bold">{name}</div>
            <div className="text-[10px] uppercase tracking-wide text-[#e8a33d]">Coach</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoldMobile() {
  return (
    <div className="h-full flex items-center justify-center bg-[#121212] p-6 sm:p-10">
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
    <div className="h-full bg-[#eef1f6] p-6 text-[#1c2733] sm:p-10">
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

export function CorporateFeatures() {
  const features = [
    ["Planung", "Roadmaps und Meilensteine für jedes Team"],
    ["Zusammenarbeit", "Kommentare, Freigaben und Benachrichtigungen"],
    ["Reporting", "Fortschritt in Echtzeit, exportierbar als PDF"],
    ["Integrationen", "Anbindung an gängige Tools per API"],
  ];
  return (
    <div className="h-full bg-[#eef1f6] p-6 text-[#1c2733] sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold tracking-tight">Nova Systems</span>
        <div className="hidden gap-6 text-xs text-[#1c2733]/60 sm:flex">
          <span className="text-[#3d4ea6]">Produkt</span>
          <span>Lösungen</span>
          <span>Preise</span>
        </div>
      </div>
      <h3 className="mt-10 text-2xl font-semibold sm:mt-14 sm:text-3xl">Funktionen</h3>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {features.map(([title, desc]) => (
          <div key={title} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold">{title}</div>
            <div className="mt-1 text-xs text-[#1c2733]/60">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CorporateTeam() {
  return (
    <div className="h-full bg-[#eef1f6] p-6 text-[#1c2733] sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold tracking-tight">Nova Systems</span>
        <div className="hidden gap-6 text-xs text-[#1c2733]/60 sm:flex">
          <span>Produkt</span>
          <span className="text-[#3d4ea6]">Team</span>
          <span>Preise</span>
        </div>
      </div>
      <h3 className="mt-10 text-2xl font-semibold sm:mt-14 sm:text-3xl">
        Ein Team, das antwortet.
      </h3>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {["Anna", "Ben", "Priya"].map((name) => (
          <div key={name} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mx-auto h-10 w-10 rounded-full bg-[#3d4ea6]/15" />
            <div className="mt-3 text-center text-xs font-medium">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CorporateMobile() {
  return (
    <div className="h-full flex items-center justify-center bg-[#eef1f6] p-6 sm:p-10">
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
