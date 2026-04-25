"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt, FaAward } from "react-icons/fa";

import { CERTIFICATES } from "@/constants";
import { SectionWrapper } from "@/src/hoc";
import { textVariant } from "@/src/utils/motion";

export const Certificates = () => {
  return (
    <SectionWrapper idName="certificates">
      <section className="py-20">
        {/* Title */}
        <motion.div variants={textVariant()}>
          <h1 className="heading text-white">
            My Professional{" "}
            <span className="uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Certifications
            </span>
          </h1>
        </motion.div>

        {/* Certificates Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {CERTIFICATES.map((cert, index) => (
            <motion.a
              key={cert.id}
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
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative block"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1a1635] to-[#120e2a] border border-white/[0.06] p-6 h-full transition-all duration-400">
                {/* Top gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-60" />

                {/* Glow orb */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/5 group-hover:bg-purple-500/10 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with icon and date */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                        <Image
                          src={cert.icon}
                          alt={cert.issuer}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-purple-300/90 text-sm font-semibold">
                          {cert.issuer}
                        </p>
                        <p className="text-white/50 text-xs">{cert.date}</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="text-purple-400/60 group-hover:text-purple-400 transition-colors"
                    >
                      <FaAward className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                    {cert.title}
                  </h3>

                  {/* Credential ID */}
                  <p className="text-white/40 text-xs mb-4 font-mono">
                    ID: {cert.credentialId}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-cyan-300/80 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center gap-2 text-purple-400/0 group-hover:text-purple-400/70 transition-all duration-400">
                    <span className="text-xs font-medium">Verify Certificate</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent max-w-lg mx-auto"
        />
      </section>
    </SectionWrapper>
  );
};

