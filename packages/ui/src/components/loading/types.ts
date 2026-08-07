import type React from "react";

export type LoadingSize = "sm" | "md" | "lg" | "xl";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface LoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** `text` is a rounded line, `circle` an avatar placeholder, `rect` a block. */
  variant?: SkeletonVariant;
  /** Number of stacked lines. Only meaningful for `variant="text"`. */
  lines?: number;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface LoadingLocalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: LoadingSize;
  /** Optional label shown next to the spinner. */
  label?: React.ReactNode;
  className?: string;
  classNameSpinner?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface LoadingGlobalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the overlay is shown. Defaults to true. */
  open?: boolean;
  size?: LoadingSize;
  label?: React.ReactNode;
  className?: string;
  classNameSpinner?: string;
  ref?: React.Ref<HTMLDivElement>;
}
