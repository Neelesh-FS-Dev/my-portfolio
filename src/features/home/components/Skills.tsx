import { useState } from "react";
import { motion } from "framer-motion";
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

          <div
            style={{
              display: "inline-flex",
              gap: 4,
              padding: "6px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
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
                  transition: "all .25s",
                  border: "none",
                  background:
                    activeTab === tab.id
                      ? "linear-gradient(135deg, var(--accent), var(--accent-3))"
                      : "transparent",
                  color: activeTab === tab.id ? "#04070a" : "var(--text2)",
                  fontWeight: activeTab === tab.id ? 700 : 400,
                  boxShadow:
                    activeTab === tab.id
                      ? "0 0 22px rgba(0,229,255,0.35)"
                      : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

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

        {/* Animated skill badges with progress fill */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
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
            const accent = skillIconColors[skill.icon] ?? "var(--accent)";
            return (
              <motion.a
                key={skill.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${skill.name} — open official site`}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.92 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="glass glass-hover"
                style={{
                  padding: isSmall ? "16px 14px" : "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  cursor: href ? "pointer" : "default",
                  position: "relative",
                  minHeight: isSmall ? 124 : 144,
                  textDecoration: "none",
                  color: "inherit",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: isSmall ? 24 : 28,
                    color: accent,
                    display: "flex",
                    alignItems: "center",
                    height: isSmall ? 28 : 32,
                    filter: `drop-shadow(0 0 12px ${accent}55)`,
                  }}
                >
                  {icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: isSmall ? 13 : 14,
                    color: "var(--text)",
                    lineHeight: 1.2,
                    marginTop: "auto",
                  }}
                >
                  {skill.name}
                </span>

                {/* Animated progress bar */}
                <div
                  style={{
                    position: "relative",
                    height: 3,
                    width: "100%",
                    borderRadius: 100,
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, var(--accent), var(--accent-2))`,
                      boxShadow: `0 0 10px var(--accent-glow)`,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "var(--text3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>proficiency</span>
                  <span style={{ color: accent }}>{skill.level}%</span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Skill categories — auto-scrolling marquee */}
        <div className="marquee" aria-label="Skill categories">
          <div
            className="marquee-track"
            style={{ gap: 14, animationDuration: "70s" }}
          >
            {[...filteredSkills, ...filteredSkills].map((cat, i) => (
              <div
                key={`${cat.category}-${i}`}
                className="glass glass-hover"
                style={{
                  padding: isSmall ? "16px" : "20px",
                  flexShrink: 0,
                  width: isSmall ? 260 : isMobile ? 300 : 320,
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
                      filter: `drop-shadow(0 0 10px ${skillIconColors[cat.icon] ?? "rgba(0,229,255,0.5)"})`,
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
                            ? "var(--accent-2)"
                            : "var(--accent-3)",
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
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
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
