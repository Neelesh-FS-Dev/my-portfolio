import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import blogs from "./data/blogs";
import SEO from "../../shared/components/ui/SEO";
import BlogsHero from "./components/BlogsHero";
import BlogFiltersBar, {
  type BlogDomainFilter,
} from "./components/BlogFiltersBar";
import BlogCard from "./components/BlogCard";
import BlogsCTA from "./components/BlogsCTA";
import BentoGrid, { BentoCard } from "../../shared/components/ui/BentoGrid";

// Top tags by frequency across all posts — used to render filter chips.
const TAG_LIMIT = 14;

function getTopTags(): string[] {
  const counts = new Map<string, number>();
  for (const post of blogs) {
    for (const tag of post.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, TAG_LIMIT)
    .map(([tag]) => tag);
}

export default function Blogs() {
  const [domainFilter, setDomainFilter] = useState<BlogDomainFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    () => new Set(),
  );
  const navigate = useNavigate();

  const allTags = useMemo(() => getTopTags(), []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const clearTags = useCallback(() => setSelectedTags(new Set()), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      if (domainFilter !== "all" && b.domain !== domainFilter) return false;
      if (selectedTags.size > 0) {
        const hasMatch = (b.tags || []).some((t) => selectedTags.has(t));
        if (!hasMatch) return false;
      }
      if (q) {
        const hay = [
          b.title,
          b.excerpt,
          ...(b.tags || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [domainFilter, query, selectedTags]);

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

  const filterKey = `${domainFilter}-${query}-${Array.from(selectedTags).join(",")}`;

  return (
    <div>
      <SEO
        title="Blog — Neelesh Yadav | React Native & Web Development Insights"
        description="Technical blog posts on React Native, TypeScript, performance optimization, WebSocket, app deployment, and mobile development best practices."
        path="/blogs"
      />

      <BlogsHero />

      <BlogFiltersBar
        tabs={blogTabs}
        active={domainFilter}
        onChange={setDomainFilter}
        query={query}
        onQueryChange={setQuery}
        allTags={allTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearTags={clearTags}
        resultCount={filtered.length}
      />

      {/* ─── BLOG GRID ─── */}
      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
            <div
              role="status"
              style={{
                padding: "80px 0",
                textAlign: "center",
                color: "var(--text2)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  marginBottom: 6,
                  color: "var(--text)",
                }}
              >
                No posts match your filters.
              </p>
              <p style={{ fontSize: 13, color: "var(--text3)" }}>
                Try removing a tag or clearing the search.
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }} key={`featured-${filterKey}`}>
                <BlogCard post={filtered[0]} featured />
              </div>
              <BentoGrid key={`grid-${filterKey}`} rowHeight="20rem">
                {filtered.slice(1).map((post, i) => {
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
            </>
          )}
        </div>
      </section>

      <BlogsCTA />
    </div>
  );
}
