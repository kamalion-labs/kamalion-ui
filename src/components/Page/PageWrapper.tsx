import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="z-10 flex-1 h-full flex flex-col">{children}</div>;
}
