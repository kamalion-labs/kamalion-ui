import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "badge",
    "inline-flex items-center gap-1 whitespace-nowrap",
    "rounded-(--radius-pill) px-2.5 py-0.5",
    "text-xs font-medium",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-(--color-surface-panel-muted) text-(--color-foreground)",
        accent: "bg-(--color-accent-soft) text-(--color-accent)",
        success: "bg-(--color-success-soft) text-(--color-success)",
        warning: "bg-(--color-warning-soft) text-(--color-warning)",
        danger: "bg-(--color-danger-soft) text-(--color-danger)",
        info: "bg-(--color-info-soft) text-(--color-info)",
        outline:
          "border border-(--color-border) text-(--color-foreground)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
