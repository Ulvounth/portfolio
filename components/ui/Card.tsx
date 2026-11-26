import type { HTMLAttributes } from "react";

// A bordered surface. `interactive` adds the hover state for cards that link somewhere.
export default function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li";
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
