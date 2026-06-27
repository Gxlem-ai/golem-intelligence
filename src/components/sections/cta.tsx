"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function CTA() {
  return (
    <section
      id="pilot"
      className="border-line bg-card relative overflow-hidden border-t py-28 text-center"
    >
      {/* soft radial glow */}
      <motion.div
        aria-hidden
        className="bg-leaf/10 pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative">
        <Reveal>
          <span className="text-leaf font-mono text-xs tracking-[0.14em] uppercase">
            {cta.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-ink mx-auto mt-5 max-w-[24ch] text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-semibold">
            {cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-fog mx-auto mt-5 max-w-[52ch] text-[17.5px]">
            {cta.body}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex justify-center">
            <Magnetic strength={10}>
              <a
                href={cta.button.href}
                className="bg-leaf group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_40px_-12px_rgba(30,122,86,0.6)] transition-colors hover:bg-[#176546]"
              >
                {cta.button.label}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
