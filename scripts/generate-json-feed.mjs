#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import blogs from "../src/features/blogs/data/blogs.ts";
import { SITE_URL } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

function getIsoDate(dateLabel) {
  const match = /^([A-Za-z]{3})\s+(\d{4})$/.exec(dateLabel || "");
  if (!match) return new Date().toISOString();
  const monthMap = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04",
    May: "05", Jun: "06", Jul: "07", Aug: "08",
    Sep: "09", Oct: "10", Nov: "11", Dec: "12",
  };
  const mm = monthMap[match[1]] ?? "01";
  return new Date(`${match[2]}-${mm}-01T12:00:00Z`).toISOString();
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function blockToHtml(block) {
  const text = htmlEscape(block.text || "");
  switch (block.type) {
    case "heading":
      return `<h2>${text}</h2>`;
    case "code":
      return `<pre><code>${text}</code></pre>`;
    case "callout":
      return `<blockquote>${block.label ? `<strong>${htmlEscape(block.label)}: </strong>` : ""}${text}</blockquote>`;
    case "intro":
    case "text":
    default:
      return `<p>${text}</p>`;
  }
}

function blockToText(block) {
  const prefix = block.label ? `${block.label}: ` : "";
  return `${prefix}${block.text || ""}`;
}

const items = [...blogs]
  .sort((a, b) => {
    const da = new Date(getIsoDate(a.date)).getTime();
    const db = new Date(getIsoDate(b.date)).getTime();
    return db - da;
  })
  .map((post) => {
    const link = `${SITE_URL}/blogs/${post.slug || post.id}`;
    const date = getIsoDate(post.date);
    const html = (post.content || []).map(blockToHtml).join("\n");
    const text = (post.content || [])
      .map(blockToText)
      .filter(Boolean)
      .join("\n\n");
    return {
      id: link,
      url: link,
      title: post.title,
      content_html: html,
      content_text: text,
      summary: post.excerpt,
      date_published: date,
      tags: post.tags || [],
    };
  });

const feed = {
  version: "https://jsonfeed.org/version/1.1",
  title: "Neelesh Yadav — Engineering Blog",
  home_page_url: `${SITE_URL}/blogs`,
  feed_url: `${SITE_URL}/feed.json`,
  description:
    "Engineering write-ups on React Native, React, performance, real-time systems, and shipping production mobile + web apps.",
  language: "en-us",
  authors: [{ name: "Neelesh Yadav", url: SITE_URL }],
  items,
};

const outPath = join(repoRoot, "public", "feed.json");
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(feed, null, 2));
console.log(`Generated feed.json with ${items.length} posts`);
