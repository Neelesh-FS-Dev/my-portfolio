import { TbBrandReactNative } from "react-icons/tb";
import { SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { useReveal } from "../../../shared/hooks/useReveal";
import { generateParticles } from "../../../shared/data/particles";
import { getExperience } from "../../../shared/utils/getExperience";

export interface ExperienceHeroProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function ExperienceHero({
  isMobile,
  isSmall,
}: ExperienceHeroProps) {
  const [headerRef, headerVisible] = useReveal<HTMLElement>(0.05);

  /* Floating particles in hero */
  const particles = generateParticles(14);

  return (
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
            "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)",
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
            background: `rgba(59,130,246,${0.2 + (p.id % 3) * 0.15})`,
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
            transition: "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
          }}
        >
          {getExperience("2023-01-01")} of experience building production-grade
          mobile apps with React Native and web platforms using React &amp;
          Tailwind CSS.
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
              bg: "rgba(59,130,246,0.07)",
              border: "rgba(59,130,246,0.25)",
            },
            {
              icon: <SiReact size={12} />,
              label: "React.js / JS",
              color: "var(--accent)",
              bg: "rgba(59,130,246,0.07)",
              border: "rgba(59,130,246,0.25)",
            },
            {
              icon: <SiTailwindcss size={12} />,
              label: "Tailwind CSS / Vite",
              color: "var(--green)",
              bg: "rgba(59,130,246,0.07)",
              border: "rgba(59,130,246,0.25)",
            },
            {
              icon: <SiTypescript size={12} />,
              label: "TypeScript / Redux",
              color: "var(--accent3)",
              bg: "rgba(59,130,246,0.07)",
              border: "rgba(59,130,246,0.25)",
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
  );
}
