import { join } from "node:path";
import {
  getSeoRoutes,
  LAST_MOD,
  repoRoot,
  SITE_URL,
  writeTextFile,
} from "./seo-routes.mjs";

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderImageBlock(image) {
  // <image:image> per https://www.google.com/schemas/sitemap-image/1.1
  const parts = [`      <image:loc>${xmlEscape(image.loc)}</image:loc>`];
  if (image.caption) {
    parts.push(`      <image:caption>${xmlEscape(image.caption)}</image:caption>`);
  }
  if (image.title) {
    parts.push(`      <image:title>${xmlEscape(image.title)}</image:title>`);
  }
  return `    <image:image>\n${parts.join("\n")}\n    </image:image>`;
}

function renderUrl(route) {
  const loc = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const lastmod = route.lastmod || LAST_MOD;
  const images = Array.isArray(route.images) ? route.images : [];
  const imageBlocks = images.map(renderImageBlock).join("\n");
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${imageBlocks ? `\n${imageBlocks}` : ""}
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${getSeoRoutes().map(renderUrl).join("\n")}
</urlset>
`;

await writeTextFile(join(repoRoot, "public", "sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${getSeoRoutes().length} URLs`);
