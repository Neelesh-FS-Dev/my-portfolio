import { useNavigate } from "react-router-dom";
import type { Blog } from "../../types";
import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";

export interface BlogHeroProps {
  post: Blog;
}

export default function BlogHero({ post }: BlogHeroProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <section
      style={{
        padding: isMobile ? "40px 0 52px" : "60px 0 72px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: 800 }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text3)",
            flexWrap: "wrap",
          }}
        >
          <button
            aria-label="Back to blogs"
            onClick={() => navigate("/blogs")}
            style={{
              color: "var(--text3)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              background: "none",
              border: "none",
              transition: "color .2s",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text3)")
            }
          >
            ← Blogs
          </button>
          <span>/</span>
          <span
            style={{
              color: "var(--text2)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: isSmall ? 160 : 300,
            }}
          >
            {post.title}
          </span>
        </div>

        {/* Icon + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: isSmall ? 52 : 64,
              height: isSmall ? 52 : 64,
              borderRadius: 14,
              flexShrink: 0,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <post.icon size={isSmall ? 24 : 30} color="var(--text2)" />
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
              }}
            >
              {post.date}
            </span>
            <span style={{ color: "var(--border-bright)" }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
              }}
            >
              {post.readTime}
            </span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall
              ? "26px"
              : isMobile
                ? "32px"
                : "clamp(32px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
            color: "var(--text)",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 15 : 17,
            lineHeight: 1.75,
            marginBottom: 28,
          }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "var(--bg2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
