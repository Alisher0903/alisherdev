import { ReactNode } from "react";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface FadeUpProps {
  children: ReactNode;
  duration: number;
  delay?: number;
  whileInView?: boolean;
}

export default function FadeUp({
  children,
  duration,
  delay,
  whileInView = false,
}: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();

  const animation = {
    opacity: 1,
    y: prefersReducedMotion ? 0 : 0,
  };

  const transitionConfig = {
    duration: prefersReducedMotion ? 0 : duration,
    ease: "easeOut" as const,
    delay: prefersReducedMotion ? 0 : delay,
  };

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { y: 200, opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView ? animation : {}}
      animate={!whileInView ? animation : {}}
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  );
}
