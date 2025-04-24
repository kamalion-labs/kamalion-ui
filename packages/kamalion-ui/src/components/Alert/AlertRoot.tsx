import React, { ReactNode } from "react";

import { alertVariants, type AlertVariantProps } from "./AlertVariants";
import { Alert } from ".";
import { cn } from "../../util";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const AlertRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    AlertVariantProps & {
      icon?: ReactNode;
    }
>(({ className, children, variant, icon, ...props }, ref) => {
  const variants: { [K in NonNullable<typeof variant>]: ReactNode } = {
    danger: <FaExclamationCircle />,
    success: <FaCheckCircle />,
    info: <FaInfoCircle />,
    warning: <FaExclamationTriangle />,
    default: null,
  };

  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Alert.Icon>{icon || variants[variant!]}</Alert.Icon>

      <div className="flex-1 space-y-2">{children}</div>
    </div>
  );
});

AlertRoot.displayName = "Alert";

export { AlertRoot };
