import { useCallback, useRef } from "react";

/**
 * Hook for announcing messages to screen readers
 * Creates a live region for dynamic content announcements
 */
export function useAnnounce() {
  const announceRef = useRef<HTMLDivElement | null>(null);

  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      if (!announceRef.current) {
        // Create live region if it doesn't exist
        const liveRegion = document.createElement("div");
        liveRegion.setAttribute("aria-live", priority);
        liveRegion.setAttribute("aria-atomic", "true");
        liveRegion.className = "sr-only";
        liveRegion.id = "live-announce";
        document.body.appendChild(liveRegion);
        announceRef.current = liveRegion;
      }

      // Clear previous message
      announceRef.current.textContent = "";

      // Add new message with slight delay to ensure screen readers pick it up
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = message;
        }
      }, 100);
    },
    [],
  );

  return announce;
}
