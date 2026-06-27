"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the element travels from while fading in. */
  direction?: Direction;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Duration in seconds. */
  duration?: number;
  /** How much of the element must be visible before triggering (0-1). */
  amount?: number;
  /** Replay every time it enters the viewport. */
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article";
}

/**
 * Fade + slide an element into view as it crosses the viewport.
 * Honors `prefers-reduced-motion` automatically via Framer Motion.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  amount = 0.3,
  once = true,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}

/** Container that staggers its `<StaggerItem>` children into view. */
export function Stagger({
  children,
  className,
  amount = 0.2,
  once = true,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Child of `<Stagger>` that fades + rises in sequence. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
