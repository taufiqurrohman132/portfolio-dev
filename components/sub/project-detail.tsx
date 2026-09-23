"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBalanceScale,
  FaCode,
  FaCodeBranch,
  FaExclamationCircle,
  FaExternalLinkAlt,
  FaEye,
  FaHistory,
  FaStar,
} from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";

import { ActionButton } from "@/components/sub/action-button";
import { ProjectCarousel } from "@/components/sub/project-carousel";
import { RECENT_PROJECTS, getScreenshots, type Project } from "@/constants";
import { formatCount, formatRepoSize, timeAgo } from "@/lib/format";
import type { RepoData } from "@/lib/github";
import { textVariant } from "@/src/utils/motion";

type ProjectDetailProps = {
  project: Project;
  repo: RepoData | null;
};

/* ---------------------------------- bits --------------------------------- */

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition-colors duration-300 hover:border-purple-500/30 hover:bg-purple-500/[0.06]">
    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/35">
      {icon}
      {label}
    </div>
    <p className="mt-1 text-lg font-bold text-white">{value}</p>
  </div>
);

const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between gap-3 text-xs">
    <span className="flex items-center gap-2 text-white/40">
      <span className="text-purple-400/70">{icon}</span>
      {label}
    </span>
    <span className="font-medium text-white/70">{value}</span>
  </div>
);

/* -------------------------------- component ------------------------------- */

