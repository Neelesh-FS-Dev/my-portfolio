import { motion } from "framer-motion";
import { generateParticles } from "../../../shared/data/particles";
import personal from "../../../shared/data/personal";
import { FiCalendar, FiMail, FiPhone, FiLinkedin } from "react-icons/fi";
import {
  RevealStagger,
  fadeUp,
  scaleIn,
  hoverLift,
  hoverLiftTarget,
  tapTarget,
} from "../../../shared/components/motion";

export interface ContactHeroProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function ContactHero({ isMobile, isSmall }: ContactHeroProps) {
  /* Floating particles */
  const particles = generateParticles(12);

  // Cal.com booking link. Set VITE_CAL_USERNAME=your-handle (or a full URL via
  // VITE_CAL_URL) in your env to enable the "Book a call" CTA.
  const calUsername = import.meta.env.VITE_CAL_USERNAME as string | undefined;
  const calUrl =
    (import.meta.env.VITE_CAL_URL as string | undefined) ||
    (calUsername ? `https://cal.com/${calUsername}/15min` : null);

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

      <RevealStagger
        className="container"
        stagger={0.1}
        delayChildren={0.05}
      >
        <motion.div className="section-label" variants={fadeUp}>
          Hire Me
        </motion.div>
        <motion.h1
          className="section-title"
          variants={fadeUp}
          style={{ marginBottom: 14 }}
        >
          Discuss a
          <br />
          <span
            style={{
              color: "var(--accent)",
              display: "inline-block",
              animation: "text-shimmer 4s ease-in-out infinite",
            }}
          >
            Project With Me
          </span>
        </motion.h1>
        <motion.p
          variants={scaleIn}
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 14 : 17,
            maxWidth: 520,
            lineHeight: 1.75,
            marginBottom: 12,
          }}
        >
          Open to React Native roles, freelance builds, RN upgrades, and
          collaborations. Send a message below or reach out directly — I
          typically reply within 24 hours.
        </motion.p>

        {/* Quick-action CTAs */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 22,
          }}
        >
          {calUrl && (
            <motion.a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: 13, padding: "10px 22px" }}
              whileHover={hoverLiftTarget}
              whileTap={tapTarget}
              transition={hoverLift}
            >
              <FiCalendar
                size={15}
                style={{ marginRight: 6, verticalAlign: "middle" }}
              />
              Book a 15-min Call
            </motion.a>
          )}
          <motion.a
            href={`mailto:${personal.email}`}
            className={calUrl ? "btn btn-outline" : "btn btn-primary"}
            style={{ fontSize: 13, padding: "10px 22px" }}
            whileHover={hoverLiftTarget}
            whileTap={tapTarget}
            transition={hoverLift}
          >
            <FiMail
              size={15}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            Email Me Directly
          </motion.a>
          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ fontSize: 13, padding: "10px 22px" }}
            whileHover={hoverLiftTarget}
            whileTap={tapTarget}
            transition={hoverLift}
          >
            <FiLinkedin
              size={15}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            Book on LinkedIn
          </motion.a>
          <motion.a
            href={`tel:${personal.phone}`}
            className="btn btn-outline"
            style={{ fontSize: 13, padding: "10px 22px" }}
            whileHover={hoverLiftTarget}
            whileTap={tapTarget}
            transition={hoverLift}
          >
            <FiPhone
              size={15}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            Call
          </motion.a>
        </motion.div>
      </RevealStagger>
    </section>
  );
}
