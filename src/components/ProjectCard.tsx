import { memo, useCallback, useMemo } from "react";
import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile, useIsTablet } from "../hooks/useMediaQuery";
import PhoneMockup from "./PhoneMockup";
import { FiSmartphone, FiMonitor, FiGithub } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import type { Project } from "../types";

interface BrowserMockupProps {
  color: string;
}

function BrowserMockupBase({ color }: BrowserMockupProps) {
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

const BrowserMockup = memo(BrowserMockupBase);

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const accentColor = "var(--accent)";
  const isWeb = useMemo(() => project.type === "web", [project.type]);
  const showFeatured = useMemo(
    () => featured && !isMobile && !isTablet,
    [featured, isMobile, isTablet],
  );

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      const t = e.currentTarget as HTMLElement;
      t.style.borderColor = "rgba(59,130,246,0.35)";
      t.style.transform = "translateY(-3px)";
      t.style.boxShadow =
        "0 18px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.1)";
    },
    [],
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      const t = e.currentTarget as HTMLElement;
      t.style.borderColor = "var(--border)";
      t.style.transform = "translateY(0)";
      t.style.boxShadow = "none";
    },
    [],
  );

  const handleClick = useCallback(
    () => navigate(`/projects/${project.id}`),
    [navigate, project.id],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigate(`/projects/${project.id}`);
      }
    },
    [navigate, project.id],
  );

  const cardStyle = useMemo(
    () => ({
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.25s ease",
      position: "relative" as const,
      display: showFeatured ? "grid" : "flex",
      gridTemplateColumns: showFeatured ? "1fr 1fr" : undefined,
      flexDirection: showFeatured ? undefined : ("column" as const),
      height: "100%",
    }),
    [showFeatured],
  );

  const stopPropagation = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <article
      className="interactive-card"
      role="link"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div
        style={{
          padding: showFeatured ? "36px 40px" : isMobile ? "20px" : "26px",
          display: "flex",
          flexDirection: "column",
          gap: 13,
          flex: 1,
        }}
      >
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
              color: "var(--text2)",
              border: "1px solid var(--border)",
              background: "transparent",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {isWeb ? <FiMonitor size={11} /> : <FiSmartphone size={11} />}
            {project.category}
          </span>
          {project.rating && (
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "transparent",
              }}
            >
              <AiFillStar
                size={12}
                style={{ color: "#f59e0b", verticalAlign: "middle" }}
              />{" "}
              {project.rating}
            </span>
          )}
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: showFeatured ? 28 : isMobile ? 19 : 21,
              letterSpacing: "-0.02em",
              marginBottom: 3,
              color: "var(--text)",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              color: "var(--text3)",
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
            display: "-webkit-box",
            WebkitLineClamp: showFeatured ? 4 : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {project.stack.slice(0, showFeatured ? 5 : 3).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "3px 9px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "var(--bg2)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

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
                  fontWeight: 700,
                  color: "var(--text)",
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

        {((project.type === "mobile" &&
          (project.appStoreUrl || project.playStoreUrl)) ||
          project.githubUrl) && (
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
                onClick={stopPropagation}
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
                onClick={stopPropagation}
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
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.12)",
                  textDecoration: "none",
                  transition: "opacity .2s",
                }}
              >
                <FiGithub size={13} color="#fff" />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 11,
                    color: "#fff",
                  }}
                >
                  GitHub
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
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            marginTop: "auto",
          }}
        >
          View Case Study <span>→</span>
        </div>
      </div>

      {showFeatured && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            background: "var(--bg2)",
            borderLeft: "1px solid var(--border)",
          }}
        >
          {isWeb ? (
            <BrowserMockup color="#3b82f6" />
          ) : (
            <PhoneMockup color={project.color} />
          )}
        </div>
      )}
    </article>
  );
}

export default memo(ProjectCard);
