import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";

import MainLayout from "@/layout/main-layout";
import ProgressLayout from "@/layout/progress-layout";
import LazyCursorTrail from "@/components/optimized/lazy-cursor-trail";
import { performanceUtils } from "@/utils/performance";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Performance monitoring
  useEffect(() => {
    performanceUtils.mark("app-hydrated");

    // Prefetch critical pages
    const criticalRoutes = ["/about", "/projects"];
    criticalRoutes.forEach((route) => {
      performanceUtils.prefetchPage(route);
    });

    // Report Core Web Vitals
    const reportWebVitals = async () => {
      const [cls, lcp, fid] = await Promise.all([
        performanceUtils.getCLS(),
        performanceUtils.getLCP(),
        performanceUtils.getFID(),
      ]);

      if (process.env.NODE_ENV === "development") {
        console.log("Core Web Vitals:", { cls, lcp, fid });
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === "production") {
        // Send to your analytics service
      }
    };

    const timer = setTimeout(reportWebVitals, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false} // Disable system theme detection for better performance
      >
        <ProgressLayout>
          <MainLayout>
            <AnimatePresence
              mode="wait"
              initial={false}
              onExitComplete={() => {
                // Scroll to top on route change
                window.scrollTo(0, 0);
              }}
            >
              {/* Lazy load cursor trail only on desktop */}
              <LazyCursorTrail className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
              <Component key={router.asPath} {...pageProps} />
            </AnimatePresence>
          </MainLayout>
        </ProgressLayout>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
