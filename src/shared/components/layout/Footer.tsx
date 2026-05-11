import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  FileText,
  Globe,
} from "lucide-react";
import personal from "../../data/personal";

/**
 * Adapted from a 21st.dev hover-footer snippet. Tailwind classes replaced
 * with project tokens; layout uses scoped CSS classes for responsiveness.
 */
const STYLES = `
  .ny-footer-wrap {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: rgba(15, 15, 17, 0.55);
    border-top: 1px solid var(--border);
    isolation: isolate;
  }
  .ny-footer-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background: radial-gradient(125% 125% at 50% 10%,
      rgba(15, 15, 17, 0.4) 50%,
      rgba(59, 130, 246, 0.18) 100%);
  }
  .ny-footer-inner {
    position: relative;
    z-index: 2;
    max-width: 1280px;
    margin: 0 auto;
    padding: 56px 32px 32px;
  }
  .ny-footer-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 20px;
    padding-bottom: 36px;
  }
  .ny-footer-grid > .ny-footer-brand {
    grid-column: 1 / -1;
  }
  @media (min-width: 768px) {
    .ny-footer-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  }
  @media (min-width: 1024px) {
    .ny-footer-grid { grid-template-columns: repeat(4, 1fr); gap: 56px; }
    .ny-footer-grid > .ny-footer-brand { grid-column: auto; }
  }

  .ny-footer-brand {
    display: flex; flex-direction: column; gap: 14px;
  }
  .ny-footer-brand-row {
    display: flex; align-items: center; gap: 10px;
  }
  .ny-footer-logo {
    width: 36px; height: 36px; border-radius: 9px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 800; font-size: 13px;
    color: #fff; letter-spacing: -0.02em;
  }
  .ny-footer-name {
    color: var(--text);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 22px;
    letter-spacing: -0.01em;
  }
  .ny-footer-tagline {
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--text2);
    max-width: 320px;
  }

  .ny-footer-heading {
    color: var(--text);
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }
  .ny-footer-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  .ny-footer-link {
    color: var(--text2);
    font-size: 14px;
    text-decoration: none;
    transition: color .2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .ny-footer-link:hover { color: var(--accent); }
  .ny-footer-link-icon { color: var(--accent); display: inline-flex; }

  .ny-footer-divider {
    height: 1px; border: none; background: var(--border); margin: 24px 0;
  }

  .ny-footer-bottom {
    display: flex; flex-direction: column; gap: 14px;
    align-items: center; justify-content: space-between;
    font-size: 13px; color: var(--text3);
  }
  @media (min-width: 768px) {
    .ny-footer-bottom { flex-direction: row; }
  }
  .ny-footer-socials { display: flex; gap: 22px; }
  .ny-footer-social {
    color: var(--text3);
    transition: color .2s, transform .2s;
    display: inline-flex;
  }
  .ny-footer-social:hover { color: var(--accent); transform: translateY(-2px); }

`;

const navSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Projects", to: "/projects" },
      { label: "Experience", to: "/experience" },
      { label: "Blogs", to: "/blogs" },
    ],
  },
  {
    title: "Hire",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Resume (PDF)", to: "/resume" },
      { label: "Availability", to: "/contact" },
    ],
  },
];

const contactItems: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}[] = [
  {
    icon: <Mail size={17} />,
    text: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: <Phone size={17} />,
    text: personal.phone,
    href: `tel:${personal.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: <MapPin size={17} />,
    text: personal.location,
  },
];

const socialLinks = [
  {
    icon: <Github size={18} />,
    label: "GitHub",
    href: personal.github,
    external: true,
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    href: personal.linkedin,
    external: true,
  },
  {
    icon: <Instagram size={18} />,
    label: "Instagram",
    href: personal.instagram,
    external: true,
  },
  {
    icon: <FileText size={18} />,
    label: "Resume",
    href: personal.resume,
    external: false,
  },
  {
    icon: <Globe size={18} />,
    label: "Portfolio",
    href: "/",
    external: false,
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ny-footer-wrap" role="contentinfo">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="ny-footer-bg" aria-hidden="true" />

      <div className="ny-footer-inner">
        <div className="ny-footer-grid">
          {/* Brand */}
          <div className="ny-footer-brand">
            <div className="ny-footer-brand-row">
              <span className="ny-footer-logo">NY</span>
              <span className="ny-footer-name">{personal.name}</span>
            </div>
            <p className="ny-footer-tagline">
              {personal.title}. Building production mobile + web apps,
              shipped to {personal.stats.users} users.
            </p>
          </div>

          {/* Nav sections */}
          {navSections.map((section) => (
            <div key={section.title}>
              <h4 className="ny-footer-heading">{section.title}</h4>
              <ul className="ny-footer-list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="ny-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="ny-footer-heading">Contact</h4>
            <ul className="ny-footer-list">
              {contactItems.map((item) => (
                <li
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text2)",
                    fontSize: 14,
                  }}
                >
                  <span className="ny-footer-link-icon">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="ny-footer-link">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="ny-footer-divider" />

        <div className="ny-footer-bottom">
          <div className="ny-footer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="ny-footer-social"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p style={{ margin: 0, textAlign: "center" }}>
            © {year} {personal.name}. Built with React, TypeScript &
            framer-motion.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default memo(Footer);
