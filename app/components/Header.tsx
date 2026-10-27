"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { navigation, site } from "@/data/site";
import Dialog from "./Dialog";

export default function Header() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  // The menu button is md:hidden, so close the menu once the desktop nav takes over.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) menuRef.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  const links = (mobile: boolean) =>
    navigation
      .filter((link) => mobile || link.href !== "/")
      .map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`block hover:text-primary transition-colors ${mobile ? "text-lg" : ""} ${isActive(link.href) ? "border-b-2 border-primary" : ""}`}
            onClick={() => menuRef.current?.close()}
          >
            {link.label}
          </Link>
        </li>
      ));
  return (
    <header className="bg-background sticky top-0 z-40">
      <nav
        className="container mx-auto px-4 py-4 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/logo-new.webp"
            alt={`${site.name} Portfolio Logo`}
            width={48}
            height={48}
            className="rounded object-cover"
          />
        </Link>
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
          <ul className="mt-16 space-y-6">{links(true)}</ul>
        </Dialog>
        <ul className="hidden md:flex space-x-6">{links(false)}</ul>
      </nav>
    </header>
  );
}
