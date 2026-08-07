import { XCircle } from "lucide-react";
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
        "input-errors flex items-start gap-2.5 rounded-(--radius-card) p-3 text-sm",
        "border border-(--color-danger-border) bg-(--color-danger-soft) text-(--color-danger-fg)",
        "animate-in fade-in-0 slide-in-from-top-1 duration-(--duration-fast) ease-standard",
        className,
      )}
    >
      <XCircle
        className="mt-0.5 size-4 shrink-0 text-(--color-danger)"
        aria-hidden="true"
      />
      <ul className="min-w-0 flex-1 space-y-0.5">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
