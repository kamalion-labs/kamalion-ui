import type React from "react";

export type ToastVariant =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms. */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
  open: boolean;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}
