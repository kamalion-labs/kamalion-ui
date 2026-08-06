import { ButtonRoot } from "./ButtonRoot";
import { ButtonIcon } from "./ButtonIcon";
import { ButtonContent } from "./ButtonContent";
import { ButtonDropdown } from "./ButtonDropdown";

/**
 * Interactive trigger element supporting variants, sizes, loading states, and
 * slot composition via `asChild`. `Button.Dropdown` composes a Popover menu.
 */
export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
  Content: ButtonContent,
  Dropdown: ButtonDropdown,
});

export type * from "./types";
export type { ButtonDropdownProps } from "./ButtonDropdown";
