import { useRef, useEffect, useState, useCallback } from "react";
import { experience, degrees, certifications } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import {
  FiSmartphone,
  FiGlobe,
  FiBookOpen,
  FiAward,
  FiExternalLink,
} from "react-icons/fi";
import { TbBrandReactNative } from "react-icons/tb";
import { SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { SiPython, SiJavascript } from "react-icons/si";
import { FiCpu } from "react-icons/fi";
import SEO from "../components/SEO";

const roleColors = {
  current: "var(--accent)",
  past: "var(--accent2)",
};

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

/* ── Hook: triggers once when element enters viewport ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Hook: magnetic tilt on hover ── */
function useMagnetic() {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = ((e.clientY - top) / height - 0.5) * 10;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(4px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* ── Animated counter ── */
function Counter({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const [ref, visible] = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(value);
    if (isNaN(num)) return;
    let start = null;
    const duration = 900;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ── Shimmer line that animates once visible ── */
function ShimmerLine() {
  const [ref, visible] = useReveal(0.3);
  return (
    <div
      ref={ref}
      style={{
        height: 1,
        background:
          "linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition:
          "opacity 0.8s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
        marginBottom: 32,
      }}
    />
  );
}

/* ── Single experience card ── */
function JobCard({ job, idx, isMobile, isSmall }) {
  const [ref, visible] = useReveal(0.08);
  const magnetic = useMagnetic();
  const lineColor = roleColors[job.type];
  const allTech = [...(job.mobileTech || []), ...(job.webTech || [])];

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        marginBottom: 56,
        paddingBottom: 56,
        borderBottom: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0)"
          : "translateX(-32px) translateY(8px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s,
                     transform 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s`,
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: isMobile ? -21 : -43,
          top: 12,
          width: job.type === "current" ? 16 : 12,
          height: job.type === "current" ? 16 : 12,
          borderRadius: "50%",
          background: lineColor,
          boxShadow: `0 0 ${job.type === "current" ? "24px" : "10px"} ${lineColor}90`,
          border: "2px solid var(--bg)",
          zIndex: 1,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {job.type === "current" && (
          <>
            <div
              style={{
                position: "absolute",
                inset: -5,
                borderRadius: "50%",
                border: `1px solid ${lineColor}`,
                opacity: 0.5,
                animation: "ripple 2.2s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                border: `1px solid ${lineColor}`,
                opacity: 0.2,
                animation: "ripple 2.2s ease-out infinite 0.6s",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                border: `1px solid ${lineColor}`,
                opacity: 0.08,
                animation: "ripple 2.2s ease-out infinite 1.1s",
              }}
            />
          </>
        )}
      </div>

      {/* Card header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div>
          {job.type === "current" && (
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--green)",
                border: "1px solid rgba(0,255,136,0.3)",
                background: "rgba(0,255,136,0.08)",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              CURRENT
            </span>
          )}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isSmall ? 19 : 23,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            {job.role}
          </h2>
          {job.companyUrl ? (
            <a
              href={job.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 15,
                color: lineColor,
                fontWeight: 500,
                marginBottom: 2,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                transition: "gap 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "5px")}
            >
              {job.company} <FiExternalLink size={13} />
            </a>
          ) : (
            <p
              style={{
                fontSize: 15,
                color: lineColor,
                fontWeight: 500,
                marginBottom: 2,
              }}
            >
              {job.company}
            </p>
          )}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text3)",
              marginTop: 2,
            }}
          >
            {job.location}
          </p>
        </div>

        {/* Duration card with tilt */}
        <div
          {...magnetic}
          style={{
            background: "var(--surface)",
            border: `1px solid ${lineColor}20`,
            borderRadius: 14,
            padding: isSmall ? "12px 16px" : "14px 20px",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 32px ${lineColor}18`;
            e.currentTarget.style.borderColor = `${lineColor}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = `${lineColor}20`;
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: lineColor,
              opacity: 0.6,
            }}
          />
          {/* Animated shimmer sweep on hover */}
          <div className="card-shimmer" />
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: lineColor,
              marginBottom: 2,
            }}
          >
            {job.period}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isSmall ? 16 : 20,
              fontWeight: 800,
            }}
          >
            {job.startDate ? getExperience(job.startDate) : job.duration}
          </div>
        </div>
      </div>

      {/* Tech stack */}
      {job.type === "current" && job.mobileTech?.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 10,
            marginBottom: 18,
          }}
        >
          {[
            {
              icon: <FiSmartphone size={11} />,
              label: "Mobile",
              color: "var(--accent)",
              items: job.mobileTech,
            },
            {
              icon: <FiGlobe size={11} />,
              label: "Web",
              color: "#b39ddb",
              items: job.webTech,
            },
          ].map((d, di) => (
            <div
              key={d.label}
              style={{
                background: "var(--surface)",
                border: `1px solid ${d.color}20`,
                borderRadius: 14,
                padding: "14px 16px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${idx * 0.1 + 0.2 + di * 0.1}s, transform 0.5s ease ${idx * 0.1 + 0.2 + di * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: d.color,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {d.icon} {d.label} Stack
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {d.items.map((item, ti) => (
                  <span
                    key={item}
                    className="tech-pill"
                    style={{
                      padding: "3px 9px",
                      borderRadius: 100,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text2)",
                      border: "1px solid var(--border)",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.85)",
                      transition: `opacity 0.35s ease ${idx * 0.1 + 0.3 + ti * 0.04}s, transform 0.35s ease ${idx * 0.1 + 0.3 + ti * 0.04}s, background 0.2s, border-color 0.2s`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {job.type !== "current" && allTech.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 16,
          }}
        >
          {allTech.map((t, ti) => (
            <span
              key={t}
              className="tech-pill"
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.85)",
                transition: `opacity 0.35s ease ${idx * 0.1 + 0.15 + ti * 0.04}s, transform 0.35s ease ${idx * 0.1 + 0.15 + ti * 0.04}s, background 0.2s, border-color 0.2s`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Highlights */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {job.highlights.map((h, hi) => (
          <div
            key={hi}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.45s ease ${idx * 0.1 + 0.25 + hi * 0.07}s, transform 0.45s ease ${idx * 0.1 + 0.25 + hi * 0.07}s`,
            }}
          >
            <span
              style={{
                color: lineColor,
                flexShrink: 0,
                fontSize: isSmall ? 13 : 15,
                lineHeight: 1.65,
              }}
            >
              ▸
            </span>
            <span
              style={{
                color: "var(--text2)",
                fontSize: isSmall ? 13 : 15,
                lineHeight: 1.65,
              }}
            >
              {h}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const edu = degrees[0];

  const [headerRef, headerVisible] = useReveal(0.05);
  const [eduRef, eduVisible] = useReveal(0.1);
  const [certRef, certVisible] = useReveal(0.1);

  const certIconMap = {
    algo: <FiCpu />,
    python: <SiPython />,
    reactnative: <TbBrandReactNative />,
    javascript: <SiJavascript />,
  };

  /* Floating particles in hero */
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 55 + Math.sin(i * 137.5) * 38,
    y: 15 + Math.cos(i * 97.3) * 70,
    size: 1.5 + (i % 3) * 1.2,
    delay: (i * 0.3) % 3,
    dur: 3 + (i % 4) * 0.7,
  }));

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      <SEO
        title="Experience — Neelesh Yadav | 3+ Years React Native & React"
        description="3+ years of professional experience as a React Native & React Developer. Work history, education, and certifications — Neelesh Yadav, Pune, India."
        path="/experience"
      />
      {/* ─── HEADER ─── */}
      <section
        ref={headerRef}
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            transform: "translateY(-50%)",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(124,77,255,0.1) 0%,transparent 70%)",
            pointerEvents: "none",
            animation: "breathe 5s ease-in-out infinite",
          }}
        />
        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(0,229,255,${0.2 + (p.id % 3) * 0.15})`,
              animation: `float-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container">
          <div
            className="section-label"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
            }}
          >
            Career
          </div>
          <h1
            className="section-title"
            style={{
              marginBottom: 14,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible
                ? "translateY(0) skewY(0deg)"
                : "translateY(20px) skewY(1deg)",
              transition:
                "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Work
            <br />
            <span
              style={{
                color: "var(--accent2)",
                display: "inline-block",
                animation: headerVisible
                  ? "text-shimmer 4s ease-in-out infinite"
                  : "none",
              }}
            >
              Experience
            </span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 520,
              lineHeight: 1.75,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
            }}
          >
            {getExperience("2023-01-01")} of experience building
            production-grade mobile apps with React Native and web platforms
            using React &amp; Tailwind CSS.
          </p>

          {/* Tech badges — staggered pop-in */}
          <div
            style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}
          >
            {[
              {
                icon: <TbBrandReactNative size={12} />,
                label: "React Native",
                color: "var(--accent)",
                bg: "rgba(0,229,255,0.07)",
                border: "rgba(0,229,255,0.25)",
              },
              {
                icon: <SiReact size={12} />,
                label: "React.js / JS",
                color: "#b39ddb",
                bg: "rgba(124,77,255,0.07)",
                border: "rgba(124,77,255,0.25)",
              },
              {
                icon: <SiTailwindcss size={12} />,
                label: "Tailwind CSS / Vite",
                color: "var(--green)",
                bg: "rgba(0,255,136,0.07)",
                border: "rgba(0,255,136,0.25)",
              },
              {
                icon: <SiTypescript size={12} />,
                label: "TypeScript / Redux",
                color: "var(--accent3)",
                bg: "rgba(255,107,53,0.07)",
                border: "rgba(255,107,53,0.25)",
              },
            ].map((t, i) => (
              <span
                key={t.label}
                className="badge-hover"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 10 : 11,
                  color: t.color,
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(10px) scale(0.9)",
                  transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.07}s`,
                  cursor: "default",
                }}
              >
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div
            style={{ position: "relative", paddingLeft: isMobile ? 28 : 44 }}
          >
            {/* Glowing vertical line */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? 13 : 7,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(180deg, var(--accent) 0%, var(--accent2) 40%, #ec4899 75%, transparent 100%)",
                borderRadius: 2,
                boxShadow: "0 0 12px rgba(0,229,255,0.3)",
                animation: "line-pulse 3s ease-in-out infinite",
              }}
            />
            {/* Traveling glow dot */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? 10 : 4,
                top: 0,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 18px var(--accent)",
                animation: "travel-dot 5s ease-in-out infinite",
                zIndex: 2,
              }}
            />

            {experience.map((job, idx) => (
              <JobCard
                key={idx}
                job={job}
                idx={idx}
                isMobile={isMobile}
                isSmall={isSmall}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section
        style={{
          padding: "72px 0 100px",
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 880 }}>
          <div
            className="section-label"
            style={{
              opacity: eduVisible ? 1 : 0,
              transform: eduVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            Education
          </div>
          <h2
            className="section-title"
            style={{
              marginBottom: 32,
              opacity: eduVisible ? 1 : 0,
              transform: eduVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            Academic Background
          </h2>

          <ShimmerLine />

          <div
            ref={eduRef}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              overflow: "hidden",
              opacity: eduVisible ? 1 : 0,
              transform: eduVisible
                ? "translateY(0) scale(1)"
                : "translateY(28px) scale(0.98)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <div
              style={{
                height: 3,
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent2), #ec4899)",
                backgroundSize: "200%",
                animation: "gradient-shift 4s linear infinite",
              }}
            />
            <div style={{ padding: isSmall ? "22px" : "32px" }}>
              <div
                style={{
                  display: "flex",
                  gap: isSmall ? 16 : 24,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    flexShrink: 0,
                    background:
                      "linear-gradient(135deg,var(--accent),var(--accent2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    boxShadow: "0 8px 24px rgba(0,229,255,0.25)",
                    animation: "icon-float 4s ease-in-out infinite",
                  }}
                >
                  <edu.icon size={24} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isSmall ? 15 : 19,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      color: "var(--accent)",
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text3)",
                    }}
                  >
                    {edu.location}
                  </p>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text3)",
                      marginBottom: 4,
                    }}
                  >
                    {edu.period}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {edu.duration}
                  </div>
                </div>
              </div>

              {edu.institutionBadges && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 18,
                  }}
                >
                  {edu.institutionBadges.map((badge, bi) => (
                    <span
                      key={badge}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 100,
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--accent)",
                        border: "1px solid rgba(0,229,255,0.25)",
                        background: "rgba(0,229,255,0.07)",
                        opacity: eduVisible ? 1 : 0,
                        transform: eduVisible ? "scale(1)" : "scale(0.8)",
                        transition: `opacity 0.4s ease ${0.3 + bi * 0.06}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + bi * 0.06}s`,
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {edu.institutionAbout && (
                <p
                  style={{
                    color: "var(--text2)",
                    fontSize: isSmall ? 13 : 14,
                    lineHeight: 1.75,
                    marginBottom: 20,
                    padding: "14px 16px",
                    background: "var(--bg2)",
                    borderRadius: 12,
                    borderLeft: "3px solid var(--accent)",
                    opacity: eduVisible ? 1 : 0,
                    transform: eduVisible
                      ? "translateX(0)"
                      : "translateX(-12px)",
                    transition:
                      "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
                  }}
                >
                  {edu.institutionAbout}
                </p>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                }}
              >
                {edu.coursework && (
                  <div
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: "16px 18px",
                      opacity: eduVisible ? 1 : 0,
                      transform: eduVisible
                        ? "translateY(0)"
                        : "translateY(14px)",
                      transition:
                        "opacity 0.55s ease 0.4s, transform 0.55s ease 0.4s",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--accent2)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <FiBookOpen size={11} /> Key Coursework
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {edu.coursework.map((c, ci) => (
                        <span
                          key={c}
                          className="tech-pill"
                          style={{
                            padding: "3px 9px",
                            borderRadius: 100,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--text2)",
                            border: "1px solid var(--border)",
                            opacity: eduVisible ? 1 : 0,
                            transform: eduVisible ? "scale(1)" : "scale(0.85)",
                            transition: `opacity 0.35s ease ${0.45 + ci * 0.04}s, transform 0.35s ease ${0.45 + ci * 0.04}s, background 0.2s`,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {edu.activities && (
                  <div
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: "16px 18px",
                      opacity: eduVisible ? 1 : 0,
                      transform: eduVisible
                        ? "translateY(0)"
                        : "translateY(14px)",
                      transition:
                        "opacity 0.55s ease 0.5s, transform 0.55s ease 0.5s",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--green)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <FiAward size={11} /> Activities
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {edu.activities.map((a, ai) => (
                        <div
                          key={ai}
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
                            opacity: eduVisible ? 1 : 0,
                            transform: eduVisible
                              ? "translateX(0)"
                              : "translateX(-10px)",
                            transition: `opacity 0.4s ease ${0.55 + ai * 0.07}s, transform 0.4s ease ${0.55 + ai * 0.07}s`,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--green)",
                              fontSize: 9,
                              marginTop: 5,
                              flexShrink: 0,
                            }}
                          >
                            ▸
                          </span>
                          <span
                            style={{
                              color: "var(--text2)",
                              fontSize: isSmall ? 12 : 13,
                              lineHeight: 1.6,
                            }}
                          >
                            {a}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── CERTIFICATIONS ─── */}
          <div style={{ marginTop: 44 }}>
            <div
              className="section-label"
              style={{
                opacity: certVisible ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              Certifications
            </div>
            <div
              ref={certRef}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 12,
                marginTop: 18,
              }}
            >
              {certifications.map((cert, i) => (
                <div
                  key={cert.name}
                  className="cert-card"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: isSmall ? "14px 16px" : "16px 20px",
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    opacity: certVisible ? 1 : 0,
                    transform: certVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(16px) scale(0.96)",
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.1}s`,
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: cert.color + "18",
                      border: `1px solid ${cert.color}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                      transition:
                        "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                    }}
                    className="cert-icon"
                  >
                    {certIconMap[cert.icon] ?? cert.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: isSmall ? 13 : 14,
                        marginBottom: 2,
                      }}
                    >
                      {cert.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: cert.color,
                      }}
                    >
                      {cert.issuer} · {cert.year}
                    </div>
                    {cert.credentialId && (
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          color: "var(--text3)",
                          marginTop: 2,
                        }}
                      >
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GLOBAL ANIMATION STYLES ─── */}
      <style>{`
        @keyframes ripple {
          0%  { transform: scale(1); opacity: 0.6; }
          100%{ transform: scale(3.2); opacity: 0; }
        }
        @keyframes pulse {
          0%,100%{ opacity:1; }
          50%     { opacity:0.3; }
        }
        @keyframes breathe {
          0%,100%{ transform: translateY(-50%) scale(1); opacity:1; }
          50%    { transform: translateY(-50%) scale(1.12); opacity:0.7; }
        }
        @keyframes float-particle {
          from { transform: translateY(0px) translateX(0px); opacity:0.4; }
          to   { transform: translateY(-12px) translateX(6px); opacity:1; }
        }
        @keyframes text-shimmer {
          0%,100%{ filter: brightness(1); }
          50%    { filter: brightness(1.25) drop-shadow(0 0 8px var(--accent2)); }
        }
        @keyframes line-pulse {
          0%,100%{ opacity:1; box-shadow:0 0 12px rgba(0,229,255,0.3); }
          50%    { opacity:0.7; box-shadow:0 0 20px rgba(0,229,255,0.5); }
        }
        @keyframes travel-dot {
          0%  { top: 0%;   opacity:1; }
          80% { top: 92%;  opacity:1; }
          95% { top: 96%;  opacity:0; }
          96% { top: 0%;   opacity:0; }
          100%{ top: 0%;   opacity:1; }
        }
        @keyframes icon-float {
          0%,100%{ transform: translateY(0px); }
          50%    { transform: translateY(-5px); }
        }
        @keyframes gradient-shift {
          0%  { background-position: 0% 0%; }
          100%{ background-position: 200% 0%; }
        }

        /* Tech pill hover */
        .tech-pill:hover {
          background: var(--surface) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }

        /* Badge hover lift */
        .badge-hover:hover {
          transform: translateY(-2px) scale(1.04) !important;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1) !important;
        }

        /* Cert card hover */
        .cert-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 6px 28px rgba(0,229,255,0.12) !important;
          transform: translateY(-2px) !important;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
        }
        .cert-card:hover .cert-icon {
          transform: rotate(-8deg) scale(1.15) !important;
          box-shadow: 0 4px 16px rgba(0,229,255,0.2) !important;
        }

        /* Card shimmer sweep */
        .card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
          background-size: 200% 100%;
          background-position: -100% 0;
          pointer-events: none;
          border-radius: inherit;
          transition: background-position 0s;
        }
        div:hover > .card-shimmer {
          background-position: 200% 0;
          transition: background-position 0.6s ease;
        }
      `}</style>
    </div>
  );
}
