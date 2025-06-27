import React, { lazy, Suspense } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Lazy load the cursor trail component
const CursorTrailCanvas = lazy(
  () => import("@/components/cursor-trail-canvas"),
);

interface LazyCursorTrailProps {
  className?: string;
  color?: string;
}

const LazyCursorTrail: React.FC<LazyCursorTrailProps> = ({
  className = "",
  color,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Don't render cursor trail if motion is reduced or on mobile
  if (
    shouldReduceMotion ||
    (typeof window !== "undefined" && window.innerWidth < 768)
  ) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <CursorTrailCanvas className={className} color={color} />
    </Suspense>
  );
};

export default LazyCursorTrail;
