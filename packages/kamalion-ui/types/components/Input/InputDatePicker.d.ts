import * as React from "react";
import { PropsSingle } from "react-day-picker";
export interface InputDatePickerProps extends Omit<PropsSingle, "mode" | "required"> {
    triggerClassName?: string;
    name?: string;
    mode?: "single";
    className?: string;
    required?: boolean;
}
declare const InputDatePicker: React.ForwardRefExoticComponent<import("@radix-ui/react-popover").PopoverProps & InputDatePickerProps & React.RefAttributes<never>>;
export { InputDatePicker };
