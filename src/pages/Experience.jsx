import { useRef, useEffect, useState } from "react";
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
import { SiPython, SiJavascript, SiCoursera } from "react-icons/si";
import { FiCpu } from "react-icons/fi";

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

export default function Experience() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const edu = degrees[0];

  const [visible, setVisible] = useState({});
  const [certVisible, setCertVisible] = useState(false);
  const [eduVisible, setEduVisible] = useState(false);
  const cardRefs = useRef([]);
  const certRef = useRef(null);
  const eduRef = useRef(null);
  const certIconMap = {
    algo: <FiCpu />,
    python: <SiPython />,
    reactnative: <TbBrandReactNative />,
    javascript: <SiJavascript />,
  };
  useEffect(() => {
    const observers = cardRefs.current.map((ref, idx) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [idx]: true }));
        },
        { threshold: 0.1 },
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    if (!certRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setCertVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(certRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eduRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setEduVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(eduRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* HEADER */}
      <section
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translateY(-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(124,77,255,0.08) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container">
          <div className="section-label">Career</div>
          <h1 className="section-title" style={{ marginBottom: 14 }}>
            Work
            <br />
            <span style={{ color: "var(--accent2)" }}>Experience</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 520,
              lineHeight: 1.75,
            }}
          >
            {getExperience("2023-01-01")} of experience building
            production-grade mobile apps with React Native and web platforms
            using React & Tailwind CSS.
          </p>
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
                  fontSize: isSmall ? 10 : 11,
                  color: t.color,
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                }}
              >
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div
            style={{ position: "relative", paddingLeft: isMobile ? 28 : 44 }}
          >
            {/* Glowing vertical line */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? 7 : 2,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(180deg, var(--accent) 0%, var(--accent2) 40%, #ec4899 75%, transparent 100%)",
                borderRadius: 2,
                boxShadow: "0 0 10px rgba(0,229,255,0.25)",
              }}
            />

            {experience.map((job, idx) => {
              const lineColor = roleColors[job.type];
              const allTech = [
                ...(job.mobileTech || []),
                ...(job.webTech || []),
              ];
              return (
                <div
                  key={idx}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{
                    position: "relative",
                    marginBottom: 56,
                    paddingBottom: idx < experience.length - 1 ? 56 : 0,
                    borderBottom:
                      idx < experience.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                    opacity: visible[idx] ? 1 : 0,
                    transform: visible[idx]
                      ? "translateX(0)"
                      : "translateX(-28px)",
                    transition: `opacity 0.55s ease ${idx * 0.08}s, transform 0.55s ease ${idx * 0.08}s`,
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
                      boxShadow: `0 0 ${job.type === "current" ? "20px" : "10px"} ${lineColor}80`,
                      border: "2px solid var(--bg)",
                      zIndex: 1,
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
                            animation: "ripple 2s ease-out infinite",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: -10,
                            borderRadius: "50%",
                            border: `1px solid ${lineColor}`,
                            opacity: 0.2,
                            animation: "ripple 2s ease-out infinite 0.5s",
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
                          }}
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

                    {/* Duration card */}
                    <div
                      style={{
                        background: "var(--surface)",
                        border: `1px solid ${lineColor}20`,
                        borderRadius: 14,
                        padding: isSmall ? "12px 16px" : "14px 20px",
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
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
                        {job.startDate
                          ? getExperience(job.startDate)
                          : job.duration}
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
                      ].map((d) => (
                        <div
                          key={d.label}
                          style={{
                            background: "var(--surface)",
                            border: `1px solid ${d.color}20`,
                            borderRadius: 14,
                            padding: "14px 16px",
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
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                            }}
                          >
                            {d.items.map((item) => (
                              <span
                                key={item}
                                style={{
                                  padding: "3px 9px",
                                  borderRadius: 100,
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 11,
                                  color: "var(--text2)",
                                  border: "1px solid var(--border)",
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
                      {allTech.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: "3px 10px",
                            borderRadius: 100,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--text2)",
                            border: "1px solid var(--border)",
                            background: "var(--surface)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {job.highlights.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: lineColor,
                            marginTop: 5,
                            flexShrink: 0,
                            fontSize: 9,
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
            })}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        style={{
          padding: "72px 0 100px",
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-label">Education</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>
            Academic Background
          </h2>

          <div
            ref={eduRef}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              overflow: "hidden",
              opacity: eduVisible ? 1 : 0,
              transform: eduVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div
              style={{
                height: 3,
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent2), #ec4899)",
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
                  }}
                >
                  {edu.icon}
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
                  {edu.institutionBadges.map((badge) => (
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
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          style={{
                            padding: "3px 9px",
                            borderRadius: 100,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--text2)",
                            border: "1px solid var(--border)",
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
                      {edu.activities.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
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

          {/* CERTIFICATIONS */}
          <div style={{ marginTop: 44 }}>
            <div className="section-label">Certifications</div>
            <div
              ref={certRef}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 12,
                marginTop: 18,
                opacity: certVisible ? 1 : 0,
                transform: certVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              {certifications.map((cert, i) => (
                <div
                  key={cert.name}
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
                      ? "translateY(0)"
                      : "translateY(12px)",
                    transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
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
                    }}
                  >
                    {certIconMap[cert.icon] ?? cert.icon}{" "}
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

      <style>{`
        @keyframes ripple { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.8);opacity:0} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}
