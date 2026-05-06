import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Project } from "../types";
import { useIsMobile } from "../../../shared/hooks/useMediaQuery";
import { useReveal } from "../../../shared/hooks/useReveal";
import ProjectCard from "./ProjectCard";
import { FiSearch } from "react-icons/fi";

/* ── Staggered grid wrapper that re-triggers on filter change ── */
interface AnimatedGridProps {
  children: (visible: boolean) => ReactNode;
  filterKey: string;
  isMobile: boolean;
}

function AnimatedGrid({ children, filterKey, isMobile }: AnimatedGridProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Re-animate on filter change */
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [filterKey]);

  /* Also trigger on scroll-in */
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.04 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 16,
      }}
    >
      {children(visible)}
    </div>
  );
}

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
  const [emptyRef, emptyVisible] = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="section">
      <div className="container">
        {projects.length === 0 ? (
          <div
            ref={emptyRef}
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--text3)",
              opacity: emptyVisible ? 1 : 0,
              transform: emptyVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <FiSearch size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
              No projects in this category yet
            </p>
          </div>
        ) : (
          <AnimatedGrid filterKey={filterKey} isMobile={isMobile}>
            {() =>
              projects.map((project, i) => {
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
                    }}
                  >
                    <ProjectCard
                      project={project}
                      featured={isFeatured}
                      index={i}
                    />
                  </div>
                );
              })
            }
          </AnimatedGrid>
        )}
      </div>
    </section>
  );
}
