import {
  useForm as useReactHookForm,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

/**
 * Thin wrapper over react-hook-form's `useForm` that wires a Zod schema as the
 * resolver. Pass the schema first, then any react-hook-form options.
 *
 * @example
 * const form = useForm<FormValues>(schema, { defaultValues: { name: "" } });
 */
export function useForm<T extends FieldValues>(
  schema: ZodType<T>,
  options?: Omit<UseFormProps<T>, "resolver">,
): UseFormReturn<T> {
  return useReactHookForm<T>({
    // Casts bridge @hookform/resolvers' looser schema/resolver generics with
    // our explicit ZodType<T>.
    resolver: zodResolver(
      schema as Parameters<typeof zodResolver>[0],
    ) as UseFormProps<T>["resolver"],
    ...options,
  });
}
