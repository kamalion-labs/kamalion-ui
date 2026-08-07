import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../util";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
} from "./types";
import { dropdownMenuItemVariants, dropdownMenuSurface } from "./variants";

function DropdownMenuContent({
  className,
  sideOffset = 8,
  align = "start",
  children,
  ref,
  ...props
}: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn("dropdown-menu-content", dropdownMenuSurface, className)}
        {...props}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

function DropdownMenuItem({
  variant = "default",
  icon,
  shortcut,
  className,
  classNameIcon,
  classNameShortcut,
  children,
  ref,
  ...props
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      ref={ref}
      className={cn(
        `dropdown-menu-item-${variant}`,
        dropdownMenuItemVariants({ variant }),
        className,
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className={cn("flex shrink-0", classNameIcon)}>
          {icon}
        </span>
      ) : null}
      {children}
      {shortcut ? (
        <span
          className={cn(
            "ml-auto text-xs tracking-widest text-(--color-foreground-subtle)",
            classNameShortcut,
          )}
        >
          {shortcut}
        </span>
      ) : null}
    </RadixDropdownMenu.Item>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ref,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <RadixDropdownMenu.CheckboxItem
      ref={ref}
      className={cn(
        "dropdown-menu-checkbox-item",
        dropdownMenuItemVariants(),
        "pl-8",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <RadixDropdownMenu.ItemIndicator>
          <Check className="size-4" />
        </RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <RadixDropdownMenu.RadioItem
      ref={ref}
      className={cn(
        "dropdown-menu-radio-item",
        dropdownMenuItemVariants(),
        "pl-8",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <RadixDropdownMenu.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  children,
  ref,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <RadixDropdownMenu.Label
      ref={ref}
      className={cn(
        "dropdown-menu-label px-3 py-1.5 text-xs font-medium text-(--color-foreground-subtle)",
        className,
      )}
      {...props}
    >
      {children}
    </RadixDropdownMenu.Label>
  );
}

function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <RadixDropdownMenu.Separator
      ref={ref}
      className={cn(
        "dropdown-menu-separator my-1 h-px bg-(--color-border)",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  icon,
  className,
  classNameIcon,
  children,
  ref,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <RadixDropdownMenu.SubTrigger
      ref={ref}
      className={cn(
        "dropdown-menu-sub-trigger",
        dropdownMenuItemVariants(),
        "data-[state=open]:bg-(--color-accent-soft) data-[state=open]:text-(--color-accent)",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className={cn("flex shrink-0", classNameIcon)}>
          {icon}
        </span>
      ) : null}
      {children}
      <ChevronRight className="ml-auto size-4" aria-hidden="true" />
    </RadixDropdownMenu.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  children,
  ref,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.SubContent
        ref={ref}
        className={cn(
          "dropdown-menu-sub-content",
          dropdownMenuSurface,
          className,
        )}
        {...props}
      >
        {children}
      </RadixDropdownMenu.SubContent>
    </RadixDropdownMenu.Portal>
  );
}

/**
 * A real menu, as distinct from `Button.Dropdown` — which is a Popover holding
 * arbitrary content and therefore has no `role="menu"`, no roving tabindex and
 * no typeahead. Reach for this whenever the content is a list of commands.
 *
 * The surface is shared with Popover on purpose so the two floating layers
 * read as one system.
 */
export const DropdownMenu = Object.assign(RadixDropdownMenu.Root, {
  Root: RadixDropdownMenu.Root,
  Trigger: RadixDropdownMenu.Trigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: RadixDropdownMenu.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Sub: RadixDropdownMenu.Sub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
});

export type * from "./types";
