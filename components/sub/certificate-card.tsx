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
  const rafRef = useRef<number>(0);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) { rafRef.current = 0; return; }
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateXVal = (mouseY / (rect.height / 2)) * -5;
      const rotateYVal = (mouseX / (rect.width / 2)) * 5;
      setTransform(`perspective(1000px) rotateX(${rotateXVal}deg) rotateY(${rotateYVal}deg) scale3d(1.02, 1.02, 1.02)`);

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
      rafRef.current = 0;
    });
  };

  const handleMouseLeave = () => {
    setTransform("");
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative block gpu-layer"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transform || "perspective(1000px)", transition: "transform 0.15s ease-out" }}
        className="relative"
      >
        <div className="absolute -inset-[1.5px] rounded-[28px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
          <div
            className="absolute inset-[-100%] rounded-[28px]"
            style={{
              background: "conic-gradient(from 0deg, #a855f7, #06b6d4, #a855f7, #06b6d4, #a855f7)",
              animation: "rotate-border 4s linear infinite",
            }}
          />
        </div>

        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1a1635] via-[#13102b] to-[#0c0a1f] border border-white/[0.08] group-hover:border-transparent transition-all duration-500 h-full z-10">
          <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.1), transparent 50%)" }} />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/90 to-transparent opacity-80 z-30" />

          <div className="relative z-10 p-5 pb-0">
            <div className="relative w-full">
              <div className="relative bg-gradient-to-b from-[#1e113a] to-[#16122e] rounded-lg p-2 border border-white/[0.08] group-hover:border-purple-500/30 transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.08)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <div className="relative h-[180px] w-full overflow-hidden rounded bg-[#0c0a1f]">
                  <Image src={cert.image} alt={cert.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 90vw, 300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1f]/60 via-transparent to-[#0c0a1f]/20" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/20 shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[9px] font-bold text-purple-200 uppercase tracking-widest">Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-40 -right-20 w-40 h-40 rounded-full bg-purple-500/8 blur-[60px] group-hover:bg-purple-500/15 transition-all duration-500 pointer-events-none" />
          <div className="absolute bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/8 blur-[60px] group-hover:bg-cyan-500/15 transition-all duration-500 pointer-events-none" />

          <div className="relative z-10 p-5 pt-7 flex flex-col flex-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-purple-500/40">
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
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-[5px] rounded-lg text-[11px] font-bold bg-white/[0.02] border border-white/[0.06] text-cyan-300/60 group-hover:bg-purple-500/8 group-hover:border-purple-500/20 group-hover:text-purple-300/80 transition-colors duration-300"
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
      </div>
    </motion.a>
  );
};
