import { cva, type VariantProps } from "class-variance-authority";

/**
 * Field-control geometry.
 *
 * Mirrors `buttonVariants` deliberately: the `sm / md / lg` heights are the
 * SAME ramp (32 / 40 / 48px), so an Input and a Button on one row line up.
 * Before this existed, `controlBase` computed to 38px against the Button's
 * 40px and every form row was 2px out.
 *
 * Shape is two-tier by design. Action controls (Button, Badge, sidebar pills)
 * are capsules — that is the theme's identity. Field controls are
 * `--radius-control` (8px) so the radius ramp stays strictly descending
 * (panel 16 → card 12 → control 8 → inline 6) and a field never dissolves into
 * the card containing it. `shape="pill"` is the escape hatch for search bars,
 * which the theme guide does want as capsules.
 */

const controlBaseClasses = [
  "input-control",
  "w-full rounded-(--radius-control) border border-(--color-border)",
  "bg-(--color-surface-panel) text-(--color-foreground)",
  "placeholder:text-(--color-foreground-subtle)",
  "transition-[color,background-color,border-color,box-shadow] ease-standard",
  // Focus is the shared `focus-ring` recipe (outline-based) — never a local
  // ring stack. `outline-none` only suppresses the UA default; the
  // `:focus-visible` rule inside `focus-ring` outranks it on specificity.
  "outline-none focus-ring",
  "focus:border-(--color-accent)",
  "hover:not-focus:border-(--color-border-hover)",
  "disabled:cursor-not-allowed disabled:bg-(--color-surface-panel-muted) disabled:opacity-60",
  "aria-[invalid=true]:border-(--color-danger)",
];

export const controlVariants = cva(controlBaseClasses, {
  variants: {
    size: {
      sm: "h-8 px-2.5 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    },
    shape: {
      control: "",
      pill: "rounded-(--radius-pill)",
    },
  },
  compoundVariants: [
    // A capsule needs more horizontal padding than a rounded rect, or the
    // caret sits against the curve.
    { shape: "pill", size: "sm", class: "px-3.5" },
    { shape: "pill", size: "md", class: "px-4" },
    { shape: "pill", size: "lg", class: "px-5" },
    // At 32px tall, an 8px radius reads heavy — drop to the inline step.
    { shape: "control", size: "sm", class: "rounded-(--radius-inline)" },
  ],
  defaultVariants: { size: "md", shape: "control" },
});

/**
 * Textareas have no fixed height, so the size ramp maps to `min-h` + explicit
 * vertical padding instead of `h-*`.
 */
export const textAreaVariants = cva(
  [...controlBaseClasses, "resize-y"],
  {
    variants: {
      size: {
        sm: "min-h-16 px-2.5 py-1.5 text-sm",
        md: "min-h-20 px-3 py-2 text-sm",
        lg: "min-h-24 px-4 py-2.5 text-base",
      },
      shape: {
        control: "rounded-(--radius-control)",
        // A capsule textarea is nonsense; pill degrades to the card radius.
        pill: "rounded-(--radius-card)",
      },
    },
    defaultVariants: { size: "md", shape: "control" },
  },
);

/**
 * Wrapper geometry for composite controls that host a bare control plus
 * add-ons — `Input.Group` and `Input.Number`. Both used to duplicate
 * `controlBase`'s geometry inline, which meant any size change had to be made
 * in three places.
 *
 * The nested `.input-control` is flattened so the wrapper's border reads as the
 * single field boundary, and focus is hoisted to the wrapper via
 * `focus-ring-within`.
 */
export const controlGroupVariants = cva(
  [
    "input-group flex items-stretch overflow-hidden",
    "rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-panel)",
    "transition-[border-color,box-shadow] ease-standard",
    "focus-ring-within has-[:focus-visible]:border-(--color-accent)",
    "has-[[aria-invalid=true]]:border-(--color-danger)",
    "has-[:disabled]:opacity-60",
    // Flatten the nested control so it contributes no second border, no second
    // background and no second focus ring.
    "[&_.input-control]:h-full [&_.input-control]:w-full [&_.input-control]:rounded-none",
    "[&_.input-control]:border-0 [&_.input-control]:bg-transparent",
    "[&_.input-control]:outline-none [&_.input-control]:focus-visible:outline-none",
    "[&_.input-control]:disabled:bg-transparent [&_.input-control]:disabled:opacity-100",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      shape: {
        control: "",
        pill: "rounded-(--radius-pill)",
      },
    },
    compoundVariants: [
      { shape: "control", size: "sm", class: "rounded-(--radius-inline)" },
    ],
    defaultVariants: { size: "md", shape: "control" },
  },
);

export type ControlVariantProps = VariantProps<typeof controlVariants>;
export type ControlSize = NonNullable<ControlVariantProps["size"]>;
export type ControlShape = NonNullable<ControlVariantProps["shape"]>;
