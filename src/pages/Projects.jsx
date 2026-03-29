import { useState, useMemo, useRef, useEffect } from "react";
import { projects } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import ProjectCard from "../components/ProjectCard";
import { FiSearch } from "react-icons/fi";

/* ── Hook: triggers once when element enters viewport ── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Staggered grid wrapper that re-triggers on filter change ── */
function AnimatedGrid({ children, filterKey, isMobile }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

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

export default function Projects() {
  const [domainTab, setDomainTab] = useState("all");
  const [category, setCategory] = useState("All");
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  const [headerRef, headerVisible] = useReveal(0.05);
  const [emptyRef, emptyVisible] = useReveal(0.1);

  const mobileCategories = useMemo(
    () => ["All", "Wellness", "Social", "E-commerce / AR", "Entertainment"],
    [],
  );
  const webCategories = useMemo(() => ["All", "Web Applications"], []);

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
          : [
              "All",
              "Wellness",
              "Social",
              "E-commerce / AR",
              "Entertainment",
              "Web Applications",
            ],
    [domainTab, mobileCategories, webCategories],
  );
  const filtered = useMemo(
    () =>
      category === "All"
        ? domainFiltered
        : domainFiltered.filter((p) => p.category === category),
    [category, domainFiltered],
  );
  const domainTabs = useMemo(
    () => [
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
    ],
    [],
  );

  const filterKey = `${domainTab}-${category}`;

  /* Floating particles */
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 55 + Math.sin(i * 137.5) * 38,
    y: 15 + Math.cos(i * 97.3) * 70,
    size: 1.5 + (i % 3) * 1.2,
    delay: (i * 0.35) % 3,
    dur: 3 + (i % 4) * 0.8,
  }));

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* ─── HEADER ─── */}
      <section
        ref={headerRef}
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        {/* Breathing glow */}
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
              "radial-gradient(ellipse,rgba(0,229,255,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
            animation: "breathe 5s ease-in-out infinite",
          }}
        />
        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(0,229,255,${0.18 + (p.id % 3) * 0.14})`,
              animation: `float-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container">
          <div
            className="section-label"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
            }}
          >
            Portfolio
          </div>
          <h1
            className="section-title"
            style={{
              marginBottom: 14,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible
                ? "translateY(0) skewY(0deg)"
                : "translateY(20px) skewY(1deg)",
              transition:
                "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Mobile &amp; Web
            <br />
            <span
              style={{
                color: "var(--accent)",
                display: "inline-block",
                animation: headerVisible
                  ? "text-shimmer 4s ease-in-out infinite"
                  : "none",
              }}
            >
              Projects
            </span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 520,
              lineHeight: 1.75,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
            }}
          >
            Production apps and web platforms shipped to real users — from App
            Store &amp; Play Store mobile apps to SEO-optimised web platforms.
          </p>
        </div>
      </section>

      {/* ─── STICKY FILTER BAR ─── */}
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
            {/* Domain tabs */}
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
                    whiteSpace: "nowrap",
                    background: "transparent",
                    color:
                      domainTab === t.id ? "var(--accent)" : "var(--text3)",
                    borderBottom:
                      domainTab === t.id
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                    marginBottom: -1,
                    transition: "color 0.2s, border-color 0.2s",
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
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Category chips */}
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
              {categories.map((cat, ci) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="cat-chip"
                  style={{
                    padding: isSmall ? "5px 12px" : "6px 16px",
                    borderRadius: 100,
                    border: "1px solid",
                    fontFamily: "var(--font-mono)",
                    fontSize: isSmall ? 10 : 11,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    borderColor:
                      category === cat ? "var(--accent)" : "transparent",
                    background:
                      category === cat ? "rgba(0,229,255,0.1)" : "transparent",
                    color: category === cat ? "var(--accent)" : "var(--text3)",
                    transform:
                      category === cat ? "translateY(-1px)" : "translateY(0)",
                    transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── PROJECTS GRID ─── */}
      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
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
              {(visible) =>
                filtered.map((project, i) => {
                  const isFeatured =
                    i === 0 &&
                    filtered.length > 1 &&
                    !isMobile &&
                    category === "All" &&
                    domainTab !== "web";
                  return (
                    <div
                      key={project.id}
                      style={{
                        gridColumn: isFeatured ? "1 / -1" : "auto",
                        opacity: visible ? 1 : 0,
                        transform: visible
                          ? "translateY(0) scale(1)"
                          : "translateY(22px) scale(0.97)",
                        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                                   transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                        willChange: "transform, opacity",
                      }}
                    >
                      <ProjectCard project={project} featured={isFeatured} />
                    </div>
                  );
                })
              }
            </AnimatedGrid>
          )}
        </div>
      </section>

      <style>{`
        @keyframes breathe        { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.1);opacity:.7} }
        @keyframes float-particle { from{transform:translateY(0) translateX(0);opacity:.4} to{transform:translateY(-12px) translateX(6px);opacity:1} }
        @keyframes text-shimmer   { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.25) drop-shadow(0 0 8px var(--accent))} }

        /* Category chip hover glow when not selected */
        .cat-chip:hover {
          border-color: rgba(0,229,255,0.3) !important;
          color: var(--text2) !important;
          background: rgba(0,229,255,0.04) !important;
        }
      `}</style>
    </div>
  );
}
