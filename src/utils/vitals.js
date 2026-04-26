/**
 * Core Web Vitals Tracking Utility
 * Monitors and reports LCP, FID/INP, and CLS metrics
 * Helps identify performance bottlenecks and improve user experience
 */

export function reportWebVitals(metric) {
  // Send to Google Analytics if available
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "web_vitals",
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[web-vitals] ${metric.name}:`, metric.value, "ms");
  }
}

export function initWebVitals() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  try {
    // LCP - Largest Contentful Paint (should be < 2.5s)
    let lcpObserver;
    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
        const isGood = lcpValue < 2500;

        reportWebVitals({
          name: isGood ? "LCP" : "LCP needs improvement",
          value: lcpValue,
          id: "lcp",
          delta: lcpValue,
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("LCP tracking not supported:", e.message);
    }

    // FID / INP - First Input Delay / Interaction to Next Paint
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidValue = entry.processingDuration;
          const isGood = fidValue < 100;

          reportWebVitals({
            name: isGood ? "FID" : "FID needs improvement",
            value: fidValue,
            id: `fid-${entry.name}`,
            delta: fidValue,
          });
        }
      }).observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.warn("FID tracking not supported:", e.message);
    }

    // CLS - Cumulative Layout Shift (should be < 0.1)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            const isGood = clsValue < 0.1;

            reportWebVitals({
              name: isGood ? "CLS" : "CLS needs improvement",
              value: clsValue,
              id: "cls",
              delta: entry.value,
            });
          }
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("CLS tracking not supported:", e.message);
    }

    // Navigation Timing
    if (window.performance && window.performance.timing) {
      window.addEventListener("load", () => {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        const loadTime = timing.loadEventEnd - navigationStart;
        const domContentLoaded =
          timing.domContentLoadedEventEnd - navigationStart;

        reportWebVitals({
          name: "Page Load Time",
          value: loadTime,
          id: "load-time",
          delta: loadTime,
        });

        reportWebVitals({
          name: "DOM Content Loaded",
          value: domContentLoaded,
          id: "dom-content-loaded",
          delta: domContentLoaded,
        });
      });
    }
  } catch (e) {
    console.warn("Web Vitals initialization error:", e.message);
  }
}

/**
 * Usage in main.jsx:
 *
 * import { initWebVitals } from './utils/vitals.js';
 *
 * // After React app mounts
 * initWebVitals();
 */
