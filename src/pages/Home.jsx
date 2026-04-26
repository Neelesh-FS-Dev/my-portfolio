import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { personal, skillCategories, techStack, projects } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import PhoneMockup from "../components/PhoneMockup";
import ProjectCard from "../components/ProjectCard";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { skillIconMap } from "../utils/skillIcons";

import { FiMail, FiGithub, FiPhone, FiCheck, FiDownload } from "react-icons/fi";
import SEO, { SITE_URL } from "../components/SEO";
import { degrees, certifications, achievements } from "../data";

const Phone3D = lazy(() => import("../components/Phone3D"));
const GitHubGraph = lazy(() => import("../components/GitHubGraph"));

function getExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years === 0) return `${months} mos`;
  if (months === 0) return `${years} yrs`;
  return `${years} yr ${months} mos`;
}

// Homepage JSON-LD Schema for better SEO
function getHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Neelesh Yadav",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    jobTitle: "React Native & React Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    knowsAbout: [
      "React",
      "React Native",
      "TypeScript",
      "Redux",
      "Firebase",
      "REST APIs",
      "Mobile Development",
      "Web Development",
      "JavaScript",
      "Node.js",
      "Tailwind CSS",
      "App Store",
      "Google Play Store",
    ],
    sameAs: [personal.github, personal.linkedin, personal.instagram].filter(
      Boolean,
    ),
    email: personal.email,
    telephone: personal.phone,
    description: personal.summary,
    alumniOf: degrees.map((deg) => ({
      "@type": "EducationalOrganization",
      name: deg.institution,
    })),
  };
}
/* ── HERO ──────────────────────────────────────────────────────── */
function VisualFallback({ children, style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Hero({ isMobile, isSmall }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: isMobile ? 40 : 48,
        paddingBottom: 40,
      }}
      className="grid-bg"
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: isMobile ? 0 : 48,
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          {/* Available badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              borderRadius: 100,
              marginBottom: isSmall ? 20 : 28,
              border: "1px solid rgba(0,229,255,0.2)",
              background: "rgba(0,229,255,0.05)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--accent)",
              }}
            >
              Available for work
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: isSmall
                ? "34px"
                : isMobile
                  ? "42px"
                  : "clamp(46px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              marginBottom: 16,
            }}
          >
            Mobile & Web
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#00e5ff 0%,#7c4dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              App Developer
            </span>
          </h1>

          {/* Dual role pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                icon: <TbBrandReactNative size={13} />,
                label: "React Native",
                color: "var(--accent)",
                border: "rgba(0,229,255,0.25)",
                bg: "rgba(0,229,255,0.07)",
              },
              {
                icon: <SiReact size={13} />,
                label: "React.js",
                color: "#b39ddb",
                border: "rgba(124,77,255,0.25)",
                bg: "rgba(124,77,255,0.07)",
              },
              {
                icon: <SiTailwindcss size={13} />,
                label: "Tailwind CSS",
                color: "var(--green)",
                border: "rgba(0,255,136,0.25)",
                bg: "rgba(0,255,136,0.07)",
              },
            ].map((t) => (
              <span
                key={t.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 11 : 12,
                  color: t.color,
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                }}
              >
                {t.icon} {t.label}
              </span>
            ))}
          </div>

          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 16,
              lineHeight: 1.78,
              maxWidth: 510,
              marginBottom: isSmall ? 28 : 36,
            }}
          >
            React Native & React Developer with {getExperience("2023-01-01")} of
            experience (including a 6-month internship) building
            high-performance, scalable mobile and web applications. Experienced
            in crafting pixel-perfect UIs, real-time features, and
            production-ready architectures — from App Store & Play Store apps to
            fast, SEO-optimized web platforms.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: isSmall ? 32 : 48,
            }}
          >
            <Link to="/projects" className="btn btn-primary">
              View Projects <span>→</span>
            </Link>
            {personal.resume && (
              <a
                href={personal.resume}
                download
                className="btn btn-outline"
                aria-label="Download resume PDF"
              >
                <FiDownload
                  size={15}
                  style={{ marginRight: 6, verticalAlign: "middle" }}
                />
                Download Resume
              </a>
            )}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isSmall ? "1fr 1fr" : "repeat(4,auto)",
              gap: isSmall ? "14px 20px" : "0 32px",
              width: "fit-content",
            }}
          >
            {[
              { value: personal.stats.mobileApps, label: "Mobile Apps" },
              { value: personal.stats.webProjects, label: "Web Apps" },
              { value: personal.stats.users, label: "Users Served" },
              {
                value: personal.stats.experience + " yrs",
                label: "Experience",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isSmall ? 22 : 26,
                    fontWeight: 800,
                    color: "var(--accent)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone cluster — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Suspense
              fallback={
                <VisualFallback
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0,
                  }}
                >
                  <div
                    style={{
                      transform: "translateX(-20px) rotate(-8deg)",
                      opacity: 0.55,
                      filter: "blur(1px)",
                    }}
                  >
                    <PhoneMockup color="#7c4dff" />
                  </div>
                  <div
                    style={{
                      transform: "translateY(-10px)",
                      position: "relative",
                      marginLeft: -40,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: -20,
                        borderRadius: 56,
                        background:
                          "radial-gradient(circle,rgba(0,229,255,0.15) 0%,transparent 70%)",
                      }}
                    />
                    <PhoneMockup color="#00e5ff" />
                  </div>
                </VisualFallback>
              }
            >
              <Phone3D
                offsetX={-20}
                initialRotateZ={-8}
                floatDelay={0}
                intensity={12}
                style={{ zIndex: 1, opacity: 0.55, filter: "blur(1px)" }}
              >
                <PhoneMockup color="#7c4dff" />
              </Phone3D>
              <Phone3D
                offsetY={-10}
                floatDelay={Math.PI}
                intensity={15}
                style={{ zIndex: 2, position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 56,
                    background:
                      "radial-gradient(circle,rgba(0,229,255,0.15) 0%,transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <PhoneMockup color="#00e5ff" />
              </Phone3D>
            </Suspense>
          </div>
        )}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </section>
  );
}

/* ── ABOUT ─────────────────────────────────────────────────────── */
function About({ isMobile, isSmall }) {
  return (
    <section
      className="section"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 72,
          alignItems: "center",
        }}
      >
        {/* Terminal */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 18px",
              borderBottom: "1px solid var(--border)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                marginLeft: 8,
              }}
            >
              neelesh@dev ~
            </span>
          </div>
          <div
            style={{
              padding: isSmall ? "16px" : "22px",
              fontFamily: "var(--font-mono)",
              fontSize: isSmall ? 11 : 12,
              lineHeight: 1.9,
            }}
          >
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>whoami</span>
            </p>
            <p
              style={{
                color: "var(--text2)",
                paddingLeft: 14,
                marginBottom: 6,
              }}
            >
              Neelesh Yadav — Mobile & Web Dev
            </p>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>cat stack.txt</span>
            </p>
            <div style={{ paddingLeft: 14, marginBottom: 6 }}>
              {[
                {
                  icon: <TbBrandReactNative size={12} />,
                  text: "React Native · Redux · TypeScript",
                  color: "#00e5ff",
                },
                {
                  icon: <SiReact size={12} />,
                  text: "React.js · JavaScript · Vite",
                  color: "#b39ddb",
                },
                {
                  icon: <SiTailwindcss size={12} />,
                  text: "Tailwind CSS · Firebase · Node.js",
                  color: "#00ff88",
                },
              ].map((item) => (
                <p
                  key={item.text}
                  style={{
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  {item.icon} {item.text}
                </p>
              ))}
            </div>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>cat platforms.txt</span>
            </p>
            <p
              style={{
                color: "var(--text2)",
                paddingLeft: 14,
                marginBottom: 6,
              }}
            >
              iOS · Android · Web · PWA
            </p>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>echo $STATUS</span>
            </p>
            <p style={{ color: "var(--text3)" }}>
              <FiCheck
                size={13}
                style={{
                  color: "var(--green)",
                  verticalAlign: "middle",
                  marginRight: 2,
                }}
              />{" "}
              Open to opportunities
              <span
                style={{
                  animation: "blink 1s steps(1) infinite",
                  marginLeft: 2,
                }}
              >
                ▌
              </span>
            </p>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Mobile Apps &<br />
            Web Platforms
          </h2>
          <p
            style={{
              color: "var(--text2)",
              lineHeight: 1.8,
              marginBottom: 14,
              fontSize: isSmall ? 14 : 15,
            }}
          >
            I build across the full mobile and web spectrum. On mobile I
            specialise in React Native — shipping production apps to the App
            Store and Play Store with real-time features, AR, and smooth 60fps
            UIs.
          </p>
          <p
            style={{
              color: "var(--text2)",
              lineHeight: 1.8,
              marginBottom: 28,
              fontSize: isSmall ? 14 : 15,
            }}
          >
            On the web I work with React.js, JavaScript, Vite, and Tailwind CSS
            — building fast, SEO-ready platforms with clean component
            architecture. Whether it's a marketing site, admin dashboard, or
            e-commerce storefront, I care about performance, accessibility, and
            great DX.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: 13, padding: "10px 20px" }}
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="btn btn-primary"
              style={{ fontSize: 13, padding: "10px 20px" }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

/* ── SKILLS ────────────────────────────────────────────────────── */
function Skills({ isMobile, isSmall }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredStack =
    activeTab === "all"
      ? techStack
      : techStack.filter((s) => s.domain === activeTab || s.domain === "both");
  const filteredSkills =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter(
          (s) => s.domain === activeTab || s.domain === "both",
        );
  const highlightedStack = filteredStack.slice(0, isMobile ? 6 : 8);
  const previewCount = isSmall ? 4 : 5;

  const tabs = [
    { id: "all", label: "All Skills" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web" },
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Skills & Expertise
          </div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            What I Build With
          </h2>

          {/* Tab toggle */}
          <div
            style={{
              display: "inline-flex",
              gap: 4,
              padding: "6px",
              borderRadius: 100,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: isSmall ? "7px 14px" : "8px 20px",
                  borderRadius: 100,
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 11 : 12,
                  cursor: "pointer",
                  transition: "all .2s",
                  border: "none",
                  background:
                    activeTab === tab.id ? "var(--accent)" : "transparent",
                  color: activeTab === tab.id ? "var(--bg)" : "var(--text2)",
                  fontWeight: activeTab === tab.id ? 700 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Core stack preview */}
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: isMobile ? 18 : 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isSmall ? 18 : 22,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Core Stack
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Top tools up front, broader coverage below
            </div>
          </div>
          {filteredStack.length > highlightedStack.length && (
            <span className="tag tag-cyan">
              +{filteredStack.length - highlightedStack.length} more in domains
            </span>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 8,
            marginBottom: isMobile ? 24 : 34,
          }}
        >
          {highlightedStack.map((skill) => (
            <div
              key={skill.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: isSmall ? "12px 14px" : "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Domain indicator dot */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background:
                    skill.domain === "mobile"
                      ? "var(--accent)"
                      : skill.domain === "web"
                        ? "var(--accent2)"
                        : "var(--green)",
                  boxShadow: `0 0 6px ${skill.domain === "mobile" ? "rgba(0,229,255,0.5)" : skill.domain === "web" ? "rgba(124,77,255,0.5)" : "rgba(0,255,136,0.5)"}`,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 7,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: isSmall ? 13 : 14,
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: skill.color,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    borderRadius: 100,
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 100,
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg,${skill.color}88,${skill.color})`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill categories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmall
              ? "1fr"
              : isMobile
                ? "1fr 1fr"
                : "repeat(3,1fr)",
            gap: 14,
          }}
        >
          {filteredSkills.map((cat) => (
            <div
              key={cat.category}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: isSmall ? "16px" : "18px",
                transition: "border-color .3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor =
                  cat.domain === "mobile"
                    ? "rgba(0,229,255,0.25)"
                    : cat.domain === "web"
                      ? "rgba(124,77,255,0.25)"
                      : "rgba(0,255,136,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {skillIconMap[cat.icon]}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color:
                      cat.domain === "mobile"
                        ? "var(--accent)"
                        : cat.domain === "web"
                          ? "var(--accent2)"
                          : "var(--green)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.category}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {cat.items.slice(0, previewCount).map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "3px 8px",
                      borderRadius: 100,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text2)",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {item}
                  </span>
                ))}
                {cat.items.length > previewCount && (
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 100,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text3)",
                      border: "1px dashed var(--border-bright)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    +{cat.items.length - previewCount} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURED PROJECTS ─────────────────────────────────────────── */
function FeaturedProjects({ isMobile, isSmall }) {
  const [tab, setTab] = useState("mobile");

  const mobileProjects = projects.filter((p) => p.type === "mobile");
  const webProjects = projects.filter((p) => p.type === "web");
  const displayed = tab === "mobile" ? mobileProjects : webProjects;

  return (
    <section
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? 28 : 40,
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <div className="section-label">Featured Work</div>
            <h2 className="section-title">Projects That Ship</h2>
          </div>
          <Link
            to="/projects"
            className="btn btn-outline"
            style={{ fontSize: 13, padding: "10px 22px" }}
          >
            All Projects →
          </Link>
        </div>

        {/* Mobile / Web toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {[
            { id: "mobile", label: "Mobile Apps" },
            { id: "web", label: "Web Apps" },
          ].map((t) => (
            <button
              key={t.id}
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: isSmall ? "8px 16px" : "10px 22px",
                borderRadius: 100,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: isSmall ? 12 : 13,
                transition: "all .2s",
                border: "1px solid",
                background:
                  tab === t.id
                    ? t.id === "mobile"
                      ? "rgba(0,229,255,0.12)"
                      : "rgba(124,77,255,0.12)"
                    : "transparent",
                color:
                  tab === t.id
                    ? t.id === "mobile"
                      ? "var(--accent)"
                      : "var(--accent2)"
                    : "var(--text3)",
                borderColor:
                  tab === t.id
                    ? t.id === "mobile"
                      ? "rgba(0,229,255,0.3)"
                      : "rgba(124,77,255,0.3)"
                    : "var(--border)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {tab === "mobile" ? (
            <>
              <ProjectCard project={mobileProjects[0]} featured />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                }}
              >
                <ProjectCard project={mobileProjects[1]} />
                <ProjectCard project={mobileProjects[2]} />
              </div>
            </>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              {webProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── GET IN TOUCH ──────────────────────────────────────────────── */
function GetInTouch({ isSmall }) {
  // useEffect(() => {
  //   // Load LinkedIn badge script
  //   const script = document.createElement("script");
  //   script.src = "https://platform.linkedin.com/badges/js/profile.js";
  //   script.async = true;
  //   script.defer = true;
  //   script.charset = "utf-8";
  //   document.body.appendChild(script);

  //   return () => {
  //     // Cleanup if needed
  //     const linkedInScript = document.querySelector(
  //       `script[src="https://platform.linkedin.com/badges/js/profile.js"]`,
  //     );
  //     if (linkedInScript && linkedInScript.parentNode) {
  //       linkedInScript.parentNode.removeChild(linkedInScript);
  //     }
  //   };
  // }, []);

  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}
      >
        <div className="section-label" style={{ justifyContent: "center" }}>
          Let's Work Together
        </div>
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          Mobile or Web —<br />
          <span style={{ color: "var(--accent)" }}>Let's Build It</span>
        </h2>
        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 15 : 17,
            lineHeight: 1.8,
            marginBottom: 36,
          }}
        >
          Looking for a developer who covers both React Native mobile apps and
          React web platforms? I'm open to full-time roles, freelance projects,
          and collaborations.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          <a href={`mailto:${personal.email}`} className="btn btn-primary">
            <FiMail
              size={15}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />{" "}
            Send Email
          </a>
          <Link to="/contact" className="btn btn-outline">
            Contact Page
          </Link>
        </div>

        {/* LinkedIn Badge
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 44,
          }}
        >
          <div
            className="badge-base LI-profile-badge"
            data-locale="en_US"
            data-size="medium"
            data-theme="dark"
            data-type="VERTICAL"
            data-vanity="neeleshyadav"
            data-version="v1"
          >
            <a
              className="badge-base__link LI-simple-link"
              href="https://in.linkedin.com/in/neeleshyadav?trk=profile-badge"
            >
              Neelesh Yadav
            </a>
          </div>
        </div> */}

        <div
          style={{
            display: "flex",
            gap: isSmall ? 20 : 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: (
                <>
                  <FiGithub
                    size={13}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  GitHub
                </>
              ),
              href: personal.github,
            },
            {
              label: (
                <>
                  <FiMail
                    size={13}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  Email
                </>
              ),
              href: `mailto:${personal.email}`,
            },
            {
              label: (
                <>
                  <FiPhone
                    size={13}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  Phone
                </>
              ),
              href: `tel:${personal.phone}`,
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--text2)",
                transition: "color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text2)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <>
      <SEO path="/" schema={getHomepageSchema()} />
      <Hero isMobile={isMobile} isSmall={isSmall} />
      <About isMobile={isMobile} isSmall={isSmall} />
      <Skills isMobile={isMobile} isSmall={isSmall} />
      <Suspense
        fallback={
          <section
            className="section"
            style={{
              background: "var(--bg2)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="container">
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text2)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Loading GitHub Activity...
              </div>
            </div>
          </section>
        }
      >
        <GitHubGraph />
      </Suspense>
      <FeaturedProjects isMobile={isMobile} isSmall={isSmall} />
      <GetInTouch isSmall={isSmall} />
    </>
  );
}
