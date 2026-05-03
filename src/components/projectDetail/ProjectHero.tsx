import { useNavigate } from "react-router-dom";
import type { Project } from "../../types";
import { useIsMobile, useIsTablet, useIsSmall } from "../../hooks/useMediaQuery";
import { FiUsers, FiMonitor } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import StoreButtons from "./StoreButtons";

export interface ProjectHeroProps {
  project: Project;
  accentColor: string;
}

export default function ProjectHero({ project, accentColor }: ProjectHeroProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmall = useIsSmall();

  return (
    <section
      style={{
        padding: isMobile ? "36px 0 48px" : "52px 0 64px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text3)",
            flexWrap: "wrap",
          }}
        >
          <button
            aria-label="Back to projects"
            onClick={() => navigate("/projects")}
            style={{
              color: "var(--text3)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              background: "none",
              border: "none",
              transition: "color .2s",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text3)")
            }
          >
            ← Projects
          </button>
          <span>/</span>
          <span style={{ color: "var(--text2)" }}>{project.title}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: isTablet ? 28 : 48,
            alignItems: "flex-start",
            flexWrap: isTablet ? "wrap" : "nowrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "transparent",
                display: "inline-block",
                marginBottom: 14,
              }}
            >
              {project.category}
            </span>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isSmall
                  ? "28px"
                  : isMobile
                    ? "36px"
                    : "clamp(36px, 5vw, 58px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: 8,
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                color: "var(--text3)",
                fontFamily: "var(--font-mono)",
                fontSize: isSmall ? 12 : 14,
                marginBottom: 22,
              }}
            >
              {project.subtitle}
            </p>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: isSmall ? 16 : 28,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  v: (
                    <>
                      <FiUsers size={17} style={{ marginRight: 4 }} />
                      {project.users}
                    </>
                  ),
                  l: "Users",
                },
                ...(project.rating
                  ? [
                      {
                        v: (
                          <>
                            <AiFillStar
                              size={17}
                              style={{
                                color: "#f59e0b",
                                marginRight: 4,
                              }}
                            />
                            {project.rating}
                          </>
                        ),
                        l: "Rating",
                      },
                    ]
                  : []),
                {
                  v: (
                    <>
                      <FiMonitor size={17} style={{ marginRight: 4 }} />
                      {project.screens}+
                    </>
                  ),
                  l: "Screens",
                },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isSmall ? 20 : 26,
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 0,
              }}
            >
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 100,
                    fontFamily: "var(--font-mono)",
                    fontSize: isSmall ? 10 : 12,
                    color: "var(--text2)",
                    border: "1px solid var(--border)",
                    background: "var(--bg2)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* ── App Store / Play Store buttons ── */}
            <StoreButtons
              project={project}
              accentColor={accentColor}
              isSmall={isSmall}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
