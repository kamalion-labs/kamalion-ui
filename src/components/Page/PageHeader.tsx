import { ReactNode } from "react";
import { cn } from "../../util/cn";

interface PageHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "min-h-[64px] flex font-montserrat items-center px-5 border-b bg-[--page-header-background] text-[--page-header-foreground] font-medium uppercase text-xl",
        className
      )}
    >
      {children}
    </header>
  );
}
