import { memo } from "react";
import type { ReactNode } from "react";

export interface AnimatedFieldProps {
  label?: string;
  children: ReactNode;
  idx: number;
  visible: boolean;
}

function AnimatedField({ children, idx, visible }: AnimatedFieldProps) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s ease ${0.1 + idx * 0.07}s, transform 0.5s ease ${0.1 + idx * 0.07}s`,
      }}
    >
      {children}
    </div>
  );
}

export default memo(AnimatedField);
