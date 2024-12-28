import { ReactNode } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { cn } from "../../util/cn";
import { Button } from "../Button";
import { useNav } from "../../stores";

interface PageHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  const { toggleNav } = useNav();

  return (
    <header
      className={cn(
        "min-h-[64px] gap-x-3 flex font-montserrat items-center px-5 border-b bg-[--page-header-background] text-[--page-header-foreground] font-medium uppercase text-xl",
        className,
      )}
    >
      <Button.Root size="icon" variant="default" onClick={toggleNav} className="md:hidden">
        <Button.Icon>
          <HiMenuAlt2 />
        </Button.Icon>
      </Button.Root>

      {children}
    </header>
  );
}
