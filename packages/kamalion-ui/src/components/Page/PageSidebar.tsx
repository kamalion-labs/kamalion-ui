import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { cn } from "../../util";
import { useNav } from "../../stores";

interface PageSidebarProps {
  children?: ReactNode;
}

export function PageSidebar({ children }: PageSidebarProps) {
  const { navOpen } = useNav();

  const className = cn(
    "fixed md:relative z-20 h-full w-full hidden flex-col bg-alt md:w-[280px] md:flex",
    navOpen ? "flex" : "hidden",
  );

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
