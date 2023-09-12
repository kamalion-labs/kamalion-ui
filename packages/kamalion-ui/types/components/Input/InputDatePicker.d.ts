import { DayPickerSingleProps } from "react-day-picker";
export interface InputDatePickerProps extends Omit<DayPickerSingleProps, "mode"> {
    triggerClassName?: string;
    name?: string;
    mode?: "single";
}
declare const InputDatePicker: {
    ({ className, triggerClassName, name, ...props }: InputDatePickerProps): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export { InputDatePicker };
