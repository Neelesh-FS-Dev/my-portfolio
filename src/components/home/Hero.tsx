import { lazy, Suspense } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { personal } from "../../data";
import PhoneMockup from "../PhoneMockup";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import { getExperience } from "../../utils/getExperience";

const Phone3D = lazy(() => import("../Phone3D"));

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
              border: "1px solid rgba(0,229,255,0.2)",
              background: "rgba(0,229,255,0.05)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--accent)",
              }}
            >
              Available for work
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: isSmall
                ? "34px"
                : isMobile
                  ? "42px"
                  : "clamp(46px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              marginBottom: 16,
            }}
          >
            Mobile & Web
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#00e5ff 0%,#7c4dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              App Developer
            </span>
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
              {
                icon: <TbBrandReactNative size={13} />,
                label: "React Native",
                color: "var(--accent)",
                border: "rgba(0,229,255,0.25)",
                bg: "rgba(0,229,255,0.07)",
              },
              {
                icon: <SiReact size={13} />,
                label: "React.js",
                color: "#b39ddb",
                border: "rgba(124,77,255,0.25)",
                bg: "rgba(124,77,255,0.07)",
              },
              {
                icon: <SiTailwindcss size={13} />,
                label: "Tailwind CSS",
                color: "var(--green)",
                border: "rgba(0,255,136,0.25)",
                bg: "rgba(0,255,136,0.07)",
              },
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
                  color: t.color,
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                }}
              >
                {t.icon} {t.label}
              </span>
            ))}
          </div>

          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 14 : 16,
              lineHeight: 1.78,
              maxWidth: 510,
              marginBottom: isSmall ? 28 : 36,
            }}
          >
            React Native & React Developer with {getExperience("2023-01-01")} of
            experience (including a 6-month internship) building
            high-performance, scalable mobile and web applications. Experienced
            in crafting pixel-perfect UIs, real-time features, and
            production-ready architectures — from App Store & Play Store apps to
            fast, SEO-optimized web platforms.
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
                    <PhoneMockup color="#7c4dff" />
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
                          "radial-gradient(circle,rgba(0,229,255,0.15) 0%,transparent 70%)",
                      }}
                    />
                    <PhoneMockup color="#00e5ff" />
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
                <PhoneMockup color="#7c4dff" />
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
                      "radial-gradient(circle,rgba(0,229,255,0.15) 0%,transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <PhoneMockup color="#00e5ff" />
              </Phone3D>
            </Suspense>
          </div>
        )}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </section>
  );
}
