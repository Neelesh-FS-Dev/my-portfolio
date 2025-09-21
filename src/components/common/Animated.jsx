import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const AnimatedSection = ({ children, id, className = "" }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 50 },
      }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
