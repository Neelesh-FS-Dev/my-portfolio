import { useId } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useIsSmall } from "../../../shared/hooks/useMediaQuery";

export type BlogDomainFilter = "all" | "mobile" | "web";

export interface BlogTab {
  id: BlogDomainFilter;
  label: string;
  count: number;
}

export interface BlogFiltersBarProps {
  tabs: ReadonlyArray<BlogTab>;
  active: BlogDomainFilter;
  onChange: (id: BlogDomainFilter) => void;
  query: string;
  onQueryChange: (q: string) => void;
  allTags: ReadonlyArray<string>;
  selectedTags: ReadonlySet<string>;
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
  resultCount: number;
}

export default function BlogFiltersBar({
  tabs,
  active,
  onChange,
  query,
  onQueryChange,
  allTags,
  selectedTags,
  onToggleTag,
  onClearTags,
  resultCount,
}: BlogFiltersBarProps) {
  const isSmall = useIsSmall();
  const searchId = useId();
  const hasFilters = query.length > 0 || selectedTags.size > 0;

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(9,12,16,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="container">
        {/* Domain tabs row */}
        <div
          role="tablist"
          aria-label="Filter posts by domain"
          style={{
            display: "flex",
            gap: 0,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              aria-pressed={active === t.id}
              onClick={() => onChange(t.id)}
              style={{
                padding: isSmall ? "12px 14px" : "14px 20px",
                border: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: isSmall ? 12 : 13,
                cursor: "pointer",
                background: "transparent",
                whiteSpace: "nowrap",
                color: active === t.id ? "var(--accent)" : "var(--text3)",
                borderBottom:
                  active === t.id
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
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
                    active === t.id
                      ? "rgba(59,130,246,0.15)"
                      : "rgba(255,255,255,0.05)",
                  color: active === t.id ? "var(--accent)" : "var(--text3)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search + clear row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: isSmall ? "10px 0 8px" : "12px 0 10px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <label htmlFor={searchId} className="visually-hidden">
            Search posts
          </label>
          <div
            style={{
              position: "relative",
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FiSearch
              size={14}
              style={{
                position: "absolute",
                left: 12,
                color: "var(--text3)",
                pointerEvents: "none",
              }}
              aria-hidden
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search posts, tags, topics…"
              autoComplete="off"
              spellCheck={false}
              style={{
                width: "100%",
                padding: isSmall ? "9px 36px 9px 34px" : "10px 36px 10px 36px",
                borderRadius: 100,
                border: "1px solid var(--border)",
                background: "var(--bg2)",
                color: "var(--text)",
                fontFamily: "var(--font-mono)",
                fontSize: isSmall ? 12 : 13,
                outline: "none",
                transition: "border-color .2s, background .2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: 8,
                  width: 22,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "50%",
                  background: "transparent",
                  color: "var(--text3)",
                  cursor: "pointer",
                }}
              >
                <FiX size={13} />
              </button>
            )}
          </div>
          <span
            aria-live="polite"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text3)",
              whiteSpace: "nowrap",
            }}
          >
            {resultCount} {resultCount === 1 ? "post" : "posts"}
          </span>
        </div>

        {/* Tag chips row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 0 10px",
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {allTags.map((tag) => {
            const selected = selectedTags.has(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleTag(tag)}
                className="blog-tag-chip"
                style={{
                  padding: isSmall ? "5px 11px" : "6px 13px",
                  borderRadius: 100,
                  border: "1px solid",
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 10 : 11,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  borderColor: selected ? "var(--accent)" : "transparent",
                  background: selected
                    ? "rgba(59,130,246,0.1)"
                    : "transparent",
                  color: selected ? "var(--accent)" : "var(--text3)",
                  transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {tag}
              </button>
            );
          })}
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                onQueryChange("");
                onClearTags();
              }}
              style={{
                marginLeft: 4,
                padding: isSmall ? "5px 11px" : "6px 13px",
                borderRadius: 100,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text2)",
                fontFamily: "var(--font-mono)",
                fontSize: isSmall ? 10 : 11,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <FiX size={11} /> Clear
            </button>
          )}
        </div>
      </div>

      <style>{`
        .blog-tag-chip:hover {
          border-color: rgba(59,130,246,0.3) !important;
          color: var(--text2) !important;
          background: rgba(59,130,246,0.04) !important;
        }
        .blog-tag-chip[aria-pressed="true"]:hover {
          color: var(--accent) !important;
          background: rgba(59,130,246,0.14) !important;
        }
      `}</style>
    </div>
  );
}
