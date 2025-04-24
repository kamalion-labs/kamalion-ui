"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../util/cn";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { InputBaseClassNames, InputTextBaseClassNames } from "./InputBaseClassNames";

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
      InputBaseClassNames,
      displayType === "text" && InputTextBaseClassNames,
      className
    );

    let newType = type;

    if (type === "password" && ShowPassword) {
      newType = "text";
    }

    if (!formContext || !formContext.control || noControl) {
      return (
        <>
          <div className="flex relative">
            {displayType === "input" && <input className={classes} id={name} {...props} ref={ref} type={newType} />}

            {displayType === "text" && (
              <span className={classes} id={name} {...props} ref={ref}>
                {props.value}
              </span>
            )}

            {type === "password" && (
              <div
                className={cn(
                  "absolute flex h-full right-0 items-center justify-center w-10 hover:cursor-pointer hover:opacity-50 transition-all text-[--input-foreground]"
                )}
                onClick={() => setShowPassword((old) => !old)}
              >
                {ShowPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            )}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex relative">
          {displayType === "input" && (
            <input className={classes} id={name} {...formContext.register(name)} ref={ref} type={newType} {...props} />
          )}

          {displayType === "text" && (
            <span className={classes} id={name} {...props} ref={ref}>
              {props.value}
            </span>
          )}

          {type === "password" && (
            <div
              className={cn(
                "absolute flex h-full right-0 items-center justify-center w-10 hover:cursor-pointer hover:opacity-50 transition-all text-[--input-foreground]"
              )}
              onClick={() => setShowPassword((old) => !old)}
              tabIndex={-1}
            >
              {ShowPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>

        {formContext.formState?.errors?.[name] && (
          <div className="text-red-400" data-testid={`error-${name}`}>
            {formContext.formState?.errors?.[name]?.message?.toString()}
          </div>
        )}
      </>
    );
  }
);

InputText.displayName = "Input";

export { InputText };
