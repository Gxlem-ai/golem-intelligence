"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin copper progress bar pinned to the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="from-leaf via-copper to-mint fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r"
    />
  );
}
