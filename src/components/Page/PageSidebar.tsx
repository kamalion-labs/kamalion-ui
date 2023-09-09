import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";

interface PageSidebarProps {
  children?: ReactNode;
}

export function PageSidebar({ children }: PageSidebarProps) {
  const className =
    "sticky z-20 h-full hidden flex-col bg-alt md:w-[280px] md:flex";

  if (children) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      <Sidebar.Content>
        <Sidebar.Menu />
      </Sidebar.Content>
    </div>
  );
}
