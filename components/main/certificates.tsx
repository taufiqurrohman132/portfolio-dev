"use client";

import { motion } from "framer-motion";

import { CERTIFICATES } from "@/constants";
import { CertificateCard } from "@/components/sub/certificate-card";
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-white/30 mt-4 text-sm max-w-lg mx-auto"
          >
            Industry-recognized credentials validating expertise in modern
            Android development
          </motion.p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {CERTIFICATES.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent max-w-2xl mx-auto"
        />
      </section>
    </SectionWrapper>
  );
};
