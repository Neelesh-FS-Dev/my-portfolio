import { forwardRef } from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { staggerContainer } from "./variants";

export interface RevealStaggerProps
  extends Omit<HTMLMotionProps<"div">, "variants"> {
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
}

const RevealStagger = forwardRef<HTMLDivElement, RevealStaggerProps>(
  function RevealStagger(
    {
      stagger = 0.08,
      delayChildren = 0,
      amount = 0.15,
      once = true,
      children,
      ...rest
    },
    ref,
  ) {
    const reduce = useReducedMotion();
    const variants = reduce
      ? { hidden: {}, visible: {} }
      : staggerContainer(stagger, delayChildren);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

export default RevealStagger;
