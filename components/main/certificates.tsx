"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRef, type MouseEvent } from "react";

import { CERTIFICATES } from "@/constants";
import { SectionWrapper } from "@/src/hoc";
import { textVariant } from "@/src/utils/motion";

export const Certificates = () => {
  return (
    <SectionWrapper idName="certificates">
      <section className="py-20">
        <motion.div variants={textVariant()}>
          <h1 className="heading text-white">
            My Professional{" "}
            <span className="uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Certifications
            </span>
          </h1>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {CERTIFICATES.map((cert, index) => (
            <CertificateItem key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
};

function CertificateItem({
  cert,
  index,
}: {
  cert: (typeof CERTIFICATES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative block"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="certificate-card h-full flex flex-col"
      >
        <div className="border-glow" aria-hidden="true" />
        <div className="spotlight-overlay" aria-hidden="true" />

        <div className="relative z-10 p-5 pb-0">
          <div className="cert-image-wrap relative w-full h-44">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="relative z-10 p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-purple-500/30">
                <Image
                  src={cert.icon}
                  alt={cert.issuer}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
              <p className="text-purple-300/80 text-xs font-semibold tracking-wide">
                {cert.issuer}
              </p>
            </div>
            <p className="text-white/40 text-xs">{cert.date}</p>
          </div>

          <h3 className="cert-title text-white font-bold text-[15px] leading-snug mb-2">
            {cert.title}
          </h3>

          <p className="text-white/30 text-[11px] font-mono tracking-wider mb-4">
            ID: {cert.credentialId}
          </p>

          <div className="cert-tags flex flex-wrap gap-1.5 mt-auto">
            {cert.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-[3px] rounded-md text-[10px] font-semibold bg-white/[0.03] border border-white/[0.08] text-cyan-300/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="cert-verify mt-3 flex items-center gap-2 text-purple-400/70">
            <span className="text-xs font-medium">Verify Certificate</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

