import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../../data";
import ProjectCard from "../ProjectCard";

export interface FeaturedProjectsProps {
  isMobile: boolean;
  isSmall: boolean;
}

type ProjectsTab = "mobile" | "web";

export default function FeaturedProjects({
  isMobile,
  isSmall,
}: FeaturedProjectsProps) {
  const [tab, setTab] = useState<ProjectsTab>("mobile");

  const mobileProjects = projects.filter((p) => p.type === "mobile");
  const webProjects = projects.filter((p) => p.type === "web");

  return (
    <section
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
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
            <div className="section-label">Featured Work</div>
            <h2 className="section-title">Projects That Ship</h2>
          </div>
          <Link
            to="/projects"
            className="btn btn-outline"
            style={{ fontSize: 13, padding: "10px 22px" }}
          >
            All Projects →
          </Link>
        </div>

        {/* Mobile / Web toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {(
            [
              { id: "mobile", label: "Mobile Apps" },
              { id: "web", label: "Web Apps" },
            ] as const satisfies ReadonlyArray<{
              id: ProjectsTab;
              label: string;
            }>
          ).map((t) => (
            <button
              key={t.id}
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: isSmall ? "8px 16px" : "10px 22px",
                borderRadius: 100,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: isSmall ? 12 : 13,
                transition: "all .2s",
                border: "1px solid",
                background:
                  tab === t.id
                    ? t.id === "mobile"
                      ? "rgba(59,130,246,0.12)"
                      : "rgba(59,130,246,0.12)"
                    : "transparent",
                color:
                  tab === t.id
                    ? t.id === "mobile"
                      ? "var(--accent)"
                      : "var(--accent2)"
                    : "var(--text3)",
                borderColor:
                  tab === t.id
                    ? t.id === "mobile"
                      ? "rgba(59,130,246,0.3)"
                      : "rgba(59,130,246,0.3)"
                    : "var(--border)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {tab === "mobile" ? (
            <>
              <ProjectCard project={mobileProjects[0]} featured />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                }}
              >
                <ProjectCard project={mobileProjects[1]} />
                <ProjectCard project={mobileProjects[2]} />
              </div>
            </>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              {webProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
