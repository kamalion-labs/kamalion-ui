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
        "itc-sidebar bg-(--sidebar-background) text-(--sidebar-foreground) flex flex-col h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
