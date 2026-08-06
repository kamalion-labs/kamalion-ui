import {
  CheckCircle2,
  Info,
  TriangleAlert,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../util";
import { AlertContext, useAlertContext, type AlertVariant } from "./context";
import { alertIconColor, alertVariants } from "./variants";
import type { AlertIconProps, AlertProps, AlertSlotProps } from "./types";

const iconByVariant: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: XCircle,
};

function AlertRoot({
  variant = "info",
  className,
  children,
  ref,
  ...props
}: AlertProps) {
  return (
    <AlertContext.Provider value={{ variant }}>
      <div
        ref={ref}
        role="alert"
        className={cn(`alert-${variant}`, alertVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
}

function AlertIcon({ className, children, ref, ...props }: AlertIconProps) {
  const { variant } = useAlertContext();
  const Icon = iconByVariant[variant];
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "alert-icon mt-0.5 inline-flex shrink-0 [&_svg]:size-5",
        alertIconColor[variant],
        className,
      )}
      {...props}
    >
      {children ?? <Icon />}
    </span>
  );
}

function AlertContent({ className, children, ref, ...props }: AlertSlotProps) {
  return (
    <div
      ref={ref}
      className={cn("alert-content flex min-w-0 flex-col gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertTitle({ className, children, ref, ...props }: AlertSlotProps) {
  return (
    <div
      ref={ref}
      className={cn("alert-title font-semibold text-(--color-foreground)", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertDescription({
  className,
  children,
  ref,
  ...props
}: AlertSlotProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "alert-description text-sm text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Callout banner for important notifications and status feedback.
 */
export const Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});

export type * from "./types";
export type { AlertVariant } from "./context";
