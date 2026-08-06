import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export interface PageMeta {
  title?: ReactNode;
  subtitle?: ReactNode;
}

export interface PageContextValue {
  meta: PageMeta;
  setMeta: (meta: PageMeta) => void;
}

export const PageContext = createContext<PageContextValue | undefined>(
  undefined,
);

export const usePageContext = () => useContext(PageContext);
