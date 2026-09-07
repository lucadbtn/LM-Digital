import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // TODO: an einen echten E-Mail-Versand anbinden (z. B. Resend, SMTP).
  console.log("Kontaktanfrage empfangen:", body);

  return NextResponse.json({ ok: true });
}
