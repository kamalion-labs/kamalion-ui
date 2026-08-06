import { cn } from "../../../util";
import type { ButtonContentProps } from "../types";

export function ButtonContent({
  className,
  children,
  ref,
  ...props
}: ButtonContentProps) {
  return (
    <span ref={ref} className={cn("button-content", className)} {...props}>
      {children}
    </span>
  );
}
