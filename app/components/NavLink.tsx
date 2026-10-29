"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  mobile?: boolean;
}

export default function NavLink({ href, label, mobile = false }: NavLinkProps) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block hover:text-primary transition-colors ${mobile ? "text-lg" : ""} ${active ? "border-b-2 border-primary" : ""}`}
    >
      {label}
    </Link>
  );
}
