import { cn } from "@/lib/utils";

type MagicButtonProps = {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
  asChild?: boolean;
};

export const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  asChild = false,
}: MagicButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "group relative isolate inline-flex h-12 w-full max-w-full overflow-hidden rounded-lg p-px text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 md:w-60",
        !asChild && ""
      )}
      onClick={handleClick}
      tabIndex={asChild ? -1 : undefined}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-1000%] z-0 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />
      <span
        className={cn(
          "relative z-10 inline-flex h-full w-full min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl",
          otherClasses
        )}
      >
        {position === "left" && icon && (
          <span className="shrink-0">{icon}</span>
        )}
        <span className="min-w-0 truncate">{title}</span>
        {position === "right" && icon && (
          <span className="shrink-0">{icon}</span>
        )}
      </span>
    </button>
  );
};
