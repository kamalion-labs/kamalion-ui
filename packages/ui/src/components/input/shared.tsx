import { XCircle } from "lucide-react";
import { cn } from "../../util";
import { controlVariants } from "./variants";

/**
 * Base classes shared by text-like control elements (input/textarea/select).
 *
 * @deprecated Prefer `controlVariants({ size, shape })` from `./variants` so
 * the control participates in the shared size ramp. Kept as the default-sized
 * shorthand for call sites that don't need geometry control.
 */
export const controlBase = controlVariants();

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p
      className={cn(
        "input-error flex items-start gap-1.5 text-xs font-medium text-(--color-danger)",
        "animate-in fade-in-0 slide-in-from-top-1 duration-(--duration-fast) ease-standard",
      )}
      role="alert"
    >
      <XCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
      <span>{error}</span>
    </p>
  );
}
