import { createContext, useContext } from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertContextValue {
  variant: AlertVariant;
}

export const AlertContext = createContext<AlertContextValue | undefined>(
  undefined,
);

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("Alert subcomponents must be used within an <Alert>.");
  }
  return ctx;
};
