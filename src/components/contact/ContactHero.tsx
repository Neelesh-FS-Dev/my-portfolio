import { useReveal } from "../../hooks/useReveal";
import { generateParticles } from "../../data/particles";

export interface ContactHeroProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function ContactHero({ isMobile, isSmall }: ContactHeroProps) {
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
      {/* Breathing radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "8%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)",
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
          Get In Touch
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
          Let's Build
          <br />
          <span
            style={{
              color: "var(--accent)",
              display: "inline-block",
              animation: headerVisible
                ? "text-shimmer 4s ease-in-out infinite"
                : "none",
            }}
          >
            Together
          </span>
        </h1>
        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 14 : 17,
            maxWidth: 460,
            lineHeight: 1.75,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
          }}
        >
          I'm open to React Native roles, freelance projects, and interesting
          collaborations. Let's talk.
        </p>
      </div>
    </section>
  );
}
