import * as React from "react";
import { cn } from "../../util/cn";

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function InputLabel({ className, children, required, ...props }: InputLabelProps) {
  return (
    <label className={cn("itc-input-label text-sm", className)} {...props}>
      {children}
      {required && <span className="itc-input-required text-red-400"> *</span>}
    </label>
  );
}
