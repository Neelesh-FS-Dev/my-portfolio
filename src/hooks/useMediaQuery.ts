import { useState, useEffect } from "react";

const QUERY_MOBILE = "(max-width: 767px)";
const QUERY_TABLET = "(max-width: 1023px)";
const QUERY_SMALL = "(max-width: 479px)";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery(QUERY_MOBILE);
}
export function useIsTablet(): boolean {
  return useMediaQuery(QUERY_TABLET);
}
export function useIsSmall(): boolean {
  return useMediaQuery(QUERY_SMALL);
}
