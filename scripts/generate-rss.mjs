#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import blogs from "../src/features/blogs/data/blogs.ts";
import { SITE_URL } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getIsoDate(dateLabel) {
  const match = /^([A-Za-z]{3})\s+(\d{4})$/.exec(dateLabel || "");
  if (!match) return new Date().toISOString();
  const monthMap = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04",
    May: "05", Jun: "06", Jul: "07", Aug: "08",
    Sep: "09", Oct: "10", Nov: "11", Dec: "12",
  };
  const mm = monthMap[match[1]] ?? "01";
  // Use first of the month at noon UTC so feed readers sort consistently.
  return new Date(`${match[2]}-${mm}-01T12:00:00Z`).toUTCString();
}

const feedItems = [...blogs]
  // Newest first
  .sort((a, b) => {
    const da = new Date(getIsoDate(a.date)).getTime();
    const db = new Date(getIsoDate(b.date)).getTime();
    return db - da;
  })
  .map((post) => {
    const link = `${SITE_URL}/blogs/${post.slug || post.id}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${getIsoDate(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${(post.tags || [])
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("\n      ")}
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Neelesh Yadav — Engineering Blog</title>
    <link>${SITE_URL}/blogs</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Engineering write-ups on React Native, React, performance, real-time systems, and shipping production mobile + web apps.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${feedItems}
  </channel>
</rss>
`;

const outPath = join(repoRoot, "public", "feed.xml");
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, xml);
console.log(`Generated feed.xml with ${blogs.length} posts`);
