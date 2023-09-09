import React from "react";
import { type VariantProps } from "class-variance-authority";

import { ButtonVariants } from "./ButtonVariants";
import { cn } from "../../util/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

const ButtonRoot = ({
  variant,
  className,
  type = "button",
  children,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(ButtonVariants({ variant, size, className }))}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
ButtonRoot.displayName = "ButtonRoot";

export { ButtonRoot };
