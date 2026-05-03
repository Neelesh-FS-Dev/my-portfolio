import { useIsSmall } from "../../hooks/useMediaQuery";

export type BlogDomainFilter = "all" | "mobile" | "web";

export interface BlogTab {
  id: BlogDomainFilter;
  label: string;
  count: number;
}

export interface BlogTabsBarProps {
  tabs: ReadonlyArray<BlogTab>;
  active: BlogDomainFilter;
  onChange: (id: BlogDomainFilter) => void;
}

export default function BlogTabsBar({
  tabs,
  active,
  onChange,
}: BlogTabsBarProps) {
  const isSmall = useIsSmall();

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(9,12,16,0.95)",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
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
          {tabs.map((t) => (
            <button
              key={t.id}
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
                transform:
                  active === t.id ? "translateY(0)" : "translateY(0)",
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
                      ? "rgba(0,229,255,0.15)"
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
      </div>
    </div>
  );
}
