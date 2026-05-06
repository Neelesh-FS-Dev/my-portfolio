import {
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";
import { gsap } from "gsap";

type MagneticButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  strength?: number;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "style" | "className">;

export default function MagneticButton<T extends ElementType = "button">({
  as,
  children,
  strength = 0.35,
  glow = true,
  className,
  style,
  ...rest
}: MagneticButtonProps<T>) {
  const Component = (as || "button") as ElementType;
  const wrapRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (reduceMotion || !fineHover) return;

    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.5, ease: "power3" });
    const ixTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3" });
    const iyTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo(dx * strength * 0.5);
      iyTo(dy * strength * 0.5);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      ixTo(0);
      iyTo(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <Component
      ref={wrapRef as never}
      data-magnetic
      className={className}
      style={{
        display: "inline-flex",
        willChange: "transform",
        boxShadow: glow ? "0 0 40px rgba(0,229,255,0.18)" : undefined,
        ...style,
      }}
      {...rest}
    >
      <span
        ref={innerRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        {children}
      </span>
    </Component>
  );
}
