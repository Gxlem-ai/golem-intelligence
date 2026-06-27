"use client";

import { motion } from "framer-motion";
import { tripod } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const sourceColor: Record<string, string> = {
  leaf: "text-leaf",
  market: "text-market",
  copper: "text-copper",
};

const accentBar: Record<string, string> = {
  leaf: "bg-leaf",
  market: "bg-market",
  copper: "bg-copper",
};

export function DataTripod() {
  return (
    <section id="data" className="bg-paper py-24">
      <Container>
        <SectionHeading
          eyebrow={tripod.eyebrow}
          title={tripod.title}
          body={tripod.body}
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {tripod.legs.map((leg) => (
            <StaggerItem key={leg.source} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="border-line bg-card group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl border p-8 shadow-[0_10px_40px_-24px_rgba(20,32,27,0.3)]"
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                    accentBar[leg.tone],
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[11.5px] tracking-[0.1em] uppercase",
                    sourceColor[leg.tone],
                  )}
                >
                  {leg.source}
                </span>
                <h3 className="text-ink text-xl font-semibold">{leg.title}</h3>
                <p className="text-fog flex-1 text-[15px]">{leg.body}</p>
                <div className="border-line text-fog border-t border-dashed pt-3.5 text-[13.5px]">
                  <b className="text-ink font-semibold">{leg.truthLead}</b>
                  {leg.truthRest}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
