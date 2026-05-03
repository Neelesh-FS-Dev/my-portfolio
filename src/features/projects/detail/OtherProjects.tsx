import { Link, useNavigate } from "react-router-dom";
import { projects } from "../../data";
import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";

export interface OtherProjectsProps {
  currentId: string;
}

export default function OtherProjects({ currentId }: OtherProjectsProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <div style={{ marginTop: 72 }}>
      <div className="divider" style={{ marginBottom: 44 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isSmall ? 18 : 22,
            fontWeight: 700,
          }}
        >
          Other Projects
        </h3>
        <Link
          to="/projects"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--accent)",
          }}
        >
          View All →
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSmall
            ? "1fr"
            : isMobile
              ? "1fr 1fr"
              : "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {projects
          .filter((p) => p.id !== currentId)
          .slice(0, 3)
          .map((p) => (
            <div
              key={p.id}
              onClick={() => {
                navigate(`/projects/${p.id}`);
                window.scrollTo(0, 0);
              }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: isSmall ? 18 : 22,
                cursor: "pointer",
                transition: "all .25s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-bright)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isSmall ? 15 : 17,
                  fontWeight: 700,
                  marginBottom: 4,
                  color: "var(--text)",
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text3)",
                  marginBottom: 10,
                }}
              >
                {p.subtitle}
              </div>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                {p.description.slice(0, 80)}...
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
