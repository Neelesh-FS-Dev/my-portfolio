export const config = { runtime: "edge" };

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export default function handler(req: Request): Response {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Neelesh Yadav";
  const description =
    searchParams.get("description") ||
    "React Native & React Developer | Pune, India";

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090c10"/>
          <stop offset="100%" stop-color="#0d1117"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00e5ff"/>
          <stop offset="100%" stop-color="#7c4dff"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>
      <rect x="60" y="520" width="120" height="4" rx="2" fill="url(#accent)"/>
      <text x="60" y="240" font-family="system-ui,sans-serif" font-size="52" font-weight="800" fill="#e6edf3">${escapeXml(truncate(title, 50))}</text>
      <text x="60" y="320" font-family="system-ui,sans-serif" font-size="24" fill="#8b949e">${escapeXml(truncate(description, 90))}</text>
      <text x="60" y="570" font-family="system-ui,sans-serif" font-size="20" font-weight="600" fill="#00e5ff">neeleshyadav.vercel.app</text>
    </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
