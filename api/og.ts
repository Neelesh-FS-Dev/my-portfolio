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
          <stop offset="0%" stop-color="#000000"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </linearGradient>
        <radialGradient id="glow" cx="78%" cy="22%" r="55%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#60a5fa"/>
        </linearGradient>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" stroke-opacity="0.06" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <rect x="0" y="0" width="1200" height="3" fill="url(#accent)"/>
      <g transform="translate(60, 60)">
        <rect width="48" height="48" rx="10" fill="#3b82f6"/>
        <text x="24" y="32" font-family="system-ui,sans-serif" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle">NY</text>
      </g>
      <text x="132" y="92" font-family="system-ui,sans-serif" font-size="20" font-weight="600" fill="#f5f5f5">Neelesh Yadav</text>
      <text x="60" y="290" font-family="system-ui,sans-serif" font-size="64" font-weight="800" fill="#f5f5f5" letter-spacing="-2">${escapeXml(truncate(title, 44))}</text>
      <text x="60" y="360" font-family="system-ui,sans-serif" font-size="24" fill="#a8a8a8">${escapeXml(truncate(description, 92))}</text>
      <rect x="60" y="540" width="64" height="2" rx="1" fill="#3b82f6"/>
      <text x="60" y="582" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="18" font-weight="600" fill="#3b82f6" letter-spacing="2">NEELESHYADAV.VERCEL.APP</text>
    </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
