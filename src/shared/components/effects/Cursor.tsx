import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-magnetic]';

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fineHover.matches || reduceMotion.matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    const fxTo = gsap.quickTo(follower, "x", {
      duration: 0.55,
      ease: "power3",
    });
    const fyTo = gsap.quickTo(follower, "y", {
      duration: 0.55,
      ease: "power3",
    });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      fxTo(e.clientX);
      fyTo(e.clientY);
    };

    // Event delegation: a single pair of listeners on the document.
    // Avoids MutationObserver scans and per-element subscriptions.
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        cursor.classList.add("is-hover");
        follower.classList.add("is-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const from = e.target as Element | null;
      const to = e.relatedTarget as Element | null;
      if (
        from &&
        from.closest &&
        from.closest(INTERACTIVE_SELECTOR) &&
        !(to && to.closest && to.closest(INTERACTIVE_SELECTOR))
      ) {
        cursor.classList.remove("is-hover");
        follower.classList.remove("is-hover");
      }
    };

    const onLeaveDoc = () => {
      gsap.to([cursor, follower], { autoAlpha: 0, duration: 0.2 });
    };
    const onEnterDoc = () => {
      gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}

export default memo(Cursor);
