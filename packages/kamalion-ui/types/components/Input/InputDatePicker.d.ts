import * as React from "react";
import { DayPicker } from "react-day-picker";
type InputDatePickerTriggerProps = {
    triggerClassName?: string;
};
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
export type InputDatePickerProps = React.InputHTMLAttributes<HTMLInputElement> & InputDatePickerTriggerProps;
declare const InputDatePicker: {
    ({ className, triggerClassName, name, }: InputDatePickerProps): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export { InputDatePicker };
