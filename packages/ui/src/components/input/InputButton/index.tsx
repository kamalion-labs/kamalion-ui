import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../util";

export interface InputButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

/** Action button embedded inside an Input.Group (e.g. search submit). */
export function InputButton({
  className,
  children,
  type = "button",
  ref,
  ...props
}: InputButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "input-button flex items-center gap-1.5 px-3 text-sm font-medium text-(--color-accent) transition-colors hover:bg-(--color-accent-soft) disabled:opacity-50 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
