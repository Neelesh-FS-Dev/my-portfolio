import { personal } from "../../data";
import { useReveal } from "../../hooks/useReveal";
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

export interface ContactInfoProps {
  isSmall: boolean;
}

export default function ContactInfo({ isSmall }: ContactInfoProps) {
  const [infoRef, infoVisible] = useReveal<HTMLDivElement>(0.08);
  const [availRef, availVisible] = useReveal<HTMLDivElement>(0.1);

  const linkedInHandle = personal.linkedin.replace(/^https?:\/\/(www\.)?/, "");
  const githubHandle = personal.github.replace(/^https?:\/\/(www\.)?/, "");
  const instagramHandle = personal.instagram
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\/$/, "");

  const contactItems: ContactItem[] = [
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
    {
      icon: <FiMapPin size={18} />,
      label: "Location",
      value: personal.location,
      href: null,
    },
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
    <div ref={infoRef}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isSmall ? 20 : 24,
          fontWeight: 700,
          marginBottom: 24,
          opacity: infoVisible ? 1 : 0,
          transform: infoVisible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        Contact Info
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 28,
        }}
      >
        {contactItems.map((item, idx) => (
          <ContactRow
            key={item.label}
            item={item}
            idx={idx}
            visible={infoVisible}
            isSmall={isSmall}
          />
        ))}
      </div>

      {/* Availability badge */}
      <div
        ref={availRef}
        style={{
          padding: "20px",
          borderRadius: 16,
          background:
            "linear-gradient(135deg,rgba(0,255,136,0.08) 0%,rgba(0,229,255,0.05) 100%)",
          border: "1px solid rgba(0,255,136,0.2)",
          opacity: availVisible ? 1 : 0,
          transform: availVisible
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.97)",
          transition:
            "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
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
        </div>
        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 13 : 14,
            lineHeight: 1.65,
          }}
        >
          Open to full-time React Native roles, freelance projects, and
          consulting. Response within 24 hours.
        </p>
      </div>
    </div>
  );
}
