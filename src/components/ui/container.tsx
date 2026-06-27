import { cn } from "@/lib/utils";

/** Centered max-width content wrapper used by every section. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1120px] px-6 sm:px-7", className)}
    >
      {children}
    </div>
  );
}
