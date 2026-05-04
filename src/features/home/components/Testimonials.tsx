import { useCallback, useEffect, useRef, useState } from "react";
import { FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import testimonials from "../../../shared/data/testimonials";

const AUTO_ADVANCE_MS = 7000;

export interface TestimonialsProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function Testimonials({
  isMobile,
  isSmall,
}: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = testimonials.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, total, goTo]);

  // Keyboard nav
  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [next, prev],
  );

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 40) return;
      if (delta < 0) next();
      else prev();
    },
    [next, prev],
  );

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
              <span className="section-num">07 /</span> Working With Me
            </div>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}
            aria-label="Testimonial navigation"
          >
            <CarouselButton
              direction="prev"
              onClick={prev}
              ariaLabel="Previous testimonial"
            />
            <span
              aria-live="polite"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                minWidth: 38,
                textAlign: "center",
                letterSpacing: "0.04em",
              }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <CarouselButton
              direction="next"
              onClick={next}
              ariaLabel="Next testimonial"
            />
          </div>
        </div>

        {/* Viewport */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={handleKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 14,
            outline: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
              willChange: "transform",
            }}
          >
            {testimonials.map((t, i) => (
              <figure
                key={t.author + t.context}
                aria-hidden={i !== index}
                style={{
                  margin: 0,
                  padding: isSmall ? 24 : 36,
                  flex: "0 0 100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  minHeight: isSmall ? 280 : 240,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 56,
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
                    fontSize: isSmall ? 14.5 : 17,
                    lineHeight: 1.7,
                    maxWidth: 760,
                  }}
                >
                  {t.quote}
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
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
                    <FiUser size={18} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: isSmall ? 14 : 15,
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
        </div>

        {/* Dots */}
        <div
          role="tablist"
          aria-label="Select testimonial"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          {testimonials.map((t, i) => {
            const active = i === index;
            return (
              <button
                key={t.author + t.context}
                role="tab"
                aria-selected={active}
                aria-label={`Go to testimonial ${i + 1}: ${t.author}`}
                onClick={() => goTo(i)}
                style={{
                  width: active ? 28 : 8,
                  height: 8,
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: active ? "var(--accent)" : "var(--border)",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CarouselButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
}

function CarouselButton({ direction, onClick, ariaLabel }: CarouselButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text2)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color .2s, color .2s, background .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text2)";
      }}
    >
      {direction === "prev" ? (
        <FiChevronLeft size={18} />
      ) : (
        <FiChevronRight size={18} />
      )}
    </button>
  );
}
