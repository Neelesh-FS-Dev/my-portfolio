import { forwardRef } from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { presets, easing, type RevealPreset } from "./variants";

export interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  {
    preset = "fadeUp",
    delay = 0,
    duration,
    amount = 0.18,
    once = true,
    children,
    transition,
    ...rest
  },
  ref,
) {
  const reduce = useReducedMotion();
  const base = presets[preset];

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : base;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={
        transition ?? {
          duration: duration ?? 0.6,
          delay,
          ease: easing,
        }
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default Reveal;
