import React from "react";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./ButtonVariants";
import { cn } from "../../util/cn";
import { FaSpinner } from "react-icons/fa6";
import { ButtonIcon } from "./ButtonIcon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, isLoading, type = "button", children, size, onClick, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        onClick={(e) => {
          typeof onClick !== "undefined" && !isLoading && onClick(e);
        }}
        {...props}
      >
        {isLoading && (
          <>
            <ButtonIcon>
              <FaSpinner className="animate-spin" />
            </ButtonIcon>
          </>
        )}
        {!isLoading && children}
      </button>
    );
  },
);

ButtonRoot.displayName = "ButtonRoot";

export { ButtonRoot };
