import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../util/cn";
import { Button } from "..";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  displayType?: "input" | "text";
  noControl?: boolean;
};

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, displayType = "input", type = "text", noControl, ...props }, ref) => {
    const formContext = useFormContext();
    const [ShowPassword, setShowPassword] = useState(false);

    if (!name) return null;

    const classes = cn(
      "flex h-8 w-full bg-[--input-background] text-[--input-foreground] px-3 py-1 transition-colors",
      "border rounded-sm border-[--input-border]",
      "placeholder:text-muted-foreground",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "focus-visible:ring-0 focus-visible:border-[--input-ring] focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      displayType === "text" && "border-0 p-0 disabled:cursor-text disabled:opacity-100 h-fit bg-transparent",
      type === "password" && "rounded-r-none border-r-0",
      className,
    );

    if (!formContext || !formContext.control || noControl) {
      return (
        <>
          <div className="flex">
            <input
              className={classes}
              id={name}
              disabled={displayType === "text"}
              {...props}
              ref={ref}
              type={type === "text" || (type === "password" && ShowPassword) ? "text" : "password"}
            />
            {type === "password" && (
              <Button.Root
                size="icon"
                className={cn("h-auto w-fit rounded-l-none")}
                onClick={() => setShowPassword((old) => !old)}
              >
                <Button.Icon>{ShowPassword ? <FaEyeSlash /> : <FaEye />}</Button.Icon>
              </Button.Root>
            )}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex">
          <input
            className={classes}
            id={name}
            disabled={displayType === "text"}
            {...props}
            {...formContext.register(name)}
            ref={ref}
            type={type === "text" || (type === "password" && ShowPassword) ? "text" : "password"}
          />
          {type === "password" && (
            <Button.Root
              size="icon"
              className={cn("h-auto w-fit rounded-l-none")}
              onClick={() => setShowPassword((old) => !old)}
            >
              <Button.Icon>{ShowPassword ? <FaEyeSlash /> : <FaEye />}</Button.Icon>
            </Button.Root>
          )}
        </div>

        <div className="text-red-400">{formContext.formState?.errors?.[name]?.message?.toString()}</div>
      </>
    );
  },
);

InputText.displayName = "Input";

export { InputText };
