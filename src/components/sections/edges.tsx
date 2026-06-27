"use client";

import { motion } from "framer-motion";
import { edges } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Edges() {
  return (
    <section className="border-line bg-card border-y py-24">
      <Container>
        <SectionHeading
          eyebrow={edges.eyebrow}
          title={edges.title}
          body={edges.body}
        />

        <div className="border-line mt-14 overflow-hidden rounded-2xl border">
          {edges.items.map((item, i) => (
            <Reveal key={item.rank} delay={i * 0.05} amount={0.3}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(30,122,86,0.04)" }}
                className="bg-paper border-line grid gap-6 border-b p-8 last:border-b-0 sm:grid-cols-[140px_1fr_240px] sm:p-9"
              >
                <div className="flex items-baseline gap-3 sm:block">
                  <span className="text-leaf font-mono text-[13px]">edge</span>
                  <span className="text-ink font-display block text-[34px] leading-none font-semibold">
                    {item.rank}
                  </span>
                </div>

                <div>
                  <h3 className="text-ink text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-fog mt-2 max-w-[56ch] text-[15.5px]">
                    {item.body}
                  </p>
                </div>

                <div className="border-line bg-card text-fog flex items-center rounded-xl border p-4 font-mono text-xs leading-relaxed">
                  {item.aside}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
