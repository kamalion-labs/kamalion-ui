import type React from "react";
import type { AlertVariant } from "./context";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export interface AlertIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  /** Override the default status icon. */
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}

export interface AlertSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}
