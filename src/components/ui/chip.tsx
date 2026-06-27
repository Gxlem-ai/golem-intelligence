import { cn } from "@/lib/utils";

type ChipTone = "leaf" | "market" | "copper" | "claim";

const dotColor: Record<ChipTone, string> = {
  leaf: "bg-leaf",
  market: "bg-market",
  copper: "bg-copper",
  claim: "bg-haze",
};

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  /** Render against a dark (spruce) surface. */
  dark?: boolean;
  className?: string;
}

/**
 * The signature "receipt" chip — a small mono-type pill with a colored status
 * dot. Used to attribute every claim to a source.
 */
export function Chip({ children, tone = "leaf", dark, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none whitespace-nowrap",
        dark
          ? "border-white/12 bg-white/[0.06] text-[#B8C9BF]"
          : "border-line bg-card text-fog",
        className,
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotColor[tone])}
        aria-hidden
      />
      {children}
    </span>
  );
}
