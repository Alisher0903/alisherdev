import React, { ReactNode } from "react";

interface ScreenReaderOnlyProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Component for content that should only be visible to screen readers
 */
export default function ScreenReaderOnly({
  children,
  as: Component = "span",
}: ScreenReaderOnlyProps) {
  return <Component className="sr-only">{children}</Component>;
}
