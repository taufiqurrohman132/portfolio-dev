import { cn } from "@/lib/utils";

/**
 * Smartphone mockup frame (bezel + dynamic island + side buttons).
 * Width is overridable via `className`.
 */
export const PhoneFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "relative w-[180px] rounded-[2.4rem] border border-white/25 bg-gradient-to-b from-[#8b9099] via-[#656a73] to-[#474b52] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:w-[200px]",
      className
    )}
  >
    {/* Side buttons */}
    <span
      aria-hidden
      className="absolute -left-[3px] top-20 h-8 w-[3px] rounded-l bg-white/20"
    />
    <span
      aria-hidden
      className="absolute -left-[3px] top-32 h-8 w-[3px] rounded-l bg-white/20"
    />
    <span
      aria-hidden
      className="absolute -right-[3px] top-28 h-12 w-[3px] rounded-r bg-white/20"
    />

    {/* Screen */}
    <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0c0a1f]">
      {children}
      {/* Dynamic island */}
      <span
        aria-hidden
        className="absolute left-1/2 top-2 z-20 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black shadow-inner"
      />
      {/* Home indicator */}
      <span
        aria-hidden
        className="absolute bottom-1.5 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-white/40"
      />
    </div>
  </div>
);

/**
 * Laptop mockup frame in silver MacBook style (aluminum lid + keyboard base).
 */
export const LaptopFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("w-full", className)}>
    {/* Screen lid — silver aluminum */}
    <div className="relative rounded-t-2xl border border-[#b4b7be] bg-gradient-to-b from-[#f2f3f5] via-[#dcdde1] to-[#c5c8ce] p-1.5 pb-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:p-2.5 sm:pb-4">
      {/* Webcam */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black/45"
      />
      {/* Screen with black bezel */}
      <div className="relative aspect-video overflow-hidden rounded-md border border-black/70 bg-[#0c0a1f]">
        {children}
      </div>
    </div>

    {/* Keyboard base — silver */}
    <div className="relative -mx-[1.5%] h-2 rounded-b-xl border-x border-b border-[#a4a7ae] bg-gradient-to-b from-[#e6e7ea] to-[#b7bac1] shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-3.5">
      {/* Finger groove */}
      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-black/25 sm:h-1.5 sm:w-24"
      />
    </div>
  </div>
);
