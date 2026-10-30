import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { navigation } from "@/data/site";
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
          <Logo className="h-12 w-12" />
        </Link>
        <MobileMenu>
          <ul className="mt-16 space-y-6">{links(true)}</ul>
        </MobileMenu>
        <ul className="hidden md:flex space-x-6">{links(false)}</ul>
      </nav>
    </header>
  );
}
