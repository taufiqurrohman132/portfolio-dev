"use client";

import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { RxGithubLogo, RxLinkedinLogo, RxInstagramLogo } from "react-icons/rx";
import { FaDownload } from "react-icons/fa6";

import { SectionWrapper } from "@/src/hoc";
import { fadeIn, textVariant } from "@/src/utils/motion";
import { MagicButton } from "@/components/ui/magic-button";

// Simple counter: instant on mobile, lightweight RAF on desktop
const useAnimatedCounter = (end: number, isMobile: boolean, isInView: boolean) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (isMobile) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, isMobile]);

  return count;
};

// Stat item
const StatItem = ({
  end,
  suffix,
  label,
  isMobile,
  isInView,
}: {
  end: number;
  suffix: string;
  label: string;
  isMobile: boolean;
  isInView: boolean;
}) => {
  const count = useAnimatedCounter(end, isMobile, isInView);

  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400">
        {count}
        {suffix}
      </span>
      <span className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase mt-1">
        {label}
      </span>
    </div>
  );
};

// Skill tag: CSS-only transitions for performance
const SkillTag = ({ name }: { name: string }) => (
  <span
    className="px-4 py-2 rounded-full text-sm font-medium text-gray-200 
               bg-white/5 border border-white/10 backdrop-blur-sm
               hover:bg-white/10 hover:border-purple-500/30 hover:text-white
               transition-colors duration-300 cursor-default"
  >
    {name}
  </span>
);

// 3D Tilt Card — disabled on mobile, lighter springs on desktop
const TiltCard = ({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) => {
  // Hooks must be called unconditionally
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Lighter springs for less GPU load
  const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXVal = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseXVal);
    y.set(mouseYVal);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // On mobile: render plain div without motion effects
  if (isMobile) {
    return <div className="relative">{children}</div>;
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const socials = [
    { icon: RxGithubLogo, link: "https://github.com/taufiqurrohman132", label: "GitHub" },
    { icon: RxLinkedinLogo, link: "https://linkedin.com/in/taufiqurrohman132", label: "LinkedIn" },
    { icon: RxInstagramLogo, link: "https://instagram.com/taufiqurrohman.tr", label: "Instagram" },
  ];

  // Simpler animation config for mobile
  const fadeInUp = isMobile
    ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4 } }
    : { variants: fadeIn("up", "tween", 0.1, 1) };

  return (
    <SectionWrapper idName="about-me">
      <div ref={sectionRef} className="relative">
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

        {/* Main Content */}
        <motion.div
          {...fadeInUp}
          className="relative w-full max-w-7xl mx-auto"
        >
          <TiltCard isMobile={isMobile}>
            {/* Glassmorphism Card */}
            <div
              className="relative rounded-3xl overflow-hidden
                         bg-[#0a0a1a]/40 backdrop-blur-md
                         border border-white/[0.08]
                         shadow-[0_0_40px_-15px_rgba(139,92,246,0.12)]
                         md:hover:shadow-[0_0_60px_-12px_rgba(139,92,246,0.18)]
                         transition-shadow duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Static gradient borders — no animation */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-cyan-500/[0.02] pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 md:p-12 lg:p-16">
                {/* Photo Section */}
                <motion.div
                  variants={isMobile ? undefined : fadeIn("right", "tween", 0.3, 0.8)}
                  className="relative flex-shrink-0"
                >
                  <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px]">
                    {/* Profile image with static gradient border */}
                    <div className="absolute inset-0 p-[3px] rounded-[2rem]">
                      <div
                        className="absolute inset-0 rounded-[2rem] p-[3px]"
                        style={{
                          background:
                            "linear-gradient(135deg, #a855f7, #06b6d4, #8b5cf6)",
                          WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />
                      <div className="relative w-full h-full rounded-[calc(2rem-3px)] overflow-hidden bg-[#0a0a1a]">
                        <Image
                          src="/profile/profile.png"
                          alt="Profile Photo"
                          fill
                          className="object-cover"
                          draggable={false}
                          priority
                        />
                      </div>
                    </div>

                    {/* Floating badge — simplified, no framer-motion wrapper on mobile */}
                    {isMobile ? (
                      <div
                        className="absolute -bottom-2 -right-2 md:bottom-4 md:-right-4
                                   px-4 py-2 rounded-xl
                                   bg-gradient-to-r from-purple-600 to-violet-600
                                   text-white text-sm font-bold
                                   shadow-lg shadow-purple-500/30
                                   border border-white/20"
                      >
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                          </span>
                          Open to Work
                        </span>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.8, type: "tween", duration: 0.5 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-2 -right-2 md:bottom-4 md:-right-4
                                   px-4 py-2 rounded-xl
                                   bg-gradient-to-r from-purple-600 to-violet-600
                                   text-white text-sm font-bold
                                   shadow-lg shadow-purple-500/30
                                   border border-white/20"
                      >
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                          </span>
                          Open to Work
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                  {/* Name & Role */}
                  <motion.div
                    variants={isMobile ? undefined : fadeIn("left", "tween", 0.4, 0.8)}
                    className="space-y-2"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400">
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
                    variants={isMobile ? undefined : fadeIn("left", "tween", 0.5, 0.8)}
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
                    variants={isMobile ? undefined : fadeIn("left", "tween", 0.6, 0.8)}
                    className="flex flex-wrap justify-center lg:justify-start gap-2"
                  >
                    {skills.map((skill) => (
                      <SkillTag key={skill} name={skill} />
                    ))}
                  </motion.div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                  {/* Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
                    <StatItem end={2} suffix="+" label="Years Experience" isMobile={isMobile} isInView={isInView} />
                    <StatItem end={5} suffix="+" label="Projects Built" isMobile={isMobile} isInView={isInView} />
                    <StatItem end={10} suffix="+" label="Technologies" isMobile={isMobile} isInView={isInView} />
                  </div>

                  {/* Social Links & CTA */}
                  <motion.div
                    variants={isMobile ? undefined : fadeIn("left", "tween", 0.8, 0.8)}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2"
                  >
                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                      {socials.map(({ icon: Icon, link, label }) => (
                        <a
                          key={label}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 border border-white/10 
                                     text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-500/30
                                     transition-all duration-300"
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center">
                      <MagicButton
                        title="Download CV"
                        icon={<FaDownload />}
                        position="right"
                        otherClasses="!mt-0 text-sm"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Background decorative glows — desktop only, reduced blur */}
          {!isMobile && (
            <>
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none" />
            </>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
