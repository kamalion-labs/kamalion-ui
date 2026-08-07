import { cva } from "class-variance-authority";

export const emptyStateVariants = cva(
  [
    "empty-state",
    "flex flex-col items-center justify-center text-center",
    "text-(--color-foreground-muted)",
  ],
  {
    variants: {
      size: {
        // Inline: fits inside a Card body or a table's empty row.
        sm: "gap-2 p-6",
        // Page-level: the whole panel is empty.
        md: "gap-3 p-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const emptyStateIconVariants = cva(
  [
    "empty-state-icon",
    "flex shrink-0 items-center justify-center rounded-(--radius-pill)",
    // Accent only as a quiet tint, never a saturated fill — an empty state is
    // not an action.
    "bg-(--color-accent-soft) text-(--color-accent)",
  ],
  {
    variants: {
      size: {
        sm: "mb-1 size-10 [&_svg]:size-5",
        md: "mb-1 size-12 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
