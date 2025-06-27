import React, { useMemo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface OptimizedAnimationProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideIn" | "scale";
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

const OptimizedAnimation: React.FC<OptimizedAnimationProps> = ({
  children,
  animation = "fadeUp",
  duration = 0.6,
  delay = 0,
  className = "",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Memoize animation variants to prevent re-creation
  const variants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    switch (animation) {
      case "fadeUp":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slideIn":
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        };
    }
  }, [animation, shouldReduceMotion]);

  const transition = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0.1 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: "easeOut" as const,
    }),
    [duration, delay, shouldReduceMotion],
  );

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transition}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};

export default OptimizedAnimation;
