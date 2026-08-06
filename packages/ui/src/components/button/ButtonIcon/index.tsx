import { cn } from "../../../util";
import type { ButtonIconProps } from "../types";

export function ButtonIcon({
  className,
  children,
  ref,
  ...props
}: ButtonIconProps) {
  return (
    <span
      ref={ref}
      className={cn(
        "button-icon inline-flex shrink-0 items-center justify-center [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
