import { createContext, useContext } from "react";
import type { ToastContextValue } from "./types";

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>.");
  }
  return ctx;
};
