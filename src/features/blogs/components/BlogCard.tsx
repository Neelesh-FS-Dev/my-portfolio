import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Blog } from "../types";
import { useIsMobile, useIsSmall } from "../../../shared/hooks/useMediaQuery";
import { hoverLift } from "../../../shared/components/motion";

export interface BlogCardProps {
  post: Blog;
  featured?: boolean;
  idx?: number;
}

function BlogCard({ post, featured = false, idx = 0 }: BlogCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isSmall = useIsSmall();

  return (
    <motion.article
      onClick={() => navigate("/blogs/" + (post.slug || post.id))}
      initial={{ opacity: 0, y: featured ? 28 : 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{
        y: -3,
        borderColor: "rgba(59,130,246,0.35)",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.1)",
      }}
      transition={{
        duration: 0.6,
        delay: featured ? 0.05 : 0.08 + idx * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: featured && !isMobile ? "grid" : "flex",
        gridTemplateColumns: featured && !isMobile ? "1fr 1fr" : undefined,
        flexDirection: "column",
        willChange: "transform",
      }}
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
          <motion.div
            whileHover={{ scale: 1.06, rotate: -3 }}
            transition={hoverLift}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <post.icon size={44} color="var(--text2)" />
          </motion.div>
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
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          whileHover={{ x: 4 }}
          transition={hoverLift}
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          Read Article →
        </motion.div>
      </div>
    </motion.article>
  );
}

export default memo(BlogCard);
