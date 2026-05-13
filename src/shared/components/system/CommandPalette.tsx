import {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiHome,
  FiCompass,
  FiBriefcase,
  FiBookOpen,
  FiMail,
  FiFileText,
  FiTool,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
  FiCornerDownLeft,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import projects from "../../../features/projects/data/projects";
import blogs from "../../../features/blogs/data/blogs";
import personal from "../../data/personal";
import { trackEvent, trackOutbound } from "../../lib/analytics";
import { lockBodyScroll } from "../../lib/scrollLock";

type CommandKind = "page" | "project" | "blog" | "external" | "action";

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  kind: CommandKind;
  icon: ReactNode;
  to?: string;
  url?: string;
  keywords?: string;
}

const PAGE_COMMANDS: CommandItem[] = [
  { id: "page-home", label: "Home", kind: "page", icon: <FiHome size={14} />, to: "/" },
  { id: "page-projects", label: "Projects", kind: "page", icon: <FiCompass size={14} />, to: "/projects" },
  { id: "page-experience", label: "Experience", kind: "page", icon: <FiBriefcase size={14} />, to: "/experience" },
  { id: "page-blogs", label: "Blogs", kind: "page", icon: <FiBookOpen size={14} />, to: "/blogs" },
  { id: "page-uses", label: "Uses / Stack", kind: "page", icon: <FiTool size={14} />, to: "/uses" },
  { id: "page-contact", label: "Contact", kind: "page", icon: <FiMail size={14} />, to: "/contact" },
  { id: "page-resume", label: "Resume", kind: "page", icon: <FiFileText size={14} />, to: "/resume" },
];

const EXTERNAL_COMMANDS: CommandItem[] = [
  {
    id: "ext-github",
    label: "GitHub",
    hint: "github.com/Neelesh-FS-Dev",
    kind: "external",
    icon: <FiGithub size={14} />,
    url: personal.github,
  },
  {
    id: "ext-linkedin",
    label: "LinkedIn",
    hint: "linkedin.com/in/neeleshyadav",
    kind: "external",
    icon: <FiLinkedin size={14} />,
    url: personal.linkedin,
  },
  {
    id: "ext-instagram",
    label: "Instagram",
    kind: "external",
    icon: <FiInstagram size={14} />,
    url: personal.instagram,
  },
  {
    id: "ext-email",
    label: `Email — ${personal.email}`,
    kind: "external",
    icon: <FiMail size={14} />,
    url: `mailto:${personal.email}`,
  },
  {
    id: "ext-resume-pdf",
    label: "Download Resume (PDF)",
    kind: "external",
    icon: <FiFileText size={14} />,
    url: personal.resume,
  },
];

function buildProjectCommands(): CommandItem[] {
  return projects.map((p) => ({
    id: `project-${p.id}`,
    label: p.title,
    hint: p.subtitle,
    kind: "project",
    icon: <FiCompass size={14} />,
    to: `/projects/${p.id}`,
    keywords: [p.title, p.subtitle, ...(p.stack || [])].join(" "),
  }));
}

function buildBlogCommands(): CommandItem[] {
  return blogs.map((b) => ({
    id: `blog-${b.slug || b.id}`,
    label: b.title,
    hint: b.excerpt,
    kind: "blog",
    icon: <FiBookOpen size={14} />,
    to: `/blogs/${b.slug || b.id}`,
    keywords: [b.title, b.excerpt, ...(b.tags || [])].join(" "),
  }));
}

const KIND_LABEL: Record<CommandKind, string> = {
  page: "Pages",
  project: "Projects",
  blog: "Blog Posts",
  external: "Links",
  action: "Actions",
};

const KIND_ORDER: CommandKind[] = ["page", "project", "blog", "external", "action"];

