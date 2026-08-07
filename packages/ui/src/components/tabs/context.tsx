import { createContext, useContext } from "react";
import type { TabsSize, TabsVariant } from "./types";

export interface TabsContextValue {
  variant: TabsVariant;
  size: TabsSize;
}

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
);

/**
 * Falls back to the defaults rather than throwing: List and Trigger are useful
 * on their own, and a thrown error here would be a worse failure than a
 * correctly-styled default tab bar.
 */
export const useTabsContext = (): TabsContextValue =>
  useContext(TabsContext) ?? { variant: "line", size: "md" };
