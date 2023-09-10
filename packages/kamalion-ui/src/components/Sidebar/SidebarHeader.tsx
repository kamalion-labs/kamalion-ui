import { ReactNode } from "react";

interface SidebarHeaderProps {
  children: ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return (
    <div className="flex items-center border-b border-slate-800 bg-[--sidebar-header-background] space-x-2 px-4 h-16">
      {children}
    </div>
  );
}
