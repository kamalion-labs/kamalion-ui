import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}
