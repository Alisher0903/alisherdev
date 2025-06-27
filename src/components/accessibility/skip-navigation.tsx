import { forwardRef } from "react";

/**
 * Skip navigation component for keyboard users
 * Allows quick navigation to main content
 */
const SkipNavigation = forwardRef<HTMLAnchorElement>((_, ref) => {
  return (
    <a
      ref={ref}
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-accent"
    >
      Skip to main content
    </a>
  );
});

SkipNavigation.displayName = "SkipNavigation";

export default SkipNavigation;
