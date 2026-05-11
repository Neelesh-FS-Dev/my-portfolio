import { useEffect } from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  ReactNode,
} from "react";
import { ArrowRight } from "lucide-react";

/* Inject grid + card hover rules once at module level. */
const STYLE_TAG_ID = "bento-grid-styles";
const BENTO_CSS = `
  @media (min-width: 768px) {
    .bento-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  }
  @media (min-width: 1024px) {
    .bento-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  }
  .bento-card:hover .bento-content { transform: translateY(-32px); }
  .bento-card:hover .bento-icon { transform: scale(0.82); }
  .bento-card:hover .bento-cta { transform: translateY(0); opacity: 1; }
`;
function ensureBentoStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_TAG_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_TAG_ID;
  el.textContent = BENTO_CSS;
  document.head.appendChild(el);
}

/**
 * Adapted from a 21st.dev / magic-ui Bento grid. Tailwind classes stripped;
 * uses project tokens (--surface, --text, --text2, --accent, --border).
 * `colSpan` and `rowSpan` control the grid layout per card.
 */

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  rowHeight?: string;
}

export const BentoGrid: FC<BentoGridProps> = ({
  children,
  rowHeight = "20rem",
  style,
  ...props
}) => {
  useEffect(() => {
    ensureBentoStyles();
  }, []);
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        gridAutoRows: rowHeight,
        gap: 14,
        ...style,
      }}
      className="bento-grid"
      {...props}
    >
      {children}
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  description: string;
  background?: ReactNode;
  Icon?: ElementType;
  href?: string;
  cta?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  onClick?: () => void;
}

export const BentoCard: FC<BentoCardProps> = ({
  name,
  description,
  background,
  Icon,
  href,
  cta,
  colSpan = 1,
  rowSpan = 1,
  onClick,
}) => {
  return (
    <div
      className="bento-card glass glass-hover"
      onClick={onClick}
      role={onClick || href ? "link" : undefined}
      tabIndex={onClick || href ? 0 : undefined}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        cursor: onClick || href ? "pointer" : "default",
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        gridRow: `span ${rowSpan} / span ${rowSpan}`,
      }}
    >
      {/* Accent tint — uses project token */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 30% 0%, var(--accent-glow-soft), transparent 60%)",
        }}
      />
      {background && (
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {background}
        </div>
      )}

      {/* Content — sits in the lower portion of the card; lifts on hover so
          CTA reveals beneath. marginTop:auto + marginBottom raises the resting
          position off the bottom so wide cards don't look bottom-heavy. */}
      <div
        className="bento-content"
        style={{
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: "24px 24px 0",
          marginTop: "auto",
          marginBottom: 64,
          transition: "transform .3s ease",
        }}
      >
        {Icon && (
          <Icon
            size={36}
            className="bento-icon"
            style={{
              color: "var(--accent)",
              transformOrigin: "left",
              transition: "transform .3s ease",
              marginBottom: 8,
            }}
          />
        )}
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            margin: 0,
            maxWidth: 520,
            color: "var(--text2)",
            fontSize: 13.5,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      {/* CTA — hidden until hover */}
      {(href || cta) && (
        <div
          className="bento-cta"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            padding: 16,
            transform: "translateY(40px)",
            opacity: 0,
            transition: "transform .3s ease, opacity .3s ease",
          }}
        >
          {href ? (
            <a
              href={href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              {cta ?? "Read more"}
              <ArrowRight size={14} />
            </a>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--accent)",
              }}
            >
              {cta}
              <ArrowRight size={14} />
            </span>
          )}
        </div>
      )}

    </div>
  );
};

export default BentoGrid;
