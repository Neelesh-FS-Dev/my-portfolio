import { Link } from "react-router-dom";
import personal from "../../../shared/data/personal";
import { FiMail, FiGithub, FiPhone } from "react-icons/fi";

export interface GetInTouchProps {
  isSmall: boolean;
}

export default function GetInTouch({ isSmall }: GetInTouchProps) {
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}
      >
        <div className="section-label" style={{ justifyContent: "center" }}>
          <span className="section-num">04 /</span> Let's Work Together
        </div>
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          Mobile or Web —<br />
          <span style={{ color: "var(--accent)" }}>Let's Build It</span>
        </h2>
        <p
          style={{
            color: "var(--text2)",
            fontSize: isSmall ? 15 : 17,
            lineHeight: 1.8,
            marginBottom: 36,
          }}
        >
          Looking for a developer who covers both React Native mobile apps and
          React web platforms? I'm open to full-time roles, freelance projects,
          and collaborations.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          <a href={`mailto:${personal.email}`} className="btn btn-primary">
            <FiMail
              size={15}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />{" "}
            Send Email
          </a>
          <Link to="/contact" className="btn btn-outline">
            Contact Page
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: isSmall ? 20 : 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: (
                <>
                  <FiGithub
                    size={13}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  GitHub
                </>
              ),
              href: personal.github,
            },
            {
              label: (
                <>
                  <FiMail
                    size={13}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  Email
                </>
              ),
              href: `mailto:${personal.email}`,
            },
            {
              label: (
                <>
                  <FiPhone
                    size={13}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  Phone
                </>
              ),
              href: `tel:${personal.phone}`,
            },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--text2)",
                transition: "color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text2)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
