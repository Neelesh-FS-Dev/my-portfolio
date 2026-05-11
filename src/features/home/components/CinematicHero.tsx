import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiChevronsDown, FiDownload, FiZap, FiAward } from "react-icons/fi";
import personal from "../../../shared/data/personal";
import { getExperience } from "../../../shared/utils/getExperience";
import BackgroundMeshGradient from "../../../shared/components/effects/BackgroundMeshGradient";

gsap.registerPlugin(ScrollTrigger);

/**
 * Adapted from a 21st.dev cinematic hero. Tailwind / shadcn primitives
 * stripped out; everything lives in the scoped <style> block below and
 * inline styles. Visual tokens are aliased to the project palette so the
 * component drops into the existing dark + single-blue-accent design.
 */
const INJECTED_STYLES = `
  /* Token aliases — map shadcn-style vars used by the original snippet to project tokens */
  .ch-root {
    --color-foreground: var(--text);
    --color-background: var(--bg);
    --color-muted-foreground: var(--text2);
    --color-accent: var(--accent);
    font-family: var(--font-display);
  }

  .gsap-reveal { visibility: hidden; }

  .ch-section-label {
    position: absolute;
    top: 88px;
    left: 24px;
    z-index: 60;
    pointer-events: none;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--text3);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ch-section-label::before {
    content: "";
    width: 32px;
    height: 1px;
    background: var(--text3);
    opacity: 0.6;
  }
  @media (min-width: 768px) {
    .ch-section-label { top: 96px; left: 48px; font-size: 12px; }
  }

  /* Environment Overlays */
  .ch-film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .ch-grid-bg {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.5;
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Skeuomorphic materials (kept verbatim from original) */
  .ch-text-3d-matte {
    color: var(--color-foreground);
    text-shadow:
      0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
      0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }
  .ch-text-silver {
    background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
      drop-shadow(0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }
  .ch-text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0 12px 24px rgba(0,0,0,0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.6));
  }

  .ch-premium-card {
    background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.2),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
    position: relative;
  }
  .ch-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .ch-iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }
  .ch-hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow:
      -2px 0 5px rgba(0,0,0,0.8),
      inset -1px 0 1px rgba(255,255,255,0.15),
      inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }
  .ch-screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }
  .ch-widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow:
      0 10px 20px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.05),
      inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.03);
  }
  .ch-floating-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 25px 50px -12px rgba(0,0,0,0.8),
      inset 0 1px 1px rgba(255,255,255,0.2),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* CTA buttons — aligned to project theme (.btn-primary / .btn-outline) */
  .ch-btn-light, .ch-btn-dark {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 14px 26px;
    border-radius: 100px;
    cursor: pointer;
    font-family: var(--font-display);
  }
  .ch-btn-light {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-3) 50%, var(--accent-2) 100%);
    color: #04070a;
    border: 1px solid transparent;
    box-shadow: 0 0 0 1px rgba(59,130,246,0.2);
  }
  .ch-btn-light:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(59,130,246,0.35), 0 0 80px rgba(59,130,246,0.2);
  }
  .ch-btn-light:active { transform: translateY(0); }

  .ch-btn-dark {
    background: rgba(59,130,246,0.03);
    color: var(--text);
    border: 1px solid rgba(59,130,246,0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .ch-btn-dark:hover {
    border-color: rgba(59,130,246,0.55);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(59,130,246,0.2);
  }
  .ch-btn-dark:active { transform: translateY(0); }

  .ch-progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }

  /* Typography */
  .ch-tagline {
    font-family: var(--font-cinematic);
    font-weight: 400;
    letter-spacing: 0.005em;
    line-height: 0.92;
    text-transform: uppercase;
    margin: 0;
    font-size: clamp(56px, 11vw, 152px);
  }
  .ch-tagline-2 { letter-spacing: -0.005em; font-weight: 400; }

  .ch-cta-heading {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.025em;
    margin: 0 0 20px;
    font-size: clamp(34px, 5.4vw, 72px);
    line-height: 1.05;
  }
  .ch-cta-description {
    font-family: var(--font-body);
    font-size: clamp(15px, 1.4vw, 19px);
    line-height: 1.6;
    color: var(--color-muted-foreground);
    margin: 0 0 44px;
    max-width: 560px;
    font-weight: 300;
  }

  .ch-brand-name {
    font-family: var(--font-cinematic);
    font-weight: 400;
    letter-spacing: 0.005em;
    line-height: 0.86;
    text-transform: uppercase;
    margin: 0;
    font-size: clamp(48px, 6.2vw, 92px);
    max-width: 100%;
    word-break: break-word;
    overflow-wrap: anywhere;
    hyphens: none;
  }

  .ch-card-heading {
    font-family: var(--font-display);
    color: #FFFFFF;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
    font-size: clamp(22px, 2.6vw, 40px);
  }
  .ch-card-description {
    color: rgba(219, 234, 254, 0.7);
    font-family: var(--font-body);
    font-weight: 400;
    line-height: 1.65;
    margin: 16px 0 0;
    font-size: clamp(13px, 1.05vw, 18px);
    max-width: 360px;
  }

  /* Layout — replaces Tailwind responsive grid */
  .ch-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    z-index: 10;
  }
  @media (min-width: 1024px) {
    .ch-card-inner {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 32px;
      align-items: center;
      padding: 0 48px;
    }
  }

  .ch-col-left, .ch-col-right { width: 100%; }
  .ch-col-left { order: 3; text-align: center; padding: 0 16px; }
  .ch-col-right { order: 1; display: flex; justify-content: center; }
  .ch-col-mockup { order: 2; position: relative; width: 100%; height: 380px; display: flex; align-items: center; justify-content: center; perspective: 1000px; }
  @media (min-width: 1024px) {
    .ch-col-left { order: 1; text-align: left; padding: 0; }
    .ch-col-right { order: 3; justify-content: flex-end; }
    .ch-col-mockup { order: 2; height: 600px; }
  }

  .ch-mockup-scaler {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.65);
  }
  @media (min-width: 768px) { .ch-mockup-scaler { transform: scale(0.85); } }
  @media (min-width: 1024px) { .ch-mockup-scaler { transform: scale(1); } }

  /* Hide card description on mobile (kept from original behavior) */
  .ch-card-description-mobile-hide { display: none; }
  @media (min-width: 768px) { .ch-card-description-mobile-hide { display: block; } }

  /* Floating badge placements — kept as named classes so responsive offsets
     are defined once and shared between both badge instances. */
  .ch-fb-tl { top: 24px; left: -15px; padding: 12px; border-radius: 14px; gap: 12px; }
  .ch-fb-br { bottom: 48px; right: -15px; padding: 12px; border-radius: 14px; gap: 12px; }
  @media (min-width: 1024px) {
    .ch-fb-tl { top: 48px; left: -80px; padding: 16px; border-radius: 18px; gap: 16px; }
    .ch-fb-br { bottom: 80px; right: -80px; padding: 16px; border-radius: 18px; gap: 16px; }
  }

  /* Skip intro affordance */
  .ch-skip-intro {
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text2);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    cursor: pointer;
    transition:
      color 0.25s ease,
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .ch-skip-intro:hover {
    color: var(--text);
    border-color: rgba(59, 130, 246, 0.4);
    background: rgba(59, 130, 246, 0.08);
    transform: translateY(-2px);
  }
  .ch-skip-intro:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
  @media (max-width: 480px) {
    .ch-skip-intro { bottom: 16px; right: 16px; padding: 8px 12px; font-size: 10px; }
  }
`;

