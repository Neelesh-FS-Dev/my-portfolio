import { useState, useEffect, useMemo } from "react";

// Memoize query strings to prevent unnecessary re-renders
const QUERY_MOBILE = "(max-width: 767px)";
const QUERY_TABLET = "(max-width: 1023px)";
const QUERY_SMALL = "(max-width: 479px)";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

// Convenience hooks with memoized query strings
export function useIsMobile() {
  return useMediaQuery(QUERY_MOBILE);
}
export function useIsTablet() {
  return useMediaQuery(QUERY_TABLET);
}
export function useIsSmall() {
  return useMediaQuery(QUERY_SMALL);
}
