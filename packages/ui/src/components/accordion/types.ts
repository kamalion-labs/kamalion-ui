import type React from "react";
import type * as RadixAccordion from "@radix-ui/react-accordion";

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Root
> & {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Item
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Trigger
> {
  /** Rendered element; the trigger sizes it. */
  icon?: React.ReactNode;
  /** Trailing slot rendered before the chevron, typically a count or Badge. */
  trailing?: React.ReactNode;
  className?: string;
  classNameIcon?: string;
  classNameTrailing?: string;
  classNameChevron?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface AccordionContentProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Content
> {
  className?: string;
  /** Applied to the inner padding wrapper, not the animated height container. */
  classNameInner?: string;
  ref?: React.Ref<HTMLDivElement>;
}
