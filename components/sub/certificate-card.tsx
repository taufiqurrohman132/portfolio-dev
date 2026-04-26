"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRef, useState } from "react";

import { CERTIFICATES } from "@/constants";

type CertType = (typeof CERTIFICATES)[number];

interface CertificateCardProps {
  cert: CertType;
  index: number;
}

export const CertificateCard = ({ cert, index }: CertificateCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateXVal = (mouseY / (rect.height / 2)) * -8;
    const rotateYVal = (mouseX / (rect.width / 2)) * 8;
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative block"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="absolute -inset-[1.5px] rounded-[28px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
          <div
            className="absolute inset-[-100%] rounded-[28px]"
            style={{
              background: "conic-gradient(from 0deg, #a855f7, #06b6d4, #a855f7, #06b6d4, #a855f7)",
              animation: "rotate-border 4s linear infinite",
            }}
          />
        </div>

        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1a1635] via-[#13102b] to-[#0c0a1f] border border-white/[0.08] group-hover:border-transparent transition-all duration-700 h-full backdrop-blur-2xl z-10">
          <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(168, 85, 247, 0.08) 45%, rgba(6, 182, 212, 0.08) 50%, transparent 55%)", backgroundSize: "200% 200%", animation: "holographic 3s ease infinite" }} />
          <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 50%)" }} />
          <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-[0.03] z-[5]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/90 to-transparent opacity-80 z-30" />
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 p-5 pb-0">
            <div className="relative w-full">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
              <div className="relative bg-gradient-to-b from-[#1e113a] to-[#16122e] rounded-lg p-2 border border-white/[0.08] group-hover:border-purple-500/30 transition-all duration-700 shadow-[0_0_20px_rgba(168,85,247,0.08)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <div className="absolute inset-2 border border-dashed border-white/[0.06] rounded pointer-events-none" />
                <div className="relative h-[180px] w-full overflow-hidden rounded bg-[#0c0a1f]">
                  <Image src={cert.image} alt={cert.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" sizes="220px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1f]/60 via-transparent to-[#0c0a1f]/20" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)", backgroundSize: "200% 100%", animation: "shine 2s ease infinite" }} />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-400/20 shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-purple-200 uppercase tracking-widest">Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-40 -right-20 w-40 h-40 rounded-full bg-purple-500/8 blur-3xl group-hover:bg-purple-500/15 transition-all duration-1000" />
          <div className="absolute bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/8 blur-3xl group-hover:bg-cyan-500/15 transition-all duration-1000" />

          <div className="relative z-10 p-5 pt-7 flex flex-col flex-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-purple-500/40 ring-2 ring-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <Image src={cert.icon} alt={cert.issuer} fill className="object-cover" sizes="28px" />
              </div>
              <p className="text-purple-300/90 text-sm font-bold tracking-wide">{cert.issuer}</p>
              <span className="ml-auto text-white/20 text-[10px] font-medium">{cert.date}</span>
            </div>

            <h3 className="text-white font-bold text-[15px] leading-snug mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:via-white group-hover:to-cyan-300 transition-all duration-500">
              {cert.title}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              <p className="text-white/25 text-[10px] font-mono tracking-[0.2em] uppercase">ID {cert.credentialId}</p>
              <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/20 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {cert.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-[5px] rounded-lg text-[11px] font-bold bg-white/[0.02] border border-white/[0.06] text-cyan-300/60 group-hover:bg-purple-500/8 group-hover:border-purple-500/20 group-hover:text-purple-300/80 transition-all duration-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-400/0 group-hover:text-purple-400/80 transition-all duration-500">
                <span className="text-xs font-bold tracking-wide uppercase">Verify</span>
                <FaExternalLinkAlt className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                <div className="w-1 h-1 rounded-full bg-purple-400" />
                <div className="w-1 h-1 rounded-full bg-cyan-400" />
                <div className="w-1 h-1 rounded-full bg-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};
