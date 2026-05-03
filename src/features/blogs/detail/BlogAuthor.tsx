import { memo } from "react";
import { useIsSmall } from "../../hooks/useMediaQuery";
import { getExperience } from "../../utils/getExperience";

function BlogAuthor() {
  const isSmall = useIsSmall();

  return (
    <div
      style={{
        marginTop: 64,
        padding: isSmall ? "20px" : "28px 32px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        display: "flex",
        gap: 20,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          flexShrink: 0,
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 20,
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
      >
        NY
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall ? 15 : 17,
            marginBottom: 4,
          }}
        >
          Neelesh Yadav
        </div>
        <div
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 12 : 14,
            lineHeight: 1.6,
          }}
        >
          React Native Developer with {getExperience("2023-01-01")} years
          building production mobile apps. Writes about performance,
          architecture, and mobile engineering.
        </div>
      </div>
      <a
        href="https://github.com/Neelesh-FS-Dev"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        style={{ fontSize: 13, padding: "10px 18px", flexShrink: 0 }}
      >
        Follow ↗
      </a>
    </div>
  );
}

export default memo(BlogAuthor);
