import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    // Base
    "button",
    // Alignment
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    // Typography
    "font-medium",
    // Theme customization
    "rounded-(--button-radius)",
    // Animations
    "transition-all duration-150 ease-out active:scale-[0.98]",
    // Focus / disabled
    "outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-panel)",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        solid:
          "bg-(--button-solid-bg) text-(--button-solid-fg) hover:bg-(--button-solid-bg-hover) active:bg-(--button-solid-bg-active)",
        soft: "bg-(--button-soft-bg) text-(--button-soft-fg) hover:bg-(--button-soft-bg-hover)",
        outline:
          "border border-(--button-outline-border) text-(--button-outline-fg) hover:bg-(--button-outline-bg-hover)",
        ghost:
          "text-(--button-ghost-fg) hover:bg-(--button-ghost-bg-hover)",
        danger:
          "bg-(--button-danger-bg) text-(--button-danger-fg) hover:bg-(--button-danger-bg-hover)",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);
