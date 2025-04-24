import { ReactNode } from "react";
import { cn } from "../../util/cn";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <main
      className={cn(
        "itc-page-content scrollbar-rounded-md flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300",
        className
      )}
    >
      {children}
    </main>
  );
}
