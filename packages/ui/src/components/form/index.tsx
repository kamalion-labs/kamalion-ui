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
        "form-errors rounded-(--radius-card) border border-(--color-danger-soft) bg-(--color-danger-soft) p-3 text-sm text-(--color-danger)",
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

/**
 * Form context bound to react-hook-form + zod. Spread a `useForm(...)` result
 * onto it and provide `onSubmit`.
 */
export const Form = Object.assign(FormRoot, {
  Root: FormRoot,
  Errors: FormErrors,
});

export { useForm };
