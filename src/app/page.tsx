import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { PositioningMap } from "@/components/sections/positioning-map";
import { Edges } from "@/components/sections/edges";
import { DataTripod } from "@/components/sections/data-tripod";
import { Honesty } from "@/components/sections/honesty";
import { CTA } from "@/components/sections/cta";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <Principles />
        <PositioningMap />
        <Edges />
        <DataTripod />
        <Honesty />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
