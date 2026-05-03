import { useState, useMemo } from "react";
import blogs from "./data/blogs";
import { useIsSmall, useIsTablet } from "../../shared/hooks/useMediaQuery";
import { useReveal } from "../../shared/hooks/useReveal";
import SEO from "../../shared/components/ui/SEO";
import BlogsHero from "./components/BlogsHero";
import BlogTabsBar, { type BlogDomainFilter } from "./components/BlogTabsBar";
import BlogCard from "./components/BlogCard";
import BlogsCTA from "./components/BlogsCTA";

export default function Blogs() {
  const [domainFilter, setDomainFilter] = useState<BlogDomainFilter>("all");
  const isSmall = useIsSmall();
  const isTablet = useIsTablet();

  const [gridRef, gridVisible] = useReveal<HTMLDivElement>(0.05);

  const filtered = useMemo(
    () =>
      domainFilter === "all"
        ? blogs
        : blogs.filter((b) => b.domain === domainFilter),
    [domainFilter],
  );

  const blogTabs = useMemo(
    () =>
      [
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
      ] as const satisfies ReadonlyArray<{
        id: BlogDomainFilter;
        label: string;
        count: number;
      }>,
    [],
  );

  return (
    <div>
      <SEO
        title="Blog — Neelesh Yadav | React Native & Web Development Insights"
        description="Technical blog posts on React Native, TypeScript, performance optimization, WebSocket, app deployment, and mobile development best practices."
        path="/blogs"
      />

      <BlogsHero />

      <BlogTabsBar
        tabs={blogTabs}
        active={domainFilter}
        onChange={setDomainFilter}
      />

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

      <BlogsCTA />
    </div>
  );
}
