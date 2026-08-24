import * as Collapsible from "@radix-ui/react-collapsible";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, PanelLeft } from "lucide-react";
import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../util";
import { Tooltip } from "../tooltip";
import { NavbarContext, useNavbarContext } from "./context";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLElement>;
}

function NavbarRoot({
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
  children,
  ref,
  ...props
}: NavbarProps) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? internal;
  const setCollapsed = (next: boolean) => {
    setInternal(next);
    onCollapsedChange?.(next);
  };

  return (
    <NavbarContext.Provider value={{ collapsed, setCollapsed }}>
      {/* Own Provider: collapsed items render Tooltips, and Radix Tooltip
          throws without a Provider ancestor. Navbar can legitimately be used
          outside KamalionProvider, so it can't rely on that one. Nesting a
          second Provider is supported and harmless. */}
      <Tooltip.Provider delayDuration={0}>
        <aside
          ref={ref}
          data-collapsed={collapsed || undefined}
          className={cn(
            "navbar group/navbar flex h-full flex-col gap-2 bg-(--color-sidebar-bg) text-(--color-sidebar-fg)",
            "transition-[width,padding] duration-(--duration-normal) ease-standard",
            // Collapsed: a 40px pill inside `p-3` would touch both edges of a
            // 64px rail, so the padding tightens with the width.
            collapsed ? "w-16 p-2" : "w-68 p-3",
            className,
          )}
          {...props}
        >
          {children}
        </aside>
      </Tooltip.Provider>
    </NavbarContext.Provider>
  );
}

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

