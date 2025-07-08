import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceTop = rect.top;
        const spaceBottom = window.innerHeight - rect.bottom;
        const spaceLeft = rect.left;
        const spaceRight = window.innerWidth - rect.right;

        // Auto-adjust position based on available space
        let newPosition = position;
        if (position === "top" && spaceTop < 50) {
          newPosition = spaceBottom > spaceTop ? "bottom" : "top";
        } else if (position === "bottom" && spaceBottom < 50) {
          newPosition = spaceTop > spaceBottom ? "top" : "bottom";
        } else if (position === "left" && spaceLeft < 100) {
          newPosition = spaceRight > spaceLeft ? "right" : "left";
        } else if (position === "right" && spaceRight < 100) {
          newPosition = spaceLeft > spaceRight ? "left" : "right";
        }

        setActualPosition(newPosition);
      }
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionClasses = () => {
    const baseClasses = "absolute z-50 whitespace-nowrap";

    switch (actualPosition) {
      case "top":
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-2`;
      case "bottom":
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 mt-2`;
      case "left":
        return `${baseClasses} right-full top-1/2 -translate-y-1/2 mr-2`;
      case "right":
        return `${baseClasses} left-full top-1/2 -translate-y-1/2 ml-2`;
      default:
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-2`;
    }
  };

  const getArrowClasses = () => {
    const baseClasses =
      "absolute w-2 h-2 bg-zinc-800 dark:bg-zinc-200 transform rotate-45";

    switch (actualPosition) {
      case "top":
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -mt-1`;
      case "bottom":
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 -mb-1`;
      case "left":
        return `${baseClasses} left-full top-1/2 -translate-y-1/2 -ml-1`;
      case "right":
        return `${baseClasses} right-full top-1/2 -translate-y-1/2 -mr-1`;
      default:
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -mt-1`;
    }
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: actualPosition === "top" ? 10 : actualPosition === "bottom" ? -10 : 0,
      x: actualPosition === "left" ? 10 : actualPosition === "right" ? -10 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: actualPosition === "top" ? 10 : actualPosition === "bottom" ? -10 : 0,
      x: actualPosition === "left" ? 10 : actualPosition === "right" ? -10 : 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={getPositionClasses()}
            role="tooltip"
            aria-hidden={!isVisible}
          >
            <div className="bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 text-xs font-medium px-2 py-1 rounded-md shadow-lg border border-zinc-600 dark:border-zinc-300">
              {content}
              <div className={getArrowClasses()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utility hook for tooltip
export function useTooltip() {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return {
    isVisible,
    showTooltip,
    hideTooltip,
    tooltipProps: {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
    },
  };
}
