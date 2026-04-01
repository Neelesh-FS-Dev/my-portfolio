import { useParams, useNavigate, Link } from "react-router-dom";
import { blogs as blogDetails } from "../data";
import { useIsMobile, useIsSmall } from "../hooks/useMediaQuery";
import { FiInfo } from "react-icons/fi";
import SEO from "../components/SEO";
function getExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years === 0) return `${months} mos`;
  if (months === 0) return `${years} yrs`;
  return `${years} yr ${months} mos`;
}
export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  const post = blogDetails.find((b) => b.id === parseInt(id) || b.slug === id);

  if (!post)
    return (
      <div style={{ paddingTop: 200, textAlign: "center" }}>
        <p style={{ color: "var(--text2)", marginBottom: 24 }}>
          Blog post not found
        </p>
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>
      </div>
    );

  const otherPosts = blogDetails.filter((b) => b.id !== post.id);

  return (
    <div style={{ paddingTop: isMobile ? 70 : 90 }}>
      <SEO
        title={`${post.title} — Neelesh Yadav`}
        description={post.excerpt}
        path={`/blogs/${post.slug || post.id}`}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Person", name: "Neelesh Yadav" },
          datePublished: post.date,
          keywords: post.tags?.join(", "),
        }}
      />
      {/* Hero header */}
      <section
        style={{
          padding: isMobile ? "40px 0 52px" : "60px 0 72px",
          background: `linear-gradient(180deg, ${post.color}0a 0%, var(--bg) 100%)`,
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
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${post.color}0f 0%, transparent 65%)`,
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
              onMouseEnter={(e) => (e.target.style.color = post.color)}
              onMouseLeave={(e) => (e.target.style.color = "var(--text3)")}
            >
              ← Blogs
            </button>
            <span>/</span>
            <span
              style={{
                color: post.color,
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
                borderRadius: 18,
                flexShrink: 0,
                background: `radial-gradient(circle, ${post.color}20 0%, ${post.color}08 100%)`,
                border: `1px solid ${post.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <post.icon size={isSmall ? 24 : 30} color={post.color} />
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
              fontWeight: 800,
              fontSize: isSmall
                ? "26px"
                : isMobile
                  ? "32px"
                  : "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
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
                  color: post.color,
                  border: `1px solid ${post.color}25`,
                  background: post.color + "08",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Article body */}
      <article style={{ padding: isMobile ? "52px 0 80px" : "80px 0 120px" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {post.content.map((block, i) => {
              if (block.type === "intro")
                return (
                  <p
                    key={i}
                    style={{
                      fontSize: isSmall ? 16 : 18,
                      lineHeight: 1.85,
                      color: "var(--text)",
                      fontWeight: 400,
                      marginBottom: 40,
                      paddingBottom: 40,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {block.text}
                  </p>
                );

              if (block.type === "heading")
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: isSmall ? 20 : 24,
                      letterSpacing: "-0.02em",
                      color: "var(--text)",
                      marginBottom: 16,
                      marginTop: 40,
                    }}
                  >
                    {block.text}
                  </h2>
                );

              if (block.type === "text")
                return (
                  <p
                    key={i}
                    style={{
                      fontSize: isSmall ? 14 : 16,
                      lineHeight: 1.85,
                      color: "var(--text2)",
                      marginBottom: 24,
                    }}
                  >
                    {block.text}
                  </p>
                );

              if (block.type === "code")
                return (
                  <div key={i} style={{ marginBottom: 28, marginTop: 8 }}>
                    {block.label && (
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: post.color,
                          marginBottom: 8,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {block.label}
                      </div>
                    )}
                    <div
                      style={{
                        background: "var(--surface)",
                        border: `1px solid ${post.color}20`,
                        borderLeft: `3px solid ${post.color}`,
                        borderRadius: "0 12px 12px 0",
                        padding: isSmall ? "16px 18px" : "20px 24px",
                        overflow: "auto",
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: isSmall ? 12 : 13,
                          color: "var(--text2)",
                          lineHeight: 1.7,
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {block.text}
                      </pre>
                    </div>
                  </div>
                );

              if (block.type === "callout")
                return (
                  <div
                    key={i}
                    style={{
                      background: `linear-gradient(135deg, ${post.color}0d 0%, ${post.color}05 100%)`,
                      border: `1px solid ${post.color}25`,
                      borderRadius: 16,
                      padding: isSmall ? "18px 20px" : "24px 28px",
                      marginBottom: 28,
                      marginTop: 8,
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <FiInfo
                      size={20}
                      style={{ flexShrink: 0, marginTop: 2, color: post.color }}
                    />
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: isSmall ? 14 : 15,
                        color: "var(--text)",
                        lineHeight: 1.75,
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {block.text}
                    </p>
                  </div>
                );

              return null;
            })}
          </div>

          {/* Author card */}
          <div
            style={{
              marginTop: 64,
              padding: isSmall ? "20px" : "28px 32px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              display: "flex",
              gap: 20,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                flexShrink: 0,
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 22,
                color: "var(--bg)",
              }}
            >
              NY
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: isSmall ? 15 : 17,
                  marginBottom: 4,
                }}
              >
                Neelesh Yadav
              </div>
              <div
                style={{
                  color: "var(--text2)",
                  fontSize: isSmall ? 12 : 14,
                  lineHeight: 1.6,
                }}
              >
                React Native Developer with {getExperience("2023-01-01")} years
                building production mobile apps. Writes about performance,
                architecture, and mobile engineering.
              </div>
            </div>
            <a
              href="https://github.com/Neelesh-FS-Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: 13, padding: "10px 18px", flexShrink: 0 }}
            >
              Follow ↗
            </a>
          </div>
        </div>
      </article>

      {/* More articles */}
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
            {otherPosts.slice(0, 3).map((p) => (
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
                <div style={{ fontSize: 22, marginBottom: 10 }}>{p.icon}</div>
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
    </div>
  );
}
