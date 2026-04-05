import { useRef, useEffect, useState } from "react";

export default function Phone3D({
  children,
  offsetX = 0,
  offsetY = 0,
  initialRotateZ = 0,
  floatDelay = 0,
  intensity = 15,
  style = {},
}) {
  const wrapperRef = useRef(null);
  const [transform, setTransform] = useState("");
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const frame = useRef(null);
  const current = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };

    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) {
        mouse.current.x = t.clientX / window.innerWidth;
        mouse.current.y = t.clientY / window.innerHeight;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    // Animation loop for smooth interpolation
    const animate = () => {
      const targetRy = (mouse.current.x - 0.5) * intensity;
      const targetRx = -(mouse.current.y - 0.5) * intensity;

      current.current.rx += (targetRx - current.current.rx) * 0.06;
      current.current.ry += (targetRy - current.current.ry) * 0.06;

      const t = Date.now() / 1000;
      const floatY = Math.sin(t * 0.8 + floatDelay) * 8;
      const floatRotate = Math.sin(t * 0.6 + floatDelay + 1) * 2;

      setTransform(
        `perspective(800px) ` +
          `translateX(${offsetX}px) ` +
          `translateY(${offsetY + floatY}px) ` +
          `rotateX(${current.current.rx}deg) ` +
          `rotateY(${current.current.ry}deg) ` +
          `rotateZ(${initialRotateZ + floatRotate}deg)`,
      );

      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(frame.current);
    };
  }, [intensity, offsetX, offsetY, initialRotateZ, floatDelay]);

  return (
    <div
      ref={wrapperRef}
      style={{
        transform,
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
