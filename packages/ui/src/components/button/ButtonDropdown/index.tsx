import { ChevronDown } from "lucide-react";
import type React from "react";
import { cn } from "../../../util";
import { Popover } from "../../popover";
import { ButtonRoot } from "../ButtonRoot";
import type { ButtonProps } from "../types";

export interface ButtonDropdownProps extends ButtonProps {
  /** Content rendered inside the dropdown popover. */
  menu: React.ReactNode;
  /** Extra classes for the dropdown popover panel. */
  classNameContent?: string;
  /** Hide the trailing chevron indicator. */
  hideChevron?: boolean;
}

export function ButtonDropdown({
  menu,
  classNameContent,
  hideChevron = false,
  children,
  ref,
  ...buttonProps
}: ButtonDropdownProps) {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <ButtonRoot ref={ref} {...buttonProps}>
          {children}
          {!hideChevron && (
            <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden="true" />
          )}
        </ButtonRoot>
      </Popover.Trigger>
      <Popover.Content className={cn("flex flex-col", classNameContent)}>
        {menu}
      </Popover.Content>
    </Popover>
  );
}
