/// <reference types="react" />
import * as PopoverPrimitive from "@radix-ui/react-popover";
export declare const Popover: {
    Root: import("react").FC<PopoverPrimitive.PopoverProps>;
    Trigger: import("react").ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Content: import("react").ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
