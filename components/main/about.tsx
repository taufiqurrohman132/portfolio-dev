"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

import { SectionWrapper } from "@/src/hoc";
import { fadeIn, textVariant } from "@/src/utils/motion";

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return { count, ref };
};

// Stat item with animated counter
const StatItem = ({
  end,
  suffix,
  label,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}) => {
  const { count, ref } = useAnimatedCounter(end);

  return (
    <motion.div
      variants={fadeIn("up", "spring", delay, 0.8)}
      className="flex flex-col items-center md:items-start"
    >
      <span
        ref={ref}
        className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400"
      >
        {count}
        {suffix}
      </span>
      <span className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase mt-1">
        {label}
      </span>
    </motion.div>
  );
};

// Skill tag component
const SkillTag = ({ name, delay }: { name: string; delay: number }) => (
  <motion.span
    variants={fadeIn("up", "spring", delay, 0.5)}
    className="px-4 py-2 rounded-full text-sm font-medium text-gray-200 
               bg-white/5 border border-white/10 backdrop-blur-sm
               hover:bg-white/10 hover:border-purple-500/30 hover:text-white
               transition-all duration-300 cursor-default"
  >
    {name}
  </motion.span>
);

export const About = () => {
  const skills = [
    "Kotlin",
    "Jetpack Compose",
    "Android SDK",
    "MVVM",
    "Clean Architecture",
    "Firebase",
    "Room Database",
    "Retrofit",
    "Coroutines",
    "Hilt",
    "Flutter",
    "Dart",
  ];

  return (
    <SectionWrapper idName="about-me">
      <>
        {/* Section Title */}
        <motion.div variants={textVariant()}>
          <p className="text-center text-purple-300 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-3">
            Get to know me
          </p>
          <h1 className="heading text-white mb-16">
            About{" "}
            <span className="uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400">
              Me
            </span>
          </h1>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          variants={fadeIn("up", "spring", 0.1, 1)}
          className="relative w-full max-w-6xl mx-auto"
        >
          {/* Glassmorphism Card */}
          <div
            className="relative rounded-3xl overflow-hidden
                       bg-[#0a0a1a]/60 backdrop-blur-xl
                       border border-white/[0.08]
                       shadow-[0_0_60px_-15px_rgba(139,92,246,0.15)]"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-cyan-500/[0.03] pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 md:p-12 lg:p-16">
              {/* Photo Section */}
              <motion.div
                variants={fadeIn("right", "spring", 0.3, 1)}
                className="relative flex-shrink-0"
              >
                {/* Animated rotating gradient border */}
                <div className="relative p-[3px] rounded-[2rem]">
                  <div
                    className="absolute inset-0 rounded-[2rem] opacity-70"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #a855f7, #06b6d4, #8b5cf6, #a855f7)",
                      animation: "spin 4s linear infinite",
                    }}
                  />
                  <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-[calc(2rem-3px)] overflow-hidden bg-[#0a0a1a]">
                    <Image
                      src="/profile.png"
                      alt="Profile Photo"
                      fill
                      className="object-cover"
                      draggable={false}
                      priority
                    />
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-3 -right-3 md:bottom-2 md:-right-6
                             px-4 py-2 rounded-xl
                             bg-gradient-to-r from-purple-600 to-violet-600
                             text-white text-sm font-bold
                             shadow-lg shadow-purple-500/30
                             border border-white/10"
                >
                  💼 Open to Work
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <div className="flex flex-col gap-6 text-center lg:text-left">
                {/* Name & Role */}
                <motion.div
                  variants={fadeIn("left", "spring", 0.4, 1)}
                  className="space-y-2"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    Taufiqurrohman
                  </h2>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="h-[2px] w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                    <p className="text-lg md:text-xl text-purple-300 font-semibold">
                      Mobile Developer
                    </p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={fadeIn("left", "spring", 0.5, 1)}
                  className="text-gray-300/90 leading-[1.8] text-[15px] md:text-[17px] max-w-xl"
                >
                  I craft high-performance mobile applications with a focus on
                  clean architecture and exceptional user experiences.
                  Specializing in{" "}
                  <span className="text-purple-300 font-semibold">
                    Android development
                  </span>{" "}
                  with Kotlin & Jetpack Compose, I build scalable apps using
                  MVVM, Clean Architecture, and modern Android best practices.
                  Passionate about creating impactful digital solutions that
                  make a difference.
                </motion.p>

                {/* Skill Tags */}
                <motion.div
                  variants={fadeIn("left", "spring", 0.6, 1)}
                  className="flex flex-wrap justify-center lg:justify-start gap-2"
                >
                  {skills.map((skill, i) => (
                    <SkillTag key={skill} name={skill} delay={0.6 + i * 0.05} />
                  ))}
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
                  <StatItem end={2} suffix="+" label="Years Experience" delay={0.7} />
                  <StatItem end={5} suffix="+" label="Projects Built" delay={0.8} />
                  <StatItem end={10} suffix="+" label="Technologies" delay={0.9} />
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </>
    </SectionWrapper>
  );
};

