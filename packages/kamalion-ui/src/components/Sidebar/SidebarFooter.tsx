import { ReactNode } from "react";
import { cn } from "../..";

interface SidebarFooterProps {
  children: ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "itc-sidebar-footer flex items-center border-t border-slate-800 bg-[--sidebar-footer-background] space-x-2 px-10 h-16",
        className
      )}
    >
      {children}
    </div>
  );
}
