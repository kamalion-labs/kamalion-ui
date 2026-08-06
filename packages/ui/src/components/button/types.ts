import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (Radix Slot), merging Button styles onto it. */
  asChild?: boolean;
  /** Show a spinner and disable the button while an action is in flight. */
  loading?: boolean;
  className?: string;
  /** Styles for the internal loading spinner. */
  classNameSpinner?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface ButtonIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}

export interface ButtonContentProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}
