import { IMaskInput } from "react-imask";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { controlBase, FieldError } from "../shared";

export interface InputMaskProps {
  /** IMask pattern, e.g. "(00) 00000-0000", "000.000.000-00" (CPF). */
  mask: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Formatted input applying character masks (phone, CPF/CNPJ, etc.). */
export function InputMask({
  mask,
  value,
  onValueChange,
  placeholder,
  className,
}: InputMaskProps) {
  const field = useInputField<string>({ value, onValueChange });

  return (
    <>
      <IMaskInput
        mask={mask}
        id={field.id}
        name={field.name}
        placeholder={placeholder}
        disabled={field.disabled}
        aria-invalid={field.invalid || undefined}
        value={field.value ?? ""}
        onAccept={(accepted) => field.setValue(String(accepted))}
        className={cn(controlBase, className)}
      />
      <FieldError error={field.error} />
    </>
  );
}
