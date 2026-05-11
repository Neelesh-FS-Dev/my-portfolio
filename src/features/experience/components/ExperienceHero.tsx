import { motion } from "framer-motion";
import { TbBrandReactNative } from "react-icons/tb";
import { SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { generateParticles } from "../../../shared/data/particles";
import { getExperience } from "../../../shared/utils/getExperience";
import {
  RevealStagger,
  fadeUp,
  scaleIn,
  popIn,
  hoverLift,
} from "../../../shared/components/motion";
import GLSLHills from "../../../shared/components/effects/GLSLHills";

export interface ExperienceHeroProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function ExperienceHero({
  isMobile,
  isSmall,
}: ExperienceHeroProps) {
  /* Floating particles in hero */
  const particles = generateParticles(14);

  const techBadges = [
    {
      icon: <TbBrandReactNative size={12} />,
      label: "React Native",
      color: "#ffffff",
      bg: "rgba(59,130,246,0.07)",
      border: "rgba(59,130,246,0.25)",
    },
    {
      icon: <SiReact size={12} />,
      label: "React.js / JS",
      color: "#ffffff",
      bg: "rgba(59,130,246,0.07)",
      border: "rgba(59,130,246,0.25)",
    },
    {
      icon: <SiTailwindcss size={12} />,
      label: "Tailwind CSS / Vite",
      color: "#ffffff",
      bg: "rgba(59,130,246,0.07)",
      border: "rgba(59,130,246,0.25)",
    },
    {
      icon: <SiTypescript size={12} />,
      label: "TypeScript / Redux",
      color: "#ffffff",
      bg: "rgba(59,130,246,0.07)",
      border: "rgba(59,130,246,0.25)",
    },
  ];

  return (
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
      <GLSLHills />
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

      <RevealStagger
        className="container"
        stagger={0.1}
        delayChildren={0.05}
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div className="section-label" variants={fadeUp}>
          Career
        </motion.div>
        <motion.h1
          className="section-title"
          variants={fadeUp}
          style={{ marginBottom: 14 }}
        >
          Work
          <br />
          <span
            style={{
              color: "var(--accent2)",
              display: "inline-block",
              animation: "text-shimmer 4s ease-in-out infinite",
            }}
          >
            Experience
          </span>
        </motion.h1>
        <motion.p
          variants={scaleIn}
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 14 : 17,
            maxWidth: 520,
            lineHeight: 1.75,
          }}
        >
          {getExperience("2023-01-01")} of experience building production-grade
          mobile apps with React Native and web platforms using React &amp;
          Tailwind CSS.
        </motion.p>

        {/* Tech badges — staggered pop-in */}
        <RevealStagger
          stagger={0.07}
          delayChildren={0.3}
          style={{
            display: "flex",
            gap: 8,
            marginTop: 24,
            flexWrap: "wrap",
          }}
        >
          {techBadges.map((t) => (
            <motion.span
              key={t.label}
              className="badge-hover"
              variants={popIn}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={hoverLift}
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
                cursor: "default",
                willChange: "transform",
              }}
            >
              {t.icon} {t.label}
            </motion.span>
          ))}
        </RevealStagger>
      </RevealStagger>
    </section>
  );
}
