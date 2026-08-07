import { IMaskInput } from "react-imask";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { controlVariants, type ControlShape, type ControlSize } from "../variants";

export interface InputMaskProps {
  /** IMask pattern, e.g. "(00) 00000-0000", "000.000.000-00" (CPF). */
  mask: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
}

/** Formatted input applying character masks (phone, CPF/CNPJ, etc.). */
export function InputMask({
  mask,
  value,
  onValueChange,
  placeholder,
  size,
  shape,
  className,
}: InputMaskProps) {
  const field = useInputField<string>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });

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
        className={cn(controlVariants(geometry), className)}
      />
      <FieldError error={field.error} />
    </>
  );
}
