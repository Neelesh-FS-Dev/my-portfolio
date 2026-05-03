import { memo } from "react";
import type { ReactElement } from "react";

export interface ContactItem {
  icon: ReactElement;
  label: string;
  value: string;
  href: string | null;
}

export interface ContactRowProps {
  item: ContactItem;
  idx: number;
  visible: boolean;
  isSmall: boolean;
}

function ContactRow({ item, idx, visible, isSmall }: ContactRowProps) {
  return (
    <div
      className="contact-row"
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: isSmall ? "14px 16px" : "16px 18px",
        borderRadius: 14,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${0.08 + idx * 0.07}s,
                     transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.08 + idx * 0.07}s,
                     border-color 0.2s, box-shadow 0.2s`,
        cursor: item.href ? "pointer" : "default",
        willChange: "transform, opacity",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,229,255,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="contact-icon"
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          flexShrink: 0,
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          transition:
            "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s",
        }}
      >
        {item.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          {item.label}
        </div>
        {item.href ? (
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isSmall ? 12 : 14,
              color: "var(--accent)",
              wordBreak: "break-all",
              transition: "opacity .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = ".7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {item.value}
          </a>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isSmall ? 12 : 14,
              color: "var(--text2)",
            }}
          >
            {item.value}
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(ContactRow);
