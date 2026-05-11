import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Adapted from a 21st.dev demo using @paper-design/shaders-react. Slots
 * behind any section as a richer alternative to a flat background.
 *
 * Palette is aligned to the project's single-blue-accent theme. A radial
 * vignette mask focuses the eye toward the center and hides harsh edges.
 * Honors prefers-reduced-motion by pausing the shader.
 */
interface BackgroundMeshGradientProps {
  className?: string;
  speed?: number;
  zIndex?: number;
}

export default function BackgroundMeshGradient({
  className = "",
  speed = 0.9,
  zIndex = 0,
}: BackgroundMeshGradientProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const vignette =
    "radial-gradient(ellipse at center, black 35%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        pointerEvents: "none",
        overflow: "hidden",
        maskImage: vignette,
        WebkitMaskImage: vignette,
        opacity: 0.85,
      }}
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#000000", "#0a1530", "#1e3a8a", "#3b82f6"]}
        speed={reduced ? 0 : speed}
        distortion={0.85}
        swirl={0.6}
      />
    </div>
  );
}
