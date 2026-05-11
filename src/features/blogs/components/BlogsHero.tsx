import { motion } from "framer-motion";
import { useIsMobile, useIsSmall } from "../../../shared/hooks/useMediaQuery";
import { generateParticles } from "../../../shared/data/particles";
import {
  RevealStagger,
  fadeUp,
  scaleIn,
} from "../../../shared/components/motion";

export default function BlogsHero() {
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
      {/* Breathing glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "12%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)",
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
            background: `rgba(59,130,246,${0.2 + (p.id % 3) * 0.15})`,
            animation: `float-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      <RevealStagger
        className="container"
        stagger={0.12}
        delayChildren={0.05}
      >
        <motion.div className="section-label" variants={fadeUp}>
          Writing
        </motion.div>
        <motion.h1
          className="section-title"
          variants={fadeUp}
          style={{ marginBottom: 14 }}
        >
          Dev Blog &amp;
          <br />
          <span
            style={{
              color: "var(--accent3)",
              display: "inline-block",
              animation: "text-shimmer-orange 4s ease-in-out infinite",
            }}
          >
            Learnings
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
          Technical deep-dives on React Native, React, performance, and
          mobile/web architecture — from real production experience.
        </motion.p>
      </RevealStagger>

      <style>{`
        @keyframes breathe        { 0%,100%{transform:translateY(-50%) scale(1);opacity:1} 50%{transform:translateY(-50%) scale(1.12);opacity:.7} }
        @keyframes float-particle { from{transform:translateY(0) translateX(0);opacity:.4} to{transform:translateY(-12px) translateX(6px);opacity:1} }
        @keyframes text-shimmer-orange { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3) drop-shadow(0 0 8px var(--accent3))} }
      `}</style>
    </section>
  );
}
