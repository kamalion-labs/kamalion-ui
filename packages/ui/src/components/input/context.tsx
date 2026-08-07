import { createContext, useContext } from "react";
import type { ControlShape, ControlSize } from "./variants";

export interface InputContextValue {
  /** Field name — present when the input is bound to a Form. */
  name?: string;
  /** Stable id linking Label ↔ control. */
  id: string;
  required?: boolean;
  disabled?: boolean;
  /** Control height ramp, shared with Button (sm 32 / md 40 / lg 48px). */
  size?: ControlSize;
  /** `control` = rounded rect (default); `pill` = capsule, for search bars. */
  shape?: ControlShape;
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

/**
 * Resolves the geometry a control should render at: an explicit prop on the
 * control wins, otherwise it inherits from the surrounding `<Input>`.
 */
export function useControlGeometry(overrides: {
  size?: ControlSize;
  shape?: ControlShape;
}) {
  const ctx = useInputContext();
  return {
    size: overrides.size ?? ctx.size ?? "md",
    shape: overrides.shape ?? ctx.shape ?? "control",
  } as const;
}
