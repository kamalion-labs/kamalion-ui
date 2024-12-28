import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { useNav } from "../../stores";
import { cn } from "../../util";

interface SidebarHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  const { toggleNav } = useNav();

  return (
    <div
      className={cn(
        "flex items-center border-b border-slate-800 bg-[--sidebar-header-background] space-x-2 px-4 h-16 justify-between",
        className,
      )}
    >
      {children}

      <div className="hover:cursor-pointer md:hidden" onClick={toggleNav}>
        <IoClose size={24} />
      </div>
    </div>
  );
}
