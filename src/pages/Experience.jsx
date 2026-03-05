import { experience, personal } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";

const roleColors = {
  current: "var(--accent)",
  past: "var(--accent2)",
};

export default function Experience() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* ── HEADER ──────────────────────────────────────────────── */}
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
            2.5+ years building production-grade mobile apps with React Native
            and web platforms with React, Next.js & Tailwind CSS.
          </p>

          {/* Quick domain tags */}
          <div
            style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}
          >
            {[
              {
                label: "📱 React Native",
                color: "var(--accent)",
                bg: "rgba(0,229,255,0.07)",
                border: "rgba(0,229,255,0.25)",
              },
              {
                label: "🌐 React.js / Next.js",
                color: "#b39ddb",
                bg: "rgba(124,77,255,0.07)",
                border: "rgba(124,77,255,0.25)",
              },
              {
                label: "🎨 Tailwind CSS / Vite",
                color: "var(--green)",
                bg: "rgba(0,255,136,0.07)",
                border: "rgba(0,255,136,0.25)",
              },
              {
                label: "⚡ TypeScript / Redux",
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
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div
            style={{ position: "relative", paddingLeft: isMobile ? 28 : 44 }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? 7 : 2,
                top: 0,
                bottom: 0,
                width: 1,
                background:
                  "linear-gradient(180deg,var(--accent) 0%,var(--accent2) 50%,transparent 100%)",
              }}
            />

            {experience.map((job, idx) => {
              const lineColor = roleColors[job.type];
              return (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    marginBottom: 56,
                    paddingBottom: idx < experience.length - 1 ? 56 : 0,
                    borderBottom:
                      idx < experience.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: isMobile ? -21 : -43,
                      top: 12,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: lineColor,
                      boxShadow: `0 0 16px ${lineColor}60`,
                      border: "2px solid var(--bg)",
                      zIndex: 1,
                    }}
                  >
                    {job.type === "current" && (
                      <div
                        style={{
                          position: "absolute",
                          inset: -5,
                          borderRadius: "50%",
                          border: `1px solid ${lineColor}`,
                          opacity: 0.4,
                          animation: "ripple 2s ease-out infinite",
                        }}
                      />
                    )}
                  </div>

                  {/* Card header row */}
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
                            display: "inline-block",
                            marginBottom: 10,
                          }}
                        >
                          ● CURRENT
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
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 12,
                          color: "var(--text3)",
                        }}
                      >
                        {job.location}
                      </p>
                    </div>

                    {/* Date card */}
                    <div
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 14,
                        padding: isSmall ? "12px 16px" : "14px 20px",
                        flexShrink: 0,
                      }}
                    >
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
                        {job.duration}
                      </div>
                    </div>
                  </div>

                  {/* What I worked on — domain split for current role */}
                  {job.type === "current" && (
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
                          icon: "📱",
                          label: "Mobile",
                          color: "var(--accent)",
                          items: [
                            "React Native",
                            "Redux Toolkit",
                            "TypeScript",
                            "iOS / Android",
                          ],
                        },
                        {
                          icon: "🌐",
                          label: "Web",
                          color: "#b39ddb",
                          items: [
                            "React.js",
                            "Vite",
                            "Tailwind CSS",
                            "Next.js",
                          ],
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

      {/* ── EDUCATION ───────────────────────────────────────────── */}
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
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: isSmall ? "22px" : "32px",
              display: "flex",
              gap: isSmall ? 16 : 24,
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
                background:
                  "linear-gradient(135deg,var(--accent),var(--accent2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🎓
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isSmall ? 15 : 18,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Bachelor of Computer Science Engineering
              </h3>
              <p
                style={{
                  color: "var(--accent)",
                  fontSize: 14,
                  marginBottom: 2,
                }}
              >
                Institute of Technology, Nirma University
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text3)",
                }}
              >
                Ahmedabad, Gujarat
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text3)",
                  marginBottom: 4,
                }}
              >
                Jul 2019 – May 2023
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                4 Years
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 36 }}>
            <div className="section-label">Certifications</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 12,
                marginTop: 18,
              }}
            >
              {[
                {
                  name: "React Native Certification",
                  year: "2023",
                  color: "var(--accent)",
                  icon: "📱",
                },
                {
                  name: "JavaScript ES6+ Advanced",
                  year: "2022",
                  color: "var(--accent2)",
                  icon: "⚡",
                },
                {
                  name: "React.js Development",
                  year: "2023",
                  color: "#b39ddb",
                  icon: "🌐",
                },
                {
                  name: "Tailwind CSS & Modern UI",
                  year: "2023",
                  color: "var(--green)",
                  icon: "🎨",
                },
              ].map((cert) => (
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
                    {cert.icon}
                  </div>
                  <div>
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
                      {cert.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ripple { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.5);opacity:0} }
      `}</style>
    </div>
  );
}
