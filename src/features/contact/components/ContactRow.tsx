import { memo } from "react";
import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { slideRight, hoverLift } from "../../../shared/components/motion";

export interface ContactItem {
  icon: ReactElement;
  label: string;
  value: string;
  href: string | null;
}

export interface ContactRowProps {
  item: ContactItem;
  isSmall: boolean;
}

function ContactRow({ item, isSmall }: ContactRowProps) {
  return (
    <motion.div
      variants={slideRight}
      whileHover={{
        borderColor: "rgba(59,130,246,0.3)",
        boxShadow: "0 4px 20px rgba(59,130,246,0.08)",
        x: 4,
      }}
      transition={hoverLift}
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: isSmall ? "14px 16px" : "16px 18px",
        borderRadius: 14,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        cursor: item.href ? "pointer" : "default",
        willChange: "transform",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: -6 }}
        transition={hoverLift}
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          flexShrink: 0,
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
        }}
      >
        {item.icon}
      </motion.div>
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
    </motion.div>
  );
}

export default memo(ContactRow);
