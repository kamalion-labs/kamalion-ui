import { ReactNode } from "react";

export function PageRoot({ children }: { children: ReactNode }) {
  return <div className="flex w-full h-full bg-[--background] text-[--foreground]">{children}</div>;
}
