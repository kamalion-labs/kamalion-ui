import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ReactNode } from "react";
import { Sidebar } from ".";
import { NavRoute } from "../..";

interface SidebarMenuProps {
  children?: ReactNode;
  routes?: NavRoute[];
}

export function SidebarMenu({ children, routes }: SidebarMenuProps) {
  if (!children && routes) {
    return (
      <NavigationMenu.Root
        orientation="vertical"
        className="relative font-montserrat text-sm h-full overflow-y-auto scrollbar-thin"
      >
        <NavigationMenu.List className="flex list-none flex-col justify-center rounded space-y-1">
          {routes
            .filter((x) => x.showInMenu)
            .map((route, idx) => {
              if (route.items && route.items?.length > 0) {
                return (
                  <Sidebar.MenuGroup
                    key={idx}
                    id={route.id}
                    text={route.title}
                    icon={route.icon}
                  >
                    {route.items?.map((subroute, idx2) => (
                      <Sidebar.MenuItem
                        key={idx2}
                        text={subroute.title}
                        icon={subroute.icon}
                        href={subroute.path}
                        id={subroute.id}
                      />
                    ))}
                  </Sidebar.MenuGroup>
                );
              }
              return (
                <Sidebar.MenuItem
                  key={idx}
                  text={route.title}
                  icon={route.icon}
                  href={route.path}
                  id={route.id}
                />
              );
            })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    );
  }

  return (
    <NavigationMenu.Root orientation="vertical" className="relative text-sm">
      <NavigationMenu.List className="flex list-none flex-col justify-center rounded">
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
