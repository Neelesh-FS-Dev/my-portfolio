import { certifications } from "../../data";
import { useReveal } from "../../hooks/useReveal";
import { certIconMap } from "../../utils/certIcons";

export interface CertificationsSectionProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function CertificationsSection({
  isMobile,
  isSmall,
}: CertificationsSectionProps) {
  const [certRef, certVisible] = useReveal<HTMLDivElement>(0.1);

  return (
    <div style={{ marginTop: 44 }}>
      <div
        className="section-label"
        style={{
          opacity: certVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        Certifications
      </div>
      <div
        ref={certRef}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
          marginTop: 18,
        }}
      >
        {certifications.map((cert, i) => (
          <div
            key={cert.name}
            className="cert-card"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: isSmall ? "14px 16px" : "16px 20px",
              display: "flex",
              gap: 14,
              alignItems: "center",
              opacity: certVisible ? 1 : 0,
              transform: certVisible
                ? "translateY(0) scale(1)"
                : "translateY(16px) scale(0.96)",
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.1}s`,
              cursor: "default",
            }}
          >
            <div
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
                transition:
                  "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
              }}
              className="cert-icon"
            >
              {certIconMap[cert.icon] ?? cert.icon}
            </div>
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
          </div>
        ))}
      </div>
    </div>
  );
}
