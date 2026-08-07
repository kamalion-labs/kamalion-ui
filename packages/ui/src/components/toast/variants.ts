import { cva } from "class-variance-authority";

/**
 * Toast card.
 *
 * The previous design carried status on a `border-l-4` colour stripe. That is
 * an explicit anti-reference in `PRODUCT.md` ("side-stripe accent borders")
 * and in `DESIGN.md` §6. Status now rides on a tinted icon chip instead, which
 * is also strictly better for accessibility: the meaning is carried by icon
 * SHAPE as well as colour, so it survives colour-blindness and greyscale.
 */
export const toastVariants = cva(
  [
    "toast",
    // The viewport is `pointer-events-none` so it never blocks the page when
    // empty; each card opts itself back in.
    "pointer-events-auto flex items-start gap-3",
    "w-80 rounded-(--radius-card) border border-(--color-surface-panel-border) p-4",
    "bg-(--color-surface-panel) text-(--color-foreground) shadow-(--shadow-modal)",
  ],
  {
    variants: {
      variant: {
        default: "",
        success: "",
        danger: "",
        warning: "",
        info: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Tinted chip behind the status icon — carries the tone without a stripe. */
export const toastIconChip: Record<string, string> = {
  default: "bg-(--color-surface-panel-muted) text-(--color-foreground-muted)",
  success: "bg-(--color-success-soft) text-(--color-success)",
  danger: "bg-(--color-danger-soft) text-(--color-danger)",
  warning: "bg-(--color-warning-soft) text-(--color-warning)",
  info: "bg-(--color-info-soft) text-(--color-info)",
};
