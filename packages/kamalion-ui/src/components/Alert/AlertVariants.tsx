import { VariantProps, cva } from "class-variance-authority";

export const alertVariants = cva(`border rounded-md p-3 flex leading-none`, {
  variants: {
    variant: {
      default: "",
      success: "bg-emerald-400/90 border-emerald-500 text-white",
      info: "bg-cyan-400/90 border-cyan-500 text-white",
      danger: "bg-red-400/90 border-red-500 text-white",
      warning: "bg-amber-400/90 border-amber-500 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AlertVariantProps = VariantProps<typeof alertVariants>;
