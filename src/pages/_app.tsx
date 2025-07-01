import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";

import MainLayout from "@/layout/main-layout";
import CursorTrailCanvas from "@/components/cursor-trail-canvas";
import Scripts from "@/components/seo/script";
import ProgressLayout from "@/layout/progress-layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ProgressLayout>
          <MainLayout>
            <AnimatePresence mode="wait" initial={false}>
              <CursorTrailCanvas className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
              <Component key={router.asPath} {...pageProps} />
              <Scripts />
            </AnimatePresence>
          </MainLayout>
        </ProgressLayout>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
