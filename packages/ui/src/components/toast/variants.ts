import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "toast",
    "flex items-start gap-3",
    "w-80 rounded-(--radius-card) border p-4",
    "bg-(--color-surface-panel) text-(--color-foreground) shadow-(--shadow-panel)",
    "border-l-4",
  ],
  {
    variants: {
      variant: {
        default: "border-(--color-surface-panel-border) border-l-(--color-border)",
        success: "border-(--color-surface-panel-border) border-l-(--color-success)",
        danger: "border-(--color-surface-panel-border) border-l-(--color-danger)",
        warning: "border-(--color-surface-panel-border) border-l-(--color-warning)",
        info: "border-(--color-surface-panel-border) border-l-(--color-info)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
