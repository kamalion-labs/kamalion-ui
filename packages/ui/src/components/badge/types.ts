import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./variants";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  /** Renders a leading status dot tinted with the variant's own tone. */
  dot?: boolean;
  classNameDot?: string;
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}
