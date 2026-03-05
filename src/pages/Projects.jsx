import { useState } from "react";
import { projects } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [domainTab, setDomainTab] = useState("all");
  const [category, setCategory] = useState("All");
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  const mobileCategories = [
    "All",
    "Wellness",
    "Social",
    "E-commerce / AR",
    "Entertainment",
  ];
  const webCategories = ["All", "Web App"];

  const domainFiltered =
    domainTab === "all"
      ? projects
      : projects.filter((p) => p.type === domainTab);
  const categories =
    domainTab === "web"
      ? webCategories
      : domainTab === "mobile"
        ? mobileCategories
        : [
            "All",
            "Wellness",
            "Social",
            "E-commerce / AR",
            "Entertainment",
            "Web App",
          ];
  const filtered =
    category === "All"
      ? domainFiltered
      : domainFiltered.filter((p) => p.category === category);

  const domainTabs = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "mobile",
      label: "📱 Mobile",
      count: projects.filter((p) => p.type === "mobile").length,
    },
    {
      id: "web",
      label: "🌐 Web",
      count: projects.filter((p) => p.type === "web").length,
    },
  ];

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* Header */}
      <section
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(0,229,255,0.06) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container">
          <div className="section-label">Portfolio</div>
          <h1 className="section-title" style={{ marginBottom: 14 }}>
            Mobile & Web
            <br />
            <span style={{ color: "var(--accent)" }}>Projects</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 520,
              lineHeight: 1.75,
            }}
          >
            Production apps and web platforms shipped to real users — from App
            Store & Play Store mobile apps to SEO-optimised web platforms.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: isMobile ? 60 : 64,
          zIndex: 100,
          background: "rgba(9,12,16,0.96)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Domain tabs row */}
            <div
              style={{
                display: "flex",
                gap: 0,
                paddingTop: 10,
                paddingBottom: 0,
                borderBottom: "1px solid var(--border)",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {domainTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDomainTab(t.id);
                    setCategory("All");
                  }}
                  style={{
                    padding: isSmall ? "8px 14px" : "10px 20px",
                    border: "none",
                    fontFamily: "var(--font-display)",
                    fontSize: isSmall ? 12 : 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .2s",
                    whiteSpace: "nowrap",
                    background: "transparent",
                    color:
                      domainTab === t.id ? "var(--accent)" : "var(--text3)",
                    borderBottom:
                      domainTab === t.id
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {t.label}
                  <span
                    style={{
                      marginLeft: 6,
                      padding: "1px 6px",
                      borderRadius: 100,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      background:
                        domainTab === t.id
                          ? "rgba(0,229,255,0.15)"
                          : "rgba(255,255,255,0.05)",
                      color:
                        domainTab === t.id ? "var(--accent)" : "var(--text3)",
                    }}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Category chips row */}
            <div
              style={{
                display: "flex",
                gap: 4,
                padding: "8px 0",
                overflowX: "auto",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: isSmall ? "5px 12px" : "6px 16px",
                    borderRadius: 100,
                    border: "1px solid",
                    fontFamily: "var(--font-mono)",
                    fontSize: isSmall ? 10 : 11,
                    whiteSpace: "nowrap",
                    transition: "all .2s",
                    cursor: "pointer",
                    borderColor:
                      category === cat ? "var(--accent)" : "transparent",
                    background:
                      category === cat ? "rgba(0,229,255,0.1)" : "transparent",
                    color: category === cat ? "var(--accent)" : "var(--text3)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--text3)",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
                No projects in this category yet
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  style={{
                    gridColumn:
                      i === 0 &&
                      filtered.length > 1 &&
                      !isMobile &&
                      category === "All" &&
                      domainTab !== "web"
                        ? "1 / -1"
                        : "auto",
                  }}
                >
                  <ProjectCard
                    project={project}
                    featured={
                      i === 0 &&
                      filtered.length > 1 &&
                      !isMobile &&
                      category === "All" &&
                      domainTab !== "web"
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
