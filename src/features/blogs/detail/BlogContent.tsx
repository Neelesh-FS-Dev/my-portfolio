import type { Blog } from "../../types";
import { useIsSmall } from "../../hooks/useMediaQuery";
import { FiInfo } from "react-icons/fi";

export interface BlogContentProps {
  post: Blog;
}

export default function BlogContent({ post }: BlogContentProps) {
  const isSmall = useIsSmall();

  return (
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
                    color: "var(--text3)",
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
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--accent)",
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
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: "3px solid var(--accent)",
                borderRadius: "0 12px 12px 0",
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
                style={{ flexShrink: 0, marginTop: 2, color: "var(--accent)" }}
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
  );
}
