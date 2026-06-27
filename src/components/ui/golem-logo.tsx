import { cn } from "@/lib/utils";

interface GolemLogoProps {
  className?: string;
  /** Size of the mark in px. */
  size?: number;
}

/**
 * The Golem "G" mark — an open ring with a centered node, echoing the
 * original landing page's inline SVG.
 */
export function GolemLogo({ className, size = 24 }: GolemLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={cn("block", className)}
    >
      <path
        d="M21.5 7.5 A9 9 0 1 0 21.5 15 H14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="2.2" fill="currentColor" />
    </svg>
  );
}
