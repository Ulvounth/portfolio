import Link from "next/link";
import type { ComponentProps } from "react";

// An inline text link. Internal paths use next/link, everything else a plain anchor.
export default function TextLink({
  href,
  className = "",
  ...props
}: ComponentProps<"a"> & { href: string }) {
  const classes = `text-accent underline underline-offset-4 transition-colors hover:text-accent-strong ${className}`;
  if (href.startsWith("/")) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} className={classes} {...props} />;
}
