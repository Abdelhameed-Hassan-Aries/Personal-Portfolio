import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Validate environment ────────────────────────────────────
const RESEND_API_KEY  = process.env.RESEND_API_KEY;
const TO_EMAIL        = process.env.CONTACT_TO_EMAIL ?? "abdelhameed.hs0@gmail.com";
const FROM_EMAIL      = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 4000;

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "All fields must be valid text values." },
      { status: 422 }
    );
  }

  const sanitizedName = name.trim();
  const sanitizedEmail = email.trim();
  const sanitizedMessage = message.trim();

  // 2. Basic validation
  if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
    return NextResponse.json({ error: "All fields are required." }, { status: 422 });
  }

  if (
    sanitizedName.length > MAX_NAME_LENGTH ||
    sanitizedEmail.length > MAX_EMAIL_LENGTH ||
    sanitizedMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      {
        error:
          "Message is too long. Keep name under 120 chars, email under 320 chars, and message under 4000 chars.",
      },
      { status: 422 }
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(sanitizedEmail)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  // 3. Guard: API key must exist and not be the placeholder
  const isPlaceholder =
    !RESEND_API_KEY ||
    RESEND_API_KEY === "re_your_api_key_here" ||
    !RESEND_API_KEY.startsWith("re_");

  if (isPlaceholder) {
    console.error("[contact] RESEND_API_KEY is missing or still set to the placeholder value.");
    return NextResponse.json(
      {
        error:
          "Email service not configured yet. Add your RESEND_API_KEY to .env.local and restart the dev server. Get a free key at resend.com",
      },
      { status: 503 }
    );
  }

  // 4. Send via Resend
  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to:   TO_EMAIL,
      replyTo: sanitizedEmail,
      subject: `Portfolio contact from ${sanitizedName.replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#0c0c1d;color:#f1f5f9;border-radius:12px;">
          <h2 style="color:#a78bfa;margin:0 0 24px;">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#64748b;width:100px;vertical-align:top;">Name</td>
              <td style="padding:8px 0;color:#f1f5f9;">${escapeHtml(sanitizedName)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b;vertical-align:top;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${escapeHtml(sanitizedEmail)}" style="color:#6366f1;">${escapeHtml(sanitizedEmail)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b;vertical-align:top;">Message</td>
              <td style="padding:8px 0;color:#f1f5f9;white-space:pre-wrap;">${escapeHtml(sanitizedMessage)}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:24px 0;"/>
          <p style="color:#64748b;font-size:12px;margin:0;">
            Sent from your portfolio contact form · Reply directly to this email to respond.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: `Resend error: ${error.message ?? JSON.stringify(error)}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
