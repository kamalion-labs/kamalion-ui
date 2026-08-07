import { cva } from "class-variance-authority";

export const alertVariants = cva(
  [
    "alert",
    "flex items-start gap-3",
    // Flat at rest per the Border-First Elevation Rule — a callout is not
    // elevated above the surface it sits on.
    "rounded-(--radius-card) border p-4",
    "text-(--color-foreground) transition-colors",
  ],
  {
    variants: {
      // The border is a DIFFERENT token from the fill. Painting both with the
      // `-soft` tint composites the same 10% colour twice over the same
      // surface, which lands far too weak to read as a border at all.
      variant: {
        info: "border-(--color-info-border) bg-(--color-info-soft)",
        success: "border-(--color-success-border) bg-(--color-success-soft)",
        warning: "border-(--color-warning-border) bg-(--color-warning-soft)",
        danger: "border-(--color-danger-border) bg-(--color-danger-soft)",
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