export interface CinematicHeroProps {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: ReactNode;
  metricValue?: number;
  metricSuffix?: string;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  /** Total pinned scroll distance in pixels. Lower = snappier intro. */
  scrollLength?: number;
  /** Show the bottom-right Skip Intro affordance. */
  showSkipIntro?: boolean;
  /** Label on the Skip Intro button. */
  skipIntroLabel?: string;
  className?: string;
}

const firstName = personal.name.split(" ")[0] ?? personal.name;

const DEFAULT_DESCRIPTION = (
  <>
    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{personal.name}</span>{" "}
    builds production-grade React Native and React apps — shipped to{" "}
    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
      {personal.stats.users}
    </span>{" "}
    users across the App Store, Play Store, and the web.
  </>
);

export default function CinematicHero({
  brandName = firstName.toUpperCase(),
  tagline1 = "Built for mobile,",
  tagline2 = "engineered to ship.",
  cardHeading = "Production code, real users.",
  cardDescription = DEFAULT_DESCRIPTION,
  metricValue = 20,
  metricSuffix = "K+",
  metricLabel = "Users Served",
  ctaHeading = "Let's build something that ships.",
  ctaDescription = `${personal.availability}. Reply within 24 hours — ${getExperience(
    "2023-01-01",
  )} of mobile + web experience, end-to-end ownership from design handoff to store release.`,
  scrollLength = 2200,
  showSkipIntro = true,
  skipIntroLabel = "Skip intro",
  className = "",
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const requestRef = useRef<number>(0);

  const handleSkipIntro = useCallback(() => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    // Push past the pin's end so the document continues normally.
    // window.scrollTo cooperates with Lenis (Lenis intercepts and animates).
    window.scrollTo({ top: st.end + 24, behavior: "smooth" });
  }, []);

  // Mouse-driven sheen on the card + parallax tilt on the iPhone mockup.
  // Uses requestAnimationFrame so we coalesce mousemove events to one paint.
  useEffect(() => {
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fineHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, {
          rotationY: xVal * 12,
          rotationX: -yVal * 12,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Cinematic scroll timeline (pinned).
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Reduced-motion fallback: just reveal everything in place, no pin.
      if (reduce) {
        gsap.set(
          [
            ".text-track",
            ".text-days",
            ".main-card",
            ".card-left-text",
            ".card-right-text",
            ".mockup-scroll-wrapper",
            ".floating-badge",
            ".phone-widget",
          ],
          { autoAlpha: 1, clipPath: "none", clearProps: "transform" },
        );
        gsap.set(".cta-wrapper", { autoAlpha: 0 });
        return;
      }

      const isMobile = window.innerWidth < 768;

      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-days", {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(
        [
          ".card-left-text",
          ".card-right-text",
          ".mockup-scroll-wrapper",
          ".floating-badge",
          ".phone-widget",
        ],
        { autoAlpha: 0 },
      );
      gsap.set(".cta-wrapper", {
        autoAlpha: 0,
        scale: 0.8,
        filter: "blur(30px)",
      });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", {
          duration: 1.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-days",
          {
            duration: 1.4,
            clipPath: "inset(0 0% 0 0)",
            ease: "power4.inOut",
          },
          "-=1.0",
        );

      // Shorter pin on touch / small screens — long pinned timelines feel
      // worse on 60Hz mobile and eat scroll budget users want elsewhere.
      const effectiveScroll = isMobile
        ? Math.round(scrollLength * 0.55)
        : scrollLength;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${effectiveScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Fade the skip button out as the user nears the CTA reveal.
            if (!skipBtnRef.current) return;
            const opacity = self.progress < 0.7 ? 1 - self.progress * 0.3 : 0;
            skipBtnRef.current.style.opacity = String(opacity);
            skipBtnRef.current.style.pointerEvents =
              opacity < 0.1 ? "none" : "auto";
          },
        },
      });
      scrollTriggerRef.current = scrollTl.scrollTrigger as ScrollTrigger;

      scrollTl
        .to(
          [".hero-text-wrapper", ".ch-grid-bg"],
          {
            scale: 1.15,
            filter: "blur(20px)",
            opacity: 0.2,
            ease: "power2.inOut",
            duration: 2,
          },
          0,
        )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        .fromTo(
          ".mockup-scroll-wrapper",
          {
            y: 300,
            z: -500,
            rotationX: 50,
            rotationY: -30,
            autoAlpha: 0,
            scale: 0.6,
          },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "expo.out",
            duration: 2.5,
          },
          "-=0.8",
        )
        .fromTo(
          ".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
            duration: 1.5,
          },
          "-=1.5",
        )
        .to(
          ".ch-progress-ring",
          { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" },
          "-=1.2",
        )
        .to(
          ".counter-val",
          {
            innerHTML: metricValue,
            snap: { innerHTML: 1 },
            duration: 2,
            ease: "expo.out",
          },
          "-=2.0",
        )
        .fromTo(
          ".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: "back.out(1.5)",
            duration: 1.5,
            stagger: 0.2,
          },
          "-=2.0",
        )
        .fromTo(
          ".card-left-text",
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 },
          "-=1.5",
        )
        .fromTo(
          ".card-right-text",
          { x: 50, autoAlpha: 0, scale: 0.8 },
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "expo.out",
            duration: 1.5,
          },
          "<",
        )
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to(
          [
            ".mockup-scroll-wrapper",
            ".floating-badge",
            ".card-left-text",
            ".card-right-text",
          ],
          {
            scale: 0.9,
            y: -40,
            z: -200,
            autoAlpha: 0,
            ease: "power3.in",
            duration: 1.2,
            stagger: 0.05,
          },
        )
        .to(
          ".main-card",
          {
            width: isMobile ? "92vw" : "85vw",
            height: isMobile ? "92vh" : "85vh",
            borderRadius: isMobile ? "32px" : "40px",
            ease: "expo.inOut",
            duration: 1.8,
          },
          "pullback",
        )
        .to(
          ".cta-wrapper",
          {
            scale: 1,
            filter: "blur(0px)",
            ease: "expo.inOut",
            duration: 1.8,
          },
          "pullback",
        )
        .to(".main-card", {
          y: -window.innerHeight - 300,
          ease: "power3.in",
          duration: 1.5,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue, scrollLength]);

  const wrapperStyle: CSSProperties = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg)",
    color: "var(--text)",
    perspective: "1500px",
  };

  return (
    <div
      ref={containerRef}
      className={`ch-root ${className}`.trim()}
      style={wrapperStyle}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <BackgroundMeshGradient />
      <div className="ch-film-grain" aria-hidden="true" />
      <div className="ch-grid-bg" aria-hidden="true" />
      <div className="ch-section-label" aria-hidden="true">00 / Intro</div>

      {showSkipIntro && (
        <button
          ref={skipBtnRef}
          type="button"
          onClick={handleSkipIntro}
          className="ch-skip-intro"
          aria-label="Skip intro animation and jump to the rest of the page"
        >
          <span>{skipIntroLabel}</span>
          <FiChevronsDown size={14} aria-hidden="true" />
        </button>
      )}

      {/* Hero text taglines */}
      <div
        className="hero-text-wrapper"
        style={{
          position: "absolute",
          zIndex: 10,
          width: "100vw",
          padding: "0 16px",
          textAlign: "center",
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        <h1 className="text-track gsap-reveal ch-text-3d-matte ch-tagline">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal ch-text-silver ch-tagline ch-tagline-2">
          {tagline2}
        </h1>
      </div>

      {/* CTA layer (revealed at the end of the scroll timeline) */}
      <div
        className="cta-wrapper gsap-reveal"
        style={{
          position: "absolute",
          zIndex: 10,
          width: "100vw",
          padding: "0 16px",
          textAlign: "center",
          pointerEvents: "auto",
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 className="ch-cta-heading ch-text-silver">{ctaHeading}</h2>
        <p className="ch-cta-description">{ctaDescription}</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <Link to="/projects" className="ch-btn-light" aria-label="View projects">
            <FiArrowRight size={22} aria-hidden="true" />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(4,7,10,0.65)",
                  marginBottom: -2,
                }}
              >
                Explore the work
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                View Projects
              </div>
            </div>
          </Link>
          {personal.resume && (
            <a
              href={personal.resume}
              download
              className="ch-btn-dark"
              aria-label="Download resume PDF"
            >
              <FiDownload size={20} aria-hidden="true" />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: -2,
                  }}
                >
                  PDF · 3 pages
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Download Resume
                </div>
              </div>
            </a>
          )}
        </div>
      </div>

      {/* The premium card — slides up, expands, then pulls back */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          perspective: "1500px",
        }}
      >
        <div
          ref={mainCardRef}
          className="main-card ch-premium-card gsap-reveal"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            width: "92vw",
            height: "78vh",
            borderRadius: 32,
          }}
        >
          <div className="ch-card-sheen" aria-hidden="true" />

          <div className="ch-card-inner">
            {/* TOP (mobile) / RIGHT (desktop): Brand name */}
            <div className="card-right-text gsap-reveal ch-col-right">
              <h2 className="ch-brand-name ch-text-card-silver">{brandName}</h2>
            </div>

            {/* MIDDLE (mobile) / CENTER (desktop): iPhone mockup */}
            <div className="mockup-scroll-wrapper ch-col-mockup">
              <div className="ch-mockup-scaler">
                <div
                  ref={mockupRef}
                  className="ch-iphone-bezel"
                  style={{
                    position: "relative",
                    width: 280,
                    height: 580,
                    borderRadius: 48,
                    display: "flex",
                    flexDirection: "column",
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Hardware buttons */}
                  <div
                    className="ch-hardware-btn"
                    style={{
                      position: "absolute",
                      top: 120,
                      left: -3,
                      width: 3,
                      height: 25,
                      borderRadius: "4px 0 0 4px",
                    }}
                    aria-hidden
                  />
                  <div
                    className="ch-hardware-btn"
                    style={{
                      position: "absolute",
                      top: 160,
                      left: -3,
                      width: 3,
                      height: 45,
                      borderRadius: "4px 0 0 4px",
                    }}
                    aria-hidden
                  />
                  <div
                    className="ch-hardware-btn"
                    style={{
                      position: "absolute",
                      top: 220,
                      left: -3,
                      width: 3,
                      height: 45,
                      borderRadius: "4px 0 0 4px",
                    }}
                    aria-hidden
                  />
                  <div
                    className="ch-hardware-btn"
                    style={{
                      position: "absolute",
                      top: 170,
                      right: -3,
                      width: 3,
                      height: 70,
                      borderRadius: "0 4px 4px 0",
                      transform: "scaleX(-1)",
                    }}
                    aria-hidden
                  />

                  {/* Inner screen */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 7,
                      background: "#050914",
                      borderRadius: 40,
                      overflow: "hidden",
                      boxShadow: "inset 0 0 15px rgba(0,0,0,1)",
                      color: "#FFFFFF",
                      zIndex: 10,
                    }}
                  >
                    <div
                      className="ch-screen-glare"
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 40,
                        pointerEvents: "none",
                      }}
                      aria-hidden
                    />

                    {/* Dynamic island */}
                    <div
                      style={{
                        position: "absolute",
                        top: 5,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 100,
                        height: 28,
                        background: "#000",
                        borderRadius: 9999,
                        zIndex: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        padding: "0 12px",
                        boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#22c55e",
                          boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                          animation: "pulse 2s infinite",
                        }}
                      />
                    </div>

                    {/* App content */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        paddingTop: 48,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 32,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Header row */}
                      <div
                        className="phone-widget"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 32,
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 10,
                              color: "#a3a3a3",
                              textTransform: "uppercase",
                              letterSpacing: "0.18em",
                              fontWeight: 700,
                              marginBottom: 4,
                            }}
                          >
                            Now
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: 20,
                              fontWeight: 700,
                              letterSpacing: "-0.02em",
                              color: "#FFFFFF",
                            }}
                          >
                            Shipping
                          </span>
                        </div>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.05)",
                            color: "#e5e5e5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                          }}
                        >
                          NY
                        </div>
                      </div>

                      {/* Big counter ring */}
                      <div
                        className="phone-widget"
                        style={{
                          position: "relative",
                          width: 176,
                          height: 176,
                          margin: "0 auto 32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.8))",
                        }}
                      >
                        <svg
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                          }}
                          aria-hidden
                        >
                          <circle
                            cx="88"
                            cy="88"
                            r="64"
                            fill="none"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="12"
                          />
                          <circle
                            className="ch-progress-ring"
                            cx="88"
                            cy="88"
                            r="64"
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth="12"
                          />
                        </svg>
                        <div
                          style={{
                            position: "relative",
                            zIndex: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 2,
                            }}
                          >
                            <span
                              className="counter-val"
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 36,
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                color: "#FFFFFF",
                                lineHeight: 1,
                              }}
                            >
                              0
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#FFFFFF",
                                opacity: 0.85,
                              }}
                            >
                              {metricSuffix}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 8,
                              color: "rgba(191,219,254,0.5)",
                              textTransform: "uppercase",
                              letterSpacing: "0.16em",
                              fontWeight: 700,
                              marginTop: 4,
                            }}
                          >
                            {metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Two depth widgets — purely decorative */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        <PhoneWidgetRow
                          accentRgb="59,130,246"
                          icon={
                            <FiZap
                              size={16}
                              style={{
                                color: "#60a5fa",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                              }}
                              aria-hidden
                            />
                          }
                        />
                        <PhoneWidgetRow
                          accentRgb="59,130,246"
                          icon={
                            <FiAward
                              size={16}
                              style={{
                                color: "#60a5fa",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                              }}
                              aria-hidden
                            />
                          }
                        />
                      </div>

                      {/* Home indicator */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 120,
                          height: 4,
                          background: "rgba(255,255,255,0.2)",
                          borderRadius: 9999,
                          boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating glass badges */}
                <FloatingBadge
                  position="top-left"
                  icon={<FiZap size={18} aria-hidden style={{ color: "#60a5fa" }} />}
                  title="Live in Production"
                  subtitle={`${personal.stats.mobileApps} apps shipped`}
                />
                <FloatingBadge
                  position="bottom-right"
                  icon={<FiAward size={18} aria-hidden style={{ color: "#818cf8" }} />}
                  title={`${personal.stats.users} Users`}
                  subtitle="Mobile + Web"
                />
              </div>
            </div>

            {/* BOTTOM (mobile) / LEFT (desktop): Card heading + description */}
            <div className="card-left-text gsap-reveal ch-col-left">
              <h3 className="ch-card-heading">{cardHeading}</h3>
              <p className="ch-card-description ch-card-description-mobile-hide">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PhoneWidgetRowProps {
  accentRgb: string;
  icon: ReactNode;
}

function PhoneWidgetRow({ accentRgb, icon }: PhoneWidgetRowProps) {
  return (
    <div
      className="phone-widget ch-widget-depth"
      style={{
        borderRadius: 16,
        padding: 12,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: `linear-gradient(135deg, rgba(${accentRgb},0.2) 0%, rgba(${accentRgb},0.04) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
          border: `1px solid rgba(${accentRgb},0.2)`,
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: 8,
            width: 80,
            background: "#d4d4d4",
            borderRadius: 9999,
            marginBottom: 8,
            boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2)",
          }}
        />
        <div
          style={{
            height: 6,
            width: 56,
            background: "#525252",
            borderRadius: 9999,
            boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}

interface FloatingBadgeProps {
  position: "top-left" | "bottom-right";
  icon: ReactNode;
  title: string;
  subtitle: string;
}

function FloatingBadge({ position, icon, title, subtitle }: FloatingBadgeProps) {
  const placementClass = position === "top-left" ? "ch-fb-tl" : "ch-fb-br";

  return (
    <div
      className={`floating-badge ch-floating-badge ${placementClass}`}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, rgba(59,130,246,0.2) 0%, rgba(30,58,138,0.1) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(96,165,250,0.3)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: "rgba(191,219,254,0.55)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            margin: "2px 0 0",
            letterSpacing: "0.02em",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
