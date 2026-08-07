import { Minus, Plus } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import {
  controlGroupVariants,
  type ControlShape,
  type ControlSize,
} from "../variants";

export interface InputNumberProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "id" | "type" | "min" | "max" | "step" | "size"
  > {
  value?: number;
  onValueChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  classNameWrapper?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/** Numeric field with increment / decrement steppers. */
export function InputNumber({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  size,
  shape,
  className,
  classNameWrapper,
  ref,
  ...props
}: InputNumberProps) {
  const field = useInputField<number | undefined>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });
  const current = typeof field.value === "number" ? field.value : undefined;

  const clamp = (n: number) => {
    let next = n;
    if (typeof min === "number") next = Math.max(min, next);
    if (typeof max === "number") next = Math.min(max, next);
    return next;
  };

  const bump = (delta: number) => {
    const base = typeof current === "number" ? current : 0;
    field.setValue(clamp(base + delta));
  };

  const stepButton = cn(
    "flex w-9 shrink-0 items-center justify-center text-(--color-foreground-subtle)",
    "transition-colors hover:bg-(--color-surface-panel-hover) hover:text-(--color-foreground)",
    "outline-none focus-ring-inset",
    "disabled:pointer-events-none disabled:opacity-50",
  );

  return (
    <>
      <div
        className={cn(
          controlGroupVariants(geometry),
          field.invalid && "border-(--color-danger)",
          classNameWrapper,
        )}
      >
        <button
          type="button"
          aria-label="Decrement"
          disabled={field.disabled}
          onClick={() => bump(-step)}
          className={cn(stepButton, "border-r border-(--color-border)")}
        >
          <Minus className="size-4" />
        </button>
        <input
          ref={ref}
          id={field.id}
          name={field.name}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          required={field.required}
          disabled={field.disabled}
          aria-invalid={field.invalid || undefined}
          value={current ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            field.setValue(raw === "" ? undefined : clamp(Number(raw)));
          }}
          className={cn(
            // `input-control` so the group's flattening rules apply — without
            // it this input kept its own padding and fought the wrapper height.
            "input-control min-w-0 border-0 bg-transparent px-3 text-center text-(--color-foreground)",
            "outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          aria-label="Increment"
          disabled={field.disabled}
          onClick={() => bump(step)}
          className={cn(stepButton, "border-l border-(--color-border)")}
        >
          <Plus className="size-4" />
        </button>
      </div>
      <FieldError error={field.error} />
    </>
  );
}
