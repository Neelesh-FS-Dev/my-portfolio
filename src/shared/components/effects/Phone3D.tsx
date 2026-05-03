import { useRef, useEffect, memo } from "react";
import type { CSSProperties, ReactNode } from "react";

interface Phone3DProps {
  children: ReactNode;
  offsetX?: number;
  offsetY?: number;
  initialRotateZ?: number;
  floatDelay?: number;
  intensity?: number;
  style?: CSSProperties;
}

function Phone3D({
  children,
  offsetX = 0,
  offsetY = 0,
  initialRotateZ = 0,
  floatDelay = 0,
  intensity = 15,
  style,
}: Phone3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const mouse = { x: 0.5, y: 0.5 };
    const current = { rx: 0, ry: 0 };
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouse.x = t.clientX / window.innerWidth;
        mouse.y = t.clientY / window.innerHeight;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const animate = () => {
      const targetRy = (mouse.x - 0.5) * intensity;
      const targetRx = -(mouse.y - 0.5) * intensity;

      current.rx += (targetRx - current.rx) * 0.06;
      current.ry += (targetRy - current.ry) * 0.06;

      const t = Date.now() / 1000;
      const floatY = Math.sin(t * 0.8 + floatDelay) * 8;
      const floatRotate = Math.sin(t * 0.6 + floatDelay + 1) * 2;

      node.style.transform =
        `perspective(800px) ` +
        `translateX(${offsetX}px) ` +
        `translateY(${offsetY + floatY}px) ` +
        `rotateX(${current.rx}deg) ` +
        `rotateY(${current.ry}deg) ` +
        `rotateZ(${initialRotateZ + floatRotate}deg)`;

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(frame);
    };
  }, [intensity, offsetX, offsetY, initialRotateZ, floatDelay]);

  return (
    <div
      ref={wrapperRef}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default memo(Phone3D);
