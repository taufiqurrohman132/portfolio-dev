"use client";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { cn } from "../utils/lib";
import { staggerContainer } from "../utils/motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  idName?: string;
};

export const SectionWrapper = ({ children, idName }: SectionWrapperProps) => {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  return (
    <motion.section
      variants={isMobile ? undefined : staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
      className={cn(styles.padding, "w-full px-0 relative z-0 content-visibility-auto")}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      {children}
    </motion.section>
  );
};

