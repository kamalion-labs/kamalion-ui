import { createContext, useContext } from "react";

export interface InputContextValue {
  /** Field name — present when the input is bound to a Form. */
  name?: string;
  /** Stable id linking Label ↔ control. */
  id: string;
  required?: boolean;
  disabled?: boolean;
}

export const InputContext = createContext<InputContextValue | undefined>(
  undefined,
);

export const useInputContext = () => {
  const ctx = useContext(InputContext);
  if (!ctx) {
    throw new Error("Input subcomponents must be used within an <Input>.");
  }
  return ctx;
};
