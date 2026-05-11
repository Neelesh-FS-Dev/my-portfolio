import { memo } from "react";
import { motion } from "framer-motion";
import { FiSmartphone, FiGlobe, FiExternalLink } from "react-icons/fi";
import type { ExperienceEntry, RoleType } from "../types";
import { roleColors } from "../data/colorMapping";
import { useMagnetic } from "../../../shared/hooks/useMagnetic";
import { getExperience } from "../../../shared/utils/getExperience";
import {
  RevealStagger,
  fadeUp,
  popIn,
  slideRight,
  hoverLift,
} from "../../../shared/components/motion";

export interface JobCardProps {
  job: ExperienceEntry;
  idx: number;
  isMobile: boolean;
  isSmall: boolean;
}

function JobCard({ job, idx, isMobile, isSmall }: JobCardProps) {
  const magnetic = useMagnetic<HTMLDivElement>(14, 10);
  const lineColor = roleColors[job.type as RoleType];
  const allTech = [...(job.mobileTech || []), ...(job.webTech || [])];

  return (
    <motion.div
      initial={{ opacity: 0, x: -32, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.65,
        delay: idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: "relative",
        marginBottom: 56,
        paddingBottom: 56,
        borderBottom: "1px solid var(--border)",
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
                border: "1px solid rgba(59,130,246,0.3)",
                background: "rgba(59,130,246,0.08)",
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
            <motion.a
              href={job.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              transition={hoverLift}
              style={{
                fontSize: 15,
                color: lineColor,
                fontWeight: 500,
                marginBottom: 2,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {job.company} <FiExternalLink size={13} />
            </motion.a>
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
        <motion.div
          {...magnetic}
          whileHover={{
            boxShadow: `0 8px 32px ${lineColor}18`,
            borderColor: `${lineColor}40`,
          }}
          transition={hoverLift}
          style={{
            background: "var(--surface)",
            border: `1px solid ${lineColor}20`,
            borderRadius: 14,
            padding: isSmall ? "12px 16px" : "14px 20px",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            willChange: "transform",
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
        </motion.div>
      </div>

      {/* Tech stack */}
      {job.type === "current" && job.mobileTech?.length > 0 && (
        <RevealStagger
          stagger={0.1}
          delayChildren={idx * 0.1 + 0.2}
          amount={0.1}
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
              color: "var(--accent)",
              items: job.webTech,
            },
          ].map((d) => (
            <motion.div
              key={d.label}
              variants={fadeUp}
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
              <RevealStagger
                stagger={0.04}
                delayChildren={0.05}
                amount={0.1}
                style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
              >
                {d.items.map((item) => (
                  <motion.span
                    key={item}
                    className="tech-pill"
                    variants={popIn}
                    whileHover={{ scale: 1.08, y: -2 }}
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
                    {item}
                  </motion.span>
                ))}
              </RevealStagger>
            </motion.div>
          ))}
        </RevealStagger>
      )}

      {job.type !== "current" && allTech.length > 0 && (
        <RevealStagger
          stagger={0.04}
          delayChildren={idx * 0.1 + 0.15}
          amount={0.1}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 16,
          }}
        >
          {allTech.map((t) => (
            <motion.span
              key={t}
              className="tech-pill"
              variants={popIn}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={hoverLift}
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                cursor: "default",
                willChange: "transform",
              }}
            >
              {t}
            </motion.span>
          ))}
        </RevealStagger>
      )}

      {/* Highlights */}
      <RevealStagger
        stagger={0.07}
        delayChildren={idx * 0.1 + 0.25}
        amount={0.1}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {job.highlights.map((h, hi) => (
          <motion.div
            key={hi}
            variants={slideRight}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
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
          </motion.div>
        ))}
      </RevealStagger>
    </motion.div>
  );
}

export default memo(JobCard);
