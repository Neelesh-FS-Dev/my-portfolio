import { useState } from "react";
import { skillCategories, techStack } from "../data/skills";
import {
  skillIconMap,
  skillIconColors,
  skillIconUrls,
} from "../utils/skillIcons";

export interface SkillsProps {
  isMobile: boolean;
  isSmall: boolean;
}

type SkillsTab = "all" | "mobile" | "web";

export default function Skills({ isMobile, isSmall }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<SkillsTab>("all");

  const filteredStack =
    activeTab === "all"
      ? techStack
      : techStack.filter((s) => s.domain === activeTab || s.domain === "both");
  const filteredSkills =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter(
          (s) => s.domain === activeTab || s.domain === "both",
        );
  const highlightedStack = filteredStack.slice(
    0,
    isSmall ? 6 : isMobile ? 9 : 12,
  );

  const tabs = [
    { id: "all", label: "All Skills" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web" },
  ] as const satisfies ReadonlyArray<{ id: SkillsTab; label: string }>;

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-num">04 /</span> Skills & Expertise
          </div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            What I Build With
          </h2>

          {/* Tab toggle */}
          <div
            style={{
              display: "inline-flex",
              gap: 4,
              padding: "6px",
              borderRadius: 100,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: isSmall ? "7px 14px" : "8px 20px",
                  borderRadius: 100,
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 11 : 12,
                  cursor: "pointer",
                  transition: "all .2s",
                  border: "none",
                  background:
                    activeTab === tab.id ? "var(--accent)" : "transparent",
                  color: activeTab === tab.id ? "var(--bg)" : "var(--text2)",
                  fontWeight: activeTab === tab.id ? 700 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Core stack preview */}
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: isMobile ? 18 : 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isSmall ? 18 : 22,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Core Stack
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Top tools up front, broader coverage below
            </div>
          </div>
          {filteredStack.length > highlightedStack.length && (
            <span className="tag tag-cyan">
              +{filteredStack.length - highlightedStack.length} more in domains
            </span>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmall
              ? "repeat(2, 1fr)"
              : isMobile
                ? "repeat(3, 1fr)"
                : "repeat(4, 1fr)",
            gap: 10,
            marginBottom: isMobile ? 24 : 34,
          }}
        >
          {highlightedStack.map((skill) => {
            const icon = skillIconMap[skill.icon] ?? null;
            const href = skillIconUrls[skill.icon];
            return (
              <a
                key={skill.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${skill.name} — open official site`}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: isSmall ? "16px 14px" : "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  transition:
                    "border-color 0.2s ease, transform 0.2s ease, background 0.2s ease",
                  cursor: href ? "pointer" : "default",
                  position: "relative",
                  minHeight: isSmall ? 110 : 130,
                  textDecoration: "none",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = "var(--surface2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <div
                  style={{
                    fontSize: isSmall ? 24 : 28,
                    color: skillIconColors[skill.icon] ?? "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    height: isSmall ? 28 : 32,
                  }}
                >
                  {icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: isSmall ? 13 : 14,
                    color: "var(--text)",
                    lineHeight: 1.2,
                    marginTop: "auto",
                  }}
                >
                  {skill.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Skill categories — auto-scrolling marquee */}
        <div className="marquee" aria-label="Skill categories">
          <div
            className="marquee-track"
            style={{ gap: 14, animationDuration: "70s" }}
          >
            {[...filteredSkills, ...filteredSkills].map((cat, i) => (
              <div
                key={`${cat.category}-${i}`}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: isSmall ? "16px" : "20px",
                  transition: "border-color .25s, transform .25s",
                  flexShrink: 0,
                  width: isSmall ? 260 : isMobile ? 300 : 320,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      color: skillIconColors[cat.icon] ?? "var(--accent)",
                    }}
                  >
                    {skillIconMap[cat.icon]}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color:
                        cat.domain === "mobile"
                          ? "var(--accent)"
                          : cat.domain === "web"
                            ? "var(--accent2)"
                            : "var(--green)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.category}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 100,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--text2)",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
