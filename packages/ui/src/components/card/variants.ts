import { cva } from "class-variance-authority";

/**
 * Card surface.
 *
 * `flat` is the default and it is deliberately near-shadowless. `DESIGN.md` §4
 * states the Border-First Elevation Rule — surfaces separate with a 1px border
 * at rest, and a shadow means genuine Z-elevation. The old single style pulled
 * `--color-surface-panel-shadow`, which resolved to `shadow-2xl` in dark mode:
 * a resting card carrying the same elevation as a modal.
 */
export const cardVariants = cva(
  [
    "card",
    "flex flex-col",
    "rounded-(--radius-card) border border-(--color-surface-panel-border)",
    "bg-(--color-surface-panel) text-(--color-foreground)",
    "transition-[box-shadow,border-color,transform] duration-(--duration-normal) ease-standard",
  ],
  {
    variants: {
      variant: {
        /** At rest on the page. Border does the separating. */
        flat: "shadow-(--shadow-raised)",
        /** Genuinely lifted above its surroundings. */
        elevated: "shadow-(--shadow-overlay)",
        /** Clickable card — lifts and brightens its border on hover. */
        interactive: [
          "cursor-pointer shadow-(--shadow-raised)",
          "hover:border-(--color-border-hover) hover:shadow-(--shadow-raised-hover)",
          "active:scale-[0.995]",
          "outline-none focus-ring",
        ],
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  },
);
