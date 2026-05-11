import type { Variants, Transition } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export const easing = ease;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const presets = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideRight,
  slideLeft,
  popIn,
} as const;

export type RevealPreset = keyof typeof presets;

export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const hoverLift: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 26,
  mass: 0.6,
};

export const hoverLiftTarget = { y: -4 } as const;

export const hoverGrowTarget = { scale: 1.04 } as const;

export const tapTarget = { scale: 0.97 } as const;
