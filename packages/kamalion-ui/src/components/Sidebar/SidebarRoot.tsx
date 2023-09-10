import { ReactNode } from "react";
import { cn } from "../../util/cn";

interface SidebarRootProps {
  children: ReactNode;
  className?: string;
}

export function SidebarRoot({ children, className }: SidebarRootProps) {
  return (
    <div
      className={cn(
        "bg-[--sidebar-background] flex flex-col h-full text-[--sidebar-foreground]",
        className
      )}
    >
      {children}
    </div>
  );
}
