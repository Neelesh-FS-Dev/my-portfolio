import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../../types";
import { useIsSmall } from "../../hooks/useMediaQuery";

export interface MoreArticlesProps {
  posts: Blog[];
}

function MoreArticles({ posts }: MoreArticlesProps) {
  const navigate = useNavigate();
  const isSmall = useIsSmall();

  return (
    <section
      style={{ padding: "0 0 100px", borderTop: "1px solid var(--border)" }}
    >
      <div className="container" style={{ maxWidth: 800, paddingTop: 60 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall ? 20 : 24,
            marginBottom: 28,
          }}
        >
          More Articles
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmall ? "1fr" : "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {posts.slice(0, 3).map((p) => (
            <div
              key={p.id}
              onClick={() => {
                navigate(`/blogs/${p.slug || p.id}`);
                window.scrollTo(0, 0);
              }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "20px",
                cursor: "pointer",
                transition: "all .3s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.color + "40";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                }}
              />
              <div style={{ fontSize: 22, marginBottom: 10 }}>
                {p.icon as unknown as React.ReactNode}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text3)",
                }}
              >
                {p.readTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(MoreArticles);
