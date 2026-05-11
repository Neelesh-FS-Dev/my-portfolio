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

// Sliding-window in-memory rate limit. Best-effort only — Vercel functions
// are stateless across cold starts, so persistent abusers will still get
// through eventually. For real spam protection swap this for Upstash Redis.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // requests per window per IP
const rateLog = new Map<string, number[]>();

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) {
    return fwd.split(",")[0].trim();
  }
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0];
  const real = req.headers["x-real-ip"];
  if (typeof real === "string") return real;
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (rateLog.get(ip) || []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLog.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateLog.set(ip, hits);
  // Opportunistically prune cold entries so the map doesn't grow forever.
  if (rateLog.size > 1000) {
    for (const [k, v] of rateLog) {
      const fresh = v.filter((t) => t > cutoff);
      if (fresh.length === 0) rateLog.delete(k);
      else rateLog.set(k, fresh);
    }
  }
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.setHeader("Retry-After", "60");
    return res
      .status(429)
      .json({ message: "Too many messages — please wait a minute." });
  }

  const body = req.body as ContactFormBody | undefined;
  const { name, email, subject, message, _honey } = body ?? {};

  // Honeypot: silently 200 so bots don't learn they were caught.
  if (_honey && _honey.trim().length > 0) {
    return res.status(200).json({ message: "Email sent successfully!" });
  }

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
