import { motion } from "framer-motion";
import { certifications } from "../data/education";
import { certIconMap } from "../utils/certIcons";
import {
  Reveal,
  RevealStagger,
  scaleIn,
  hoverLift,
} from "../../../shared/components/motion";

export interface CertificationsSectionProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function CertificationsSection({
  isMobile,
  isSmall,
}: CertificationsSectionProps) {
  return (
    <div style={{ marginTop: 44 }}>
      <Reveal preset="fadeIn">
        <div className="section-label">Certifications</div>
      </Reveal>
      <RevealStagger
        stagger={0.1}
        delayChildren={0.05}
        amount={0.12}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
          marginTop: 18,
        }}
      >
        {certifications.map((cert) => (
          <motion.div
            key={cert.name}
            className="cert-card"
            variants={scaleIn}
            whileHover={{
              y: -4,
              borderColor: cert.color + "55",
              boxShadow: `0 14px 32px ${cert.color}22`,
            }}
            transition={hoverLift}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: isSmall ? "14px 16px" : "16px 20px",
              display: "flex",
              gap: 14,
              alignItems: "center",
              cursor: "default",
              willChange: "transform",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -6 }}
              transition={hoverLift}
              className="cert-icon"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: cert.color + "18",
                border: `1px solid ${cert.color}28`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {certIconMap[cert.icon] ?? cert.icon}
            </motion.div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: isSmall ? 13 : 14,
                  marginBottom: 2,
                }}
              >
                {cert.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: cert.color,
                }}
              >
                {cert.issuer} · {cert.year}
              </div>
              {cert.credentialId && (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    marginTop: 2,
                  }}
                >
                  ID: {cert.credentialId}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </RevealStagger>
    </div>
  );
}
