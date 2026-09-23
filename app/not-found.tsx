import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="bg-clip-text text-sm font-bold uppercase tracking-[0.3em] text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
        Project not found
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/50">
        The project you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/#projects"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-purple-500/40 hover:text-cyan-300"
      >
        <FaArrowLeft className="h-3.5 w-3.5" />
        Back to projects
      </Link>
    </main>
  );
}
