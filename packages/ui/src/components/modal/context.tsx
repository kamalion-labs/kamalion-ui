import { createContext, useContext } from "react";
import type { ModalContextValue } from "./types";

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a <ModalProvider>.");
  }
  return ctx;
};
