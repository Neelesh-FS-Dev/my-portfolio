import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../data";
import { useIsMobile, useIsSmall, useIsTablet } from "../hooks/useMediaQuery";

function BlogCard({ post, featured = false }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <article
      onClick={() => navigate("/blogs/" + post.id)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .3s ease",
        position: "relative",
        display: featured && !isMobile ? "grid" : "flex",
        gridTemplateColumns: featured && !isMobile ? "1fr 1fr" : undefined,
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = post.color + "40";
        e.currentTarget.style.transform = "translateY(-4px)";
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
          background: `linear-gradient(90deg,transparent,${post.color},transparent)`,
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
          }}
        >
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
              fontSize: 48,
            }}
          >
            {post.icon}
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
          {/* Domain badge */}
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
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "2px 9px",
                borderRadius: 100,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: post.color,
                border: `1px solid ${post.color}25`,
                background: post.color + "08",
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
          }}
        >
          Read Article →
        </div>
      </div>
    </article>
  );
}

export default function Blogs() {
  const [domainFilter, setDomainFilter] = useState("all");
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const isTablet = useIsTablet();

  const filtered =
    domainFilter === "all"
      ? blogs
      : blogs.filter((b) => b.domain === domainFilter);

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      {/* Header */}
      <section
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,107,53,0.06) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container">
          <div className="section-label">Writing</div>
          <h1 className="section-title" style={{ marginBottom: 14 }}>
            Dev Blog &<br />
            <span style={{ color: "var(--accent3)" }}>Learnings</span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 520,
              lineHeight: 1.75,
            }}
          >
            Technical deep-dives on React Native, React, performance, and
            mobile/web architecture — from real production experience.
          </p>
        </div>
      </section>

      {/* Domain filter */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(9,12,16,0.95)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: isMobile ? 60 : 64,
          zIndex: 100,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 0,
              padding: "0",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {[
              { id: "all", label: "All Posts", count: blogs.length },
              {
                id: "mobile",
                label: " Mobile",
                count: blogs.filter((b) => b.domain === "mobile").length,
              },
              {
                id: "web",
                label: " Web",
                count: blogs.filter((b) => b.domain === "web").length,
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setDomainFilter(t.id)}
                style={{
                  padding: isSmall ? "12px 14px" : "14px 20px",
                  border: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: isSmall ? 12 : 13,
                  cursor: "pointer",
                  transition: "all .2s",
                  background: "transparent",
                  whiteSpace: "nowrap",
                  color:
                    domainFilter === t.id ? "var(--accent)" : "var(--text3)",
                  borderBottom:
                    domainFilter === t.id
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                }}
              >
                {t.label}
                <span
                  style={{
                    marginLeft: 6,
                    padding: "1px 6px",
                    borderRadius: 100,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    background:
                      domainFilter === t.id
                        ? "rgba(0,229,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                    color:
                      domainFilter === t.id ? "var(--accent)" : "var(--text3)",
                  }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog grid */}
      <section className="section">
        <div className="container">
          {filtered.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <BlogCard post={filtered[0]} featured />
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isSmall
                ? "1fr"
                : isTablet
                  ? "1fr 1fr"
                  : "repeat(3,1fr)",
              gap: 14,
            }}
          >
            {filtered.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 0 100px", textAlign: "center" }}>
        <div className="container">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text3)",
              marginBottom: 10,
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
            }}
          >
            Follow along
          </h2>
          <p
            style={{
              color: "var(--text2)",
              marginBottom: 24,
              fontSize: isSmall ? 14 : 15,
            }}
          >
            Follow my GitHub for code experiments, open-source work, and
            updates.
          </p>
          <a
            href="https://github.com/Neelesh-FS-Dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Follow on GitHub ↗
          </a>
        </div>
      </section>
    </div>
  );
}
