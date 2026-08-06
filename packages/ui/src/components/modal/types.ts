import type React from "react";

export type ModalPosition = "center" | "top";

export interface ModalOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Custom body content. When provided, confirm/cancel controls are hidden unless labels are set. */
  content?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  position?: ModalPosition;
  /** Danger styling for destructive confirmations. */
  danger?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface ModalContextValue {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}
