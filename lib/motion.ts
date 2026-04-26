const getIsMobile = () =>
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

const getDistance = () => (getIsMobile() ? 30 : 60);
const getDuration = () => (getIsMobile() ? 0.35 : 0.5);

export function slideInFromLeft(delay: number) {
  const distance = getDistance();
  const duration = getDuration();

  return {
    hidden: { x: -distance, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
}

export function slideInFromRight(delay: number) {
  const distance = getDistance();
  const duration = getDuration();

  return {
    hidden: { x: distance, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
}

export const slideInFromTop = {
  hidden: { y: -getDistance(), opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: getIsMobile() ? 0.15 : 0.4,
      duration: getDuration(),
      ease: "easeOut",
    },
  },
};
