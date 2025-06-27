import { ReactNode } from "react";

import { motion } from "framer-motion";

export interface FadeRightProps {
  children: ReactNode;
  duration: number;
  delay?: number;
  className?: string;
  whileInView?: boolean;
}

export default function FadeRight({
  children,
  duration,
  delay,
  className,
  whileInView = false,
}: FadeRightProps) {
  const animation = {
    opacity: 1,
    x: 0,
  };

  const transitionConfig = {
    duration,
    ease: "easeOut" as const,
    delay,
  };
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={whileInView ? animation : undefined}
      animate={!whileInView ? animation : undefined}
      transition={transitionConfig}
      className={className}
    >
      {children}
    </motion.div>
  );
}
