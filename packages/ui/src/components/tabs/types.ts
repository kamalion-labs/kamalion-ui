import type React from "react";
import type * as RadixTabs from "@radix-ui/react-tabs";
import type { VariantProps } from "class-variance-authority";
import type { tabsListVariants, tabsTriggerVariants } from "./variants";

export type TabsVariant = "line" | "pill" | "segmented";
export type TabsSize = "sm" | "md";

export interface TabsProps extends React.ComponentPropsWithoutRef<
  typeof RadixTabs.Root
> {
  /** Cascades to List and Trigger so a tab bar is styled in one place. */
  variant?: TabsVariant;
  size?: TabsSize;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface TabsListProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof RadixTabs.List>,
      keyof VariantProps<typeof tabsListVariants>
    >,
    VariantProps<typeof tabsListVariants> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface TabsTriggerProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>,
      keyof VariantProps<typeof tabsTriggerVariants>
    >,
    VariantProps<typeof tabsTriggerVariants> {
  /** Leading icon. Pass a rendered element; the trigger sizes it. */
  icon?: React.ReactNode;
  /** Trailing slot, typically a count. */
  trailing?: React.ReactNode;
  className?: string;
  classNameIcon?: string;
  classNameTrailing?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface TabsContentProps extends React.ComponentPropsWithoutRef<
  typeof RadixTabs.Content
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}
