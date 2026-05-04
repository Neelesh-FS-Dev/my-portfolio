import { Link } from "react-router-dom";
import {
  TbBrandReactNative,
  TbRefresh,
  TbMessage2,
  TbBolt,
  TbBox,
  TbUsers,
} from "react-icons/tb";
import services from "../../../shared/data/services";
import type { Service } from "../../../shared/data/services";

export interface ServicesProps {
  isMobile: boolean;
  isSmall: boolean;
}

function ServiceIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "mobile":
      return <TbBrandReactNative size={20} />;
    case "migration":
      return <TbRefresh size={20} />;
    case "chat":
      return <TbMessage2 size={20} />;
    case "performance":
      return <TbBolt size={20} />;
    case "build":
      return <TbBox size={20} />;
    case "instructor":
      return <TbUsers size={20} />;
    default:
      return <TbBox size={20} />;
  }
}

export default function Services({ isMobile, isSmall }: ServicesProps) {
  return (
    <section
      className="section"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? 28 : 40,
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <div className="section-label">
              <span className="section-num">06 /</span> Services
            </div>
            <h2 className="section-title">What I Can Help With</h2>
          </div>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ fontSize: 13, padding: "10px 22px" }}
          >
            Discuss a Project →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isSmall
                ? "1fr 1fr"
                : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              isSmall={isSmall}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  isSmall: boolean;
}

function ServiceCard({ service, isSmall }: ServiceCardProps) {
  return (
    <div
      style={{
        padding: isSmall ? 22 : 26,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        height: "100%",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
        }}
      >
        <ServiceIcon iconKey={service.icon} />
      </div>
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall ? 16 : 18,
            letterSpacing: "-0.01em",
            marginBottom: 6,
            color: "var(--text)",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 12.5 : 13.5,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {service.description}
        </p>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {service.outcomes.map((outcome) => (
          <li
            key={outcome}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              color: "var(--text3)",
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
