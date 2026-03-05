import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data";
import { useIsMobile, useIsTablet, useIsSmall } from "../hooks/useMediaQuery";

const accentMap = {
  cyan: "var(--accent)",
  purple: "var(--accent2)",
  orange: "var(--accent3)",
  green: "var(--green)",
};

/* ── STORE BUTTONS ─────────────────────────────────────────────── */
function StoreButtons({ project, accentColor, isSmall }) {
  const hasStore =
    project.appStoreUrl || project.playStoreUrl || project.liveUrl;
  if (!hasStore || project.type === "web") return null;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
      {project.appStoreUrl && (
        <a
          href={project.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "#000",
            border: "1px solid rgba(255,255,255,0.15)",
            textDecoration: "none",
            transition: "all .25s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          {/* Apple icon */}
          <svg
            width={isSmall ? 18 : 22}
            height={isSmall ? 18 : 22}
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              DOWNLOAD ON THE
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: isSmall ? 13 : 15,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              App Store
            </div>
          </div>
        </a>
      )}

      {project.playStoreUrl && (
        <a
          href={project.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "#000",
            border: "1px solid rgba(255,255,255,0.15)",
            textDecoration: "none",
            transition: "all .25s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          {/* Play Store icon */}
          <svg
            width={isSmall ? 18 : 22}
            height={isSmall ? 18 : 22}
            viewBox="0 0 24 24"
            fill="none"
          >
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
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              GET IT ON
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: isSmall ? 13 : 15,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              Google Play
            </div>
          </div>
        </a>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: isSmall ? "10px 16px" : "12px 22px",
            borderRadius: 14,
            background: "transparent",
            border: `1px solid ${accentColor}35`,
            textDecoration: "none",
            transition: "all .25s",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: isSmall ? 13 : 14,
            color: accentColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${accentColor}12`;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🌐 Visit Website ↗
        </a>
      )}
    </div>
  );
}

/* ── PHONE SCREEN PLACEHOLDER ─────────────────────────────────── */
function AppScreenshot({ screenshot, accentColor, index }) {
  const [imgError, setImgError] = useState(false);
  const isSmall = useIsSmall();

  // Each project should place images in /public/screenshots/<id>.jpg
  // e.g. /public/screenshots/soul33-1.jpg
  const src = `/screenshots/${screenshot.id}.jpg`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: isSmall ? 130 : 150,
          aspectRatio: "9/16",
          borderRadius: 24,
          border: "2px solid rgba(255,255,255,0.1)",
          background: "var(--surface2)",
          overflow: "hidden",
          position: "relative",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)`,
          transition: "transform .3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-8px) scale(1.02)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0) scale(1)")
        }
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
            <div style={{ fontSize: 28, opacity: 0.5 }}>📱</div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--text3)",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              Add screenshot
              <br />
              <span style={{ color: accentColor, fontSize: 8 }}>
                {screenshot.id}.jpg
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

/* ── VIDEO SECTION ────────────────────────────────────────────── */
function VideoSection({ project, accentColor }) {
  const [videoUrl, setVideoUrl] = useState(project.videoUrl || "");
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  // Convert YouTube / Loom URL to embed
  const getEmbedUrl = (url) => {
    if (!url) return null;
    // YouTube
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    if (ytMatch)
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
    // Loom
    const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
    if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`;
    // Direct MP4 or other iframe-able URL
    if (url.startsWith("http")) return url;
    return null;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);

  return (
    <div style={{ marginBottom: 60 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: isSmall ? 20 : 24,
          marginBottom: 8,
        }}
      >
        App Demo
      </h2>
      <p
        style={{
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          marginBottom: 24,
        }}
      >
        Watch the app in action
      </p>

      {embedUrl ? (
        /* Video player */
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${accentColor}25`,
            background: "#000",
            aspectRatio: "16/9",
            position: "relative",
            boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${accentColor}10`,
          }}
        >
          <iframe
            src={embedUrl}
            title={`${project.title} demo`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        /* Placeholder — shows how to add a video */
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `1px dashed ${accentColor}30`,
            background: `linear-gradient(135deg, ${accentColor}06 0%, var(--surface) 100%)`,
            aspectRatio: "16/9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            ▶
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: isSmall ? 14 : 16,
                marginBottom: 8,
              }}
            >
              Add App Demo Video
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                lineHeight: 1.6,
              }}
            >
              Paste a YouTube or Loom URL in{" "}
              <code
                style={{
                  color: accentColor,
                  background: `${accentColor}12`,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                resume.js → videoUrl
              </code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SCREENSHOTS SECTION ──────────────────────────────────────── */
function ScreenshotsSection({ project, accentColor }) {
  const isSmall = useIsSmall();
  const isMobile = useIsMobile();

  return (
    <div style={{ marginBottom: 60 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: isSmall ? 20 : 24,
          marginBottom: 8,
        }}
      >
        App Screenshots
      </h2>
      <p
        style={{
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          marginBottom: 28,
        }}
      >
        Place 9:16 images in{" "}
        <code
          style={{
            color: accentColor,
            background: `${accentColor}12`,
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          public/screenshots/
        </code>
      </p>

      {/* Horizontally scrollable on mobile, 4-col grid on desktop */}
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          gridTemplateColumns: isMobile ? undefined : "repeat(4, 1fr)",
          gap: isSmall ? 12 : 20,
          overflowX: isMobile ? "auto" : "visible",
          paddingBottom: isMobile ? 12 : 0,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {project.screenshots.map((shot, i) => (
          <AppScreenshot
            key={shot.id}
            screenshot={shot}
            accentColor={accentColor}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

/* ── MAIN PAGE ────────────────────────────────────────────────── */
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmall = useIsSmall();

  if (!project)
    return (
      <div style={{ paddingTop: 200, textAlign: "center" }}>
        <p style={{ color: "var(--text2)", marginBottom: 24 }}>
          Project not found
        </p>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );

  const accentColor = accentMap[project.accent] || project.color;

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <section
        style={{
          padding: isMobile ? "36px 0 48px" : "52px 0 64px",
          background: `linear-gradient(180deg, ${project.color}08 0%, var(--bg) 100%)`,
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
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.color}0a 0%, transparent 70%)`,
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
              onMouseEnter={(e) => (e.target.style.color = accentColor)}
              onMouseLeave={(e) => (e.target.style.color = "var(--text3)")}
            >
              ← Projects
            </button>
            <span>/</span>
            <span style={{ color: accentColor }}>{project.title}</span>
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
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                  background: accentColor + "10",
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
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 8,
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h1>
              <p
                style={{
                  color: accentColor,
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
                  { v: project.users, l: "Users" },
                  { v: project.rating + " ⭐", l: "Rating" },
                  { v: project.screens + "+", l: "Screens" },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isSmall ? 20 : 26,
                        fontWeight: 800,
                        color: accentColor,
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
                      border: "1px solid var(--border-bright)",
                      background: "rgba(255,255,255,0.03)",
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

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {/* Video Demo */}
          {/* <VideoSection project={project} accentColor={accentColor} /> */}

          {/* App Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <ScreenshotsSection project={project} accentColor={accentColor} />
          )}

          <div className="divider" style={{ marginBottom: 52 }} />

          {/* About + Highlights */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
              gap: isMobile ? 40 : 56,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: isSmall ? 20 : 24,
                  marginBottom: 18,
                }}
              >
                About the Project
              </h2>
              {project.longDescription.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--text2)",
                    lineHeight: 1.85,
                    marginBottom: 16,
                    fontSize: isSmall ? 14 : 15,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isSmall ? 17 : 20,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Key Highlights
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      padding: "12px 14px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  >
                    <span
                      style={{
                        color: accentColor,
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      ▸
                    </span>
                    <span
                      style={{
                        color: "var(--text2)",
                        fontSize: isSmall ? 12 : 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other projects */}
          <div style={{ marginTop: 72 }}>
            <div className="divider" style={{ marginBottom: 44 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isSmall ? 18 : 22,
                  fontWeight: 700,
                }}
              >
                Other Projects
              </h3>
              <Link
                to="/projects"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--accent)",
                }}
              >
                View All →
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmall
                  ? "1fr"
                  : isMobile
                    ? "1fr 1fr"
                    : "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {projects
                .filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((p) => {
                  const c = accentMap[p.accent] || p.color;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/projects/${p.id}`);
                        window.scrollTo(0, 0);
                      }}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 16,
                        padding: isSmall ? 18 : 22,
                        cursor: "pointer",
                        transition: "all .3s",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = c + "40";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: isSmall ? 15 : 17,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: c,
                          marginBottom: 10,
                        }}
                      >
                        {p.subtitle}
                      </div>
                      <p
                        style={{
                          color: "var(--text2)",
                          fontSize: 13,
                          lineHeight: 1.6,
                        }}
                      >
                        {p.description.slice(0, 80)}...
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
