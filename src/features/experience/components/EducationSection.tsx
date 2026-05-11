import { motion } from "framer-motion";
import { FiBookOpen, FiAward } from "react-icons/fi";
import type { Degree } from "../types";
import ShimmerLine from "./ShimmerLine";
import {
  Reveal,
  RevealStagger,
  scaleIn,
  popIn,
  slideRight,
  hoverLift,
} from "../../../shared/components/motion";

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
  return (
    <>
      <Reveal preset="fadeUp">
        <div className="section-label">Education</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>
          Academic Background
        </h2>
      </Reveal>

      <ShimmerLine />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={scaleIn}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
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
            <motion.div
              whileHover={{ scale: 1.06, rotate: -4 }}
              transition={hoverLift}
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
                boxShadow: "0 8px 24px rgba(59,130,246,0.25)",
                animation: "icon-float 4s ease-in-out infinite",
              }}
            >
              <edu.icon size={24} color="white" />
            </motion.div>
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
            <RevealStagger
              stagger={0.06}
              delayChildren={0.3}
              amount={0.1}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 18,
              }}
            >
              {edu.institutionBadges.map((badge) => (
                <motion.span
                  key={badge}
                  variants={popIn}
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={hoverLift}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 100,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--accent)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    background: "rgba(59,130,246,0.07)",
                    cursor: "default",
                    willChange: "transform",
                  }}
                >
                  {badge}
                </motion.span>
              ))}
            </RevealStagger>
          )}

          {edu.institutionAbout && (
            <Reveal preset="slideRight" delay={0.35}>
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
            </Reveal>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 16,
            }}
          >
            {edu.coursework && (
              <Reveal preset="fadeUp" delay={0.4}>
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
                  <RevealStagger
                    stagger={0.04}
                    delayChildren={0.05}
                    amount={0.1}
                    style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                  >
                    {edu.coursework.map((c) => (
                      <motion.span
                        key={c}
                        className="tech-pill"
                        variants={popIn}
                        whileHover={{ scale: 1.06, y: -2 }}
                        transition={hoverLift}
                        style={{
                          padding: "3px 9px",
                          borderRadius: 100,
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--text2)",
                          border: "1px solid var(--border)",
                          cursor: "default",
                          willChange: "transform",
                        }}
                      >
                        {c}
                      </motion.span>
                    ))}
                  </RevealStagger>
                </div>
              </Reveal>
            )}
            {edu.activities && (
              <Reveal preset="fadeUp" delay={0.5}>
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
                  <RevealStagger
                    stagger={0.07}
                    delayChildren={0.05}
                    amount={0.1}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {edu.activities.map((a, ai) => (
                      <motion.div
                        key={ai}
                        variants={slideRight}
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
                      </motion.div>
                    ))}
                  </RevealStagger>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
