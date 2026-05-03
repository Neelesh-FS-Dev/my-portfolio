import { useState, useMemo } from "react";
import {
  projects,
  mobileCategories,
  webCategories,
  allCategories,
} from "../data";
import SEO from "../components/SEO";
import ProjectsHero from "../components/projects/ProjectsHero";
import ProjectsFilterBar, {
  type DomainTab,
} from "../components/projects/ProjectsFilterBar";
import ProjectsGrid from "../components/projects/ProjectsGrid";

export default function Projects() {
  const [domainTab, setDomainTab] = useState<DomainTab>("all");
  const [category, setCategory] = useState<string>("All");

  const domainFiltered = useMemo(
    () =>
      domainTab === "all"
        ? projects
        : projects.filter((p) => p.type === domainTab),
    [domainTab],
  );
  const categories = useMemo(
    () =>
      domainTab === "web"
        ? webCategories
        : domainTab === "mobile"
          ? mobileCategories
          : allCategories,
    [domainTab],
  );
  const filtered = useMemo(
    () =>
      category === "All"
        ? domainFiltered
        : domainFiltered.filter((p) => p.category === category),
    [category, domainFiltered],
  );
  const domainTabs = useMemo(
    () =>
      [
        { id: "all", label: "All Projects", count: projects.length },
        {
          id: "mobile",
          label: "Mobile Apps",
          count: projects.filter((p) => p.type === "mobile").length,
        },
        {
          id: "web",
          label: "Web Applications",
          count: projects.filter((p) => p.type === "web").length,
        },
      ] as const satisfies ReadonlyArray<{
        id: DomainTab;
        label: string;
        count: number;
      }>,
    [],
  );

  const filterKey = `${domainTab}-${category}`;

  return (
    <div>
      <SEO
        title="Projects — Neelesh Yadav | Mobile & Web Apps Portfolio"
        description="Explore 10+ production mobile and web apps built by Neelesh Yadav — React Native, TypeScript, Redux, Firebase. Published on App Store & Play Store."
        path="/projects"
      />

      <ProjectsHero />

      <ProjectsFilterBar
        domainTabs={domainTabs}
        domainTab={domainTab}
        onDomainChange={(id) => {
          setDomainTab(id);
          setCategory("All");
        }}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
      />

      <ProjectsGrid
        projects={filtered}
        filterKey={filterKey}
        domainTab={domainTab}
        category={category}
      />
    </div>
  );
}
