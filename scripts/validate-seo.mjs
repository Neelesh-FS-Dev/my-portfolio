import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { getSeoRoutes, repoRoot, SITE_URL } from "./seo-routes.mjs";

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function extractJsonLd(html) {
  return [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => match[1]);
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function routeOutputPath(routePath) {
  if (routePath === "/") return join(repoRoot, "dist", "index.html");
  return join(repoRoot, "dist", routePath.slice(1), "index.html");
}

const routes = getSeoRoutes();
const expectedUrls = routes.map(
  (route) => `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
);

const sitemap = await readFile(join(repoRoot, "public", "sitemap.xml"), "utf8");
const sitemapUrls = extractLocs(sitemap);
const missingUrls = expectedUrls.filter((url) => !sitemapUrls.includes(url));
const staleUrls = sitemapUrls.filter((url) => !expectedUrls.includes(url));
const duplicateUrls = sitemapUrls.filter(
  (url, index) => sitemapUrls.indexOf(url) !== index,
);

if (missingUrls.length || staleUrls.length || duplicateUrls.length) {
  console.error("SEO validation failed: sitemap drift detected");
  if (missingUrls.length) console.error("Missing:", missingUrls);
  if (staleUrls.length) console.error("Stale:", staleUrls);
  if (duplicateUrls.length) console.error("Duplicates:", duplicateUrls);
  process.exit(1);
}

for (const route of routes) {
  const htmlPath = routeOutputPath(route.path);
  await access(htmlPath);
  const html = await readFile(htmlPath, "utf8");

  if (!html.includes(`<title>${htmlEscape(route.title)}</title>`)) {
    throw new Error(`Missing prerendered title for ${route.path}`);
  }

  for (const json of extractJsonLd(html)) {
    JSON.parse(json);
  }
}

console.log(`SEO validation passed for ${routes.length} routes`);
