import type { Variants } from "framer-motion";

// Dynamic checks — called at runtime, not module load
const getPrefersReducedMotion = () =>
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const getIsMobile = () =>
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

// Text Variant motion — lighter on mobile
export const textVariant = (delay?: number): Variants => {
  const isMobile = getIsMobile();
  const reduced = getPrefersReducedMotion();

  return {
    hidden: {
      y: isMobile ? -10 : -20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: reduced ? 0.3 : isMobile ? 0.4 : 0.6,
        delay: delay,
        ease: "easeOut",
      },
    },
  };
};

// FadeIn motion — transform + opacity only, no spring
export const fadeIn = (
  direction: "left" | "right" | "up" | "down" | undefined,
  _type: "decay" | "spring" | "keyframes" | "tween" | "inertia" | undefined,
  delay: number,
  duration: number
): Variants => {
  const isMobile = getIsMobile();
  const reduced = getPrefersReducedMotion();
  const distance = isMobile ? 20 : 40;

  return {
    hidden: {
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: reduced ? 0.3 : isMobile ? Math.min(duration, 0.6) : duration,
        ease: "easeOut",
      },
    },
  };
};

// Zoom in motion
export const zoomIn = (delay: number, duration: number): Variants => {
  const reduced = getPrefersReducedMotion();

  return {
    hidden: {
      scale: 0.95,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: reduced ? 0.3 : duration,
        ease: "easeOut",
      },
    },
  };
};

// Slide in motion
export const slideIn = (
  direction: "left" | "right" | "up" | "down" | undefined,
  _type: "decay" | "spring" | "keyframes" | "tween" | "inertia" | undefined,
  delay: number,
  duration: number
): Variants => {
  const reduced = getPrefersReducedMotion();

  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        delay: delay,
        duration: reduced ? 0.3 : duration,
        ease: "easeOut",
      },
    },
  };
};

// Staggered container motion
export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
): Variants => {
  const isMobile = getIsMobile();
  const reduced = getPrefersReducedMotion();

  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced
          ? 0.05
          : isMobile
            ? 0.06
            : staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
