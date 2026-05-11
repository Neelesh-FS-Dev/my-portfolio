import { useEffect } from "react";

/**
 * Privacy-friendly analytics via Plausible. Loads only when the
 * VITE_PLAUSIBLE_DOMAIN env var is set at build time — so local dev and
 * preview builds without the env are silent.
 *
 * Configure (in .env.production or your hosting provider):
 *   VITE_PLAUSIBLE_DOMAIN=neeleshyadav.vercel.app
 *   VITE_PLAUSIBLE_SRC=https://plausible.io/js/script.js   (optional)
 */
export default function Plausible() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
    if (!domain) return;

    // Avoid double-mount during HMR.
    if (document.querySelector('script[data-plausible="true"]')) return;

    const src =
      (import.meta.env.VITE_PLAUSIBLE_SRC as string | undefined) ||
      "https://plausible.io/js/script.js";

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.domain = domain;
    script.dataset.plausible = "true";
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