function NavbarHeader({ className, children, ...props }: SectionProps) {
  return (
    <div
      className={cn(
        "navbar-header flex h-11 shrink-0 items-center gap-2 px-2 font-semibold tracking-tight text-(--color-foreground)",
        "group-data-[collapsed]/navbar:h-auto group-data-[collapsed]/navbar:flex-col group-data-[collapsed]/navbar:items-center group-data-[collapsed]/navbar:justify-center group-data-[collapsed]/navbar:gap-2 group-data-[collapsed]/navbar:px-0 group-data-[collapsed]/navbar:py-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavbarFooter({ className, children, ...props }: SectionProps) {
  return (
    <div
      className={cn(
        "navbar-footer mt-auto flex shrink-0 items-center gap-2 border-t border-(--color-border) px-2 pt-3",
        "group-data-[collapsed]/navbar:justify-center group-data-[collapsed]/navbar:px-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavbarContent({ className, children, ...props }: SectionProps) {
  return (
    <div
      className={cn(
        "navbar-content flex-1 overflow-y-auto pt-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavbarTrigger({ className }: { className?: string }) {
  const { collapsed, setCollapsed } = useNavbarContext();
  const label = collapsed ? "Expandir menu" : "Recolher menu";

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "navbar-trigger flex size-8 cursor-pointer items-center justify-center rounded-(--radius-control) text-(--color-sidebar-fg)",
            "transition-all duration-150 ease-standard hover:bg-(--color-sidebar-active-bg) hover:text-(--color-sidebar-active-fg)",
            "active:scale-95 outline-none focus-ring",
            className,
          )}
        >
          <PanelLeft className="size-4" />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content side={collapsed ? "right" : "bottom"} sideOffset={8}>
        {label}
      </Tooltip.Content>
    </Tooltip>
  );
}

function NavbarMenu({ className, children, ...props }: SectionProps) {
  return (
    <nav className={cn("navbar-menu", className)} {...props}>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </nav>
  );
}

function NavbarMenuCategory({ className, children }: SectionProps) {
  const { collapsed } = useNavbarContext();
  if (collapsed) return null;
  return (
    <li
      className={cn(
        // Sentence case, not uppercase: in a sidebar the category is a quiet
        // divider between groups, and small-caps at this weight competes with
        // the item labels it is supposed to sit behind.
        "navbar-menu-category px-2.5 pt-5 pb-1.5 text-caption font-medium text-(--color-sidebar-fg-muted)",
        className,
      )}
    >
      {children}
    </li>
  );
}

/**
 * Sidebar row. Active items render as floating cards resting on the
 * translucent shell.
 *
 * `--radius-card` (12px), not `--radius-pill`: at ~36px tall a full capsule
 * over-rounds a text row and fights the rectangular rhythm of a nav list. The
 * theme guide sanctions either ("rounded-full **or rounded-xl**") and the
 * reference this theme is drawn from uses the rounded rect.
 */
const rowClass = (active?: boolean, collapsed?: boolean) =>
  cn(
    "navbar-item flex w-full cursor-pointer items-center gap-2.5 rounded-(--radius-card) text-sm font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-(--duration-fast) ease-standard",
    "active:scale-[0.98]",
    // The row previously had no focus indicator at all — an explicit
    // anti-reference in PRODUCT.md.
    "outline-none focus-ring",
    // Sizes bare lucide icons without touching a consumer's own icon markup
    // (badge chips, avatars, emoji), which should keep its intrinsic size.
    "[&>svg]:size-4 [&>svg]:shrink-0",
    collapsed ? "size-10 justify-center p-0" : "px-2.5 py-2",
    active
      ? "bg-(--color-sidebar-active-bg) text-(--color-sidebar-active-fg) shadow-(--shadow-floating)"
      : "text-(--color-sidebar-fg) hover:bg-(--color-sidebar-active-bg)/60 hover:text-(--color-foreground)",
  );

/** Icon slot — fixed 20px box so labels align whatever the icon's shape. */
const iconClass = "navbar-item-icon flex size-5 shrink-0 items-center justify-center [&_svg]:size-4";

/** Trailing slot — counts, badges, lock glyphs. */
const trailingClass =
  "navbar-item-trailing ml-auto shrink-0 text-caption tabular-nums text-(--color-sidebar-fg-muted) [&_svg]:size-3.5";

export interface NavbarMenuItemProps {
  /** Leading icon. Works on plain rows, `asChild` rows and submenu items. */
  icon?: ReactNode;
  /** Right-aligned slot — item counts, badges, a lock glyph. */
  trailing?: ReactNode;
  active?: boolean;
  asChild?: boolean;
  defaultOpen?: boolean;
  className?: string;
  classNameIcon?: string;
  classNameLabel?: string;
  classNameTrailing?: string;
  children?: ReactNode;
}

function NavbarMenuItem({
  icon,
  trailing,
  active,
  asChild,
  defaultOpen,
  className,
  classNameIcon,
  classNameLabel,
  classNameTrailing,
  children,
}: NavbarMenuItemProps) {
  const { collapsed } = useNavbarContext();

  const hasSubmenu = Children.toArray(children).some(
    (c) => isValidElement(c) && c.type === NavbarMenuItemContent,
  );

  if (hasSubmenu) {
    return (
      <li className={cn("navbar-menu-item", className)}>
        <Collapsible.Root defaultOpen={defaultOpen}>{children}</Collapsible.Root>
      </li>
    );
  }

  // With `asChild` the consumer's element (a router link, say) is the row, and
  // its own children are the label. We need that label separately so the icon
  // and trailing slot can be composed around it.
  const slotted =
    asChild && isValidElement<{ children?: ReactNode }>(children)
      ? children
      : null;
  const label = slotted ? slotted.props.children : children;

  const body = (
    <>
      {icon ? (
        <span className={cn(iconClass, classNameIcon)}>{icon}</span>
      ) : null}
      {!collapsed ? (
        <span className={cn("navbar-item-label min-w-0 truncate", classNameLabel)}>
          {label}
        </span>
      ) : null}
      {!collapsed && trailing ? (
        <span className={cn(trailingClass, classNameTrailing)}>{trailing}</span>
      ) : null}
    </>
  );

  const row = slotted ? (
    // Merge row styles onto the consumer's element, but swap its children for
    // our composed body — otherwise `icon` and `trailing` are silently dropped
    // on exactly the rows a real app uses (router links).
    <Slot className={cn(rowClass(active, collapsed), className)}>
      {cloneElement(slotted, undefined, body)}
    </Slot>
  ) : (
    <div className={cn(rowClass(active, collapsed), className)}>{body}</div>
  );

  return (
    <li className="navbar-menu-item">
      {collapsed ? (
        // Collapsed rows show only an icon, so the label has to survive
        // somewhere — otherwise the rail is unnavigable without guessing.
        <Tooltip>
          <Tooltip.Trigger asChild>{row}</Tooltip.Trigger>
          <Tooltip.Content side="right" sideOffset={8}>
            {label}
          </Tooltip.Content>
        </Tooltip>
      ) : (
        row
      )}
    </li>
  );
}

export interface NavbarMenuItemTriggerProps {
  /** Leading icon, matching `Navbar.Menu.Item`. */
  icon?: ReactNode;
  /** Right-aligned slot, rendered before the expand chevron. */
  trailing?: ReactNode;
  active?: boolean;
  className?: string;
  classNameIcon?: string;
  classNameLabel?: string;
  classNameTrailing?: string;
  children?: ReactNode;
}

function NavbarMenuItemTrigger({
  icon,
  trailing,
  active,
  className,
  classNameIcon,
  classNameLabel,
  classNameTrailing,
  children,
}: NavbarMenuItemTriggerProps) {
  const { collapsed } = useNavbarContext();
  return (
    <Collapsible.Trigger
      className={cn(rowClass(active, collapsed), "group", className)}
    >
      {icon ? <span className={cn(iconClass, classNameIcon)}>{icon}</span> : null}
      {!collapsed ? (
        <span className={cn("navbar-item-label min-w-0 truncate", classNameLabel)}>
          {children}
        </span>
      ) : null}
      {!collapsed && trailing ? (
        <span className={cn(trailingClass, classNameTrailing)}>{trailing}</span>
      ) : null}
      {!collapsed ? (
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-(--color-sidebar-fg-muted)",
            "transition-transform duration-(--duration-fast) ease-standard",
            "group-data-[state=open]:rotate-90",
            // Only push the chevron to the far edge when no trailing slot has
            // already claimed `ml-auto`.
            !trailing && "ml-auto",
          )}
        />
      ) : null}
    </Collapsible.Trigger>
  );
}

function NavbarMenuItemContent({ className, children, ...props }: SectionProps) {
  const { collapsed } = useNavbarContext();
  return (
    <Collapsible.Content
      className={cn(
        "navbar-menu-item-content overflow-hidden",
        "data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
        className,
      )}
      {...props}
    >
      {/*
        Indentation alone carries the hierarchy — no vertical rail, matching
        the reference.

        `pl-7.5` (30px) + the child row's own `px-2.5` (10px) puts a submenu
        icon at 40px, which is exactly where the PARENT'S LABEL starts
        (10px padding + 20px icon + 10px gap). Landing the child icon on the
        parent's text baseline-x is what makes the nesting readable without a
        border; 28px was 2px short and the column visibly drifted.

        Collapsed rails have no room to indent, so the offset drops away.
      */}
      <ul
        className={cn(
          "mt-0.5 flex flex-col gap-0.5",
          collapsed ? "items-center" : "pl-7.5",
        )}
      >
        {children}
      </ul>
    </Collapsible.Content>
  );
}

const NavbarMenuWithParts = Object.assign(NavbarMenu, {
  Category: NavbarMenuCategory,
  Item: Object.assign(NavbarMenuItem, {
    Trigger: NavbarMenuItemTrigger,
    Content: NavbarMenuItemContent,
  }),
});

/**
 * Collapsible navigation drawer with header, menu tree (with nested submenus),
 * and footer slots.
 */
export const Navbar = Object.assign(NavbarRoot, {
  Root: NavbarRoot,
  Header: NavbarHeader,
  Footer: NavbarFooter,
  Content: NavbarContent,
  Trigger: NavbarTrigger,
  Menu: NavbarMenuWithParts,
});
