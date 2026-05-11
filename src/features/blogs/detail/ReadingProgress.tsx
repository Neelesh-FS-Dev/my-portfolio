import { memo, useEffect, useState } from "react";

/**
 * A thin accent-coloured bar fixed to the top of the viewport that tracks
 * how far the reader has scrolled through the article. Throttled to one
 * update per animation frame so it doesn't add scroll-handler cost.
 */
function ReadingProgressBase() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const compute = () => {
      rafId = null;
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(next);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 800,
        background: "rgba(255,255,255,0.04)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, var(--accent), #60a5fa)",
          boxShadow: "0 0 12px rgba(59,130,246,0.35)",
          transition: "width 0.08s linear",
          willChange: "width",
        }}
      />
    </div>
  );
}

export default memo(ReadingProgressBase);
