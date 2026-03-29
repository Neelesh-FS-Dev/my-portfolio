import { useState, useEffect, useRef, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiGithub, FiMail } from "react-icons/fi";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: 64,
          background:
            scrolled || menuOpen ? "rgba(9,12,16,0.97)" : "rgba(9,12,16,0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          transition: "background .35s ease, border-color .35s ease",
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
          {/* ── Logo ── */}
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
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "linear-gradient(135deg, #00e5ff, #7c4dff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 14,
                color: "#090c10",
                flexShrink: 0,
              }}
            >
              NY
            </div>
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

          {/* ── Desktop nav links (hidden below 900px) ── */}
          <div
            className="nav-desktop"
            style={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                style={({ isActive }) => ({
                  padding: "7px 14px",
                  borderRadius: 100,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "var(--accent)" : "var(--text2)",
                  background: isActive ? "rgba(0,229,255,0.1)" : "transparent",
                  border: isActive
                    ? "1px solid rgba(0,229,255,0.22)"
                    : "1px solid transparent",
                  transition: "all .2s",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* ── Right side ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            {/* Hire me — desktop only */}
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

            {/* Hamburger — mobile/tablet only */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                width: 40,
                height: 40,
                display: "none", // shown via CSS
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                cursor: "pointer",
                background: menuOpen ? "rgba(0,229,255,0.08)" : "transparent",
                border: "1px solid",
                borderColor: menuOpen
                  ? "rgba(0,229,255,0.25)"
                  : "rgba(255,255,255,0.1)",
                borderRadius: 10,
                transition: "all .25s",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  borderRadius: 2,
                  background: menuOpen ? "var(--accent)" : "var(--text)",
                  transition: "transform .3s ease, opacity .3s ease",
                  transform: menuOpen
                    ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  borderRadius: 2,
                  background: menuOpen ? "var(--accent)" : "var(--text)",
                  transition: "opacity .2s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  borderRadius: 2,
                  background: menuOpen ? "var(--accent)" : "var(--text)",
                  transition: "transform .3s ease",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile / Tablet fullscreen menu overlay ── */}
      <div
        className="nav-mobile-overlay"
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
          // animate open/close
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .25s ease, transform .25s ease",
        }}
      >
        {/* Nav links */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}
        >
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              style={({ isActive }) => ({
                padding: "15px 18px",
                borderRadius: 14,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(18px, 5vw, 24px)",
                color: isActive ? "var(--accent)" : "var(--text)",
                background: isActive ? "rgba(0,229,255,0.06)" : "transparent",
                borderLeft: isActive
                  ? "3px solid var(--accent)"
                  : "3px solid transparent",
                display: "block",
                textDecoration: "none",
                transition: "all .2s",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-10px)",
                transitionDelay: `${i * 40}ms`,
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
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
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

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a
              href="https://github.com/Neelesh-FS-Dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text3)",
                transition: "color .2s",
              }}
              onTouchStart={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onTouchEnd={(e) => (e.currentTarget.style.color = "var(--text3)")}
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
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        /* Desktop: show links + hire btn, hide hamburger */
        @media (min-width: 901px) {
          .nav-desktop { display: flex !important; }
          .nav-hire-btn { display: inline-flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-mobile-overlay { display: none !important; }
        }

        /* Tablet + mobile: hide links, show hamburger */
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hire-btn { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }

        /* Tablet: slightly larger touch targets */
        @media (max-width: 900px) and (min-width: 481px) {
          .nav-mobile-overlay a, .nav-mobile-overlay button {
            min-height: 52px;
          }
        }

        /* Small phone */
        @media (max-width: 480px) {
          nav > div { padding: 0 16px !important; }
        }
      `}</style>
    </>
  );
}

export default memo(Navbar);
