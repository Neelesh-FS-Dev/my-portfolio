import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";

/* Single style injection — adds the .tl-* rules and timeline gap responsively. */
const STYLE_TAG_ID = "tl-timeline-styles";
function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_TAG_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_TAG_ID;
  el.textContent = STYLES + RESPONSIVE_GAP;
  document.head.appendChild(el);
}
const RESPONSIVE_GAP = `
  .tl-wrap { display: flex; flex-direction: column; gap: 96px; }
  @media (min-width: 768px)  { .tl-wrap { gap: 160px; } }
  @media (min-width: 1024px) { .tl-wrap { gap: 220px; } }
`;

/**
 * Adapted from a 21st.dev / Ruixen UI release timeline. The card closest to
 * the upper-third of the viewport becomes "active" and expands to reveal its
 * full content; others collapse to a 2-line teaser.
 *
 * Tailwind / shadcn primitives stripped — uses project tokens (--accent,
 * --text, --surface, etc.) and inline styles to match the rest of the site.
 */
export interface TimelineEntry {
  icon: ComponentType<{ size?: string | number }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  button?: { url: string; text: string };
}

interface TimelineProps {
  entries: TimelineEntry[];
}

const STYLES = `
  .tl-row {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  @media (min-width: 768px) {
    .tl-row { flex-direction: row; gap: 56px; }
  }
  .tl-meta {
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    height: min-content;
  }
  @media (min-width: 768px) {
    .tl-meta {
      width: 240px;
      position: sticky;
      top: 96px;
    }
  }
  .tl-icon-box {
    padding: 8px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color .25s, color .25s, box-shadow .25s;
    color: var(--text3);
    background: var(--surface);
    border: 1px solid var(--border);
  }
  .tl-icon-box.is-active {
    background: var(--accent);
    color: #04070a;
    border-color: transparent;
    box-shadow: 0 0 24px rgba(59,130,246,0.35);
  }
  .tl-meta-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 14px;
    color: var(--text);
    line-height: 1.3;
  }
  .tl-meta-subtitle {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--text3);
    margin-top: 3px;
  }

  .tl-card {
    flex: 1;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    padding: 20px 22px;
    transition: border-color .3s, background-color .3s, box-shadow .3s;
  }
  .tl-card.is-active {
    border-color: rgba(59,130,246,0.32);
    background: rgba(59,130,246,0.04);
    box-shadow: 0 18px 40px -20px rgba(0,0,0,0.5),
                0 0 32px -8px rgba(59,130,246,0.18);
  }

  .tl-card-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 17px;
    letter-spacing: -0.005em;
    color: var(--text);
    line-height: 1.25;
    margin: 0;
    transition: color .25s;
  }
  .tl-card:not(.is-active) .tl-card-title { color: var(--text2); }

  .tl-card-desc {
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--text2);
    margin: 10px 0 0;
    transition: all .35s;
  }
  .tl-card:not(.is-active) .tl-card-desc {
    color: var(--text3);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tl-expand {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows .5s ease, opacity .35s ease;
  }
  .tl-expand.is-active {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .tl-expand > div { overflow: hidden; min-height: 0; }

  .tl-items {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.015);
    border-radius: 12px;
  }
  .tl-items ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tl-items li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: var(--text2);
    font-size: 13.5px;
    line-height: 1.6;
  }
  .tl-bullet {
    margin-top: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
    opacity: 0.7;
  }

  .tl-btn-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
`;

export default function Timeline({ entries }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureStyles();
  }, []);

  // rAF gated by IntersectionObserver — only runs while the timeline is in viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let frame = 0;
    let running = false;
    const tick = () => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeRef.current) {
        activeRef.current = bestIndex;
        setActiveIndex(bestIndex);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !running) {
          running = true;
          frame = requestAnimationFrame(tick);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <section>
      <div ref={wrapRef} className="tl-wrap">
        {entries.map((entry, index) => {
          const isActive = index === activeIndex;
          const Icon = entry.icon;
          return (
            <div key={index} className="tl-row" aria-current={isActive}>
              <div className="tl-meta">
                <div className={`tl-icon-box ${isActive ? "is-active" : ""}`}>
                  <Icon size={16} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="tl-meta-title">{entry.title}</div>
                  <div className="tl-meta-subtitle">{entry.subtitle}</div>
                </div>
              </div>

              <div
                ref={(el) => {
                  sentinelRefs.current[index] = el;
                }}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -96,
                  left: 0,
                  width: 48,
                  height: 48,
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />

              <article className={`tl-card ${isActive ? "is-active" : ""}`}>
                <h3 className="tl-card-title">{entry.title}</h3>
                <p className="tl-card-desc">{entry.description}</p>

                <div className={`tl-expand ${isActive ? "is-active" : ""}`}>
                  <div>
                    {entry.items && entry.items.length > 0 && (
                      <div className="tl-items">
                        <ul>
                          {entry.items.map((item, i) => (
                            <li key={i}>
                              <span className="tl-bullet" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.button && (
                      <div className="tl-btn-row">
                        <a
                          href={entry.button.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          style={{ fontSize: 13, padding: "10px 18px" }}
                        >
                          {entry.button.text}
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
