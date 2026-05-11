import { motion } from "framer-motion";
import proofStats from "../../../shared/data/proofStats";
import {
  Reveal,
  RevealStagger,
  scaleIn,
  hoverLift,
} from "../../../shared/components/motion";

export interface ProofStatsProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function ProofStats({ isMobile, isSmall }: ProofStatsProps) {
  return (
    <section
      className="section"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        paddingTop: isMobile ? 48 : 72,
        paddingBottom: isMobile ? 48 : 72,
      }}
    >
      <div className="container">
        <Reveal preset="fadeUp">
          <div className="section-label">
            <span className="section-num">01 /</span> Measurable Proof
          </div>
          <h2
            className="section-title"
            style={{ marginBottom: isMobile ? 28 : 40 }}
          >
            Numbers That Back the Work
          </h2>
        </Reveal>

        <RevealStagger
          stagger={0.06}
          delayChildren={0.05}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : isSmall
                ? "repeat(3, 1fr)"
                : "repeat(6, 1fr)",
            gap: isMobile ? 12 : 16,
          }}
        >
          {proofStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              whileHover={{
                y: -4,
                borderColor: "rgba(59,130,246,0.35)",
                boxShadow: "0 12px 32px rgba(59,130,246,0.1)",
              }}
              transition={hoverLift}
              style={{
                padding: isSmall ? "18px 16px" : "22px 18px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                willChange: "transform",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: isSmall ? 26 : 32,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: isSmall ? 12 : 13,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.label}
              </div>
              {stat.sublabel && (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.5,
                  }}
                >
                  {stat.sublabel}
                </div>
              )}
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
