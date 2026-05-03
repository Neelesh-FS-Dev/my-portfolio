import { memo } from "react";
import { FiSmartphone, FiGlobe, FiExternalLink } from "react-icons/fi";
import type { ExperienceEntry, RoleType } from "../../types";
import { roleColors } from "../../data";
import { useReveal } from "../../hooks/useReveal";
import { useMagnetic } from "../../hooks/useMagnetic";
import { getExperience } from "../../utils/getExperience";

export interface JobCardProps {
  job: ExperienceEntry;
  idx: number;
  isMobile: boolean;
  isSmall: boolean;
}

function JobCard({ job, idx, isMobile, isSmall }: JobCardProps) {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  const magnetic = useMagnetic<HTMLDivElement>(14, 10);
  const lineColor = roleColors[job.type as RoleType];
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
              color: "var(--accent)",
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

export default memo(JobCard);
