import * as React from "react";
import { cn } from "../../util/cn";

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function InputLabel({ className, children, ...props }: InputLabelProps) {
  return (
    <label className={cn("", className)} {...props}>
      {children}
    </label>
  );
}
