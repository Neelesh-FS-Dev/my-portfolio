import { useState } from "react";
import { skillCategories, techStack } from "../../data";
import { skillIconMap } from "../../utils/skillIcons";

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
  const highlightedStack = filteredStack.slice(0, isMobile ? 6 : 8);
  const previewCount = isSmall ? 4 : 5;

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
            Skills & Expertise
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
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 8,
            marginBottom: isMobile ? 24 : 34,
          }}
        >
          {highlightedStack.map((skill) => (
            <div
              key={skill.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: isSmall ? "12px 14px" : "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Domain indicator dot */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background:
                    skill.domain === "mobile"
                      ? "var(--accent)"
                      : skill.domain === "web"
                        ? "var(--accent2)"
                        : "var(--green)",
                  boxShadow: `0 0 6px ${skill.domain === "mobile" ? "rgba(59,130,246,0.5)" : skill.domain === "web" ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.5)"}`,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 7,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: isSmall ? 13 : 14,
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: skill.color,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    borderRadius: 100,
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 100,
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg,${skill.color}88,${skill.color})`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill categories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmall
              ? "1fr"
              : isMobile
                ? "1fr 1fr"
                : "repeat(3,1fr)",
            gap: 14,
          }}
        >
          {filteredSkills.map((cat) => (
            <div
              key={cat.category}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: isSmall ? "16px" : "18px",
                transition: "border-color .3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor =
                  cat.domain === "mobile"
                    ? "rgba(59,130,246,0.25)"
                    : cat.domain === "web"
                      ? "rgba(59,130,246,0.25)"
                      : "rgba(59,130,246,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
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
                {cat.items.slice(0, previewCount).map((item) => (
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
                {cat.items.length > previewCount && (
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 100,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text3)",
                      border: "1px dashed var(--border-bright)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    +{cat.items.length - previewCount} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
