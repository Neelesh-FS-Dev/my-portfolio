import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import SEO from "../shared/components/ui/SEO";
import uses from "../shared/data/uses";
import { useIsMobile, useIsSmall } from "../shared/hooks/useMediaQuery";
import {
  RevealStagger,
  fadeUp,
  scaleIn,
  hoverLift,
} from "../shared/components/motion";

export default function Uses() {
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <div>
      <SEO
        title="Uses — Neelesh Yadav | Stack, Tools & Workflow"
        description="A live record of the editor, languages, mobile and web frameworks, design tools, and infrastructure I reach for when shipping React Native and React work."
        path="/uses"
      />

      {/* ─── HERO ─── */}
      <section
        style={{
          padding: isMobile ? "40px 0 48px" : "60px 0 72px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        <RevealStagger
          className="container"
          stagger={0.1}
          delayChildren={0.05}
          style={{ position: "relative", zIndex: 1 }}
        >
          <motion.div className="section-label" variants={fadeUp}>
            Workflow
          </motion.div>
          <motion.h1
            className="section-title"
            variants={fadeUp}
            style={{ marginBottom: 14 }}
          >
            What I{" "}
            <span
              style={{
                color: "var(--accent)",
                display: "inline-block",
              }}
            >
              Use
            </span>
          </motion.h1>
          <motion.p
            variants={scaleIn}
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 620,
              lineHeight: 1.75,
            }}
          >
            The editor, libraries, services, and small habits that make up my
            day-to-day. Updated as the stack evolves — not a manifesto, just
            what's currently on my dock.
          </motion.p>
        </RevealStagger>
      </section>

      {/* ─── SECTIONS ─── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {uses.map((section, sIdx) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={section.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 + (sIdx % 3) * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: isSmall ? 18 : 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <header
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.22)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                      }}
                      aria-hidden
                    >
                      <Icon size={16} />
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-display)",
                        fontSize: isSmall ? 15 : 17,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {section.title}
                    </h2>
                  </header>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    {section.items.map((item) => (
                      <li
                        key={item.name}
                        style={{ display: "flex", flexDirection: "column", gap: 4 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontFamily: "var(--font-display)",
                            fontWeight: 600,
                            fontSize: isSmall ? 13 : 14,
                            color: "var(--text)",
                          }}
                        >
                          {item.url ? (
                            <motion.a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 2 }}
                              transition={hoverLift}
                              style={{
                                color: "var(--text)",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              {item.name}
                              <FiExternalLink
                                size={11}
                                style={{ color: "var(--text3)" }}
                                aria-hidden
                              />
                            </motion.a>
                          ) : (
                            item.name
                          )}
                        </div>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text2)",
                            fontSize: isSmall ? 12 : 13,
                            lineHeight: 1.65,
                          }}
                        >
                          {item.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>

          <p
            style={{
              marginTop: 40,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text3)",
              textAlign: "center",
            }}
          >
            Missing something? Suggestions welcome — drop me a note via the{" "}
            <a href="/contact" style={{ color: "var(--accent)" }}>
              contact page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
