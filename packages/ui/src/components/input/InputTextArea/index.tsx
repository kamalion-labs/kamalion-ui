import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { textAreaVariants, type ControlShape, type ControlSize } from "../variants";

export interface InputTextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "id"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

/** Multi-line text input. */
export function InputTextArea({
  value,
  onValueChange,
  size,
  shape,
  className,
  rows = 4,
  ref,
  ...props
}: InputTextAreaProps) {
  const field = useInputField<string>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });

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
        className={cn(textAreaVariants(geometry), className)}
        {...props}
      />
      <FieldError error={field.error} />
    </>
  );
}
