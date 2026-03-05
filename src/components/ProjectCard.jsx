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
