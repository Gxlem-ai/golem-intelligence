"use client";

import { motion, type Variants } from "framer-motion";
import { exchange } from "@/lib/content";
import { Chip } from "@/components/ui/chip";
import { EASE_SILK } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.75, delayChildren: 0.3 },
  },
};

const bubble: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SILK },
  },
};

/** Splits the Golem message so we can highlight the price delta in mint. */
function HighlightedMessage() {
  const [before, after] = exchange.golemMessage.split(exchange.highlight);
  return (
    <>
      {before}
      <span className="text-mint font-mono">{exchange.highlight}</span>
      {after}
    </>
  );
}

export function AskGolemExchange() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="bg-spruce-2 relative rounded-2xl border border-white/10 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:p-6"
      aria-label="Example AskGolem conversation"
    >
      {/* faint inner glow */}
      <div className="bg-mint/5 pointer-events-none absolute -inset-px rounded-2xl opacity-60 blur-2xl" />

      {/* window bar */}
      <div className="relative mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="text-mint-bright ml-2 font-mono text-xs font-medium tracking-[0.1em]">
          {exchange.title}
        </span>
      </div>

      <div className="relative space-y-3">
        {/* user */}
        <motion.div
          variants={bubble}
          className="ml-10 rounded-xl bg-white/[0.08] px-4 py-3 text-[14.5px] leading-relaxed text-[#EAF2EC]"
        >
          {exchange.userMessage}
        </motion.div>

        {/* golem */}
        <motion.div
          variants={bubble}
          className="border-mint/20 bg-mint/10 mr-6 rounded-xl border px-4 py-3 text-[14.5px] leading-relaxed text-[#D9EBDF]"
        >
          <HighlightedMessage />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {exchange.chips.map((chip) => (
              <Chip key={chip.label} tone={chip.tone} dark>
                {chip.label}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* approval */}
        <motion.div
          variants={bubble}
          className="bg-spruce-3 flex items-center justify-between gap-3 rounded-xl border border-dashed border-[rgba(194,112,46,0.6)] px-4 py-3 text-sm text-[#EAD9C5]"
        >
          <span>{exchange.approve.text}</span>
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="bg-copper shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] text-white"
          >
            {exchange.approve.pill}
          </motion.span>
        </motion.div>

        {/* done */}
        <motion.div
          variants={bubble}
          className="text-mint-bright pt-1 font-mono text-xs"
        >
          {exchange.done}
        </motion.div>
      </div>
    </motion.div>
  );
}
