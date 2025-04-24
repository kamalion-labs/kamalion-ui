"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "../../util/cn";

interface SidebarMenuItemProps {
  text: string;
  id: string;
  href: string;
  icon?: ReactNode;
}

export function SidebarMenuItem({ text, href, icon, id }: SidebarMenuItemProps) {
  // function handleClick() {
  //   setCurrentId(id);
  // }

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        asChild
        // onClick={handleClick}
        className={cn(
          "itc-menu-item group flex w-full text-(--nav-item-foreground) select-none items-center space-x-4 h-10 transition-colors",
          "hover:text-(--nav-item-foreground-hover)",
          //id === currentId && "text-primary"
        )}
      >
        <Link to={href} id={`nav-${id}`}>
          <div className="flex h-8 w-8 items-center justify-end drop-shadow-md">{icon}</div>

          <span className="flex flex-1 items-start font-medium drop-shadow-md">{text}</span>
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
