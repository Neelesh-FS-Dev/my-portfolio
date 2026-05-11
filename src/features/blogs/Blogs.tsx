import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import blogs from "./data/blogs";
import SEO from "../../shared/components/ui/SEO";
import BlogsHero from "./components/BlogsHero";
import BlogTabsBar, { type BlogDomainFilter } from "./components/BlogTabsBar";
import BlogCard from "./components/BlogCard";
import BlogsCTA from "./components/BlogsCTA";
import BentoGrid, { BentoCard } from "../../shared/components/ui/BentoGrid";

export default function Blogs() {
  const [domainFilter, setDomainFilter] = useState<BlogDomainFilter>("all");
  const navigate = useNavigate();

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
        <div className="container">
          {filtered.length > 0 && (
            <div style={{ marginBottom: 16 }} key={`featured-${domainFilter}`}>
              <BlogCard post={filtered[0]} featured />
            </div>
          )}
          <BentoGrid key={`grid-${domainFilter}`} rowHeight="20rem">
            {filtered.slice(1).map((post, i) => {
              // Vary col-spans for visual interest in the bento layout.
              // Pattern: 2,1 | 1,2 | 1,1,1 → repeats.
              const spanPattern: (1 | 2)[] = [2, 1, 1, 2, 1, 1, 1];
              const colSpan = spanPattern[i % spanPattern.length];
              return (
                <BentoCard
                  key={post.id}
                  name={post.title}
                  description={post.excerpt}
                  Icon={post.icon}
                  href={`/blogs/${post.slug}`}
                  cta={`${post.readTime} read`}
                  colSpan={colSpan}
                  onClick={() => navigate(`/blogs/${post.slug}`)}
                />
              );
            })}
          </BentoGrid>
        </div>
      </section>

      <BlogsCTA />
    </div>
  );
}
