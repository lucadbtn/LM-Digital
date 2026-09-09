"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-vellum-raised p-8">
        <p className="font-display text-lg font-bold text-ink">Nachricht gesendet.</p>
        <p className="mt-2 text-sm text-ink-soft">
          Danke für Ihre Anfrage. Wir melden uns in der Regel innerhalb von
          einem Werktag.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="E-Mail" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Unternehmen" name="company" />
        <Field label="Telefon" name="phone" type="tel" />
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-ink-soft">
          Nachricht
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl bg-vellum-raised px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-steel"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-vellum transition-colors hover:bg-steel-deep disabled:opacity-60"
      >
        {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
      </button>
      {status === "error" && (
        <p className="text-sm text-signal">
          Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben
          Sie uns direkt per E-Mail.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-wide text-ink-soft">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-xl bg-vellum-raised px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-steel"
      />
    </label>
  );
}
