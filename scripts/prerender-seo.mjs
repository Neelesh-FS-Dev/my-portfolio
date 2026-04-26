import { join } from "node:path";
import {
  absoluteUrl,
  getSeoRoutes,
  ogImageUrl,
  readRepoFile,
  repoRoot,
  TWITTER_HANDLE,
  writeTextFile,
} from "./seo-routes.mjs";

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderMeta(route) {
  const canonical = absoluteUrl(route.path);
  const image = route.image ? absoluteUrl(route.image) : ogImageUrl(route.title, route.description);
  const schema = route.schema
    ? `\n    ${Array.isArray(route.schema)
        ? route.schema
            .map(
              (entry) =>
                `<script type="application/ld+json">${jsonForHtml(entry)}</script>`,
            )
            .join("\n    ")
        : `<script type="application/ld+json">${jsonForHtml(route.schema)}</script>`}`
    : "";

  return `<title>${htmlEscape(route.title)}</title>
    <meta name="description" content="${htmlEscape(route.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${htmlEscape(canonical)}" />
    <meta property="og:title" content="${htmlEscape(route.title)}" />
    <meta property="og:description" content="${htmlEscape(route.description)}" />
    <meta property="og:url" content="${htmlEscape(canonical)}" />
    <meta property="og:type" content="${htmlEscape(route.type || "website")}" />
    <meta property="og:site_name" content="Neelesh Yadav" />
    <meta property="og:image" content="${htmlEscape(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${htmlEscape(route.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${TWITTER_HANDLE}" />
    <meta name="twitter:creator" content="${TWITTER_HANDLE}" />
    <meta name="twitter:title" content="${htmlEscape(route.title)}" />
    <meta name="twitter:description" content="${htmlEscape(route.description)}" />
    <meta name="twitter:image" content="${htmlEscape(image)}" />${schema}`;
}

function replaceSeoBlock(html, route) {
  return html.replace(
    /<title>[\s\S]*?<!-- Fonts -->/,
    `${renderMeta(route)}\n\n    <!-- Fonts -->`,
  );
}

function routeOutputPath(routePath) {
  if (routePath === "/") return join(repoRoot, "dist", "index.html");
  return join(repoRoot, "dist", routePath.slice(1), "index.html");
}

const baseHtml = await readRepoFile("dist/index.html");
const routes = getSeoRoutes();

for (const route of routes) {
  await writeTextFile(routeOutputPath(route.path), replaceSeoBlock(baseHtml, route));
}

console.log(`Prerendered SEO HTML for ${routes.length} routes`);
