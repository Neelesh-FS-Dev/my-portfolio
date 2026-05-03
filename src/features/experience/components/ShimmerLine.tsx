import { useReveal } from "../../hooks/useReveal";

export default function ShimmerLine() {
  const [ref, visible] = useReveal(0.3);
  return (
    <div
      ref={ref}
      style={{
        height: 1,
        background:
          "linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition:
          "opacity 0.8s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
        marginBottom: 32,
      }}
    />
  );
}
