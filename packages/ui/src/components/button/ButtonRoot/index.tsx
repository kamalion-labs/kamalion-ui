import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "../../../util";
import { buttonVariants } from "../variants";
import type { ButtonProps } from "../types";

export function ButtonRoot({
  variant,
  size,
  loading = false,
  asChild = false,
  disabled,
  className,
  classNameSpinner,
  children,
  ref,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  // Slot requires a single child, so only inject the spinner in native mode.
  const showSpinner = loading && !asChild;

  return (
    <Component
      ref={ref}
      className={cn(
        `button-${variant ?? "solid"}`,
        buttonVariants({ variant, size }),
        className,
      )}
      disabled={disabled || (loading && !asChild)}
      aria-busy={loading || undefined}
      {...props}
    >
      {showSpinner && (
        <Loader2
          className={cn("size-4 shrink-0 animate-spin", classNameSpinner)}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
}
