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
  type = "button",
  ref,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

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
      type={type}
      {...props}
    >
      {/* In asChild mode `children` must be passed through untouched. A
          `{cond && <Loader2/>}` expression here would still occupy a slot in
          the children array even when false — `Children.count` counts booleans
          — so Slot would see two children and throw. */}
      {asChild ? (
        children
      ) : (
        <>
          {loading && (
            <Loader2
              className={cn("size-4 shrink-0 animate-spin", classNameSpinner)}
              aria-hidden="true"
            />
          )}
          {children}
        </>
      )}
    </Component>
  );
}