export const ProjectDetail = ({ project, repo }: ProjectDetailProps) => {
  const index = RECENT_PROJECTS.findIndex((p) => p.id === project.id);
  const prev = index > 0 ? RECENT_PROJECTS[index - 1] : null;
  const next =
    index >= 0 && index < RECENT_PROJECTS.length - 1
      ? RECENT_PROJECTS[index + 1]
      : null;

  const hasSource = Boolean(project.sourceCode);
  const coverSrc = getScreenshots(project)[0];

  // Live demo = static link, unless it just points at the repo itself.
  const rawDemoLink = project.link ?? repo?.homepage ?? null;
  const demoLink =
    rawDemoLink && rawDemoLink !== project.sourceCode ? rawDemoLink : null;

  const topics =
    repo && repo.topics.length > 0
      ? repo.topics
      : (project.tags ?? []);

  const hasLive = repo !== null;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28 md:px-10">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-cyan-400"
        >
          <FaArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to projects
        </Link>
      </motion.div>

      {/* Cover header — LinkedIn-style banner with a small height */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative mt-6 h-[140px] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:h-[180px]"
      >
        <Image
          src={coverSrc}
          alt={`${project.title} cover`}
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/25 via-transparent to-cyan-600/20 mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />
      </motion.div>

      {/* Header */}
      <motion.div
        variants={textVariant(0.1)}
        initial="hidden"
        animate="show"
        className="mt-8 text-center"
      >
        {(project.role || project.year) && (
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7042f88b] bg-[#7042f812] px-4 py-1.5 text-xs font-medium text-[#b49bff]">
            {project.role}
            {project.role && project.year && " · "}
            {project.year}
          </span>
        )}

        <h1 className="heading text-white">{project.title}</h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/60 lg:text-lg">
          {project.des}
        </p>

        {/* Tech icon chips — same treatment as the project cards */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {project.iconLists.map((icon) => (
            <div
              key={icon}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:h-12 lg:w-12"
            >
              <Image src={icon} alt={icon} width={48} height={48} className="p-2" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Screenshot carousel — phone-frame coverflow for mobile projects, laptop frame for web projects */}
      <ProjectCarousel project={project} />

      {/* Content */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: overview + highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-8 lg:col-span-2"
        >
          {project.overview && (
            <section className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-[#1a1635] via-[#13102b] to-[#0c0a1f] p-6 md:p-8">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/90 to-transparent" />
              <h2 className="text-lg font-bold text-white">
                Overview
                <span className="mt-2 block h-px w-16 bg-gradient-to-r from-purple-500 to-cyan-500" />
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                {project.overview}
              </p>
            </section>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <section className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-[#1a1635] via-[#13102b] to-[#0c0a1f] p-6 md:p-8">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/90 to-transparent" />
              <h2 className="text-lg font-bold text-white">
                Highlights
                <span className="mt-2 block h-px w-16 bg-gradient-to-r from-purple-500 to-cyan-500" />
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </motion.div>

        {/* Right: actions + hybrid repo panel */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Actions — tombol di-center horizontal (w-full di mobile, w-60 di desktop) */}
          <div className="flex flex-col items-center gap-3 rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-[#1a1635] via-[#13102b] to-[#0c0a1f] p-6">
            <ActionButton
              title="Source Code"
              href={project.sourceCode}
              icon={<FaCode className="h-4 w-4" />}
              disabledReason="Repository not available for this project"
            />
            {/* Selalu dirender — tanpa URL (demo menyusul / repo private) jadi disabled */}
            <ActionButton
              title="Live Demo"
              href={demoLink}
              icon={<FaExternalLinkAlt className="h-3.5 w-3.5" />}
              disabledReason="Live demo is not available yet"
            />
            {!hasSource && (
              <p className="text-center text-[11px] text-amber-300/60">
                Source repository is private for this project.
              </p>
            )}
          </div>

          {/* Repository panel — hybrid: live GitHub data with static fallback */}
          <div className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-[#1a1635] via-[#13102b] to-[#0c0a1f] p-6">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/90 to-transparent" />

            {/* Header + sync status */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-white">
                <RxGithubLogo className="h-5 w-5" />
                <span className="text-sm font-bold tracking-wide">Repository</span>
              </div>

              {!hasSource ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  Not linked
                </span>
              ) : hasLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-green-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Live sync
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Static data
                </span>
              )}
            </div>

            {!hasSource ? (
              <>
                <p className="mt-4 text-xs leading-relaxed text-white/40">
                  This project&apos;s repository is private, so live GitHub stats
                  aren&apos;t shown here.
                </p>

                {/* Static tech tags so the panel stays useful */}
                {topics.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {topics.slice(0, 8).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-bold text-cyan-300/60 transition-colors duration-300 hover:border-purple-500/30 hover:text-purple-300/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Stat
                    icon={<FaStar className="h-3 w-3 text-yellow-400" />}
                    label="Stars"
                    value={hasLive ? formatCount(repo.stars) : "—"}
                  />
                  <Stat
                    icon={<FaCodeBranch className="h-3 w-3 text-purple-400" />}
                    label="Forks"
                    value={hasLive ? formatCount(repo.forks) : "—"}
                  />
                  <Stat
                    icon={<FaEye className="h-3 w-3 text-cyan-400" />}
                    label="Watchers"
                    value={hasLive ? formatCount(repo.watchers) : "—"}
                  />
                  <Stat
                    icon={
                      <FaExclamationCircle className="h-3 w-3 text-pink-400" />
                    }
                    label="Issues"
                    value={hasLive ? formatCount(repo.openIssues) : "—"}
                  />
                </div>

                {/* Meta */}
                <div className="mt-5 space-y-2.5">
                  <MetaRow
                    icon={<FaCode className="h-3 w-3" />}
                    label="Language"
                    value={hasLive ? (repo.language ?? "—") : "—"}
                  />
                  <MetaRow
                    icon={<FaBalanceScale className="h-3 w-3" />}
                    label="License"
                    value={hasLive ? (repo.license ?? "—") : "—"}
                  />
                  <MetaRow
                    icon={<FaHistory className="h-3 w-3" />}
                    label="Last push"
                    value={hasLive ? timeAgo(repo.lastPush) : "—"}
                  />
                  <MetaRow
                    icon={<FaCodeBranch className="h-3 w-3" />}
                    label="Default branch"
                    value={hasLive ? (repo.defaultBranch ?? "—") : "—"}
                  />
                  <MetaRow
                    icon={<FaStar className="h-3 w-3" />}
                    label="Repo size"
                    value={hasLive ? formatRepoSize(repo.sizeKb) : "—"}
                  />
                </div>

                {/* Topics / fallback tags */}
                {topics.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {topics.slice(0, 8).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-bold text-cyan-300/60 transition-colors duration-300 hover:border-purple-500/30 hover:text-purple-300/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {hasLive ? (
                  <p className="mt-4 text-[10px] text-white/30">
                    Stats synced from GitHub · refreshes hourly
                  </p>
                ) : (
                  <p className="mt-4 text-[10px] text-white/30">
                    Live sync unavailable — GitHub data will reload automatically.
                  </p>
                )}

                {/* Repo link */}
                <Link
                  href={project.sourceCode as string}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 text-xs font-bold text-white/70 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
                >
                  <RxGithubLogo className="h-4 w-4" />
                  {hasLive && repo.fullName ? repo.fullName : "Open repository"}
                  <FaExternalLinkAlt className="h-3 w-3 opacity-60" />
                </Link>
              </>
            )}
          </div>
        </motion.aside>
      </div>

      {/* Prev / next */}
      <nav className="mt-16 flex items-stretch justify-between gap-4 border-t border-white/[0.06] pt-8">
        {prev ? (
          <Link
            href={`/projects/${prev.id}`}
            className="group flex max-w-[45%] flex-col items-start gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-purple-500/40 hover:bg-purple-500/[0.06]"
          >
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
              <FaArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="truncate text-sm font-bold text-white/80 group-hover:text-cyan-300">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            href={`/projects/${next.id}`}
            className="group flex max-w-[45%] flex-col items-end gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-right transition hover:border-cyan-500/40 hover:bg-cyan-500/[0.06]"
          >
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
              Next
              <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="truncate text-sm font-bold text-white/80 group-hover:text-cyan-300">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
};
