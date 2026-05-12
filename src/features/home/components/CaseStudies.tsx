import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import caseStudies from "../../../shared/data/caseStudies";
import type { CaseStudy } from "../../../shared/data/caseStudies";
import {
  Reveal,
  hoverLift,
  hoverLiftTarget,
} from "../../../shared/components/motion";

export interface CaseStudiesProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function CaseStudies({ isMobile, isSmall }: CaseStudiesProps) {
  const [activeId, setActiveId] = useState(caseStudies[0]?.projectId ?? "");
  const active =
    caseStudies.find((c) => c.projectId === activeId) ?? caseStudies[0];

  if (!active) return null;

  return (
    <section
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <Reveal
          preset="fadeUp"
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
            <div className="section-label">
              <span className="section-num">02 /</span> Production Work I'm
              Proud Of
            </div>
            <h2 className="section-title">Case Studies</h2>
          </div>
          <motion.div
            whileHover={hoverLiftTarget}
            whileTap={{ scale: 0.97 }}
            transition={hoverLift}
          >
            <Link
              to="/projects"
              className="btn btn-outline"
              style={{ fontSize: 13, padding: "10px 22px" }}
            >
              All Projects →
            </Link>
          </motion.div>
        </Reveal>

        {/* Tab bar */}
        <Reveal preset="fadeUp">
          <LayoutGroup id="case-tabs">
            <div
              role="tablist"
              aria-label="Case studies"
              style={{
                display: "flex",
                gap: isSmall ? 8 : 10,
                marginBottom: isMobile ? 20 : 28,
                flexWrap: "wrap",
                paddingBottom: 4,
              }}
            >
              {caseStudies.map((cs, i) => {
                const isActive = cs.projectId === active.projectId;
                return (
                  <button
                    key={cs.projectId}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(cs.projectId)}
                    style={{
                      position: "relative",
                      background: "transparent",
                      border: "1px solid",
                      borderColor: isActive
                        ? `${cs.accent}66`
                        : "var(--border)",
                      borderRadius: 999,
                      padding: isSmall ? "8px 14px" : "10px 18px",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: isSmall ? 11 : 12,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: isActive ? "var(--text)" : "var(--text3)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "color .25s ease, border-color .25s ease",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="case-tab-bg"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 30,
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 999,
                          background: `${cs.accent}1a`,
                          boxShadow: `inset 0 0 0 1px ${cs.accent}40`,
                          zIndex: 0,
                        }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        color: cs.accent,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ position: "relative", zIndex: 1 }}>
                      {tabLabel(cs)}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        {/* Featured card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.projectId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <FeaturedCard
              cs={active}
              isMobile={isMobile}
              isSmall={isSmall}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function tabLabel(cs: CaseStudy) {
  // Use the short brand portion before the em-dash (if any), else the full title.
  const dashIdx = cs.title.indexOf("—");
  return dashIdx > 0 ? cs.title.slice(0, dashIdx).trim() : cs.title;
}

interface FeaturedCardProps {
  cs: CaseStudy;
  isMobile: boolean;
  isSmall: boolean;
}

function FeaturedCard({ cs, isMobile, isSmall }: FeaturedCardProps) {
  return (
    <article
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: isSmall ? 22 : isMobile ? 28 : 40,
        overflow: "hidden",
      }}
    >
      {/* accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${cs.accent} 0%, ${cs.accent}00 70%)`,
        }}
      />
      {/* corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 320,
          height: 320,
          background: `radial-gradient(circle, ${cs.accent}26 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 22,
              height: 1,
              background: cs.accent,
              opacity: 0.7,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: cs.accent,
              textShadow: `0 0 14px ${cs.accent}55`,
            }}
          >
            Case Study
          </span>
        </div>

        {/* Title + tagline */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall ? 28 : isMobile ? 34 : "clamp(36px, 4.2vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            margin: 0,
            marginBottom: 10,
          }}
        >
          {cs.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isSmall ? 12 : 13,
            letterSpacing: "0.04em",
            color: "var(--text3)",
            margin: 0,
            marginBottom: isMobile ? 28 : 36,
          }}
        >
          {cs.tagline}
        </p>

        {/* Two-column: Problem | What I built */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 22 : 36,
            paddingTop: isMobile ? 20 : 28,
            borderTop: "1px solid var(--border)",
          }}
        >
          <Block
            label="The problem"
            accent={cs.accent}
            body={cs.problem}
            isSmall={isSmall}
          />
          <Block
            label="What I built"
            accent={cs.accent}
            body={cs.built}
            isSmall={isSmall}
          />
        </div>

        {/* Hard parts */}
        <div style={{ marginTop: isMobile ? 28 : 36 }}>
          <SectionEyebrow label="Hard parts" accent={cs.accent} />
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {cs.hardParts.map((hp, idx) => (
              <li
                key={hp}
                style={{
                  display: "flex",
                  gap: isSmall ? 12 : 16,
                  alignItems: "flex-start",
                  color: "var(--text2)",
                  fontSize: isSmall ? 13 : 14.5,
                  lineHeight: 1.65,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: isSmall ? 11 : 12,
                    color: cs.accent,
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                    paddingTop: 4,
                    minWidth: 32,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")} →
                </span>
                <span>{hp}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Result */}
        <div style={{ marginTop: isMobile ? 28 : 36 }}>
          <Block
            label="Result"
            accent={cs.accent}
            body={cs.result}
            isSmall={isSmall}
          />
        </div>

        {/* Metrics + CTA row */}
        <div
          style={{
            marginTop: isMobile ? 28 : 40,
            paddingTop: isMobile ? 24 : 28,
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : `repeat(${cs.metrics.length}, minmax(0, 1fr)) auto`,
            gap: isMobile ? 18 : 24,
            alignItems: "center",
          }}
        >
          {cs.metrics.map((m) => (
            <div key={m.label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: isSmall ? 26 : 32,
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {m.value}
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
                {m.label}
              </div>
            </div>
          ))}

          <motion.div whileHover={{ x: 6 }} transition={hoverLift}>
            <Link
              to={`/projects/${cs.projectId}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: cs.accent,
                fontFamily: "var(--font-mono)",
                fontSize: isSmall ? 12.5 : 13.5,
                letterSpacing: "0.04em",
                textDecoration: "none",
                paddingBottom: 4,
                borderBottom: `1px solid ${cs.accent}55`,
                whiteSpace: "nowrap",
              }}
            >
              Read the full case study <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

function SectionEyebrow({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 18,
          height: 1,
          background: accent,
          opacity: 0.6,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {label}
      </span>
    </div>
  );
}

interface BlockProps {
  label: string;
  body: string;
  accent: string;
  isSmall: boolean;
}

function Block({ label, body, accent, isSmall }: BlockProps) {
  return (
    <div>
      <SectionEyebrow label={label} accent={accent} />
      <p
        style={{
          color: "var(--text2)",
          fontSize: isSmall ? 13.5 : 15,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
