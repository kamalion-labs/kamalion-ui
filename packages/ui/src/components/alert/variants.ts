import { cva } from "class-variance-authority";

export const alertVariants = cva(
  [
    "alert",
    "flex items-start gap-3",
    "rounded-(--radius-card) border p-4",
    "text-(--color-foreground)",
  ],
  {
    variants: {
      variant: {
        info: "border-(--color-info-soft) bg-(--color-info-soft)",
        success: "border-(--color-success-soft) bg-(--color-success-soft)",
        warning: "border-(--color-warning-soft) bg-(--color-warning-soft)",
        danger: "border-(--color-danger-soft) bg-(--color-danger-soft)",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export const alertIconColor: Record<string, string> = {
  info: "text-(--color-info)",
  success: "text-(--color-success)",
  warning: "text-(--color-warning)",
  danger: "text-(--color-danger)",
};
