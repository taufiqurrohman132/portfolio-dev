"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import Link from "next/link";
import { MagicButton } from "../ui/magic-button";
import { FaLocationArrow } from "react-icons/fa6";

interface HeroContentProps {
  isMobile?: boolean;
}

export const HeroContent = ({ isMobile = false }: HeroContentProps) => {
  // Stagger delays: wider spacing to reduce simultaneous animations
  const delayTop = isMobile ? 0.1 : 0.3;
  const delayHeading = isMobile ? 0.25 : 0.6;
  const delayCta = isMobile ? 0.4 : 0.9;
  const delayImage = isMobile ? 0 : 1.1;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-28 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* Welcome Box */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          style={{ willChange: "transform, opacity" }}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Mobile Developer Portfolio
          </h1>
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={slideInFromLeft(delayHeading)}
          className="flex flex-col gap-3 mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-sm md:text-base font-normal text-gray-300">
            👋Hi i&apos;am Taufiqur Rohman
          </span>
          <span>
            Building scalable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              mobile apps
            </span>{" "}
            with modern architecture.
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={slideInFromLeft(delayCta)}
          style={{ willChange: "transform, opacity" }}
        >
          <Link href="#projects" className="md:mt-10 inline-block">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
              asChild
            />
          </Link>
        </motion.div>
      </div>

      {/* Desktop only: SVG illustration with lazy loading */}
      {!isMobile && (
        <motion.div
          variants={slideInFromRight(delayImage)}
          className="w-full h-full hidden md:flex justify-center items-center"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src="/hero-bg.svg"
            alt="work icons"
            height={650}
            width={650}
            draggable={false}
            className="select-none"
            loading="lazy"
            priority={false}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
