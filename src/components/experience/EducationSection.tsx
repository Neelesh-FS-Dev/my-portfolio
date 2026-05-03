import { FiBookOpen, FiAward } from "react-icons/fi";
import type { Degree } from "../../types";
import { useReveal } from "../../hooks/useReveal";
import ShimmerLine from "./ShimmerLine";

export interface EducationSectionProps {
  edu: Degree;
  isMobile: boolean;
  isSmall: boolean;
}

export default function EducationSection({
  edu,
  isMobile,
  isSmall,
}: EducationSectionProps) {
  const [eduRef, eduVisible] = useReveal<HTMLDivElement>(0.1);

  return (
    <>
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
                transform: eduVisible ? "translateX(0)" : "translateX(-12px)",
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
                  transform: eduVisible ? "translateY(0)" : "translateY(14px)",
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
                  transform: eduVisible ? "translateY(0)" : "translateY(14px)",
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
    </>
  );
}
