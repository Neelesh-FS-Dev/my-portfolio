import { useState, useEffect, useRef, memo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiGithub, FiMail } from "react-icons/fi";
import { navLinks } from "../data";

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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          height: 64,
          background: menuOpen
            ? "rgba(9,12,16,0.98)"
            : scrolled
              ? "rgba(9,12,16,0.96)"
              : "rgba(9,12,16,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.05)",
          transform:
            navVisible || menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform .28s ease, background .25s ease, border-color .25s ease",
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
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

            <button
              className="nav-hamburger"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                width: 40,
                height: 40,
                display: "none",
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
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .25s ease, transform .25s ease",
        }}
      >
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

      <style>{`
        @media (min-width: 901px) {
          .nav-desktop { display: flex !important; }
          .nav-hire-btn { display: inline-flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-mobile-overlay { display: none !important; }
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hire-btn { display: none !important; }
          .nav-hamburger { display: flex !important; }
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
