"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixel distance traveled across the scroll range. Negative moves up. */
  distance?: number;
}

/**
 * Translates children vertically as the element scrolls through the viewport,
 * creating a subtle depth/parallax effect.
 */
export function Parallax({
  children,
  className,
  distance = -60,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
