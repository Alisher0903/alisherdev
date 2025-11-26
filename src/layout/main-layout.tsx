import { Inter, Playfair_Display } from "next/font/google";

import Footer from "@/layout/footer";
import Navbar from "@/layout/navbar";
import { ReactNode } from "react";
import SkipNavigation from "@/components/accessibility/skip-navigation";
import { classNames } from "@/utility/classNames";

// Modern, clean font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Elegant serif font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const routes = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Resume", href: "/resume" },
  ];

  return (
    <>
      <SkipNavigation />
      <div
        className={classNames(
          "min-h-screen",
          inter.variable,
          playfair.variable,
          inter.className,
        )}
      >
        <Navbar routes={routes} />
        <main id="main-content" tabIndex={-1}>
          {props.children}
        </main>
      </div>
      <Footer />
    </>
  );
}
