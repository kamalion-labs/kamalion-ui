import { useFormContext } from "react-hook-form";
import { cn } from "../../../util";

export interface InputErrorsProps {
  className?: string;
}

/**
 * Global validation summary (alias of Form.Errors). Renders nothing outside a
 * Form or when there are no errors.
 */
export function InputErrors({ className }: InputErrorsProps) {
  const form = useFormContext();
  if (!form) return null;

  const messages = Object.values(form.formState.errors)
    .map((e) => e?.message)
    .filter((m): m is string => typeof m === "string" && m.length > 0);

  if (messages.length === 0) return null;

  return (
    <div
      role="alert"
      className={cn(
        "input-errors rounded-(--radius-card) border border-(--color-danger-soft) bg-(--color-danger-soft) p-3 text-sm text-(--color-danger)",
        className,
      )}
    >
      <ul className="list-inside list-disc space-y-0.5">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
