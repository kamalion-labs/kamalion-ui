import { useId, type HTMLAttributes, type ReactNode } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { cn } from "../../../util";
import { InputContext } from "../context";
import type { ControlShape, ControlSize } from "../variants";

export interface InputProps<T extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Field name — binds the input to the surrounding Form when set. */
  name?: FieldPath<T>;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  /**
   * Control height, shared with Button: `sm` 32px, `md` 40px (default),
   * `lg` 48px. Applies to every control nested in this field.
   */
  size?: ControlSize;
  /** `control` = rounded rect (default); `pill` = capsule, for search bars. */
  shape?: ControlShape;
  className?: string;
  children: ReactNode;
}

/**
 * Structural wrapper for a form field. Establishes shared context (id, name,
 * required, geometry) for its Label and control subcomponents.
 */
export function InputRoot<T extends FieldValues = FieldValues>({
  name,
  required,
  disabled,
  id,
  size,
  shape,
  className,
  children,
  ...props
}: InputProps<T>) {
  const autoId = useId();
  return (
    <InputContext.Provider
      value={{
        name: name as string | undefined,
        id: id ?? autoId,
        required,
        disabled,
        size,
        shape,
      }}
    >
      <div
        className={cn("input flex w-full flex-col gap-1.5", className)}
        {...props}
      >
        {children}
      </div>
    </InputContext.Provider>
  );
}
