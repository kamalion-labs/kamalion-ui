import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";
//import { useNav } from "../../stores";
import { cn } from "../../util/cn";

interface SidebarMenuGroupProps {
  children: ReactNode;
  id: string;
  text: string;
  icon?: ReactNode;
}

export function SidebarMenuGroup({
  children,
  id,
  text,
  icon,
}: SidebarMenuGroupProps) {
  //const { parentId } = useNav();

  return (
    <NavigationMenu.Item className="group" value={id}>
      <NavigationMenu.Trigger
        className={cn(
          "itc-menu-group group flex w-full select-none text-[--nav-item-foreground] items-center space-x-4 h-10 pr-4 transition-colors",
          "hover:text-[--nav-item-foreground-hover]",
          //id === parentId && "text-primary"
        )}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
      >
        {icon && (
          <div className="flex h-8 w-8 items-center justify-end drop-shadow-md">
            {icon}
          </div>
        )}

        <span className="flex flex-1 items-start font-medium drop-shadow-md">
          {text}
        </span>

        <FaChevronRight className="transform duration-300 ease-in-out group-radix-state-open:rotate-90" />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        className={cn(
          "itc-menu-content bg-[--nav-group-background]",
          "w-radix-navigation-menu-viewport",
          "h-radix-navigation-menu-viewport",
          "radix-state-open:animate-scale-in-content",
          "radix-state-closed:animate-scale-out-content",
          "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
        )}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
      >
        <NavigationMenu.List>{children}</NavigationMenu.List>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
