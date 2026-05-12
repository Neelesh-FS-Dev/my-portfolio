import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

const STYLE_TAG_ID = "spotlight-card-styles";
const SPOTLIGHT_CSS = `
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

const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

interface SpotlightCardProps {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SpotlightCard({
  children,
  accentColor = "#3b82f6",
  className,
  style,
}: SpotlightCardProps) {
  useEffect(() => {
    ensureSpotlightStyles();
  }, []);

  const glowOpacity = useSpring(0, GLOW_SPRING);

  return (
    <div
      className={`spotlight-card ${className ?? ""}`.trim()}
      onMouseEnter={() => glowOpacity.set(1)}
      onMouseLeave={() => glowOpacity.set(0)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
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

      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      {/* Bottom accent line on hover */}
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
    </div>
  );
}
