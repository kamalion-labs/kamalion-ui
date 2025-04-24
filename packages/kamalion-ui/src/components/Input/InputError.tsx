import { ReactNode } from "react";
import { cn } from "../../util/cn";

type InputErrorsProps = {
  error?: ReactNode;
};

type InputErrorProps = React.HTMLAttributes<HTMLDivElement> & InputErrorsProps;

export function InputError({ className, children }: InputErrorProps) {
  if (!children) return null;

  return <div className={cn("itc-input-error", className)}>{children}</div>;
}
