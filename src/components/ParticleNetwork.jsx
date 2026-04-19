import { useRef, useEffect } from "react";
import * as THREE from "three";

const DESKTOP_PARTICLES = 80;
const MOBILE_PARTICLES = 40;
const DESKTOP_CONNECTION = 120;
const MOBILE_CONNECTION = 100;
const MOUSE_RADIUS = 150;

export default function ParticleNetwork() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
    const connectionDist = isMobile ? MOBILE_CONNECTION : DESKTOP_CONNECTION;

    // Setup
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, 1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
    );
    container.appendChild(renderer.domElement);

    // Pointer tracking (mouse + touch)
    const pointer = { x: -9999, y: -9999 };

    const updatePointer = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
    };

    const onMouseMove = (e) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    const resetPointer = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", resetPointer);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", resetPointer);

    // Particles
    const particles = [];
    const accentCyan = new THREE.Color(0x00e5ff);
    const accentPurple = new THREE.Color(0x7c4dff);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? accentCyan : accentPurple,
      });
    }

    // Point geometry
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    particles.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = p.color.r;
      colors[i * 3 + 1] = p.color.g;
      colors[i * 3 + 2] = p.color.b;
      sizes[i] = p.size;
    });

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    pointsGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const pointsMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * 2.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Lines
    const maxLines = particleCount * particleCount;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      vertexColors: true,
      opacity: 0.35,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Animate
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Pointer repulsion (mouse or touch)
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);

          if (d < connectionDist) {
            const alpha = 1 - d / connectionDist;
            const mixColor = p.color.clone().lerp(p2.color, 0.5);

            const idx = lineIndex * 6;
            linePositions[idx] = p.x;
            linePositions[idx + 1] = p.y;
            linePositions[idx + 2] = 0;
            linePositions[idx + 3] = p2.x;
            linePositions[idx + 4] = p2.y;
            linePositions[idx + 5] = 0;

            lineColors[idx] = mixColor.r * alpha;
            lineColors[idx + 1] = mixColor.g * alpha;
            lineColors[idx + 2] = mixColor.b * alpha;
            lineColors[idx + 3] = mixColor.r * alpha;
            lineColors[idx + 4] = mixColor.g * alpha;
            lineColors[idx + 5] = mixColor.b * alpha;

            lineIndex++;
          }
        }
      }

      // Zero out unused line segments
      for (let i = lineIndex * 6; i < linePositions.length; i++) {
        linePositions[i] = 0;
        lineColors[i] = 0;
      }

      pointsGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.right = width;
      camera.bottom = height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mouseleave", resetPointer);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", resetPointer);
      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
