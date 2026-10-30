// The AU monogram. Decorative: the link around it carries the name.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="14"
        className="fill-surface stroke-border"
        strokeWidth="2"
      />
      <path d="M10 48 L21 16 L32 48 M14 38 H28" className="stroke-foreground" />
      <path d="M38 16 V38 A9 9 0 0 0 56 38 V16" className="stroke-accent" />
    </svg>
  );
}
