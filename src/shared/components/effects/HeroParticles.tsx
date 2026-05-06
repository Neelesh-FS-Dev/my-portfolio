import { useMemo, useRef, memo, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FieldProps {
  count: number;
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}

// Deterministic PRNG — keeps useMemo pure / idempotent across StrictMode double-invokes.
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count, mouseRef }: FieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const bright = new THREE.Color("#cfd6e0");
    const mid = new THREE.Color("#7a8492");
    const dim = new THREE.Color("#3e4654");
    const rand = mulberry32(0xc0ffee ^ count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 22;
      positions[i * 3 + 1] = (rand() - 0.5) * 14;
      positions[i * 3 + 2] = (rand() - 0.5) * 12;

      const r = rand();
      const c = r < 0.2 ? bright : r < 0.65 ? mid : dim;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = rand() * 1.0 + 0.3;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    // useFrame runs outside render — safe to read the ref here.
    const mouse = mouseRef.current;
    points.rotation.y += delta * 0.04;
    points.rotation.x = THREE.MathUtils.lerp(
      points.rotation.x,
      mouse.y * 0.18,
      0.04,
    );
    points.rotation.z = THREE.MathUtils.lerp(
      points.rotation.z,
      mouse.x * 0.06,
      0.04,
    );

    // drift z-positions for slow shimmer (uniform-driven via material)
    const mat = points.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float uTime;
          void main() {
            vColor = color;
            vec3 p = position;
            // subtle floaty drift
            p.x += sin(uTime * 0.4 + position.y * 1.7) * 0.05;
            p.y += cos(uTime * 0.35 + position.x * 1.3) * 0.05;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            // depth-based alpha so far stars are dimmer
            vAlpha = clamp(1.0 - (-mv.z) * 0.06, 0.15, 1.0);
            gl_PointSize = size * (60.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float core = smoothstep(0.5, 0.0, d);
            float halo = smoothstep(0.5, 0.2, d) * 0.35;
            float a = (core * 0.55 + halo) * vAlpha;
            gl_FragColor = vec4(vColor, a);
          }
        `}
      />
    </points>
  );
}

interface HeroParticlesProps {
  count?: number;
  className?: string;
}

function HeroParticlesInner({ count = 1400 }: { count: number }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 7], fov: 70 }}
      onPointerMove={(e) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        mouse.current.x = (e.clientX / w) * 2 - 1;
        mouse.current.y = -((e.clientY / h) * 2 - 1);
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ParticleField count={count} mouseRef={mouse} />
    </Canvas>
  );
}

function HeroParticles({ count, className }: HeroParticlesProps) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) return null;

  // Smaller count, perf-rule compliant (< 2000)
  const finalCount = Math.min(count ?? 700, 1600);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    >
      <HeroParticlesInner count={finalCount} />
    </div>
  );
}

export default memo(HeroParticles);
