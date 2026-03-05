import { NavLink } from "react-router-dom";
import { personal } from "../data";
import { useIsSmall } from "../hooks/useMediaQuery";

export default function Footer() {
  const isSmall = useIsSmall();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "36px 0",
        background: "var(--bg)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          alignItems: isSmall ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg,#00e5ff,#7c4dff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 12,
              color: "#090c10",
            }}
          >
            N
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text3)",
            }}
          >
            © 2024 {personal.name}
          </span>
        </div>

        <div
          style={{ display: "flex", gap: isSmall ? 16 : 24, flexWrap: "wrap" }}
        >
          {[
            { label: "GitHub", href: personal.github, external: true },
            {
              label: "Email",
              href: `mailto:${personal.email}`,
              external: false,
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                letterSpacing: "0.05em",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text3)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text3)",
          }}
        >
          React Native · React.js · Tailwind
        </span>
      </div>
    </footer>
  );
}
