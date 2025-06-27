// Performance monitoring utilities
export const performanceUtils = {
  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== "undefined" && window.performance) {
      performance.mark(name);
    }
  },

  // Measure performance between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== "undefined" && window.performance) {
      performance.measure(name, startMark, endMark);
    }
  },

  // Get Core Web Vitals
  getCLS: (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve(0);
        return;
      }

      // Use web-vitals library if available, otherwise return 0
      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve((lastEntry as any).value || 0);
          });
          observer.observe({ entryTypes: ["layout-shift"] });
        } catch {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    });
  },

  // Get Largest Contentful Paint
  getLCP: (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve(0);
        return;
      }

      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime || 0);
          });
          observer.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    });
  },

  // Get First Input Delay
  getFID: (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve(0);
        return;
      }

      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(
              (lastEntry as any).processingStart - lastEntry.startTime || 0,
            );
          });
          observer.observe({ entryTypes: ["first-input"] });
        } catch {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    });
  },

  // Preload critical resources
  preloadResource: (href: string, as: string, type?: string) => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  },

  // Prefetch next page resources
  prefetchPage: (href: string) => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  },

  // Optimize scroll performance
  optimizeScrollPerformance: () => {
    if (typeof window === "undefined") return;

    // Add smooth scrolling with reduced motion support
    const smoothScrollPolyfill = () => {
      if (!window.CSS || !CSS.supports("scroll-behavior", "smooth")) {
        // Fallback for browsers that don't support smooth scrolling
        const scrollToTop = () => {
          const c =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
          }
        };
        return scrollToTop;
      }
    };

    return smoothScrollPolyfill();
  },
};

// Bundle size analyzer helper
export const bundleSizeUtils = {
  // Analyze bundle size in development
  analyzeBundleSize: () => {
    if (process.env.NODE_ENV === "development") {
      console.log("Run 'npm run analyze' to analyze bundle size");
    }
  },

  // Log component render performance
  logRenderPerformance: (componentName: string, startTime: number) => {
    if (process.env.NODE_ENV === "development") {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      if (renderTime > 16) {
        // Warn if render takes longer than 16ms (60fps)
        console.warn(
          `${componentName} render took ${renderTime.toFixed(2)}ms (>16ms)`,
        );
      }
    }
  },
};
