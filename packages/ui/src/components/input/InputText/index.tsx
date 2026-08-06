import type { InputHTMLAttributes } from "react";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { controlBase, FieldError } from "../shared";

export interface InputTextProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "id"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/** Single-line text input. Works standalone or bound to a Form via `name`. */
export function InputText({
  value,
  onValueChange,
  className,
  type = "text",
  ref,
  ...props
}: InputTextProps) {
  const field = useInputField<string>({ value, onValueChange });

  return (
    <>
      <input
        ref={ref}
        id={field.id}
        name={field.name}
        type={type}
        required={field.required}
        disabled={field.disabled}
        aria-invalid={field.invalid || undefined}
        value={field.value ?? ""}
        onChange={(e) => field.setValue(e.target.value)}
        className={cn(controlBase, className)}
        {...props}
      />
      <FieldError error={field.error} />
    </>
  );
}
