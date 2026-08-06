import { useFormContext } from "react-hook-form";
import { useInputContext } from "./context";

export interface UseInputFieldOptions<V> {
  /** Standalone controlled value (ignored when bound to a Form). */
  value?: V;
  /** Standalone change handler (ignored when bound to a Form). */
  onValueChange?: (value: V) => void;
}

export interface InputFieldState<V> {
  id: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  value: V | undefined;
  setValue: (value: V) => void;
  error?: string;
  invalid: boolean;
  /** True when the field is wired to a Form via react-hook-form. */
  bound: boolean;
}

/**
 * Resolves a field's value/onChange/error from EITHER standalone props
 * (`value` / `onValueChange`) OR the surrounding Form context (when the input
 * has a `name` and a Form is present). Every Input leaf uses this so both modes
 * behave identically.
 */
export function useInputField<V = string>(
  options: UseInputFieldOptions<V> = {},
): InputFieldState<V> {
  const ctx = useInputContext();
  const form = useFormContext(); // null when not inside a <Form>
  const name = ctx.name;
  const bound = Boolean(form && name);

  const value = bound
    ? (form!.watch(name!) as V | undefined)
    : options.value;

  const errorMessage =
    bound && name
      ? (form!.formState.errors[name]?.message as string | undefined)
      : undefined;

  const setValue = (next: V) => {
    if (bound && name) {
      form!.setValue(name, next as never, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      options.onValueChange?.(next);
    }
  };

  return {
    id: ctx.id,
    name,
    required: ctx.required,
    disabled: ctx.disabled,
    value,
    setValue,
    error: errorMessage,
    invalid: Boolean(errorMessage),
    bound,
  };
}
