import type React from "react";

export type LoadingSize = "sm" | "md" | "lg";

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
  label?: React.ReactNode;
  className?: string;
  classNameSpinner?: string;
  ref?: React.Ref<HTMLDivElement>;
}
