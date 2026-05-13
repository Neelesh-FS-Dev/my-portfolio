import { useState, useEffect, useRef, memo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiMail, FiSearch } from "react-icons/fi";
import navLinks from "../../data/navLinks";
import {
  hoverLift,
  hoverLiftTarget,
  tapTarget,
} from "../motion";
import { trackOutbound } from "../../lib/analytics";
import { lockBodyScroll } from "../../lib/scrollLock";

function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

// Extracted + memo'd so scroll-state changes on the parent Navbar don't
// re-render the link list (only route changes do, via NavLink's own subscription).
const NavDesktopLinks = memo(function NavDesktopLinks() {
  return (
    <div
      className="nav-desktop"
      style={{ display: "flex", gap: 2, alignItems: "center" }}
    >
      {navLinks.map((link) => (
        <motion.div
          key={link.to}
          whileHover={{ y: -2 }}
          whileTap={tapTarget}
          transition={hoverLift}
          style={{ position: "relative" }}
        >
          <NavLink
            to={link.to}
            end={link.to === "/"}
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            {({ isActive }) => (
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "7px 14px",
                  borderRadius: 100,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "var(--accent)" : "var(--text2)",
                  transition: "color .25s",
                  whiteSpace: "nowrap",
                  isolation: "isolate",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 100,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.22)",
                      boxShadow:
                        "0 0 0 1px rgba(59,130,246,0.08), 0 6px 18px -8px rgba(59,130,246,0.45)",
                      zIndex: -1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                      mass: 0.7,
                    }}
                  />
                )}
                {link.label}
              </span>
            )}
          </NavLink>
        </motion.div>
      ))}
    </div>
  );
});

function openCommandPalette() {
  // CommandPalette listens for ⌘K / Ctrl+K globally — synthesize the shortcut
  // so the trigger button and the keystroke share one code path.
  const mac = isMac();
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      metaKey: mac,
      ctrlKey: !mac,
      bubbles: true,
    }),
  );
}

