// Shared by the form controls so they look the same and share one focus treatment.
// No radius here: callers add their own, so two rounded-* classes never compete.
export const fieldClasses =
  "w-full border border-border-control bg-surface p-2 text-foreground focus:border-accent disabled:opacity-50";
