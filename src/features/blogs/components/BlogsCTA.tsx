import { useIsSmall } from "../../../shared/hooks/useMediaQuery";
import { useReveal } from "../../../shared/hooks/useReveal";

export default function BlogsCTA() {
  const isSmall = useIsSmall();
  const [ctaRef, ctaVisible] = useReveal<HTMLElement>(0.1);

  return (
    <section ref={ctaRef} style={{ padding: "0 0 100px", textAlign: "center" }}>
      <div className="container">
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--text3)",
            marginBottom: 10,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          More articles coming soon
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isSmall ? 22 : 28,
            fontWeight: 800,
            marginBottom: 12,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          }}
        >
          Follow along
        </h2>
        <p
          style={{
            color: "var(--text2)",
            marginBottom: 24,
            fontSize: isSmall ? 14 : 15,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.55s ease 0.18s, transform 0.55s ease 0.18s",
          }}
        >
          Follow my GitHub for code experiments, open-source work, and updates.
        </p>
        <a
          href="https://github.com/Neelesh-FS-Dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline cta-btn"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible
              ? "translateY(0) scale(1)"
              : "translateY(12px) scale(0.95)",
            transition:
              "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.26s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.26s",
            display: "inline-flex",
          }}
        >
          Follow on GitHub ↗
        </a>
      </div>

      <style>{`
        /* CTA button hover */
        .cta-btn:hover {
          transform: translateY(-2px) scale(1.03) !important;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .cta-btn:active {
          transform: scale(0.97) !important;
        }
      `}</style>
    </section>
  );
}
