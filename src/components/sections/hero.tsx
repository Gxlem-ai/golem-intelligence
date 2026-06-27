"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Chip } from "@/components/ui/chip";
import { Magnetic } from "@/components/motion/magnetic";
import { AskGolemExchange } from "@/components/sections/ask-golem-exchange";
import { fadeUp } from "@/lib/motion";

/** Live equalizer-style waveform — a refined nod to the original glyph accent. */
function Waveform() {
  const bars = [0.4, 0.75, 0.5, 1, 0.65, 0.9, 0.45, 0.8, 0.55, 0.7, 0.35];
  return (
    <span
      className="ml-3 inline-flex h-[0.9em] items-end gap-[3px] align-middle"
      aria-hidden
    >
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="bg-mint w-[3px] rounded-full"
          style={{ height: `${h * 100}%` }}
          animate={{ scaleY: [h, h * 0.35, h * 1.05, h * 0.5, h] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="bg-spruce relative overflow-hidden pt-20 pb-24 sm:pt-24"
    >
      {/* aurora blobs */}
      <motion.div
        aria-hidden
        className="bg-leaf/25 pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="bg-copper/15 pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* left column */}
          <div>
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-mint-bright font-mono text-xs tracking-[0.14em] uppercase"
            >
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] font-semibold text-white"
            >
              {hero.titleLead} <span className="text-mint">→</span>{" "}
              {hero.titleMid},
              <br />
              <span className="text-gradient-mint">{hero.titleAccent}</span>
              <Waveform />
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-[48ch] text-lg text-[#B8C9BF]"
            >
              {hero.lede}
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap gap-3.5"
            >
              <Magnetic>
                <a
                  href={hero.primaryCta.href}
                  className="bg-copper group inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors hover:bg-[#A85F23]"
                >
                  {hero.primaryCta.label}
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </Magnetic>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center rounded-lg border border-white/15 px-6 py-3 font-semibold text-[#EAF2EC] transition-colors hover:border-white"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {hero.chips.map((chip) => (
                <Chip key={chip.label} tone={chip.tone} dark>
                  {chip.label}
                </Chip>
              ))}
            </motion.div>
          </div>

          {/* right column — static exchange */}
          <div>
            <AskGolemExchange />
          </div>
        </div>
      </Container>
    </section>
  );
}
