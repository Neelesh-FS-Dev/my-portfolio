import { FiUser } from "react-icons/fi";
import testimonials from "../../../shared/data/testimonials";

export interface TestimonialsProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function Testimonials({
  isMobile,
  isSmall,
}: TestimonialsProps) {
  const cardWidth = isSmall ? 320 : isMobile ? 380 : 440;

  return (
    <section
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <div
          style={{
            marginBottom: isMobile ? 28 : 40,
          }}
        >
          <div className="section-label">
            <span className="section-num">07 /</span> Working With Me
          </div>
          <h2 className="section-title">What People Say</h2>
        </div>
      </div>

      <div
        className="marquee"
        role="region"
        aria-label="Client testimonials"
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              style={{ display: "flex", gap: 16, paddingRight: 16 }}
            >
              {testimonials.map((t) => (
                <figure
                  key={`${copy}-${t.author}-${t.context}`}
                  style={{
                    margin: 0,
                    padding: isSmall ? 22 : 28,
                    width: cardWidth,
                    flexShrink: 0,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    minHeight: isSmall ? 280 : 260,
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 48,
                      lineHeight: 0.5,
                      color: "var(--accent)",
                      opacity: 0.35,
                    }}
                  >
                    “
                  </div>
                  <blockquote
                    style={{
                      margin: 0,
                      color: "var(--text)",
                      fontSize: isSmall ? 13.5 : 15,
                      lineHeight: 1.65,
                    }}
                  >
                    {t.quote}
                  </blockquote>
                  <figcaption
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      <FiUser size={17} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: isSmall ? 13.5 : 14.5,
                          color: "var(--text)",
                          lineHeight: 1.3,
                        }}
                      >
                        {t.author}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--text3)",
                          letterSpacing: "0.04em",
                          marginTop: 2,
                        }}
                      >
                        {t.role}
                      </div>
                      {t.context && (
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10.5,
                            color: "var(--text3)",
                            opacity: 0.75,
                            marginTop: 3,
                          }}
                        >
                          {t.context}
                        </div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
