import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import testimonials from "../../../shared/data/testimonials";
import type { Testimonial } from "../../../shared/data/testimonials";
import { Reveal } from "../../../shared/components/motion";

/**
 * Adapted from 21st.dev "testimonials-columns-1" — three vertical marquees
 * that scroll at different speeds. Original was Tailwind + motion/react +
 * randomuser.me photos; this version uses inline scoped CSS, framer-motion,
 * project tokens, and initials avatars (no stock images).
 */

export interface TestimonialsProps {
  isMobile: boolean;
  isSmall: boolean;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0] ?? "");
  return initials.join("").toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="tcol-card">
      <p className="tcol-quote">{t.quote}</p>
      <div className="tcol-author">
        <div className="tcol-avatar" aria-hidden>
          {getInitials(t.author)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="tcol-name">{t.author}</div>
          <div className="tcol-role">{t.role}</div>
          {t.context && <div className="tcol-context">{t.context}</div>}
        </div>
      </div>
    </article>
  );
}

interface ColumnProps {
  items: Testimonial[];
  duration: number;
  className?: string;
}

// Hoisted so framer-motion sees a stable reference each render and doesn't
// reschedule the loop. Same for the transition factory.
const MARQUEE_ANIMATE = { y: "-50%" } as const;
const buildMarqueeTransition = (duration: number) =>
  ({
    duration,
    repeat: Infinity,
    ease: "linear",
    repeatType: "loop",
  }) as const;

function TestimonialsColumn({ items, duration, className = "" }: ColumnProps) {
  const reduce = useReducedMotion();
  return (
    <div className={`tcol ${className}`.trim()}>
      <motion.div
        className="tcol-track"
        animate={reduce ? undefined : MARQUEE_ANIMATE}
        transition={reduce ? undefined : buildMarqueeTransition(duration)}
      >
        {[0, 1].map((dup) => (
          <div className="tcol-batch" key={dup} aria-hidden={dup === 1}>
            {items.map((t, i) => (
              <TestimonialCard key={`${t.author}-${i}`} t={t} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Distribute the 4 real testimonials across 3 columns so each column
// has at least 2 cards and the columns don't show the same item at the
// same vertical offset.
const col1 = [testimonials[0], testimonials[1]];
const col2 = [testimonials[2], testimonials[3]];
const col3 = [testimonials[1], testimonials[3], testimonials[0]];

const STYLES = `
  .testimonials-section {
    border-top: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }

  .tcol-header {
    text-align: center;
    max-width: 560px;
    margin: 0 auto 36px;
  }
  .tcol-header .section-label {
    justify-content: center;
  }
  .tcol-header .section-title {
    margin-top: 4px;
  }
  .tcol-sub {
    color: var(--text2);
    font-size: 14.5px;
    line-height: 1.7;
    margin: 14px 0 0;
  }

  .tcol-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    max-height: 720px;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
  }

  .tcol {
    width: 100%;
    max-width: 360px;
    flex-shrink: 0;
  }
  .tcol-md, .tcol-lg { display: none; }
  @media (min-width: 768px) { .tcol-md { display: block; } }
  @media (min-width: 1024px) { .tcol-lg { display: block; } }

  .tcol-track {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
    will-change: transform;
  }
  .tcol-batch {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .tcol-card {
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border-radius: 20px;
    padding: 26px;
    box-shadow:
      0 14px 36px rgba(0, 0, 0, 0.32),
      0 0 24px rgba(59, 130, 246, 0.05);
    transition:
      border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .tcol-card:hover {
    border-color: rgba(59, 130, 246, 0.32);
    box-shadow:
      0 18px 44px rgba(0, 0, 0, 0.4),
      0 0 36px rgba(59, 130, 246, 0.12);
  }

  .tcol-quote {
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.65;
    margin: 0 0 22px;
  }

  .tcol-author {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }
  .tcol-avatar {
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.06) 100%);
    border: 1px solid rgba(59, 130, 246, 0.28);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 12.5px;
    letter-spacing: 0.02em;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
  }
  .tcol-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 13.5px;
    color: var(--text);
    line-height: 1.25;
    letter-spacing: -0.01em;
  }
  .tcol-role {
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: var(--text3);
    letter-spacing: 0.04em;
    margin-top: 3px;
  }
  .tcol-context {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text3);
    opacity: 0.72;
    margin-top: 3px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    .tcol-card { padding: 22px; }
    .tcol-quote { font-size: 13.5px; }
  }
`;

function TestimonialsBase({ isMobile, isSmall }: TestimonialsProps) {
  return (
    <section className="section testimonials-section">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="container">
        <Reveal preset="fadeUp" className="tcol-header">
          <div className="section-label">
            <span className="section-num">07 /</span> Working With Me
          </div>
          <h2
            className="section-title"
            style={{
              fontSize: isSmall
                ? "clamp(28px, 7vw, 36px)"
                : "clamp(32px, 5vw, 56px)",
              marginBottom: 0,
            }}
          >
            What People Say
          </h2>
          <p className="tcol-sub">
            Direct words from founders, scrum masters, and clients I've
            shipped production work with.
          </p>
        </Reveal>

        <Reveal preset="fadeIn" delay={0.1}>
          <div
            className="tcol-row"
            style={{
              maxHeight: isMobile ? 560 : 720,
              gap: isSmall ? 16 : 20,
            }}
          >
            <TestimonialsColumn items={col1} duration={32} />
            <TestimonialsColumn
              items={col2}
              duration={38}
              className="tcol-md"
            />
            <TestimonialsColumn
              items={col3}
              duration={35}
              className="tcol-lg"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default memo(TestimonialsBase);
