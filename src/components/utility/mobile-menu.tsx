import React, { Dispatch, Fragment, SetStateAction } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";

import ThemeSwitch from "@/components/utility/theme-switch";
import { type NavbarProps } from "@/layout/navbar";
import { classNames } from "@/utility/classNames";
import { useFocusTrap } from "@/hooks/use-focus-trap";

export interface MobileMenuProps extends NavbarProps {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  openMenu,
  routes,
  setOpenMenu,
}: MobileMenuProps) {
  const pathName = usePathname();
  const router = useRouter();
  const containerRef = useFocusTrap(openMenu);

  const handleClick = (href: string) => {
    setOpenMenu(false);
    router.push(href);
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(href);
    }
  };

  return (
    <Transition show={openMenu} as={Fragment}>
      <Dialog
        as="div"
        className="z-50"
        onClose={setOpenMenu}
        aria-labelledby="mobile-menu-title"
        aria-describedby="mobile-menu-description"
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 bottom-full"
            enterTo="opacity-100 bottom-[15%]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 bottom-[15%]"
            leaveTo="opacity-0 bottom-full"
          >
            <Dialog.Panel
              ref={containerRef as React.RefObject<HTMLDivElement>}
              id="mobile-menu"
              className="pointer-events-none absolute flex min-h-[85%] w-full flex-col items-center justify-center overflow-y-auto rounded-b-2xl border-2 border-accent/20 bg-background px-6 py-8 text-accent shadow-lg shadow-accent/10 md:px-10 md:py-16"
            >
              <div className="pointer-events-auto flex flex-col items-center gap-6 text-center">
                <h2 id="mobile-menu-title" className="sr-only">
                  Mobile Navigation Menu
                </h2>
                <div id="mobile-menu-description" className="sr-only">
                  Use arrow keys to navigate, Enter or Space to select, Escape
                  to close
                </div>

                <nav aria-label="Mobile navigation" role="navigation">
                  <ul className="flex flex-col items-center gap-6" role="list">
                    {routes.map((link, i) => {
                      const isActive = pathName === link.href;
                      const isExternalLink = link.href === "/resume.pdf";

                      return (
                        <li key={i} role="listitem">
                          <button
                            className="group relative rounded-lg px-4 py-2 text-3xl font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                            onClick={() => handleClick(link.href)}
                            onKeyDown={(e) => handleKeyDown(e, link.href)}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span
                              className={classNames(
                                isActive ? "w-full" : "w-0",
                                "absolute -bottom-1 left-0 h-1 rounded-lg bg-accent transition-[width] duration-300 group-hover:w-full",
                              )}
                            ></span>
                            {link.title}
                            {isExternalLink && (
                              <span className="sr-only">
                                {" "}
                                (opens in new tab)
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="flex flex-col items-center gap-4">
                  <ThemeSwitch setClose={setOpenMenu} />
                </div>
              </div>
              <div className="absolute bottom-0 py-6 text-sm">
                ©2023 Alisher Sodiqov
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
