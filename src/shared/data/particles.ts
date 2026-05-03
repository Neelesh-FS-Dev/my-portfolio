export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  dur: number;
}

export function generateParticles(count = 12): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 55 + Math.sin(i * 137.5) * 38,
    y: 15 + Math.cos(i * 97.3) * 70,
    size: 1.5 + (i % 3) * 1.2,
    delay: (i * 0.35) % 3,
    dur: 3 + (i % 4) * 0.8,
  }));
}
