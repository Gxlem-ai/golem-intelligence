"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { GolemLogo } from "@/components/ui/golem-logo";
import { Magnetic } from "@/components/motion/magnetic";
import { EASE_SILK } from "@/lib/motion";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_SILK }}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "bg-spruce/80 border-white/10 backdrop-blur-xl"
          : "bg-spruce border-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between text-[#EAF2EC]">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-[21px] font-bold tracking-tight"
          >
            <motion.span
              whileHover={{ rotate: -12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="text-mint"
            >
              <GolemLogo size={22} />
            </motion.span>
            <span className="font-display">{nav.brand}</span>
          </a>

          <div className="hidden items-center gap-7 text-[14.5px] md:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[#B8C9BF] transition-colors hover:text-white"
              >
                {link.label}
                <span className="bg-mint absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Magnetic>
              <a
                href={nav.cta.href}
                className="bg-copper inline-block rounded-lg px-5 py-2.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#A85F23]"
              >
                {nav.cta.label}
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-[#EAF2EC] md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SILK }}
            className="bg-spruce overflow-hidden border-t border-white/10 md:hidden"
          >
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {nav.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-3 text-[#B8C9BF] transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={nav.cta.href}
                  onClick={() => setOpen(false)}
                  className="bg-copper mt-2 rounded-lg px-5 py-3 text-center font-semibold text-white"
                >
                  {nav.cta.label}
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
