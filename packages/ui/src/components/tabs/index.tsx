import { TabsRoot } from "./TabsRoot";
import { TabsList } from "./TabsList";
import { TabsTrigger } from "./TabsTrigger";
import { TabsContent } from "./TabsContent";

/**
 * Tabbed navigation built on Radix Tabs — roving focus, arrow-key navigation
 * and the correct tablist/tab/tabpanel wiring come from the primitive.
 *
 * `variant` and `size` set on the root cascade to List and Trigger, so a tab
 * bar is configured in one place; either can still override locally.
 */
export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export type * from "./types";
