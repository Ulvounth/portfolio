import type { ComponentProps } from "react";

// A small monospace label, for technologies and similar short facts.
export default function Tag({
  className = "",
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={`inline-block rounded-sm border border-border-control px-2 py-1 font-mono text-sm text-foreground ${className}`}
      {...props}
    />
  );
}
