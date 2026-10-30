import Link from "next/link";
import type { ComponentProps } from "react";

// `not-disabled:` keeps a disabled button from reacting to hover; links are never :disabled.
const variants = {
  primary: "bg-accent text-on-accent not-disabled:hover:bg-accent-strong",
  secondary:
    "border border-accent text-accent not-disabled:hover:bg-surface-raised not-disabled:hover:text-accent-strong",
} as const;

const sizes = {
  md: "px-4 py-2",
  lg: "px-6 py-3",
} as const;

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type ButtonProps =
  | (Common & ComponentProps<"button"> & { href?: undefined })
  | (Common & ComponentProps<"a"> & { href: string });

// A button, or a link that looks like one when `href` is given. Internal paths use
// next/link; external URLs and downloads use a plain anchor.
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md font-medium text-center transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href === undefined) {
    // Defaulting `type` here also covers a caller that passes `type={undefined}`.
    const { type = "button", ...button } = props;
    return <button type={type} className={classes} {...button} />;
  }
  const { href, ...anchor } = props;
  if (href.startsWith("/") && anchor.download === undefined) {
    return <Link href={href} className={classes} {...anchor} />;
  }
  return <a href={href} className={classes} {...anchor} />;
}
