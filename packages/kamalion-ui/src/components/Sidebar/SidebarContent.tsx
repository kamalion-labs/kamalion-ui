import { ReactNode } from "react";
import { cn } from "../../util";

interface SidebarContentProps {
  children: ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={cn("itc-sidebar-content scrollbar-rounded-md flex flex-1 flex-col overflow-y-auto scrollbar", className)}>
      {children}
    </div>
  );
}
