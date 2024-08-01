import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa6";
import { cn } from "../..";
import { useFormContext } from "react-hook-form";

export type InputCheckboxState = CheckboxPrimitive.CheckedState;

type InputCheckboxProps = {
  noControl?: boolean;
};

const InputCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & InputCheckboxProps
>(({ className, noControl, name, checked, onCheckedChange, ...props }, ref) => {
  const formContext = useFormContext();

  if (!name) return null;

  const uncontrolled = !formContext || !formContext.control || noControl;

  checked = uncontrolled ? checked : formContext.watch(name);

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-5 w-5 mt-[1px] shrink-0 rounded border border-primary",
        "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-400 data-[state=checked]:text-white",
        "transition-all",
        className,
      )}
      {...props}
      id={name}
      checked={checked}
      onCheckedChange={(val) => {
        uncontrolled ? onCheckedChange!(val) : formContext.setValue(name, val);
      }}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <FaCheck className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

InputCheckbox.displayName = "InputCheckbox";

export { InputCheckbox };
