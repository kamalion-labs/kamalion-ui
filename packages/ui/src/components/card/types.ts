import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { cardVariants } from "./variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}
