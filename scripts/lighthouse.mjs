#!/usr/bin/env node
/**
 * Runs Lighthouse against the production build for the key routes and
 * prints a one-line summary per route. Requires Google Chrome installed
 * (Brave's headless mode trips its safe-browsing interstitial and won't work).
 *
 *   yarn build && yarn lighthouse
 *
 * Pass --mobile to use the mobile preset; default is desktop.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as wait } from "node:timers/promises";

const PORT = 4321;
const ROUTES = ["/", "/projects", "/experience", "/blogs", "/contact"];
const MOBILE = process.argv.includes("--mobile");

const tmp = mkdtempSync(join(tmpdir(), "lh-"));

function serveStart() {
  const child = spawn(
    "npx",
    ["--yes", "serve@latest", "dist", "-l", String(PORT), "--no-clipboard", "--single"],
    { stdio: "ignore" },
  );
  return child;
}

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/`);
      if (res.ok) return;
    } catch {}
    await wait(500);
  }
  throw new Error("Server did not start in time");
}

function runLighthouse(route) {
  return new Promise((resolve, reject) => {
    const out = join(tmp, `lh${route.replace(/\W+/g, "_") || "_root"}.json`);
    const args = [
      "--yes",
      "lighthouse@latest",
      `http://localhost:${PORT}${route}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--chrome-flags=--headless=new --disable-gpu",
      MOBILE ? "--form-factor=mobile" : "--preset=desktop",
      "--output=json",
      `--output-path=${out}`,
      "--quiet",
    ];
    const child = spawn("npx", args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code !== 0) return reject(new Error(`lighthouse exited ${code}`));
      try {
        const report = JSON.parse(readFileSync(out, "utf8"));
        resolve(report);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function fmt(report) {
  const c = report.categories;
  const a = report.audits;
  const score = (k) => Math.round(c[k].score * 100);
  return {
    perf: score("performance"),
    a11y: score("accessibility"),
    bp: score("best-practices"),
    seo: score("seo"),
    lcp: a["largest-contentful-paint"].displayValue,
    cls: a["cumulative-layout-shift"].displayValue,
    tbt: a["total-blocking-time"].displayValue,
    fcp: a["first-contentful-paint"].displayValue,
  };
}

const server = serveStart();
try {
  await waitForServer();
  const results = [];
  for (const route of ROUTES) {
    process.stdout.write(`▶  ${route}\n`);
    try {
      const report = await runLighthouse(route);
      results.push({ route, ...fmt(report) });
    } catch (err) {
      results.push({ route, error: err.message });
    }
  }
  console.log("\n=== Lighthouse summary (" + (MOBILE ? "mobile" : "desktop") + ") ===");
  for (const r of results) {
    if (r.error) {
      console.log(`${r.route.padEnd(14)} ✗ ${r.error}`);
      continue;
    }
    console.log(
      `${r.route.padEnd(14)}  Perf ${String(r.perf).padStart(3)}  A11y ${String(r.a11y).padStart(3)}  BP ${String(r.bp).padStart(3)}  SEO ${String(r.seo).padStart(3)}  | LCP ${r.lcp}  CLS ${r.cls}  TBT ${r.tbt}`,
    );
  }
} finally {
  server.kill();
  rmSync(tmp, { recursive: true, force: true });
}
