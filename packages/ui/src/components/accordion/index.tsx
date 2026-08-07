import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../util";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./types";

function AccordionRoot({ className, children, ref, ...props }: AccordionProps) {
  return (
    <RadixAccordion.Root
      ref={ref}
      className={cn(
        "accordion divide-y divide-(--color-border) rounded-(--radius-card) border border-(--color-border)",
        className,
      )}
      {...props}
    >
      {children}
    </RadixAccordion.Root>
  );
}

function AccordionItem({
  className,
  children,
  ref,
  ...props
}: AccordionItemProps) {
  return (
    <RadixAccordion.Item
      ref={ref}
      // Border-first elevation: the divide on the root draws the separators,
      // so the item itself stays flat.
      className={cn("accordion-item", className)}
      {...props}
    >
      {children}
    </RadixAccordion.Item>
  );
}

function AccordionTrigger({
  icon,
  trailing,
  className,
  classNameIcon,
  classNameTrailing,
  classNameChevron,
  children,
  ref,
  ...props
}: AccordionTriggerProps) {
  return (
    // Radix requires the Trigger to be wrapped in a Header for correct heading
    // semantics; keeping it here means consumers cannot forget it.
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        ref={ref}
        className={cn(
          "accordion-trigger focus-ring-inset flex flex-1 items-center gap-2.5",
          "px-4 py-3 text-left text-sm font-medium text-(--color-foreground)",
          "hover:bg-(--color-surface-panel-hover)",
          "transition-colors duration-(--duration-fast) ease-standard",
          "[&_svg]:size-4 [&_svg]:shrink-0",
          className,
        )}
        {...props}
      >
        {icon ? (
          <span
            aria-hidden="true"
            className={cn("flex shrink-0", classNameIcon)}
          >
            {icon}
          </span>
        ) : null}

        <span className="min-w-0 flex-1 truncate">{children}</span>

        {trailing ? (
          <span className={cn("shrink-0", classNameTrailing)}>{trailing}</span>
        ) : null}

        <ChevronDown
          aria-hidden="true"
          className={cn(
            "shrink-0 text-(--color-foreground-muted)",
            "transition-transform duration-(--duration-fast) ease-standard",
            "[[data-state=open]_&]:rotate-180",
            classNameChevron,
          )}
        />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

function AccordionContent({
  className,
  classNameInner,
  children,
  ref,
  ...props
}: AccordionContentProps) {
  return (
    <RadixAccordion.Content
      ref={ref}
      className={cn(
        "accordion-content overflow-hidden text-sm text-(--color-foreground-muted)",
        // Radix publishes the measured height as a CSS variable; these keyframes
        // ship with tw-animate-css.
        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
        className,
      )}
      {...props}
    >
      <div className={cn("px-4 pt-1 pb-4", classNameInner)}>{children}</div>
    </RadixAccordion.Content>
  );
}

/**
 * Collapsible sections built on Radix Accordion.
 *
 * Not hand-rolled on the existing Collapsible: single/multiple mode, roving
 * focus between headers and the `data-state` animation contract are the whole
 * point, and reproducing them correctly is more code than using the primitive.
 *
 * Requires `type="single"` or `type="multiple"` on the root, per Radix.
 */
export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export type * from "./types";