function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function scoreItem(item: CommandItem, q: string): number {
  if (!q) return 0;
  const hay = (
    item.label +
    " " +
    (item.hint || "") +
    " " +
    (item.keywords || "")
  ).toLowerCase();
  const needle = q.toLowerCase();
  if (item.label.toLowerCase().startsWith(needle)) return 100;
  if (hay.includes(needle)) return 50;
  // Fuzzy: all needle chars appear in order
  let i = 0;
  for (const ch of hay) {
    if (ch === needle[i]) i++;
    if (i >= needle.length) return 10;
  }
  return -1;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo<CommandItem[]>(
    () => [
      ...PAGE_COMMANDS,
      ...buildProjectCommands(),
      ...buildBlogCommands(),
      ...EXTERNAL_COMMANDS,
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return allItems;
    return allItems
      .map((item) => ({ item, score: scoreItem(item, q) }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  }, [allItems, query]);

  const grouped = useMemo(() => {
    const groups = new Map<CommandKind, CommandItem[]>();
    for (const item of filtered) {
      if (!groups.has(item.kind)) groups.set(item.kind, []);
      groups.get(item.kind)!.push(item);
    }
    return KIND_ORDER.filter((k) => groups.has(k)).map(
      (k) => [k, groups.get(k)!] as const,
    );
  }, [filtered]);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const runItem = useCallback(
    (item: CommandItem) => {
      closePalette();
      if (item.kind === "project" && item.to) {
        trackEvent("project_click", {
          project_id: item.id.replace(/^project-/, ""),
          project_title: item.label,
          surface: "command_palette",
        });
      } else if (item.id === "ext-resume-pdf") {
        trackEvent("resume_download", {
          surface: "command_palette",
          method: "pdf",
        });
      } else if (item.kind === "external" && item.url) {
        trackOutbound(item.url, item.label, "command_palette");
      }
      if (item.to) {
        navigate(item.to);
      } else if (item.url) {
        if (item.url.startsWith("mailto:") || item.url.startsWith("tel:")) {
          window.location.href = item.url;
        } else if (item.url.startsWith("/")) {
          // Internal asset (e.g. resume PDF) — let the browser handle the navigation.
          window.location.href = item.url;
        } else {
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      }
    },
    [closePalette, navigate],
  );

  // Global ⌘K / Ctrl+K toggle + Escape to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        closePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePalette]);

  // Lock body scroll while open + autofocus input.
  useEffect(() => {
    if (!open) return;
    const release = lockBodyScroll();
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      release();
      window.clearTimeout(t);
    };
  }, [open]);

  // Keep active item in view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-cmd-idx="${activeIdx}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const onInputKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIdx];
        if (item) runItem(item);
      }
    },
    [filtered, activeIdx, runItem],
  );

  if (typeof document === "undefined") return null;

  // Forward wheel/trackpad scrolling anywhere on the overlay into the results list,
  // so users don't need to land the cursor precisely on the scrollable region.
  const onOverlayWheel = (e: React.WheelEvent) => {
    const list = listRef.current;
    if (!list) return;
    if (list.contains(e.target as Node)) return;
    list.scrollTop += e.deltaY;
  };

  // Compute the running flat index so each row knows where it sits across groups.
  let flatIdx = -1;
  const modKey = isMac() ? "⌘" : "Ctrl";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={closePalette}
          onWheel={onOverlayWheel}
          data-lenis-prevent
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(4,7,10,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "12vh 16px 16px",
          }}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 620,
              background: "rgba(15,18,22,0.98)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70vh",
            }}
          >
            {/* Search input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 16px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <FiSearch size={16} style={{ color: "var(--text3)" }} aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search pages, projects, blog posts…"
                autoComplete="off"
                spellCheck={false}
                aria-label="Search commands"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                }}
              />
              <kbd
                style={{
                  padding: "2px 8px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text3)",
                }}
              >
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 6,
              }}
            >
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: "32px 16px",
                    textAlign: "center",
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                  }}
                >
                  No matches for "{query}"
                </div>
              ) : (
                grouped.map(([kind, items]) => (
                  <div key={kind} style={{ padding: "8px 0" }}>
                    <div
                      style={{
                        padding: "0 10px 6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text3)",
                      }}
                    >
                      {KIND_LABEL[kind]}
                    </div>
                    {items.map((item) => {
                      flatIdx++;
                      const isActive = flatIdx === activeIdx;
                      const idx = flatIdx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          data-cmd-idx={idx}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => runItem(item)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            width: "100%",
                            padding: "9px 10px",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            background: isActive
                              ? "rgba(59,130,246,0.1)"
                              : "transparent",
                            color: isActive ? "var(--text)" : "var(--text2)",
                            textAlign: "left",
                            transition: "background 0.12s, color 0.12s",
                          }}
                        >
                          <span
                            style={{
                              width: 26,
                              height: 26,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 6,
                              background: isActive
                                ? "rgba(59,130,246,0.18)"
                                : "rgba(255,255,255,0.04)",
                              color: isActive ? "var(--accent)" : "var(--text3)",
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </span>
                          <span
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 500,
                                fontSize: 13.5,
                                color: "var(--text)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.label}
                            </span>
                            {item.hint && (
                              <span
                                style={{
                                  fontSize: 11.5,
                                  color: "var(--text3)",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.hint}
                              </span>
                            )}
                          </span>
                          <FiArrowRight
                            size={13}
                            style={{
                              color: isActive ? "var(--accent)" : "transparent",
                              flexShrink: 0,
                            }}
                            aria-hidden
                          />
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "8px 14px",
                borderTop: "1px solid var(--border)",
                background: "rgba(9,12,16,0.6)",
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--text3)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <FiArrowUp size={11} /> <FiArrowDown size={11} /> navigate
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <FiCornerDownLeft size={11} /> select
                </span>
              </span>
              <span>
                <kbd
                  style={{
                    padding: "1px 6px",
                    borderRadius: 4,
                    border: "1px solid var(--border)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                  }}
                >
                  {modKey} K
                </kbd>{" "}
                to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
