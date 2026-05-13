import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "resume_download"
  | "project_click"
  | "contact_submit"
  | "outbound_click";

type Primitive = string | number | boolean | null;

export function trackEvent(
  name: AnalyticsEvent,
  props?: Record<string, Primitive>,
): void {
  try {
    track(name, props);
  } catch {
    // Never let analytics break the UI.
  }
}

const SITE_HOSTS = new Set([
  "neeleshyadav.vercel.app",
  "localhost",
  "127.0.0.1",
]);

export function trackOutbound(
  href: string,
  label: string,
  surface: string,
): void {
  if (!href) return;
  let host = "";
  try {
    host = new URL(href, window.location.origin).host;
  } catch {
    return;
  }
  if (!host || SITE_HOSTS.has(host)) return;
  trackEvent("outbound_click", { href, label, host, surface });
}
