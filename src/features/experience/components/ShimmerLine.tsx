import { motion } from "framer-motion";

export default function ShimmerLine() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeOut" },
        scaleX: { duration: 1, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        height: 1,
        background:
          "linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)",
        transformOrigin: "left",
        marginBottom: 32,
      }}
    />
  );
}
