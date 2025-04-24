"use client";

import * as React from "react";
import { cn } from "../../util/cn";
import { FormProvider } from "react-hook-form";

type FormRootProps = React.FormHTMLAttributes<HTMLFormElement> & {
  form: any;
  inline?: boolean;
};

export function FormRoot({ children, className, form, inline, ...props }: FormRootProps) {
  return (
    <FormProvider {...form}>
      <form
        className={cn(
          "itc-form flex", 
          inline ? "flex-row items-end gap-x-5" : "flex-col gap-y-5", 
          className
        )}
        {...props}
        autoComplete="off"
      >
        {children}
      </form>
    </FormProvider>
  );
}
