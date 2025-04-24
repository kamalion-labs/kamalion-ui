import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="itc-page-wrapper z-10 flex-1 overflow-x-auto h-full flex flex-col">
      {children}
    </div>
  );
}
