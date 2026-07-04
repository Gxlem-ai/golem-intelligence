"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { map } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { EASE_SILK } from "@/lib/motion";

export function PositioningMap() {
  return (
    <section id="map" className="bg-grid-ink bg-paper relative py-24">
      <Container>
        <SectionHeading
          eyebrow={map.eyebrow}
          title={map.title}
          body={map.body}
        />

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* chart — pinned on the left while the notes scroll (desktop) */}
          <div className="lg:sticky lg:top-24 lg:order-1 lg:self-start">
            <Reveal direction="right" amount={0.2}>
              <div className="relative">
                <div className="border-line bg-card relative aspect-[10/8] rounded-2xl border shadow-[0_20px_60px_-30px_rgba(20,32,27,0.3)]">
                  {/* crosshair */}
                  <div className="bg-line absolute inset-y-0 left-1/2 w-px" />
                  <div className="bg-line absolute inset-x-0 top-1/2 h-px" />

                  {/* empty (target) corner highlight */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border-leaf bg-leaf/5 absolute top-[6px] right-[6px] h-[calc(50%-12px)] w-[calc(50%-12px)] rounded-xl border-[1.5px]"
                  >
                    <motion.div
                      className="bg-leaf/10 absolute inset-0 rounded-xl"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* quadrant labels */}
                  <span className="text-haze absolute top-3 left-4 font-mono text-[10.5px] tracking-[0.08em] uppercase">
                    {map.quadrants.tl}
                  </span>
                  <span className="text-leaf absolute top-3 left-[calc(50%+1rem)] font-mono text-[10.5px] tracking-[0.08em] uppercase">
                    {map.quadrants.tr}
                  </span>
                  <span className="text-haze absolute top-[calc(50%+0.75rem)] left-4 font-mono text-[10.5px] tracking-[0.08em] uppercase">
                    {map.quadrants.bl}
                  </span>
                  <span className="text-haze absolute top-[calc(50%+0.75rem)] left-[calc(50%+1rem)] font-mono text-[10.5px] tracking-[0.08em] uppercase">
                    {map.quadrants.br}
                  </span>

                  {/* players */}
                  {map.players.map((player, i) => (
                    <motion.div
                      key={player.name}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + i * 0.12,
                        ease: EASE_SILK,
                      }}
                      whileHover={{ scale: 1.06, zIndex: 20 }}
                      style={{ top: `${player.top}%`, left: `${player.left}%` }}
                      className={cn(
                        "absolute rounded-xl px-3.5 py-2.5 text-[13.5px] leading-tight shadow-sm",
                        player.golem
                          ? "bg-leaf border-leaf z-10 border text-white shadow-[0_8px_30px_-6px_rgba(30,122,86,0.6)]"
                          : "border-line bg-paper border",
                      )}
                    >
                      {player.golem ? (
                        <motion.span
                          aria-hidden
                          className="border-leaf/40 absolute -inset-1 rounded-xl border"
                          animate={{
                            opacity: [0.6, 0, 0.6],
                            scale: [1, 1.12, 1],
                          }}
                          transition={{ duration: 2.4, repeat: Infinity }}
                        />
                      ) : null}
                      <b
                        className={cn(
                          "block font-semibold",
                          player.golem ? "text-white" : "text-ink",
                        )}
                      >
                        {player.name}
                      </b>
                      <span
                        className={cn(
                          "hidden text-xs sm:block",
                          player.golem ? "text-[#CBEBDA]" : "text-fog",
                        )}
                      >
                        {player.note}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* axis labels */}
                <div className="text-fog mt-4 flex justify-between font-mono text-[11px]">
                  <span>{map.axis.left}</span>
                  <span>{map.axis.right}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* notes — scroll-driven on the right (desktop) */}
          <div className="lg:order-2">
            <Reveal>
              <h3 className="text-ink text-xl font-semibold">
                {map.notes.title}
              </h3>
            </Reveal>
            <div className="mt-6 space-y-8 lg:mt-8 lg:space-y-0">
              {map.notes.items.map((item) => (
                <div
                  key={item.lead}
                  className="lg:flex lg:min-h-[36vh] lg:items-start"
                >
                  <ScrollNote lead={item.lead} rest={item.rest} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface ScrollNoteProps {
  lead: string;
  rest: string;
}

/**
 * A single "why the corner stays empty" paragraph whose fade + rise is driven
 * by scroll position (not a one-shot reveal), so it animates as the reader
 * scrolls past the pinned chart. Honors `prefers-reduced-motion`.
 */
function ScrollNote({ lead, rest }: ScrollNoteProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.2"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (prefersReduced) {
    return (
      <p className="text-fog text-[16px]">
        <b className="text-ink font-semibold">{lead}</b>
        {rest}
      </p>
    );
  }

  return (
    <motion.p ref={ref} style={{ opacity, y }} className="text-fog text-[16px]">
      <b className="text-ink font-semibold">{lead}</b>
      {rest}
    </motion.p>
  );
}
