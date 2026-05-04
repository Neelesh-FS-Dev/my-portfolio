import { lazy, Suspense } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import personal from "../../../shared/data/personal";
import PhoneMockup from "../../../shared/components/effects/PhoneMockup";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import { getExperience } from "../../../shared/utils/getExperience";

const Phone3D = lazy(
  () => import("../../../shared/components/effects/Phone3D"),
);

interface VisualFallbackProps {
  children: ReactNode;
  style?: CSSProperties;
}

function VisualFallback({ children, style }: VisualFallbackProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface HeroProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function Hero({ isMobile, isSmall }: HeroProps) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: isMobile ? 40 : 48,
        paddingBottom: 40,
      }}
      className="grid-bg"
    >
      <div className="hero-spotlight" aria-hidden />
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: isMobile ? 0 : 48,
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          {/* Available badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              borderRadius: 100,
              marginBottom: isSmall ? 20 : 28,
              border: "1px solid rgba(59,130,246,0.2)",
              background: "rgba(59,130,246,0.05)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text2)",
                letterSpacing: "0.04em",
              }}
            >
              Available for work
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: isSmall
                ? "40px"
                : isMobile
                  ? "52px"
                  : "clamp(58px, 7.2vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              marginBottom: 20,
              color: "var(--text)",
            }}
          >
            Mobile & Web
            <br />
            <span style={{ color: "var(--accent)" }}>App Developer</span>
          </h1>

          {/* Dual role pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <TbBrandReactNative size={13} />, label: "React Native" },
              { icon: <SiReact size={13} />, label: "React.js" },
              { icon: <SiTailwindcss size={13} />, label: "Tailwind CSS" },
            ].map((t) => (
              <span
                key={t.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontFamily: "var(--font-mono)",
                  fontSize: isSmall ? 11 : 12,
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <span
                  style={{ color: "var(--accent)", display: "inline-flex" }}
                >
                  {t.icon}
                </span>{" "}
                {t.label}
              </span>
            ))}
          </div>

          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 15 : 17,
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: isSmall ? 28 : 40,
            }}
          >
            Software Engineer with {getExperience("2023-01-01")} specializing
            in React Native and React, building consumer-facing mobile and web
            applications used in production. Skilled in architecting scalable
            component systems, optimizing rendering performance, integrating
            real-time features (WebSockets, push, live data), and shipping
            cross-platform apps end-to-end — from design handoff to App Store
            and Play Store release. Strong focus on Core Web Vitals,
            accessibility, and SEO for web platforms.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: isSmall ? 32 : 48,
            }}
          >
            <Link to="/projects" className="btn btn-primary">
              View Projects <span>→</span>
            </Link>
            {personal.resume && (
              <a
                href={personal.resume}
                download
                className="btn btn-outline"
                aria-label="Download resume PDF"
              >
                <FiDownload
                  size={15}
                  style={{ marginRight: 6, verticalAlign: "middle" }}
                />
                Download Resume
              </a>
            )}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isSmall ? "1fr 1fr" : "repeat(4,auto)",
              gap: isSmall ? "14px 20px" : "0 32px",
              width: "fit-content",
            }}
          >
            {[
              { value: personal.stats.mobileApps, label: "Mobile Apps" },
              { value: personal.stats.webProjects, label: "Web Apps" },
              { value: personal.stats.users, label: "Users Served" },
              {
                value: personal.stats.experience + " yrs",
                label: "Experience",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isSmall ? 22 : 26,
                    fontWeight: 800,
                    color: "var(--accent)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone cluster — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Suspense
              fallback={
                <VisualFallback
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0,
                  }}
                >
                  <div
                    style={{
                      transform: "translateX(-20px) rotate(-8deg)",
                      opacity: 0.55,
                      filter: "blur(1px)",
                    }}
                  >
                    <PhoneMockup color="#3b82f6" />
                  </div>
                  <div
                    style={{
                      transform: "translateY(-10px)",
                      position: "relative",
                      marginLeft: -40,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: -20,
                        borderRadius: 56,
                        background:
                          "radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)",
                      }}
                    />
                    <PhoneMockup color="#3b82f6" />
                  </div>
                </VisualFallback>
              }
            >
              <Phone3D
                offsetX={-20}
                initialRotateZ={-8}
                floatDelay={0}
                intensity={12}
                style={{ zIndex: 1, opacity: 0.55, filter: "blur(1px)" }}
              >
                <PhoneMockup color="#3b82f6" />
              </Phone3D>
              <Phone3D
                offsetY={-10}
                floatDelay={Math.PI}
                intensity={15}
                style={{ zIndex: 2, position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 56,
                    background:
                      "radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <PhoneMockup color="#3b82f6" />
              </Phone3D>
            </Suspense>
          </div>
        )}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </section>
  );
}
