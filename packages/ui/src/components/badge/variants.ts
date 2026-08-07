import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "badge",
    "inline-flex items-center gap-1.5 whitespace-nowrap",
    "rounded-(--radius-pill)",
    // `leading-none` + an explicit height: previously `py-0.5` on `text-xs`
    // produced a ~20px pill that aligned to no control height in the system.
    "font-medium tracking-tight",
    "transition-colors",
    "[&_svg]:size-3 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-(--color-surface-panel-muted) text-(--color-foreground)",
        accent: "bg-(--color-accent-soft) text-(--color-accent)",
        success: "bg-(--color-success-soft) text-(--color-success)",
        warning: "bg-(--color-warning-soft) text-(--color-warning)",
        danger: "bg-(--color-danger-soft) text-(--color-danger)",
        info: "bg-(--color-info-soft) text-(--color-info)",
        outline: "border border-(--color-border) text-(--color-foreground)",
      },
      size: {
        sm: "h-5 px-2 text-[0.6875rem]",
        md: "h-6 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
