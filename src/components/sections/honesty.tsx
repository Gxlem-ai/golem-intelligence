"use client";

import { motion } from "framer-motion";
import { honesty } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Honesty() {
  return (
    <section
      id="honesty"
      className="bg-spruce bg-grid relative overflow-hidden py-24"
    >
      <Container className="relative">
        <SectionHeading
          eyebrow={honesty.eyebrow}
          title={honesty.title}
          body={honesty.body}
          dark
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {honesty.cards.map((card) => (
            <StaggerItem key={card.strike} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-spruce-2 h-full rounded-2xl border border-white/10 p-7"
              >
                <h3 className="text-lg font-semibold text-white">
                  {card.prefix}
                  <s className="text-[#E08B8B] decoration-2">{card.strike}</s>
                </h3>
                <p className="mt-2.5 text-[15px] text-[#B8C9BF]">
                  {card.body}
                  <b className="text-mint font-semibold">{card.bold}</b>
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
