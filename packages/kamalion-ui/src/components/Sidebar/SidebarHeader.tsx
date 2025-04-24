import { ReactNode } from "react";
import { cn } from "../..";

interface SidebarHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "itc-sidebar-header flex items-center bg-(--sidebar-header-background) text-(--sidebar-header-foreground) space-x-2 px-4 h-16",
        className
      )}
    >
      {children}
    </div>
  );
}