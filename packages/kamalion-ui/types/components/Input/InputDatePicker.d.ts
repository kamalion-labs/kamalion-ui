import * as React from "react";
import { DayPickerSingleProps } from "react-day-picker";
export interface InputDatePickerProps extends Omit<DayPickerSingleProps, "mode"> {
    triggerClassName?: string;
    name?: string;
    mode?: "single";
}
declare const InputDatePicker: React.ForwardRefExoticComponent<import("@radix-ui/react-popover").PopoverProps & InputDatePickerProps & React.RefAttributes<never>>;
export { InputDatePicker };
