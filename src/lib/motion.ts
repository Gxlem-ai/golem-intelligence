import type { Variants } from "framer-motion";

/**
 * Shared cubic-bezier easing used across the site. Typed as a fixed 4-tuple so
 * Framer Motion accepts it as a `BezierDefinition` (avoids `number[]` widening).
 */
export const EASE_SILK: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Standard fade-and-rise reveal used by individual elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE_SILK },
  }),
};
