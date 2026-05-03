import { memo, useState } from "react";
import type { Screenshot } from "../types";
import { useIsSmall } from "../../../shared/hooks/useMediaQuery";
import { FiSmartphone } from "react-icons/fi";

export interface AppScreenshotProps {
  screenshot: Screenshot;
  accentColor: string;
  index: number;
  onOpen?: (index: number) => void;
}

function AppScreenshot({
  screenshot,
  accentColor,
  index,
  onOpen,
}: AppScreenshotProps) {
  const [imgError, setImgError] = useState(false);
  const isSmall = useIsSmall();

  // Each project should place images in /public/screenshots/<id>.jpg
  // e.g. /public/screenshots/soul33-1.jpg
  const src = screenshot.url || "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        cursor: "pointer",
      }}
      onClick={() => onOpen && onOpen(index)}
    >
      {/* Phone frame */}
      <div
        style={{
          width: isSmall ? 130 : 150,
          // aspectRatio: "9/16",
          borderRadius: 24,
          border: "2px solid rgba(255,255,255,0.1)",
          background: "var(--surface2)",
          overflow: "hidden",
          position: "relative",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)`,
          transition: "transform .3s ease, box-shadow .3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
          e.currentTarget.style.boxShadow = `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)`;
        }}
      >
        {/* Top notch */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 48,
            height: 3,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 100,
            zIndex: 10,
          }}
        />

        {!imgError ? (
          <img
            src={src}
            alt={screenshot.label}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : (
          /* Placeholder when no image uploaded yet */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(160deg, ${accentColor}18 0%, var(--surface2) 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: 16,
            }}
          >
            <FiSmartphone size={28} style={{ opacity: 0.4 }} />
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--text3)",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              Add screenshot URL
              <br />
              <span style={{ color: accentColor, fontSize: 8 }}>
                {screenshot.label}
              </span>
            </div>
          </div>
        )}

        {/* Screen glare */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "45%",
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--text3)",
          textAlign: "center",
        }}
      >
        {screenshot.label}
      </span>
    </div>
  );
}

export default memo(AppScreenshot);
