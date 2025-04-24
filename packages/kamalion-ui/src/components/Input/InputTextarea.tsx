"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../util/cn";
import { InputBaseClassNames } from "./InputBaseClassNames";

type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  noControl?: boolean;
};

const InputTextarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, name, noControl, ...props }, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    const classes = cn(
      // "flex w-full border bg-[--input-background] text-[--input-foreground] p-3 transition-colors",
      // "placeholder:text-muted-foreground focus:ring-ring",
      // "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      // "focus:ring-0 focus:border-[--input-ring] focus:outline-none",
      // "disabled:cursor-not-allowed disabled:opacity-50",
      InputBaseClassNames,
      className
    );

    if (!formContext || !formContext.control || noControl) {
      return (
        <>
          <textarea
            ref={ref}
            className={classes}
            id={name}
            {...props}
          ></textarea>
        </>
      );
    }

    return (
      <>
        <textarea
          ref={ref}
          className={classes}
          id={name}
          {...props}
          {...(name && formContext.register(name))}
        ></textarea>

        {name && formContext.formState?.errors?.[name] && <div className="text-red-400">{formContext.formState?.errors?.[name]?.message?.toString()}</div>}
      </>
    );
  }
);

InputTextarea.displayName = "Input";

export { InputTextarea };
