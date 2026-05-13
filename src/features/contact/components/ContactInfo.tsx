import { motion } from "framer-motion";
import personal from "../../../shared/data/personal";
import {
  FiMail,
  FiGithub,
  FiInstagram,
  FiMapPin,
  FiPhone,
  FiLinkedin,
} from "react-icons/fi";
import ContactRow from "./ContactRow";
import type { ContactItem } from "./ContactRow";
import {
  Reveal,
  RevealStagger,
  scaleIn,
} from "../../../shared/components/motion";

export interface ContactInfoProps {
  isSmall: boolean;
}

const glassCard = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18,
  backdropFilter: "blur(14px) saturate(140%)",
  WebkitBackdropFilter: "blur(14px) saturate(140%)",
  boxShadow:
    "0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 50px rgba(0,0,0,0.25)",
} as const;

export default function ContactInfo({ isSmall }: ContactInfoProps) {
  const linkedInHandle = personal.linkedin.replace(/^https?:\/\/(www\.)?/, "");
  const githubHandle = personal.github.replace(/^https?:\/\/(www\.)?/, "");
  const instagramHandle = personal.instagram
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\/$/, "");

  const directItems: ContactItem[] = [
    {
      icon: <FiMail size={18} />,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: <FiPhone size={18} />,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
  ];

  const socialItems: ContactItem[] = [
    {
      icon: <FiLinkedin size={18} />,
      label: "LinkedIn",
      value: linkedInHandle,
      href: personal.linkedin,
    },
    {
      icon: <FiGithub size={18} />,
      label: "GitHub",
      value: githubHandle,
      href: personal.github,
    },
    {
      icon: <FiInstagram size={18} />,
      label: "Instagram",
      value: instagramHandle,
      href: personal.instagram,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Reveal preset="fadeUp">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isSmall ? 20 : 24,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Contact Info
        </h2>
      </Reveal>

      {/* ── Status card ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleIn}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          ...glassCard,
          padding: isSmall ? 18 : 22,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft inner glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
            filter: "blur(10px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
            position: "relative",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 10px var(--green)",
                animation: "pulse 2s infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "1px solid var(--green)",
                opacity: 0.4,
                animation: "ripple-sm 2s ease-out infinite",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: isSmall ? 14 : 16,
            }}
          >
            Available Now
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text3)",
              padding: "3px 8px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            ~24h reply
          </span>
        </div>

        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 13 : 14,
            lineHeight: 1.65,
            marginBottom: 14,
            position: "relative",
          }}
        >
          Open to full-time React Native roles, freelance projects, and
          consulting.
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text2)",
            position: "relative",
          }}
        >
          <FiMapPin size={13} style={{ color: "var(--accent)" }} />
          {personal.location}
        </div>
      </motion.div>

      {/* ── Direct channels card ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scaleIn}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{ ...glassCard, padding: isSmall ? 14 : 18 }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text3)",
            marginBottom: 10,
            paddingLeft: 4,
          }}
        >
          Direct
        </div>
        <RevealStagger
          stagger={0.06}
          delayChildren={0.05}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {directItems.map((item) => (
            <ContactRow key={item.label} item={item} isSmall={isSmall} />
          ))}
        </RevealStagger>
      </motion.div>

      {/* ── Socials card ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scaleIn}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ ...glassCard, padding: isSmall ? 14 : 18 }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text3)",
            marginBottom: 10,
            paddingLeft: 4,
          }}
        >
          Socials
        </div>
        <RevealStagger
          stagger={0.06}
          delayChildren={0.05}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {socialItems.map((item) => (
            <ContactRow key={item.label} item={item} isSmall={isSmall} />
          ))}
        </RevealStagger>
      </motion.div>
    </div>
  );
}
