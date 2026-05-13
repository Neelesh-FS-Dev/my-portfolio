import { motion } from "framer-motion";
import { useIsSmall } from "../../../shared/hooks/useMediaQuery";
import {
  RevealStagger,
  fadeUp,
  popIn,
  hoverLift,
  tapTarget,
} from "../../../shared/components/motion";

export default function BlogsCTA() {
  const isSmall = useIsSmall();

  return (
    <section style={{ padding: "0 0 100px", textAlign: "center" }}>
      <RevealStagger
        className="container"
        stagger={0.1}
        delayChildren={0}
        amount={0.25}
      >
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--text3)",
            marginBottom: 10,
          }}
        >
          More articles coming soon
        </motion.p>
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isSmall ? 22 : 28,
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          Follow along
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{
            color: "var(--text2)",
            marginBottom: 24,
            fontSize: isSmall ? 14 : 15,
          }}
        >
          Follow my GitHub for code experiments, open-source work, and updates.
        </motion.p>
        <motion.div
          variants={popIn}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.a
            href="https://github.com/Neelesh-FS-Dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={tapTarget}
            transition={hoverLift}
            style={{ display: "inline-flex", willChange: "transform" }}
          >
            Follow on GitHub ↗
          </motion.a>
          <motion.a
            href="/feed.xml"
            className="btn btn-outline"
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={tapTarget}
            transition={hoverLift}
            style={{ display: "inline-flex", willChange: "transform" }}
          >
            RSS Feed
          </motion.a>
          <motion.a
            href="/feed.json"
            className="btn btn-outline"
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={tapTarget}
            transition={hoverLift}
            style={{ display: "inline-flex", willChange: "transform" }}
          >
            JSON Feed
          </motion.a>
        </motion.div>
      </RevealStagger>
    </section>
  );
}
