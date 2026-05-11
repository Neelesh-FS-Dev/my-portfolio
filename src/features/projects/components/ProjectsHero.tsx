import { motion } from "framer-motion";
import { useIsMobile, useIsSmall } from "../../../shared/hooks/useMediaQuery";
import { generateParticles } from "../../../shared/data/particles";
import {
  RevealStagger,
  fadeUp,
  scaleIn,
} from "../../../shared/components/motion";
import GLSLHills from "../../../shared/components/effects/GLSLHills";

export default function ProjectsHero() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  /* Floating particles */
  const particles = generateParticles(12);

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
      {/* Breathing glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,rgba(59,130,246,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />
      {/* Particles */}
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
            background: `rgba(59,130,246,${0.18 + (p.id % 3) * 0.14})`,
            animation: `float-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      <RevealStagger
        className="container"
        stagger={0.12}
        delayChildren={0.05}
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div className="section-label" variants={fadeUp}>
          Portfolio
        </motion.div>
        <motion.h1
          className="section-title"
          variants={fadeUp}
          style={{ marginBottom: 14 }}
        >
          Mobile &amp; Web
          <br />
          <span
            style={{
              color: "var(--accent)",
              display: "inline-block",
              animation: "text-shimmer 4s ease-in-out infinite",
            }}
          >
            Projects
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
          Production apps and web platforms shipped to real users — from App
          Store &amp; Play Store mobile apps to SEO-optimised web platforms.
        </motion.p>
      </RevealStagger>

      <style>{`
        @keyframes breathe        { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.1);opacity:.7} }
        @keyframes float-particle { from{transform:translateY(0) translateX(0);opacity:.4} to{transform:translateY(-12px) translateX(6px);opacity:1} }
        @keyframes text-shimmer   { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.25) drop-shadow(0 0 8px var(--accent))} }
      `}</style>
    </section>
  );
}
