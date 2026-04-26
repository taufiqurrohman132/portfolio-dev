import type { Variants } from "framer-motion";

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

// Text Variant motion - using tween for smoother performance
export const textVariant = (delay?: number): Variants => {
  return {
    hidden: {
      y: -30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: prefersReducedMotion ? 0.3 : 0.8,
        delay: delay,
        ease: "easeOut",
      },
    },
  };
};

// FadeIn motion - defaults to tween for better performance
export const fadeIn = (
  direction: "left" | "right" | "up" | "down" | undefined,
  type: "decay" | "spring" | "keyframes" | "tween" | "inertia" | undefined,
  delay: number,
  duration: number
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type === "spring" ? "tween" : type,
        delay: delay,
        duration: prefersReducedMotion ? 0.3 : duration,
        ease: "easeOut",
      },
    },
  };
};

// zoom in motion
export const zoomIn = (delay: number, duration: number): Variants => {
  return {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: prefersReducedMotion ? 0.3 : duration,
        ease: "easeOut",
      },
    },
  };
};

// slide in motion
export const slideIn = (
  direction: "left" | "right" | "up" | "down" | undefined,
  type: "decay" | "spring" | "keyframes" | "tween" | "inertia" | undefined,
  delay: number,
  duration: number
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type === "spring" ? "tween" : type,
        delay: delay,
        duration: prefersReducedMotion ? 0.3 : duration,
        ease: "easeOut",
      },
    },
  };
};

// staggered container motion
export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
