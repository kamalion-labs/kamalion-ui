import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
type InputSelectProps = {
    className?: string;
    triggerClassName?: string;
};
declare const InputSelect: React.ForwardRefExoticComponent<SelectPrimitive.SelectProps & InputSelectProps & React.RefAttributes<never>>;
export { InputSelect };