function Navbar() {
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const navVisibleRef = useRef(true);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;
      const shouldShow = currentY < 80 || scrollingUp;
      const isScrolled = currentY > 20;

      if (shouldShow !== navVisibleRef.current) {
        navVisibleRef.current = shouldShow;
        setNavVisible(shouldShow);
      }

      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    return lockBodyScroll();
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          y: navVisible || menuOpen ? 0 : -100,
          backgroundColor: menuOpen
            ? "rgba(9,12,16,0.98)"
            : scrolled
              ? "rgba(9,12,16,0.96)"
              : "rgba(9,12,16,0.9)",
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          height: 64,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.05)",
          transition: "border-color .25s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <NavLink
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -4 }}
              whileTap={tapTarget}
              transition={hoverLift}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 13,
                color: "#ffffff",
                flexShrink: 0,
                letterSpacing: "-0.02em",
              }}
            >
              NY
            </motion.div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              Neelesh Yadav<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </NavLink>

          <NavDesktopLinks />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <motion.button
              type="button"
              onClick={openCommandPalette}
              className="nav-cmdk-btn"
              aria-label="Open command palette"
              whileHover={{ y: -2 }}
              whileTap={tapTarget}
              transition={hoverLift}
              style={{
                display: "none",
                alignItems: "center",
                gap: 8,
                padding: "7px 10px 7px 12px",
                borderRadius: 100,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text3)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <FiSearch size={13} aria-hidden />
              <span>Search</span>
              <kbd
                style={{
                  padding: "1px 6px",
                  borderRadius: 4,
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--text3)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {isMac() ? "⌘" : "Ctrl"} K
              </kbd>
            </motion.button>
            <motion.div
              className="nav-hire-btn-wrap"
              whileHover={hoverLiftTarget}
              whileTap={tapTarget}
              transition={hoverLift}
            >
              <NavLink
                to="/contact"
                className="nav-hire-btn btn btn-primary"
                style={{
                  padding: "9px 20px",
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                Hire Me
              </NavLink>
            </motion.div>

            <motion.button
              className="nav-hamburger"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              whileTap={tapTarget}
              animate={{
                background: menuOpen
                  ? "rgba(59,130,246,0.08)"
                  : "rgba(0,0,0,0)",
                borderColor: menuOpen
                  ? "rgba(59,130,246,0.25)"
                  : "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 0.25 }}
              style={{
                width: 40,
                height: 40,
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                cursor: "pointer",
                border: "1px solid",
                borderRadius: 10,
                flexShrink: 0,
              }}
            >
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: 45, y: 6.5, backgroundColor: "var(--accent)" }
                    : { rotate: 0, y: 0, backgroundColor: "var(--text)" }
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  borderRadius: 2,
                }}
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  borderRadius: 2,
                  background: menuOpen ? "var(--accent)" : "var(--text)",
                }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: -6.5, backgroundColor: "var(--accent)" }
                    : { rotate: 0, y: 0, backgroundColor: "var(--text)" }
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  borderRadius: 2,
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="nav-mobile-overlay"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 850,
              background: "rgba(9,12,16,0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              padding: "32px 24px 40px",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                flex: 1,
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    style={({ isActive }) => ({
                      padding: "15px 18px",
                      borderRadius: 14,
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(18px, 5vw, 24px)",
                      color: isActive ? "var(--accent)" : "var(--text)",
                      background: isActive
                        ? "rgba(59,130,246,0.06)"
                        : "transparent",
                      borderLeft: isActive
                        ? "3px solid var(--accent)"
                        : "3px solid transparent",
                      display: "block",
                      textDecoration: "none",
                      transition: "color .2s, background .2s",
                    })}
                  >
                    <span
                      style={{
                        color: "var(--text3)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        marginRight: 10,
                      }}
                    >
                      0{i + 1}
                    </span>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05 * navLinks.length + 0.1,
                duration: 0.4,
              }}
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <motion.div whileHover={hoverLiftTarget} whileTap={tapTarget} transition={hoverLift}>
                <NavLink
                  to="/contact"
                  className="btn btn-primary"
                  style={{
                    justifyContent: "center",
                    fontSize: 15,
                    display: "flex",
                    textDecoration: "none",
                  }}
                >
                  <FiMail size={15} style={{ marginRight: 6 }} /> Hire Me
                </NavLink>
              </motion.div>

              <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                <a
                  href="https://github.com/Neelesh-FS-Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutbound(
                      "https://github.com/Neelesh-FS-Dev",
                      "GitHub",
                      "navbar_mobile",
                    )
                  }
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--text3)",
                    transition: "color .2s",
                  }}
                >
                  <FiGithub
                    size={14}
                    style={{ marginRight: 4, verticalAlign: "middle" }}
                  />
                  GitHub
                </a>
                <a
                  href="mailto:neeleshy263@gmail.com"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--text3)",
                    transition: "color .2s",
                  }}
                >
                  <FiMail
                    size={14}
                    style={{ marginRight: 4, verticalAlign: "middle" }}
                  />
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 901px) {
          .nav-desktop { display: flex !important; }
          .nav-hire-btn-wrap { display: inline-flex !important; }
          .nav-cmdk-btn { display: inline-flex !important; }
          .nav-hamburger { display: none !important; }
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hire-btn-wrap { display: none !important; }
          .nav-cmdk-btn { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }

        .nav-cmdk-btn:hover {
          color: var(--text2) !important;
          border-color: rgba(59,130,246,0.3) !important;
        }

        @media (max-width: 900px) and (min-width: 481px) {
          .nav-mobile-overlay a, .nav-mobile-overlay button {
            min-height: 52px;
          }
        }

        @media (max-width: 480px) {
          nav > div { padding: 0 16px !important; }
        }
      `}</style>
    </>
  );
}

export default memo(Navbar);
