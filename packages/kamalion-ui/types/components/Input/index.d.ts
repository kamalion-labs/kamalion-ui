import { InputLabel } from "./InputLabel";
import { InputRoot } from "./InputRoot";
export declare const Input: {
    Root: typeof InputRoot;
    Label: typeof InputLabel;
    Text: import("react").ForwardRefExoticComponent<import("react").InputHTMLAttributes<HTMLInputElement> & {
        displayType?: "input" | "text";
        noControl?: boolean;
    } & import("react").RefAttributes<HTMLInputElement>>;
    Textarea: import("react").ForwardRefExoticComponent<import("react").TextareaHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
    DatePicker: import("react").ForwardRefExoticComponent<import("@radix-ui/react-popover").PopoverProps & import("./InputDatePicker").InputDatePickerProps & import("react").RefAttributes<never>>;
    Select: import("react").ForwardRefExoticComponent<import("@radix-ui/react-select").SelectProps & {
        className?: string;
        triggerClassName?: string;
        position?: "popper" | "item-aligned" | undefined;
        noControl?: boolean;
    } & import("react").RefAttributes<never>>;
    SelectItem: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-select").SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Number: import("react").ForwardRefExoticComponent<Omit<import("react-number-format").NumericFormatProps, "type"> & {
        type?: "number" | "money" | "percent";
        noControl?: boolean;
    } & import("react").RefAttributes<HTMLInputElement>>;
    Mask: import("react").ForwardRefExoticComponent<Omit<import("react-number-format").PatternFormatProps, "type" | "format"> & {
        type: "tel" | "date" | "cel" | "hiddenCel" | "cpf" | "cnpj" | "cep";
        noControl?: boolean;
    } & import("react").RefAttributes<HTMLInputElement>>;
    Checkbox: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-checkbox").CheckboxProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & {
        noControl?: boolean;
    } & import("react").RefAttributes<HTMLButtonElement>>;
};
