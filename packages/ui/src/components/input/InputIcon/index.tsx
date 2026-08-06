import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../util";

export interface InputIconProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}

/** Decorative/functional icon positioned inside an Input.Group. */
export function InputIcon({ className, children, ref, ...props }: InputIconProps) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "input-icon flex items-center px-3 text-(--color-foreground-subtle) [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
