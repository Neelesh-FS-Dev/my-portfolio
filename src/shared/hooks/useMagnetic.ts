import { useCallback, useRef } from "react";
import type { MouseEvent } from "react";

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  rotateXIntensity = 14,
  rotateYIntensity = 10,
) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * rotateXIntensity;
      const y = ((e.clientY - top) / height - 0.5) * rotateYIntensity;
      el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(4px)`;
    },
    [rotateXIntensity, rotateYIntensity],
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
