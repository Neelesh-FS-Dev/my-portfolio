import { join } from "node:path";
import { getSeoRoutes, LAST_MOD, repoRoot, SITE_URL, writeTextFile } from "./seo-routes.mjs";

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrl(route) {
  const loc = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getSeoRoutes().map(renderUrl).join("\n")}
</urlset>
`;

await writeTextFile(join(repoRoot, "public", "sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${getSeoRoutes().length} URLs`);
