import type { ErrorInfo } from "react";

/**
 * Truly-optional Sentry forwarder. We don't import the SDK as a dependency —
 * if you want Sentry, drop the loader script in index.html:
 *
 *   <script
 *     src="https://browser.sentry-cdn.com/8/bundle.tracing.min.js"
 *     crossorigin="anonymous"
 *   ></script>
 *   <script>
 *     Sentry.init({ dsn: '...', environment: 'production', tracesSampleRate: 0.1 });
 *   </script>
 *
 * Once loaded, `window.Sentry` exists and reportError() forwards to it.
 * Without it, errors stay in the console (dev) or are silently dropped (prod),
 * the ErrorBoundary still renders its graceful fallback either way.
 */

interface MinimalSentry {
  captureException: (
    error: unknown,
    context?: { contexts?: { react?: { componentStack?: string | null } } },
  ) => string;
}

declare global {
  interface Window {
    Sentry?: MinimalSentry;
  }
}

export function reportError(error: Error, info?: ErrorInfo): void {
  if (typeof window !== "undefined" && window.Sentry) {
    window.Sentry.captureException(error, {
      contexts: info
        ? { react: { componentStack: info.componentStack } }
        : undefined,
    });
    return;
  }
  if (import.meta.env.DEV) {
    console.error("[reportError]", error, info);
  }
}
