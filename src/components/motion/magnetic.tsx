"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Max px the element drifts toward the cursor. Kept small to avoid jitter. */
  strength?: number;
}

/**
 * Wraps content so it gently drifts toward the cursor on hover, then springs
 * back. The pull is intentionally subtle and well-damped so the element never
 * slides out from under the cursor (which causes the "jumpy" oscillation).
 * Disabled when the user prefers reduced motion or on touch (no hover events).
 */
export function Magnetic({ children, className, strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Soft, well-damped spring => smooth settle, no overshoot/jitter.
  const spring = { stiffness: 120, damping: 20, mass: 0.5 } as const;
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalized offset from center, clamped to [-1, 1] for an even pull.
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    x.set(clamp(nx) * strength);
    y.set(clamp(ny) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
