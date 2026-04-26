"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useEffect } from "react";
import type { Points as PointsType } from "three";

// Particle count optimized: 1200 for desktop, 600 for mobile
const getParticleCount = () =>
  typeof window !== "undefined" && window.innerWidth < 768 ? 600 : 1200;

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(getParticleCount() * 3), { radius: 1.2 })
  );

  // Accumulate rotation in refs to avoid state updates
  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((_state, delta) => {
    if (!ref.current) return;
    // Limit delta to prevent frame drops / huge jumps on tab switch
    const d = Math.min(delta, 0.1);
    rotationRef.current.x -= d / 10;
    rotationRef.current.y -= d / 15;
    ref.current.rotation.x = rotationRef.current.x;
    ref.current.rotation.y = rotationRef.current.y;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Visibility-aware wrapper that unmounts canvas when off-screen
export const StarsCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-auto fixed inset-0 -z-10">
      {isVisible && (
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarBackground />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

