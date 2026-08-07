import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { controlVariants, type ControlShape, type ControlSize } from "../variants";

export interface InputPasswordProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "id" | "type" | "size"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  classNameToggle?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/** Password field with a visibility toggle. */
export function InputPassword({
  value,
  onValueChange,
  size,
  shape,
  className,
  classNameToggle,
  ref,
  ...props
}: InputPasswordProps) {
  const field = useInputField<string>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          ref={ref}
          id={field.id}
          name={field.name}
          type={visible ? "text" : "password"}
          required={field.required}
          disabled={field.disabled}
          aria-invalid={field.invalid || undefined}
          value={field.value ?? ""}
          onChange={(e) => field.setValue(e.target.value)}
          className={cn(controlVariants(geometry), "pr-10", className)}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className={cn(
            "absolute inset-y-0 right-0 flex items-center rounded-r-(--radius-control) px-3 text-(--color-foreground-subtle) transition-colors hover:text-(--color-foreground)",
            "outline-none focus-ring-inset",
            classNameToggle,
          )}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FieldError error={field.error} />
    </>
  );
}
