import { memo } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../../shared/components/motion";

export interface AnimatedFieldProps {
  label?: string;
  children: ReactNode;
}

function AnimatedField({ children }: AnimatedFieldProps) {
  return (
    <motion.div className="contact-field" variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export default memo(AnimatedField);
