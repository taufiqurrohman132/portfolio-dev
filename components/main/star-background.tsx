"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import type { Points as PointsType } from "three";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

// Particle count: disabled on mobile, 600 for desktop (reduced from 1200)
const getParticleCount = () => (isMobile() ? 0 : 600);

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);

  // Memoize sphere to avoid recreation on re-renders
  const sphere = useMemo(() => {
    const count = getParticleCount();
    if (count === 0) return new Float32Array(0);
    return random.inSphere(new Float32Array(count * 3), { radius: 1.2 });
  }, []);

  // Accumulate rotation in refs to avoid state updates
  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((_state, delta) => {
    if (!ref.current) return;
    // Limit delta to prevent frame drops / huge jumps on tab switch
    const d = Math.min(delta, 0.05); // cap lower for smoother mobile
    rotationRef.current.x -= d / 10;
    rotationRef.current.y -= d / 15;
    ref.current.rotation.x = rotationRef.current.x;
    ref.current.rotation.y = rotationRef.current.y;
  });

  if (sphere.length === 0) return null;

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
// Completely disabled on mobile for performance
export const StarsCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobile, setMobile] = useState(true); // default true = hidden until checked
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable entirely on mobile
    if (isMobile()) return;
    setMobile(false);

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

  // Mobile: render nothing (no canvas at all)
  if (mobile) return null;

  return (
    <div ref={containerRef} className="w-full h-auto fixed inset-0 -z-10">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={Math.min(
            typeof window !== "undefined" ? window.devicePixelRatio : 1,
            1.5 // cap DPR to 1.5 max
          )}
          gl={{ antialias: false, alpha: false }}
          style={{ pointerEvents: "none" }}
        >
          <Suspense fallback={null}>
            <StarBackground />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

