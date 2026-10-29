"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Dialog from "./Dialog";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const menuRef = useRef<HTMLDialogElement>(null);
  // The menu button is md:hidden, so close the menu once the desktop nav takes over.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) menuRef.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        className="text-gray-300 md:hidden"
        onClick={() => menuRef.current?.showModal()}
      >
        <Bars3Icon className="h-8 w-8" aria-hidden="true" />
      </button>
      <Dialog
        dialogRef={menuRef}
        label="navigation menu"
        className="m-0 ml-auto h-dvh max-h-none w-3/4 max-w-sm bg-gray-900 text-white p-6 backdrop:bg-black/60"
      >
        {/* Close when a link is followed in this tab, including the link to the current page. */}
        <div
          onClick={(event) => {
            const openedElsewhere =
              event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
            if (
              !openedElsewhere &&
              (event.target as HTMLElement).closest("a")
            ) {
              menuRef.current?.close();
            }
          }}
        >
          {children}
        </div>
      </Dialog>
    </>
  );
}
