"use client";

import { useEffect, useRef, useState } from "react";
import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pause video when offscreen to save GPU
  useEffect(() => {
    if (isMobile) return; // No video on mobile
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="relative flex flex-col h-full w-full">
      {/* Desktop: video background | Mobile: lightweight gradient */}
      {!isMobile ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20 gpu-layer"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
        </video>
      ) : (
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#0a0a1a] via-[#030014] to-[#030014]" />
      )}

      <HeroContent isMobile={isMobile} />
    </div>
  );
};
