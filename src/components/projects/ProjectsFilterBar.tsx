import { useIsSmall } from "../../hooks/useMediaQuery";

export type DomainTab = "all" | "mobile" | "web";

export interface DomainTabItem {
  id: DomainTab;
  label: string;
  count: number;
}

export interface ProjectsFilterBarProps {
  domainTabs: ReadonlyArray<DomainTabItem>;
  domainTab: DomainTab;
  onDomainChange: (id: DomainTab) => void;
  categories: ReadonlyArray<string>;
  category: string;
  onCategoryChange: (cat: string) => void;
}

export default function ProjectsFilterBar({
  domainTabs,
  domainTab,
  onDomainChange,
  categories,
  category,
  onCategoryChange,
}: ProjectsFilterBarProps) {
  const isSmall = useIsSmall();

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(9,12,16,0.96)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Domain tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              paddingTop: 10,
              paddingBottom: 0,
              borderBottom: "1px solid var(--border)",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {domainTabs.map((t) => (
              <button
                key={t.id}
                aria-pressed={domainTab === t.id}
                onClick={() => onDomainChange(t.id)}
                style={{
                  padding: isSmall ? "8px 14px" : "10px 20px",
                  border: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: isSmall ? 12 : 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: "transparent",
                  color:
                    domainTab === t.id ? "var(--accent)" : "var(--text3)",
                  borderBottom:
                    domainTab === t.id
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                  marginBottom: -1,
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
                      domainTab === t.id
                        ? "rgba(0,229,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                    color:
                      domainTab === t.id ? "var(--accent)" : "var(--text3)",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Category chips */}
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: "8px 0",
              overflowX: "auto",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                aria-pressed={category === cat}
                onClick={() => onCategoryChange(cat)}
                className="cat-chip"
                style={{
                  padding: isSmall ? "5px 12px" : "6px 16px",
                  borderRadius: 100,
                  border: "1px solid",
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 10 : 11,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  borderColor:
                    category === cat ? "var(--accent)" : "transparent",
                  background:
                    category === cat ? "rgba(0,229,255,0.1)" : "transparent",
                  color: category === cat ? "var(--accent)" : "var(--text3)",
                  transform:
                    category === cat ? "translateY(-1px)" : "translateY(0)",
                  transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Category chip hover glow when not selected */
        .cat-chip:hover {
          border-color: rgba(0,229,255,0.3) !important;
          color: var(--text2) !important;
          background: rgba(0,229,255,0.04) !important;
        }
      `}</style>
    </div>
  );
}
