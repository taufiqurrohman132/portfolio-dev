"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, type ComponentType, type MouseEvent } from "react";

type VerticalTimelineElementProps = any; // sementara (biar jalan dulu)

const VerticalTimeline = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimeline
    ),
  { ssr: false }
) as ComponentType<any>;

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false }
) as ComponentType<any>;

import { EXPERIENCES } from "@/constants";
import { SectionWrapper } from "@/src/hoc";
import { styles } from "@/src/styles";
import { textVariant } from "@/src/utils/motion";

import "react-vertical-timeline-component/style.min.css";

type ExperienceCardProps = {
  experience: (typeof EXPERIENCES)[number];
};

// Experience Card
const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) { rafRef.current = 0; return; }
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
      rafRef.current = 0;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  return (
    <VerticalTimelineElement
      contentStyle={{ color: "#fff", borderRadius: "26px", boxShadow: "none" }}
      contentArrowStyle={{ borderRight: "7px solid rgba(168, 85, 247, 0.3)" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon.src}
            alt={experience.company_name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      }
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative experience-card-content gpu-layer"
        tabIndex={0}
      >
        {/* Rotating border glow */}
        <div className="border-glow" aria-hidden="true" />
        {/* Mouse-following spotlight */}
        <div className="spotlight-overlay" aria-hidden="true" />

        {/* Title */}
        <div className="relative z-10">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 text-[24px] font-bold">
            {experience.title}
          </h3>
          <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <p
              className="text-cyan-300/90 text-[14px] font-semibold"
              style={{ margin: 0 }}
            >
              {experience.company_name}
            </p>
          </div>
        </div>

        {/* Experience Points */}
        <ul className="mt-5 space-y-3 relative z-10">
          {experience.points.map((point, i) => (
            <li
              key={`experience-point-${i}`}
              className="flex items-start gap-3 text-white/80 text-[14px] tracking-wider leading-relaxed"
            >
              <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

// Experience
export const Experience = () => {
  return (
    <SectionWrapper idName="work">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <h1 className="heading text-white mb-20">
            What I have done so far{" "}
            <span className="uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Work Experience</span>
          </h1>
        </motion.div>

        {/* Experience Card */}
        <div className="empty-20 flex flex-col">
          <VerticalTimeline>
            {EXPERIENCES.map((experience, i) => (
              <ExperienceCard key={i} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </>
    </SectionWrapper>
  );
};
