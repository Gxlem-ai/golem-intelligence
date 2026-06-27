import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Render light text for dark sections. */
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}

/** Consistent eyebrow → headline → supporting copy block with reveal motion. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  dark,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-[62ch]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "font-mono text-xs tracking-[0.14em] uppercase",
            dark ? "text-mint-bright" : "text-leaf",
          )}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-4 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.08] font-semibold",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {body ? (
        <Reveal delay={0.16}>
          <p
            className={cn("mt-4 text-lg", dark ? "text-[#B8C9BF]" : "text-fog")}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
