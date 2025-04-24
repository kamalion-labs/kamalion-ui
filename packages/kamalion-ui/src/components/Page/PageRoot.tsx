import { ReactNode } from "react";
import { Loading } from "../Loading";

export type PageRootProps = {
  isLoading?: boolean;
  children: ReactNode;
}

export function PageRoot({ children, isLoading }: PageRootProps) {
  return (
    <div className="itc-page flex w-full h-screen bg-(--background) text-(--foreground)">
      {isLoading && <Loading.Global />}

      {children}
    </div>
  );
}
