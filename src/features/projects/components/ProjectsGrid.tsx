import type { Project } from "../types";
import { useIsMobile } from "../../../shared/hooks/useMediaQuery";
import ProjectCard from "./ProjectCard";
import { FiSearch } from "react-icons/fi";
import { Reveal } from "../../../shared/components/motion";
import SpotlightCard from "../../../shared/components/ui/SpotlightCard";

export interface ProjectsGridProps {
  projects: Project[];
  filterKey: string;
  domainTab: "all" | "mobile" | "web";
  category: string;
}

export default function ProjectsGrid({
  projects,
  filterKey,
  domainTab,
  category,
}: ProjectsGridProps) {
  const isMobile = useIsMobile();

  return (
    <section className="section">
      <div className="container">
        {projects.length === 0 ? (
          <Reveal preset="fadeUp" amount={0.2}>
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--text3)",
              }}
            >
              <FiSearch size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
                No projects in this category yet
              </p>
            </div>
          </Reveal>
        ) : (
          // `key` forces remount on filter change so each ProjectCard's
          // whileInView animation re-fires with its own staggered delay.
          <div
            key={filterKey}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 16,
            }}
          >
            {projects.map((project, i) => {
              const isFeatured =
                i === 0 &&
                projects.length > 1 &&
                !isMobile &&
                category === "All" &&
                domainTab !== "web";
              return (
                <div
                  key={`${filterKey}-${project.id}`}
                  style={{
                    gridColumn: isFeatured ? "1 / -1" : "auto",
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <SpotlightCard
                    accentColor={project.accent ?? "#3b82f6"}
                    style={{ width: "100%" }}
                  >
                    <ProjectCard
                      project={project}
                      featured={isFeatured}
                      index={i}
                    />
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
