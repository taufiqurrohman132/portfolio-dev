"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js (ratusan KB) dimuat on-demand SETELAH hydration,
// dan tidak sama sekali di mobile (canvas bintang memang dimatikan di mobile).
const StarsCanvas = dynamic(
  () =>
    import("@/components/main/star-background").then((m) => m.StarsCanvas),
  { ssr: false }
);

export const Stars = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.innerWidth >= 768);
  }, []);

  if (!enabled) return null;
  return <StarsCanvas />;
};
