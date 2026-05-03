import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import { generateParticles } from "../../data/particles";

export default function BlogsHero() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const [headerRef, headerVisible] = useReveal<HTMLElement>(0.05);

  /* Floating particles */
  const particles = generateParticles(12);

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

      <div className="container">
        <div
          className="section-label"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
        >
          Writing
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
          Dev Blog &amp;
          <br />
          <span
            style={{
              color: "var(--accent3)",
              display: "inline-block",
              animation: headerVisible
                ? "text-shimmer-orange 4s ease-in-out infinite"
                : "none",
            }}
          >
            Learnings
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
            transition:
              "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
          }}
        >
          Technical deep-dives on React Native, React, performance, and
          mobile/web architecture — from real production experience.
        </p>
      </div>

      <style>{`
        @keyframes breathe        { 0%,100%{transform:translateY(-50%) scale(1);opacity:1} 50%{transform:translateY(-50%) scale(1.12);opacity:.7} }
        @keyframes float-particle { from{transform:translateY(0) translateX(0);opacity:.4} to{transform:translateY(-12px) translateX(6px);opacity:1} }
        @keyframes text-shimmer-orange { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3) drop-shadow(0 0 8px var(--accent3))} }
      `}</style>
    </section>
  );
}
