import {
  lazy,
  memo,
  Suspense,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import personal from "../../../shared/data/personal";
import PhoneMockup from "../../../shared/components/effects/PhoneMockup";
import HeroParticles from "../../../shared/components/effects/HeroParticles";
import MagneticButton from "../../../shared/components/effects/MagneticButton";
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
    <div aria-hidden="true" style={{ pointerEvents: "none", ...style }}>
      {children}
    </div>
  );
}

const SUBTITLES = [
  "React Native · React · TypeScript",
  "Mobile + Web · Production at scale",
  "Real-time systems · Scalable UI",
];

// Self-contained typewriter — isolates its frequent setState from the parent Hero,
// so sibling motion values, springs, and the WebGL canvas don't reconcile each tick.
const Typewriter = memo(function Typewriter({
  words,
  speed = 55,
  hold = 1600,
  isSmall,
}: {
  words: string[];
  speed?: number;
  hold?: number;
  isSmall: boolean;
}) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"type" | "delete">("type");

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (text.length < word.length) {
        timer = setTimeout(
          () => setText(word.slice(0, text.length + 1)),
          speed,
        );
      } else {
        timer = setTimeout(() => setPhase("delete"), hold);
      }
    } else if (phase === "delete") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(word.slice(0, text.length - 1)), 28);
      } else {
        // Schedule the word swap via the same timer pipeline so we don't
        // setState synchronously in the effect body.
        timer = setTimeout(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase("type");
        }, 0);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, wordIdx, words, speed, hold]);

  return (
    <div
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: isSmall ? 13 : 15,
        color: "var(--accent)",
        letterSpacing: "0.05em",
        marginBottom: isSmall ? 14 : 18,
        minHeight: 22,
        display: "flex",
        alignItems: "center",
        gap: 6,
        textShadow: "0 0 14px rgba(59,130,246,0.4)",
      }}
      aria-live="polite"
    >
      <span style={{ color: "var(--text3)" }}>&gt;</span>
      <span>{text}</span>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: isSmall ? 14 : 16,
          background: "var(--accent)",
          animation: "blink 1s step-end infinite",
          boxShadow: "0 0 10px var(--accent)",
        }}
      />
    </div>
  );
});

export interface HeroProps {
  isMobile: boolean;
  isSmall: boolean;
}

