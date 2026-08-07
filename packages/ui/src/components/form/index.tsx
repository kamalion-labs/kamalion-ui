import { XCircle } from "lucide-react";
import {
  FormProvider,
  useFormContext,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { ReactNode } from "react";
import { cn } from "../../util";
import { useForm } from "./hooks";

export interface FormProps<T extends FieldValues> extends UseFormReturn<T> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
}

function FormRoot<T extends FieldValues>({
  onSubmit,
  children,
  className,
  ...methods
}: FormProps<T>) {
  return (
    <FormProvider {...(methods as unknown as UseFormReturn<T>)}>
      <form
        noValidate
        className={cn("form flex flex-col gap-4", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export interface FormErrorsProps {
  className?: string;
}

/**
 * Optional summary box listing all current validation errors. Fields also show
 * their own inline error; use this for a top-of-form recap when you want one.
 */
function FormErrors({ className }: FormErrorsProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const messages = Object.values(errors)
    .map((e) => e?.message)
    .filter((m): m is string => typeof m === "string" && m.length > 0);

  if (messages.length === 0) return null;

  return (
    <div
      role="alert"
      className={cn(
        "form-errors flex items-start gap-2.5 rounded-(--radius-card) p-3 text-sm",
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

/**
 * Form context bound to react-hook-form + zod. Spread a `useForm(...)` result
 * onto it and provide `onSubmit`.
 */
export const Form = Object.assign(FormRoot, {
  Root: FormRoot,
  Errors: FormErrors,
});

export { useForm };
