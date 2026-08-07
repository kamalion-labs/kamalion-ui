import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../util";
import { useInputContext } from "../context";

export interface InputLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children?: ReactNode;
}

/** Label bound to the field control. Shows a red asterisk when required. */
export function InputLabel({ className, children, ...props }: InputLabelProps) {
  const { id, required } = useInputContext();
  return (
    <label
      htmlFor={id}
      className={cn(
        "input-label w-fit cursor-pointer text-sm font-medium text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-(--color-danger)">
          {" *"}
        </span>
      ) : null}
    </label>
  );
}
