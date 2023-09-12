/// <reference types="react" />
import { InputLabel } from "./InputLabel";
import { InputRoot } from "./InputRoot";
export declare const Input: {
    Root: typeof InputRoot;
    Label: typeof InputLabel;
    Text: import("react").ForwardRefExoticComponent<import("react").InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
    Textarea: import("react").ForwardRefExoticComponent<import("react").TextareaHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
    DatePicker: {
        ({ className, triggerClassName, name, ...props }: import("./InputDatePicker").InputDatePickerProps): import("react/jsx-runtime").JSX.Element | null;
        displayName: string;
    };
    Select: import("react").ForwardRefExoticComponent<import("@radix-ui/react-select").SelectProps & {
        className?: string | undefined;
        triggerClassName?: string | undefined;
    } & import("react").RefAttributes<never>>;
    SelectItem: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-select").SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
