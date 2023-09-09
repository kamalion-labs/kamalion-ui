import React from "react";
import { type VariantProps } from "class-variance-authority";

import { ButtonVariants } from "./ButtonVariants";
import { cn } from "../../util/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      className,
      type = "button",
      children,
      size,
      ...props
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        className={cn(ButtonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonRoot.displayName = "ButtonRoot";

export { ButtonRoot };
