import { Minus, Plus } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";

export interface InputNumberProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "id" | "type" | "min" | "max" | "step"
  > {
  value?: number;
  onValueChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/** Numeric field with increment / decrement steppers. */
export function InputNumber({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  className,
  ref,
  ...props
}: InputNumberProps) {
  const field = useInputField<number | undefined>({ value, onValueChange });
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

  const stepButton =
    "flex w-9 items-center justify-center text-(--color-foreground-subtle) transition-colors hover:text-(--color-foreground) disabled:opacity-50";

  return (
    <>
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-surface-panel)",
          field.invalid && "border-(--color-danger)",
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
            "w-full min-w-0 bg-transparent px-3 py-2 text-center text-sm text-(--color-foreground) outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
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
