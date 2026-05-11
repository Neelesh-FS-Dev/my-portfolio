import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Inject hover rules once at module level instead of per-card <style>. */
const STYLE_TAG_ID = "spotlight-card-styles";
const SPOTLIGHT_CSS = `
  .spotlight-card:hover .spotlight-shimmer {
    transform: translateX(280%) skewX(-12deg);
  }
  .spotlight-card:hover .spotlight-bottomline {
    width: 100%;
  }
`;
function ensureSpotlightStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_TAG_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_TAG_ID;
  el.textContent = SPOTLIGHT_CSS;
  document.head.appendChild(el);
}

/**
 * Adapted from a 21st.dev / kokonut-ui SpotlightCards feature grid. Stripped
 * the icon-card content and exposed a wrapper that adds the spotlight effects
 * (magnetic 3D tilt, focus-dim siblings, accent tint, hover glow, shimmer,
 * bottom-line accent) around arbitrary children — so the existing
 * ProjectCard content can keep all its rich info.
 *
 * Sibling dimming requires the parent to track a single hoveredKey and pass
 * `dimmed` + hover callbacks down to each card.
 */
const TILT_MAX = 8;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

interface SpotlightCardProps {
  children: ReactNode;
  accentColor?: string;
  dimmed?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function SpotlightCard({
  children,
  accentColor = "#3b82f6",
  dimmed = false,
  onHoverStart,
  onHoverEnd,
  className,
  style,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureSpotlightStyles();
  }, []);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);
  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseEnter = () => {
    glowOpacity.set(1);
    onHoverStart?.();
  };
  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    onHoverEnd?.();
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className ?? ""}`.trim()}
      animate={{ scale: dimmed ? 0.97 : 1, opacity: dimmed ? 0.55 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        rotateX,
        rotateY,
        transformPerspective: 900,
        borderRadius: 16,
        overflow: "hidden",
        willChange: "transform",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Static accent tint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 0,
          background: `radial-gradient(ellipse at 20% 20%, ${accentColor}14, transparent 65%)`,
        }}
      />

      {/* Hover glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 0,
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${accentColor}33, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="spotlight-shimmer"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "55%",
          pointerEvents: "none",
          transform: "translateX(-110%) skewX(-12deg)",
          transition: "transform 0.7s ease-out",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
          zIndex: 1,
        }}
      />

      {/* Children — sit above all effects, stretch to fill card height */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>

      {/* Bottom accent line */}
      <div
        aria-hidden="true"
        className="spotlight-bottomline"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: 0,
          borderRadius: 2,
          pointerEvents: "none",
          transition: "width 0.5s ease",
          background: `linear-gradient(to right, ${accentColor}cc, transparent)`,
          zIndex: 3,
        }}
      />

    </motion.div>
  );
}
