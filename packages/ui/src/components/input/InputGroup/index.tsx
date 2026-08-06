import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../util";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Row container combining a control with leading/trailing add-ons
 * (Input.Icon, Input.Button). Nested `.input-control` elements are flattened
 * so the group border reads as one field.
 */
export function InputGroup({
  className,
  children,
  ref,
  ...props
}: InputGroupProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "input-group flex items-stretch overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-surface-panel) transition-colors",
        "focus-within:border-(--color-accent) focus-within:ring-2 focus-within:ring-(--color-accent-soft)",
        "[&_.input-control]:border-0 [&_.input-control]:bg-transparent [&_.input-control]:focus:border-0 [&_.input-control]:focus:ring-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
