import { ReactNode } from "react";

interface SidebarFooterProps {
  children: ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return (
    <div className="flex items-center border-t border-slate-800 bg-[--sidebar-footer-background] space-x-2 px-10 h-16">
      {children}
    </div>
  );
}
