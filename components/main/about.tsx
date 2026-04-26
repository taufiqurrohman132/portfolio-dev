"use client";

import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { RxGithubLogo, RxLinkedinLogo, RxInstagramLogo } from "react-icons/rx";
import { FaDownload } from "react-icons/fa6";

import { SectionWrapper } from "@/src/hoc";
import { fadeIn, textVariant } from "@/src/utils/motion";
import { MagicButton } from "@/components/ui/magic-button";

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
               hover:bg-white/10 hover:border-purple-500/30 hover:text-white hover:scale-105
               transition-all duration-300 cursor-default"
  >
    {name}
  </motion.span>
);

// 3D Tilt Card Component - disabled on mobile for performance
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile, render without tilt to save GPU
  if (isMobile) {
    return <div className="relative">{children}</div>;
  }

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reduced stiffness for smoother, less CPU-intensive animation
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = (e.clientX - rect.left) / width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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

// Floating orbiting icon
const OrbitingIcon = ({
  src,
  size,
  orbitRadius,
  duration,
  delay,
}: {
  src: string;
  size: number;
  orbitRadius: number;
  duration: number;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        top: "50%",
        left: "50%",
        marginLeft: -orbitRadius,
        marginTop: -orbitRadius,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <div
        className="absolute bg-[#0a0a1a]/80 backdrop-blur-md rounded-xl p-2 border border-white/10 shadow-lg"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Image src={src} width={size} height={size} alt="skill" className="opacity-80" />
      </div>
    </motion.div>
  );
};

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

  const socials = [
    { icon: RxGithubLogo, link: "https://github.com/taufiqurrohman132", label: "GitHub" },
    { icon: RxLinkedinLogo, link: "https://linkedin.com/in/taufiqurrohman132", label: "LinkedIn" },
    { icon: RxInstagramLogo, link: "https://instagram.com/taufiqurrohman.tr", label: "Instagram" },
  ];

  return (
    <SectionWrapper idName="about-me">
      <>
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <video
            className="w-full h-full object-cover opacity-20 gpu-layer"
            preload="metadata"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-transparent to-[#030014]" />
        </div>

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
          variants={fadeIn("up", "spring", 0.1, 1)}
          className="relative w-full max-w-7xl mx-auto"
        >
          <TiltCard>
            {/* Glassmorphism Card */}
            <div
              className="relative rounded-3xl overflow-hidden
                         bg-[#0a0a1a]/40 backdrop-blur-2xl
                         border border-white/[0.08]
                         shadow-[0_0_80px_-20px_rgba(139,92,246,0.2)]
                         hover:shadow-[0_0_100px_-15px_rgba(139,92,246,0.3)]
                         transition-shadow duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated gradient border top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-cyan-500/[0.02] pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 md:p-12 lg:p-16">
                {/* Photo Section with Orbiting Icons */}
                <motion.div
                  variants={fadeIn("right", "spring", 0.3, 1)}
                  className="relative flex-shrink-0"
                >
                  <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px]">
                    {/* Orbiting skill icons */}
                    <OrbitingIcon
                      src="/skills/mobile/kotlin.svg"
                      size={32}
                      orbitRadius={220}
                      duration={12}
                      delay={0}
                    />
                    <OrbitingIcon
                      src="/skills/mobile/android.svg"
                      size={28}
                      orbitRadius={210}
                      duration={15}
                      delay={2}
                    />
                    <OrbitingIcon
                      src="/skills/mobile/Flutter.svg"
                      size={26}
                      orbitRadius={200}
                      duration={10}
                      delay={4}
                    />
                    <OrbitingIcon
                      src="/skills/mobile/firebase.svg"
                      size={24}
                      orbitRadius={235}
                      duration={18}
                      delay={1}
                    />

                    {/* Animated rotating gradient border */}
                    <div className="absolute inset-0 p-[3px] rounded-[2rem]">
                      <div
                        className="absolute inset-0 rounded-[2rem] p-[3px]"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #a855f7, #06b6d4, #8b5cf6, #06b6d4, #a855f7)",
                          animation: "spin 4s linear infinite",
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

                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className="absolute -bottom-2 -right-2 md:bottom-4 md:-right-4
                                 px-4 py-2 rounded-xl
                                 bg-gradient-to-r from-purple-600 to-violet-600
                                 text-white text-sm font-bold
                                 shadow-lg shadow-purple-500/40
                                 border border-white/20
                                 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Open to Work
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                  {/* Name & Role */}
                  <motion.div
                    variants={fadeIn("left", "spring", 0.4, 1)}
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

                  {/* Social Links & CTA */}
                  <motion.div
                    variants={fadeIn("left", "spring", 1, 1)}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2"
                  >
                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                      {socials.map(({ icon: Icon, link, label }) => (
                        <motion.a
                          key={label}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 border border-white/10 
                                     text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-500/30
                                     transition-colors duration-300"
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
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

          {/* Background decorative glows - reduced blur for performance */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none gpu-layer" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none gpu-layer" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none gpu-layer hidden md:block" />
        </motion.div>
      </>
    </SectionWrapper>
  );
};

