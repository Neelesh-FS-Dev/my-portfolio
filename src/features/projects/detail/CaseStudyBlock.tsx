import { memo } from "react";
import type { CaseStudy } from "../../../shared/data/caseStudies";
import {
  Reveal,
  RevealStagger,
  fadeUp,
  scaleIn,
} from "../../../shared/components/motion";
import { motion } from "framer-motion";

export interface CaseStudyBlockProps {
  caseStudy: CaseStudy;
  isSmall: boolean;
}

function Step({
  label,
  body,
  accent,
  isSmall,
}: {
  label: string;
  body: string;
  accent: string;
  isSmall: boolean;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <p
        style={{
          color: "var(--text2)",
          fontSize: isSmall ? 14 : 15,
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}

function CaseStudyBlockBase({ caseStudy, isSmall }: CaseStudyBlockProps) {
  const accent = caseStudy.accent || "var(--accent)";

  return (
    <section style={{ marginBottom: 56 }}>
      <Reveal preset="fadeUp">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: 8,
            fontWeight: 700,
          }}
        >
          Case Study
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall ? 24 : 32,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--text)",
          }}
        >
          {caseStudy.tagline}
        </h2>
      </Reveal>

      <RevealStagger
        stagger={0.08}
        delayChildren={0.1}
        amount={0.1}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          marginTop: 28,
          padding: isSmall ? 22 : 28,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          borderTop: `3px solid ${accent}`,
        }}
      >
        <Step
          label="Problem"
          body={caseStudy.problem}
          accent={accent}
          isSmall={isSmall}
        />
        <Step
          label="What I built"
          body={caseStudy.built}
          accent={accent}
          isSmall={isSmall}
        />

        <motion.div variants={fadeUp}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            Hard parts
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {caseStudy.hardParts.map((hp) => (
              <li
                key={hp}
                style={{
                  display: "flex",
                  gap: 10,
                  color: "var(--text2)",
                  fontSize: isSmall ? 13.5 : 14.5,
                  lineHeight: 1.7,
                }}
              >
                <span
                  style={{ color: accent, flexShrink: 0, marginTop: 2 }}
                  aria-hidden
                >
                  ▸
                </span>
                <span>{hp}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <Step
          label="Result"
          body={caseStudy.result}
          accent={accent}
          isSmall={isSmall}
        />
      </RevealStagger>

      <RevealStagger
        stagger={0.08}
        delayChildren={0.05}
        amount={0.15}
        style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
          gap: isSmall ? 10 : 16,
          marginTop: 18,
        }}
      >
        {caseStudy.metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={scaleIn}
            style={{
              padding: isSmall ? "14px 12px" : "18px 16px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isSmall ? 18 : 22,
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                color: "var(--text3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginTop: 4,
              }}
            >
              {m.label}
            </div>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}

export default memo(CaseStudyBlockBase);
