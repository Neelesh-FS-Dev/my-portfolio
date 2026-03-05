import { useNavigate } from "react-router-dom";
import { useIsMobile, useIsTablet } from "../hooks/useMediaQuery";
import PhoneMockup from "./PhoneMockup";

const accentMap = {
  cyan: "var(--accent)",
  purple: "var(--accent2)",
  orange: "var(--accent3)",
  green: "var(--green)",
};

/* Minimal browser window mockup for web projects */
function BrowserMockup({ color }) {
  return (
    <div
      style={{
        width: 280,
        height: 200,
        borderRadius: 14,
        overflow: "hidden",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "var(--surface2)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 32,
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 12px",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
          />
        ))}
        <div
          style={{
            flex: 1,
            height: 16,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 100,
            marginLeft: 8,
          }}
        />
      </div>
      {/* Content */}
      <div
        style={{
          padding: 16,
          background: `linear-gradient(135deg, ${color}10 0%, var(--surface2) 100%)`,
          height: "calc(100% - 32px)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            height: 28,
            background: `${color}20`,
            borderRadius: 8,
            width: "60%",
          }}
        />
        {[100, 80, 90].map((w, i) => (
          <div
            key={i}
            style={{
              height: 8,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 4,
              width: `${w}%`,
            }}
          />
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 52,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, featured = false }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const accentColor = accentMap[project.accent] || project.color;
  const isWeb = project.type === "web";
  const showFeatured = featured && !isMobile && !isTablet;

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.35s ease",
        position: "relative",
        display: showFeatured ? "grid" : "flex",
        gridTemplateColumns: showFeatured ? "1fr 1fr" : undefined,
        flexDirection: showFeatured ? undefined : "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor + "40";
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 20px 50px ${accentColor}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg,transparent,${accentColor},transparent)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: showFeatured ? "36px 40px" : isMobile ? "20px" : "26px",
          display: "flex",
          flexDirection: "column",
          gap: 13,
        }}
      >
        {/* Type badge + rating */}
        <div
          style={{
            display: "flex",
            gap: 7,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
              background: accentColor + "10",
            }}
          >
            {isWeb ? "🌐" : "📱"} {project.category}
          </span>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--accent)",
              border: "1px solid rgba(0,229,255,0.2)",
              background: "rgba(0,229,255,0.05)",
            }}
          >
            ⭐ {project.rating}
          </span>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: showFeatured ? 28 : isMobile ? 19 : 21,
              letterSpacing: "-0.02em",
              marginBottom: 3,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              color: accentColor,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.05em",
            }}
          >
            {project.subtitle}
          </p>
        </div>

        <p
          style={{
            color: "var(--text2)",
            fontSize: isMobile ? 13 : 14,
            lineHeight: 1.7,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {project.stack.slice(0, showFeatured ? 5 : 3).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "3px 9px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text3)",
                border: "1px solid var(--border)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: isMobile ? 14 : 18 }}>
          {[
            { v: project.users, l: "Users" },
            {
              v: isWeb
                ? project.screens + " pages"
                : project.screens + "+ screens",
              l: isWeb ? "Pages" : "Screens",
            },
          ].map((s) => (
            <div key={s.l}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? 17 : 19,
                  fontWeight: 800,
                  color: accentColor,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--text3)",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Store badges */}
        {project.type === "mobile" &&
          (project.appStoreUrl || project.playStoreUrl) && (
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 4,
              }}
            >
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 10px",
                    borderRadius: 8,
                    background: "#000",
                    border: "1px solid rgba(255,255,255,0.12)",
                    textDecoration: "none",
                    transition: "opacity .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = ".8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#fff",
                    }}
                  >
                    App Store
                  </span>
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 10px",
                    borderRadius: 8,
                    background: "#000",
                    border: "1px solid rgba(255,255,255,0.12)",
                    textDecoration: "none",
                    transition: "opacity .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = ".8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3.18 23.76c.3.17.64.24.99.2l12.52-11.5L13.44 9.2 3.18 23.76z"
                      fill="#EA4335"
                    />
                    <path
                      d="M20.54 10.27L17.38 8.5l-3.94 3.96 3.94 3.96 3.19-1.8c.91-.51.91-1.84-.03-2.35z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M3.18.24C2.82.6 2.6 1.17 2.6 1.9v20.2c0 .73.22 1.3.58 1.66l.09.08 11.32-11.32v-.27L3.27.16l-.09.08z"
                      fill="#4285F4"
                    />
                    <path
                      d="M16.7 12.46L13.44 9.2 3.18.24c.44-.25.97-.27 1.44-.03l12.08 6.84-3.94 3.96 3.94-.55z"
                      fill="#34A853"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#fff",
                    }}
                  >
                    Google Play
                  </span>
                </a>
              )}
            </div>
          )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: accentColor,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            marginTop: "auto",
          }}
        >
          View Case Study <span>→</span>
        </div>
      </div>

      {/* Mockup panel — featured only */}
      {showFeatured && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            background: `radial-gradient(circle at center,${accentColor}08 0%,transparent 70%)`,
          }}
        >
          {isWeb ? (
            <BrowserMockup color={accentColor} />
          ) : (
            <PhoneMockup color={project.color} />
          )}
        </div>
      )}
    </div>
  );
}
