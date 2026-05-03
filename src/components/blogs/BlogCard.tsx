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
        border: `1px solid ${hovered ? post.color + "45" : "var(--border)"}`,
        borderRadius: 20,
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
        boxShadow: hovered ? `0 8px 40px ${post.color}12` : "none",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${post.color}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? "scaleX(1)" : "scaleX(0.6)",
          transformOrigin: "center",
          transition:
            "opacity 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Visual panel — desktop featured only */}
      {featured && !isMobile && (
        <div
          style={{
            background: `linear-gradient(135deg,${post.color}12 0%,transparent 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            borderRight: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ripple rings */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: `1px solid ${post.color}18`,
              animation: "ring-expand 3s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: `1px solid ${post.color}10`,
              animation: "ring-expand 3s ease-out 1s infinite",
            }}
          />
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `radial-gradient(circle,${post.color}25 0%,${post.color}08 60%,transparent 100%)`,
              border: `1px solid ${post.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered
                ? "scale(1.08) rotate(-4deg)"
                : "scale(1) rotate(0deg)",
              transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: hovered ? `0 0 40px ${post.color}30` : "none",
            }}
          >
            <post.icon size={48} color={post.color} />
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
              color: post.domain === "web" ? "var(--accent2)" : "var(--accent)",
              border: `1px solid ${post.domain === "web" ? "rgba(124,77,255,0.25)" : "rgba(0,229,255,0.25)"}`,
              background:
                post.domain === "web"
                  ? "rgba(124,77,255,0.06)"
                  : "rgba(0,229,255,0.06)",
            }}
          >
            {post.domain === "web" ? " Web" : " Mobile"}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: featured && !isMobile ? 22 : isSmall ? 15 : 17,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            transition: "color 0.2s",
            color: hovered ? post.color : "var(--text)",
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
          {(post.tags || []).map((tag, ti) => (
            <span
              key={tag}
              style={{
                padding: "2px 9px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: post.color,
                border: `1px solid ${post.color}${hovered ? "40" : "25"}`,
                background: post.color + (hovered ? "12" : "08"),
                transform: hovered ? "translateY(-1px)" : "translateY(0)",
                transition: `transform 0.3s ease ${ti * 0.04}s, border-color 0.2s, background 0.2s`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            color: post.color,
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

      <style>{`
        @keyframes ring-expand    { 0%{transform:scale(0.6);opacity:.6} 100%{transform:scale(1.8);opacity:0} }
      `}</style>
    </article>
  );
}

export default memo(BlogCard);
