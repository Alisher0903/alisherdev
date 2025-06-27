import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import FadeUp from "@/animation/fade-up";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function LandingHero() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer && !prefersReducedMotion) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!prefersReducedMotion) {
        setScrollY(window.scrollY);
      }
    };

    if (!prefersReducedMotion) {
      document.addEventListener("scroll", handleScroll);
      return () => document.removeEventListener("scroll", handleScroll);
    }
  }, [prefersReducedMotion]);

  return (
    <motion.section
      animate={
        prefersReducedMotion
          ? {}
          : {
              transform: `translateY(${progress * 20}vh)`,
            }
      }
      transition={
        prefersReducedMotion ? {} : { type: "spring", stiffness: 100 }
      }
      ref={ref}
      className="pointer-events-none flex max-h-[1000px] min-h-[calc(100vh-200px)] items-center px-6 sm:px-14 md:h-[calc(100vh-200px)] md:min-h-max md:px-20"
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence>
            <FadeUp key="title-main" duration={0.6}>
              <header>
                <h1 className="font-heading bg-accent bg-clip-text py-2 text-5xl font-bold text-transparent sm:text-6xl md:text-7xl xl:text-8xl">
                  Alisher Sodiqov
                </h1>
                <p
                  className="text-xl font-medium text-zinc-900 dark:text-zinc-100 md:text-3xl"
                  role="doc-subtitle"
                >
                  Frontend Developer
                </p>
              </header>
            </FadeUp>
            <FadeUp key="description" duration={0.6} delay={0.2}>
              <section aria-labelledby="developer-intro">
                <h2 id="developer-intro" className="sr-only">
                  Developer Introduction
                </h2>
                <p className="mt-8 max-w-3xl text-base font-normal text-zinc-700 dark:text-zinc-300 sm:text-base md:text-xl leading-relaxed">
                  I&apos;m a frontend developer passionate about creating beautiful and functional web applications. I specialize in React, Next.js, and modern web technologies to build engaging user experiences.
                </p>
              </section>
            </FadeUp>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
