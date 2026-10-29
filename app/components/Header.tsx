import Link from "next/link";
import Image from "next/image";
import { navigation, site } from "@/data/site";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

export default function Header() {
  const links = (mobile: boolean) =>
    navigation
      .filter((link) => mobile || link.href !== "/")
      .map((link) => (
        <li key={link.href}>
          <NavLink href={link.href} label={link.label} mobile={mobile} />
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
            className="rounded-sm object-cover"
          />
        </Link>
        <MobileMenu>
          <ul className="mt-16 space-y-6">{links(true)}</ul>
        </MobileMenu>
        <ul className="hidden md:flex space-x-6">{links(false)}</ul>
      </nav>
    </header>
  );
}
