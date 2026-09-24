"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { LaptopFrame, PhoneFrame } from "@/components/ui/device-frame";
import { getScreenshots, type Project } from "@/constants";
import { cn } from "@/lib/utils";

type ProjectCarouselProps = {
  project: Project;
};

/** Signed shortest distance from current index, wrapping around the list. */
const wrappedDistance = (i: number, current: number, count: number) => {
  let d = (i - current) % count;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
};

export const ProjectCarousel = ({ project }: ProjectCarouselProps) => {
  const screenshots = getScreenshots(project);
  const count = screenshots.length;

  const [index, setIndex] = useState(0);
  const current = ((index % count) + count) % count;

  const step = useCallback(
    (dir: number) => setIndex((i) => i + dir),
    []
  );

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  const showControls = count > 1;
  /** Frame mengikuti platform project: web → laptop, mobile → coverflow HP. */
  const isWeb = (project.platform ?? "mobile") === "web";

  const altFor = (i: number) =>
    count > 1
      ? `${project.title} screenshot ${i + 1} of ${count}`
      : project.title;

  return (
    <section
      aria-label="Project screenshots"
      className="mt-10 flex flex-col items-stretch"
    >
      {/* -------- Mobile project: coverflow of phone frames (3 visible) -------- */}
      {!isWeb && (
      <motion.div
        className="relative -mx-6 h-[420px] overflow-hidden"
        drag={showControls ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) step(1);
          else if (info.offset.x > 60) step(-1);
        }}
      >
        {screenshots.map((src, i) => {
          const d = wrappedDistance(i, current, count);
          const visible = Math.abs(d) <= 1;
          const isCurrent = d === 0;

          return (
            <div
              key={`${src}-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                initial={false}
                animate={{
                  x: isCurrent ? "0%" : d < 0 ? "-66%" : "66%",
                  scale: isCurrent ? 1 : 0.74,
                  opacity: visible ? (isCurrent ? 1 : 0.5) : 0,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
                style={{
                  zIndex: isCurrent ? 20 : 10,
                  pointerEvents: visible && !isCurrent ? "auto" : "none",
                }}
                className={cn(!isCurrent && "cursor-pointer")}
                onClick={() => {
                  if (!isCurrent) step(d);
                }}
                aria-hidden={!visible}
              >
                <PhoneFrame>
                  <Image
                    src={src}
                    alt={altFor(i)}
                    fill
                    sizes="200px"
                    className="object-cover object-top"
                    priority={isCurrent}
                  />
                </PhoneFrame>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
      )}

      {/* -------- Web project: coverflow of laptop frames (3 visible) -------- */}
      {isWeb && (
        <motion.div
          className="relative -mx-6 h-[300px] overflow-hidden sm:h-[440px] md:-mx-10 md:h-[530px]"
          drag={showControls ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) step(1);
            else if (info.offset.x > 60) step(-1);
          }}
        >
          {screenshots.map((src, i) => {
            const d = wrappedDistance(i, current, count);
            const visible = Math.abs(d) <= 1;
            const isCurrent = d === 0;

            return (
              <div
                key={`${src}-${i}`}
                className="absolute left-1/2 top-1/2 w-[86%] max-w-3xl -translate-x-1/2 -translate-y-1/2"
              >
                {/* Slide: tengah besar, samping menyusut & menggeser keluar */}
                <motion.div
                  initial={false}
                  animate={{
                    x: isCurrent ? "0%" : d < 0 ? "-88%" : "88%",
                    scale: isCurrent ? 1 : 0.7,
                    opacity: visible ? (isCurrent ? 1 : 0.5) : 0,
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 30 }}
                  style={{
                    zIndex: isCurrent ? 20 : 10,
                    pointerEvents: visible && !isCurrent ? "auto" : "none",
                  }}
                  className={cn(!isCurrent && "cursor-pointer")}
                  onClick={() => {
                    if (!isCurrent) step(d);
                  }}
                  aria-hidden={!visible}
                >
                  <LaptopFrame>
                    <Image
                      src={src}
                      alt={altFor(i)}
                      fill
                      sizes="(max-width: 1152px) 86vw, 768px"
                      className="object-contain"
                      priority={isCurrent}
                    />
                  </LaptopFrame>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Controls — touch-friendly di mobile; dot penuh tetap digunakan di desktop. */}
      {showControls && (
        <div className="mt-5 flex w-full items-center justify-between gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 sm:mt-6 sm:w-auto sm:flex-none sm:justify-center sm:gap-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => step(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-purple-500/50 hover:bg-purple-500/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>

          {/* Mobile: indikator ringkas agar jumlah screenshot banyak tidak membungkus/overflow. */}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:hidden">
            {count <= 5 ? (
              <div className="flex max-w-full items-center justify-center gap-1.5">
                {screenshots.map((src, i) => (
                  <button
                    key={`${src}-mobile-dot-${i}`}
                    type="button"
                    aria-label={`Go to screenshot ${i + 1}`}
                    aria-current={i === current}
                    onClick={() => goTo(i)}
                    className={cn(
                      "h-2 touch-manipulation rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60",
                      i === current
                        ? "w-5 bg-gradient-to-r from-purple-500 to-cyan-500"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
            ) : (
              <div
                role="progressbar"
                aria-label="Carousel progress"
                aria-valuemin={1}
                aria-valuemax={count}
                aria-valuenow={current + 1}
                aria-valuetext={`${current + 1} of ${count}`}
                className="h-1.5 w-full max-w-40 overflow-hidden rounded-full bg-white/10"
              >
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-[width] duration-300"
                  style={{ width: `max(8px, ${((current + 1) / count) * 100}%)` }}
                />
              </div>
            )}

            <span
              aria-live="polite"
              className="text-[11px] font-medium tabular-nums text-white/40"
            >
              <span className="text-white/80">{String(current + 1).padStart(2, "0")}</span>
              <span className="mx-1 text-white/20">/</span>
              {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Desktop: semua dot tetap bisa dipilih langsung; counter di bawah seperti mobile. */}
          <div className="hidden min-w-0 flex-col items-center gap-2 sm:flex">
            <div className="flex items-center justify-center gap-2">
              {screenshots.map((src, i) => (
                <button
                  key={`${src}-desktop-dot-${i}`}
                  type="button"
                  aria-label={`Go to screenshot ${i + 1}`}
                  aria-current={i === current}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 touch-manipulation rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60",
                    i === current
                      ? "w-6 bg-gradient-to-r from-purple-500 to-cyan-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>

            <span className="text-[11px] font-medium tabular-nums text-white/40">
              <span className="text-white/80">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-white/20">/</span>
              {String(count).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => step(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-cyan-500/50 hover:bg-cyan-500/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
          >
            <FaArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
};
