import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { controlBase, FieldError } from "../shared";

export interface InputTextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "id"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

/** Multi-line text input. */
export function InputTextArea({
  value,
  onValueChange,
  className,
  rows = 4,
  ref,
  ...props
}: InputTextAreaProps) {
  const field = useInputField<string>({ value, onValueChange });

  return (
    <>
      <textarea
        ref={ref}
        id={field.id}
        name={field.name}
        rows={rows}
        required={field.required}
        disabled={field.disabled}
        aria-invalid={field.invalid || undefined}
        value={field.value ?? ""}
        onChange={(e) => field.setValue(e.target.value)}
        className={cn(controlBase, "min-h-20 resize-y", className)}
        {...props}
      />
      <FieldError error={field.error} />
    </>
  );
}
