import { ReactNode } from "react";
import { cn } from "../../util/cn";
import { FaBars } from "react-icons/fa6";
import { useSidebar } from "../..";

interface PageHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header
      className={cn(
        "itc-page-header min-h-[64px] flex font-montserrat items-center px-5 bg-(--page-header-background) text-(--page-header-foreground) font-medium uppercase text-xl",
        className
      )}
    >
      <div className="pr-4 md:hidden" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {children}
    </header>
  );
}
