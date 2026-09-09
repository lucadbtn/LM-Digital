"use client";

import { useState, type ReactNode } from "react";

type Screen = {
  label: string;
  node: ReactNode;
};

export function DesignShowcase({ screens }: { screens: Screen[] }) {
  const [index, setIndex] = useState(0);
  const screen = screens[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + screens.length) % screens.length);
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/5">
        <div className="flex items-center gap-1.5 bg-[#e7e7e7] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="grid">
          {screens.map((s, i) => (
            <div key={s.label} className={`col-start-1 row-start-1 ${i === index ? "" : "invisible"}`}>
              {s.node}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Vorheriges Bild"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-vellum-raised text-ink transition-colors hover:bg-line/60"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {screens.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${s.label} anzeigen`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-ink" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Nächstes Bild"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-vellum-raised text-ink transition-colors hover:bg-line/60"
        >
          ›
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-ink-soft">{screen.label}</p>
    </div>
  );
}
