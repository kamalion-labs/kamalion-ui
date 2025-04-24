import { cva, VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  `itc-badge inline-flex items-center rounded-full border border-(--border) px-2.5 py-0.5 text-xs font-semibold
  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background",
        accent: "border-transparent bg-accent text-white",
        success: "border-transparent bg-emerald-400 text-white",
        danger: "border-transparent bg-red-500 text-white",
        info: "border-transparent bg-cyan-400 text-white",
        warning: "border-transparent bg-amber-400 text-white",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeVariantsList = VariantProps<typeof badgeVariants>["variant"];