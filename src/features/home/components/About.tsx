import personal from "../../../shared/data/personal";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative, TbSparkles } from "react-icons/tb";
import { FiCheck, FiZap, FiCode } from "react-icons/fi";

export interface AboutProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function About({ isMobile, isSmall }: AboutProps) {
  return (
    <section
      className="section"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 72,
          alignItems: "center",
        }}
      >
        {/* Terminal */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 18px",
              borderBottom: "1px solid var(--border)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                marginLeft: 8,
              }}
            >
              neelesh@dev ~
            </span>
          </div>
          <div
            style={{
              padding: isSmall ? "16px" : "22px",
              fontFamily: "var(--font-mono)",
              fontSize: isSmall ? 11 : 12,
              lineHeight: 1.9,
            }}
          >
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>whoami</span>
            </p>
            <p
              style={{
                color: "var(--text2)",
                paddingLeft: 14,
                marginBottom: 6,
              }}
            >
              Neelesh Yadav — Mobile & Web Dev
            </p>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>cat stack.txt</span>
            </p>
            <div style={{ paddingLeft: 14, marginBottom: 6 }}>
              {[
                {
                  icon: <TbBrandReactNative size={12} />,
                  text: "React Native · Redux · TypeScript",
                },
                {
                  icon: <SiReact size={12} />,
                  text: "React.js · JavaScript · Vite",
                },
                {
                  icon: <SiTailwindcss size={12} />,
                  text: "Tailwind CSS · Firebase · Node.js",
                },
              ].map((item) => (
                <p
                  key={item.text}
                  style={{
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ color: "var(--accent)", display: "inline-flex" }}
                  >
                    {item.icon}
                  </span>{" "}
                  {item.text}
                </p>
              ))}
            </div>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>cat platforms.txt</span>
            </p>
            <p
              style={{
                color: "var(--text2)",
                paddingLeft: 14,
                marginBottom: 6,
              }}
            >
              iOS · Android · Web · PWA
            </p>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>cat ai-workflow.txt</span>
            </p>
            <div style={{ paddingLeft: 14, marginBottom: 6 }}>
              {[
                {
                  icon: <TbSparkles size={12} />,
                  text: "Claude Code · Cursor · Codex · Copilot",
                },
                {
                  icon: <FiZap size={12} />,
                  text: "Blackbox · DeepSeek · Gemini",
                },
                {
                  icon: <FiCode size={12} />,
                  text: "pair coding · refactors · code review · debugging",
                },
              ].map((item) => (
                <p
                  key={item.text}
                  style={{
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ color: "var(--accent)", display: "inline-flex" }}
                  >
                    {item.icon}
                  </span>{" "}
                  {item.text}
                </p>
              ))}
            </div>
            <p>
              <span style={{ color: "var(--accent)" }}>$</span>{" "}
              <span style={{ color: "var(--text3)" }}>echo $STATUS</span>
            </p>
            <p style={{ color: "var(--text3)" }}>
              <FiCheck
                size={13}
                style={{
                  color: "var(--green)",
                  verticalAlign: "middle",
                  marginRight: 2,
                }}
              />{" "}
              Open to opportunities
              <span
                style={{
                  animation: "blink 1s steps(1) infinite",
                  marginLeft: 2,
                }}
              >
                ▌
              </span>
            </p>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="section-label">
            <span className="section-num">03 /</span> About Me
          </div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Mobile Apps &<br />
            Web Platforms
          </h2>
          <p
            style={{
              color: "var(--text2)",
              lineHeight: 1.8,
              marginBottom: 14,
              fontSize: isSmall ? 14 : 15,
            }}
          >
            I build across the full mobile and web spectrum. On mobile I
            specialise in React Native and TypeScript — shipping production
            apps to the App Store and Google Play with real-time data layers,
            native module integrations, AR experiences, and smooth 60fps UIs
            powered by Reanimated and the new architecture.
          </p>
          <p
            style={{
              color: "var(--text2)",
              lineHeight: 1.8,
              marginBottom: 28,
              fontSize: isSmall ? 14 : 15,
            }}
          >
            On the web I architect fast, SEO-ready React platforms with Vite,
            Tailwind, and a strong component-design discipline — optimising for
            Core Web Vitals, accessibility (WCAG), and developer experience.
            Whether it's a marketing site, admin dashboard, or e-commerce
            storefront, I ship code that scales with the team.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: 13, padding: "10px 20px" }}
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="btn btn-primary"
              style={{ fontSize: 13, padding: "10px 20px" }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}
