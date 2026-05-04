import { Link } from "react-router-dom";
import { FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import blogs from "../../blogs/data/blogs";
import type { Project } from "../types";
import { useIsSmall } from "../../../shared/hooks/useMediaQuery";

export interface RelatedWriteupsProps {
  project: Project;
  accentColor: string;
}

export default function RelatedWriteups({
  project,
  accentColor,
}: RelatedWriteupsProps) {
  const isSmall = useIsSmall();

  if (!project.relatedBlogs || project.relatedBlogs.length === 0) return null;

  const matched = project.relatedBlogs
    .map((slug) => blogs.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  if (matched.length === 0) return null;

  return (
    <div style={{ marginTop: 52 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <FiBookOpen size={18} color={accentColor} />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: isSmall ? 20 : 24,
            margin: 0,
          }}
        >
          Related Writeups
        </h2>
      </div>
      <p
        style={{
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          marginBottom: 22,
        }}
      >
        Technical posts drawn from this project's real challenges
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSmall
            ? "1fr"
            : "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {matched.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blogs/${blog.slug}`}
            style={{
              padding: 18,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transition: "border-color .2s, transform .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accentColor}55`;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  color: "var(--text3)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {blog.readTime}
              </span>
              <FiArrowUpRight size={16} color={accentColor} />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: isSmall ? 14.5 : 15.5,
                lineHeight: 1.35,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {blog.title}
            </h3>
            <p
              style={{
                color: "var(--text2)",
                fontSize: 12.5,
                lineHeight: 1.6,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {blog.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
