import type { ContactFormBody, VercelRequest, VercelResponse } from "./_types";

export const config = {
  api: {
    bodyParser: true,
  },
};

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const origin = (req.headers.origin as string) || "";
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  } else if (!ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = req.body as ContactFormBody | undefined;
  const { name, email, subject, message } = body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (
    name.length > 100 ||
    email.length > 254 ||
    (subject && subject.length > 200) ||
    message.length > 5000
  ) {
    return res.status(400).json({ message: "Input exceeds allowed length" });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["neeleshy263@gmail.com"],
        reply_to: email,
        subject: subject
          ? `[Portfolio] ${escapeHtml(subject)}`
          : `[Portfolio] Message from ${escapeHtml(name)}`,
        html: `
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = (await response.json()) as { message?: string };
      throw new Error(error.message || "Email send failed");
    }

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    const error = err as Error;
    console.error("Resend error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}
