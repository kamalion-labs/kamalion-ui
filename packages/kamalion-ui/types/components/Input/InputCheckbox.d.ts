import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
export type InputCheckboxState = CheckboxPrimitive.CheckedState;
type InputCheckboxProps = {
    noControl?: boolean;
};
declare const InputCheckbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & InputCheckboxProps & React.RefAttributes<HTMLButtonElement>>;
export { InputCheckbox };
