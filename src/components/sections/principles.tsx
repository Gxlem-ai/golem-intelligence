"use client";

import { motion } from "framer-motion";
import { principles } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Principles() {
  return (
    <section className="bg-spruce pb-20">
      <Container>
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {principles.map((p, i) => (
            <StaggerItem key={p.title} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-spruce-2 group relative h-full p-8"
              >
                <div className="text-mint/40 font-mono text-xs">0{i + 1}</div>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] text-[#B8C9BF]">{p.body}</p>
                <div className="from-leaf to-mint absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full" />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
