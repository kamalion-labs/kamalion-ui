import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../util/cn";

type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputTextarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, name, ...props }, ref) => {
    const formContext = useFormContext();

    return (
      <>
        <textarea
          ref={ref}
          className={cn(
            "flex w-full border bg-transparent p-3 transition-colors",
            "placeholder:text-muted-foreground focus-visible:ring-ring",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus-visible:ring-0 focus-visible:border-[--input-ring] focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          id={name}
          {...props}
          {...(name && formContext.register(name))}
        ></textarea>

        {name && (
          <div className="text-red-400">
            {formContext.formState?.errors?.[name]?.message?.toString()}
          </div>
        )}
      </>
    );
  }
);

InputTextarea.displayName = "Input";

export { InputTextarea };
