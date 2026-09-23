import Link from "next/link";

import { cn } from "@/lib/utils";

type ActionButtonProps = {
  title: string;
  /** When empty/null the button renders in a disabled (unavailable) state. */
  href?: string | null;
  icon?: React.ReactNode;
  /** Open in a new tab (external URLs). Set false for internal routes. */
  external?: boolean;
  /** Explains why the button is disabled (tooltip + screen readers). */
  disabledReason?: string;
  className?: string;
};

/**
 * Gradient CTA in the same style as MagicButton, but supports a disabled
 * state when a project has no source repository / demo link.
 */
export const ActionButton = ({
  title,
  href,
  icon,
  external = true,
  disabledReason = "Not available yet",
  className,
}: ActionButtonProps) => {
  const available = Boolean(href);

  const inner = (innerClassName?: string) => (
    <span
      className={cn(
        "relative z-10 inline-flex h-full w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-slate-950 px-7 text-center text-sm font-medium backdrop-blur-3xl",
        innerClassName
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="min-w-0 truncate">{title}</span>
    </span>
  );

  if (!available) {
    return (
      <span
        aria-disabled="true"
        role="link"
        title={disabledReason}
        className={cn(
          "relative isolate inline-flex h-12 w-full max-w-full select-none overflow-hidden rounded-lg p-px text-center opacity-50 saturate-50 md:w-60",
          "cursor-not-allowed",
          className
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-1000%] z-0 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        {inner("cursor-not-allowed text-white/60")}
        <span className="sr-only">{disabledReason}</span>
      </span>
    );
  }

  return (
    <Link
      href={href as string}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        "group relative isolate inline-flex h-12 w-full max-w-full overflow-hidden rounded-lg p-px text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 md:w-60",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-1000%] z-0 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />
      {inner(
        "cursor-pointer text-white transition-colors duration-300 group-hover:bg-[#0a0a1f]"
      )}
    </Link>
  );
};
