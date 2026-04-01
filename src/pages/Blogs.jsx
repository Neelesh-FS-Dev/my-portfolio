import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../data";
import { useIsMobile, useIsSmall, useIsTablet } from "../hooks/useMediaQuery";
import SEO from "../components/SEO";

/* ── Hook: triggers once when element enters viewport ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Blog card ── */
function BlogCard({ post, featured = false, idx = 0, visible = true }) {
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
    </article>
  );
}

export default function Blogs() {
  const [domainFilter, setDomainFilter] = useState("all");
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();
  const isTablet = useIsTablet();

  const [headerRef, headerVisible] = useReveal(0.05);
  const [gridRef, gridVisible] = useReveal(0.05);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  const filtered = useMemo(
    () =>
      domainFilter === "all"
        ? blogs
        : blogs.filter((b) => b.domain === domainFilter),
    [domainFilter],
  );

  const blogTabs = useMemo(
    () => [
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
    ],
    [],
  );

  /* Floating particles */
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 55 + Math.sin(i * 137.5) * 38,
    y: 15 + Math.cos(i * 97.3) * 70,
    size: 1.5 + (i % 3) * 1.2,
    delay: (i * 0.35) % 3,
    dur: 3 + (i % 4) * 0.8,
  }));

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      <SEO
        title="Blog — Neelesh Yadav | React Native & Web Development Insights"
        description="Technical blog posts on React Native, TypeScript, performance optimization, WebSocket, app deployment, and mobile development best practices."
        path="/blogs"
      />
      {/* ─── HEADER ─── */}
      <section
        ref={headerRef}
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 80px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        {/* Breathing glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "12%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,107,53,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
            animation: "breathe 5s ease-in-out infinite",
          }}
        />
        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(255,107,53,${0.2 + (p.id % 3) * 0.15})`,
              animation: `float-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container">
          <div
            className="section-label"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
            }}
          >
            Writing
          </div>
          <h1
            className="section-title"
            style={{
              marginBottom: 14,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible
                ? "translateY(0) skewY(0deg)"
                : "translateY(20px) skewY(1deg)",
              transition:
                "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Dev Blog &amp;
            <br />
            <span
              style={{
                color: "var(--accent3)",
                display: "inline-block",
                animation: headerVisible
                  ? "text-shimmer-orange 4s ease-in-out infinite"
                  : "none",
              }}
            >
              Learnings
            </span>
          </h1>
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 17,
              maxWidth: 520,
              lineHeight: 1.75,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.55s ease 0.22s, transform 0.55s ease 0.22s",
            }}
          >
            Technical deep-dives on React Native, React, performance, and
            mobile/web architecture — from real production experience.
          </p>
        </div>
      </section>

      {/* ─── STICKY FILTER TABS ─── */}
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
            {blogTabs.map((t, ti) => (
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
                  background: "transparent",
                  whiteSpace: "nowrap",
                  color:
                    domainFilter === t.id ? "var(--accent)" : "var(--text3)",
                  borderBottom:
                    domainFilter === t.id
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                  transform:
                    domainFilter === t.id ? "translateY(0)" : "translateY(0)",
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
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BLOG GRID ─── */}
      <section className="section">
        <div className="container" ref={gridRef}>
          {filtered.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <BlogCard post={filtered[0]} featured visible={gridVisible} />
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
            {filtered.slice(1).map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                idx={i}
                visible={gridVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        ref={ctaRef}
        style={{ padding: "0 0 100px", textAlign: "center" }}
      >
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
              transition:
                "opacity 0.55s ease 0.18s, transform 0.55s ease 0.18s",
            }}
          >
            Follow my GitHub for code experiments, open-source work, and
            updates.
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
      </section>

      <style>{`
        @keyframes breathe        { 0%,100%{transform:translateY(-50%) scale(1);opacity:1} 50%{transform:translateY(-50%) scale(1.12);opacity:.7} }
        @keyframes float-particle { from{transform:translateY(0) translateX(0);opacity:.4} to{transform:translateY(-12px) translateX(6px);opacity:1} }
        @keyframes text-shimmer-orange { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3) drop-shadow(0 0 8px var(--accent3))} }
        @keyframes ring-expand    { 0%{transform:scale(0.6);opacity:.6} 100%{transform:scale(1.8);opacity:0} }

        /* CTA button hover */
        .cta-btn:hover {
          transform: translateY(-2px) scale(1.03) !important;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .cta-btn:active {
          transform: scale(0.97) !important;
        }
      `}</style>
    </div>
  );
}
