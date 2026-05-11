import { memo, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export interface CounterProps {
  value: string | number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(String(value));
    if (isNaN(num)) return;
    let start: number | null = null;
    let frame = 0;
    const duration = 900;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * num));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default memo(Counter);
