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
        "input-icon flex shrink-0 items-center pl-3 text-(--color-foreground-subtle) [&_svg]:size-4",
        // Only pad the far side when the icon isn't adjacent to the control,
        // so a leading icon sits close to the text it labels.
        "first:pr-2 last:pr-3 last:pl-2",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
