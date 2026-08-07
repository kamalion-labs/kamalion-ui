import { cva } from "class-variance-authority";

export const tabsListVariants = cva(
  ["tabs-list", "inline-flex items-center", "text-(--color-foreground-muted)"],
  {
    variants: {
      variant: {
        // Underline rail: the list carries the hairline, the active trigger
        // paints over it. Cheapest to scan in a dense CRM header.
        line: "gap-1 border-b border-(--color-border) w-full",
        // Bare pills on the panel surface, no track.
        pill: "gap-1",
        // Pills inside an inset track, for binary/ternary switches.
        segmented: [
          "gap-1 rounded-(--radius-pill) p-1",
          "border border-(--color-border) bg-(--color-surface-panel-muted)",
        ],
      },
      size: {
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      variant: "line",
      size: "md",
    },
  },
);

export const tabsTriggerVariants = cva(
  [
    "tabs-trigger",
    "focus-ring-inset inline-flex shrink-0 items-center gap-2 whitespace-nowrap",
    "font-medium",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-colors duration-(--duration-fast) ease-standard",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        line: [
          // -1px pulls the indicator onto the list's own hairline instead of
          // stacking a second line beneath it.
          "-mb-px border-b-2 border-transparent rounded-t-(--radius-inline)",
          "hover:text-(--color-foreground)",
          "data-[state=active]:border-(--color-accent) data-[state=active]:text-(--color-accent)",
        ],
        pill: [
          "rounded-(--radius-pill)",
          "hover:bg-(--color-surface-panel-muted) hover:text-(--color-foreground)",
          "data-[state=active]:bg-(--color-accent-soft) data-[state=active]:text-(--color-accent)",
        ],
        segmented: [
          "flex-1 justify-center rounded-(--radius-pill)",
          "hover:text-(--color-foreground)",
          "data-[state=active]:bg-(--color-surface-panel) data-[state=active]:text-(--color-foreground)",
          "data-[state=active]:shadow-(--shadow-raised)",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "line",
      size: "md",
    },
  },
);
