import { ReactNode } from "react";

interface SidebarContentProps {
  children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  return (
    <div className="scrollbar-rounded-md py-8 flex flex-1 flex-col overflow-y-auto scrollbar">
      {children}
    </div>
  );
}
