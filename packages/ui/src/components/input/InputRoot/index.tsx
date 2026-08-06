import { useId, type HTMLAttributes, type ReactNode } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { cn } from "../../../util";
import { InputContext } from "../context";

export interface InputProps<T extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Field name — binds the input to the surrounding Form when set. */
  name?: FieldPath<T>;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Structural wrapper for a form field. Establishes shared context (id, name,
 * required) for its Label and control subcomponents.
 */
export function InputRoot<T extends FieldValues = FieldValues>({
  name,
  required,
  disabled,
  id,
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
