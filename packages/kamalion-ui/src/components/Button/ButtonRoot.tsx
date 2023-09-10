import React from "react";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./ButtonVariants";
import { cn } from "../../util/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, type = "button", children, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
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