export default function Hero({ isMobile, isSmall }: HeroProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });
  const tX = useTransform(sx, (v) => `${v * -8}px`);
  const tY = useTransform(sy, (v) => `${v * -5}px`);
  const tX2 = useTransform(sx, (v) => `${v * 10}px`);
  const tY2 = useTransform(sy, (v) => `${v * 6}px`);

  useEffect(() => {
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fineHover) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      style={{
        minHeight: isMobile ? "auto" : "94svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: isMobile ? 88 : 96,
        paddingBottom: isMobile ? 64 : 56,
        background:
          "radial-gradient(ellipse at top, rgba(59,130,246,0.08), transparent 60%), radial-gradient(ellipse at bottom right, rgba(59,130,246,0.05), transparent 70%), var(--bg)",
      }}
      className="grid-bg"
    >
      <div className="hero-spotlight" aria-hidden />
      <HeroParticles count={650} />

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(0, 1fr) minmax(0, 1fr)",
          gap: isMobile ? 0 : 28,
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="intro-stagger" style={{ minWidth: 0 }}>
          {/* Available badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 100,
              marginBottom: isSmall ? 14 : 18,
              border: "1px solid rgba(59,130,246,0.22)",
              background: "rgba(59,130,246,0.06)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
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
                letterSpacing: "0.06em",
              }}
            >
              Available for work
            </span>
          </div>

          {/* Cinematic stacked headline — fits within the column */}
          <motion.h1
            style={{
              fontFamily: "var(--font-cinematic)",
              fontWeight: 400,
              fontSize: isSmall
                ? "clamp(44px, 12vw, 60px)"
                : isMobile
                  ? "clamp(52px, 10vw, 76px)"
                  : "clamp(52px, 6.4vw, 92px)",
              lineHeight: 0.94,
              letterSpacing: "0.012em",
              marginBottom: isSmall ? 12 : 14,
              color: "var(--text)",
              textTransform: "uppercase",
              textShadow: "0 0 32px rgba(59,130,246,0.18)",
            }}
          >
            <motion.span style={{ display: "block", x: tX, y: tY }}>
              Mobile
            </motion.span>
            {isMobile ? (
              <>
                <motion.span
                  style={{ display: "block", x: tX2, y: tY2 }}
                  className="neon-text"
                >
                  &amp; Web
                </motion.span>
                <motion.span style={{ display: "block", x: tX, y: tY }}>
                  Engineer
                </motion.span>
              </>
            ) : (
              <motion.span
                style={{ display: "block", x: tX2, y: tY2 }}
                className="neon-text"
              >
                &amp; Web Engineer
              </motion.span>
            )}
          </motion.h1>

          {/* Typewriter subtitle — isolated child to scope re-renders */}
          <Typewriter words={SUBTITLES} isSmall={isSmall} />

          {/* Tech pills */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: isSmall ? 16 : 18,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <TbBrandReactNative size={12} />, label: "React Native" },
              { icon: <SiReact size={12} />, label: "React.js" },
              { icon: <SiTailwindcss size={12} />, label: "Tailwind CSS" },
            ].map((t) => (
              <span
                key={t.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 11px",
                  borderRadius: 100,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text)",
                  border: "1px solid rgba(59,130,246,0.18)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{ color: "var(--accent)", display: "inline-flex" }}
                >
                  {t.icon}
                </span>
                {t.label}
              </span>
            ))}
          </div>

          {/* Short description */}
          <p
            style={{
              color: "var(--text2)",
              fontSize: isSmall ? 13 : 14.5,
              lineHeight: 1.6,
              maxWidth: 520,
              marginBottom: isSmall ? 18 : 22,
            }}
          >
            Software Engineer with {getExperience("2023-01-01")} specializing in
            React Native and React, building consumer-facing mobile and web
            applications used in production. Skilled in architecting scalable
            component systems, optimizing rendering performance, integrating
            real-time features (WebSockets, push, live data), and shipping
            cross-platform apps end-to-end — from design handoff to App Store
            and Play Store release. Strong focus on Core Web Vitals,
            accessibility, and SEO for web platforms.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: isSmall ? 22 : 26,
            }}
          >
            <MagneticButton
              as={Link}
              to="/projects"
              className="btn btn-primary"
            >
              View Projects <span>→</span>
            </MagneticButton>
            {personal.resume && (
              <MagneticButton
                as="a"
                href={personal.resume}
                download
                className="btn btn-outline"
                aria-label="Download resume PDF"
                glow={false}
              >
                <FiDownload size={14} style={{ marginRight: 4 }} />
                {isSmall ? "Resume" : "Download Resume"}
              </MagneticButton>
            )}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isSmall
                ? "repeat(2, 1fr)"
                : "repeat(4, auto)",
              gap: isSmall ? "16px 24px" : "0 28px",
              width: isSmall ? "100%" : "fit-content",
              maxWidth: isSmall ? 320 : "none",
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
                    fontFamily: "var(--font-cinematic)",
                    fontSize: isSmall ? 26 : 26,
                    fontWeight: 400,
                    color: "var(--accent)",
                    letterSpacing: "0.02em",
                    textShadow: "0 0 14px rgba(59,130,246,0.35)",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone cluster — desktop only, raised above particle canvas */}
        {!isMobile && (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0,
              transform: "scale(1.08)",
              transformOrigin: "center",
              zIndex: 3,
              isolation: "isolate",
            }}
          >
            {/* Soft backdrop disc to lift phones off the particle field */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                width: 520,
                height: 520,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 35%, transparent 70%)",
                filter: "blur(8px)",
                zIndex: -1,
                pointerEvents: "none",
              }}
            />
            <Suspense
              fallback={
                <VisualFallback
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                          "radial-gradient(circle,rgba(59,130,246,0.18) 0%,transparent 70%)",
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
                    inset: -32,
                    borderRadius: 56,
                    background:
                      "radial-gradient(circle,rgba(59,130,246,0.32) 0%,rgba(59,130,246,0.08) 45%,transparent 75%)",
                    pointerEvents: "none",
                    filter: "blur(2px)",
                  }}
                />
                <PhoneMockup color="#3b82f6" />
              </Phone3D>
            </Suspense>
          </div>
        )}
      </div>

      {/* Scroll indicator — only on desktop, bottom-left to avoid phones */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: 24,
            left: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--text3)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <span>Scroll</span>
          <div
            style={{
              width: 1,
              height: 28,
              background: "linear-gradient(180deg, var(--accent), transparent)",
              animation: "scroll-bounce 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      )}
    </section>
  );
}
