import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
type InputSelectProps = {
    className?: string;
    triggerClassName?: string;
    position?: "popper" | "item-aligned" | undefined;
    noControl?: boolean;
};
declare const InputSelect: React.ForwardRefExoticComponent<SelectPrimitive.SelectProps & InputSelectProps & React.RefAttributes<never>>;
export { InputSelect };
