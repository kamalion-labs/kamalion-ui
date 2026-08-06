import * as Collapsible from "@radix-ui/react-collapsible";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, PanelLeft } from "lucide-react";
import {
  Children,
  isValidElement,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../util";
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
      <aside
        ref={ref}
        data-collapsed={collapsed || undefined}
        className={cn(
          "navbar flex h-full flex-col gap-2 bg-(--color-sidebar-bg) p-3 text-(--color-sidebar-fg) transition-[width] duration-200",
          collapsed ? "w-16" : "w-60",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
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
        "navbar-header flex items-center gap-2 px-2 py-1 font-semibold text-(--color-foreground)",
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
        "navbar-footer mt-auto flex items-center gap-2 border-t border-(--color-border) px-2 pt-3",
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
        "navbar-content flex-1 overflow-y-auto",
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
  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "navbar-trigger flex size-8 items-center justify-center rounded-(--radius-card) text-(--color-sidebar-fg) transition-colors hover:bg-(--color-sidebar-active-bg) hover:text-(--color-sidebar-active-fg)",
        className,
      )}
    >
      <PanelLeft className="size-4" />
    </button>
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
        "navbar-menu-category px-3 pt-4 pb-1 text-xs font-medium tracking-wide text-(--color-sidebar-fg-muted) uppercase",
        className,
      )}
    >
      {children}
    </li>
  );
}

const rowClass = (active?: boolean) =>
  cn(
    "flex w-full items-center gap-3 rounded-(--radius-card) px-3 py-2 text-sm font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
    active
      ? "bg-(--color-sidebar-active-bg) text-(--color-sidebar-active-fg) shadow-(--color-sidebar-active-shadow)"
      : "text-(--color-sidebar-fg) hover:text-(--color-foreground)",
  );

export interface NavbarMenuItemProps {
  icon?: ReactNode;
  active?: boolean;
  asChild?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

function NavbarMenuItem({
  icon,
  active,
  asChild,
  defaultOpen,
  className,
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

  if (asChild) {
    // Consumer supplies the single element (e.g. a router link); merge row
    // styles onto it directly.
    return (
      <li className="navbar-menu-item">
        <Slot className={cn(rowClass(active), className)}>{children}</Slot>
      </li>
    );
  }

  return (
    <li className="navbar-menu-item">
      <div className={cn(rowClass(active), className)}>
        {icon}
        {!collapsed ? <span className="truncate">{children}</span> : null}
      </div>
    </li>
  );
}

export interface NavbarMenuItemTriggerProps {
  icon?: ReactNode;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

function NavbarMenuItemTrigger({
  icon,
  active,
  className,
  children,
}: NavbarMenuItemTriggerProps) {
  const { collapsed } = useNavbarContext();
  return (
    <Collapsible.Trigger
      className={cn(rowClass(active), "group justify-between", className)}
    >
      <span className="flex items-center gap-3">
        {icon}
        {!collapsed ? <span className="truncate">{children}</span> : null}
      </span>
      {!collapsed ? (
        <ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
      ) : null}
    </Collapsible.Trigger>
  );
}

function NavbarMenuItemContent({ className, children, ...props }: SectionProps) {
  return (
    <Collapsible.Content
      className={cn("navbar-menu-item-content overflow-hidden", className)}
      {...props}
    >
      <ul className="mt-0.5 flex flex-col gap-0.5 border-l border-(--color-border) pl-4">
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
