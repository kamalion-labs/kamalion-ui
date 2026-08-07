import type { InputHTMLAttributes } from "react";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { controlVariants, type ControlShape, type ControlSize } from "../variants";

export interface InputTextProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "id" | "size"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/** Single-line text input. Works standalone or bound to a Form via `name`. */
export function InputText({
  value,
  onValueChange,
  size,
  shape,
  className,
  type = "text",
  ref,
  ...props
}: InputTextProps) {
  const field = useInputField<string>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });

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
        className={cn(controlVariants(geometry), className)}
        {...props}
      />
      <FieldError error={field.error} />
    </>
  );
}
