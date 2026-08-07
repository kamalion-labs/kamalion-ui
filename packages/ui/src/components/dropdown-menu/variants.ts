import { cva } from "class-variance-authority";

/** Shared surface for Content and SubContent, matched to Popover so the two
 *  floating layers read as one system. */
export const dropdownMenuSurface = [
  "z-50 min-w-48 rounded-(--radius-card) p-1.5",
  "border border-(--color-surface-panel-border) bg-(--color-surface-panel)",
  "text-(--color-foreground) shadow-(--shadow-overlay) outline-none",
  "origin-(--radix-dropdown-menu-content-transform-origin)",
  "duration-(--duration-fast) ease-standard",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
  "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
];

export const dropdownMenuItemVariants = cva(
  [
    "dropdown-menu-item",
    "relative flex cursor-default items-center gap-2.5 select-none",
    "rounded-(--radius-card) px-3 py-2 text-sm outline-none",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "transition-colors duration-(--duration-instant) ease-standard",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // `data-[highlighted]` covers both hover and keyboard focus, which is
        // why there is no separate hover: rule — Radix drives them together.
        default:
          "data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)",
        danger: [
          "text-(--color-danger)",
          "data-[highlighted]:bg-(--color-danger-soft) data-[highlighted]:text-(--color-danger)",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
