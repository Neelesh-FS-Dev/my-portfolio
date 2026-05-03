import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../../types";
import { useIsMobile, useIsSmall } from "../../hooks/useMediaQuery";

export interface BlogCardProps {
  post: Blog;
  featured?: boolean;
  idx?: number;
  visible?: boolean;
}

function BlogCard({
  post,
  featured = false,
  idx = 0,
  visible = true,
}: BlogCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={() => navigate("/blogs/" + (post.slug || post.id))}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--border-bright)" : "var(--border)"}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: featured && !isMobile ? "grid" : "flex",
        gridTemplateColumns: featured && !isMobile ? "1fr 1fr" : undefined,
        flexDirection: "column",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : `translateY(${featured ? 28 : 20}px) scale(0.97)`,
        transition: `
          opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${featured ? 0.05 : 0.08 + idx * 0.09}s,
          transform 0.6s cubic-bezier(0.16,1,0.3,1) ${featured ? 0.05 : 0.08 + idx * 0.09}s,
          border-color 0.25s ease,
          box-shadow 0.25s ease
        `,
        boxShadow: hovered ? "0 14px 30px rgba(0,0,0,0.4)" : "none",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual panel — desktop featured only */}
      {featured && !isMobile && (
        <div
          style={{
            background: "var(--bg2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            borderRight: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <post.icon size={44} color="var(--text2)" />
          </div>
        </div>
      )}

      <div
        style={{
          padding:
            featured && !isMobile ? "36px 40px" : isSmall ? "18px" : "24px",
          display: "flex",
          flexDirection: "column",
          gap: 11,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
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
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 100,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text2)",
              border: "1px solid var(--border)",
              background: "transparent",
            }}
          >
            {post.domain === "web" ? " Web" : " Mobile"}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: featured && !isMobile ? 22 : isSmall ? 15 : 17,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            transition: "color 0.2s",
            color: "var(--text)",
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 13 : 14,
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "2px 9px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text2)",
                border: "1px solid var(--border)",
                background: "var(--bg2)",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 5,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          Read Article →
        </div>
      </div>
    </article>
  );
}

export default memo(BlogCard);
