import React from "react";
import { cn } from "../../util/cn";

type FormButtonsProps = React.HTMLAttributes<HTMLDivElement>;

export function FormButtons({ className, children }: FormButtonsProps) {
  return <div className={cn("space-x-3", className)}>{children}</div>;
}
