import { useFormContext } from "react-hook-form";

import { cn } from "../../util/cn";

type FormErrorProps = React.HTMLAttributes<HTMLDivElement>;

export function FormError({ className, ...props }: FormErrorProps) {
  const formContext = useFormContext();

  if (!formContext.formState.errors.root) return null;

  return (
    <div
      className={cn("rounded bg-red-500 px-2 py-1 text-white", className)}
      {...props}
    >
      <b>Erro:</b> {formContext.formState.errors.root?.message}
    </div>
  );
}
