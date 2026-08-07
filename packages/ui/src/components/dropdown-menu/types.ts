import type React from "react";
import type * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export type DropdownMenuItemVariant = "default" | "danger";

export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Item
> {
  variant?: DropdownMenuItemVariant;
  /** Rendered element; the row sizes it. */
  icon?: React.ReactNode;
  /** Trailing slot, typically a keyboard shortcut. */
  shortcut?: React.ReactNode;
  className?: string;
  classNameIcon?: string;
  classNameShortcut?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.CheckboxItem
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.RadioItem
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Label
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Separator
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubTrigger
> {
  icon?: React.ReactNode;
  className?: string;
  classNameIcon?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface DropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubContent
> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}
