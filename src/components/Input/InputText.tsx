import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../util/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, ...props }, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    return (
      <>
        <input
          className={cn(
            "flex h-9 w-full bg-transparent px-3 py-1 transition-colors",
            "border rounded-sm border-[--input-border]",
            "placeholder:text-muted-foreground",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus-visible:ring-0 focus-visible:border-[--input-ring] focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          id={name}
          {...props}
          {...formContext.register(name)}
          ref={ref}
        />

        <div className="text-red-400">
          {formContext.formState?.errors?.[name]?.message?.toString()}
        </div>
      </>
    );
  }
);

InputText.displayName = "Input";

export { InputText };
