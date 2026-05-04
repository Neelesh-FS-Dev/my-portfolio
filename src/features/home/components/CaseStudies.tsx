import { Link } from "react-router-dom";
import caseStudies from "../../../shared/data/caseStudies";

export interface CaseStudiesProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function CaseStudies({ isMobile, isSmall }: CaseStudiesProps) {
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
            <div className="section-label">
              <span className="section-num">02 /</span> Production Work I'm
              Proud Of
            </div>
            <h2 className="section-title">Case Studies</h2>
          </div>
          <Link
            to="/projects"
            className="btn btn-outline"
            style={{ fontSize: 13, padding: "10px 22px" }}
          >
            All Projects →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 20 : 24,
          }}
        >
          {caseStudies.map((cs) => (
            <article
              key={cs.projectId}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: isSmall ? 22 : 28,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* accent bar */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: cs.accent,
                  opacity: 0.7,
                }}
              />

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: cs.accent,
                    marginBottom: 6,
                  }}
                >
                  Case Study
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: isSmall ? 22 : 26,
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                    color: "var(--text)",
                  }}
                >
                  {cs.title}
                </h3>
                <p
                  style={{
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                  }}
                >
                  {cs.tagline}
                </p>
              </div>

              {/* Problem → Built → Hard parts → Result */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <CaseStep
                  step="Problem"
                  body={cs.problem}
                  accent={cs.accent}
                  isSmall={isSmall}
                />
                <CaseStep
                  step="What I built"
                  body={cs.built}
                  accent={cs.accent}
                  isSmall={isSmall}
                />
                <div>
                  <StepLabel label="Hard parts" accent={cs.accent} />
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {cs.hardParts.map((hp) => (
                      <li
                        key={hp}
                        style={{
                          display: "flex",
                          gap: 8,
                          color: "var(--text2)",
                          fontSize: isSmall ? 12.5 : 13.5,
                          lineHeight: 1.65,
                        }}
                      >
                        <span
                          style={{
                            color: cs.accent,
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          ▸
                        </span>
                        <span>{hp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <CaseStep
                  step="Result"
                  body={cs.result}
                  accent={cs.accent}
                  isSmall={isSmall}
                />
              </div>

              {/* Metrics */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                  paddingTop: 14,
                  borderTop: "1px solid var(--border)",
                }}
              >
                {cs.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: isSmall ? 18 : 20,
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9.5,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={`/projects/${cs.projectId}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: cs.accent,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  textDecoration: "none",
                  marginTop: "auto",
                }}
              >
                Read the full case study <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: accent,
        marginBottom: 6,
      }}
    >
      {label}
    </div>
  );
}

interface CaseStepProps {
  step: string;
  body: string;
  accent: string;
  isSmall: boolean;
}

function CaseStep({ step, body, accent, isSmall }: CaseStepProps) {
  return (
    <div>
      <StepLabel label={step} accent={accent} />
      <p
        style={{
          color: "var(--text2)",
          fontSize: isSmall ? 12.5 : 13.5,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
