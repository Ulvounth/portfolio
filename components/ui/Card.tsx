import type { ComponentProps } from "react";

// A bordered surface. `interactive` adds the hover state for cards that link somewhere.
export default function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  ...props
}: ComponentProps<"div"> & {
  as?: "div" | "article" | "section";
  interactive?: boolean;
}) {
  return (
    <Tag
      className={`rounded-lg border border-border bg-surface ${
        interactive
          ? "transition-colors duration-300 hover:border-accent hover:bg-surface-raised"
          : ""
      } ${className}`}
      {...props}
    />
  );
}
