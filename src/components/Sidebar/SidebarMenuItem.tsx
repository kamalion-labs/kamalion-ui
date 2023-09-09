import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ReactNode } from "react";
import { useNav } from "../../stores";
import { cn } from "../../util/cn";

interface SidebarMenuItemProps {
  text: string;
  id: string;
  href?: string;
  icon?: ReactNode;
}

export function SidebarMenuItem({
  text,
  href,
  icon,
  id,
}: SidebarMenuItemProps) {
  const { currentId, setCurrentId } = useNav();

  function handleClick() {
    setCurrentId(id);
  }

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        href={href}
        onClick={handleClick}
        className={cn(
          "group flex w-full text-[--nav-item-foreground] select-none items-center space-x-4 h-10 transition-colors",
          "hover:text-[--nav-item-foreground-hover]",
          id === currentId && "text-primary"
        )}
      >
        <div className="flex h-8 w-8 items-center justify-end drop-shadow-md">
          {icon}
        </div>

        <span className="flex flex-1 items-start font-medium drop-shadow-md">
          {text}
        </span>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
